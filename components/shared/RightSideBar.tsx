import React from "react";
import Image from "next/image";
import Link from "next/link";

import RenderTag from "./RenderTag";

import { getPopularQuestions } from "@/lib/actions/question.action";
import { getAllTags } from "@/lib/actions/tag.actions";

async function RightSideBar() {
  const { questions } = await getPopularQuestions();
  const { tags } = await getAllTags({ filter: "popular", pageSize: 5 });

  return (
    <section className="background-light900_dark200 light-border custom-scrollbar sticky right-0 top-0 flex h-screen w-[350px] flex-col overflow-y-auto border-l p-6 pt-36 shadow-light-300 dark:shadow-none max-xl:hidden">
      <div className="mb-[60px] flex flex-col">
        <h2 className="h3-bold text-dark200_light900 mb-[26px]">Hot Network</h2>
        <div className="flex flex-col gap-[30px]">
          {questions.map(({ _id, title }) => (
            <Link
              href={`/question/${_id}`}
              key={_id}
              className="flex cursor-pointer items-center justify-between gap-7"
            >
              <p className="body-medium text-dark500_light700">{title}</p>
              <Image
                src="/assets/icons/chevron-right.svg"
                alt="arrow right"
                width={20}
                height={20}
                className="invert-colors "
              />
            </Link>
          ))}
        </div>
      </div>
      <div className="mb-[60px] flex flex-col">
        <h2 className="h3-bold text-dark200_light900 mb-[26px]">
          Popular Tags
        </h2>
        <div className="flex flex-col gap-[16px]">
          {tags.map((tag) => (
            <RenderTag
              key={tag._id}
              _id={tag._id}
              name={tag.name}
              totalQuestions={tag.totalQuestions}
              showCount
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default RightSideBar;
