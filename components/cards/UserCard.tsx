import { getTopInteractedTags } from "@/lib/actions/tag.actions";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import RenderTag from "../shared/RenderTag";
import { Badge } from "../ui/badge";

interface Props {
  user: {
    _id: string;
    clerkId: string;
    picture: string;
    name: string;
    username: string;
  };
}

async function UserCard({ user }: Props) {
  const { clerkId, _id, picture, name, username } = user;
  console.log(
    "clerkId, _id, picture, name, username",
    clerkId,
    _id,
    picture,
    name,
    username
  );

  const interactedTags = await getTopInteractedTags({ userId: user._id });
  return (
    <Link
      href={`/profile/${clerkId}`}
      className="shadow-light100_darknone max-xs:min-w-full xs:w-[260px] w-full"
    >
      <article className="background-light900_dark200 light-border flex w-full flex-col items-center justify-center rounded-2xl border p-8">
        <Image
          src={picture}
          alt={name}
          width={100}
          height={100}
          className="mx-auto mb-[18px] rounded-full"
        />
        <h3 className="text-dark200_light900 h3-bold  mb-[7px] line-clamp-1 text-center">
          {name}
        </h3>
        <p className="text-dark500_light700 body-regular  mb-5 line-clamp-1 text-center">
          @{username}
        </p>
        <div className="flex-center gap-2">
          {interactedTags.length > 0 ? (
            <>
              {interactedTags.map((tag) => (
                <RenderTag key={tag} _id={tag} name={tag} />
              ))}
            </>
          ) : (
            <Badge>No tags yet</Badge>
          )}
        </div>
      </article>
    </Link>
  );
}

export default UserCard;
