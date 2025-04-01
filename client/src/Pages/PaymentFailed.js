import {toast} from 'react-toastify';
import {useEffect} from 'react';
import { useNavigate } from 'react-router-dom';

const PaymentFailed=()=>{
    const navigate=useNavigate();
    useEffect(()=>{
        toast.success("Payment Failed")
        setTimeout(()=>{
            navigate('/cart')

        },2000)


    },[])

    return(
        <h3>Your Payment Failed...Redirecting Shortly</h3>

    )
}

export default PaymentFailed;