import React, { useEffect, useState, useContext } from "react";
import { useRouter } from "next/router";
import Grid from "@material-ui/core/Grid";
import { FirebaseContext } from "../firebase";
import { makeStyles, useTheme, Paper } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import Alert from "@material-ui/lab/Alert";
import DeleteIcon from "@material-ui/icons/Delete";
import AddIcon from "@material-ui/icons/Add";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";

// validaciones
import useValidacion from "../hooks/useValidacion";
import validarCrearCurso from "../validacion/validarCrearCurso";

//hooks
import useInstructor from "../hooks/useInstructor";
import useCategorias from "../hooks/useCategorias";

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

const STATE_INICIAL = {
  categorias: [],
  contenido: [],
  descripcion: "",
  instructores: [],
  nombre: "",
  requisitos: [],
  temario: [],
  urlportada: "",
};

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const crearCurso = () => {
  const [tmpTemario, setTmpTemario] = useState([]);
  const [tmpRequisitos, setTmpRequisitos] = useState([]);
  const [tmpContenido, setTmpContenido] = useState([]);
  const [error, setError] = useState(false);
  const [imagenUpload, setImagenUpload] = useState(null);

  const [tmpValues, setTmpValues] = useState({
    temario: "",
    requisito: "",
    duracion: "",
    titulo: "",
    url: "",
    categoria: "",
  });

  const router = useRouter();
  const classes = useStyles();
  const theme = useTheme();

  const {
    valores,
    errores,
    submitForm,
    handleChange,
    handleSubmit,
    handleBlur,
    setValores,
  } = useValidacion(STATE_INICIAL, validarCrearCurso, addCurso);

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
  const [instruc, SelectInstructor, setInstruc] = useInstructor([]);
  const [categ, SelectCategorias, setCateg] = useCategorias([]);

  const handleChangeTemp = (prop) => (event) => {
    setTmpValues({ ...tmpValues, [prop]: event.target.value });
  };

  const handleDeleteTmp = (valor, tmp, setTmp) => {
    var filtered = tmp.filter((value, index, arr) => {
      return value != valor;
    });
    console.log(filtered);
    setTmp(filtered);
  };

  const handleAddTemario = () => {
    if (tmpValues.temario) {
      setTmpTemario([...tmpTemario, tmpValues.temario]);
      setTmpValues({ ...tmpValues, temario: "" });
    }
  };

  const handleAddRequisitos = () => {
    if (tmpValues.requisito) {
      setTmpRequisitos([...tmpRequisitos, tmpValues.requisito]);
      setTmpValues({ ...tmpValues, requisito: "" });
    }
  };

  const handleAddContenido = () => {
    if (tmpValues.duracion && tmpValues.titulo && tmpValues.url) {
      setTmpContenido([
        ...tmpContenido,
        {
          duracion: tmpValues.duracion,
          titulo: tmpValues.titulo,
          url: tmpValues.url,
        },
      ]);
      setTmpValues({
        ...tmpValues,
        duracion: "",
        titulo: "",
        url: "",
      });
    }
  };

  async function addCurso() {
    // Controlo que haya usuario logueado
    if (!usuario) {
      return router.push("/login");
    }

    //si borre los instructores los dejo con los originales
    if (instruc.length == 0) {
      setInstruc(instructores);
      return;
    }

    let fileUrl = urlportada;
    //Grabo imagen
    if (imagenUpload) {
      fileUrl = await firebase.uploadFile(imagenUpload);
    }

    // creo el obj curso
    const cursoUpdated = {
      categorias: categ,
      contenido: tmpContenido,
      descripcion,
      instructores: instruc,
      nombre,
      requisitos: tmpRequisitos,
      temario: tmpTemario,
      urlportada: fileUrl,
      creado: Date.now(),
    };

    // inserto en DB
    firebase.db.collection("cursos").add(cursoUpdated);
    router.push("/dashboardInstructores");
  }

  const onFileChange = (e) => {
    const file = e.target.files[0];
    setImagenUpload(file);
  };

  useEffect(() => {
    if (usuario) {
      const instructorIni = [
        {
          nombre: usuario.userProfile.nombre,
          usuario: usuario.uid,
        },
      ];
      setInstruc(instructorIni);
      setValores({
        ...valores,
        instructores: instructorIni,
      });
    }
  }, [usuario]);

  return (
    <Paper className={classes.paper}>
      <h2>Nuevo Curso</h2>
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
              id="tmp_temario"
              name="tmp_temario"
              value={tmpValues.temario}
              onChange={handleChangeTemp("temario")}
              onBlur={handleBlur}
              variant="outlined"
              size="small"
              fullWidth
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      edge="end"
                      aria-label="addTemario"
                      onClick={handleAddTemario}
                    >
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
              id="tmp_requisitos"
              name="tmp_requisitos"
              value={tmpValues.requisito}
              onChange={handleChangeTemp("requisito")}
              onBlur={handleBlur}
              variant="outlined"
              size="small"
              fullWidth
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      edge="end"
                      aria-label="addRequisito"
                      onClick={handleAddRequisitos}
                    >
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
                {tmpTemario.length > 0
                  ? tmpTemario.map((tema, idx) => (
                      <ListItem key={idx}>
                        <ListItemText primary={tema} />
                        <ListItemSecondaryAction>
                          <IconButton edge="end" aria-label="delete">
                            <DeleteIcon
                              fontSize="small"
                              color="action"
                              onClick={() =>
                                handleDeleteTmp(tema, tmpTemario, setTmpTemario)
                              }
                            />
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
                {tmpRequisitos.length > 0
                  ? tmpRequisitos.map((requisito, idx) => (
                      <ListItem key={idx}>
                        <ListItemText primary={requisito} />
                        <ListItemSecondaryAction>
                          <IconButton
                            edge="end"
                            aria-label="delete"
                            onClick={() =>
                              handleDeleteTmp(
                                requisito,
                                tmpRequisitos,
                                setTmpRequisitos
                              )
                            }
                          >
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
              id="tmp_duracion"
              name="tmp_duracion"
              value={tmpValues.duracion}
              onChange={handleChangeTemp("duracion")}
              onBlur={handleBlur}
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
              id="tmp_titulo"
              name="tmp_titulo"
              value={tmpValues.titulo}
              onChange={handleChangeTemp("titulo")}
              onBlur={handleBlur}
              variant="outlined"
              size="small"
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={5}>
            <TextField
              label="URL"
              id="tmp_url"
              name="tmp_url"
              value={tmpValues.url}
              onChange={handleChangeTemp("url")}
              onBlur={handleBlur}
              helperText={errores.url}
              variant="outlined"
              size="small"
              fullWidth
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      edge="end"
                      aria-label="addContenido"
                      onClick={handleAddContenido}
                    >
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
                {tmpContenido.length > 0
                  ? tmpContenido.map((cont, idx) => (
                      <ListItem key={idx}>
                        <ListItemText
                          primary={`${cont.titulo} - ${cont.duracion}`}
                          secondary={cont.url}
                        />
                        <ListItemSecondaryAction>
                          <IconButton
                            edge="end"
                            aria-label="delete"
                            onClick={() =>
                              handleDeleteTmp(
                                cont,
                                tmpContenido,
                                setTmpContenido
                              )
                            }
                          >
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
            <SelectCategorias />
          </Grid>
          <Grid item xs={12} sm={6}>
            <SelectInstructor />
          </Grid>
          <Grid item xs={12}>
            <TextField
              //label="Imagen"
              error={errores.url && true}
              id="url"
              name="url"
              //value={urlportada}
              onChange={onFileChange}
              //onBlur={handleBlur}
              helperText={errores.url}
              variant="outlined"
              //size="small"
              type="file"
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
              Guardar Cambios
            </Button>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Button
              onClick={() => router.push("/dashboardInstructores")}
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

export default crearCurso;
