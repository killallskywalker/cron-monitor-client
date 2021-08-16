import React , { useState , useEffect } from "react";
import { useHistory } from "react-router-dom";
import { FcPlus } from "react-icons/fc";
import { Formik, Field, Form } from 'formik';
import * as Yup from 'yup';
import useModal from "../../hooks/useModal";
import ProjectModal from "./../../components/modal/ProjectModal";
import Button from "./../../components/button/Button";
import IconButton from "./../../components/button/IconButton";
import TextError from "../../components/placeholder/TextError";
import EmptyProjectImage from "./../../assets/nothinghere.jpeg";
import Header from "../../components/placeholder/Header";
import StatusCard from "../../components/card/StatusCard";
import { createProject , allProject , deleteProject } from "./../../services/api/project/index";


export default function Home() {

    const history = useHistory();

    const { toggle , isOpen } = useModal();
    
    const [projectLists , setProjectList] = useState([]);

    const ProjectSchema = Yup.object().shape({
        projectName: Yup.string()
          .min(3, 'Too Short!')
          .max(50, 'Too Long!')
          .required('Required'),
    });

    const apiDeleteProject = async (id) =>{
        try{
            const response = await deleteProject(id);
            const removeProject = projectLists.filter((item)=> {
                return item._id !== response.data._id;
            });
            setProjectList(removeProject);
        }catch(e){
            alert(e.message);
        }
    }

    useEffect(() => {
        const fetch = async () => {
            try{
                const response = await allProject();
                setProjectList(response.data);
            }catch(e){
                alert(e)
            }
        };
        fetch();
    },[]);

    useEffect(() => {},[projectLists]);

    return(
        <div>
        <ProjectModal isOpen={isOpen} toggle={toggle}>
            <h1>Add New Project</h1>
            <Formik
                initialValues={{
                    projectName: '',
                }}
                validationSchema={ProjectSchema}
                onSubmit={async (values) => {
                    const response = await createProject(values);
                    setProjectList([...projectLists,response.data]);
                    toggle();
                }}
                >
                {({ errors, touched }) => (
                    <Form className="space-y-3">
                        <Field className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="project" name="projectName" type="text" placeholder="Project Name"/>
                        {errors.projectName && touched.projectName ? (
                            <TextError error={errors.projectName}/>
                        ) : null}  
                        <Button title={"Create"} type="success"/>
                    </Form>
                )}
            </Formik>
        </ProjectModal>
        <Header title="Cron Monitor"/>
        <div className="mx-10 mt-4">
            <div className="flex flex-row items-center">
                <h1 className="text-lg font-semibold">My projects</h1>
                <IconButton toggle={toggle}>
                    <FcPlus/>
                </IconButton>
            </div>
            { projectLists.length > 0 ? 
                <div>
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4 gap-4 ">
                        {projectLists.map((project) => 
                            <StatusCard 
                                projectName={project.projectName}
                                totalConfiguration={project.configurations?.length}
                                viewProject={()=> 
                                    history.push(`project/${project._id}`)
                                }
                                deleteProject={()=> {
                                    window.confirm("Are you sure you want to delete this project?") &&
                                    apiDeleteProject(project._id)
                                }}
                            />
                        )}  
                    </div>
                </div>    
                :
                <div className="flex items-center justify-center">
                    <img className="contain" src={EmptyProjectImage} alt="Empty project"/>
                </div>
            }      
        </div>
    </div>
    )
}