import React, { useEffect, useState, useContext } from "react";
import { useRouter } from "next/router";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import { FirebaseContext } from "../../firebase";
import { makeStyles } from "@material-ui/core/styles";

import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import ReactPlayer from "react-player";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    marginTop: 20,
  },
  paper: {
    padding: theme.spacing(1),
    textAlign: "flex-start",
    textJustify: "flex-start",
    color: theme.palette.text.secondary,
  },
  player: {
    background: "rgba(0, 0, 0, 0.1)",
  },
}));

const iniciarCurso = () => {
  const [curso, setCurso] = useState({});
  const [contenido, setContenido] = useState([]);
  const [errorBuscar, setErrorBuscar] = useState(false);
  const [playVideo, setPlayVideo] = useState({
    url: null,
    pip: false,
    playing: true,
    controls: true,
    light: false,
    volume: 0.8,
    muted: false,
    played: 0,
    loaded: 0,
    duration: 0,
    playbackRate: 1.0,
    loop: false,
  });

  const {
    url,
    playing,
    controls,
    light,
    volume,
    muted,
    loop,
    played,
    loaded,
    duration,
    playbackRate,
    pip,
  } = playVideo;

  const router = useRouter();
  const classes = useStyles();
  const {
    query: { id },
  } = router;

  //context con operaciones crud de firebase
  const { usuario, firebase } = useContext(FirebaseContext);
  //const classes = useStyles();

  const handlePlayVideo = (url) => {
    setPlayVideo({
      ...playVideo,
      url,
      played: 0,
      loaded: 0,
      pip: false,
    });
  };

  const handlePlay = () => {
    console.log("onPlay");
    setPlayVideo({
      ...playVideo,
      playing: true,
    });
  };

  useEffect(() => {
    if (id) {
      const obtenerCurso = async () => {
        const cursoQuery = await firebase.db.collection("cursos").doc(id);
        const datos = await cursoQuery.get();
        if (datos.exists) {
          setCurso(datos.data());
          setContenido(datos.data().contenido);
        } else {
          setErrorBuscar(true);
        }
      };

      obtenerCurso();
    }
  }, [id]);

  return (
    <div className={classes.root}>
      <h2>{curso.nombre}</h2>
      <Grid container direction="row" spacing={2}>
        <Grid item xs={12} sm={12} md={4}>
          <Paper className={classes.paper}>
            <List>
              {contenido.length > 0
                ? contenido.map((video, idx) => (
                    <ListItem
                      key={idx}
                      role={undefined}
                      dense
                      button
                      onClick={() => handlePlayVideo(video.url)}
                    >
                      <ListItemText primary={video.titulo} />
                      <ListItemText primary={video.duracion} />
                    </ListItem>
                  ))
                : null}
            </List>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={12} md={8}>
          <ReactPlayer
            className={classes.player}
            width="100%"
            //height="100%"
            url={url}
            pip={pip}
            playing={playing}
            controls={controls}
            light={light}
            loop={loop}
            playbackRate={playbackRate}
            volume={volume}
            muted={muted}
            onReady={() => console.log("onReady")}
            onStart={() => console.log("onStart")}
            onPlay={handlePlay}
            //onEnablePIP={handleEnablePIP}
            //onDisablePIP={handleDisablePIP}
            // onPause={handlePause}
            onBuffer={() => console.log("onBuffer")}
            onSeek={(e) => console.log("onSeek", e)}
            // onEnded={handleEnded}
            onError={(e) => console.log("onError", e)}
            // onProgress={handleProgress}
            // onDuration={handleDuration}
          />
        </Grid>
      </Grid>
    </div>
  );
};

export default iniciarCurso;
