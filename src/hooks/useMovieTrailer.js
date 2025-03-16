
import { useEffect } from "react";
import { API_Options } from "../utils/constants";
import { useDispatch } from "react-redux";
import { addTrailerVideo} from "../utils/moviesSlice";


const useMovieTrailer = (movieId) => {
    const dispatch = useDispatch();

    const getMovieVideo = async () => {
        const data = await fetch('https://api.themoviedb.org/3/movie/' + movieId +' /videos', API_Options);
        const jsonData = await data.json();
        const FilteredData = jsonData.results.filter(item => item.type === "Trailer")
        const trailer = FilteredData.length ? FilteredData[0] : jsonData.results[0];
        dispatch(addTrailerVideo(trailer))
    }


    useEffect(() => {
        getMovieVideo();
    },[])
}


export default useMovieTrailer;