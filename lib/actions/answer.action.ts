"use server";

import { revalidatePath } from "next/cache";

import { connectToDatabase } from "../mongoose";

import {
  AnswerVoteParams,
  CreateAnswerParams,
  DeleteAnswerParams,
  GetAnswersParams,
} from "./shared.types";

import Answer from "@/database/answer.model";
import Interaction from "@/database/interaction.model";
import Question from "@/database/question.model";
import User from "@/database/user.model";

export async function getAnswers(params: GetAnswersParams) {
  try {
    connectToDatabase();
    const { questionId, sortBy, page = 1, pageSize = 10 } = params;

    const skipAmount = (page - 1) * pageSize;

    let sortOptions = {};

    switch (sortBy) {
      case "recent":
        sortOptions = { createdAt: -1 };
        break;
      case "old":
        sortOptions = { createdAt: 1 };
        break;
      case "highestUpvotes":
        sortOptions = { upvotes: -1 };
        break;
      case "lowestUpvotes":
        sortOptions = { upvotes: 1 };
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

    const questionObject = await Question.findByIdAndUpdate(question, {
      $push: { answers: newAnswer._id },
    });

    await Interaction.create({
      user: author,
      action: "answer",
      question,
      answer: newAnswer._id,
      tags: questionObject.tags,
    });
    await User.findByIdAndUpdate(author, { $inc: { reputation: 10 } });
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
    await User.findByIdAndUpdate(userId, {
      $inc: { reputation: hasupVoted ? -2 : 2 },
    });

    await User.findByIdAndUpdate(answer.author, {
      $inc: { reputation: hasupVoted ? -10 : 10 },
    });
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

    const answer = await Answer.findByIdAndUpdate(answerId, updateQuery, {
      new: true,
    });

    await User.findByIdAndUpdate(userId, {
      $inc: { reputation: hasdownVoted ? -2 : 2 },
    });

    await User.findByIdAndUpdate(answer.author, {
      $inc: { reputation: hasdownVoted ? -10 : 10 },
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
    revalidatePath(path);
  } catch (error) {
    console.log(error);
    throw error;
  }
}
