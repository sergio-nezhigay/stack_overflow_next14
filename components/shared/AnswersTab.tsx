import React from "react";

import AnswerCard from "../cards/AnswerCard";

import Pagination from "./Pagination";

import { getAnswersByUserId } from "@/lib/actions/user.action";
import { SearchParamsProps } from "@/types";

interface AnswersTabProps extends SearchParamsProps {
  userId: string;
  clerkId: string | null;
}

const AnswersTab = async ({
  searchParams,
  userId,
  clerkId,
}: AnswersTabProps) => {
  const { answers, isNext } = await getAnswersByUserId({
    userId,
    page: searchParams.page ? +searchParams.page : 1,
  });

  return (
    <>
      {answers.map((answer) => (
        <AnswerCard
          key={answer._id}
          _id={answer._id}
          clerkId={clerkId}
          title={answer.question?.title}
          author={answer.author}
          upvotes={answer.upvotes}
          views={answer.question?.views}
          createdAt={answer.createdAt}
        />
      ))}
      <div className="mt-10">
        <Pagination
          pageNumber={searchParams?.page ? +searchParams.page : 1}
          isNext={isNext}
        />
      </div>
    </>
  );
};

export default AnswersTab;
