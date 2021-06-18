import React, { useContext, useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { useRouter } from "next/router";

import { FirebaseContext } from "../../firebase";

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
  },
});

export default function CardCurso({ curso }) {
  const classes = useStyles();
  const { usuario } = useContext(FirebaseContext);
  const router = useRouter();

  const handleIniciarCurso = (id) => {
    router.push("/iniciar-curso[id]", `/iniciar-curso/${id}`);
  };

  const handleAdministrarCurso = (id) => {
    router.push("/administrar-curso[id]", `/administrar-curso/${id}`);
  };

  const handleAsignarCurso = (id) => {
    //router.push(`/asignar-curso/${id}`);
    router.push({
      pathname: "/asignar-curso/[pid]",
      query: { pid: id, titulo: curso.nombre },
    });
  };

  return (
    <Card className={classes.root}>
      <CardActionArea>
        <CardMedia
          component="img"
          alt={curso.nombre}
          height="140"
          image={curso.urlportada}
          title={curso.nombre}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {curso.nombre}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {curso.descripcion.length > 300
              ? curso.descripcion.substr(0, 300) + "..."
              : curso.descripcion}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <>
          <Button
            onClick={() => handleAdministrarCurso(curso.id)}
            size="small"
            color="secondary"
          >
            Administrar
          </Button>
          <Button
            onClick={() => handleAsignarCurso(curso.id)}
            size="small"
            color="secondary"
          >
            Alumnos
          </Button>

          <Button
            onClick={() => handleIniciarCurso(curso.id)}
            size="small"
            color="primary"
          >
            Iniciar
          </Button>
        </>
      </CardActions>
    </Card>
  );
}
