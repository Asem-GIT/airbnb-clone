import React, { useState, useEffect } from 'react';
import './SearchPage.css';
import { Button, Slider, Menu, MenuItem, FormControl, Select } from '@mui/material';
import SearchResult from './SearchResult';
import { useLocation } from 'react-router-dom';

function SearchPage() {
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(true);
    const [priceRange, setPriceRange] = useState([0, 1000]);
    const [propertyType, setPropertyType] = useState('todos');
    const [anchorEl, setAnchorEl] = useState(null);
    const [typeAnchorEl, setTypeAnchorEl] = useState(null);
    const location = useLocation();
    const searchQuery = new URLSearchParams(location.search).get('q');

    const allProperties = [
        {
            img: "https://images.unsplash.com/photo-1594741158704-5a784b8e59fb",
            location: "Villa privada en Miami",
            title: "Villa con piscina y vista al mar",
            description: "4 huéspedes · 3 habitaciones · 2 camas · 2 baños · WiFi · Cocina · Estacionamiento",
            star: 4.73,
            price: "350",
            total: "1400",
            type: "villa",
            tags: ["miami", "villa", "piscina", "lujo"],
            lat: 25.7617,
            lng: -80.1918
        },
        {
            img: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267",
            location: "Apartamento en Barcelona",
            title: "Apartamento en el centro histórico",
            description: "2 huéspedes · 1 habitación · 1 cama · 1 baño · WiFi · Cocina",
            star: 4.3,
            price: "130",
            total: "520",
            type: "apartamento",
            tags: ["barcelona", "apartamento", "centro"],
            lat: 41.3851,
            lng: 2.1734
        },
        {
            img: "https://images.unsplash.com/photo-1499793983690-e29da59ef1c2",
            location: "Villa en Tulum",
            title: "Villa de lujo frente al mar",
            description: "6 huéspedes · 4 habitaciones · 4 camas · 3 baños · WiFi · Piscina · Playa privada",
            star: 4.9,
            price: "250",
            total: "1000",
            type: "villa",
            tags: ["tulum", "villa", "playa", "lujo"],
            lat: 20.2139,
            lng: -87.4669
        },
        {
            img: "https://images.unsplash.com/photo-1501183638710-841dd1904471",
            location: "Loft en Madrid",
            title: "Loft moderno en el corazón de la ciudad",
            description: "2 huéspedes · Estudio · 1 cama · 1 baño · WiFi · Cocina equipada",
            star: 4.6,
            price: "120",
            total: "480",
            type: "apartamento",
            tags: ["madrid", "loft", "moderno"],
            lat: 40.416775,
            lng: -3.703790
        },
        {
            img: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688",
            location: "Ático en París",
            title: "Ático con vista a la Torre Eiffel",
            description: "4 huéspedes · 2 habitaciones · 2 camas · 2 baños · WiFi · Terraza",
            star: 4.8,
            price: "280",
            total: "1120",
            type: "apartamento",
            tags: ["paris", "atico", "lujo", "vista"],
            lat: 48.8566,
            lng: 2.3522
        },
        {
            img: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6",
            location: "Casa de Montaña en Aspen",
            title: "Cabaña de lujo con vistas a las montañas",
            description: "8 huéspedes · 4 habitaciones · 6 camas · 3 baños · Chimenea · Jacuzzi",
            star: 4.95,
            price: "450",
            total: "1800",
            type: "casa",
            tags: ["aspen", "montaña", "lujo", "ski"],
            lat: 39.1911,
            lng: -106.8175
        },
        {
            img: "https://images.unsplash.com/photo-1469796466635-455ede028aca",
            location: "Villa en Santorini",
            title: "Villa tradicional con vistas al mar Egeo",
            description: "6 huéspedes · 3 habitaciones · 3 camas · 2 baños · Piscina infinita · Terraza",
            star: 4.9,
            price: "380",
            total: "1520",
            type: "villa",
            tags: ["santorini", "grecia", "lujo", "vista"],
            lat: 36.4052,
            lng: 25.4215
        },
        {
            img: "https://images.unsplash.com/photo-1523217582562-09d0def993a6",
            location: "Apartamento en Tokio",
            title: "Apartamento moderno en Shibuya",
            description: "3 huéspedes · 2 habitaciones · 2 camas · 1 baño · Metro cercano · WiFi",
            star: 4.7,
            price: "200",
            total: "800",
            type: "apartamento",
            tags: ["tokio", "moderno", "ciudad"],
            lat: 35.6895,
            lng: 139.6917
        },
        {
            img: "https://images.unsplash.com/photo-1510798831971-661eb04b3739",
            location: "Cabaña en los Alpes Suizos",
            title: "Cabaña acogedora con vistas panorámicas",
            description: "4 huéspedes · 2 habitaciones · 3 camas · 1 baño · Chimenea · Sauna",
            star: 4.85,
            price: "290",
            total: "1160",
            type: "casa",
            tags: ["suiza", "alpes", "montaña", "ski"],
            lat: 46.5197,
            lng: 7.6692
        },
        {
            img: "https://images.unsplash.com/photo-1602002418082-a4443e081dd1",
            location: "Casa de Playa en Maldivas",
            title: "Villa sobre el agua con acceso directo al mar",
            description: "2 huéspedes · 1 habitación · 1 cama · 1 baño · Terraza privada · Snorkel",
            star: 5.0,
            price: "480",
            total: "1920",
            type: "villa",
            tags: ["maldivas", "playa", "lujo", "romantico"],
            lat: 3.2028,
            lng: 73.2207
        },
        {
            img: "https://images.unsplash.com/photo-1507089947368-19c1da9775ae",
            location: "Apartamento en Roma",
            title: "Apartamento histórico cerca del Coliseo",
            description: "4 huéspedes · 2 habitaciones · 2 camas · 1 baño · Balcón · WiFi",
            star: 4.6,
            price: "180",
            total: "720",
            type: "apartamento",
            tags: ["roma", "historico", "centro"],
            lat: 41.9028,
            lng: 12.4964
        },
        {
            img: "https://images.unsplash.com/photo-1518780664697-55e3ad937233",
            location: "Casa en Amsterdam",
            title: "Casa típica junto al canal",
            description: "6 huéspedes · 3 habitaciones · 4 camas · 2 baños · Jardín · Bicicletas",
            star: 4.75,
            price: "220",
            total: "880",
            type: "casa",
            tags: ["amsterdam", "canal", "tradicional"],
            lat: 52.3702,
            lng: 4.8952
        },
        {
            img: "https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf",
            location: "Casa en los Cabos",
            title: "Villa de lujo con vista panorámica al océano",
            description: "8 huéspedes · 4 habitaciones · 5 camas · 4.5 baños · Infinity Pool · Chef privado",
            star: 4.98,
            price: "650",
            total: "2600",
            type: "villa",
            tags: ["mexico", "playa", "lujo", "chef", "piscina"],
            lat: 20.6597,
            lng: -87.0847
        },
        {
            img: "https://images.unsplash.com/photo-1566073771259-6a8506099945",
            location: "Chalé en Zermatt",
            title: "Chalé alpino con vistas al Matterhorn",
            description: "10 huéspedes · 5 habitaciones · 7 camas · 4 baños · Sauna · Ski-in/Ski-out",
            star: 4.92,
            price: "800",
            total: "3200",
            type: "casa",
            tags: ["suiza", "ski", "lujo", "montaña"],
            lat: 46.5197,
            lng: 7.6692
        },
        {
            img: "https://images.unsplash.com/photo-1584132967334-10e028bd69f7",
            location: "Penthouse en Nueva York",
            title: "Ático de lujo en Manhattan",
            description: "4 huéspedes · 2 habitaciones · 2 camas · 2.5 baños · Terraza · Vista a Central Park",
            star: 4.89,
            price: "750",
            total: "3000",
            type: "apartamento",
            tags: ["nueva york", "lujo", "ciudad", "vista"],
            lat: 40.785091,
            lng: -73.968285
        },
        {
            img: "https://images.unsplash.com/photo-1542718610-a1d656d1884c",
            location: "Casa en Bali",
            title: "Villa tradicional en la jungla",
            description: "6 huéspedes · 3 habitaciones · 3 camas · 3 baños · Piscina · Jardín tropical",
            star: 4.95,
            price: "280",
            total: "1120",
            type: "villa",
            tags: ["bali", "indonesia", "tropical", "piscina"],
            lat: -8.4095,
            lng: 115.1889
        },
        {
            img: "https://images.unsplash.com/photo-1580587771525-78b9dba3b914",
            location: "Casa en Lake Tahoe",
            title: "Cabaña moderna junto al lago",
            description: "12 huéspedes · 6 habitaciones · 8 camas · 4 baños · Muelle privado · Kayaks",
            star: 4.87,
            price: "520",
            total: "2080",
            type: "casa",
            tags: ["lake tahoe", "lago", "naturaleza", "deportes"],
            lat: 39.1911,
            lng: -106.8175
        },
        {
            img: "https://images.unsplash.com/photo-1613490493576-7fde63acd811",
            location: "Apartamento en Dubái",
            title: "Apartamento de lujo en Dubai Marina",
            description: "4 huéspedes · 2 habitaciones · 2 camas · 2 baños · Gimnasio · Piscina infinita",
            star: 4.91,
            price: "420",
            total: "1680",
            type: "apartamento",
            tags: ["dubai", "lujo", "marina", "moderno"],
            lat: 25.276987,
            lng: 55.296233
        },
        {
            img: "https://images.unsplash.com/photo-1614957004131-9e8f2a13123c",
            location: "Casa en Mykonos",
            title: "Villa blanca con vista al mar Egeo",
            description: "8 huéspedes · 4 habitaciones · 5 camas · 3 baños · Piscina · BBQ",
            star: 4.88,
            price: "460",
            total: "1840",
            type: "villa",
            tags: ["mykonos", "grecia", "playa", "piscina"],
            lat: 37.4489,
            lng: 25.3275
        },
        {
            img: "https://images.unsplash.com/photo-1595877244574-e90ce41ce089",
            location: "Apartamento en Praga",
            title: "Apartamento histórico en Ciudad Vieja",
            description: "3 huéspedes · 1 habitación · 2 camas · 1 baño · Balcón · Vista a la plaza",
            star: 4.82,
            price: "140",
            total: "560",
            type: "apartamento",
            tags: ["praga", "historico", "centro", "romantico"],
            lat: 50.0755,
            lng: 14.4378
        },
        {
            img: "https://images.unsplash.com/photo-1587061949409-02df41d5e562",
            location: "Casa en Cape Town",
            title: "Villa moderna con vista a Table Mountain",
            description: "6 huéspedes · 3 habitaciones · 4 camas · 3 baños · Piscina · Jardín",
            star: 4.93,
            price: "380",
            total: "1520",
            type: "villa",
            tags: ["cape town", "sudafrica", "moderno", "vista"],
            lat: -33.9249,
            lng: 18.4241
        },
        {
            img: "https://images.unsplash.com/photo-1510798831971-661eb04b3739",
            location: "Cabaña en Noruega",
            title: "Cabaña con aurora boreal",
            description: "4 huéspedes · 2 habitaciones · 3 camas · 1 baño · Sauna · Techo de cristal",
            star: 4.97,
            price: "340",
            total: "1360",
            type: "casa",
            tags: ["noruega", "aurora", "naturaleza", "unico"],
            lat: 60.4720,
            lng: 8.4689
        }
    ];

    // Manejadores para el filtro de precio
    const handlePriceClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handlePriceClose = () => {
        setAnchorEl(null);
    };

    const handlePriceChange = (event, newValue) => {
        setPriceRange(newValue);
    };

    const applyPriceFilter = () => {
        filterResults();
        handlePriceClose();
    };

    // Manejadores para el filtro de tipo
    const handleTypeClick = (event) => {
        setTypeAnchorEl(event.currentTarget);
    };

    const handleTypeClose = () => {
        setTypeAnchorEl(null);
    };

    const handleTypeChange = (event) => {
        setPropertyType(event.target.value);
        handleTypeClose();
    };

    useEffect(() => {
        // Inicializar resultados con todas las propiedades al montar
        setResults(allProperties);
        setLoading(false);
    }, []);

    const filterResults = () => {
        let filtered = [...allProperties];

        // Aplicar filtro de búsqueda si existe
        if (searchQuery) {
            const searchTerms = searchQuery.toLowerCase().split(' ');
            filtered = filtered.filter(property => 
                searchTerms.some(term => 
                    property.location.toLowerCase().includes(term) ||
                    property.title.toLowerCase().includes(term) ||
                    property.description.toLowerCase().includes(term) ||
                    property.tags.some(tag => tag.includes(term))
                )
            );
        }

        // Aplicar filtro de precio
        filtered = filtered.filter(property => {
            const price = parseInt(property.price);
            return price >= priceRange[0] && price <= priceRange[1];
        });

        // Aplicar filtro de tipo de propiedad
        if (propertyType !== 'todos') {
            filtered = filtered.filter(property => property.type === propertyType);
        }

        setResults(filtered);
        setLoading(false);
    };

    // Aplicar filtros cuando cambien los valores
    useEffect(() => {
        filterResults();
    }, [searchQuery, priceRange, propertyType]);

    return (
        <div className='searchPage'>
            <div className='searchPage__info'>
                <p>
                    {loading ? 'Buscando...' : 
                     `${results.length} alojamientos encontrados ${searchQuery ? `para "${searchQuery}"` : ''}`}
                </p>
                <h1>Lugares para hospedarte</h1>
                
                {/* Filtro de tipo */}
                <Button 
                    variant="outlined"
                    onClick={handleTypeClick}
                    className={propertyType !== 'todos' ? 'active-filter' : ''}
                >
                    Tipo: {propertyType === 'todos' ? 'Todos' : propertyType}
                </Button>
                <Menu
                    anchorEl={typeAnchorEl}
                    open={Boolean(typeAnchorEl)}
                    onClose={handleTypeClose}
                >
                    <MenuItem onClick={() => handleTypeChange({ target: { value: 'todos' }})}>
                        Todos
                    </MenuItem>
                    <MenuItem onClick={() => handleTypeChange({ target: { value: 'apartamento' }})}>
                        Apartamento
                    </MenuItem>
                    <MenuItem onClick={() => handleTypeChange({ target: { value: 'villa' }})}>
                        Villa
                    </MenuItem>
                    <MenuItem onClick={() => handleTypeChange({ target: { value: 'casa' }})}>
                        Casa
                    </MenuItem>
                </Menu>

                {/* Filtro de precio actualizado */}
                <Button 
                    variant="outlined"
                    onClick={handlePriceClick}
                    className={priceRange[0] !== 0 || priceRange[1] !== 1000 ? 'active-filter' : ''}
                >
                    Precio: ${priceRange[0]} - ${priceRange[1]}
                </Button>
                <Menu
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)}
                    onClose={handlePriceClose}
                    className="price-menu"
                >
                    <MenuItem onClick={(e) => e.stopPropagation()}>
                        <div className="price-slider">
                            <h3>Rango de precio por noche</h3>
                            <Slider
                                value={priceRange}
                                onChange={handlePriceChange}
                                valueLabelDisplay="auto"
                                min={0}
                                max={1000}
                                step={10}
                            />
                            <div className="price-range">
                                <span>${priceRange[0]}</span>
                                <span>${priceRange[1]}</span>
                            </div>
                            <div className="price-buttons">
                                <Button 
                                    variant="outlined" 
                                    onClick={handlePriceClose}
                                >
                                    Cancelar
                                </Button>
                                <Button 
                                    variant="contained" 
                                    onClick={applyPriceFilter}
                                    color="primary"
                                >
                                    Aplicar filtro
                                </Button>
                            </div>
                        </div>
                    </MenuItem>
                </Menu>

                <Button variant="outlined">Habitaciones</Button>
                <Button variant="outlined">Más filtros</Button>
            </div>

            <div className="searchPage__results">
                {loading ? (
                    <div className="searchPage__loading">Cargando resultados...</div>
                ) : results.length === 0 ? (
                    <div className="searchPage__noResults">
                        <h2>No se encontraron resultados</h2>
                        <p>Prueba ajustando los filtros o cambiando tu búsqueda</p>
                    </div>
                ) : (
                    <div className="searchPage__resultsList">
                        {results.map((result, index) => (
                            <SearchResult
                                key={index}
                                id={index}
                                img={result.img}
                                location={result.location}
                                title={result.title}
                                description={result.description}
                                star={result.star}
                                price={`$${result.price} / noche`}
                                total={`$${result.total} total`}
                            />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

export default SearchPage; 