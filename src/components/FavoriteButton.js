import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { db } from '../firebase';
import { doc, updateDoc, arrayUnion, arrayRemove, getDoc } from 'firebase/firestore';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { IconButton } from '@mui/material';

function FavoriteButton({ propertyId }) {
    const [isFavorite, setIsFavorite] = useState(false);
    const { currentUser } = useAuth();

    useEffect(() => {
        if (currentUser) {
            checkIfFavorite();
        }
    }, [currentUser, propertyId]);

    async function checkIfFavorite() {
        const userDoc = await getDoc(doc(db, 'users', currentUser.uid));
        setIsFavorite(userDoc.data().favorites.includes(propertyId));
    }

    async function toggleFavorite() {
        if (!currentUser) {
            alert('Por favor, inicia sesión para guardar favoritos');
            return;
        }

        const userRef = doc(db, 'users', currentUser.uid);
        
        if (isFavorite) {
            await updateDoc(userRef, {
                favorites: arrayRemove(propertyId)
            });
        } else {
            await updateDoc(userRef, {
                favorites: arrayUnion(propertyId)
            });
        }
        
        setIsFavorite(!isFavorite);
    }

    return (
        <IconButton onClick={toggleFavorite} className="favorite-button">
            {isFavorite ? <FavoriteIcon color="error" /> : <FavoriteBorderIcon />}
        </IconButton>
    );
}

export default FavoriteButton; 