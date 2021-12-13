import { useState } from 'react';
import Home from "./Home";
// import { Switch, Route } from "react-router-dom";
 import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
 import Login from "./login/login"
import Register from "./register/register"
import Homepage from "./homepage/homepage"

import About from "./Pages/About";
import Contact from "./Pages/Contact";
import Service from "./Pages/Service";
import Error from "./Pages/Error";


const App = () => {
  const [ user, setLoginUser] = useState({})
  return (
    <>
   <Router>
      <Switch>
        <Route exact path="/" component={Home}></Route>
        <Route path="/about" component={About}></Route>
        <Route path="/contact" component={Contact}></Route>
        <Route path="/services" component={Service}></Route>
        <Route path="/login" component={() => <Login setLoginUser={setLoginUser}></Login>}></Route>
        <Route path="/register" component={Register}></Route>
        
        <Route component={Error}></Route>
      </Switch>
      </Router>
      
    </>
  );
};

export default App;
