import React, {useState} from "react";
import "./App.css";
import Search from '../src/pages/Search';
import Saved from '../src/pages/Saved';
import NoMatch from '../src/pages/NoMatch';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import API from '../src/utils/API';

function App() {

  const [saved, setSaved] = useState('');

  // dont need first param, then create callback function
  API.sendUpdate(null, (data) => {
    setSaved(data)
    console.log(data)
  })

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
