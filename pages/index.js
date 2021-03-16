import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import firebase from "../firebase";
import CardCurso from "../components/layout/CardCurso";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    marginTop: 20,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
}));

export default function Home() {
  const [cursos, setCursos] = useState([]);
  const classes = useStyles();

  useEffect(() => {
    const obtenerCursos = () => {
      firebase.db
        .collection("cursos")
        .orderBy("creado", "asc")
        .onSnapshot(manejarSnapshotCursos);
    };

    obtenerCursos();
  }, []);

  function manejarSnapshotCursos(snapshot) {
    const result = snapshot.docs.map((doc) => {
      return {
        id: doc.id,
        ...doc.data(),
      };
    });
    setCursos(result);
    //if (result.length == 0) setMensajeAlarma("No hay Alarmas configuradas.");
  }

  return (
    <div className={classes.root}>
      <h2>Cursos</h2>
      <Grid container spacing={3}>
        {cursos.length > 0
          ? cursos.map((curso) => (
              <Grid key={curso.id} item xs={12} sm={6} md={4} lg={3}>
                <CardCurso curso={curso} />
              </Grid>
            ))
          : null}
      </Grid>
    </div>
  );
}
