import React, { useState } from 'react';
import './Header.css';
import SearchIcon from '@mui/icons-material/Search';
import LanguageIcon from '@mui/icons-material/Language';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { Button } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';

function Header() {
    const navigate = useNavigate();
    const [searchInput, setSearchInput] = useState("");

    const handleSearch = (e) => {
        e.preventDefault();
        if (searchInput) {
            navigate(`/search?q=${encodeURIComponent(searchInput)}`);
        }
    };

    return (
        <div className='header'>
            <Link to="/" style={{ textDecoration: 'none' }}>
                <img
                    className="header__icon"
                    src="https://i.pinimg.com/originals/3c/bf/be/3cbfbe148597341fa56f2f87ade90956.png"
                    alt=""
                />
            </Link>
            
            <form className='header__center' onSubmit={handleSearch}>
                <input 
                    type="text" 
                    placeholder='Buscar alojamientos'
                    value={searchInput}
                    onChange={(e) => setSearchInput(e.target.value)}
                />
                <SearchIcon onClick={handleSearch} />
            </form>
            
            <div className='header__right'>
                <Button onClick={() => navigate('/search')}>Explorar</Button>
                <LanguageIcon />
                <div className='header__user'>
                    <MenuIcon />
                    <AccountCircleIcon />
                </div>
            </div>
        </div>
    )
}

export default Header; 