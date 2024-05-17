import { EmptyStar, FillStar } from "@/svgs";
import React from "react";

const Star = ({ onClick, onHover, offHover, full }) => {
  return (
    <div
      role="button"
      className=" cursor-pointer"
      onClick={onClick}
      onMouseEnter={onHover}
      onMouseLeave={offHover}
    >
      {full ? <FillStar /> : <EmptyStar />}
    </div>
  );
};

export default Star;
