import {useSelector} from 'react-redux';
import Grid from '@material-ui/core/Grid';
import MovieCardShort from './moviecardshort'
import { useEffect, useState } from 'react';
import './favs.css'

export default function Favs() {
    const [f, setF] = useState(['def']);

    const favs = useSelector(state => state.AddRemoveFavs);

   

    useEffect(() => {
        setF(favs);
        console.log(f)
    }, []);


    return (
        <div className='favourites'>
            {f.length > 0 ? (
                <Grid className='movie-list'
                container
                direction="row"
                justify="center"
                >
                    {
                        f.map(e => {

                            return (
                                <MovieCardShort 
                                    movieName = {e.movieName}
                                    moviePoster = {e. moviePoster}
                                    originalName = {e.originalName}
                                    releaseDate = {e.releaseDate}
                                    rating={e.rating}
                                    description={e.description}
                                    genres = {e.genres}
                                    id={e.id}
                />
                            )
                        })
                    }
                    </Grid>
            ) : 'No favourite movies'}

        
        </div>
    )
}