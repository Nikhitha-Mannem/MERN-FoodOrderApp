import { Carousel, Form, Button, Container } from 'react-bootstrap';
import styles from './Carousal.module.css';
import {useState} from 'react';

const Carousal = ({onSearch}) => {
    const [input,setInput]=useState('');
    const handleSearch=(e)=>{
        e.preventDefault();
        onSearch(input);


    }
    return (
        <div className={styles.carouselWrapper}>
            <Carousel fade>
                <Carousel.Item>
                    <img
                        className={`d-block w-100 ${styles.carouselImage}`}
                        src="https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=3099&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                        alt="First slide"
                    />
                </Carousel.Item>
                <Carousel.Item>
                    <img
                        className={`d-block w-100 ${styles.carouselImage}`}
                        src="https://images.unsplash.com/photo-1565958011703-44f9829ba187?q=80&w=3165&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                        alt="Second slide"
                    />
                </Carousel.Item>
                <Carousel.Item>
                    <img
                        className={`d-block w-100 ${styles.carouselImage}`}
                        src="https://images.unsplash.com/photo-1588315029754-2dd089d39a1a?q=80&w=2942&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                        alt="Third slide"
                    />
                </Carousel.Item>
            </Carousel>

            {/* 🔍 Search bar overlay */}
            <div className={styles.searchOverlay}>
                <Container>
                    <Form className="d-flex justify-content-center" onSubmit={(e)=>handleSearch(e)}>
                        <Form.Control
                            type="search"
                            placeholder="Search for food, restaurants..."
                            className={styles.searchInput}
                            value={input}
                            onChange={(e)=>{
                                const value=e.target.value
                                setInput(value)
                                onSearch("")
                            }}
                        />
                        <Button type='submit' variant="primary" className="ms-2" >Search</Button>
                    </Form>
                </Container>
            </div>
        </div>
    );
};

export default Carousal;
