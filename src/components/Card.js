import React from 'react';
import './Card.css';
import { useNavigate } from 'react-router-dom';
import Rating from './Rating';

function Card({ id, src, title, description, price, oldPrice, rating, reviews, lat, lng }) {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate(`/property/${id}`, {
            state: {
                img: src,
                title: title,
                description: description,
                price: price,
                location: title,
                star: 4.5,
                total: `$${parseInt(price) * 4} total`,
                lat: lat,
                lng: lng
            }
        });
    };

    return (
        <div className='card' onClick={handleClick}>
            <img src={src} alt={title} />
            <div className="card__info">
                <h2>{title}</h2>
                <h4>{description}</h4>
                <div className="card__price">
                    {oldPrice && (
                        <span className="card__oldPrice">{oldPrice}</span>
                    )}
                    <h3>{price}</h3>
                </div>
                {rating && <Rating rating={rating} reviews={reviews} />}
            </div>
        </div>
    )
}

export default Card; 