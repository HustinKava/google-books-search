import React from "react";
import "./App.css";
import Search from '../src/pages/Search';
import Saved from '../src/pages/Saved';
import NoMatch from '../src/pages/NoMatch';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

function App() {
  return (
    <Router>
      <Switch>

        <Route exact path='/' component={Search}/>
        <Route exact path='/search' component={Search}/>
        <Route exact path='/saved' component={Saved}/>
        <Route exact path='*' component={NoMatch}/>

      </Switch>
    </Router>
  );
}


export default App;
