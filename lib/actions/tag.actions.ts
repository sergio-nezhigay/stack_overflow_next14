"use server";

import { connectToDatabase } from "../mongoose";

import { GetTopInteractedTagsParams } from "./shared.types";
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
