import React from "react";
import "../assets/css/style.css"
import 'materialize-css';

function ProfileCardMemberReview(props) {
  console.log(props)
  return (
    <div className="row">
      <div className="col s12 m12 l12">
        <div style={{ textAlign: "center", paddingTop: "70px" }}>
          <div className="row">
            <div className="col s12 m10 offest-m2 l4">
              <img src={props.items.imagePath} className="ProfileImage" alt="tradesperson" style={{ textAlign: "center" }} />
            </div>

            <div className="col s12 m10 offest-m2 l8">
              <div className="row">
                <div className="col s6 offset-s3 m8 offset-m2 l10">
                  <div className="blueBoxProfile">
                    <div className="headerProfile"> {props.items.type}</div>
                  </div>
                </div>
                <div className="col s8 offset-s3 m8 offset-m3 l12">
                <div className="textboxProfile">

                  <div><b>Name: </b> {props.items.name}</div>
                  <div><b>Email: </b> {props.items.email}</div>
                  <div><b>Postcode: </b>{props.items.postcode}</div>
                  <div><b>Description: </b> {props.items.description}</div>
                  <div><b>Phone: </b> {props.items.phone}</div>
                  <div><b>Rates: </b> {props.items.rates}</div>
                  <div><b>Reviews: </b></div>
                  {props.reviews.map(item => (
                     <div key={item._id}>
                     {item.reviews} <b> {item.rating} stars</b> <i>-review from {item.UserName}</i>
                     <br /></div>
                  ))}
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

export default ProfileCardMemberReview;
