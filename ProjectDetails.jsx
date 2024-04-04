import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { getProject, createProject, updateProject, deleteProject } from './solanaUtils';

const INITIAL_PROJECT_DETAILS = {
  projectId: '',
  projectName: '',
  projectDescription: '',
  startDate: new Date().toISOString().substring(0, 10),
  endDate: new Date().toISOString().substring(0, 10),
  targetFund: 0,
  currentFund: 0,
};

const ProjectDetails = ({ projectId }) => {
  const [projectDetails, setProjectDetails] = useState(INITIAL_PROJECT_DETAILS);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    if (projectId) {
      getProjectDetails(projectId);
    }
  }, [projectId]);

  const getProjectDetails = async (id) => {
    try {
      const details = await getProject(id);
      setProjectDetails({
        ...details,
        startDate: details.startDate.substring(0, 10),
        endDate: details.endDate.substring(0, 10),
      });
    } catch (error) {
      console.error('Failed to fetch project details:', error);
      setErrorMessage('Failed to fetch project details. Please try again later.');
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProjectDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  const resetProjectDetails = () => {
    setProjectDetails(INITIAL_PROJECT_DETAILS);
  };

  const handleSave = async () => {
    const action = projectDetails.projectId ? updateProject : createProject;
    try {
      await action(projectDetails);
      alert('Project saved successfully!');
      resetProjectDetails();
    } catch (error) {
      console.error('Failed to save project:', error);
      setErrorMessage('Failed to save project. Please try again later.');
    }
  };

  const handleDelete = async () => {
    try {
      await deleteProject(projectDetails.projectId);
      alert('Project deleted successfully!');
      resetProjectDetails();
    } catch (error) {
      console.error('Failed to delete project:', error);
      setErrorMessage('Failed to delete project. Please try again later.');
    }
  };

  return (
    <div>
      {errorMessage && <p className="error-message">{errorMessage}</p>}
      <form onSubmit={(e) => e.preventDefault()}>
        <label>
          Project Name:
          <input
            type="text"
            name="projectName"
            value={projectDetails.projectName}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Description:
          <textarea
            name="projectDescription"
            value={projectDetails.projectDescription}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Start Date:
          <input
            type="date"
            name="startDate"
            value={projectDetails.startDate}
            onChange={handleInputChange}
          />
        </label>
        <label>
          End Date:
          <input
            type="date"
            name="endDate"
            value={projectDetails.endDate}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Target Fund:
          <input
            type="number"
            name="targetFund"
            value={projectDetails.targetFund}
            onChange={handleInputChange}
          />
        </label>
        <button type="button" onClick={handleSave}>Save Project</button>
        {projectDetails.projectId && (
          <button type="button" onClick={handleDelete}>
            Delete Project
          </button>
        )}
      </form>
    </div>
  );
};

ProjectDetails.propTypes = {
  projectId: PropTypes.string,
};

export default ProjectDetails;
