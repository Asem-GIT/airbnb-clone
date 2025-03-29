import React, { useState } from 'react';
import './PropertyDetail.css';
import { useLocation, useParams, useNavigate } from 'react-router-dom';
import StarIcon from '@mui/icons-material/Star';
import { Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField } from '@mui/material';
import { DateRangePicker } from '@mui/x-date-pickers-pro/DateRangePicker';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

function PropertyDetail() {
    const location = useLocation();
    const navigate = useNavigate();
    const { id } = useParams();
    const propertyData = location.state;
    const [openDialog, setOpenDialog] = useState(false);
    const [dateRange, setDateRange] = useState([null, null]);
    const [guests, setGuests] = useState(1);

    const mapContainerStyle = {
        width: '100%',
        height: '400px',
        borderRadius: '12px'
    };

    if (!propertyData) {
        return (
            <div className="propertyDetail__error">
                <h2>Propiedad no encontrada</h2>
                <p>Lo sentimos, no pudimos encontrar los detalles de esta propiedad.</p>
                <Button variant="contained" onClick={() => navigate(-1)}>
                    Volver atrás
                </Button>
            </div>
        );
    }

    const handleReserveClick = () => {
        setOpenDialog(true);
    };

    const handleCloseDialog = () => {
        setOpenDialog(false);
    };

    const handleConfirmReservation = () => {
        // Aquí iría la lógica para procesar la reserva
        const reservationDetails = {
            propertyId: id,
            propertyName: propertyData.title,
            checkIn: dateRange[0],
            checkOut: dateRange[1],
            guests: guests,
            totalPrice: parseInt(propertyData.price.replace(/\D/g,'')) * 
                       (Math.ceil((dateRange[1] - dateRange[0]) / (1000 * 60 * 60 * 24)))
        };

        // Por ahora, solo mostraremos un alert
        alert('¡Reserva confirmada!\n' + 
              `Propiedad: ${reservationDetails.propertyName}\n` +
              `Check-in: ${dateRange[0]?.toLocaleDateString()}\n` +
              `Check-out: ${dateRange[1]?.toLocaleDateString()}\n` +
              `Huéspedes: ${guests}\n` +
              `Total: $${reservationDetails.totalPrice}`);
        
        setOpenDialog(false);
    };

    return (
        <div className="propertyDetail">
            <div className="propertyDetail__header">
                <h1>{propertyData.title}</h1>
                <div className="propertyDetail__headerInfo">
                    <div className="propertyDetail__stars">
                        <StarIcon className="propertyDetail__star" />
                        <p><strong>{propertyData.star}</strong></p>
                    </div>
                    <p>{propertyData.location}</p>
                </div>
            </div>

            <div className="propertyDetail__images">
                <div className="propertyDetail__mainImage">
                    <img src={propertyData.img} alt={propertyData.title} />
                </div>
                <div className="propertyDetail__secondaryImages">
                    <img src={propertyData.img} alt={propertyData.title} />
                    <img src={propertyData.img} alt={propertyData.title} />
                </div>
            </div>

            <div className="propertyDetail__info">
                <div className="propertyDetail__infoLeft">
                    <div className="propertyDetail__description">
                        <h2>Información sobre el alojamiento</h2>
                        <p>{propertyData.description}</p>
                    </div>
                    
                    <div className="propertyDetail__location">
                        <h2>Ubicación</h2>
                        <div className="propertyDetail__map">
                            <LoadScript googleMapsApiKey="AIzaSyAuAUP2wowKGb1OuAxm7cQiBA1kRiv2APo">
                                <GoogleMap
                                    mapContainerStyle={mapContainerStyle}
                                    center={{
                                        lat: propertyData.lat || 40.416775,
                                        lng: propertyData.lng || -3.703790
                                    }}
                                    zoom={15}
                                >
                                    <Marker
                                        position={{
                                            lat: propertyData.lat || 40.416775,
                                            lng: propertyData.lng || -3.703790
                                        }}
                                        title={propertyData.title}
                                    />
                                </GoogleMap>
                            </LoadScript>
                        </div>
                    </div>
                </div>

                <div className="propertyDetail__infoRight">
                    <div className="propertyDetail__priceBox">
                        <h2>Precio por noche</h2>
                        <h3>{propertyData.price}</h3>
                        <p>Total: {propertyData.total}</p>
                        <Button 
                            variant="contained" 
                            color="primary" 
                            fullWidth
                            onClick={handleReserveClick}
                        >
                            Reservar ahora
                        </Button>
                    </div>
                </div>
            </div>

            <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
                <DialogTitle>Reservar {propertyData.title}</DialogTitle>
                <DialogContent>
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <DateRangePicker
                            localeText={{ start: 'Check-in', end: 'Check-out' }}
                            value={dateRange}
                            onChange={(newValue) => setDateRange(newValue)}
                            minDate={new Date()}
                        />
                    </LocalizationProvider>
                    <TextField
                        margin="dense"
                        label="Número de huéspedes"
                        type="number"
                        fullWidth
                        value={guests}
                        onChange={(e) => setGuests(Math.max(1, parseInt(e.target.value) || 1))}
                        inputProps={{ min: 1, max: 10 }}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDialog} color="primary">
                        Cancelar
                    </Button>
                    <Button 
                        onClick={handleConfirmReservation} 
                        color="primary" 
                        variant="contained"
                        disabled={!dateRange[0] || !dateRange[1]}
                    >
                        Confirmar reserva
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

export default PropertyDetail; 