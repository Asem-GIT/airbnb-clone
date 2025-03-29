import React from 'react';
import './SearchResult.css';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import StarIcon from '@mui/icons-material/Star';
import { useNavigate } from 'react-router-dom';

function SearchResult({
    id,
    img,
    location,
    title,
    description,
    star,
    price,
    total,
    lat,
    lng
}) {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate(`/property/${id}`, {
            state: {
                img,
                title,
                location,
                description,
                star,
                price,
                total,
                lat,
                lng
            }
        });
    };

    return (
        <div className='searchResult' onClick={handleClick}>
            <FavoriteBorderIcon className="searchResult__heart" />
            <img src={img} alt={title} />
            <div className="searchResult__info">
                <div className="searchResult__infoTop">
                    <h3>{title}</h3>
                    <p>{location}</p>
                    <p>{description}</p>
                </div>
                <div className="searchResult__infoBottom">
                    <div className="searchResult__stars">
                        <StarIcon className="searchResult__star" />
                        <p><strong>{star}</strong></p>
                    </div>
                    <div className="searchResult__price">
                        <h2>{price}</h2>
                        <p className="searchResult__total">{total}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SearchResult; 