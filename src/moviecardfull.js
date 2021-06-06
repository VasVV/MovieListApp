import './moviecardfull.css'
import Button from '@material-ui/core/Button';
import { useState } from 'react';
import {useSelector, useDispatch} from 'react-redux';

const key = '04b3d0c6123142a26162964fff18fab3';

export default function MovieCardFull ({
    movieName,
    originalName,
    moviePoster,
    releaseDate,
    rating,
    description,
    genres,
    id
}) {
    const isFaved = useSelector(state => state.AddRemoveFavs).filter(e => e.id == id);
    const [similar, setSimilar] = useState([]);
    const dispatch = useDispatch();

    const recieveSimilar = async() => {
        let url = `https://api.themoviedb.org/3/movie/${id}/similar?api_key=${key}&language=en-US&page=1`
        let response = await fetch(url);
        let data = await response.json();
        data = data.results.splice(0,4);
        setSimilar(data);
    }

    useState(() => {
        recieveSimilar();
        
    },[])
    const saveToLocalStorage = () => {
        let lstorage = JSON.parse(localStorage.getItem('favs')) || [];
        lstorage.push({movieName,
            moviePoster,
            originalName,
            releaseDate,
            rating,
            description,
            genres,
            id});
            localStorage.setItem('favs', JSON.stringify(lstorage));
      }

      const removeFromLocalStorage = () => {
        let lstorage = JSON.parse(localStorage.getItem('favs'));
        lstorage = lstorage.filter(e => e['id'] != id);
        localStorage.setItem('favs', JSON.stringify(lstorage));
    }

      const addRemoveFromFavs = () => {
        if (isFaved.length == 0) {
            dispatch({type: 'ADD_TO_FAVS', payload: {movieName,
                moviePoster,
                originalName,
                releaseDate,
                rating,
                description,
                genres,
                id}});
                saveToLocalStorage();
        } else {
            dispatch({type: 'REMOVE_FROM_FAVS', payload: id});
            removeFromLocalStorage();
        }

    }
    

    return (
        <div className='movie-card-full'>
            <div className='movie-card-full__header'>
                <h1 className='movie-card-full__header__english-name'>{movieName}</h1>
                <h3 className='movie-card-full__header__original-name'>{originalName}</h3>
            </div>
            <div className='movie-card-full__info'>
                <div className='movie-card-full__poster'>
                    <img src={moviePoster} className='movie-card-full__poster__img' />
                    <div className='movie-card-full__add-to-favs'>
                <Button fullWidth className='movie-card-full__add-to-favs__btn' variant="contained" color={isFaved.length > 0 ? 'secondary' : 'primary'} onClick={() => addRemoveFromFavs()}>{isFaved.length > 0 ?  'Remove from' : 'Add to'} favourites</Button>
            </div>
                </div>

                <div className='movie-card-full__description'>
                    <p className='movie-card-full__description__release-date'><strong>Release date: </strong>{releaseDate}</p>
                    <p className='movie-card-full__description__rating'><strong>Rating: </strong>{rating}</p>
                    <p className='movie-card-full__description__genres'><strong>Genres: </strong>{genres&&genres.join(', ')}</p>
                    <p className='movie-card-full__description__description-text'>{description}</p>
                </div>
                <div className='movie-card-full__similar-movies'>
                    <h3 className='movie-card-full__similar-movies__header'>Similar movies</h3>
                    <ul className='movie-card-full__similar-movies__list'>
                    {similar.map(e => {

                        return (
                            <li>{e.title}</li>
                        )
                    })}
                    </ul>
                </div>
            </div>
            
        </div>
    )
}