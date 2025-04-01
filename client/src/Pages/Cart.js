import { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { Button, Table, Container } from 'react-bootstrap';
import { loadStripe } from '@stripe/stripe-js';

const Cart = () => {
    const [cartItems, setCartItems] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);
    const API_URL = process.env.REACT_APP_API_URL;
    const stripePromise = loadStripe('pk_test_51R82wW02E2AUfEaqOlVtUytbDAf3lTd7rZFtZdiJ3WUGq3vM11yq5e9JpTiwb7VM0UVUanA025d1zDiqQOvx732u00HkGactI7');

    useEffect(() => {
        const userid = localStorage.getItem("userid");
        axios.post(`${API_URL}/items/getcart`, { userid }).then(response => {
            if (response.data.error) {
                toast.error(response.data.error);
            } else {
                setCartItems(response.data.cartItems);
                setTotalPrice(response.data.totalPrice);
            }
        });
    }, []);

    const handleRemove = (indexToRemove) => {
        const updatedCart = cartItems.filter((_, i) => i !== indexToRemove);
        const newTotal = updatedCart.reduce((acc, item) => acc + item.price * item.quantity, 0);

        setCartItems(updatedCart);
        setTotalPrice(newTotal);

        // Optional: Call backend to update cart in DB
        // axios.post(`${API_URL}/items/updatecart`, { userid, cartItems: updatedCart });
    };

    const handleCheckout = async () => {
        try {
            const response = await axios.post(`${API_URL}/items/checkout`, { cartItems: cartItems });
            if (response.data.sessionId) {
                const stripe = await stripePromise;
                const { error } = stripe.redirectToCheckout({ sessionId: response.data.sessionId });
                
                if(error){
                    console.log('Stripe Checkout Error:', error.message);
                }


            }

        }catch(err){
            console.log("Error",err)
        }
    

    
    
  }

    return (
        <Container className="py-4">
            <h2 className="mb-4">🛒 Your Cart</h2>
            {cartItems.length > 0 ? (
                <>
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Item Name</th>
                                <th>Quantity</th>
                                <th>Price (₹)</th>
                                <th>Total (₹)</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {cartItems.map((item, index) => (
                                <tr key={index}>
                                    <td>{index + 1}</td>
                                    <td>{item.title}</td>
                                    <td>{item.quantity}</td>
                                    <td>{item.price}</td>
                                    <td>{item.quantity * item.price}</td>
                                    <td>
                                        <Button
                                            variant="danger"
                                            size="sm"
                                            onClick={() => handleRemove(index)}
                                        >
                                            Remove
                                        </Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>

                    <div className="d-flex justify-content-between align-items-center mt-4">
                        <h4>Total Price: ₹{totalPrice}</h4>
                        <Button variant="success" onClick={handleCheckout}>Proceed to Checkout</Button>
                    </div>
                </>
            ) : (
                <h4>Your cart is empty.</h4>
            )}
        </Container>
    );
};

export default Cart;
