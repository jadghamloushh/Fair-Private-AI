// LoanApplication.js
import React, { useState, useContext, useEffect } from "react";
import { AuthContext } from "./context/AuthContext";
import "./App.css";

function LoanApplication() {
  const { user } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    name: "",
    gender: "male",
    education: "high_school",
    loanIntent: "personal",
    homeOwnership: "rent",
    previousDefaults: "no",
    loanAmount: "",
    annualIncome: "",
    creditScore: "",
    epsilon: "1", // default value for normal users
  });

  // Update epsilon default based on user role when user data becomes available.
  useEffect(() => {
    if (user && user.role) {
      if (user.role === "normal") {
        setFormData((prev) => ({ ...prev, epsilon: "1" }));
      } else if (user.role === "employee") {
        setFormData((prev) => ({ ...prev, epsilon: "2" }));
      } else if (user.role === "admin") {
        // For admin, default to 1 but allow changing
        setFormData((prev) => ({ ...prev, epsilon: "1" }));
      }
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    // Prevent non-admin users from modifying epsilon.
    if (name === "epsilon" && user && user.role !== "admin") {
      return;
    }
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate an API call or process the form data.
    console.log("Form submitted:", formData);
    // You can add your API integration logic here.
  };

  return (
    <div className="loan-form-container">
      <h2>Loan Application Form</h2>
      <form onSubmit={handleSubmit}>
        {/* Name */}
        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        {/* Gender */}
        <div className="form-group">
          <label htmlFor="gender">Gender:</label>
          <select
            id="gender"
            name="gender"
            value={formData.gender}
            onChange={handleChange}
          >
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </div>
        {/* Education */}
        <div className="form-group">
          <label htmlFor="education">Education:</label>
          <select
            id="education"
            name="education"
            value={formData.education}
            onChange={handleChange}
          >
            <option value="high_school">High School</option>
            <option value="bachelor">Bachelor's</option>
            <option value="master">Master's</option>
            <option value="phd">PhD</option>
          </select>
        </div>
        {/* Loan Intent */}
        <div className="form-group">
          <label htmlFor="loanIntent">Loan Intent:</label>
          <select
            id="loanIntent"
            name="loanIntent"
            value={formData.loanIntent}
            onChange={handleChange}
          >
            <option value="personal">Personal</option>
            <option value="business">Business</option>
            <option value="education">Education</option>
          </select>
        </div>
        {/* Home Ownership */}
        <div className="form-group">
          <label htmlFor="homeOwnership">Home Ownership:</label>
          <select
            id="homeOwnership"
            name="homeOwnership"
            value={formData.homeOwnership}
            onChange={handleChange}
          >
            <option value="rent">Rent</option>
            <option value="own">Own</option>
            <option value="mortgage">Mortgage</option>
          </select>
        </div>
        {/* Previous Defaults */}
        <div className="form-group">
          <label htmlFor="previousDefaults">Previous Defaults:</label>
          <select
            id="previousDefaults"
            name="previousDefaults"
            value={formData.previousDefaults}
            onChange={handleChange}
          >
            <option value="no">No</option>
            <option value="yes">Yes</option>
          </select>
        </div>
        {/* Loan Amount */}
        <div className="form-group">
          <label htmlFor="loanAmount">Loan Amount ($):</label>
          <input
            type="number"
            id="loanAmount"
            name="loanAmount"
            value={formData.loanAmount}
            onChange={handleChange}
            required
          />
        </div>
        {/* Annual Income */}
        <div className="form-group">
          <label htmlFor="annualIncome">Annual Income ($):</label>
          <input
            type="number"
            id="annualIncome"
            name="annualIncome"
            value={formData.annualIncome}
            onChange={handleChange}
            required
          />
        </div>
        {/* Credit Score */}
        <div className="form-group">
          <label htmlFor="creditScore">Credit Score:</label>
          <input
            type="number"
            id="creditScore"
            name="creditScore"
            value={formData.creditScore}
            onChange={handleChange}
            required
          />
        </div>
        {/* Epsilon Field */}
        <div className="form-group">
          <label htmlFor="epsilon">Epsilon:</label>
          {user && user.role === "admin" ? (
            <select
              id="epsilon"
              name="epsilon"
              value={formData.epsilon}
              onChange={handleChange}
            >
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="4">4</option>
              <option value="8">8</option>
            </select>
          ) : (
            <input
              type="text"
              id="epsilon"
              name="epsilon"
              value={formData.epsilon}
              readOnly
            />
          )}
        </div>
        <button type="submit" className="submit-button">
          Submit Application
        </button>
      </form>
    </div>
  );
}

export default LoanApplication;
