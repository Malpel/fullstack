import React from "react";
import { CoursePart } from "../App";

const Part = ({ courseParts }: { courseParts: CoursePart[] }) => {
  const parts: JSX.Element[] = [];

  courseParts.forEach(part => {
    switch (part.name) {
      
      case "Fundamentals":
        parts.push(
          <div>
            <p>{part.description} {part.exerciseCount}</p>
          </div>
        )
        break;

      case "Using props to pass data":
        parts.push(
          <div>
            <p>{part.name} {part.exerciseCount}</p>
          </div>
        )
        break;

      case "Advanced":
        parts.push(
          <div>
            <p>{part.name} {part.exerciseCount}</p>
          </div>
        )
        break;

      case "Deeper type usage":
        parts.push(
          <div>
            <p>{part.name} {part.exerciseCount}</p>
          </div>
        )
        break;

      default:
        assertNever(part);
        break;
    }
  })

  return (
    <div>
      {parts}
    </div>
  );
};

/**
 * Helper function for exhaustive type checking
 */
const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

export default Part;