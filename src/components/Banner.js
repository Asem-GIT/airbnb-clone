import React, { useState } from 'react';
import './Banner.css';
import { Button } from '@mui/material';
import Search from './Search';
import { useNavigate } from 'react-router-dom';

function Banner() {
    const [showSearch, setShowSearch] = useState(false);
    const navigate = useNavigate();

    const handleExploreClick = () => {
        navigate('/search');
    };

    const handleSearch = (searchParams) => {
        // Recibir los parámetros de búsqueda del componente Search
        const { startDate, endDate, guests } = searchParams;
        
        // Construir la URL con los parámetros
        const queryParams = new URLSearchParams();
        if (startDate) queryParams.append('startDate', startDate);
        if (endDate) queryParams.append('endDate', endDate);
        if (guests) queryParams.append('guests', guests);
        
        // Navegar a la página de búsqueda con los filtros
        navigate(`/search?${queryParams.toString()}`);
        setShowSearch(false);
    };

    return (
        <div className='banner'>
            <div className='banner__search'>
                {showSearch && <Search onSearch={handleSearch} />}
                <Button 
                    onClick={() => setShowSearch(!showSearch)}
                    variant='outlined'
                    className='banner__searchButton'
                >
                    {showSearch ? "Ocultar" : "Buscar fechas"}
                </Button>
            </div>
            <div className='banner__info'>
                <h1>Sal de la rutina y descubre nuevos lugares</h1>
                <h5>Planea un viaje diferente para descubrir lugares increíbles cerca de ti.</h5>
                <Button 
                    variant='outlined'
                    onClick={handleExploreClick}
                >
                    Explorar cerca
                </Button>
            </div>
        </div>
    );
}

export default Banner; 