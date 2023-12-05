import React from "react";
import RenderTag from "../shared/RenderTag";

function HomeFilters({ filters }: { filters: string[] }) {
  return (
    <div className="mt-[30px] flex flex-wrap gap-3 max-md:hidden">
      {filters.map((filter) => (
        <RenderTag key={filter} _id={filter} name={filter} />
      ))}
    </div>
  );
}

export default HomeFilters;
