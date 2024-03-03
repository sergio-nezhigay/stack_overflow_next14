import React, { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

const Informer = ({ children }: Props) => {
  return (
    <div className="m-4 inline-flex gap-8 rounded border p-4  text-center shadow-md">
      {children}
    </div>
  );
};

export default Informer;
