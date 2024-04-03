import React from "react";
import Image from "next/image";

import Metric from "../shared/Metric";

interface Props {
  job: {
    job_title: string;
    job_description: string;
    employer_logo: string;
    employer_name: string;
    job_city: string;
    job_state: string;
    job_country: string;
    job_employment_type: string;
    job_min_salary: string;
    job_apply_link: string;
  };
}

function JobCard({ job }: Props) {
  console.log(job);
  const salary = job.job_min_salary || "Not disclosed";
  return (
    <div className="card-wrapper rounded-[10px] p-9 sm:px-11">
      <div className="flex flex-row items-start gap-6">
        <Image
          src={job.employer_logo}
          alt={`${job.employer_name} logo`}
          width={64}
          height={64}
          className="rounded-xl object-cover"
        />
        <div className="">
          <div className="flex-between flex">
            <h3 className="text-dark200_light900 h3-semibold line-clamp-2">
              {job.job_title}
            </h3>
            <div className="background-light800_dark400 flex shrink-0 items-center justify-end gap-2 rounded-2xl px-3 py-1.5">
              <p className="body-medium text-dark400_light700  hyphens-none">
                {`${job.job_city} ${job.job_state} ${job.job_country}`}
              </p>
            </div>
          </div>

          <p className="body-regular text-dark500_light700 mt-2 line-clamp-2">
            {job.job_description}
          </p>
          <div className="flex-between mt-8 flex-wrap gap-6">
            <div className="flex gap-6">
              <Metric
                imgUrl="/assets/icons/clock-2.svg"
                alt="timeline"
                value={job.job_employment_type}
                title=""
                textStyles="body-medium text-light-500"
              />
              <Metric
                imgUrl="/assets/icons/currency-dollar-circle.svg"
                alt="money"
                value={salary}
                title=""
                textStyles="body-medium text-light-500"
              />
            </div>
            <a
              href={job.job_apply_link}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2"
            >
              <p className="body-semibold primary-text-gradient">View job</p>

              <Image
                src="/assets/icons/arrow-up-right.svg"
                alt="arrow up right"
                width={20}
                height={20}
              />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default JobCard;
