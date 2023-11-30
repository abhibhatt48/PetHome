//imports
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import { useSelector } from "react-redux";
//pages & components
import Home from "./Pages/Home";
import SignIn from "./Pages/SignIn";
import SignUp from "./Pages/SignUp";
import Donate from "./Pages/Donate";
import Adopt from "./Pages/Adopt";
import Logout from "./Pages/Logout";
import AdoptPage from "./Pages/AdoptPage";

import Navigation from "./Components/Navigation";

//css
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import UserPets from "./Pages/UserPets";
import Donations from "./Pages/Donations";

function App() {
  const { user } = useSelector((state) => state.authReducer);

  let routes;
  if (user) {
    routes = (
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/donate" exact component={Donate} />
        <Route path="/donations" exact component={Donations} />
        <Route path="/adopt" exact component={Adopt} />
        <Route path="/adopt/:id" exact component={AdoptPage} />
        <Route path="/userpets" component={UserPets} />
        <Route path="/logout" component={Logout} />
        <Redirect to="/" />
      </Switch>
    );
  } else {
    routes = (
      <Switch>
        <Route path="/signin" component={SignIn} />
        <Route path="/signup" component={SignUp} />
        <Redirect to="/signin" />
      </Switch>
    );
  }

  return (
    <Router>
      <div className="app">
        <Navigation />
        {routes}
      </div>
    </Router>
  );
}

export default App;
