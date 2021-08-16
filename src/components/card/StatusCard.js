
import React  from "react";
import Button from "./../button/Button";

export default function StatusCard({projectName , totalConfiguration , projectId , viewProject , deleteProject}){
    return (
        <div className="border-2 rounded-xl border-black p-2 space-y-2">
            <h1>Project Name : {projectName}</h1>
            <h1>Total Configuration : {totalConfiguration}</h1>
            <Button title="View Project" type="success" onClick={viewProject}/>
            <Button title="Delete Project" type="danger" onClick={deleteProject}/>                        
       </div>
    )
}