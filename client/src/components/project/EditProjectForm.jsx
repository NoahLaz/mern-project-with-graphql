import { useMutation } from "@apollo/client";
import { useState } from "react";
import { UPDATE_PROJECT } from "../../mutations/projectMutation";

const EditProjectForm = ({ oldProject }) => {
  const [project, setProject] = useState({
    name: oldProject.name,
    description: oldProject.description,
    status:
      oldProject.status === "Not Started"
        ? "new"
        : oldProject.status === "In Progress"
        ? "progress"
        : "complete",
  });

  const [updateProject] = useMutation(UPDATE_PROJECT, {
    variables: { id: oldProject.id, ...project },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (project.name || project.description || project.status) {
      updateProject();
      alert("Project updated!");
    } else {
      alert("Please fill all fields");
    }
  };

  const handleInput = (e) => {
    setProject((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  return (
    <div className="mt-5">
      <h3>Update Project Details</h3>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Name</label>
          <input
            type="text"
            className="form-control"
            id="name"
            value={project.name}
            onChange={handleInput}
            name="name"
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Description</label>
          <textarea
            className="form-control"
            id="description"
            value={project.description}
            onChange={handleInput}
            name="description"
          ></textarea>
        </div>
        <div className="mb-3">
          <label className="form-label">Status</label>
          <select
            id="status"
            className="form-select"
            value={project.status}
            onChange={handleInput}
            name="status"
          >
            <option value="new">Not Started</option>
            <option value="progress">In Progress</option>
            <option value="complete">Complete</option>
          </select>
        </div>

        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
};

export default EditProjectForm;
