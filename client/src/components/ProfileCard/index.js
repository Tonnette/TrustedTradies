import React from "react";
import Button from 'react-bootstrap/Button';
import 'materialize-css';
import "./style.css"



function ProfileCard(props) {
  console.log(props)
  return (

    <div className="row myRow">
      <div className="card" style={{ backgroundColor: "#0ea19d" }}>

        <div className="col s12 m12 s12">
          <div className="card ProfileCard horizontal">
            <div className="col s6 m6 s6 valign-wrapper">
              <img className="profileImage valign-wrapper" src={props.chosenTradie.imagePath} alt="tradesperson" />
            </div>
            <div className="card-stacked">
              <div className="card-content">
                <div className="myLargeText"><b>Trade:</b> {props.chosenTradie.type}</div>
                <div className="mySmallText"><b>Name: </b>{props.chosenTradie.name}</div>
                <div className="mySmallText"><b>Postcode: </b> {props.chosenTradie.postcode}</div>
                <br></br>
                <div className="mySmallText"><b>Reviews: </b>
                            {props.chosenTradie.reviews.map(item => (
                                <div key={item._id}>
                                    {item.reviews}
                                </div>

                            ))}
                        </div>
                <div className="card-action myLeft">
                <Button variant="info" type="submit" style={{ margin: "20px" }}
                                        href="/register" >Sign up
                            </Button>
                      
                            or
                         
                            <Button variant="info" type="submit" style={{ margin: "20px" }}
                                        href="/login" >Login
                            </Button>
                            <br></br>
                            to find out more or leave a review

                  {/* <a href="/register">Sign Up</a><br></br>or  <a href="/login">   Login</a>to leave a review */}

                  </div>
              </div>
            </div>
            <div className="row" >
                                <div className="col s6 offset-s3">
                                    <Button variant="info" type="submit" style={{ backgroundColor: "#ed6a1f" }}
                                        href="/" >Refresh Filter
                            </Button>


                                </div>

                            </div>
        </div>

      </div>
    </div>
    </div >


  );
}

export default ProfileCard;



