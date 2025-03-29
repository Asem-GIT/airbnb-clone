import React, { useState } from 'react';
import './Booking.css';
import { Button, TextField } from '@mui/material';
import { DateRangePicker } from 'react-date-range';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import PeopleIcon from '@mui/icons-material/People';

function Booking({ price, oldPrice }) {
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const [guests, setGuests] = useState(1);

    const selectionRange = {
        startDate: startDate,
        endDate: endDate,
        key: "selection",
    };

    function handleSelect(ranges) {
        setStartDate(ranges.selection.startDate);
        setEndDate(ranges.selection.endDate);
    }

    const calculateNights = () => {
        const diffTime = Math.abs(endDate - startDate);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        return diffDays;
    };

    const calculateTotal = () => {
        const nights = calculateNights();
        const priceNumber = Number(price.replace(/[^0-9.-]+/g,""));
        return priceNumber * nights;
    };

    return (
        <div className="booking">
            <div className="booking__price-header">
                <h2>{price} <span>por noche</span></h2>
                {oldPrice && <span className="old-price">{oldPrice}</span>}
            </div>

            <DateRangePicker
                ranges={[selectionRange]}
                onChange={handleSelect}
                minDate={new Date()}
                rangeColors={["#FF385C"]}
            />

            <div className="booking__guests">
                <h3>
                    <PeopleIcon />
                    Huéspedes
                </h3>
                <TextField
                    type="number"
                    value={guests}
                    onChange={(e) => setGuests(Math.max(1, parseInt(e.target.value)))}
                    InputProps={{ inputProps: { min: 1 } }}
                />
            </div>

            <div className="booking__summary">
                <div className="booking__detail">
                    <span>{price} x {calculateNights()} noches</span>
                    <span>${calculateTotal()}</span>
                </div>
                <div className="booking__detail">
                    <span>Tarifa de limpieza</span>
                    <span>$50</span>
                </div>
                <div className="booking__detail">
                    <span>Tarifa de servicio</span>
                    <span>$30</span>
                </div>
                <div className="booking__total">
                    <strong>Total</strong>
                    <strong>${calculateTotal() + 80}</strong>
                </div>
            </div>

            <Button 
                variant="contained" 
                fullWidth
                onClick={() => alert('¡Reserva confirmada!')}
            >
                Reservar ahora
            </Button>
        </div>
    );
}

export default Booking;