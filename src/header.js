import './header.css';
import {Link} from 'react-router-dom';

export default function Header() {

    return (
        <div className='header'>
            <div className='header_elem'><Link to='/'>Main</Link></div>
            <div className='header_elem'><Link to='/favs'>Favourites</Link></div>
        </div>
    )
}