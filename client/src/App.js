import React, { useState, useContext } from "react";
import Login from "./components/login";
import Signup from "./components/sign-up";
import Chat from "./components/chat";
import Room from "./components/room";
import AddRoom from "./components/createRoom";
import Home from "./components/home";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { UserContext } from "./UserContext";
import { authHeader, logOut, getUser } from "./services/auth";

function App() {
  // does this get user in the first render?
  const [user, setUser] = useState(getUser());
  console.log("🚀 ~ file: App.js ~ line 14 ~ App ~ user", user);

  return (
    <div>
      {/* <h1>Hello World</h1> */}
      <Router>
        <div>
          {/* makes user a global variable */}
          <UserContext.Provider value={{ user, setUser }}>
            <Switch>
              <Route exact path="/" component={Home} />
              <Route path="/sign-up" component={Signup} />
              <Route path="/login" component={Login} />
              <Route path="/chat/:userSlug/:roomSlug" component={Chat} />
              <Route path="/chat/:userSlug" component={Room} />
              <Route path="/create-room" component={AddRoom} />
            </Switch>
          </UserContext.Provider>
        </div>
      </Router>
    </div>
  );
}

export default App;
