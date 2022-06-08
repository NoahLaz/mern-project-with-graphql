import { FaTrash } from "react-icons/fa";
import { useMutation } from "@apollo/client";
import { DELETE_PROJECT } from "../../mutations/projectMutation";
import { useNavigate } from "react-router-dom";

const DeleteProjectButton = ({ projectId }) => {
  const [deleteProject] = useMutation(DELETE_PROJECT, {
    variables: { id: projectId },
  });
  const navigate = useNavigate();

  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete this project?")) {
      deleteProject();
      navigate("/");
    }
  };

  return (
    <div className="d-flex mt-5 ms-auto">
      <button className="btn btn-danger m-2" onClick={handleDelete}>
        <FaTrash className="icon" /> Delete Project
      </button>
    </div>
  );
};

export default DeleteProjectButton;
