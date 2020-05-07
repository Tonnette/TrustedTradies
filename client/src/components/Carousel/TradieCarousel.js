import React from "react";
import "../assets/css/style.css"
import Carousel from 'react-bootstrap/Carousel'


function TradieCarousel() {
  return (

    // <Carousel>
    //   <Carousel.Item>
    //     <img
    //       className="d-block w-100"
    //       src={require("../assets/images/carousel/friendly-tradie.jpg")}
    //       alt="girls sitting on jetty" />


    //   </Carousel.Item>

    //   <Carousel.Item>
    //     <img
    //       className="d-block w-100"
    //       src={require("../assets/images/carousel/friendly-tradie.jpg")}
    //       alt="man in a cape" />


    //   </Carousel.Item>

    //   <Carousel.Item>
    //     <img
    //       className="d-block w-100"
    //       src={require("../assets/images/carousel/friendly-tradie.jpg")}
    //       alt="animated penguin in snow" />


    //   </Carousel.Item>



    //   <Carousel.Item>
    //     <img
    //       className="d-block w-100"
    //       src={require("../assets/images/carousel/friendly-tradie.jpg")}
    //       alt="man in bed with mayo on his face" />

    //   </Carousel.Item>

    //   <Carousel.Item>
    //     <img
    //       className="d-block w-100"
    //       src={require("../assets/images/carousel/friendly-tradie.jpg")}
    //       alt="Nurses" />


    //   </Carousel.Item>


    // </Carousel>
    <Carousel>
  <Carousel.Item>
    <img
      className="d-block w-100"
      src={require("../assets/images/carousel/friendly-tradie.jpg")}
      alt="First slide"
    />
    <Carousel.Caption>
      <h3>First slide label</h3>
      <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
    </Carousel.Caption>
  </Carousel.Item>
  <Carousel.Item>
    <img
      className="d-block w-100"
      src={require("../assets/images/carousel/friendly-tradie.jpg")}
      alt="Third slide"
    />

    <Carousel.Caption>
      <h3>Second slide label</h3>
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
    </Carousel.Caption>
  </Carousel.Item>
  <Carousel.Item>
    <img
      className="d-block w-100"
      src={require("../assets/images/carousel/friendly-tradie.jpg")}
      alt="Third slide"
    />

    <Carousel.Caption>
      <h3>Third slide label</h3>
      <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
    </Carousel.Caption>
  </Carousel.Item>
</Carousel>







  );
}

export default TradieCarousel;

