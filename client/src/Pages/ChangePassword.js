import styles from './ChangePassword.module.css';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate ,useParams} from 'react-router-dom';
import {useState} from 'react'
const ChangePassword=()=>{

    const {token} =useParams()
    const API_URL = process.env.REACT_APP_API_URL;
    const navigate = useNavigate();
    const [newPassword,setNewPassword]=useState('');
    const [confirmPassword,setConfirmPassword]=useState('');
    const [email,setEmail]=useState('');

    const handleReset = () => {
        if(newPassword!==confirmPassword){
            toast.error("Passwords doesn't match")

        }
        else{
            axios.post(`${API_URL}/auth/reset-password/${token}`, { email,newPassword })
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

        }
        
    };

    return(
        <>
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
                        <label htmlFor="newPassword">New Password</label>
                        <input
                            className={styles.inputField}
                            type="text"
                            name="newPassword"
                            value={newPassword}
                            onChange={(e)=>setNewPassword(e.target.value)}
                            placeholder="Enter new Password"
                            required
                        />
                        <label htmlFor="confirmPassword">Confirm Password</label>
                        <input
                            className={styles.inputField}
                            type="text"
                            value={confirmPassword}
                            onChange={(e)=>setConfirmPassword(e.target.value)}
                            name="confirmPassword"
                            placeholder="Confirm Password"
                            required
                        />
                        <button
                            className={styles.resetButton}
                            type="button"
                            onClick={handleReset}
                        >
                            Reset Password
                        </button>
            </form>
        </>
    )
}

export default ChangePassword;