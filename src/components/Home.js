import React from 'react';
import './Home.css';
import Banner from './Banner';
import Card from './Card';

function Home() {
    return (
        <div className='home'>
            <Banner />

            <div className='home__section'>
                <h1>Lugares populares</h1>
                <div className='home__row'>
                    <Card
                        id="1"
                        src="https://images.unsplash.com/photo-1594741158704-5a784b8e59fb"
                        title="Penthouse en Miami"
                        description="Lujoso penthouse con vista panorámica"
                        price="$350/noche"
                    />
                    <Card
                        id="2"
                        src="https://images.unsplash.com/photo-1522708323590-d24dbb6b0267"
                        title="Apartamento en Barcelona"
                        description="Apartamento en el corazón de la ciudad"
                        price="$130/noche"
                    />
                    <Card
                        id="3"
                        src="https://images.unsplash.com/photo-1499793983690-e29da59ef1c2"
                        title="Villa en Tulum"
                        description="Villa frente al mar con acceso privado"
                        price="$250/noche"
                    />
                </div>
            </div>

            <div className='home__section'>
                <h1>Casas enteras</h1>
                <div className='home__row'>
                    <Card
                        id="4"
                        src="https://images.unsplash.com/photo-1499793983690-e29da59ef1c2"
                        title="Casa de playa"
                        description="Hermosa casa frente al mar"
                        price="$200/noche"
                    />
                    <Card
                        id="5"
                        src="https://images.unsplash.com/photo-1449158743715-0a90ebb6d2d8"
                        title="Cabaña en el bosque"
                        description="Escápate a la naturaleza"
                        price="$150/noche"
                    />
                    <Card
                        id="6"
                        src="https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1"
                        title="Casa de montaña"
                        description="Perfecta para esquiar"
                        price="$180/noche"
                    />
                </div>
            </div>
        </div>
    )
}

export default Home; 