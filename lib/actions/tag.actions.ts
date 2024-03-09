"use server";

import { FilterQuery } from "mongoose";

import { connectToDatabase } from "../mongoose";

import {
  GetAllTagsParams,
  GetQuestionsByTagIdParams,
  GetTopInteractedTagsParams,
} from "./shared.types";

import Question from "@/database/question.model";
import Tag, { ITag } from "@/database/tag.model";
import User from "@/database/user.model";

export async function getTopInteractedTags(params: GetTopInteractedTagsParams) {
  try {
    connectToDatabase();

    const { userId, limit = 3 } = params;
    const questions = await Question.find({ author: userId }).populate({
      path: "tags",
      model: Tag,
    });

    const tagsInQuestions = questions.reduce((acc, question) => {
      question.tags.forEach((tag: { name: string }) => {
        if (acc[tag.name]) {
          acc[tag.name]++;
        } else {
          acc[tag.name] = 1;
        }
      });
      return acc;
    }, {});

    const popularTags = Object.entries(tagsInQuestions)
      .sort((a, b) => b[1] - a[1])
      .map((tag) => tag[0])
      .splice(0, limit);

    return popularTags;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function getAllTags(params: GetAllTagsParams) {
  try {
    connectToDatabase();

    const { searchQuery, filter, page = 1, pageSize = 20 } = params;

    const skipAmount = (page - 1) * pageSize;

    const query: FilterQuery<typeof Tag> = {};

    if (searchQuery) {
      query.$or = [
        { name: { $regex: new RegExp(searchQuery, "i") } },
        { description: { $regex: new RegExp(searchQuery, "i") } },
      ];
    }

    let sortOptions = {};

    switch (filter) {
      case "recent":
        sortOptions = { createdAt: -1 };
        break;
      case "old":
        sortOptions = { createdAt: 1 };
        break;
      case "popular":
        sortOptions = { "questions.length": -1 };
        break;
      case "name":
        sortOptions = { name: 1 };
        break;
      default:
        break;
    }

    const tags = await Tag.find(query)
      .skip(skipAmount)
      .limit(pageSize)
      .sort(sortOptions);

    const totalTags = await Tag.countDocuments(query);

    const isNext = totalTags > skipAmount + tags.length;

    return { tags, isNext };
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function getQuestionsByTagId(params: GetQuestionsByTagIdParams) {
  try {
    connectToDatabase();

    const { tagId, page = 1, pageSize = 10, searchQuery } = params;
    const skipAmount = (page - 1) * pageSize;

    const tagFilter: FilterQuery<ITag> = { _id: tagId };

    const tag = await Tag.findOne(tagFilter).populate({
      path: "questions",
      model: Question,
      match: searchQuery
        ? { title: { $regex: searchQuery, $options: "i" } }
        : {},
      options: {
        sort: { createdAt: -1 },
        skip: skipAmount,
        limit: pageSize + 1, // +1 to check if there is next page
      },
      populate: [
        { path: "tags", model: Tag, select: "_id name" },
        { path: "author", model: User, select: "_id clerkId name picture" },
      ],
    });

    if (!tag) {
      throw new Error("Tag not found");
    }

    const isNext = tag.questions.length > pageSize;

    const questions = tag.questions;

    return { tagTitle: tag.name, questions, isNext };
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function getTopTags() {
  try {
    connectToDatabase();

    const tags = await Tag.aggregate([
      {
        $project: {
          name: 1,
          questionCount: { $size: "$questions" },
        },
      },
      {
        $sort: { questionCount: -1 },
      },
      {
        $limit: 5,
      },
    ]);

    return tags;
  } catch (error) {
    console.log(error);
    throw error;
  }
}
