import React, { useState, useContext } from "react";
import Login from "./components/login";
import Signup from "./components/sign-up";
import Chat from "./components/chat";
import Room from "./components/room";
import AddRoom from "./components/createRoom";
import Home from "./components/home";
import About from "./components/about";
import JoinPrivateRoom from "./components/join-private-room";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { UserContext } from "./UserContext";
import { LoadRoomsContext } from "./LoadRoomsContext";
import { authHeader, logOut, getUser } from "./services/auth";
import NavBar from "./components/nav";

function App() {
  // does this get user in the first render?
  const [user, setUser] = useState(getUser());
  const [roomsLoadCalled, setroomsLoadCalled] = useState(false);
  // console.log("🚀 ~ file: App.js ~ line 14 ~ App ~ user", user);

  return (
    <div>
      {/* <h1>Hello World</h1> */}
      <Router>
        {/* makes user a global variable */}
        <UserContext.Provider value={{ user, setUser }}>
          <LoadRoomsContext.Provider
            value={{ roomsLoadCalled, setroomsLoadCalled }}
          >
            <NavBar />
            <Switch>
              <Route exact path="/" component={Home} />
              <Route exact path="/about" component={About} />
              <Route path="/sign-up" component={Signup} />
              <Route path="/login" component={Login} />
              <Route path="/join-private-room" component={JoinPrivateRoom} />
              <Route path="/chat/:userSlug/:roomSlug" component={Chat} />
              <Route path="/chat/:userSlug" component={Room} />
              <Route path="/create-room" component={AddRoom} />
            </Switch>
          </LoadRoomsContext.Provider>
        </UserContext.Provider>
      </Router>
    </div>
  );
}

export default App;
