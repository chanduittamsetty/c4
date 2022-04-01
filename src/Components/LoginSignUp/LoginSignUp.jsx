import { useState } from "react";
import axios from "axios";
import {userLogin} from "../../Redux/Login/action"
import { useNavigate } from "react-router-dom";

export const LoginSignUp = () => {
  let navigate =useNavigate();
  const [formData,setformData]=useState(
    {
      "name": "",
      "password": "",
      "location": "",
      "interests": [],
      "image": "",
      "subscribed": [] 
    }
  )
  const handleChange=(e)=>{
    const {id,value}=e.target;
    if(id=="interests"){
    setformData({...formData,[id]:[...formData.interests,value]});
    }else{
   
    setformData({...formData,[id]:value})
    }
  }
  const handleSubmit=(e)=>{
    e.preventDefault();
    axios.post("http://localhost:8080/users",formData).then(alert("user created"));
    setformData({
      "name": "",
      "password": "",
      "location": "",
      "interests": [],
      "image": "",
      "subscribed": []
    })
  }

  const [loginData,setloginData]=useState(
    {
      "name": "",
      "password": ""
    }
  )
  const loginChange=(e)=>{
    const {id,value}=e.target;
    setloginData({...loginData,[id]:value})
    
  }
  const handleLogin=(e)=>{
    e.preventDefault();
    console.log(loginData);
    userLogin(loginData);
    localStorage.setItem("userLoginDetails",JSON.stringify(loginData));
    navigate("/");
  }
  



  return (
    <div className="loginSignUp">
      <form className="signUp" onSubmit={handleSubmit}>
        <h1>SignUp</h1>
        <label>name</label>
        <input
          id="name"
          type="text"
          className="name"
          onChange={handleChange}
          required
        />
        <br />
        <label>password</label>
        <input
          id="password"
          type="text"
          className="password"
          onChange={handleChange}
          required
        />
        <br />
        <select value={""} className="location" id="location" onChange={handleChange}>
          <option value=""></option>
          <option value="bangalore">Bangalore</option>
          <option value="kolkata">Kolkata</option>
          <option value="delhi">Delhi</option>
          <option value="mumbai">Mumbai</option>
        </select>
        <label>Interests</label>
        <br />
        <label>technology</label>
        <input
          id="interests"
          type="checkbox"
          className="technology"
          value="technology"
          onChange={handleChange}
        />
        <br />
        <label>food</label>
        <input id="interests" value="food" type="checkbox" className="food" onChange={handleChange} />
        <br />
        <label>movies</label>
        <input id="interests" type="checkbox" value="movies" className="movies" onChange={handleChange} />
        <br />
        <label>culture</label>
        <input id="interests" type="checkbox" value="culture" className="culture" onChange={handleChange} />
        <br />
        <label>art</label>
        <input id="interests" type="checkbox" value="art" className="art" onChange={handleChange} />
        <br />
        <label>drama</label>
        <input id="interests" type="checkbox" value="drama" className="drama" onChange={handleChange} />
        <br />
        <label>image</label>
        <input
          id="image"
          type="text"
          className="image"
          onChange={handleChange}
          required
        />
        <br />
        <input type="submit" className="submitSignUpForm" />
      </form>
      <form className="login" onSubmit={handleLogin}>
        <h1>Login</h1>
        <label>name</label>
        <input
          type="text"
          id="name"
          className="name"
          onChange={loginChange}
          required
        />
        <br />
        <label>password</label>
        <input
          type="text"
          id="password"
          className="password"
          onChange={loginChange}
          required
        />
        <br />
        <input type="submit" className="submitLoginForm" />
      </form>
    </div>
  );
};
