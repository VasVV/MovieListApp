import {useSelector} from 'react-redux';
import Grid from '@material-ui/core/Grid';
import MovieCardShort from './moviecardshort'
import { useEffect, useState } from 'react';
import './favs.css'
import MovieCardFull from './moviecardfull';

export default function Favs() {
    const [f, setF] = useState([]);

    const favs = useSelector(state => state.AddRemoveFavs);

   

    useEffect(() => {
        setF(favs);
        console.log(favs)
    }, []);


    return (
        <div className='favourites'>
            <Grid className='movie-list'
        container
        direction="row"
        justify="center"
        >

            {favs.length > 0 && favs.map(e => {
                return (
                    <MovieCardShort 
                    movieName={e.movieName}
                    id={e.id}
                    moviePoster={e.moviePoster}
                    originalName = {e.originalName}
                    releaseDate = {e.releaseDate}
                    rating={e.rating}
                    description={e.description}
                    genres = {e.genres}
                    id={e.id}
                    />
                )
            })}
            </Grid>
        </div>
    )
}