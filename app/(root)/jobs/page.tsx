import { Metadata } from "next";

import JobCard from "@/components/cards/JobCard";
import Filter from "@/components/shared/Filter";
import NoResult from "@/components/shared/NoResult";
import Pagination from "@/components/shared/Pagination";
import LocalSearchbar from "@/components/shared/search/LocalSearchbar";
import { JobFilters } from "@/constants/filters";
import { getJobs } from "@/lib/actions/general.action";
import { SearchParamsProps } from "@/types";

export const metadata: Metadata = {
  title: "Jobs | Dev overflowed",
};

export default async function Jobs({ searchParams }: SearchParamsProps) {
  const result = await getJobs({
    searchQuery: searchParams?.q,
    filter: searchParams?.filter,
    page: searchParams?.page ? +searchParams?.page : 1,
  });

  return (
    <>
      <h1 className="h1-bold text-dark100_light900">Jobs</h1>

      <div className="mt-11 flex justify-between gap-5 max-sm:flex-col sm:items-center">
        <LocalSearchbar
          route="/jobs"
          iconPosition="left"
          imgSrc="/assets/icons/search.svg"
          placeholder="Job Title, Company or Keywords"
          otherClasses="flex-1"
        />
        <Filter
          filters={JobFilters}
          otherClasses="min-h-[56px] sm:min-w-[170px]"
        />
      </div>

      <div className="mt-10 flex w-full flex-col gap-6">
        {result.jobs.length > 0 ? (
          result.jobs.map((job: any) => <JobCard key={job.job_id} job={job} />)
        ) : (
          <NoResult
            title="There’s no jobs"
            description="Try to change your request"
            link="/"
            linkTitle="Go to main page"
          />
        )}
      </div>
      <div className="mt-10">
        <Pagination
          pageNumber={searchParams?.page ? +searchParams.page : 1}
          isNext={result.isNext}
        />
      </div>
    </>
  );
}
