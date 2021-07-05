import React from "react";
import Part from "./Part";
import { CoursePart } from "../App";

const Content = ({ courseParts }: { courseParts: CoursePart[] }) => {
  return (
    <div>
      <Part courseParts={courseParts} />
    </div>
  );
};

export default Content;