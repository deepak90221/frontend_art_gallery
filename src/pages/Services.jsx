import { useState, useEffect } from 'react';
import './Service.css'; 

export const Services = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [category, setCategory] = useState('All');
    const [services, setServices] = useState([]);
    const [filteredServices, setFilteredServices] = useState([]);

    useEffect(() => {
        fetchServices(); 
    }, []);

    const fetchServices = async () => {
        try {
            // Simulated data for art gallery services with unique images
            const data = [
                { _id: 1, provider: "National Art Gallery", serviceName: "Historical Collection", description: "A collection of historic art pieces from various periods.", category: "Historical", price: "Free", image: "/images/art_contact.png" },
                { _id: 2, provider: "Modern Arts Museum", serviceName: "Contemporary Classics", description: "Explore timeless classics with a modern twist.", category: "Classic", price: "$20", image: "/images/contact_art.png" },
                { _id: 3, provider: "The Canvas Studio", serviceName: "Oil Paintings Exhibition", description: "A stunning display of oil paintings by renowned artists.", category: "Oil Paintings", price: "$15", image: "/images/about_art.png" }
            ];
            setServices(data);
            setFilteredServices(data);
        } catch (error) {
            console.error(error);
        }
    };

    const handleSearch = (e) => {
        const query = e.target.value;
        setSearchQuery(query);
        filterServices(query, category);
    };

    const handleCategoryChange = (e) => {
        const selectedCategory = e.target.value;
        setCategory(selectedCategory);
        filterServices(searchQuery, selectedCategory);
    };

    const filterServices = (query, selectedCategory) => {
        const filtered = services.filter(service =>
            (service.provider.toLowerCase().includes(query.toLowerCase()) ||
            service.serviceName.toLowerCase().includes(query.toLowerCase())) &&
            (selectedCategory === 'All' || service.category === selectedCategory)
        );
        setFilteredServices(filtered);
    };

    const handleAddToCart = (service) => {
        // Add to cart functionality (to be implemented)
        console.log(`Added to cart: ${service.serviceName}`);
    };

    const handleBuyNow = (service) => {
        // Buy now functionality (to be implemented)
        console.log(`Bought: ${service.serviceName}`);
    };

    const servicesToDisplay = searchQuery || category !== 'All' ? filteredServices : services;

    return (
        <>
        <section className="service-section">
            <div className="service-container">
                <h1 className="service-heading">Art Galleries</h1>

                {/* Search input */}
                <input
                    type="text"
                    placeholder="Search art galleries..."
                    value={searchQuery}
                    onChange={handleSearch}
                    className="search-input"
                />

                {/* Dropdown for filtering by category */}
                <select value={category} onChange={handleCategoryChange} className="category-dropdown">
                    <option value="All">All</option>
                    <option value="Historical">Historical</option>
                    <option value="Classic">Classic</option>
                    <option value="Oil Paintings">Oil Paintings</option>
                </select>
            </div>

            <div className="service-grid">
                {servicesToDisplay.map(service => (
                    <div className="service-card" key={service._id}>
                        <div className="service-image">
                            <img src={service.image} alt={service.serviceName} width="500"/>
                        </div>
                        <div className="service-details">
                            <div className="service-info">
                                <p>{service.provider}</p>
                                <p>{service.price}</p>
                            </div>
                            <h2 className="service-title">{service.serviceName}</h2>
                            <p className="service-description">{service.description}</p>
                            <div className="button-container">
                                <button className="btn" onClick={() => handleAddToCart(service)}>Add to Cart</button>
                                <button className="btn" onClick={() => handleBuyNow(service)}>Buy Now</button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
        </>
    );
};
