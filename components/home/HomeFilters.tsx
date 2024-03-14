"use client";

import React, { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import { Button } from "../ui/button";

import { HomePageFilters } from "@/constants/filters";
import { formUrlQuery, removeKeysFromQuery } from "@/lib/utils";

type ActiveState = string | null;

function HomeFilters() {
  const [active, setActive] = useState<ActiveState>(null);
  const searchParams = useSearchParams();
  const router = useRouter();

  const onFilterButton = (name: string, value: string) => {
    let newUrl;
    if (active !== name) {
      newUrl = formUrlQuery({
        params: searchParams.toString(),
        key: "filter",
        value,
      });
      setActive(name);
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
    <div className="mt-10 flex flex-wrap gap-3 max-md:hidden">
      {HomePageFilters.map(({ name, value }) => (
        <Button
          key={name}
          onClick={() => {
            onFilterButton(name, value);
          }}
          className={`${
            name === active
              ? "bg-primary-100 text-primary-500 hover:bg-primary-100 dark:bg-dark-400 dark:text-primary-500 dark:hover:bg-dark-400"
              : " bg-light-800 text-light-500 hover:bg-light-800 dark:bg-dark-300 dark:text-light-500 dark:hover:bg-dark-300"
          } body-medium rounded-lg px-4 py-2 capitalize shadow-none`}
        >
          {name}
        </Button>
      ))}
    </div>
  );
}

export default HomeFilters;
