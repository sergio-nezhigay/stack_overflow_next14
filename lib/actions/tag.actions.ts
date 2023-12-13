"use server";

import { FilterQuery } from "mongoose";
import { connectToDatabase } from "../mongoose";

import { GetAllTagsParams, GetTopInteractedTagsParams } from "./shared.types";
import Question from "@/database/question.model";
import Tag from "@/database/tag.model";

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
      // case "popular":
      //   sortOptions = { questions.length: -1 };
      //   break;
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
