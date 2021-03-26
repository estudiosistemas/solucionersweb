import React, { useState } from "react";
import Link from "next/link";
import ListadoCursos from "../components/adminpanel/ListadoCursos";
import styles from "../styles/Home.module.css";
import { makeStyles } from "@material-ui/core/styles";
import Accordion from "@material-ui/core/Accordion";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionActions from "@material-ui/core/AccordionActions";
import Button from "@material-ui/core/Button";
import Divider from "@material-ui/core/Divider";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    flexBasis: "33.33%",
    flexShrink: 0,
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary,
  },
}));

export default function Home() {
  const classes = useStyles();
  const [expanded, setExpanded] = useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <div className={classes.root}>
      <h1>Panel de Administración</h1>
      <Accordion
        expanded={expanded === "panel1"}
        onChange={handleChange("panel1")}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1bh-content"
          id="panel1bh-header"
        >
          <Typography className={classes.heading}>
            Administración de Cursos
          </Typography>
          <Button size="small" color="primary">
            Nuevo Curso
          </Button>
          {/* <Typography className={classes.secondaryHeading}>
            I am an accordion
          </Typography> */}
        </AccordionSummary>
        <AccordionDetails>
          <ListadoCursos />
        </AccordionDetails>
        <AccordionActions>
          <Button size="small" color="primary">
            Nuevo Curso
          </Button>
        </AccordionActions>
      </Accordion>
      <Accordion
        expanded={expanded === "panel2"}
        onChange={handleChange("panel2")}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2bh-content"
          id="panel2bh-header"
        >
          <Typography className={classes.heading}>
            Administración de Alumnos
          </Typography>
          <Button size="small" color="primary">
            Nuevo Alumno
          </Button>
          {/* <Typography className={classes.secondaryHeading}>
            You are currently not an owner
          </Typography> */}
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Donec placerat, lectus sed mattis semper, neque lectus feugiat
            lectus, varius pulvinar diam eros in elit. Pellentesque convallis
            laoreet laoreet.
          </Typography>
        </AccordionDetails>

        <AccordionActions>
          <Button size="small" color="primary">
            Nuevo Alumno
          </Button>
        </AccordionActions>
      </Accordion>
    </div>
  );
}
