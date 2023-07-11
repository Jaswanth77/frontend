import classes from "./styles/App.module.css";
import { useState } from "react";
import CreateForm from "./components/CreateForm";
import UpdateForm from "./components/UpdateForm";
import ViewForm from "./components/ViewForm";
function App() {
  const [currentPage, setCurrentPage] = useState(1);
  function handlePageChange(curPage) {
    setCurrentPage(curPage);
  }
  console.log(currentPage);

  return (
    <div className={classes.container}>
      <div className={classes.header}>
        <div className={classes.header_img}></div>
        <div className={classes.header_div}>
          <h1>VELAMMAL MEDICAL COLLEGE HOSPITAL AND RESEARCH INSTITUTE</h1>
          <h2>Student Admission Form Management Portal</h2>
        </div>
        
      </div>
      <div className={classes.navbarContainer}>
        <ul className={classes.navbar}>
          <li>
            <button onClick={handlePageChange.bind(null, 1)}>
              New Application
            </button>
          </li>
          <li>
            <button onClick={handlePageChange.bind(null, 2)}>
              Update Application
            </button>
          </li>
          <li>
            <button onClick={handlePageChange.bind(null, 3)}>
              View Application
            </button>
          </li>
        </ul>
      </div>
      <div className={classes.body}>
        {currentPage === 1 ? (
          <CreateForm />
        ) : currentPage === 2 ? (
          <UpdateForm />
        ) : currentPage === 3 ? (
          <ViewForm />
        ) : (
          <div></div>
        )}
      </div>
    </div>
  );
}

export default App;
