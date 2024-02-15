import PropTypes from "prop-types";
import { PersonalDetails } from "./personalDetails.jsx";
import { EducationDetails } from "./educationDetails.jsx";
import { ExperienceDetails } from "./experienceDetails.jsx";

export default function DetailsContainer ({personalDataHandle, educationDataHandle, experienceDataHandle}) {
    return (
        <div className = "details">
            <PersonalDetails  personalDataHandle = {personalDataHandle}/>
            <EducationDetails  educationDataHandle = {educationDataHandle}/>
            <ExperienceDetails  experienceDataHandle = {experienceDataHandle}/>
        </div>
    )
}

DetailsContainer.propTypes = {
    personalDataHandle: PropTypes.func.isRequired,
    educationDataHandle:PropTypes.func.isRequired,
    experienceDataHandle: PropTypes.func.isRequired
  };