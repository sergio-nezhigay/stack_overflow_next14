"use client";

import React from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";

import { downvoteAnswer, upvoteAnswer } from "@/lib/actions/answer.action";
import { toggleSaveQuestion } from "@/lib/actions/question.action";

const upvoteURL = "/assets/icons/upvote.svg";
const downvoteURL = "/assets/icons/downvote.svg";
const starRedURL = "/assets/icons/star-red.svg";
const starFilledURL = "/assets/icons/star-filled.svg";

interface IVotes {
  type: string;
  itemId: string;
  upvotes: number;
  downvotes: number;
  hasUpvoted: boolean;
  hasDownvoted: boolean;
  isSaved: boolean;
  userId: string;
}

const Votes: React.FC<IVotes> = ({
  type,
  itemId,
  userId,
  upvotes,
  downvotes,
  hasUpvoted,
  hasDownvoted,
  isSaved,
}) => {
  const path = usePathname();

  async function onUpvote() {
    try {
      await upvoteAnswer({
        type,
        itemId: JSON.parse(itemId),
        userId: JSON.parse(userId),
        path,
        hasUpvoted,
        hasDownvoted,
      });
    } catch (error) {
      console.log(error);
    }
  }
  async function onDownvote() {
    try {
      await downvoteAnswer({
        type,
        itemId: JSON.parse(itemId),
        userId: JSON.parse(userId),
        path,
        hasUpvoted,
        hasDownvoted,
      });
    } catch (error) {
      console.log(error);
    }
  }

  async function onStar() {
    try {
      await toggleSaveQuestion({
        questionId: JSON.parse(itemId),
        userId: JSON.parse(userId),
        path,
      });
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <p>{type}</p>
      <Image
        src={upvoteURL}
        width={18}
        height={18}
        onClick={() => onUpvote()}
        alt="up arrow"
        className=""
      />
      <p>{upvotes}</p>
      <Image
        src={downvoteURL}
        width={18}
        height={18}
        alt="down arrow"
        className=""
        onClick={onDownvote}
      />
      <p>{downvotes}</p>
      {type === "question" && (
        <>
          {isSaved ? (
            <Image
              src={starFilledURL}
              width={18}
              height={18}
              alt="down arrow"
              className=""
              onClick={onStar}
            />
          ) : (
            <Image
              src={starRedURL}
              width={18}
              height={18}
              alt="down arrow"
              className=""
              onClick={onStar}
            />
          )}
        </>
      )}
    </>
  );
};

export default Votes;
