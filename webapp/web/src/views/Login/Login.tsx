import { Card, Grid, Typography } from "@mui/material";
import LoginForm from "../../components/Login/LoginForm";
import { useMemo, useState } from "react";
import img from "../../assets/logo.png";
import "./Login.scss";
import { Link } from "react-router-dom";
import LoginHero from "../../components/Login/LoginHero";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  // Memoized login page component to avoid unnecessary re-renders
  const loginPage = useMemo(() => {
    // Render the LoginForm component with current formData and setFormData function

    return [<LoginForm formData={formData} setFormData={setFormData} />];
  }, [formData]);
  // Render the Login component UI
  return (
    <>
    <LoginHero></LoginHero>
    <Grid container direction="column" className="login-container">
    
      <Card
        style={{ padding: "10px 40px" }}
      >
       
        {/* <img src={img} className="logo" height="280" width="350" /> */}
        {loginPage}
        
      </Card>
    </Grid>
    </>
  );
};

export default Login;
