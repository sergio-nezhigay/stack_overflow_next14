import { getQuestionById } from "@/lib/actions/question.action";
import Link from "next/link";
import Image from "next/image";
import Metric from "@/components/shared/Metric";
import { formatAndDivideNumber, getTimestamp } from "@/lib/utils";
import AllAnswers from "@/components/shared/AllAnswers";
import ParseHTML from "@/components/shared/ParseHTML";

import Answer from "@/components/forms/Answer";
import { auth } from "@clerk/nextjs";
import { getUserById } from "@/lib/actions/user.action";
import RenderTag from "@/components/shared/RenderTag";
import Votes from "@/components/shared/Votes";

const Page = async ({ params }: any) => {
  const { userId: clerkId } = auth();

  let mongoUser;

  if (clerkId) {
    mongoUser = await getUserById({ userId: clerkId });
  }
  const result = await getQuestionById({ questionId: params.id });

  return (
    <div className="flex w-full flex-col">
      <div className="flex w-full flex-col-reverse justify-between gap-5 sm:flex-row sm:items-center sm:gap-2">
        <Link
          href={`/profile/${result.author.clerkId}`}
          className="flex items-center justify-start gap-1"
        >
          <Image
            src={result.author.picture}
            className="rounded-full"
            width={22}
            height={22}
            alt="profile"
          />
          <p className="paragraph-semibold text-dark300_light700">
            {result.author.name}
          </p>
        </Link>
        <div className="flex justify-end">
          <Votes
            type="question"
            userId={JSON.stringify(mongoUser?._id)}
            itemId={JSON.stringify(params.id)}
            upvotes={result.upvotes.length}
            downvotes={result.downvotes.length}
            hasUpvoted={result.upvotes.includes(mongoUser?._id)}
            hasDownvoted={result.downvotes.includes(mongoUser?._id)}
            isSaved={mongoUser?.saved.includes(params.id)}
          />
        </div>
      </div>
      <h2 className="h2-semibold text-dark200_light900 mt-3.5 w-full text-left">
        {result.title}
      </h2>
      <div className="mb-[30px] mt-[18px] flex justify-start gap-[15px]">
        <Metric
          imgUrl="/assets/icons/clock.svg"
          alt="time created"
          value="asked "
          title={`${getTimestamp(result.createdAt)}`}
          textStyles="small-medium text-dark400_light800"
        />
        <Metric
          imgUrl="/assets/icons/like.svg"
          alt="Upvotes"
          value={formatAndDivideNumber(result.upvotes.length)}
          title="Votes"
          textStyles="small-medium text-dark400_light800"
        />
        <Metric
          imgUrl="/assets/icons/message.svg"
          alt="answers"
          value={formatAndDivideNumber(result.answers.length)}
          title="Answers"
          textStyles="small-medium text-dark400_light800"
        />
        <Metric
          imgUrl="/assets/icons/eye.svg"
          alt="Views"
          value={formatAndDivideNumber(result.views)}
          title="Views"
          textStyles="small-medium text-dark400_light800"
        />
      </div>
      <ParseHTML data={result.content} />
      <div className="mt-8 flex flex-wrap gap-2">
        {result.tags.map((tag: any) => (
          <RenderTag
            key={tag._id}
            _id={tag._id}
            name={tag.name}
            showCount={false}
          />
        ))}
      </div>
      <AllAnswers
        questionId={result._id}
        userId={mongoUser._id}
        totalAnswers={result.answers.length}
      />
      <Answer
        question={result.content}
        questionId={JSON.stringify(result._id)}
        authorId={JSON.stringify(mongoUser._id)}
      />
    </div>
  );
};

export default Page;
