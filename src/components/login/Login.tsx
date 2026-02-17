import { Button, Form } from "react-bootstrap";
import { FC, useState } from "react";
import { useForm } from "react-hook-form";
import "./Login.css";
import { UserProfile } from "../../types";
import axios from "axios";
import { BASE_API_URL } from "../../utils/constants";
import { Link, useNavigate } from "react-router-dom";

interface LoginProps {
  setIsLoggedIn: (data: boolean) => void;
}

const Login: FC<LoginProps> = ({ setIsLoggedIn }) => {
  const navigate = useNavigate();
  const [errorMsg, setErrorMsg] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserProfile>();

  const onSubmit = async (data: UserProfile) => {
    console.log("data", data);
    setErrorMsg("");
    try {
      const { data: response } = await axios.get(
        `${BASE_API_URL}/users?email=${data.email}&password=${data.password}`
      );
      if (response.length > 0) {
        setIsLoggedIn(true);
        navigate("/");
      } else {
        setErrorMsg("Invalid login credentials.");
      }
    } catch (error) {
      console.log(error);
      setErrorMsg("Error during login. Try again later.");
    }
  };

  // console.log("errors", errors);

  return (
    <div className="main-content">
      <h2 className="my-3 text-center">Login</h2>
      <div className="login-section">
        <Form onSubmit={handleSubmit(onSubmit)}>
          <div className="parent-container">
            {errorMsg && <p className="error-msg">{errorMsg}</p>}
          </div>

          <Form.Group className="mb-3" controlId="email">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/,
                  message: "Email is not valid",
                },
              })}
              placeholder="Enter your email"
            />
            {errors.email && (
              <p className="error-msg">{errors.email.message}</p>
            )}
            {/* {errors.email && errors.email.type === "pattern" && (
              <p className="error-msg">Email is not valid</p>
            )} */}
          </Form.Group>

          <Form.Group className="mb-3" controlId="password">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              {...register("password", {
                required: "Password is required",
                // Passw validation
                minLength: {
                  value: 6,
                  message: "Password should be at least 6 characters",
                },
              })}
              placeholder="Enter your password"
            />
            {errors.password && (
              <p className="error-msg">{errors.password.message}</p>
            )}
          </Form.Group>

          <Form.Group>
            <Button type="submit" variant="success">
              Login
            </Button>
            <div className="mt-3" register-btn>
              Don't have an account yet?{" "}
              <Link to="/register" className="login-link">
                Register here
              </Link>
            </div>
          </Form.Group>
        </Form>
      </div>
    </div>
  );
};

export default Login;
