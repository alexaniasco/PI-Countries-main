import './App.css';
import { BrowserRouter, Route, Link, Switch } from "react-router-dom";
import { Landing } from './components/Landing';
import { Home } from './components/Home';
import { Navbar } from './components/Navbar';
import { CountrieDet } from './components/CountrieDet';
import { CreateAct } from './components/CreateAct';
import axios from 'axios';
axios.defaults.baseURL = "https://pi-countries-main-eta.vercel.app/"
 
function App() {
  

  return (
    <div className="App">
      <BrowserRouter>
      <Switch>
      <Route exact path="/countries/:id"><CountrieDet></CountrieDet></Route>
      <Route exact path="/"><Landing></Landing></Route>
      <Route exact path="/CreateAct"><CreateAct></CreateAct></Route>
      <Route exact path="/home"><>
      
      <Navbar></Navbar>
      <Home></Home>
      </></Route>
      <Route exact path="*"><>
      
      <Navbar></Navbar>
      <Home></Home>
      </></Route>
      </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
