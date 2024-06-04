import { Button, Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { UserProfile } from "../../types";
import { useEffect, useState } from "react";
import axios from "axios";
import { BASE_API_URL } from "../../utils/constants";

const Profile = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [profileInfo, setProfileInfo] = useState<UserProfile | null>(null);

  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<UserProfile>();

  useEffect(() => {
    const getProfileInfo = async () => {
      try {
        setIsLoading(true);
        const { data } = await axios.get(`${BASE_API_URL}/profile`);
        setProfileInfo(data);
        console.log("data", data);
      } catch (error) {
        setErrorMsg("Error while getting profileinformation. Try again later.");
      } finally {
        setIsLoading(false);
      }
    };
    getProfileInfo();
  }, []);

  useEffect(() => {
    reset({
      first_name: profileInfo?.first_name || "",
      last_name: profileInfo?.last_name || "",
      email: profileInfo?.email || "",
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [profileInfo]);

  const onSubmit = async (data: UserProfile) => {
    console.log("data", data);
    setErrorMsg("");
    try {
      await axios.patch(`${BASE_API_URL}/profile`, data);
      setSuccessMsg("Profile is updated successfully.");
      setTimeout(() => {
        setSuccessMsg("");
      }, 2000);
    } catch (error) {
      setSuccessMsg("");
      setErrorMsg("Error while updating profile. Try again later.");
    }
  };

  return (
    <div className="main-content">
      <h2 className="my-3 text-center">Profile</h2>
      {isLoading && <p className="loading">Loading...</p>}
      {errorMsg && <p className="error-msg">{errorMsg}</p>}
      {successMsg && <p className="success-msg">{successMsg}</p>}
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Form.Group className="mb-3" controlId="first_name">
          <Form.Label>First Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter your first name"
            {...register("first_name", { required: true })}
          />
          {errors.first_name && (
            <p className="error-msg">Please enter your first name</p>
          )}
        </Form.Group>

        <Form.Group className="mb-3" controlId="last_name">
          <Form.Label>Last Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter your last name"
            {...register("last_name", { required: true })}
          />
          {errors.last_name && (
            <p className="error-msg">Please enter your last name</p>
          )}
        </Form.Group>

        <Form.Group className="mb-3" controlId="email">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter your email"
            {...register("email", { required: true })}
          />
          {errors.email && <p className="error-msg">Please enter your email</p>}
        </Form.Group>

        <Form.Group>
          <Button type="submit" variant="success">
            Update Profile
          </Button>
        </Form.Group>
      </Form>
    </div>
  );
};

export default Profile;
