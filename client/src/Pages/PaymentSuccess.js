import { toast } from 'react-toastify';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const PaymentSuccess = () => {
    const API_URL = process.env.REACT_APP_API_URL;
    const navigate = useNavigate();
    const [message, setMessage] = useState("Thanks for placing the order... Processing your order.");

    useEffect(() => {
        const userId = localStorage.getItem("userid");
        
        // Display initial message immediately
        setMessage("Payment successful! Placing your order...");

        axios.post(`${API_URL}/items/addOrder`, { userId: userId })
            .then(response => {
                if (response.data.status) {
                    toast.success("Order placed successfully!");
                    setMessage("Your order has been placed successfully! Redirecting...");
                    setTimeout(() => {
                        navigate('/home');
                    }, 2000);
                } else {
                    toast.error("Error in placing the order...");
                    setMessage("Failed to place your order. Redirecting to cart...");
                    setTimeout(() => {
                        navigate('/cart');
                    }, 2000);
                }
            })
            .catch(error => {
                toast.error("Error in placing the order...");
                setMessage("Failed to place your order. Redirecting to cart...");
                setTimeout(() => {
                    navigate('/cart');
                }, 2000);
            });

    }, [navigate, API_URL]);

    return (
        <h3>{message}</h3>
    );
}

export default PaymentSuccess;
