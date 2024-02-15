import "./styles/resumeContainer.css";

export default function resumeContainer({
  personalData,
  educationData,
  experienceData,
}) {
  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "short" };
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", options);
  };
  return (
    <div className="resume-container">
      {/* Personal Data Section */}
      <div className="resume-canvas">
        <div className="personal-details">
          <h1>{personalData.fullName}</h1>
          <div className="contact-details">
            <p>{personalData.email}</p>
            <p>{personalData.phone}</p>
            <p>{personalData.cityProvince}</p>
          </div>
        </div>

        {/* Education Section */}
        <div className="education-section">
          <h2>Education</h2>
          {educationData.map((education, index) => (
            <div key={index} className="education-entry">
              <p className="date-range">
                {formatDate(education.startDate)} -{" "}
                {education.endDate ? formatDate(education.endDate) : "present"}
              </p>
              <h3>{education.school}</h3>
              <p>{education.degree}</p>
              <p>
                {education.city}, {education.country}
              </p>
            </div>
          ))}
        </div>

        {/* Professional Experience Section */}
        <div className="experience-section">
          <h2>Professional Experience</h2>
          {experienceData.map((experience, index) => (
            <div key={index} className="experience-entry">
              <p className="date-range">
                {formatDate(experience.startDate)} -{" "}
                {experience.endDate ? formatDate(experience.endDate) : "present"}
              </p>
              <h3>{experience.company}</h3>
              <p>{experience.title}</p>
              <p>{experience.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
