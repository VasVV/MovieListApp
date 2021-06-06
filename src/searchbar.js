import './searchbar.css'
import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';

const key = '04b3d0c6123142a26162964fff18fab3';

export default function SearchBar() {

    const dispatch = useDispatch();

    const [movie, setMovie] = useState('');
    const [searchResult, setSearchResult] = useState([]);
    const [genres, setGenres] = useState([])

    const genreFromId = async() => {
        let url = `https://api.themoviedb.org/3/genre/movie/list?api_key=${key}&language=en-US`
        let response = await fetch(url);
        let data = await response.json();

        setGenres(data.genres);
        
    }

    useEffect(() => {
        genreFromId();
        
    },[])

    useEffect(() => {
        getSearchResults();
       
    }, [movie]);

    

    const getSearchResults = async () => {
        let url = `https://api.themoviedb.org/3/search/movie?api_key=${key}&language=en-US&query=${movie}&page=1&include_adult=false`
        let response = await fetch(url);
        let data = await response.json();
       
        
       if (data.results && data.results.length > 0) {
        data = data.results.map(e => {
            let currMovieGenres = [];
            if (e.genre_ids.length > 0 ) {
                
                for (let a = 0; a<genres.length; a++) {
                    if( e.genre_ids.includes(genres[a].id) ) {
                       
                        currMovieGenres.push(genres[a].name)
                    }
                }
                e['genres'] = currMovieGenres;
                
            }
            return e;
        })
        setSearchResult(data);

        
        passSearchResults(searchResult);
        }
      }

    const passSearchResults = (searchResult) => {
        dispatch({type: 'UPDATE_SEARCH', payload: searchResult})
    }


    return (
        <div className='search-bar'>
           <input type='text' onChange={(e) => setMovie(e.target.value)} className='search-bar__input' />
        </div>
    )
}