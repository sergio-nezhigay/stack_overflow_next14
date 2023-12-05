import * as React from "react";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface Props {
  filters: {
    name: string;
    value: string;
  };
  otherClasses: string;
  containerClasses: string;
}

function Filter({ filters, otherClasses, containerClasses }: Props) {
  return (
    <div className={containerClasses}>
      <Select>
        <SelectTrigger
          className={`${otherClasses} background-light800_darkgradient text-dark500_light700 line-clamp-1 h-[56px] w-full border bg-red-200 px-5 py-[10px] outline-1 focus:outline focus:ring-0 focus:ring-offset-0 sm:w-[170px] md:hidden`}
        >
          <SelectValue placeholder="Select a fruit" className="bg-red-200" />
        </SelectTrigger>
        <SelectContent className="background-light800_darkgradient  p-[2px]">
          <SelectGroup className="">
            {filters.map((filter) => (
              <SelectItem key={filter} value={filter}>
                {filter}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
}

export default Filter;
