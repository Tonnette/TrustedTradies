import React from "react";
import 'materialize-css';
import M from "materialize-css";
import "../../assets/css/style.css"


document.addEventListener('DOMContentLoaded', function () {
  var elems = document.querySelectorAll('.sidenav');
  M.Sidenav.init(elems);
});

var localName = localStorage.getItem('name');

function NavbarUserMember() {
  return (
    <nav>
      <div className="nav-wrapper myNav" style={{ backgroundColor: "#fc9003" }}>
        <a href="/userhome" className="myLogo" style={{ paddingLeft: "10px" }}>Trusted Tradies</a>
      
        <a href="/userhome" data-target="mobile-demo" className="sidenav-trigger"><i className="material-icons">menu</i></a>
        <ul className="right hide-on-med-and-down">
          <li><a href="/userhome">Welcome {localName}</a></li>
          <li><a href="/userhome">Home</a></li>
          <li><a href="/">Logout</a></li>

        </ul>
      </div>
      <ul className="sidenav" id="mobile-demo">
        <li><a href="/userhome">Home</a></li>
        <li><a href="/">Logout</a></li>

      </ul>

    </nav>




  );
}

export default NavbarUserMember;
