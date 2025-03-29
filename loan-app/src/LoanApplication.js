import React, { useState } from "react";
import "./App.css";

function LoanApplication() {
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
  });
  const [loading, setLoading] = useState(false);
  const [prediction, setPrediction] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setPrediction(null);
    // Simulate an API call
    setTimeout(() => {
      const isApproved = Math.random() > 0.5;
      setPrediction(isApproved ? "Approved" : "Denied");
      setLoading(false);
    }, 1500);
  };

  return (
    <div className="loan-form-container">
      <h2>Loan Application Form</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="age">Age:</label>
          <input
            type="number"
            id="age"
            name="age"
            value={formData.age || ""}
            onChange={handleChange}
            required
          />
        </div>

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
        <div className="form-group">
          <label htmlFor="homeOwnership">Home Ownership:</label>
          <select
            id="homeOwnership"
            name="homeOwnership"
            value={formData.homeOwnership}
            onChange={handleChange}
          >
            <option value="own">Own</option>
            <option value="rent">Rent</option>
            <option value="mortgage">Mortgage</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="previousDefaults">Previous Loan Defaults:</label>
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
        <div className="form-group">
          <label htmlFor="epsilon">Select Epsilon:</label>
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
        </div>

        <button type="submit" className="submit-button" disabled={loading}>
          {loading ? "Processing..." : "Submit Application"}
        </button>
      </form>
      {prediction && (
        <div className="result">
          <h3>Prediction: {prediction}</h3>
          <p>
            {prediction === "Approved"
              ? "Congratulations! Your loan has been approved."
              : "We are sorry, your loan has been denied."}
          </p>
        </div>
      )}
    </div>
  );
}

export default LoanApplication;
