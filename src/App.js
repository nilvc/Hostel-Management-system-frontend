import {BrowserRouter as Router , Switch , Route} from 'react-router-dom';
import { Userprovider } from './components/Usercontext';
import {Navbar}  from './components/navbar';
import Home from './components/home';
import {Profile} from "./components/profile"

function App(){
  return (
    <Router>
      <Userprovider>
        <div className="App">
          <Navbar/>
          <Switch>
              <Route exact path="/" component={Home}/>
              <Route exact path="/profile" component={Profile}/>
          </Switch>
        </div>
        </Userprovider>
    </Router>
    
  );
}

export default App;
