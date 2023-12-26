"use server";

import Answer from "@/database/answer.model";
import Question from "@/database/question.model";
import { revalidatePath } from "next/cache";
import { connectToDatabase } from "../mongoose";
import {
  ChangeDownvoteParams,
  ChangeUpvoteParams,
  CreateAnswerParams,
  GetAnswersParams,
} from "./shared.types";
import { FilterQuery } from "mongoose";

export async function getAnswers(params: GetAnswersParams) {
  try {
    connectToDatabase();
    const { questionId, sortBy, page = 1, pageSize = 10 } = params;

    const skipAmount = (page - 1) * pageSize;

    const query: FilterQuery<typeof Question> = {};

    let sortOptions = {};

    switch (sortBy) {
      case "newest":
        sortOptions = { createdAt: -1 };
        break;
      case "frequent":
        sortOptions = { views: -1 };
        break;
      case "unanswered":
        query.answers = { $size: 0 };
        break;
      default:
        break;
    }

    const answers = await Answer.find({ question: questionId })
      .populate("author", "_id clerkId name picture")
      .sort(sortOptions)
      .skip(skipAmount)
      .limit(pageSize);

    return { answers };
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function createAnswer(params: CreateAnswerParams) {
  try {
    connectToDatabase();
    const { content, question, author, path } = params;
    const newAnswer = await Answer.create({ content, author, question });

    await Question.findByIdAndUpdate(question, {
      $push: { answers: newAnswer._id },
    });
    revalidatePath(path);
  } catch (error) {}
}

export async function upvoteAnswer(params: ChangeUpvoteParams) {
  const { type, itemId, userId, path, hasUpvoted, hasDownvoted } = params;
  console.log(
    "🚀 ~ file==============e, itemId, userId, path, hasUpvoted, hasDownvoted:",
    type,
    itemId,
    userId,
    path,
    hasUpvoted,
    hasDownvoted
  );
  let updateQuery = {};
  let test;
  try {
    connectToDatabase();
    if (hasUpvoted) {
      updateQuery = { $pull: { upvotes: userId } };
    } else {
      updateQuery = { $addToSet: { upvotes: userId } };
    }
    if (type === "answer") {
      await Answer.findByIdAndUpdate(itemId, updateQuery, {
        new: true,
      });
    } else {
      console.log("🚀 test0");
      test = await Question.findByIdAndUpdate(itemId, updateQuery, {
        new: true,
      });
      console.log("🚀 ~ file: answer.action.ts:94 ~ test:", test);
    }
    if (hasDownvoted) {
      updateQuery = { $pull: { downvotes: userId } };
      if (type === "answer") {
        await Answer.findByIdAndUpdate(itemId, updateQuery, {
          new: true,
        });
      } else {
        await Question.findByIdAndUpdate(itemId, updateQuery, {
          new: true,
        });
      }
    }
    revalidatePath(path);
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function downvoteAnswer(params: ChangeDownvoteParams) {
  const { type, itemId, userId, path, hasUpvoted, hasDownvoted } = params;
  let updateQuery = {};
  try {
    connectToDatabase();
    if (hasDownvoted) {
      updateQuery = { $pull: { downvotes: userId } };
    } else {
      updateQuery = { $addToSet: { downvotes: userId } };
    }
    if (type === "answer") {
      await Answer.findByIdAndUpdate(itemId, updateQuery, {
        new: true,
      });
    } else {
      await Question.findByIdAndUpdate(itemId, updateQuery, {
        new: true,
      });
    }

    if (hasUpvoted) {
      updateQuery = { $pull: { upvotes: userId } };
      if (type === "answer") {
        await Answer.findByIdAndUpdate(itemId, updateQuery, {
          new: true,
        });
      } else {
        await Question.findByIdAndUpdate(itemId, updateQuery, {
          new: true,
        });
      }
    }
    revalidatePath(path);
  } catch (error) {
    console.log(error);
    throw error;
  }
}
