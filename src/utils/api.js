import axios from "axios";

const BASE_URL = "https://api.themoviedb.org/3";
const TMDB_TOKEN = "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmMzZhNThlNWRjM2MwMGYyMzI4OGIwZTZmOWI0MDhmNiIsInN1YiI6IjY0NGY5MTM5YmRkNTY4MTJkZWNiZTEyMyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.bB79r1pnwX34I3ZYo2GnlEM3XdhzDyOYQUsKHuMdsDg";

const headers = {
    Authorization : "bearer " + TMDB_TOKEN ,
};

export const fetchDataFromApi = async(url , params)=>{
    try{
        const {data} = await axios.get(BASE_URL + url, {
            headers,
            params
        })
        return data;

    }catch(err){
        console.log(err);
        return err;
    }
}