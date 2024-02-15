import DetailsContainer from "./detailsContainer.jsx";
import ResumeContainer from "./resumeContainer.jsx";
import "./styles/contentContainer.css";
import { useState } from "react";

export default function ContentContainer() {
  const [personalData, setPersonalData] = useState({});

  const handlePersonalDataFromChild = (data) => {
    setPersonalData(data);
  };

  const [educationData, setEducationData] = useState([{}]);

  const handleEducationDataFromChild = (data) => {
    setEducationData(data);
  };

  const [experienceData, setExperienceData] = useState([{}]);

  const handleExperienceDataFromChild = (data) => {
    setExperienceData(data);
  };

  return (
    <>
      <div className="main-content-container">
        <DetailsContainer
          personalDataHandle={handlePersonalDataFromChild}
          educationDataHandle={handleEducationDataFromChild}
          experienceDataHandle={handleExperienceDataFromChild}
        />
        <ResumeContainer
          personalData={personalData}
          educationData={educationData}
          experienceData={experienceData}
        />
      </div>
    </>
  );
}
