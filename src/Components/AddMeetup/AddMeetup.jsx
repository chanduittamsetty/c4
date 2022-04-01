// User should be able to add/create new meetups 
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const AddMeetup = () => {

  let navigate =useNavigate();
  const [formData,setformData]=useState(
    {
      "title": "",
      "location": "",
      "date": "",
      "time": "",
      "theme": "",
      "description": "",
      "image": ""
    }
  )
  const handleChange=(e)=>{
    const {id,value}=e.target;
    
   
    setformData({...formData,[id]:value})
  }
  const handleSubmit=(e)=>{
    e.preventDefault();
    axios.post("http://localhost:8080/meetups",formData).then(alert("meet created"));
    setformData(
      {
        "title": "",
        "location": "",
        "date": "",
        "time": "",
        "theme": "",
        "description": "",
        "image": ""
      }
    )
    navigate("/");
  }
  return (
    <div className="addMeetupContainer">
      <form onSubmit={handleSubmit}>
        <h1>Add Meetup</h1>
        <label>title</label>
        <input type="text" className="title" id="title" onChange={handleChange} required />
        <label>Location</label>
        <select value={""} className="location" id="location" onChange={handleChange}>
          <option value=""></option>
          <option value="bangalore">Bangalore</option>
          <option value="kolkata">Kolkata</option>
          <option value="delhi">Delhi</option>
          <option value="mumbai">Mumbai</option>
        </select>
        <br />
        <label>date</label>
        <input
        id="date"
          type="text"
          className="date"
          onChange={handleChange}
          placeholder="format YYYY-MM-DD"
          required
        />
        <br />
        <label>time</label>
        <input
        id="time"
          type="text"
          className="time"
          onChange={handleChange}
          placeholder="format HH:MM"
          required
        />
        <br />
        <label>Theme</label>
        
        <select value={""} className="theme"  id="theme" onChange={handleChange}>
          <option value="">-----------</option>
          <option value="technology">Technology</option>
          <option value="food">Food</option>
          <option value="movies">Movies</option>
          <option value="culture">Culture</option>
          <option value="art">Art</option>
          <option value="drama">Drama</option>
        </select>
        <label>description</label>
        <input
        id="description"
          type="text"
          className="description"
          onChange={handleChange}
          placeholder="Description"
          required
        />
        <br />
        <label>Image</label>
        <input
        id="image"
          type="text"
          className="image"
          onChange={handleChange}
          required
        />
        <br />
        <input className="submitMeetupForm" type="submit" />
      </form>
    </div>
  );
};
