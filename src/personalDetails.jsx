import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import "./styles/personalDetails.css";
import addIcon from "./assets/addicon.png";


PersonalDetails.propTypes = {
  personalDataHandle: PropTypes.func.isRequired,
};

function PersonalDetails({personalDataHandle}) {
  const [formData, setFormData] = useState({
    fullName: 'John Doe',
    email:"johndoe@abc.com",
    phone: '12345678',
    cityProvince: 'Texas,USA'
  });
  const [isFormVisible, setIsFormVisible] = useState(false);

  useEffect(() => {
    personalDataHandle(formData);
  }, [formData]);

  // Callback function to receive the form data from the child
  const handleFormSubmit = (submittedData) => {
    console.log(submittedData);
    setFormData(submittedData);
    // Now formData state contains the submitted values, and you can use it to update other details
  };

  // Function to toggle form visibility
  const toggleFormVisibility = () => {
    setIsFormVisible(!isFormVisible);
  };

  const handleFormVisibility = (isFormVisible) => {
    setIsFormVisible(isFormVisible)
  };
  
  return (
    <div className = "details-container">
      <div className="personal-details-header">
        <h2>Personal Particulars</h2>
        <img className = "add-icon" src = {addIcon}></img>
      </div>
      {isFormVisible && <PersonalDetailsForm onFormSubmission={handleFormSubmit} formVisibilityToggle = {handleFormVisibility} existingFormData = {formData}/>}
      <div className="personal-details-container">
        <div className="personal-details-content">
          <p className="full-name">{formData.fullName}</p>
          <p className="email-address">{formData.email}</p>
          <p className="phone-number">{formData.phone}</p>
          <p className="address">{formData.cityProvince}</p>
        </div>
        <div className = "edit-button-container">
        <button onClick = {toggleFormVisibility} className="edit-button">Edit</button>
        </div>
      </div>
    </div>
  );
}

PersonalDetailsForm.propTypes = {
  onFormSubmission: PropTypes.func.isRequired,
  formVisibilityToggle: PropTypes.func.isRequired,
};

function PersonalDetailsForm({ onFormSubmission, formVisibilityToggle, existingFormData }) {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    cityProvince: "",
  });

  useEffect(() => {
    setFormData(existingFormData);
  }, [existingFormData]);

  const [isButtonDisabled, setIsButtonDisabled] = useState(true);

  const handleChange = (event) => {
    const { name, value } = event.target;
    // pass a function because there could be multiple state changes by the diff input fields
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  useEffect(() => {
    // Check if all fields are filled in
    const allFilled = Object.values(formData).every(
      (value) => value.trim() !== ""
    );
    setIsButtonDisabled(!allFilled);
  }, [formData]); // This effect runs whenever formData changes

  const handleSubmit = (event) => {
    event.preventDefault();
    formVisibilityToggle(false);
    onFormSubmission(formData);
  };


  return (
    <form className = "form-group" onSubmit={handleSubmit}>
      <div>
        <label htmlFor="fullName">Full Name</label>
        <input
          type="text"
          id="fullName"
          name="fullName"
          value={formData.fullName}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label htmlFor="phone">Phone Number</label>
        <input
          type="tel"
          id="phone"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label htmlFor="cityProvince">City and Province</label>
        <input
          type="text"
          id="cityProvince"
          name="cityProvince"
          value={formData.cityProvince}
          onChange={handleChange}
          required
        />
      </div>
      <button type="submit" disabled={isButtonDisabled}>
        Save
      </button>
    </form>
  );
}
export { PersonalDetails };
