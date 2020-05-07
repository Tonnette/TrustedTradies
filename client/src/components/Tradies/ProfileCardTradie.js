import React from "react";
import "../assets/css/style.css"
import 'materialize-css';
import Button from 'react-bootstrap/Button';

function ProfileCardMember(props) {
  return (
    <div className="row">
      <div className="col s12 m12 l12">
        <div style={{ textAlign: "center", paddingTop: "70px" }}>
          <div className="row">
            <div className="col s12 m10 offest-m2 l4">
              <img src={props.chosenTradie.imagePath} className="ProfileImage" alt="tradesperson" style={{ textAlign: "center" }} />
            </div>

            <div className="col s12 m10 offest-m2 l8">
              <div className="row">
                <div className="col s6 offset-s3 m8 offset-m2 l10">
                  <div className="blueBoxProfile">
                    <div className="headerProfile"> {props.chosenTradie.type}</div>
                  </div>
                </div>
                <div className="col s8 offset-s3 m8 offset-m3 l12">
                <div className="textboxProfile">

                  <div><b>Name: </b> {props.chosenTradie.name}</div>
                  <div><b>Email: </b> {props.chosenTradie.email}</div>
                  <div><b>Postcode: </b>{props.chosenTradie.postcode}</div>
                  <div><b>Description: </b> {props.chosenTradie.description}</div>
                  <div><b>Phone: </b> {props.chosenTradie.phone}</div>
                  <div><b>Rates: </b> {props.chosenTradie.rates}</div>
                  <div><b>Reviews: </b></div>
                  {props.chosenTradie.reviews.map(item => (
                     <div key={item._id}>
                     {item.reviews} <b> {item.rating} stars</b> <i>-review from {item.UserName}</i></div>
                  ))}
                  <Button style={{ backgroundColor: "#e65c00", margin: "20px" }} 
                  value={props.chosenTradie.id} defaultChecked={false} 
                  className="buttonText" 
                  href="/tradiehome">Home</Button>
                </div>
              </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfileCardMember;
