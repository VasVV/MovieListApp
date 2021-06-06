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
import {useDispatch} from 'react-redux';
import {useEffect} from 'react';

function App() {

  const dispatch = useDispatch();
   let lstorage = localStorage.getItem('favs') !==null ? JSON.parse(localStorage.getItem('favs')) : [];
    

    useEffect(() => {
        console.log(lstorage);
        if (lstorage.length > 0) {
        lstorage.map(e => {
          dispatch({type: 'ADD_TO_FAVS', payload: e})
        })
      
      }
    },[])

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
