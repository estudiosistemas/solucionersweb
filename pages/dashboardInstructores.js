import React, { useState, useContext } from "react";
import Link from "next/link";
import ListadoCursos from "../components/adminpanel/ListadoCursos";
import styles from "../styles/Home.module.css";
import { makeStyles } from "@material-ui/core/styles";
import Accordion from "@material-ui/core/Accordion";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionActions from "@material-ui/core/AccordionActions";
import Button from "@material-ui/core/Button";
import { Container } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Error403 from "../components/layout/403";
import { useRouter } from "next/router";
import firebase, { FirebaseContext } from "../firebase";
import Image from "next/image";
import ListadoAlumnos from "../components/adminpanel/ListadoAlumnos";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    marginTop: "2rem",
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
  const { usuario } = useContext(FirebaseContext);
  const router = useRouter();

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  if (!usuario || (usuario && !usuario.userProfile.isInstructor)) {
    return <Error403 />;
  } else
    return (
      <>
        <Image
          src="/images/academia.png"
          alt="Soluciones para Todos"
          layout="responsive"
          object-fit="cover"
          width={1600}
          height={311}
        />
        <Container>
          <div className={classes.root}>
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
                {/* <Typography className={classes.secondaryHeading}>
            I am an accordion
          </Typography> */}
              </AccordionSummary>
              <AccordionDetails>
                <ListadoCursos />
              </AccordionDetails>
              <AccordionActions>
                <Button
                  size="small"
                  color="primary"
                  onClick={() => router.push("/crear-curso")}
                >
                  Nuevo Curso
                </Button>
              </AccordionActions>
            </Accordion>
            <br></br>
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
                {/* <Typography className={classes.secondaryHeading}>
            You are currently not an owner
          </Typography> */}
              </AccordionSummary>
              <AccordionDetails>
                <ListadoAlumnos />
              </AccordionDetails>

              <AccordionActions>
                <Button size="small" color="primary">
                  Nuevo Alumno
                </Button>
              </AccordionActions>
            </Accordion>
          </div>
        </Container>
      </>
    );
}
