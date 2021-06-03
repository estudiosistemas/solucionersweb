import React, { useEffect, useContext, useState } from "react";
import { Paper, TableCell } from "@material-ui/core";
import CustomFooter from "../CustomFooter";
import MUIDataTable from "mui-datatables";
import useStyles from "../../src/styles";
import textLabelsSpanish from "../tableLabelsLocation";
import firebase, { FirebaseContext } from "../../firebase";
import Button from "@material-ui/core/Button";
import TableRow from "@material-ui/core/TableRow";

export default function ListadoAlumnos() {
  const [listado, setListado] = useState([]);
  const { usuario } = useContext(FirebaseContext);
  const [filaSelected, setFilaSelected] = useState([]);
  const [filaExpanded, setFilaExpanded] = useState([]);
  const classes = useStyles();

  const handleCursos = (id) => {
    alert(id);
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
      return {
        id: doc.id,
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
    {
      name: "usuario",
      options: { display: "exclude" },
    },
    {
      label: "Telegram",
      name: "telegram",
      // options: {
      //   filter: false,
      //   customBodyRenderLite: (dataIndex) => {
      //     let val = listado[dataIndex].valor;
      //     return <TableNumberFormat valor={val} decimales={4} />;
      //   },
      // },
    },
    {
      name: "Acciones",
      options: {
        filter: false,
        sort: false,
        empty: true,
        customBodyRenderLite: (dataIndex, rowIndex) => {
          return (
            <Button
              className={classes.menuButton}
              size="small"
              color="secondary"
              onClick={() => handleCursos(listado[dataIndex].id)}
            >
              Cursos
            </Button>
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
    expandableRows: true,
    expandableRowsHeader: false,
    expandableRowsOnClick: false,
    rowsExpanded: filaExpanded,
    isRowExpandable: (dataIndex, expandedRows) => {
      if (
        expandedRows.data.length > 4 &&
        expandedRows.data.filter((d) => d.dataIndex === dataIndex).length === 0
      )
        return false;
      return true;
    },
    renderExpandableRow: (rowData, rowMeta) => {
      const colSpan = rowData.length + 1;
      return (
        <TableRow>
          <TableCell colSpan={colSpan}>
            {/* <Events coin={rowData[0]} /> */}
            {rowData[1]}
          </TableCell>
        </TableRow>
      );
    },
    onRowExpansionChange: (curExpanded, allExpanded, rowsExpanded) => {
      const filas = allExpanded.map((fila) => fila.dataIndex);
      setFilaExpanded(filas);
    },
    setTableProps: () => {
      return {
        padding: "default",
        size: "medium",
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

  return (
    <div>
      <MUIDataTable data={listado} columns={columns} options={options} />
    </div>
  );
}
