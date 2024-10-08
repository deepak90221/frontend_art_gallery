import { NavLink } from 'react-router-dom';
import './Error.css'; // Importing the CSS file

export const Error = () => {
    return (
        <>
        <div className="error-container">
            <div className="error-left">
                <h1>404</h1>
                <h2>Page Not Found</h2>
                <p className="error-description">
                    The page you are looking for doesnt seem to exist. 
                    It might have been moved or deleted. 
                </p>
                <div className="button-container">
                    <NavLink to="/" className="btn">Return Home</NavLink>
                    <NavLink to="/contact" className="btn">Report Error</NavLink>

                    
                </div>
            </div>
           
        </div>
        </>
    );
};

