import React from "react";
import "./style/about.css";

function About() {
  return (
    <div className="container h-90vh">
      <div className="d-flex h-100 justify-content-center align-items-center ">
        <div className="box-about p-3">
          <ul className="square-bullet">
            <li>
              <p className="font-weight-600">
                User can create only one account.
              </p>
            </li>
            <li>
              <p className="font-weight-600">
                In order to chat with someone, you need to be in the same room
                with that person.
              </p>
            </li>
            <li>
              <p className="font-weight-600">
                You can create as many rooms as you want.
              </p>
            </li>
            <li>
              <p className="font-weight-600">
                You can host multiple people in one room.
              </p>
            </li>
            <li>
              <p className="font-weight-600">Let's have some fun!</p>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default About;
