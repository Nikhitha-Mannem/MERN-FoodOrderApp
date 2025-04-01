import { Formik, Form, Field, ErrorMessage } from 'formik';
import { Link } from 'react-router-dom';
import * as Yup from 'yup';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useEffect } from 'react';
import styles from './SignUp.module.css'; // Importing the styles

const SignUp = () => {
    const navigate = useNavigate();
    const API_URL = process.env.REACT_APP_API_URL;
    
    
    const initialValues = {
        username: '',
        email: '',
        password: ''
    };

    const validationSchema = Yup.object({
        username: Yup.string().min(6, 'Username must be at least 6 characters long').max(10, 'Max 10 characters long').required('Username is required'),
        email: Yup.string().required('Email is required'),
        password: Yup.string().min(6).max(15).required('Password is required')
    });

    const onSubmit = (values, { resetForm }) => {
        axios.post(`${API_URL}/auth/register`, values)
            .then(response => {
                console.log(response.data);
                if (!response.data.success) {
                    console.log(response.data.message);

                    toast.error(response.data.message);
                    resetForm();
                } else {
                    console.log(response.data.message)

                    toast.success(response.data.message);
                    setTimeout(() => {
                        navigate('/login');
                    }, 1500);
                }
            })
            .catch(err => console.log(err));
    };

    return (
        <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
            {({ resetForm }) => (
                <div className={styles.registerPage}>
                    <Form className={styles.formContainer}>
                        <label htmlFor="username" className={styles.label}>Username</label>
                        <ErrorMessage name="username" component="span" className={styles.errorMessage} />
                        <Field type="text" name="username" placeholder="(ex: nikhitha)" className={styles.input} />

                        <label htmlFor="email" className={styles.label}>Email</label>
                        <ErrorMessage name="email" component="span" className={styles.errorMessage} />
                        <Field type="text" name="email" placeholder="(ex: nikhitha@gmail.com)" className={styles.input} />

                        <label htmlFor="password" className={styles.label}>Password</label>
                        <ErrorMessage name="password" component="span" className={styles.errorMessage} />
                        <Field type="password" name="password" placeholder="Enter Password" className={styles.input} />

                        <button type="submit" className={styles.submitButton}>Register</button>
                        <button type="button" onClick={resetForm} className={styles.clearButton}>Clear</button>

                        <p className={styles.signupLink}>Already have an account? <Link to="/login" className={styles.link}>Login</Link></p>
                    </Form>
                </div>
            )}
        </Formik>
    );
};

export default SignUp;
