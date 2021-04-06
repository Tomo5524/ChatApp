import Login from "./components/login";
import Signup from "./components/sign-up";
import Chat from "./components/chat";
import Home from "./components/home";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

function App() {
  return (
    <div>
      {/* <h1>Hello World</h1> */}
      {/* <BrowserRouter basename={process.env.PUBLIC_URL}> */}
      <Router>
        <div className="container">
          {/* <NavBar /> */}
          {/* <Signup /> */}
          <Switch>
            {/* <Route exact path="/" component={<Home currentUser={currentUser} />} /> */}
            <Route exact path="/" component={Home} />
            <Route exact path="/sign-up" component={Signup} />
            {/* <Route path="/sign-up" component={Signup} /> */}
            <Route path="/login" component={Login} />
            <Route path="/chat/:slug" component={Chat} />
            {/* <Route path="/:slug" component={Room} />  */}

            {/* <Route path="/sign-up" component={Signup} /> for some reason, if signup component is here, showPost gets called first and causes an error */}
          </Switch>
        </div>
      </Router>
    </div>
  );
}

export default App;
