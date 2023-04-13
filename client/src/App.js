import './App.css';
import { BrowserRouter, Route, Link } from "react-router-dom";
import { Landing } from './components/Landing';
import { Home } from './components/Home';
import { Navbar } from './components/Navbar';
import { CountrieDet } from './components/CountrieDet';
import { CreateAct } from './components/CreateAct';


 
function App() {
  

  return (
    <div className="App">
      <BrowserRouter>
      <Route exact path="/countries/:id"><CountrieDet></CountrieDet></Route>
      <Route exact path="/"><Landing></Landing></Route>
      <Route exact path="/CreateAct"><CreateAct></CreateAct></Route>
      <Route exact path="/home"><>
      <Navbar></Navbar>
      <Home></Home>
      </></Route>
      </BrowserRouter>
    </div>
  );
}

export default App;
