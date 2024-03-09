import React from "react";
import { auth } from "@clerk/nextjs";

import Question from "@/components/forms/Question";
import { getQuestionById } from "@/lib/actions/question.action";
import { getUserById } from "@/lib/actions/user.action";
import { ParamsProps } from "@/types";

const Page = async ({ params }: ParamsProps) => {
  const { userId } = auth();
  if (!userId) return null;
  const mongoUser = await getUserById({ userId });
  const result = await getQuestionById({ questionId: params.id });

  return (
    <div>
      <h1 className="h1-bold text-dark100_light900">Edit Question</h1>
      <div className="mt-9">
        <Question
          type="Edit"
          questionDetails={JSON.stringify(result)}
          mongoUserId={JSON.stringify(mongoUser._id)}
        />
      </div>
    </div>
  );
};

export default Page;
