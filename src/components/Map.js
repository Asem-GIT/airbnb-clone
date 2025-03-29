import React, { useEffect } from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import './Map.css';

const mapContainerStyle = {
    width: '100%',
    height: '100vh'
};

const defaultCenter = {
    lat: 40.416775,
    lng: -3.703790
};

const options = {
    disableDefaultUI: false,
    zoomControl: true,
    mapTypeControl: false,
    scaleControl: false,
    streetViewControl: false,
    rotateControl: false,
    fullscreenControl: true
};

function Map({ properties }) {
    useEffect(() => {
        console.log('Map component mounted');
        console.log('Properties:', properties);
        console.log('Google Maps API Status:', window.google ? 'Loaded' : 'Not loaded');
    }, [properties]);

    return (
        <div className="map">
            <LoadScript 
                googleMapsApiKey="AIzaSyAuAUP2wowKGb1OuAxm7cQiBA1kRiv2APo"
                onLoad={() => console.log('Script loaded successfully')}
                onError={(error) => console.error('Script loading error:', error)}
            >
                <GoogleMap
                    mapContainerStyle={mapContainerStyle}
                    zoom={4}
                    center={defaultCenter}
                    options={options}
                    onLoad={() => console.log('Map loaded successfully')}
                >
                    {properties?.map((property, index) => (
                        <Marker
                            key={index}
                            position={{
                                lat: property.lat,
                                lng: property.lng
                            }}
                            title={property.title}
                        />
                    ))}
                </GoogleMap>
            </LoadScript>
        </div>
    );
}

export default React.memo(Map); 