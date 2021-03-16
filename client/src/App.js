import React, {useState} from "react";
import "./App.css";
import Search from '../src/pages/Search';
import Saved from '../src/pages/Saved';
import NoMatch from '../src/pages/NoMatch';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import API from '../src/utils/API';
import Notification from '../src/components/Notification';

function App() {

  const [saved, setSaved] = useState('');

  // Dont need first param because we have already set it to volumeInfo that is being passed from Search.js to API.js
  // The callback is storing the book title in the saved state so that it can be used in the Notification component for socket.io
  // On line 24 I am passing the state as a prop to Notification.js
  API.sendUpdate(null, (data) => {
    setSaved(data)
    console.log(data)
  })

  return (
    <Router>
      <Notification saved={saved}/>
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
