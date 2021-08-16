import React , { useState , useEffect } from "react";
import { useParams } from "react-router-dom";
import { Formik, Field, Form } from 'formik';
import * as Yup from 'yup';
import useModal from "../../hooks/useModal";
import ProjectModal from "./../../components/modal/ProjectModal";
import JobTable from "./../../components/table/JobTable";
import Button from "../../components/button/Button";
import TextError from "../../components/placeholder/TextError";
import { createConfiguration ,  deleteConfiguration , showConfiguration } from "../../services/api/configuration";
import EmptyConfigurationImage from "./../../assets/nothingconfiguration.jpeg";
import Header from "../../components/placeholder/Header";

export default function Project() {

    const { toggle , isOpen } = useModal();

    const { id } = useParams();

    const [ configurations , setConfigurations ] = useState([]);

    const ConfigurationSchema = Yup.object().shape({
        jobName: Yup.string()
          .min(4, 'Too Short!')
          .max(50, 'Too Long!')
          .required('Required'),
        email: Yup.string().email('Invalid email').required('Required'),
    });

    const apiDeleteConfiguration = async (id) =>{
        try{
            const response = await deleteConfiguration(id);
            const removeConfiguration = configurations.filter((item)=> {
                return item._id !== response.data._id;
            });
            setConfigurations(removeConfiguration);
        }catch(e){
            alert(e.message);
        }
    }

    useEffect(() => {
        const fetch = async () => {
            try{
                const response = await showConfiguration(id);
                setConfigurations(response.data);
            }catch(e){
                alert(e)
            }
        };
        fetch();
    },[id]);

    const handleClick = (id) =>{
       apiDeleteConfiguration(id)
    };

    return(
        <>
            <ProjectModal isOpen={isOpen} toggle={toggle}>
                <h1>Add New Configuration For Project</h1>
                <Formik
                    initialValues={{
                        projectId:id,
                        jobName:"",
                        frequency:"Daily", // for now we only support for daily cron 
                        email:""
                    }}
                    validationSchema={ConfigurationSchema}
                    onSubmit={async (values) => {
                        const response = await createConfiguration(values);
                        setConfigurations([...configurations,response.data]);
                        toggle();
                    }}
                    >
                    {({ errors, touched }) => (
                        <Form className="space-y-3">
                            <Field className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="jobName" name="jobName" type="text" placeholder="Job Name"/>
                            {errors.jobName && touched.jobName ? (
                                <TextError error={errors.jobName}/>
                            ) : null}                            
                            <Field className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="email" name="email" type="text" placeholder="Email"/>
                            {errors.email && touched.email ? (
                                <TextError error={errors.email}/>
                            ) : null}      
                            <p className="text-xs text-red-700">Only support for email notification at the moment and daily job check</p>
                            <Button title={"Create"} type="success"/>
                        </Form>
                    )}
                </Formik>
            </ProjectModal>
            <Header title="Endpoint Configuration"/>
            <div>
                <div className="mx-10 mt-4 space-y-4">
                <p>To track your cron health , please activate the url by visiting the url , we will track based on first active time for your cron schedule . </p>

                    <Button title={"Add Configuration"} onClick={toggle} type="success"/>                    
                    { configurations.length > 0 ? 
                        <JobTable data={configurations} onClick={handleClick}/>
                        :
                        <div className="flex items-center justify-center">
                            <img className="contain" src={EmptyConfigurationImage} alt="Empty configuration"/>
                        </div>
                    }    
                </div>
            </div>
        </>
    )
}