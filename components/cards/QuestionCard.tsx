import React from "react";
import RenderTag from "../shared/RenderTag";
import Link from "next/link";
import { formatAndDivideNumber, getTimestamp } from "@/lib/utils";
import Metric from "../shared/Metric";

interface QuestionProps {
  _id: string;
  title: string;
  tags: {
    _id: string;
    name: string;
  }[];
  author: {
    _id: string;
    name: string;
    picture: string;
    clerkId: string;
  };
  upvotes: Array<object>;
  views: number;
  answers: Array<object>;
  createdAt: Date;
  clerkId?: string | null;
}

function QuestionCard({
  clerkId,
  _id,
  title,
  tags,
  author,
  upvotes,
  views,
  answers,
  createdAt,
}: QuestionProps) {
  return (
    <div key={_id} className="card-wrapper rounded-[10px] p-9 sm:px-11">
      <h3 className="text-dark200_light900 h3-semibold mb-[14px] line-clamp-1">
        {title}
      </h3>
      <div className="mt-3.5 flex flex-wrap gap-2">
        {tags.map((tag) => (
          <RenderTag key={tag._id} _id={tag._id} name={tag.name} />
        ))}
      </div>
      <div className="flex-between mt-6 w-full flex-wrap gap-3">
        <Metric
          imgUrl={author.picture}
          alt="user"
          value={`${author.name} | ${clerkId}`}
          title={`* - asked ${getTimestamp(createdAt)}`}
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
            imgUrl="/assets/icons/message.svg"
            alt="message"
            value={answers.length}
            title="Answers"
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

export default QuestionCard;
