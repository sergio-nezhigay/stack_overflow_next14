import React from "react";

import QuestionCard from "../cards/QuestionCard";

import Pagination from "./Pagination";

import { getQuestionsByUserId } from "@/lib/actions/user.action";
import { SearchParamsProps } from "@/types";

interface QuestionTabProps extends SearchParamsProps {
  userId: string;
  clerkId: string;
}

const QuestionTab = async ({
  searchParams,
  userId,
  clerkId,
}: QuestionTabProps) => {
  console.log("searchParams=", searchParams);
  const { questions, isNext } = await getQuestionsByUserId({
    userId,
    page: searchParams?.page,
    pageSize: searchParams?.pageSize,
  });

  return (
    <>
      {questions.map((question) => (
        <QuestionCard
          key={question._id}
          _id={question._id}
          clerkId={clerkId}
          title={question.title}
          tags={question.tags}
          author={question.author}
          upvotes={question.upvotes}
          views={question.views}
          answers={question.answers}
          createdAt={question.createdAt}
        />
      ))}
      {isNext && <Pagination />}
    </>
  );
};

export default QuestionTab;
