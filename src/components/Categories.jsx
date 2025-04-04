import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "../cssBase/Categories.css";
import API from "./App"

export default function Categories() {
  const [products, setProducts] = useState([]);

  const [selectedCategory, setSelectedCategory] = useState(null);
  //const [user, setUser] = useState(null);
  const navigate = useNavigate();
 

  const location = useLocation();
  const { categoryName } = location.state || {};

  // Fetch Products and Extract Categories
  useEffect(() => {
    const fetchData = async () => {
      try {
        //const response = await axios.get(apiEndpoint);
        //console.log('category name redirected INSIDE LOOP-', categoryName);
        const response = await API.get(`/products/category/${categoryName}`);

       // console.log('fetchData is called', response.data);
        setSelectedCategory(categoryName);
        setProducts(response.data);
      //  setCategories([...new Set(response.data.map((product) => product.category))]);

      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, [categoryName]);

  // Navigate to Product Details Page with Product ID
  const navigateToDetails = (productId) => {
    //console.log("navigateToDetails is called with productId:", productId);
    navigate("/productDetails", { state: { productId } });
  };


  //----------------------------------------------------------------------------------------------
  // If no category is selected, show category cards; otherwise, show product cards.
  return (
    <div className="container-fluid mt-4">
      <h1>{selectedCategory ? selectedCategory : "Categories"}</h1>

      <div className="row">
        {products
          .map((product) => (
            <div key={product.id} className="col-6 col-md-4 mb-3"  onClick={() => navigateToDetails(product.id)}>
              <div className="card">
                <img
                  src={`${product.imageUrl}`}
                  className="card-img-top card-img-custom"
                  alt={product.name}
                />             
                <div
                  className="card-body"
                  style={{ cursor: "pointer" }}
                >
                  <h5 className="card-title">{product.name}</h5>
                  <p className="card-text">Price: ${product.price.toFixed(2)}</p>
                </div>
              </div>
            </div>
          ))
        }
      </div>
    </div>
  );
}

