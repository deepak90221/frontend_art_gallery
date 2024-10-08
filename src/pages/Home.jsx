import { useAuth } from '../store/auth'; // Importing the useAuth hook
import './Home.css'; // Importing the CSS file

export const Home = () => {
    const { username } = useAuth(); // Retrieve username from the context

    return (
        <div className="home-container">
            {username && (
                <div className="home-header">
                    <h2>Welcome...</h2>
                </div>
            )}
            <div className="home-left">
                <h1>Welcome to the Art Gallery!</h1>
                <p className="home-intro">A World of Creativity and Imagination Awaits</p>
                <h2>Explore Our Collection</h2>
                <p className="home-description">
                    Discover a curated selection of contemporary and classic art pieces that ignite 
                    inspiration and creativity. Our gallery is dedicated to showcasing the finest talent 
                    from around the globe.
                </p>
                <div className="button-container">
                    <button className="btn">Visit Now</button>
                    <button className="btn">Learn More</button>
                </div>
                <div className="info-section">
                    <p>200+ <br />
                        Art Exhibitions</p>
                    <p>5000+ <br />
                        Artworks Displayed</p>
                    <p>Worldwide <br />Reach</p>
                    <p>150<br />
                        Renowned Artists</p>
                </div>
            </div>
            <div className="home-right">
                <img
                    src="https://th.bing.com/th/id/OIP.YeSN1YouGpMhvdd_oyUeAwHaE0?w=330&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7"
                    alt="Art Gallery"
                    className="home-image"
                />
            </div>
        </div>
    );
};
