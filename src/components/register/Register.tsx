import { Button, Form } from "react-bootstrap";
import { FC, useState } from "react";
import { useForm } from "react-hook-form";
import "./Register.css";
import { UserProfile } from "../../types";
import axios from "axios";
import { BASE_API_URL } from "../../utils/constants";
import { Link, useNavigate } from "react-router-dom";

interface RegisterProps {
  setIsLoggedIn: (data: boolean) => void;
}

const Register: FC<RegisterProps> = ({ setIsLoggedIn }) => {
  const navigate = useNavigate();
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const {
    register,
    handleSubmit,
    reset,
    // For password validation (comparison with c_password)
    watch,
    formState: { errors },
  } = useForm<UserProfile>();

  const onSubmit = async (data: UserProfile) => {
    console.log("data", data);
    setErrorMsg("");
    setSuccessMsg("");
    try {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { c_password, ...rest } = data;
      const { data: registeredUser } = await axios.post(
        `${BASE_API_URL}/users`,
        rest
      );
      setSuccessMsg("Registration is successfull.");
      reset({
        email: "",
        password: "",
        c_password: "",
      });
      setTimeout(() => {
        setSuccessMsg("");
        setIsLoggedIn(true);
        navigate("/");
      }, 2000);
      console.log("registeredUser", registeredUser);
    } catch (error) {
      console.log(error);
      setSuccessMsg("");
      setErrorMsg("Error while registering user. Try again later.");
    }
  };

  // console.log("errors", errors);

  return (
    <div className="main-content">
      <h2 className="my-3 text-center">Register</h2>
      <div className="register-section">
        <Form onSubmit={handleSubmit(onSubmit)}>
          {successMsg && <p className="success-msg">{successMsg}</p>}
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

          <Form.Group className="mb-3" controlId="c_password">
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter your confirm password"
              {...register("c_password", {
                required: "Confirm password is required",
                // Checking matching of passw and c_passw
                validate: {
                  match: (value) => {
                    if (value !== watch("password")) {
                      return "Password and confirm password do not match";
                    }
                  },
                },
              })}
            />
            {errors.c_password && (
              <p className="error-msg">{errors.c_password.message}</p>
            )}
          </Form.Group>

          <Form.Group>
            <Button type="submit" variant="success">
              Register
            </Button>
            <div className="mt-3" register-btn>
              Already have an account?{" "}
              <Link to="/login" className="login-link">
                Login here
              </Link>
            </div>
          </Form.Group>
        </Form>
      </div>
    </div>
  );
};

export default Register;
