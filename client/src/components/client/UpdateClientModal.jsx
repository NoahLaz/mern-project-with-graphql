import { useMutation } from "@apollo/client";
import { useState } from "react";
import { ADD_CLIENT } from "../../mutations/clientMutation";
import { GET_CLIENTS } from "../../queries/clientQueries";
import { FaEdit } from "react-icons/fa";

const UpdateClientModal = ({ oldClient }) => {
  const [client, setClient] = useState({ ...oldClient });

  const [addClient] = useMutation(ADD_CLIENT, {
    variables: { ...client },
    update(cache, { data: { addClient } }) {
      const { clients } = cache.readQuery({ query: GET_CLIENTS });
      cache.writeQuery({
        query: GET_CLIENTS,
        data: {
          clients: [...clients, addClient],
        },
      });
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (client.email || client.name || client.phone) {
      addClient();
    } else {
      alert("Please fill all fields");
    }

    setClient({ name: "", email: "", phone: "" });
  };

  const handleInput = (e) => {
    // setClient((prev) => {
    //   return { ...prev, [e.target.name]: e.target.value };
    // });
  };

  return (
    <>
      <button
        type="button"
        className="btn btn-sm btn-secondary d-flex justify-content-center align-items-center"
        data-bs-toggle="modal"
        data-bs-target="#addClientModal"
      >
        <FaEdit />
      </button>

      <div
        className="modal fade"
        id="addClientModal"
        aria-labelledby="addClientModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="addClientModalLabel">
                Update Client
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <form className="d-flex flex-column">
                <div className="mb-3">
                  <label htmlFor="form-name" className="form-label">
                    Name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="form-name"
                    placeholder="Enter your name"
                    onChange={handleInput}
                    value={client.name}
                    name="name"
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="form-email" className="form-label">
                    Email
                  </label>
                  <input
                    type="Email"
                    className="form-control"
                    id="form-email"
                    placeholder="Enter your email"
                    onChange={handleInput}
                    value={client.email}
                    name="email"
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="form-phone" className="form-label">
                    Phone
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="form-phone"
                    placeholder="Enter your phone"
                    onChange={handleInput}
                    value={client.phone}
                    name="phone"
                  />
                </div>
                <button
                  type="submit"
                  className="btn btn-primary align-self-end px-3"
                  onClick={handleSubmit}
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
};

export default UpdateClientModal;
