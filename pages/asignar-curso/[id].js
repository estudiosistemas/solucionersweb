import React, { useEffect, useState, useContext } from "react";
import { useRouter } from "next/router";
import { FirebaseContext } from "../../firebase";
import { makeStyles, useTheme, Paper, Container } from "@material-ui/core";
import ListadoAlumnos from "../../components/adminpanel/ListadoAlumnos";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginLeft: "auto",
    marginRight: "auto",
    marginTop: theme.spacing(8),
    marginBottom: theme.spacing(8),
    padding: theme.spacing(3),
    maxWidth: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    align: "auto",
  },
  chips: {
    display: "flex",
    flexWrap: "wrap",
  },
  chip: {
    margin: 2,
  },
  noLabel: {
    marginTop: theme.spacing(3),
  },
}));

const asignarCurso = () => {
  const router = useRouter();
  const classes = useStyles();
  const theme = useTheme();

  const {
    query: { id, titulo },
  } = router;

  return (
    <Container>
      <Paper className={classes.paper}>
        <h2>Inscripcion de Alumnos</h2>
        <h3>{titulo}</h3>
        <ListadoAlumnos idCurso={id} />
      </Paper>
    </Container>
  );
};

export default asignarCurso;
