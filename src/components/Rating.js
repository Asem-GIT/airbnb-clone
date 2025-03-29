import React from 'react';
import './Rating.css';
import StarIcon from '@mui/icons-material/Star';
import StarHalfIcon from '@mui/icons-material/StarHalf';
import StarOutlineIcon from '@mui/icons-material/StarOutline';

function Rating({ rating, reviews }) {
    const getStars = () => {
        const stars = [];
        const fullStars = Math.floor(rating);
        const hasHalfStar = rating % 1 !== 0;

        for (let i = 0; i < fullStars; i++) {
            stars.push(<StarIcon key={i} className="star-filled" />);
        }

        if (hasHalfStar) {
            stars.push(<StarHalfIcon key="half" className="star-filled" />);
        }

        const remainingStars = 5 - stars.length;
        for (let i = 0; i < remainingStars; i++) {
            stars.push(<StarOutlineIcon key={`empty-${i}`} className="star-empty" />);
        }

        return stars;
    };

    return (
        <div className="rating">
            <div className="stars">{getStars()}</div>
            <span className="reviews">({reviews} reviews)</span>
        </div>
    );
}

export default Rating; 