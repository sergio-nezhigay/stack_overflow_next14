import { SearchParamsProps } from "@/types";

import React from "react";

interface AnswersTabProps extends SearchParamsProps {
  userId: string;
  clerkId: string;
}

const AnswersTab = async ({
  searchParams,
  userId,
  clerkId,
}: AnswersTabProps) => {
  return <div>AnswersTab</div>;
};

export default AnswersTab;
