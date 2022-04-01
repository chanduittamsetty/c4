import { Link } from "react-router-dom";

export const Navbar = () => {
  return (
    <div className="navbar" style={{marginBottom:"50px"}}>
      <Link className="navbarHome" to={"/"} style={{marginRight:"300px"}}>
        Home
      </Link>
      <Link className="navbarLoginSignUp" to={"/loginsignup"}>
        Login/Sign Up
      </Link>
    </div>
  );
};
