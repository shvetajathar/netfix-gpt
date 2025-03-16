import { useSelector } from "react-redux";
import VideoBackground from "./VideoBackground";
import VideoTitle from "./videoTitle";

const MainContainer  = () => {
    const movies = useSelector(store => store.movies?.addNowPlayingMovies);
    if(!movies) return;
    const mainMovie = movies[0]
    const {original_title, overview , id } = mainMovie ;



    return (
    <div>
         <VideoTitle title={original_title} overview={overview} />
        <VideoBackground id={id} />
    </div>
    )

}

export default MainContainer;