import './About.css'; // Importing the CSS file
import { NavLink } from 'react-router-dom';

export const About = () => {
    return (
        <div className="about-container">
            <div className="about-header">
                <h1>About Us</h1>
                <p>Discover the beauty of art and our dedication to creativity.</p>
            </div>
            <div className="about-content">
                <div className="about-description">
                    <p>
                        We are a renowned art gallery, committed to showcasing inspiring and diverse works of art 
                        from both established and emerging artists around the world. Our mission is to provide 
                        a platform where art lovers can explore and appreciate the finest artistic expressions.
                    </p>
                    <p>
                        Our carefully curated exhibitions and collections aim to ignite creativity and encourage 
                        dialogue around contemporary and traditional art forms. We strive to connect artists with 
                        audiences who share a passion for creativity and cultural enrichment.
                    </p>
                    <div className="about-buttons">
                    <NavLink to="/visit" className="btn">Visit Us</NavLink>
                    <NavLink to="/learn" className="btn">Learn More</NavLink>
                    </div>
                </div>
                <div className="about-image">
                    <img 
                        src="./images/about_art.png" 
                        alt="About the Art Gallery"
                    />
                </div>
            </div>
        </div>
    );
};
