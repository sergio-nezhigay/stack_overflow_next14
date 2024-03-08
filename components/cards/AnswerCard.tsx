import React from "react";
import { SignedIn } from "@clerk/nextjs";
import Link from "next/link";

import EditDeleteAction from "../shared/EditDeleteAction";
import Metric from "../shared/Metric";

import { formatAndDivideNumber, getTimestamp } from "@/lib/utils";

interface QuestionProps {
  _id: string;
  title: string;
  author: {
    _id: string;
    name: string;
    picture: string;
    clerkId: string;
  };
  upvotes: Array<object>;
  views: number;
  createdAt: Date;
  clerkId?: string | null;
}

function AnswerCard({
  clerkId,
  _id,
  title,
  author,
  upvotes,
  views,
  createdAt,
}: QuestionProps) {
  const showActionButtons = clerkId && clerkId === author.clerkId;
  return (
    <div key={_id} className="card-wrapper rounded-[10px] p-9 sm:px-11">
      <div className="flex justify-between">
        <Link href={`/question/${_id}`}>
          <h3 className="text-dark200_light900 h3-semibold mb-[14px] line-clamp-1">
            {title}
          </h3>
        </Link>
        <SignedIn>
          {showActionButtons && (
            <EditDeleteAction itemId={JSON.stringify(_id)} isAnswer />
          )}
        </SignedIn>
      </div>

      <div className="flex-between mt-6 w-full flex-wrap gap-3">
        <Metric
          imgUrl={author.picture}
          alt="user"
          value={author.name}
          title={` - asked ${getTimestamp(createdAt)}`}
          href={`/profile/${author._id}`}
          isAuthor
          textStyles="body-medium text-dark400_light700"
        />
        <div className="flex flex-wrap gap-[9px]">
          <Metric
            imgUrl="/assets/icons/like.svg"
            alt="Upvotes"
            value={formatAndDivideNumber(upvotes.length)}
            title=" Votes"
            textStyles="small-medium text-dark400_light800"
          />

          <Metric
            imgUrl="/assets/icons/eye.svg"
            alt="eye"
            value={views}
            title="Views"
            textStyles="small-medium text-dark400_light800"
          />
        </div>
      </div>
    </div>
  );
}

export default AnswerCard;
