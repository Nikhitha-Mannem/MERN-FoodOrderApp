import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainLayout from './Components/MainLayout';
import Landing from './Pages/Landing';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {toast} from 'react-toastify'
import Home from './Pages/Home';
import Login from './Pages/Login';
import LogOut from './Pages/LogOut';
import SignUp from './Pages/SignUp';
import Cart from './Pages/Cart';
import Orders from './Pages/Orders';
import PaymentSuccess from './Pages/PaymentSuccess';
import PaymentFailed from './Pages/PaymentFailed';
import ResetPassword from './Pages/RequestResetPassword';
import ChangePassword from './Pages/ChangePassword';

function App() {
  


  return (
    <div className="App">
      <div className="main-content">
        <Routes>
          <Route exact path='/' element={<Landing />}></Route>
          <Route path="/home" element={
            <MainLayout>
              <Home />
            </MainLayout>
          } />
          <Route path="/login" element={<Login />} />
          <Route path="/logout" element={<LogOut />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/cart" element={
            <MainLayout>
              <Cart />
            </MainLayout>
          } />
          <Route path="/orders" element={
            <MainLayout>
              <Orders />
            </MainLayout>
          } />
          <Route exact path="/payment/success" element={<PaymentSuccess/>} />
          <Route exact path="/payment/failure" element={<PaymentFailed />} />
          <Route exact path="/reset-password" element={<ResetPassword/>}/>
          <Route path='/reset-password/:token' element={<ChangePassword/>}></Route>
        </Routes>
      </div>
      <ToastContainer
        position="top-center"
        autoClose={1000}
        hideProgressBar={false}
        closeOnClick
        pauseOnHover
        draggable
        theme="colored" />


    </div>
  );
}

export default App;
