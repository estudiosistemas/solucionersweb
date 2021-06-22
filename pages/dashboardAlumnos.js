import React, { useState, useEffect, useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Container } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import firebase, { FirebaseContext } from "../firebase";
import CardCurso from "../components/layout/CardCurso";
import Error403 from "../components/layout/403";
import { useRouter } from "next/router";
import Image from "next/image";

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
  const classes = useStyles();
  const { usuario } = useContext(FirebaseContext);
  const [cursos, setCursos] = useState([]);

  const router = useRouter();

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
    let misCursos = [];
    if (usuario) misCursos = usuario.userProfile.cursos;

    const resultFilter = result.filter((curso) => {
      if (misCursos.includes(curso.id)) {
        return curso;
      } else {
        return null;
      }
    });

    setCursos(resultFilter);
  }

  if (!usuario) {
    return <Error403 />;
  } else
    return (
      <>
        <Image
          src="/static/images/academia.png"
          alt="Soluciones para Todos"
          layout="responsive"
          object-fit="cover"
          width={1600}
          height={311}
        />
        <Container>
          <div className={classes.root}>
            <h2>Mis Cursos</h2>
            <Grid container spacing={3}>
              {cursos.length > 0
                ? cursos.map((curso, idx) => (
                    <Grid key={idx} item xs={12} sm={6} md={4} lg={3}>
                      <CardCurso curso={curso} />
                    </Grid>
                  ))
                : null}
            </Grid>
          </div>
        </Container>
      </>
    );
}
