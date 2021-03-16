import ReactPlayer from "react-player";

const Reproductor = (url) => {
  if (url != "") {
    console.log(url);
    return <ReactPlayer url={url} controls />;
  } else return null;
};

export default Reproductor;
