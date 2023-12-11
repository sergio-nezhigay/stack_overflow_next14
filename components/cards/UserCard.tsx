import Link from "next/link";
import React from "react";

interface Props {
  user: {
    _id: string;
    clerkId: string;
    picture: string;
    name: string;
    username: string;
  };
}

function UserCard({ user }: Props) {
  const { clerkId, _id, picture, name, username } = user;
  console.log(
    "clerkId, _id, picture, name, username",
    clerkId,
    _id,
    picture,
    name,
    username
  );
  return (
    <Link href={`profile/user_${_id}`} className="w-[260px] max-w-full">
      <div className="card-wrapper rounded-[10px] p-9 sm:px-11">
        <h3 className="text-dark200_light900 h3-semibold mb-[14px] line-clamp-1">
          {name}
          {username}
        </h3>
      </div>
    </Link>
  );
}

export default UserCard;
