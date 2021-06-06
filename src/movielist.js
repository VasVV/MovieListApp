import MovieCardShort from './moviecardshort';
import './movielist.css';
import {useState, useEffect} from 'react';
import {useSelector} from 'react-redux';
import Grid from '@material-ui/core/Grid';


const key = '04b3d0c6123142a26162964fff18fab3';

export default function MovieList() {
    
    const [displayMovies, setDisplayMovies] = useState( [] );

    const movies = useSelector(state => state.UpdateSearch);


    

    useEffect(() => {
        
        setDisplayMovies(Object.entries(movies));
        console.log(displayMovies);
        
    }, [movies])

    return (
        <Grid className='movie-list'
        container
        direction="row"
        justify="center"
        
        >
            {displayMovies.length > 0 && displayMovies.map(e => {
                
                return (
                    <MovieCardShort 
                     movieName = {e[1].title}
                     moviePoster = {`http://image.tmdb.org/t/p/w200/${e[1].poster_path}`}
                     originalName = {e[1].original_title}
                    releaseDate = {e[1].release_date}
                    rating={e[1].vote_average}
                    description={e[1].overview}
                    genres = {e[1].genres}
                    id={e[1].id}
                />
                )
            })}
            
        </Grid>
    )
}