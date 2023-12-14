import { AnswerFilters } from "@/constants/filters";
import { getAnswers } from "@/lib/actions/answer.action";
import Filter from "./Filter";
import React from "react";
import { getTimestamp } from "@/lib/utils";
import Link from "next/link";
import Image from "next/image";
import ParseHTML from "./ParseHTML";
import Votes from "./Votes";

interface Params {
  questionId: string;
  userId: string;
  totalAnswers: number;
  page?: number;
  filter?: string;
}

async function AllAnswers({
  questionId,
  userId,
  totalAnswers,
  page,
  filter,
}: Params) {
  const result = await getAnswers({
    questionId,
    page: page ? +page : 1,
    sortBy: filter,
  });
  console.log("🚀 ~ file: AllAnswers.tsx:12 ~ answers:", result);

  return (
    <div className="mt-11">
      <div className="flex-between">
        <h3 className="primary-text-gradient">
          {totalAnswers} <span>Answers</span>
        </h3>
        <Filter
          filters={AnswerFilters}
          otherClasses="min-h-[56px] sm:min-w-[170px]"
          containerClasses=""
        />
      </div>

      {result.answers.map((answer) => (
        <article key={answer._id} className="light-border border-b py-10">
          <div className="flex-between mb-5">
            <Link
              href={`/profile/${answer.author.clerkId}`}
              className="flex flex-1 items-start gap-1 sm:items-center"
            >
              <Image
                src={answer.author.picture}
                width={18}
                height={18}
                alt="profile"
                className="rounded-full object-cover max-sm:mt-0.5"
              />
              <div className="flex flex-col sm:flex-row sm:items-center">
                <p className="body-semibold text-dark300_light700">
                  {answer.author.name}
                </p>

                <p className="small-regular text-light400_light500 ml-0.5 mt-0.5 line-clamp-1">
                  answered {getTimestamp(answer.createdAt)}
                </p>
              </div>
            </Link>
            <div className="flex justify-end">
              <Votes />
            </div>
          </div>

          <ParseHTML data={answer.content} />
        </article>
      ))}
    </div>
  );
}

export default AllAnswers;
