import axios, { getData } from "../../../utils/axios";

export const createProject = async (data) => {
    return axios.post("/projects/create",data).then(getData)
}

export const allProject = async () => {
    return axios.get("/projects/all").then(getData)
}

export const deleteProject = async (id) => {
    return axios.delete(`/projects/delete/${id}`).then(getData)
}