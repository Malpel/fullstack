import React from "react";
import { CoursePart } from "../App";

const Part = ({ courseParts }: { courseParts: CoursePart[] }) => {
  const parts: JSX.Element[] = [];

  courseParts.forEach(part => {
    switch (part.type) {
      
      case "normal":
        parts.push(
          <div>
            <p><b>{part.name} {part.exerciseCount}</b>
            <br/>
            <em>{part.description}</em></p>
          </div>
        )
        break;

      case "groupProject":
        parts.push(
          <div>
            <p><b>{part.name} {part.exerciseCount} </b> 
            <br/>
            project exercises: {part.groupProjectCount}</p>
          </div>
        )
        break;

      case "submission":
        parts.push(
          <div>
            <p><b>{part.name} {part.exerciseCount}</b>
            <br/>
            <em>{part.description}</em>
            <br/>
            {part.exerciseSubmissionLink}</p>
          </div>
        )
        break;

      case "special":
        parts.push(
          <div>
            <p><b>{part.name} {part.exerciseCount}</b>
            <br/>
            <em>{part.description}</em>
            <br/>
            Required skills: {part.requirements.map((r) => `${r} `)}</p>
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