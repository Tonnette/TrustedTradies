import axios from "axios";
// import e from "express";

export default {
  // Gets all users
  getUsers: function() {
    return axios.get("/api/users");
  },
  // Gets the user with the given id
  getUser: function(id) {
    return axios.get("/api/users/" + id);
  },
  // Deletes the user with the given id
  deleteUser: function(id) {
    return axios.delete("/api/users/" + id);
  },
  // Saves a user to the database
  saveUser: function(newUser) {
    return axios.post("/api/users/register", newUser);
  },

  loginUser: function(userData) {
    return axios.post("/api/users/login", userData);
  },
  getRandom: function() {
    return axios.get("https://randomuser.me/api/?results=10");
  },

  getTradies: function() {
    return axios.get("/api/tradies");
  },

  // Gets the tradie with the given id
  getTradie: function(id) {
    return axios.get("/api/tradies/" + id);
  },

  loginTradie: function(userData) {
    return axios.post("/api/profile/login", userData);
  },

  // Deletes the tradie with the given id
  deleteTradie: function(id) {
    return axios.delete("/api/tradies/" + id);
  },
  // Saves a tradie to the database
  saveImage: function(data) {
    return axios.post("/api/profile/profile-img-upload", data, {
      headers: {
        'accept': 'application/json',
        'Accept-Language': 'en-US,en;q=0.8',
        'Content-Type': `multipart/form-data; boundary=${data._boundary}`
    }
  })    
  },
  saveTradie: function(newTradie) {
    return axios.post("/api/profile/save", newTradie)
      
  },

  updateTradie: function(id, updatedTradie) {
    return axios.put("/api/tradies/" + id, updatedTradie)
      
  },

  saveReview: function(updatedTradie) {
    return axios.post("/api/reviews/", updatedTradie)
      
  },
  

  getReview: function(id) {
    return axios.post("/api/reviews/" + id)
      
  },

  getReviews: function() {
    return axios.get("/api/reviews");
  },
  
};


