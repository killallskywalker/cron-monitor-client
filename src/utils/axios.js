import axios from "axios"

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://127.0.0.1:4000/api/'

const request = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Accept": "application/json",
    "Content-Type": "application/json",
  },
})

request.interceptors.request.use(
  async (config) => {
    // in future if there any add on header we can add it over here
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

request.interceptors.response.use(
  (response) => {
    // can add additional operation / handling busiess logic based on response
    return response
  },

  (error) => {

    if (error.response) {
      const { status } = error.response

      if (status === 500) {
        console.log('Server Error')
      }

      return Promise.reject(error.response)
    }
  }
)

export function getData(response) {
  return response.data
}

export default request