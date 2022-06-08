import AddProjectModal from "../components/project/AddProjectModal";
import AddClientModal from "../components/client/AddClientModal";
import Projects from "../components/project/Projects";
import Clients from "../components/client/Clients";

const Home = () => {
  return (
    <>
      <div className="d-flex gap-3 mt-5">
        <AddProjectModal />
        <AddClientModal />
      </div>
      <hr />
      <Projects />
      <hr />
      <Clients />
    </>
  );
};

export default Home;
