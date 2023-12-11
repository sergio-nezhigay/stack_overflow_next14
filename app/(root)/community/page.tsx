import LocalSearchbar from "@/components/shared/search/LocalSearchbar";
import Filter from "@/components/shared/Filter";
import { UserFilters } from "@/constants/filters";
import { getUsers } from "@/lib/actions/user.action";
import QuestionCard from "@/components/cards/QuestionCard";
import NoResult from "@/components/shared/NoResult";
import UserCard from "@/components/cards/UserCard";

export default async function Home() {
  const result = await getUsers({});
  result.users.push(result.users[0]);
  result.users.push(result.users[0]);
  //   console.log("🚀 ~ file: page.tsx:15 ~ result:", result.users);
  return (
    <>
      <div className="flex w-full justify-between gap-4 ">
        <h1 className="h1-bold text-dark100_light900">All Users</h1>
      </div>
      <div className="mt-11 flex justify-between gap-5 max-sm:flex-col sm:items-center md:flex-row">
        <LocalSearchbar
          route="/"
          iconPosition="left"
          imgSrc="/assets/icons/search.svg"
          placeholder="Search amazing minds here"
          otherClasses="flex-1"
        />
        <Filter
          filters={UserFilters}
          otherClasses="min-h-[56px] sm:min-w-[170px]"
          containerClasses="flex"
        />
      </div>
      <div className="mt-10 flex flex-wrap gap-4">
        {result.users.length > 0 ? (
          result.users.map((user) => <UserCard key={user._id} user={user} />)
        ) : (
          <NoResult
            title="There’s no user to show"
            description="Sign up and be the first take part! 🚀 Ask questions. Get involved! 💡"
            link="/sign-up"
            linkTitle="Sign Up"
          />
        )}
      </div>
    </>
  );
}
