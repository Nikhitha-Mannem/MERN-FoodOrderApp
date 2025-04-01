import React from 'react';
import { Card, Button } from 'react-bootstrap';
import {useState} from 'react';
import axios from 'axios';
import {toast} from 'react-toastify';
const FoodieCard = (props) => {
  const API_URL = process.env.REACT_APP_API_URL;
  const count = [1, 2, 3, 4, 5, 6];
  const optionsobj = props.fooditem.options[0];
  const options = Object.keys(optionsobj).filter(key => key !== '_id');
  const [quantity,setQuantity]=useState(1);
  const [selectedSize, setSelectedSize] = useState(options[0]);
  const currentPrice=parseInt(optionsobj[selectedSize]);
  const totalprice=quantity*currentPrice;
  const handleCartAdd=()=>{
    axios.post(`${API_URL}/items/addtocart`,
    {
      title:props.fooditem.name,
      quantity:quantity,
      price:totalprice,
      user:localStorage.getItem("userid")
    }).then(response=>{
      if(response.data.error){
        console.log(response.data.error);
        toast.error(response.data.error)

      }
      else{
        toast.success(response.data.message)

      }

    })


  }
  




  return (
    <Card style={{ width: '18rem' }} className="shadow-sm m-3">
      <Card.Img
        variant="top"
        src={props.fooditem.img}
        alt="Food"
        style={{ height: '250px', objectFit: 'cover' }}
      />

      <Card.Body>
        <Card.Title>{props.fooditem.name}</Card.Title>
        <select className='me-2' onChange={(e)=>setQuantity(e.target.value)}>
          {count.map((c, index) => {
            return <option key={index} value={c} >{c}</option>
          })}
        </select>
        <select className='me-2 bg-light' onChange={(e)=>setSelectedSize(e.target.value)}>
          {options.map((option, index) => {
            return <option key={index} value={option}>{option}</option>
          })}

        </select>
        <span>Total Price:₹{totalprice}</span>
        <hr></hr>

        <div className="d-flex justify-content-center ">
          <Button onClick={handleCartAdd}>Add To Cart</Button>
        </div>



      </Card.Body>
    </Card>
  );
};

export default FoodieCard;
