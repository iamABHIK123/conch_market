import React from 'react';
import Header from './Header';
import CustomSlider from './CustomCarousel';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faQuoteLeft, faStar, faStarHalfAlt } from '@fortawesome/free-solid-svg-icons';
import img1 from '../assets/image1.jpg';
import img2 from '../assets/image2.jpg';
import img3 from '../assets/image3.jpg';
import img4 from '../assets/image4.jpg';
import img5 from '../assets/image5.jpg';
import img6 from '../assets/image6.jpg';
import '../cssBase/Home.css';
import { grey } from '@mui/material/colors';

export default function Home() {
  const images=[{url:img1},{url:img2},{url:img3},{url:img4},{url:img5},{url:img6}]
  return (
    <div>
       {/* <Header /> */}
       <div style={{backgroundColor:grey}}>
       {<CustomSlider>
        {images.map((image, index) => {
          return <img key={index} src={image.url} alt='abc' className='img-Fit' width="100%"/>;
        })}
      </CustomSlider>}
      </div>
      <section>
  <div class="row d-flex justify-content-center">
    <div class="col-md-10 col-xl-8 text-center">
      <h3 class="mb-4">Testimonials</h3>
      <p class="mb-4 pb-2 mb-md-5 pb-md-0">
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Fugit, error amet
        numquam iure provident voluptate esse quasi, veritatis totam voluptas nostrum
        quisquam eum porro a pariatur veniam.
      </p>
    </div>
  </div>

  <div class="row text-center" style={{justifyContent:"center"}}>
    <div class="col-md-4 mb-5 mb-md-0">
      <div class="d-flex justify-content-center mb-4">
        <img src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/img%20(1).webp"
          class="rounded-circle shadow-1-strong" width="150" height="150" />
      </div>
      <h5 class="mb-3">Maria Smantha</h5>
      <h6 class="text-primary mb-3">Web Developer</h6>
      <p class="px-xl-3">
        <i class="fas fa-quote-left pe-2"></i>Lorem ipsum dolor sit amet, consectetur
        adipisicing elit. Quod eos id officiis hic tenetur quae quaerat ad velit ab hic
        tenetur.
      </p>
      <ul className="list-unstyled d-flex justify-content-center mb-0">
      <li>
        <FontAwesomeIcon icon={faStar} className="fa-sm text-warning" />
      </li>
      <li>
        <FontAwesomeIcon icon={faStar} className="fa-sm text-warning" />
      </li>
      <li>
        <FontAwesomeIcon icon={faStar} className="fa-sm text-warning" />
      </li>
      <li>
        <FontAwesomeIcon icon={faStar} className="fa-sm text-warning" />
      </li>
      <li>
        <FontAwesomeIcon icon={faStarHalfAlt} className="fa-sm text-warning" />
      </li>
    </ul>
    </div>
    <div class="col-md-4 mb-5 mb-md-0">
      <div class="d-flex justify-content-center mb-4">
        <img src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/img%20(2).webp"
          class="rounded-circle shadow-1-strong" width="150" height="150" />
      </div>
      <h5 class="mb-3">Lisa Cudrow</h5>
      <h6 class="text-primary mb-3">Graphic Designer</h6>
      <p class="px-xl-3">
        <i class="fas fa-quote-left pe-2"></i>Ut enim ad minima veniam, quis nostrum
        exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid commodi.
      </p>
      <ul className="list-unstyled d-flex justify-content-center mb-0">
      <li>
        <FontAwesomeIcon icon={faStar} className="fa-sm text-warning" />
      </li>
      <li>
        <FontAwesomeIcon icon={faStar} className="fa-sm text-warning" />
      </li>
      <li>
        <FontAwesomeIcon icon={faStar} className="fa-sm text-warning" />
      </li>
      <li>
        <FontAwesomeIcon icon={faStar} className="fa-sm text-warning" />
      </li>
      <li>
        <FontAwesomeIcon icon={faStarHalfAlt} className="fa-sm text-warning" />
      </li>
    </ul>
    </div>
    <div class="col-md-4 mb-0">
      <div class="d-flex justify-content-center mb-4">
        <img src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/img%20(9).webp"
          class="rounded-circle shadow-1-strong" width="150" height="150" />
      </div>
      <h5 class="mb-3">John Smith</h5>
      <h6 class="text-primary mb-3">Marketing Specialist</h6>
      <p class="px-xl-3">
        <i class="fas fa-quote-left pe-2"></i>At vero eos et accusamus et iusto odio
        dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti.
      </p>
      <ul className="list-unstyled d-flex justify-content-center mb-0">
      <li>
        <FontAwesomeIcon icon={faStar} className="fa-sm text-warning" />
      </li>
      <li>
        <FontAwesomeIcon icon={faStar} className="fa-sm text-warning" />
      </li>
      <li>
        <FontAwesomeIcon icon={faStar} className="fa-sm text-warning" />
      </li>
      <li>
        <FontAwesomeIcon icon={faStar} className="fa-sm text-warning" />
      </li>
      <li>
        <FontAwesomeIcon icon={faStarHalfAlt} className="fa-sm text-warning" />
      </li>
    </ul>
    </div>
  </div>
</section>
    </div>
  )
}
