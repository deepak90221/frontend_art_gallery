import { useState, useEffect } from 'react';
import './PostServices.css';
import { toast } from 'react-toastify';

export const PostServicex = () => {
    const [newService, setNewService] = useState({
        provider: '',
        price: '',
        serviceName: '',
        description: ''
    });
    const [services, setServices] = useState([]);
    const [editingServiceId, setEditingServiceId] = useState(null);

    // Fetch services from the backend
    const fetchServices = async () => {
        try {
            const response = await fetch('http://localhost:8000/api/services');
            if (!response.ok) throw new Error(`Error: ${response.statusText}`);
            const data = await response.json();
            setServices(data);
        } catch (error) {
            console.error('Failed to fetch services:', error);
        }
    };

    // Fetch services when component mounts
    useEffect(() => {
        fetchServices();
    }, []);

    // Handle form changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setNewService((prevService) => ({
            ...prevService,
            [name]: value
        }));
    };

    // Handle form submission (add/update service)
    const handleSubmit = async (e) => {
        e.preventDefault();
        
        try {
            const url = editingServiceId
                ? `http://localhost:8000/api/services/${editingServiceId}`
                : 'http://localhost:8000/api/services';
            const method = editingServiceId ? 'PUT' : 'POST';

            const response = await fetch(url, {
                method: method,
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(newService)
            });

            if (!response.ok) {
                throw new Error(`Failed to ${editingServiceId ? 'update' : 'add'} service: ${response.statusText}`);
            }

            // Clear form and reset editing state
            setNewService({
                provider: '',
                price: '',
                serviceName: '',
                description: ''
            });
            setEditingServiceId(null);
            fetchServices(); // Refresh services list
            toast(`Service ${editingServiceId ? 'updated' : 'added'} successfully!`);
        } catch (error) {
            console.error(`Error ${editingServiceId ? 'updating' : 'adding'} service:`, error);
            toast(`Failed to ${editingServiceId ? 'update' : 'add'} service: ${error.message}`);
        }
    };

    // Handle service edit
    const handleEdit = (service) => {
        setNewService({
            provider: service.provider,
            price: service.price,
            serviceName: service.serviceName,
            description: service.description
        });
        setEditingServiceId(service._id);
    };

    // Handle service delete
    const handleDelete = async (serviceId) => {
        try {
            const response = await fetch(`http://localhost:8000/api/services/${serviceId}`, {
                method: 'DELETE'
            });

            if (!response.ok) {
                throw new Error(`Failed to delete service: ${response.statusText}`);
            }

            fetchServices(); // Refresh services list
            toast('Service deleted successfully!');
        } catch (error) {
            console.error('Error deleting service:', error);
            toast(`Failed to delete service: ${error.message}`);
        }
    };

    return (
        <section className="service-section">
            <div className="service-container">
                <h1>Admin Post :</h1>
                <br></br>
                <h2 className="service-heading">
                    {editingServiceId ? 'Edit Service' : 'Post a New Art'}
                </h2>
                <form onSubmit={handleSubmit} className="post-service-form">
                    <input
                        type="text"
                        name="provider"
                        placeholder="Provider"
                        value={newService.provider}
                        onChange={handleChange}
                        className="post-service-input"
                        required
                    />
                    <input
                        type="text"
                        name="price"
                        placeholder="Price"
                        value={newService.price}
                        onChange={handleChange}
                        className="post-service-input"
                        required
                    />
                    <input
                        type="text"
                        name="serviceName"
                        placeholder="Service Name"
                        value={newService.serviceName}
                        onChange={handleChange}
                        className="post-service-input"
                        required
                    />
                    <textarea
                        name="description"
                        placeholder="Description"
                        value={newService.description}
                        onChange={handleChange}
                        className="post-service-textarea"
                        required
                    />
                    <button type="submit" className="post-service-btn">
                        {editingServiceId ? 'Update Service' : 'Add Art'}
                    </button>
                </form>
            </div>

            <div className="services-list">
                <br></br>
                <h2 className="services-heading"> Existing Arts: </h2>
                <div className="service-grid">
                    {services.map(service => (
                        <div key={service._id} className="service-card">
                            <div className="service-details">
                                <div className="service-info">
                                    <span><strong>Provider:</strong> {service.provider}</span>
                                    <span><strong>Price: $</strong> {service.price}</span>
                                </div>
                                <h3 className="service-title">{service.serviceName}</h3>
                                <p className="service-description">{service.description}</p>
                            </div>
                            <div className="service-actions">
                                <button onClick={() => handleEdit(service)} className="apply-button">Edit</button>
                                <button onClick={() => handleDelete(service._id)} className="apply-button delete-btn">Delete</button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};
