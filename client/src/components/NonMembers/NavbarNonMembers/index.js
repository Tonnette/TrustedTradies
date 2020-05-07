import React from "react";
import 'materialize-css';
import M from "materialize-css";
import "../../assets/css/style.css"


document.addEventListener('DOMContentLoaded', function () {
  var elems = document.querySelectorAll('.sidenav');
  M.Sidenav.init(elems);
});



// Depending on the current path, this component sets the "active" className on the appropriate navigation link item
function NavbarNonMembers() {
  return (

    <nav>
      <div className="nav-wrapper myNav" style={{backgroundColor: "#1ba6a1"}}>
        <a href="/" className="myLogo" style={{paddingLeft: "10px"}}>Trusted Tradies</a>
        <a href="/" data-target="mobile-demo" className="sidenav-trigger"><i className="material-icons">menu</i></a>
        <ul className="right hide-on-med-and-down">
        <li><a href="/register">Register</a></li>
          <li><a href="/login">Login</a></li>
          <li><a href="/tradie-register">Register Your Business</a></li>
          <li><a href="/login-tradie">Login for Business</a></li>
        </ul>
      </div>
      <ul className="sidenav" id="mobile-demo">
      <li><a href="/register">Register</a></li>
          <li><a href="/login">Login</a></li>
          <li><a href="/tradie-register">Register Your Business</a></li>
          <li><a href="/login-tradie">Login for Business</a></li>
      </ul>

    </nav>
   
    
   
   


    
  );
}

export default NavbarNonMembers;
