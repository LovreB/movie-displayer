import axios from "axios";
const baseUrl = "https://www.omdbapi.com/?apikey=" + process.env.VUE_APP_OMDB_TOKEN;

export async function axiosGet(urlEndpoint) {
    const url =  baseUrl + urlEndpoint
    return axios.get(url)
        .then(response => {
            return response.data
        })
        .catch(e => {
            console.log(e)
        })
}