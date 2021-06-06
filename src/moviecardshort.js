
import './moviecardshort.css';
import Button from '@material-ui/core/Button';
import Modal from '@material-ui/core/Modal';
import {useState, useEffect} from 'react';
import MovieCardFull from './moviecardfull'
import React from 'react';

import {useDispatch, useSelector} from 'react-redux';



export default function MovieCardShort({
    movieName,
    moviePoster,
    originalName,
    releaseDate,
    rating,
    description,
    genres,
    id
}) {

    const [open, setOpen] = useState(false);
    const dispatch = useDispatch();
    const [faved, setFaved] = useState(false);

    const isFaved = useSelector(state => state.AddRemoveFavs).filter(e => e.id == id);

    const checkFaved = () => {
        if (isFaved.length > 0) {
            setFaved(true)
        }
    }

    useEffect(() => {
        checkFaved()
    }, [])

    const openModal = () => {

       
       
        setOpen(!open)
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
        } else {
            dispatch({type: 'REMOVE_FROM_FAVS', payload: id})
        }

    }
    

    return (
        <div className='movie-card-short'>
            <div className='movie-card-short__header'>
                <h1 className='movie-card-short__header__name'>{movieName}</h1>
                <p className='movie-card-short__header_genres'>{genres&&genres.join(', ')}</p>
                <Button className='movie-card-short__header__addtofavs' variant="contained" color={isFaved.length > 0 ? 'secondary' : 'primary'} onClick={() => addRemoveFromFavs()}>{isFaved.length > 0 ?  'Remove from' : 'Add to'} Favourites</Button>
            </div>
            <div className='movie-card-short__desc'>
                <img src={moviePoster} className='movie-card-short__desc__img' />
                <Button variant="contained" color="primary" onClick={() => openModal()}>See more info</Button>
            </div>

            <Modal
            open={open}
            onClose={() => setOpen(!open)}
            >
                
               <MovieCardFull 
                movieName={movieName}
                moviePoster={moviePoster}
                originalName={originalName}
                releaseDate={releaseDate}
                rating={rating}
                description={description}
                genres={genres}
                id={id}

               />
                
            </Modal>
            
        </div>
    )
}