import React, { useState } from "react";
import Accordion from "@material-ui/core/Accordion";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionActions from "@material-ui/core/AccordionActions";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { makeStyles } from "@material-ui/core";

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

const SingleContenido = ({ curso, handlePlayVideo }) => {
  const [expanded, setExpanded] = useState(false);
  const { titulo, duracion, url, habilitado } = curso;

  const classes = useStyles();

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <Accordion
      expanded={expanded === "panel1"}
      onChange={handleChange("panel1")}
    >
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1bh-content"
        id="panel1bh-header"
      >
        <Typography variant="subtitle2">{titulo}</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Typography variant="caption">Duracion: {duracion}</Typography>
      </AccordionDetails>
      <AccordionActions>
        <Button
          size="small"
          color="primary"
          onClick={() => habilitado && handlePlayVideo(url)}
        >
          {habilitado ? "Reproducir" : "No disponible"}
        </Button>
      </AccordionActions>
    </Accordion>
  );
};

export default SingleContenido;
