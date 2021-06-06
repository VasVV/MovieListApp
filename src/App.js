import logo from './logo.svg';
import './App.css';
import MovieList from './movielist';
import SearchBar from './searchbar';
import Header from './header';
import Favs from './favs';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

function App() {
  return (
    <div className="app">
       <Router>
        <Header />
        <Switch>
            <Route exact path="/">
              <SearchBar />
              <MovieList />
            </Route>
            <Route path='/favs'>
                <Favs />
            </Route>
        </Switch>
        </Router>
    </div>
  );
}

export default App;
