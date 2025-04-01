import { Formik, Form, Field, ErrorMessage } from 'formik';
import { Link } from 'react-router-dom';
import * as Yup from 'yup';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { toast } from 'react-toastify';
import styles from './Login.module.css'; // Importing the styles

const Login = () => {
    const navigate = useNavigate();
    const API_URL = process.env.REACT_APP_API_URL;

    useEffect(() => {
        const isLoggedIn = localStorage.getItem("accessToken");
        if (isLoggedIn) {
            navigate('/home')
        }


    }, [])

    const initialValues = {
        email: '',
        password: ''
    };

    const validationSchema = Yup.object({
        email: Yup.string().required(),
        password: Yup.string().min(6).max(10).required()
    });

    const onSubmit = (values, { resetForm }) => {
        axios.post(`${API_URL}/auth/login`, values)
            .then(response => {
                console.log(response.data);
                const { status } = response;
                const { success, message, data, token } = response.data;
                if (status === 404) {
                    toast.error(message);
                    setTimeout(() => {
                        navigate('/');
                    }, 1500);
                }
                else if (status === 401) {
                    toast.error(message);
                    resetForm();

                }
                else if (status === 200 & success) {
                    localStorage.setItem("accessToken", response.data.token);
                    localStorage.setItem("userid", response.data.data._id);
                    toast.success(response.data.message);

                    setTimeout(() => {
                        navigate('/home');
                    }, 1500);
                }
            })
            .catch(err => console.log(err));
    };

    return (
        <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
            {({ resetForm }) => (
                <div className={styles.loginPage}>
                    <Form className={styles.formContainer}>
                        <label htmlFor="email" className={styles.label}>Email</label>
                        <ErrorMessage name="email" component="span" className={styles.errorMessage} />
                        <Field type="text" name="email" placeholder="(ex: nikhitha)" className={styles.input} />

                        <label htmlFor="password" className={styles.label}>Password</label>
                        <ErrorMessage name="password" component="span" className={styles.errorMessage} />
                        <Field type="password" name="password" placeholder="Enter Password" className={styles.input} />

                        <button type="submit" className={styles.submitButton}>Login</button>
                        <button type="button" onClick={resetForm} className={styles.clearButton}>Clear</button>

                        <p className={styles.signupLink}>Don't have an Account? <Link to="/signup">SignUp</Link></p>
                        <Link to="/reset-password">Reset Password</Link>
                    </Form>
                </div>
            )}
        </Formik>
    );
};

export default Login;
