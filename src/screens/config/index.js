import React from "react";
import { Formik, Field, Form } from 'formik';
import useModal from "../../hooks/useModal";
import ProjectModal from "./../../components/modal/ProjectModal";
import JobTable from "./../../components/table/JobTable";
import Button from "../../components/button/Button";

export default function Config() {

    const { toggle , isOpen } = useModal();

    return(
        <>
            <ProjectModal isOpen={isOpen} toggle={toggle}>
                <h1>Add New Configuration For Project</h1>
                <Formik
                    initialValues={{
                        project: '',
                    }}
                    onSubmit={async (values) => {
                        console.log(values);
                    }}
                    >
                    <Form className="space-y-3">
                        <Field className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="project" name="job" type="text" placeholder="Job Name"/>
                        <Field className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="project" name="frequency" type="text" placeholder="Frequency"/>
                        <Field className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="project" name="notification" type="text" placeholder="Email"/>
                        <p className="text-xs text-red-700">Only support for email notification at the moment</p>
                        <Button title={"Create"} type={"success"}/>
                    </Form>
                </Formik>
            </ProjectModal>
            <div className="border-b-2 border-gray-300">
                <header>
                    <h1 className="text-4xl py-2 mx-10">Endpoint Configuration</h1>
                </header>
            </div>
            <div>
                <div className="mx-10 mt-4 space-y-2">
                    <Button title={"Add Check"} onClick={toggle} type="success"/>
                    <JobTable/>
                </div>
            </div>
        </>
    )
}