import React, { useEffect, useContext, useState } from "react";
import { Paper, TableCell } from "@material-ui/core";
import CustomFooter from "../CustomFooter";
import MUIDataTable from "mui-datatables";
import useStyles from "../../src/styles";
import textLabelsSpanish from "../tableLabelsLocation";
import firebase, { FirebaseContext } from "../../firebase";
import Button from "@material-ui/core/Button";
import TableRow from "@material-ui/core/TableRow";
import { Checkbox } from "@material-ui/core";
import { FormControlLabel } from "@material-ui/core";
import { Switch } from "@material-ui/core";
import { ColorLensOutlined } from "@material-ui/icons";

export default function ListadoAlumnos({ idCurso }) {
  const [listado, setListado] = useState([]);
  const { usuario } = useContext(FirebaseContext);
  //const [tmpCursos, setTmpCursos] = useState([]);

  const toggleCursos = (index, valor) => {
    const arrCursos = listado[index].cursos;
    const tmpArray = listado;
    let tmpCursos = [];
    if (!valor) {
      tmpCursos = [...arrCursos, idCurso];
    } else {
      tmpCursos = arrCursos.filter((value, index, arr) => {
        return value != idCurso;
      });
    }
    tmpArray[index].cursos = tmpCursos;
    setListado(tmpArray);
    editarCursoAlumno(listado[index].id, tmpCursos);
  };

  async function editarCursoAlumno(idAlumno, cursosAlumno) {
    // Controlo que haya usuario logueado
    if (!usuario) {
      return router.push("/login");
    }

    // inserto en DB
    firebase.db
      .collection("usuarios")
      .doc(idAlumno)
      .update({ cursos: cursosAlumno });
  }

  const checkCurso = (cursos) => {
    return cursos.some(function (el) {
      return el === idCurso;
    });
  };

  useEffect(() => {
    const obtenerAlumnos = () => {
      firebase.db
        .collection("usuarios")
        //.orderBy("creado", "asc")
        .onSnapshot(manejarSnapshotAlumnos);
    };

    obtenerAlumnos();
  }, [usuario]);

  function manejarSnapshotAlumnos(snapshot) {
    const result = snapshot.docs.map((doc) => {
      const inscripto = checkCurso(doc.data().cursos);
      return {
        id: doc.id,
        inscripto,
        ...doc.data(),
      };
    });
    setListado(result);
  }

  const columns = [
    {
      label: "Nombre",
      name: "nombre",
      options: {
        filter: false,
        customBodyRenderLite: (dataIndex) => {
          let val = `${listado[dataIndex].nombre}`;
          return (
            <div style={{ display: "flex", alignItems: "center" }}>
              {/* <img
                className={classes.logo}
                src={listado[dataIndex].logo}
                alt="Img"
              /> */}
              {val}
            </div>
          );
        },
      },
    },
    // {
    //   name: "usuario",
    //   options: { display: "exclude" },
    // },
    {
      label: "Email",
      name: "email",
    },
    {
      label: "Telegram",
      name: "telegram",
    },
    {
      label: "Inscripto",
      name: "inscripto",
      options: {
        filter: true,
        customBodyRender: (value, tableMeta, updateValue) => {
          return (
            <FormControlLabel
              label={value ? "Si" : "No"}
              value={value ? "Si" : "No"}
              control={
                <Switch
                  color="secondary"
                  checked={value}
                  value={value ? "Si" : "No"}
                />
              }
              onChange={(event) => {
                toggleCursos(
                  tableMeta.currentTableData[tableMeta.rowIndex].index,
                  value
                );
                updateValue(event.target.value === "Si" ? false : true);
              }}
            />
          );
        },
      },
    },
  ];

  const options = {
    filter: false,
    filterType: "dropdown",
    responsive: "vertical",
    selectableRowsHeader: false,
    selectableRows: "none",
    rowsPerPage: 10,
    download: false,
    print: false,
    searchPlaceholder: "Buscar...",
    searchOpen: true,
    viewColumns: false,
    expandableRows: false,
    expandableRowsHeader: false,
    expandableRowsOnClick: false,
    setTableProps: () => {
      return {
        padding: "default",
        size: "small",
      };
    },
    textLabels: textLabelsSpanish,
    customFooter: (
      count,
      page,
      rowsPerPage,
      changeRowsPerPage,
      changePage,
      textLabels
    ) => {
      return (
        <CustomFooter
          count={count}
          page={page}
          rowsPerPage={rowsPerPage}
          changeRowsPerPage={changeRowsPerPage}
          changePage={changePage}
          textLabels={textLabels}
        />
      );
    },
  };

  return <MUIDataTable data={listado} columns={columns} options={options} />;
}
