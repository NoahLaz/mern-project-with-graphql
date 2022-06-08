import { useMutation } from "@apollo/client";
import { useState } from "react";
import { FaBook } from "react-icons/fa";
import { ADD_PROJECT } from "../../mutations/projectMutation";
import { GET_PROJECTS } from "../../queries/projectQueries";
import { useQuery } from "@apollo/client";
import { GET_CLIENTS } from "../../queries/clientQueries";

const AddProjectModal = () => {
  const [project, setProject] = useState({
    name: "",
    description: "",
    status: "",
    clientId: "",
  });

  const { loading, error, data } = useQuery(GET_CLIENTS);

  const [addProject] = useMutation(ADD_PROJECT, {
    variables: { ...project },
    update(cache, { data: { addProject } }) {
      const { projects } = cache.readQuery({ query: GET_PROJECTS });
      cache.writeQuery({
        query: GET_PROJECTS,
        data: {
          projects: [...projects, addProject],
        },
      });
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      project.name === "" ||
      project.description === "" ||
      project.status === "" ||
      project.clientId === ""
    ) {
      alert("Please fill all fields");
    } else {
      addProject();
    }

    // setProject({ name: "", description: "", clientId: "" });
  };

  const handleInput = (e) => {
    setProject((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  if (loading) return <p>Loading...</p>;

  if (!loading || !error) {
    return (
      <>
        <button
          type="button"
          className="btn btn-secondary d-flex align-items-center"
          data-bs-toggle="modal"
          data-bs-target="#addProjectModal"
        >
          <FaBook className="icon" />
          <div>Add Project</div>
        </button>

        <div
          className="modal fade"
          id="addProjectModal"
          aria-labelledby="AddProjectModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="AddProjectModalLabel">
                  Add Project
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body">
                <form onSubmit={handleSubmit} className="d-flex flex-column">
                  <div className="mb-3">
                    <label htmlFor="form-name" className="form-label">
                      Name
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="form-name"
                      placeholder="Enter project name"
                      onChange={handleInput}
                      value={project.name}
                      name="name"
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="form-description" className="form-label">
                      Description
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="form-description"
                      placeholder="Enter project description"
                      onChange={handleInput}
                      value={project.description}
                      name="description"
                    />
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
                      <option value="">Select the progress</option>
                      <option value="new">Not Started</option>
                      <option value="progress">In Progress</option>
                      <option value="complete">Complete</option>
                    </select>
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Client</label>
                    <select
                      id="clientId"
                      className="form-select"
                      value={project.clientId}
                      onChange={handleInput}
                      name="clientId"
                    >
                      <option value="" disabled>
                        Select a client
                      </option>
                      {data.clients.map((client) => (
                        <option key={client.id} value={client.id}>
                          {client.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <button
                    type="submit"
                    className="btn btn-primary align-self-end px-3"
                  >
                    Submit
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
};

export default AddProjectModal;
