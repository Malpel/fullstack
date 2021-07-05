import React from "react";
import { CoursePart } from "../App";

const Total = ({ courseParts }: { courseParts: CoursePart[] }) => {
  return (
    <div>
      <p>
        Number of exercises{" "}
        {courseParts.reduce((carry, part) => carry + part.exerciseCount, 0)}
      </p>
    </div>
  );
};

export default Total;