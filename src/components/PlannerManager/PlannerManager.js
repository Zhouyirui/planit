import React, { useEffect, useState } from "react";
import "./PlannerManager.css";
import ModuleBar from "../ModuleBar";
import { database } from "../../config/firebase";
import { useAuth } from "../../contexts/AuthContext";
import PlannerList from "../PlannerList";

function PlannerManager(props) {
  const { moduleData } = props;
  const { currentUser } = useAuth();
  const [moduleBar, setModuleBar] = useState(false);
  const [displayedModule, setDisplayedModule] = useState({
    moduleCode: "",
    title: "",
    description: "",
  });
  const [plannedModules, setPlannedModules] = useState();
  const [semSelected, setSemSelected] = useState(-1);
  const [displayOnly, setDisplayOnly] = useState(false);

  const resetModuleBar = () => {
    setModuleBar(false);
    setDisplayedModule({ moduleCode: "", title: "", description: "" });
  };

  useEffect(() => {
    database.users.doc(currentUser?.uid).onSnapshot((doc) => {
      setPlannedModules(doc.data().plannedModules);
    });
  }, [currentUser]);

  return (
    <div className={moduleBar ? "container-minimised" : "main-container"}>
      <div>
        <PlannerList
          setModuleBar={setModuleBar}
          plannedModules={plannedModules}
          setPlannedModules={setPlannedModules}
          setSemSelected={setSemSelected}
          setDisplayedModule={setDisplayedModule}
          setDisplayOnly={setDisplayOnly}
        />
      </div>
      <ModuleBar
        moduleBar={moduleBar}
        moduleData={moduleData}
        displayedModule={displayedModule}
        setDisplayedModule={setDisplayedModule}
        plannedModules={plannedModules}
        setPlannedModules={setPlannedModules}
        resetModuleBar={resetModuleBar}
        semSelected={semSelected}
        displayOnly={displayOnly}
      />
    </div>
  );
}

export default PlannerManager;
