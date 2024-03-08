"use server";

// import { Tag, User } from "lucide-react";
import { FilterQuery } from "mongoose";
import { revalidatePath } from "next/cache";

import { connectToDatabase } from "../mongoose";

import {
  AnswerVoteParams,
  CreateAnswerParams,
  DeleteAnswerParams,
  GetAnswerByIdParams,
  GetAnswersParams,
} from "./shared.types";

import Answer from "@/database/answer.model";
import Interaction from "@/database/interaction.model";
import Question from "@/database/question.model";

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

export async function upvoteAnswer(params: AnswerVoteParams) {
  const { answerId, userId, hasupVoted, hasdownVoted, path } = params;

  let updateQuery = {};

  try {
    connectToDatabase();
    if (hasupVoted) {
      updateQuery = { $pull: { upvotes: userId } };
    } else if (hasdownVoted) {
      updateQuery = {
        $pull: { downvotes: userId },
        $push: { upvotes: userId },
      };
    } else {
      updateQuery = { $addToSet: { upvotes: userId } };
    }

    const answer = await Answer.findByIdAndUpdate(answerId, updateQuery, {
      new: true,
    });

    if (!answer) {
      throw new Error("No Answer");
    }
    // increment user's reputation
    revalidatePath(path);
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function downvoteAnswer(params: AnswerVoteParams) {
  const { answerId, userId, path, hasupVoted, hasdownVoted } = params;
  let updateQuery = {};
  try {
    connectToDatabase();
    if (hasdownVoted) {
      updateQuery = { $pull: { downvotes: userId } };
    } else if (hasupVoted) {
      updateQuery = {
        $pull: { upvotes: userId },
        $push: { downvotes: userId },
      };
    } else {
      updateQuery = { $addToSet: { downvotes: userId } };
    }

    await Answer.findByIdAndUpdate(answerId, updateQuery, {
      new: true,
    });

    revalidatePath(path);
  } catch (error) {
    console.log(error);
    throw error;
  }
}

// export async function getQuestionsByTagId(params: GetQuestionsByTagIdParams) {
//  try {
//    connectToDatabase();
//    const { tagId } = params;
//    const questions = await Question.find({ tags: tagId })
//      .populate({ path: "tags", model: Tag, select: "_id name" })
//      .populate({
//        path: "author",
//        model: User,
//        select: "_id clerkId name picture",
//      });
//    return questions;
//  } catch (error) {
//    console.log(error);
//    throw error;
//  }
// }

export async function deleteAnswer(params: DeleteAnswerParams) {
  console.log("🚀 ~ deleteAnswer:");
  try {
    connectToDatabase();
    const { answerId, path } = params;
    const answer = await Answer.findById(answerId);
    if (!answer) {
      throw new Error(`Answer not found`);
    }

    await Answer.deleteOne({ _id: answerId });
    await Question.updateMany(
      { _id: answer.question },
      { $pull: { answers: answerId } }
    );
    await Interaction.deleteMany({ answers: answerId });

    console.log("🚀 ~ deleteAnswer10:");
    revalidatePath(path);
  } catch (error) {
    console.log(error);
    throw error;
  }
}
