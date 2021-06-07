import MovieCardShort from './moviecardshort';
import './movielist.css';
import {useState, useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import Grid from '@material-ui/core/Grid';
import InfiniteScroll from 'react-infinite-scroll-component';


const key = '04b3d0c6123142a26162964fff18fab3';

export default function MovieList() {
    
    const [displayMovies, setDisplayMovies] = useState( [] );
    const [currPage, setCurrPage] = useState(1);
    const [mostPopular, setMostPopular] = useState([]);
    
   

    const movies = useSelector(state => state.UpdateSearch);
    const movie = useSelector(state => state.CurrMovie);

    const genreFromId = async() => {
        let url = `https://api.themoviedb.org/3/genre/movie/list?api_key=${key}&language=en-US`
        let response = await fetch(url);
        let data = await response.json();

        return data.genres;
        
    }

    useEffect(() => {
        genreFromId();
        
    },[])


    

    
    const fetchMoreData = () => {
        setCurrPage(prevState => prevState+1); 
        if (movie) {
            
        getSearchResults() 
         }
        else {
            getMostPopular()
        }
        
    }

   useEffect(() => {
    setCurrPage(prevState => prevState+1); 
    getMostPopular();

   }, [])


    useEffect(() => {
        if (movie.length>0) {
            
        setDisplayMovies(Object.entries(movies));
        
        }
    }, [movies]);


    const getMostPopular = async() => {
        let url = `https://api.themoviedb.org/3/movie/popular?api_key=${key}&language=en-US&page=${currPage}`;
        let response = await fetch(url);
        let data = await response.json();
        let genres = await genreFromId();
        if (data.results) {
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
            }
            
      
            setDisplayMovies(prevState => [...prevState, ...Object.entries(data)]);
            
      
        }
    }

    const getSearchResults = async () => {
        
        let url = `https://api.themoviedb.org/3/search/movie?api_key=${key}&language=en-US&query=${movie}&page=${currPage+1}&include_adult=false`
        let response = await fetch(url);
        let data = await response.json();
        let genres = await genreFromId();
        if (data.results) {
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
            }
            setDisplayMovies(prevState => [...prevState, ...Object.entries(data)]);

        }
       
        
        
      }

    return (
        
            <InfiniteScroll
          dataLength={displayMovies.length}
          next={() => fetchMoreData()}
          hasMore={true}
        >
            <Grid className='movie-list'
        container
        direction="row"
        justify="center"
        >
            {displayMovies.length > 0 && displayMovies.map(e => {
                
                return (
                    <MovieCardShort 
                     movieName = {e[1]&&e[1].title}
                     moviePoster = {e[1]&&`http://image.tmdb.org/t/p/w500${e[1].poster_path}`}
                     originalName = {e[1]&&e[1].original_title}
                    releaseDate = {e[1]&&e[1].release_date}
                    rating={e[1]&&e[1].vote_average}
                    description={e[1]&&e[1].overview}
                    genres = {e[1].genres}
                    id={e[1]&&e[1].id}
                />
                )
            })}
            
            </Grid>
        </InfiniteScroll>
        
    )
}