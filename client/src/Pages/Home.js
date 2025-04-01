import { useEffect, useState } from 'react';
import axios from 'axios';
import FoodieCard from "../Components/FoodieCard";
import Carousal from "../Components/Carousal";
import { toast } from 'react-toastify';

const Home = () => {
  const API_URL = process.env.REACT_APP_API_URL;
  const [foods, setFoods] = useState([]);
  const [categories, setCategories] = useState([]);
  const [searchQuery,setSearchQuery]=useState('');
  const onSearch=(inputedValue)=>{
    setSearchQuery(inputedValue);
  }

  useEffect(() => {
    axios.get(`${API_URL}/items`).then(response => {
      if (response.data.error) {
        toast.error(response.data.error);
      } else {
        setFoods(response.data.foods);
        setCategories(response.data.categories);
      }
    }).catch(err => {
      toast.error("Failed to fetch items");
    });
  }, []);

  return (
    <>
      <Carousal onSearch={onSearch}/>
      <div className="container py-4">
        {categories.map((category, index) => (
          <div key={index} className="mb-5">
            <h2 className="text-primary">{category.CategoryName}</h2>
            <hr />
            <div className="row g-4">
              {foods
                .filter(item => (item.CategoryName === category.CategoryName)&&
                (item.CategoryName.toLowerCase().includes(searchQuery.toLowerCase())||
                item.name.toLowerCase().includes(searchQuery.toLowerCase())))
                .map((item, idx) => (
                  <div
                    key={idx}
                    className="col-12 col-sm-6 col-md-4 col-lg-3 d-flex justify-content-center"
                  >
                    <FoodieCard fooditem={item} />
                  </div>
                ))}
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default Home;
