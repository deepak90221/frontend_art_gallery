import { useState, useEffect } from 'react';
import './OrderTracking.css';

export const OrderTracking = () => {
    const [orderId, setOrderId] = useState('');
    const [orderStatus, setOrderStatus] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [searched, setSearched] = useState(false); // Track if search has been made
    const [showRefundPolicy, setShowRefundPolicy] = useState(false); // To toggle refund policy view

    // Dummy data for tracking
    const orderStatusData = {
        "12345": { 
            status: "Processing", 
            progress: 25, 
            details: "Your order is being processed by our team.", 
            orderTime: "2024-10-01 10:30", 
            location: "New York, NY", 
            estimatedDelivery: "2024-10-05 16:00"
        },
        "12346": { 
            status: "Shipped", 
            progress: 50, 
            details: "Your order has been dispatched and is on its way.", 
            orderTime: "2024-10-02 14:15", 
            location: "Los Angeles, CA", 
            estimatedDelivery: "2024-10-06 12:00"
        },
        "12347": { 
            status: "Out for Delivery", 
            progress: 75, 
            details: "Your order is out for delivery.", 
            orderTime: "2024-10-03 09:00", 
            location: "Chicago, IL", 
            estimatedDelivery: "2024-10-05 18:00"
        },
        "12348": { 
            status: "Delivered", 
            progress: 100, 
            details: "Your order has been successfully delivered.", 
            orderTime: "2024-09-29 11:00", 
            location: "San Francisco, CA", 
            estimatedDelivery: "2024-10-01 10:00"
        },
    };

    const refundPolicy = "If you are unsatisfied with your order, we offer a full refund within 30 days of receiving your product. For more details, refer to our return and refund policy on the website.";

    useEffect(() => {
        if (orderId) {
            fetchOrderStatus(orderId);
        }
    }, [orderId]);

    const fetchOrderStatus = (id) => {
        setLoading(true);
        setError(''); // Reset error when a new search is made
        setSearched(true); // Set searched flag to true when a search is made
        setTimeout(() => {
            const status = orderStatusData[id];

            if (status) {
                setOrderStatus(status);
            } else {
                setError("Order not found");
            }
            setLoading(false);
        }, 1000); // Simulating a network delay
    };

    const handleInputChange = (e) => {
        setOrderId(e.target.value);
    };

    const toggleRefundPolicy = () => {
        setShowRefundPolicy(!showRefundPolicy);
    };

    return (
        <div className="order-tracking-container">
            <h1>Track Your Order</h1>
            <div className="input-section">
                <input
                    type="text"
                    placeholder="Enter your Order ID"
                    value={orderId}
                    onChange={handleInputChange}
                />
                <button onClick={() => fetchOrderStatus(orderId)} className="track-btn">
                    Track Order
                </button>
            </div>

            {loading && <p>Loading...</p>}

            {/* Display error only if search has been made */}
            {searched && error && <p className="error">{error}</p>}

            {/* Display order status if available */}
            {orderStatus && (
                <div className="status-section">
                    <div className="order-status-card">
                        <h2>Order Status</h2>
                        <p>{orderStatus.status}</p>
                        <p>{orderStatus.details}</p>
                        <div className="progress-bar">
                            <div
                                className="progress"
                                style={{ width: `${orderStatus.progress}%` }}
                            ></div>
                        </div>
                        <p>{orderStatus.progress}% Complete</p>
                    </div>

                    <div className="order-info-card">
                        <h3>Order Details</h3>
                        <p><strong>Order Time:</strong> {orderStatus.orderTime}</p>
                        <p><strong>Location:</strong> {orderStatus.location}</p>
                        <p><strong>Estimated Delivery:</strong> {orderStatus.estimatedDelivery}</p>
                    </div>
                </div>
            )}

            {/* Refund Policy */}
            <div className="refund-policy-section">
                <button onClick={toggleRefundPolicy} className="refund-btn">
                    See Refund Policy
                </button>
                {showRefundPolicy && (
                    <div className="refund-policy-details">
                        <p>{refundPolicy}</p>
                    </div>
                )}
            </div>
        </div>
    );
};
