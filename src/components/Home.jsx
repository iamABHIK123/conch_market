import React, { useEffect,useState } from "react";
import CustomSlider from "./CustomCarousel";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar, faStarHalfAlt } from "@fortawesome/free-solid-svg-icons";
import img1 from "../assets/image1.jpg";
import img2 from "../assets/image2.jpg";
import img3 from "../assets/image3.jpg";
import img4 from "../assets/image4.jpg";
import img5 from "../assets/image5.jpg";
import img6 from "../assets/image6.jpg";
import img7 from "../assets/image7.jpg";
import "../cssBase/Home.css";
import SellerDetails from "./SellerDetails";
import Footer from "./Footer";
import API from "./App" // Adjust the import based on your project structure

export default function Home() {
  const images = [img7, img1, img2];
 const [newItems, setNewItems] = useState([]);

  useEffect(() => {
    const fetchItems = async () => {
          try {
            const response = await API.get("/new-items");
            setNewItems(response.data); // Assuming API returns an array of product IDs
            console.log("Fetched items in home:", response.data); // Debugging line
          } catch (err) {
            setError("Failed to load items.");
          }
        };
    
        fetchItems();
      }, []);
  
  const topSoldItems = [
    { name: "Rare Conch A", price: "$120", image: img1 },
    { name: "Ocean Conch B", price: "$95", image: img6 },
    { name: "Golden Conch C", price: "$150", image: img3 },
    { name: "Spiral Conch D", price: "$80", image: img4 },
    { name: "Sacred Conch E", price: "$200", image: img5 }
  ];

  // const newItems = [
  //   { name: "Fresh Conch X", price: "$110", image: img6 },
  //   { name: "Sea Conch Y", price: "$90", image: img1 },
  //   { name: "Pearl Conch Z", price: "$130", image: img1 },
  //   { name: "Mystic Conch W", price: "$85", image: img3 },
  //   { name: "Divine Conch V", price: "$210", image: img4 }
  // ];

  return (
    <div>
      {/* Carousel */}
      <CustomSlider>
        {images.map((image, index) => (
          <img key={index} src={image} alt="slide" className="img-Fit" width="100%" />
        ))}
      </CustomSlider>

      <section>
  <h3 className="text-center my-4"><b><u>Best Sellers</u></b></h3>
  <div className="row d-flex justify-content-center">
    {topSoldItems.map((item, index) => (
      <div key={index} className="col-md-4 my-2"> {/* Adjusted width for better layout */}
        <div id="topSold" className="card shadow-lg p-2 text-center">  
          
          {/* Image in Landscape Mode */}
          <img
            src={item.image}
            alt={item.name}
            className="card-img-top img-thumbnail"
            width="100%" 
            height="150"  /* Adjusted for a landscape effect */
            style={{ objectFit: "cover", borderRadius: "10px" }} 
          />
          
          {/* Text Content Below Image */}
          <div className="card-body">
            <h6 className="card-title"><b>{item.name}</b></h6>
            <p className="card-text"><b>Price:</b> ${item.price}</p>
          </div>

        </div>
      </div>
    ))}
  </div>
</section>




      {/* New Conch Items Section */}
      <section>
        <h3 className="text-center my-4"><b><u>Newly Added Conch Items</u></b></h3>
        <div className="row d-flex justify-content-center">
          {newItems.map((item, index) => (
            <div key={index} className="col-md-2 text-center">
              <div id="newItems" className="card shadow-lg p-2">  {/* Added shadow-lg class */}
                <img
                  src={item.product.imageUrl}
                  alt={item.product.name}
                  className="card-img-top img-thumbnail"
                  width="200"
                  height="200"
                />
                <div className="card-body">
                  <h6 className="card-title">{item.product.name}</h6>
                  <p className="card-text">{item.product.price}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>




      {/* Testimonials Section */}
      <section className="text-center d-flex justify-content-center mt-4">
        <div className="card shadow-lg p-4 w-50" style={{ maxWidth: "1200px" }}> {/* Parent Card with Shadow */}
          <h3 className="mb-4" style={{ fontSize: "2rem", fontWeight: "bold", textDecoration: "underline" }}>
            Testimonials
          </h3>
          <div className="row justify-content-center">
            {[
              { name: "Maria Smantha", role: "Web Developer", img: "https://mdbcdn.b-cdn.net/img/Photos/Avatars/img%20(1).webp" },
              { name: "Lisa Cudrow", role: "Graphic Designer", img: "https://mdbcdn.b-cdn.net/img/Photos/Avatars/img%20(2).webp" },
              { name: "John Smith", role: "Marketing Specialist", img: "https://mdbcdn.b-cdn.net/img/Photos/Avatars/img%20(9).webp" }
            ].map((person, index) => (
              <div key={index} className="col-md-4" style={{ flex: "0 0 auto", width: "30.33333333%" }}>

                <div className="card shadow-sm p-3" > {/* Inner Card for Each Testimonial */}
                  <div className="d-flex justify-content-center mb-4">
                    <img src={person.img} className="rounded-circle shadow-1-strong" width="100" height="100" alt={person.name} />
                  </div>
                  <h5>{person.name}</h5>
                  <h6 className="text-primary">{person.role}</h6>
                  <p>"Lorem ipsum dolor sit amet, consectetur adipisicing elit."</p>
                  <ul className="list-unstyled d-flex justify-content-center">
                    {[...Array(4)].map((_, i) => (
                      <li key={i}><FontAwesomeIcon icon={faStar} className="text-warning" /></li>
                    ))}
                    <li><FontAwesomeIcon icon={faStarHalfAlt} className="text-warning" /></li>
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
