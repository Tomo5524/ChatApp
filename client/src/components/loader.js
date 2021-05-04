// import { useState } from "react";
import { css } from "@emotion/react";
// import RingLoader from "react-spinners/RingLoader";
import PacmanLoader from "react-spinners/PacmanLoader";

// Can be a string as well. Need to ensure each key-value pair ends with ;
const override = css`
  display: block;
  margin: 0 auto;
`;

function Loader() {
  // let [loading, setLoading] = useState(true);

  return (
    <div className="vh-100 d-flex flex-column justify-content-center align-items-center">
      <div className="mb-5 mr-4">
        <div className="sweet-loading mb-4">
          <PacmanLoader color="#FFFFFF" css={override} size={80} />
        </div>
      </div>
      <h1 className="ml-5 pt-4 pl-4">Loading...</h1>
    </div>
  );
}

export default Loader;
