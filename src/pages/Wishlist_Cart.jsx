import { useState, useEffect } from 'react';
import './Wishlist.css';

export const Wishlist = () => {
    const [wishlistItems, setWishlistItems] = useState([]);

    // Load wishlist items from localStorage
    useEffect(() => {
        const storedWishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
        setWishlistItems(storedWishlist);
    }, []);

    // Add art to wishlist
    const handleAddToWishlist = (art) => {
        const updatedWishlist = [...wishlistItems, art];
        setWishlistItems(updatedWishlist);
        localStorage.setItem("wishlist", JSON.stringify(updatedWishlist));
    };

    // Remove art from wishlist
    const removeFromWishlist = (serviceId) => {
        const updatedWishlist = wishlistItems.filter(item => item._id !== serviceId);
        setWishlistItems(updatedWishlist);
        localStorage.setItem("wishlist", JSON.stringify(updatedWishlist));
    };

    // Dummy art data (you can replace with dynamic data)
    const dummyArtCards = [
        { _id: 1, serviceName: "Historic Masterpiece", provider: "National Art Gallery", image: "/images/cart_1.png" },
        { _id: 2, serviceName: "Classical Artwork", provider: "Modern Arts Museum", image: "/images/cart_2.png" },
        { _id: 3, serviceName: "Oil Painting Display", provider: "The Canvas Studio", image: "/images/cart_3.png" }
    ];

    // Dummy function to simulate removing from cart
    const handleRemoveDummyArt = (artId) => {
        console.log(`Removed art with id: ${artId}`);
    };

    return (
        <div className="wishlist-container">
            <h1>Your Art Cart</h1>

            {/* Display wishlist items */}
            {wishlistItems.length === 0 ? (
                <p>Your wishlist is empty!</p>
            ) : (
                wishlistItems.map(service => (
                    <div key={service._id} className="wishlist-item">
                        <img src={service.image} alt={service.serviceName} className="wishlist-item-image" />
                        <div className="wishlist-item-details">
                            <h2>{service.serviceName}</h2>
                            <p>Provider: {service.provider}</p>
                            <button onClick={() => removeFromWishlist(service._id)} className="remove-btn">Remove from Wishlist</button>
                        </div>
                    </div>
                ))
            )}

            {/* Add More Art */}
            <h2>Explore More Art</h2>
            <div className="art-gallery">
                {dummyArtCards.map((art) => (
                    <div key={art._id} className="art-card">
                        <img src={art.image} alt={art.serviceName} className="art-card-image" />
                        <div className="art-card-details">
                            <h3>{art.serviceName}</h3>
                            <p>By: {art.provider}</p>
                            <button 
                                onClick={() => handleAddToWishlist(art)} 
                                className="add-to-wishlist-btn">
                                Proceed to pay
                            </button>
                            <button 
                                onClick={() => handleRemoveDummyArt(art._id)} 
                                className="remove-dummy-btn">
                                Remove
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};
