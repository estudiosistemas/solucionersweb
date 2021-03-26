import React, { useEffect, useState, useContext } from "react";
import { useRouter } from "next/router";
import Grid from "@material-ui/core/Grid";
import { FirebaseContext } from "../../firebase";
import { makeStyles, Paper } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import InputAdornment from "@material-ui/core/InputAdornment";
import InputLabel from "@material-ui/core/InputLabel";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import Alert from "@material-ui/lab/Alert";
import DeleteIcon from "@material-ui/icons/Delete";
import AddIcon from "@material-ui/icons/Add";
import EditIcon from "@material-ui/icons/Edit";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";

// validaciones
import useValidacion from "../../hooks/useValidacion";
import validarCrearCurso from "../../validacion/validarCrearCurso";

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
}));

const STATE_INICIAL = {
  categorias: [],
  contenido: [{}],
  descripcion: "",
  instructores: [],
  nombre: "",
  requisitos: [],
  temario: [],
  urlportada: "",
};

function generate(element) {
  return [0, 1, 2].map((value) =>
    React.cloneElement(element, {
      key: value,
    })
  );
}

const administrarCurso = () => {
  const [curso, setCurso] = useState({});
  //const [contenido, setContenido] = useState([]);
  const [errorBuscar, setErrorBuscar] = useState(false);
  const [error, setError] = useState(false);

  const router = useRouter();
  const classes = useStyles();
  const {
    query: { id },
  } = router;

  const {
    valores,
    errores,
    submitForm,
    handleChange,
    handleSubmit,
    handleBlur,
    setValores,
  } = useValidacion(STATE_INICIAL, validarCrearCurso, editarCurso);

  const {
    categorias,
    contenido,
    descripcion,
    instructores,
    nombre,
    requisitos,
    temario,
    urlportada,
  } = valores;

  const { usuario, firebase } = useContext(FirebaseContext);

  async function editarCurso() {
    // Controlo que haya usuario logueado
    if (!usuario) {
      return router.push("/login");
    }

    // creo el obj curso
    const cursoUpdated = {
      categorias,
      contenido,
      descripcion,
      instructores,
      nombre,
      requisitos,
      temario,
      urlportada,
    };

    // inserto en DB
    firebase.db.collection("cursos").doc(id).update(cursoUpdated);
    router.push("/dashboardInstructor");
  }

  useEffect(() => {
    if (id) {
      const obtenerCurso = async () => {
        const cursoQuery = await firebase.db.collection("cursos").doc(id);
        const datos = await cursoQuery.get();
        if (datos.exists) {
          setCurso(datos.data());
          //setContenido(datos.data().contenido);
          setValores({
            categorias: datos.data().categorias,
            contenido: datos.data().contenido,
            descripcion: datos.data().descripcion,
            instructores: datos.data().instructores,
            nombre: datos.data().nombre,
            requisitos: datos.data().requisitos,
            temario: datos.data().temario,
            urlportada: datos.data().urlportada,
          });
        } else {
          setErrorBuscar(true);
        }
      };

      obtenerCurso();
    }
  }, [id]);

  return (
    <Paper className={classes.paper}>
      <h2>Modificar Curso</h2>
      <form noValidate>
        <Grid container spacing={3}>
          <Grid item xs={12}>
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
          <Grid item xs={12}>
            <TextField
              label="Descripción"
              error={errores.descripcion && true}
              id="descripcion"
              name="descripcion"
              value={descripcion}
              onChange={handleChange}
              onBlur={handleBlur}
              helperText={errores.descripcion}
              variant="outlined"
              size="small"
              multiline
              rows={4}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Temario"
              error={errores.temario && true}
              id="temario"
              name="temario"
              //value={cantidad}
              onChange={handleChange}
              onBlur={handleBlur}
              helperText={errores.temario}
              variant="outlined"
              size="small"
              fullWidth
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton edge="end" aria-label="addTemario">
                      <AddIcon fontSize="small" />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Requisitos"
              error={errores.requisitos && true}
              id="requisitos"
              name="requisitos"
              //value={requisitos}
              onChange={handleChange}
              onBlur={handleBlur}
              helperText={errores.requisitos ? errores.requisitos : ""}
              variant="outlined"
              size="small"
              fullWidth
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton edge="end" aria-label="addRequisito">
                      <AddIcon fontSize="small" />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <div className={classes.demo}>
              <List dense>
                {temario.length > 0
                  ? temario.map((tema, idx) => (
                      <ListItem key={idx}>
                        {/* <ListItemAvatar>
                      <Avatar>
                        <FolderIcon />
                      </Avatar>
                    </ListItemAvatar> */}
                        <ListItemText
                          primary={tema}
                          // secondary={secondary ? "Secondary text" : null}
                        />
                        <ListItemSecondaryAction>
                          <IconButton edge="end" aria-label="delete">
                            <DeleteIcon fontSize="small" color="action" />
                          </IconButton>
                        </ListItemSecondaryAction>
                      </ListItem>
                    ))
                  : null}
              </List>
            </div>
          </Grid>
          <Grid item xs={12} sm={6}>
            <div className={classes.demo}>
              <List dense>
                {requisitos.length > 0
                  ? requisitos.map((requisito, idx) => (
                      <ListItem key={idx}>
                        {/* <ListItemAvatar>
                      <Avatar>
                        <FolderIcon />
                      </Avatar>
                    </ListItemAvatar> */}
                        <ListItemText
                          primary={requisito}
                          // secondary={secondary ? "Secondary text" : null}
                        />
                        <ListItemSecondaryAction>
                          <IconButton edge="end" aria-label="delete">
                            <DeleteIcon fontSize="small" color="action" />
                          </IconButton>
                        </ListItemSecondaryAction>
                      </ListItem>
                    ))
                  : null}
              </List>
            </div>
          </Grid>
          <Grid item xs={12} sm={2}>
            <TextField
              //label="Duración"
              error={errores.duracion && true}
              id="duracion"
              name="duracion"
              //value={cantidad}
              onChange={handleChange}
              onBlur={handleBlur}
              helperText={errores.duracion}
              variant="outlined"
              size="small"
              type="time"
              inputProps={{
                step: 2,
              }}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={5}>
            <TextField
              label="Título"
              error={errores.titulo && true}
              id="titulo"
              name="titulo"
              //value={cantidad}
              onChange={handleChange}
              onBlur={handleBlur}
              helperText={errores.titulo}
              variant="outlined"
              size="small"
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={5}>
            <TextField
              label="URL"
              error={errores.url && true}
              id="url"
              name="url"
              //value={cantidad}
              onChange={handleChange}
              onBlur={handleBlur}
              helperText={errores.url}
              variant="outlined"
              size="small"
              fullWidth
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton edge="end" aria-label="addContenido">
                      <AddIcon fontSize="small" />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <div className={classes.demo}>
              <List dense>
                {contenido.length > 0
                  ? contenido.map((cont, idx) => (
                      <ListItem key={idx}>
                        {/* <ListItemAvatar>
                      <Avatar>
                        <FolderIcon />
                      </Avatar>
                    </ListItemAvatar> */}
                        <ListItemText
                          primary={`${cont.titulo} - ${cont.duracion}`}
                          secondary={cont.url}
                        />
                        <ListItemSecondaryAction>
                          <IconButton edge="end" aria-label="delete">
                            <DeleteIcon fontSize="small" color="action" />
                          </IconButton>
                        </ListItemSecondaryAction>
                      </ListItem>
                    ))
                  : null}
              </List>
            </div>
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
              Guardar Cambios
            </Button>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Button
              onClick={() => router.push("/billetera")}
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

export default administrarCurso;
