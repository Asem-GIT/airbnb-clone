import React, { useState } from 'react';
import './Search.css';
import { DateRangePicker } from 'react-date-range';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import PeopleIcon from '@mui/icons-material/People';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

function Search() {
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const navigate = useNavigate();

    const selectionRange = {
        startDate: startDate,
        endDate: endDate,
        key: "selection",
    };

    function handleSelect(ranges) {
        setStartDate(ranges.selection.startDate);
        setEndDate(ranges.selection.endDate);
    }

    return (
        <div className='search'>
            <DateRangePicker 
                ranges={[selectionRange]}
                onChange={handleSelect}
            />
            <h2>
                Número de huéspedes
                <PeopleIcon />
            </h2>
            <input 
                min={0}
                defaultValue={2}
                type="number" 
            />
            <Button onClick={() => navigate('/search')}>Buscar Airbnb</Button>
        </div>
    )
}

export default Search; 