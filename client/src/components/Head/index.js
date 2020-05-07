import React, { Component } from "react";
import 'materialize-css';
// import M from "materialize-css";
// import CodeCarousel from '../Carousel/CodeCarousel';


class Head extends Component {
  render() {
    return (
        <div className="row" style={{margin: "0px"}}>
        <div className="col s12" style={{padding: "0px"}}>
            <img className="tradie-head" src={require("../assets/images/carousel/friendly-tradie.jpg")} alt="friend " /> 
        </div>


      </div>
    );
  }
}
export default Head;

