const VideoTitle  = (props) => {
    const {title , overview } = props;
    return (
    <div className="w-screen aspect-video pt-[25%] px-24 absolute text-white backbround-gradient-to-r from-black">
        <h1 className="text-4xl font-bold w-1/4 ">{title}</h1>
        <p className="py-6 text-lg w-1/4 ">{overview}</p>
        <div className="pt-6">
            <button className="bg-white text-black p-4 px-10  w-15 text-xl rounded-lg hover:bg-opacity-80">
                Play
            </button>

            <button className="mx-2 bg-gray-500 text-white p-4 px-10  w-13 text-xl bg-opacity-50 rounded-lg">More Info</button>
        </div>
    </div>
    )

}

export default VideoTitle;