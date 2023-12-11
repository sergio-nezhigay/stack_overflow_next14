import { QUESTIONS, TAGS } from "@/constants";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import RenderTag from "./RenderTag";

const popularTags = [
  { _id: "6", name: "React", totalQuestions: 5472 },
  { _id: "7", name: "Node", totalQuestions: 12038 },
  { _id: "8", name: "Python", totalQuestions: 8834 },
  { _id: "9", name: "Java", totalQuestions: 15679 },
  { _id: "10", name: "Angular", totalQuestions: 3421 },
];

function RightSideBar() {
  return (
    <section className="background-light900_dark200 light-border custom-scrollbar sticky right-0 top-0 h-screen w-[350px] flex-col overflow-y-auto  border-l px-[26px] pb-[50px] pt-[164px] shadow-light-300 dark:shadow-none max-xl:hidden lg:flex">
      <div className="mb-[60px] flex flex-col">
        <h2 className="h3-bold text-dark200_light900 mb-[26px]">Hot Network</h2>
        <div className="flex flex-col gap-[30px]">
          {QUESTIONS.map(({ id, question }) => (
            <Link href={id} key={id} className="flex-start gap-[10px]">
              <p className="body-medium text-dark500_light700">{question}</p>
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
          {popularTags.map((tag) => (
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
