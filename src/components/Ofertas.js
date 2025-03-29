import React, { useState } from 'react';
import './Ofertas.css';
import Card from './Card';
import { Button, Slider, FormControl, Select, MenuItem } from '@mui/material';

function Ofertas() {
    const [priceRange, setPriceRange] = useState([0, 500]);
    const [tipoAlojamiento, setTipoAlojamiento] = useState('todos');

    return (
        <div className='ofertas'>
            <div className='ofertas__header'>
                <h1>Ofertas especiales cerca de ti</h1>
                <p>Descubre alojamientos únicos con los mejores precios</p>
            </div>

            <div className='ofertas__filters'>
                <div className='filter__section'>
                    <h3>Rango de precio</h3>
                    <Slider
                        value={priceRange}
                        onChange={(e, newValue) => setPriceRange(newValue)}
                        valueLabelDisplay="auto"
                        min={0}
                        max={500}
                    />
                    <p>${priceRange[0]} - ${priceRange[1]}</p>
                </div>

                <div className='filter__section'>
                    <h3>Tipo de alojamiento</h3>
                    <FormControl fullWidth>
                        <Select
                            value={tipoAlojamiento}
                            onChange={(e) => setTipoAlojamiento(e.target.value)}
                        >
                            <MenuItem value="todos">Todos</MenuItem>
                            <MenuItem value="casa">Casas</MenuItem>
                            <MenuItem value="apartamento">Apartamentos</MenuItem>
                            <MenuItem value="villa">Villas</MenuItem>
                        </Select>
                    </FormControl>
                </div>
            </div>

            <div className='ofertas__section'>
                <h2>Ofertas de última hora</h2>
                <div className='ofertas__row'>
                    <Card
                        id="1"
                        src="https://images.unsplash.com/photo-1522708323590-d24dbb6b0267"
                        title="Loft en el centro"
                        description="15% de descuento para reservas esta semana"
                        price="$85/noche"
                        oldPrice="$100/noche"
                        rating={4.8}
                        reviews={95}
                    />
                    <Card
                        id="2"
                        src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c"
                        title="Suite de lujo"
                        description="20% de descuento en estancias largas"
                        price="$200/noche"
                        oldPrice="$250/noche"
                        rating={4.8}
                        reviews={95}
                    />
                    <Card
                        id="3"
                        src="https://images.unsplash.com/photo-1613490493576-7fde63acd811"
                        title="Casa con piscina"
                        description="Oferta especial: 3x2 en noches"
                        price="$150/noche"
                        oldPrice="$180/noche"
                        rating={4.8}
                        reviews={95}
                    />
                </div>
            </div>

            <div className='ofertas__section'>
                <h2>Mejores valorados con descuento</h2>
                <div className='ofertas__row'>
                    <Card
                        id="4"
                        src="https://images.unsplash.com/photo-1540541338287-41700207dee6"
                        title="Apartamento vista al mar"
                        description="10% de descuento - 4.9 ★ (120 reviews)"
                        price="$160/noche"
                        oldPrice="$180/noche"
                        rating={4.9}
                        reviews={120}
                    />
                    <Card
                        id="5"
                        src="https://images.unsplash.com/photo-1512917774080-9991f1c4c750"
                        title="Villa con jardín"
                        description="15% de descuento - 4.8 ★ (95 reviews)"
                        price="$220/noche"
                        oldPrice="$260/noche"
                        rating={4.8}
                        reviews={95}
                    />
                    <Card
                        id="6"
                        src="https://images.unsplash.com/photo-1520250497591-112f2f40a3f4"
                        title="Cabaña en la montaña"
                        description="25% de descuento - 4.9 ★ (200 reviews)"
                        price="$120/noche"
                        oldPrice="$160/noche"
                        rating={4.9}
                        reviews={200}
                    />
                </div>
            </div>
        </div>
    )
}

export default Ofertas; 