
import './moviecardshort.css';
import Button from '@material-ui/core/Button';
import Modal from '@material-ui/core/Modal';
import {useState, useEffect} from 'react';
import MovieCardFull from './moviecardfull'
import React from 'react';

import {useDispatch, useSelector} from 'react-redux';
import Grid from '@material-ui/core/Grid';


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
                saveToLocalStorage();
        } else {
            dispatch({type: 'REMOVE_FROM_FAVS', payload: id});
            removeFromLocalStorage();
        }

    }

    const removeFromLocalStorage = () => {
        if ( JSON.parse(localStorage.getItem('favs')).length > 0 ) {
            let lstorage = JSON.parse(localStorage.getItem('favs'));
            lstorage = lstorage.filter(e => e['id'] != id);
            localStorage.setItem('favs', JSON.stringify(lstorage));
        }
    }

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
      
      
     
    

    return (
        <div className='movie-card-short'>
            
                
            
            <div className='movie-card-short__desc'>
            <h1 className='movie-card-short__header__name'>{movieName}</h1>
                <p className='movie-card-short__header_genres'>{genres?genres.join(', '): <br />}</p>
                <Button fullWidth className='movie-card-short__header__addtofavs' variant="contained" color={isFaved.length > 0 ? 'secondary' : 'primary'} onClick={() => addRemoveFromFavs()}>{isFaved.length > 0 ?  'Remove from' : 'Add to'} Favourites</Button>
                <div className='movie-card-short__header_img-container'>
                    <img src={!moviePoster.includes('null')?moviePoster:'https://via.placeholder.com/500x750.jpg?text=No+Poster'} className='movie-card-short__desc__img' />
                </div>
                <Button variant="contained" color="primary" onClick={() => openModal()} fullWidth>See more info</Button>
            </div>

            <Modal
            open={open}
            onClose={() => setOpen(!open)}
            >
                
               <MovieCardFull 
                movieName={movieName}
                moviePoster={!moviePoster.includes('null')?moviePoster:'https://via.placeholder.com/200x300.png?text=No+Poster'}
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