import React, { useState, useContext, useEffect } from "react";
import { useRouter } from "next/router";

import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Alert from "@material-ui/lab/Alert";
import { makeStyles, Paper } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";

import { FirebaseContext } from "../firebase";

// validaciones
import useValidacion from "../hooks/useValidacion";
import validarCrearInstructor from "../validacion/validarCrearInstructor";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginLeft: "auto",
    marginRight: "auto",
    marginTop: theme.spacing(8),
    marginBottom: theme.spacing(8),
    padding: theme.spacing(3),
    maxWidth: 600,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    align: "auto",
  },
}));

const STATE_INICIAL = {
  nombre: "",
  telegram: "",
};

const nuevoInstructor = () => {
  const [error, setError] = useState(false);
  const classes = useStyles();

  const {
    valores,
    errores,
    submitForm,
    handleChange,
    handleSubmit,
    handleBlur,
    setValores,
  } = useValidacion(STATE_INICIAL, validarCrearInstructor, crearInstructor);

  const { nombre, telegram } = valores;

  const router = useRouter();

  //context con operaciones crud de firebase
  const { usuario, firebase } = useContext(FirebaseContext);

  async function crearInstructor() {
    // Controlo que haya usuario logueado
    if (!usuario) {
      return router.push("/login");
    }

    // creo el obj instructor
    const instructor = {
      usuario: usuario.uid,
      nombre,
      telegram,
      creado: Date.now(),
    };

    // inserto en DB
    firebase.db.collection("instructores").add(instructor);
    router.push("/dashboardinstructor");
  }

  return (
    <Paper className={classes.paper}>
      <h2>Crear Instructor</h2>
      <form noValidate>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={8}>
            <TextField
              label="Nombre"
              error={errores.nombre && true}
              id="nombre"
              name="nombre"
              value={nombre}
              onChange={handleChange}
              onBlur={handleBlur}
              helperText={errores.nombre}
              variant="outlined"
              size="small"
              fullWidth
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              label="Telegram"
              error={errores.telegram && true}
              id="telegram"
              name="telegram"
              value={telegram}
              onChange={handleChange}
              onBlur={handleBlur}
              helperText={errores.telegram}
              variant="outlined"
              size="small"
              type="number"
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            {error && (
              <Alert variant="filled" severity="error">
                {error}
              </Alert>
            )}
          </Grid>
          <Grid item xs={12} sm={6}>
            <Button
              onClick={handleSubmit}
              variant="contained"
              color="primary"
              style={{ width: "100%" }}
            >
              Guardar
            </Button>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Button
              onClick={() => router.push("/")}
              variant="contained"
              color="secondary"
              style={{ width: "100%" }}
            >
              Cancelar
            </Button>
          </Grid>
        </Grid>
      </form>
    </Paper>
  );
};

export default nuevoInstructor;
