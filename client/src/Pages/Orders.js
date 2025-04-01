import axios from 'axios';
import { useEffect, useState } from 'react';

const Orders = () => {
    const API_URL = process.env.REACT_APP_API_URL;
    const [orders, setOrders] = useState([]);
    const [message, setMessage] = useState('');

    useEffect(() => {
        const userId = localStorage.getItem("userid");
        
        axios.post(`${API_URL}/items/orders`, { userId: userId })
            .then(response => {
                if (response.data.orderItems && response.data.orderItems.length > 0) {
                    // Sort orders by date (newest first)
                    const sortedOrders = response.data.orderItems.sort((a, b) => 
                        new Date(b.orderedAt) - new Date(a.orderedAt)
                    );
                    setOrders(sortedOrders);
                } else {
                    setMessage(response.data.message || "You Have Not Placed any Order Yet.");
                }
            })
            .catch(error => {
                console.log("Error fetching orders:", error.message);
                setMessage("Error loading orders. Please try again later.");
            });
    }, []);

    return (
        <div style={{ padding: "20px", textAlign: "center" }}>
            <h2>My Orders</h2>
            {message ? (
                <p>{message}</p>
            ) : (
                <ul style={{ listStyleType: "none", padding: 0 }}>
                    {orders.map((order, index) => (
                        <li key={order._id} style={{ marginBottom: "15px", padding: "10px", border: "1px solid #ccc", borderRadius: "5px" }}>
                            <h3>Order #{index + 1}</h3>
                            <p>Order Date: {new Date(order.orderedAt).toLocaleString()}</p>
                            <p>Total Price: ₹{order.totalPrice}</p>
                            <ul>
                                {order.orderItems.map((item, idx) => (
                                    <li key={idx}>
                                        {item.title} - Quantity: {item.quantity} - Price: ₹{item.price}
                                    </li>
                                ))}
                            </ul>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default Orders;
