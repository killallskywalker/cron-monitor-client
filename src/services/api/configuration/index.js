import axios, { getData } from "../../../utils/axios";

export const createConfiguration = async (data) => {
    return axios.post("/configurations/create",data).then(getData)
}

export const allConfiguration = async () => {
    return axios.get("/configurations/all").then(getData)
}

export const showConfiguration = async (id) => {
    return axios.get(`/configurations/show/${id}`).then(getData)
}

export const deleteConfiguration = async (id) => {
    return axios.delete(`/configurations/delete/${id}`).then(getData)
}