import { useState } from "react";

function ProjectItem({ project }) {
  const [isHovered, setIsHovered] = useState(false);
    const hostingURL = process.env.REACT_APP_HOSTING_URL;

  return (
    <img
      src={
        isHovered
          ? `${hostingURL}/${project.projectYear}/${project.thumbnailImage}`
          : `${hostingURL}/${project.projectYear}/${project.thumbnailImage1}`
      }
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      loading="lazy"
      
      style={{ width: "100%", height: "auto" }}
      alt="썸네일"
    />
  );
}

export default ProjectItem;