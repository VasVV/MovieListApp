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
    const [loader, setLoader] = useState('Loading...')

   

    const movies = useSelector(state => state.UpdateSearch);
    const movie = useSelector(state => state.CurrMovie)
    
    const fetchMoreData = () => {
        setCurrPage(prevState => prevState+1); 
        getSearchResults()
        
    }

    useEffect(() => {
        
        setDisplayMovies(Object.entries(movies));
        console.log(displayMovies);
        
    }, [movies]);

    const getSearchResults = async () => {
        
        let url = `https://api.themoviedb.org/3/search/movie?api_key=${key}&language=en-US&query=${movie}&page=${currPage+1}&include_adult=false`
        let response = await fetch(url);
        let data = await response.json();
       
        
        if (data.results) {
      
            setDisplayMovies(prevState => [...prevState, ...Object.entries(data.results)]);
      
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
                     moviePoster = {e[1]&&`http://image.tmdb.org/t/p/w200/${e[1].poster_path}`}
                     originalName = {e[1]&&e[1].original_title}
                    releaseDate = {e[1]&&e[1].release_date}
                    rating={e[1]&&e[1].vote_average}
                    description={e[1]&&e[1].overview}
                    genres = {e[1]&&e[1].genres}
                    id={e[1]&&e[1].id}
                />
                )
            })}
            
            </Grid>
        </InfiniteScroll>
        
    )
}