import Question from "@/components/forms/Question";
import React from "react";
// import { auth } from "@clerk/nextjs";
import { getUserById } from "@/lib/actions/user.action";
import { redirect } from "next/navigation";

async function Page() {
  // const { userId } = auth();
  const userId = "clerk123";

  if (!userId) redirect("/sign-in");

  const mongoUser = await getUserById({ userId });
  console.log("🚀 ~ file: page.tsx:13 ~ mongoUser:", mongoUser);

  return (
    <div>
      <h1 className="h1-bold text-dark100_light900">Ask a question</h1>
      <div className="mt-9">
        <Question mongoUserId={JSON.stringify(mongoUser?._id)} />
      </div>
    </div>
  );
}

export default Page;
