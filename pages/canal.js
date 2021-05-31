import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Image from "next/image";
import { Container } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    marginTop: 20,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
}));

export default function Home() {
  const classes = useStyles();

  return (
    <>
      <div>
        <Image
          src="/images/canal.png"
          alt="Soluciones para Todos"
          layout="responsive"
          object-fit="cover"
          width={1600}
          height={311}
        />
      </div>
      <Container>
        <div className={classes.root}></div>
      </Container>
    </>
  );
}
