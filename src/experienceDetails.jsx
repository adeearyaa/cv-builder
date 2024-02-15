import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import "./styles/experienceDetails.css";
import addIcon from "./assets/addicon.png";


ExperienceDetails.propTypes = {
  experienceDataHandle: PropTypes.func.isRequired,
};

function ExperienceDetails({experienceDataHandle}) {
  const [formData, setFormData] = useState([
    {
      title: "Software Developer",
      company: "Facebook",
      startDate: "2000-09-01",
      endDate: "2004-09-01",
      description: "Doing some work",
    },
    {
      title: "Software Developer",
      company: "Facebook",
      startDate: "2000-09-01",
      endDate: "2004-09-01",
      description: "Doing some work",
    },
  ]);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [experienceNumber, setExperienceNumber] = useState(0);

  // Callback function to receive the form data from the child
  const handleFormSubmit = (submittedData) => {
    setFormData((currentFormData) => {
      // Copy the current form data
      const updatedFormData = [...currentFormData];

      // Update the item at the index of educationNumber
      updatedFormData[experienceNumber] = submittedData;

      // Return the updated array to update the state
      return updatedFormData;
    });
  };

  useEffect(() => {
    experienceDataHandle(formData);
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
    setExperienceNumber(index);
    setIsFormVisible(!isFormVisible);
  };

  const handleFormVisibility = (isFormVisible) => {
    setIsFormVisible(isFormVisible);
  };

  const addIconClick = () => {
    setExperienceNumber(formData.length);
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

  const dateJoiner = (date1, date2) => {
    return date1 + "-" + date2;
  };

  return (
    <div className="experience-container">
      <div className="experience-details-header">
        <h2>Experience</h2>
        <img onClick={addIconClick} className="add-icon" src={addIcon}></img>
      </div>
      {isFormVisible && (
        <ExperienceDetailsForm
          onFormSubmission={handleFormSubmit}
          formVisibilityToggle={handleFormVisibility}
          existingFormData={
            experienceNumber === formData.length
              ? {
                  degree: "",
                  school: "",
                  city: "",
                  country: "",
                  startDate: "",
                  endDate: "",
                }
              : formData[experienceNumber]
          }
        />
      )}
      <div className="experience-details-column">
        {formData.map((experience, index) => (
          <div key={index} className="experience-details-container">
            <div className="experience-details-content">
              <p className="title">{formData[index].title}</p>
              <p className="company">{formData[index].company}</p>
              <p className="dateRange">
                {dateJoiner(
                  startDateFormatter(formData[index].startDate),
                  startDateFormatter(formData[index].endDate)
                )}
              </p>
            </div>
            <div className="edit-button-container">
              <button
                onClick={() => toggleFormVisibility(index)}
                className="edit-button"
              >
                Edit
              </button>
            </div>
            <div className="delete-button-container">
              <button
                onClick={() => handleDelete(index)}
                className="delete-button"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

ExperienceDetailsForm.propTypes = {
  onFormSubmission: PropTypes.func.isRequired,
  formVisibilityToggle: PropTypes.func.isRequired,
};

function ExperienceDetailsForm({
  onFormSubmission,
  formVisibilityToggle,
  existingFormData,
}) {
  const [formData, setFormData] = useState({
    title: "",
    company: "",
    startDate: "",
    endDate: "",
    description: "",
  });

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
    setFormData(existingFormData);
  }, [existingFormData]);

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
        <label htmlFor="title">Job Title</label>
        <input
          type="text"
          id="title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label htmlFor="company">Company</label>
        <input
          type="text"
          id="company"
          name="company"
          value={formData.company}
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
        <label htmlFor="description">Description</label>
        <textarea
          type="text"
          id="description"
          name="description"
          value={formData.description}
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
export { ExperienceDetails };
