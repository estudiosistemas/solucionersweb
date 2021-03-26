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
import { CollectionsOutlined } from "@material-ui/icons";

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
  },
});

export default function CardCurso({ curso }) {
  const classes = useStyles();
  const { usuario } = useContext(FirebaseContext);
  const [cursos, setCursos] = useState([]);
  const router = useRouter();

  const handleIniciarCurso = (id) => {
    router.push("/iniciar-curso[id]", `/iniciar-curso/${id}`);
  };

  const handleAdministrarCurso = (id) => {
    router.push("/administrar-curso[id]", `/administrar-curso/${id}`);
  };

  useEffect(() => {
    if (usuario) {
      setCursos(usuario.userProfile.cursos);
    }
  }, [usuario]);

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
            {curso.descripcion}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        {usuario ? (
          cursos.includes(curso.id) ? (
            usuario.userProfile.isInstructor ? (
              <Button
                onClick={() => handleAdministrarCurso(curso.id)}
                size="small"
                color="secondary"
              >
                Administrar
              </Button>
            ) : (
              <Button
                onClick={() => handleIniciarCurso(curso.id)}
                size="small"
                color="secondary"
              >
                Iniciar
              </Button>
            )
          ) : (
            <Button size="small" color="primary">
              Inscribirse
            </Button>
          )
        ) : null}
        <Button size="small" color="primary">
          Ver Más
        </Button>
      </CardActions>
    </Card>
  );
}
