import {BrowserRouter as Router , Switch , Route} from 'react-router-dom';
import { Userprovider } from './components/Usercontext';
import {Navbar}  from './components/Navbar';
import Home from './components/Home';
import {Student_profile} from "./components/Student_profile"
import {Staff_profile} from "./components/Staff_profile"
import { Visitor } from './components/visitor';

function App(){
  return (
    <Router>
      <Userprovider>
        <div className="App">
          <Navbar/>
          <Switch>
              <Route exact path="/" component={Home}/>
              <Route exact path="/student" component={Student_profile}/>
              <Route exact path="/staff" component={Staff_profile}/>
              <Route exact path="/add_visitor" component={Visitor}/>
          </Switch>
        </div>
        </Userprovider>
    </Router>
    
  );
}

export default App;
