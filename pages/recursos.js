import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Image from "next/image";
import { Container } from "@material-ui/core";

import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";

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

function ListItemLink(props) {
  return <ListItem button component="a" {...props} />;
}

export default function Home() {
  const classes = useStyles();
  //const [dense, setDense] = React.useState(false);

  return (
    <>
      <div>
        <Image
          src="/static/images/recursos.png"
          alt="Soluciones para Todos"
          layout="responsive"
          object-fit="cover"
          width={1600}
          height={311}
        />
      </div>
      <Container>
        <div className={classes.root}>
          <h2>Exchanges</h2>
          <List>
            <ListItemLink
              href="https://accounts.binance.com/en/register?ref=HURDG2N3"
              target="_blank"
              rel="noopener"
            >
              <ListItemText
                primary="Binance"
                secondary="20% de descuento en las comisiones"
              />
            </ListItemLink>
            <ListItemLink
              href="https://www.bybit.com/en-US/register/?affiliate_id=12483&language=en-US&group_id=0&group_type=1"
              target="_blank"
              rel="noopener"
            >
              <ListItemText
                primary="Bybit"
                secondary="Solo para traders profesionales. Futuros perpetuos USD Bitcoin"
              />
            </ListItemLink>
            <ListItemLink
              href="https://referral.crypto.com/signup?_branch_match_id=900747120523846734"
              target="_blank"
              rel="noopener"
            >
              <ListItemText
                primary="Crypto.com"
                secondary="Compra y venta de criptomonedas, billetera segura y también da préstamos y podes prestar las tuyas por un interés mensual"
              />
            </ListItemLink>
            <ListItemLink
              href="https://letsbit.io"
              target="_blank"
              rel="noopener"
            >
              <ListItemText
                primary="Let'sBIT "
                secondary="Compra y venta de criptomonedas en pesos y en dólares (retirar pesos o dólares)"
              />
            </ListItemLink>
          </List>
          <h2>Canales de la comunidad en Telegram</h2>
          <List>
            <ListItemLink
              href="https://t.me/joinchat/6ygYycqVsTFkZjMx"
              target="_blank"
              rel="noopener"
            >
              <ListItemText primary="Noticias" secondary="" />
            </ListItemLink>
            <ListItemLink
              href="https://t.me/joinchat/UzTvkA1xFHPhRG-L"
              target="_blank"
              rel="noopener"
            >
              <ListItemText
                primary="Principiantes en criptomonedas"
                secondary=""
              />
            </ListItemLink>
            <ListItemLink
              href="https://t.me/tradinggratissoluciones"
              target="_blank"
              rel="noopener"
            >
              <ListItemText
                primary="Alertas de trading (GRATIS)"
                secondary=""
              />
            </ListItemLink>
            <ListItemLink
              href="https://t.me/SolucionersInversionInmobiliaria"
              target="_blank"
              rel="noopener"
            >
              <ListItemText
                primary="Inversiones inmobiliarias"
                secondary="Renta fija"
              />
            </ListItemLink>
            <ListItemLink
              href="https://t.me/joinchat/ygEfCbCv40cxMTAx"
              target="_blank"
              rel="noopener"
            >
              <ListItemText primary="Farming" secondary="" />
            </ListItemLink>
            <ListItemLink
              href="https://t.me/joinchat/ILG9Bk7u7p41MDYx"
              target="_blank"
              rel="noopener"
            >
              <ListItemText primary="Non fungible tokens (NFT)" secondary="" />
            </ListItemLink>
            <ListItemLink
              href="https://t.me/joinchat/SlH9YUusP7dgypKz"
              target="_blank"
              rel="noopener"
            >
              <ListItemText primary="Crypto.com (CRO)" secondary="" />
            </ListItemLink>
          </List>
          <h2>Canales de la comunidad en YouTube</h2>
          <List>
            <ListItemLink
              href="https://www.youtube.com/channel/UCjZ8pafpiwPc9cS0vk-OPMg"
              target="_blank"
              rel="noopener"
            >
              <ListItemText
                primary="Canal principal de Soluciones para todos"
                secondary=""
              />
            </ListItemLink>
            <ListItemLink
              href="https://www.youtube.com/channel/UCBFMkwCqx-yftUNd35dLStA"
              target="_blank"
              rel="noopener"
            >
              <ListItemText primary="Canal de noticias" secondary="" />
            </ListItemLink>
          </List>
        </div>
      </Container>
    </>
  );
}
