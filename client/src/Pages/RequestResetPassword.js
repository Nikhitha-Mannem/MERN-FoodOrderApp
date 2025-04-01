import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import styles from './RequestResetPassword.module.css'; // Importing CSS module
import {useState} from 'react';

const ResetPassword = () => {
    const API_URL = process.env.REACT_APP_API_URL;
    const navigate = useNavigate();
    const [email,setEmail]=useState('')

    const handleReset = () => {
        
        axios.post(`${API_URL}/auth/reset-password`, { email })
            .then(response => {
                if (response.data.Error) {
                    toast.error(response.data.Error);
                    navigate('/login');
                } else {
                    toast.success(response.data.message);
                    navigate('/login');
                }
            })
            .catch(err => console.log(err));
    };

    return (
        <div className={styles.container}>
            <div className={styles.formContainer}>
                <form>
                    <label htmlFor="email">Email</label>
                    <input
                        className={styles.inputField}
                        type="email"
                        name="email"
                        value={email}
                        onChange={(e)=>setEmail(e.target.value)}
                        placeholder="(ex: example@gmail.com)"
                        required
                    />
                    <button
                        className={styles.resetButton}
                        type="button"
                        onClick={handleReset}
                    >
                        Send Email
                    </button>
                </form>
            </div>
        </div>
    );
};

export default ResetPassword;