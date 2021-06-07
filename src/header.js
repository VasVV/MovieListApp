import './header.css';
import {Link} from 'react-router-dom';
import Button from '@material-ui/core/Button';


export default function Header() {

    return (
        <div className='header'>
            <div className='header_elem'><Link to='/'><Button>Main</Button></Link></div>
            <div className='header_elem'><Link to='/favs'><Button>Favourites</Button></Link></div>
        </div>
    )
}