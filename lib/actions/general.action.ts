"use server";

import { connectToDatabase } from "../mongoose";

import { GetAllUsersParams, SearchParams } from "./shared.types";

import Answer from "@/database/answer.model";
import Question from "@/database/question.model";
import Tag from "@/database/tag.model";
import User from "@/database/user.model";

export async function globalSearch(params: SearchParams) {
  try {
    await connectToDatabase();

    const { query, type } = params;
    const regexQuery = { $regex: query, $options: "i" };

    let results = [];

    const modelsAndTypes = [
      { model: Question, searchField: "title", type: "question" },
      { model: User, searchField: "name", type: "user" },
      { model: Answer, searchField: "content", type: "answer" },
      { model: Tag, searchField: "name", type: "tag" },
    ];

    const typeLower = type?.toLowerCase();

    if (
      !typeLower ||
      modelsAndTypes.some((modelAndType) => modelAndType.type === typeLower)
    ) {
      for (const { model, searchField, type } of modelsAndTypes) {
        const queryResults = await model
          .find({ [searchField]: regexQuery })
          .limit(2);

        results.push(
          ...queryResults.map((item) => ({
            title:
              type === "answer"
                ? `Answers containing ${query}`
                : item[searchField],
            type,
            id:
              type === "user"
                ? item.clerkid
                : type === "answer"
                  ? item.question
                  : item._id,
          }))
        );
      }
    } else {
      const modelInfo = modelsAndTypes.find((item) => item.type === type);

      console.log({ modelInfo, type });
      if (!modelInfo) {
        throw new Error("Invalid search type");
      }

      const queryResults = await modelInfo.model
        .find({ [modelInfo.searchField]: regexQuery })
        .limit(8);

      results = queryResults.map((item) => ({
        title:
          type === "answer"
            ? `Answers containing ${query}`
            : item[modelInfo.searchField],
        type,
        id:
          type === "user"
            ? item.clerkId
            : type === "answer"
              ? item.question
              : item._id,
      }));
    }

    return JSON.stringify(results);
  } catch (error) {
    console.log(`Error fetching global results, ${error}`);
    throw error;
  }
}

export async function getJobs(params: GetAllUsersParams) {
  const defaultSearch = "react%20developer";
  const { searchQuery = defaultSearch, page = 1 } = params;

  const url = `https://jsearch.p.rapidapi.com/search?query=${searchQuery}&page=${page}&num_pages=1&remote_jobs_only=true&job_requirements=no_experience&date_posted=week`;

  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": process.env.X_RAPID_API_KEY as string,
      "X-RapidAPI-Host": "jsearch.p.rapidapi.com",
    },
  };

  try {
    const response = await fetch(url, options);
    const result = await response.json();
    if (result.status !== "OK") {
      throw new Error(`Failed to fetch job results: ${result}`);
    }

    // return { jobs: jobData, isNext: true };
    return { jobs: result.data, isNext: true };
  } catch (error: any) {
    console.log(`Error fetching jobs, at url ${url}: ${error}`);
    throw new Error(`Error fetching jobs: ${error}`);
  }
}
