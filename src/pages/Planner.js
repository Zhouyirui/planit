import React, { useEffect, useState } from "react";
import "./MainStyle.css";
import PlannerManager from "../components/PlannerManager";

function Planner() {
  const [moduleData, setModuleData] = useState([]);

  useEffect(() => {
    fetch("https://api.nusmods.com/v2/2020-2021/moduleInfo.json")
      .then((response) => response.json())
      .then((data) => {
        setModuleData(data);
      });
  }, []);

  return (
    <div className="planner-backg">
      {/* <Sidebar /> */}
      <PlannerManager moduleData={moduleData} />
    </div>
  );
}

export default Planner;
