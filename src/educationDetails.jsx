import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import "./styles/educationDetails.css";
import addIcon from "./assets/addicon.png";


EducationDetails.propTypes = {
  educationDataHandle: PropTypes.func.isRequired,
};

function EducationDetails({educationDataHandle}) {
  const [formData, setFormData] = useState([
    {
      degree: "Psychology",
      school: "John Hopkins University",
      city: "Singapore",
      country: "Australia",
      startDate: "2000-09-01",
      endDate: "2004-09-01",
    },
    {
      degree: "Psychology",
      school: "John Hopkins University",
      city: "Singapore",
      country: "Australia",
      startDate: "2000-09-01",
      endDate: "2004-09-01",
    },
  ]);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [educationNumber, setEducationNumber] = useState(0);

  // Callback function to receive the form data from the child
  const handleFormSubmit = (submittedData) => {
    setFormData((currentFormData) => {
      // Copy the current form data
      const updatedFormData = [...currentFormData];
      
      // Update the item at the index of educationNumber
      updatedFormData[educationNumber] = submittedData;
  
      // Return the updated array to update the state
      return updatedFormData;
    });
  };

  useEffect(() => {
    educationDataHandle(formData);
  }, [formData]);

  const handleDelete = (index) => {
    setFormData((currentFormData) => {
      const updatedFormData = [...currentFormData];
      updatedFormData.splice(index, 1);
      return updatedFormData;
    });
  };

  // Function to toggle form visibility
  const toggleFormVisibility = (index) => {
    setEducationNumber(index);
    setIsFormVisible(!isFormVisible);
  };

  const handleFormVisibility = (isFormVisible) => {
    setIsFormVisible(isFormVisible);
  };

  const addIconClick = () => {
    setEducationNumber(formData.length);
    setIsFormVisible(true);
  };

  const startDateFormatter = (dateString) => {
    const monthNames = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];

    // Splitting the input string into year, month, and day
    const [year, month, day] = dateString.split("-");

    // Converting month from '02' to 'Feb', note months in JS Date are 0-indexed
    const formattedMonth = monthNames[parseInt(month, 10) - 1];

    // Formatting the date as "Month, Year" (e.g., "Feb, 2024")
    const formattedDate = `${formattedMonth},${year}`;

    return formattedDate;
  };

  const cityCountry = (city, country) => {
    return city + "," + country;
  };

  const dateJoiner = (date1, date2) => {
    return date1 + "-" + date2;
  };

  return (
    <div className="education-container">
      <div className="education-details-header">
        <h2>Education</h2>
        <img onClick={addIconClick} className="add-icon" src={addIcon}></img>
      </div>
      {isFormVisible && (
        <EducationDetailsForm
          onFormSubmission={handleFormSubmit}
          formVisibilityToggle={handleFormVisibility}
          existingFormData={
            educationNumber === formData.length ? {
              degree: "",
              school: "",
              city: "",
              country: "",
              startDate: "",
              endDate: "",
            } : formData[educationNumber]
          }
        />
      )}
      <div className="education-details-column">
        {formData.map((education, index) => (
          <div key={index} className = "education-details-container">
            <div className="education-details-content">
              <p className="degree">{formData[index].degree}</p>
              <p className="school">{formData[index].school}</p>
              <p className="cityCountry">
                {cityCountry(formData[index].city, formData[index].country)}
              </p>
              <p className="dateRange">
                {dateJoiner(
                  startDateFormatter(formData[index].startDate),
                  startDateFormatter(formData[index].endDate)
                )}
              </p>
            </div>
            <div className="edit-button-container">
              <button onClick={() => toggleFormVisibility(index)} className="edit-button">
                Edit
              </button>
            </div>
            <div className = "delete-button-container">
            <button onClick = {() => handleDelete(index)} className = "delete-button">
                  Delete
            </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

EducationDetailsForm.propTypes = {
  onFormSubmission: PropTypes.func.isRequired,
  formVisibilityToggle: PropTypes.func.isRequired,
};

function EducationDetailsForm({
  onFormSubmission,
  formVisibilityToggle,
  existingFormData,
}) {
  const [formData, setFormData] = useState({
    degree: "",
    school: "",
    city: "",
    country: "",
    startDate: "",
    endDate: "",
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
    <form className="form-group" onSubmit={handleSubmit}>
      <div>
        <label htmlFor="degree">Degree</label>
        <input
          type="text"
          id="degree"
          name="degree"
          value={formData.degree}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label htmlFor="school">School</label>
        <input
          type="text"
          id="school"
          name="school"
          value={formData.school}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label htmlFor="city">City</label>
        <input
          type="text"
          id="city"
          name="city"
          value={formData.city}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label htmlFor="country">Country</label>
        <input
          type="text"
          id="country"
          name="country"
          value={formData.country}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label htmlFor="startDate">Start Date</label>
        <input
          type="date"
          id="startDate"
          name="startDate"
          value={formData.startDate}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label htmlFor="endDate">End Date</label>
        <input
          type="date"
          id="endDate"
          name="endDate"
          value={formData.endDate}
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
export { EducationDetails };
