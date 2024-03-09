import React from "react";

import Informer from "./Informer";

interface Props {
  totalQuestions: number;
  totalAnswers: number;
}

function Stats({ totalQuestions, totalAnswers }: Props) {
  return (
    <>
      <h4>Stats</h4>
      <Informer>
        <div className="">
          <p>{totalQuestions}</p>
          <p>Questions</p>
        </div>
        <div className="">
          <p>{totalAnswers}</p>
          <p>Answers</p>
        </div>
      </Informer>
    </>
  );
}

export default Stats;
