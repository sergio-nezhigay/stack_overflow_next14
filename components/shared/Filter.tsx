"use client";

import * as React from "react";
import { useRouter, useSearchParams } from "next/navigation";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { formUrlQuery, removeKeysFromQuery } from "@/lib/utils";

interface Props {
  filters: {
    name: string;
    value: string;
  }[];
  otherClasses?: string;
  containerClasses?: string;
}

type ActiveState = string | null;

function Filter({ filters, otherClasses, containerClasses }: Props) {
  const [active, setActive] = React.useState<ActiveState>(null);
  const router = useRouter();
  const searchParams = useSearchParams();
  const paramFilter = searchParams.get("filter");

  const onFilter = (value: string) => {
    let newUrl;
    if (active !== value) {
      newUrl = formUrlQuery({
        params: searchParams.toString(),
        key: "filter",
        value,
      });
      setActive(value);
    } else {
      newUrl = removeKeysFromQuery({
        params: searchParams.toString(),
        keysToRemove: ["filter"],
      });
      setActive(null);
    }
    router.push(newUrl, { scroll: false });
  };

  return (
    <div className={containerClasses}>
      <Select onValueChange={onFilter} defaultValue={paramFilter || undefined}>
        <SelectTrigger
          className={`${otherClasses} body-regular light-border background-light800_dark300 text-dark500_light700 border px-5 py-2.5`}
        >
          <div className="line-clamp-1 flex-1 text-left">
            <SelectValue placeholder="Select a filter" />
          </div>
        </SelectTrigger>
        <SelectContent className="text-dark500_light700 small-regular border-none bg-light-900 dark:bg-dark-300">
          <SelectGroup>
            {filters.map(({ name, value }) => (
              <SelectItem
                key={name}
                value={value}
                className="cursor-pointer focus:bg-light-800 dark:focus:bg-dark-400"
              >
                {name}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
}

export default Filter;
