import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Register.css";

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    profileImage: null,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({
      ...formData,
      [name]: name === "profileImage" ? files[0] : value,
    });
  };

  const [passwordMatch, setPasswordMatch] = useState(true);

  useEffect(() => {
    setPasswordMatch(
      formData.password === formData.confirmPassword ||
        formData.confirmPassword === ""
    );
  }, [formData.password, formData.confirmPassword]);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const register_form = new FormData();

      for (var key in formData) {
        register_form.append(key, formData[key]);
      }

      const response = await fetch("http://localhost:3000/auth/register", {
        method: "POST",
        body: register_form,
      });

      if (response.ok) {
        navigate("/login");
      }
    } catch (err) {
      console.log("Registration failed", err.message);
    }
  };

  return (
    <div className="register">
      <div className="register_content">
        <form className="register_content_form" onSubmit={handleSubmit}>
          <input
            placeholder="First Name"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            required
          />
          <input
            placeholder="Last Name"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            required
          />
          <input
            placeholder="Email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <input
            placeholder="Password"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
          <input
            placeholder="Confirm Password"
            name="confirmPassword"
            type="password"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
          />

          {!passwordMatch && (
            <p style={{ color: "red" }}>Passwords do not match!</p>
          )}

          {!formData.profileImage && (
            <div>
              <input
                id="image"
                type="file"
                name="profileImage"
                accept="image/*"
                style={{ display: "none" }}
                onChange={handleChange}
              />
              <label htmlFor="image" className="image_label">
                <p>Upload Your Photo</p>
              </label>
            </div>
          )}

          {formData.profileImage && (
            <div className="uploaded_image">
              <img
                src={URL.createObjectURL(formData.profileImage)}
                alt="profile"
                className="profile_photo"
              />
            </div>
          )}
          <button type="submit" className="register_button" disabled={!passwordMatch}>
            REGISTER
          </button>
        </form>
        <a href="/login" className="login_link">Already have an account? Log In Here</a>
      </div>
    </div>
  );
};

export default RegisterPage;
