import {axiosGet} from "@/utils/rest-access";

const movieIds = [
    'tt0332280',
    'tt0120338',
    'tt0418279',
    'tt0241527',
    'tt0120762',
    'tt3040964',
    'tt0120737',
    'tt0167261',
    'tt0167260',
]
export async function getMovies() {
    const promises = []
    movieIds.forEach(id => {
        promises.push(getMovie(id))
    })
    return Promise.all(promises)
}

export async function getMovie(imdbId) {
    const idEndpoint = '&i=' + imdbId;
    return axiosGet(idEndpoint);
}

export async function getMovieFull(imdbId) {
    const idEndpoint = '&i=' + imdbId + '&plot=full';
    return axiosGet(idEndpoint);
}

