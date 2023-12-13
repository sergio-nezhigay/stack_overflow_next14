import { getQuestionById } from "@/lib/actions/question.action";

export default async function Page({ params }: { params: { slug: string } }) {
  const result = await getQuestionById({ questionId: params.slug });

  return (
    <div className="">
      <h2 className="h2-semibold text-dark200_light900">
        {result.question?.title}
      </h2>
      <p>{params.slug}</p>
    </div>
  );
}
