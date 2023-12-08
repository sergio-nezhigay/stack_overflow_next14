import Link from "next/link";
import React from "react";

interface MetricProps {
  imgUrl: string;
  alt: string;
  value: string | number;
  title: string;
  href?: string;
  textStyles?: string;
  isAuthor?: boolean;
}

function Metric({
  imgUrl,
  alt,
  value,
  title,
  href,
  textStyles,
  isAuthor,
}: MetricProps) {
  const children = (
    <>
      {isAuthor ? (
        <div className="mr-0.5 h-5 w-5 rounded-full bg-slate-400"></div>
      ) : (
        <div className="h-4 w-4 bg-red-200"></div>
      )}
      <p className={`${textStyles} flex items-center gap-1`}>
        {value}
        <span
          className={`${
            isAuthor ? "max-sm:hidden  " : " "
          } small-regular line-clamp-1 block `}
        >
          {title}
        </span>
      </p>
    </>
  );

  if (href) {
    return (
      <Link className="flex items-center gap-0.5" href={href}>
        {children}
      </Link>
    );
  } else {
    return <div className="flex items-center gap-0.5">{children}</div>;
  }
}

export default Metric;
