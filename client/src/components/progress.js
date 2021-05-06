import React from "react";
import PropTypes from "prop-types";

const Progress = ({ percentage }) => {
  console.log(
    "🚀 ~ file: progress.js ~ line 5 ~ Progress ~ percentage",
    percentage
  );
  return (
    <div className="progress">
      <div
        className="progress-bar  bg-success progress-bar-striped bg-success"
        role="progressbar"
        style={{ width: `${percentage}%` }}
      >
        {/* {percentage}% */}
        Hiya
      </div>
    </div>
  );
};

Progress.propTypes = {
  percentage: PropTypes.number.isRequired,
};

export default Progress;
