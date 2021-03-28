import React, { useState, useEffect, useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import firebase, { FirebaseContext } from "../../firebase";
import CardCurso from "./CardCurso";

//funciones
import { userExists } from "../../functions/funciones";

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

const ListadoCursos = () => {
  const classes = useStyles();
  const { usuario } = useContext(FirebaseContext);
  const [cursos, setCursos] = useState([]);

  useEffect(() => {
    const obtenerCursos = () => {
      firebase.db
        .collection("cursos")
        .orderBy("creado", "asc")
        .onSnapshot(manejarSnapshotCursos);
    };

    obtenerCursos();
  }, [usuario]);

  function manejarSnapshotCursos(snapshot) {
    const result = snapshot.docs.map((doc) => {
      return {
        id: doc.id,
        ...doc.data(),
      };
    });
    const resultFilter = result.filter((curso, idx) => {
      console.log(curso);
      return userExists(usuario.uid, curso.instructores);
    });
    setCursos(resultFilter);
  }

  return (
    <>
      <Grid container spacing={3}>
        {cursos.length > 0
          ? cursos.map((curso, idx) => (
              <Grid key={idx} item xs={12} sm={6} md={4} lg={3}>
                <CardCurso curso={curso} />
              </Grid>
            ))
          : null}
      </Grid>
    </>
  );
};

export default ListadoCursos;
