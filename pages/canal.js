import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Image from "next/image";
import { Container } from "@material-ui/core";
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Link from '@material-ui/core/Link';

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
        <div className={classes.root}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={4}>
              <Card>
                <CardActionArea>
                  <CardMedia
                    component="img"
                    alt="Canal"
                    height="240"
                    image="https://i.ytimg.com/vi/R_qJks4oKL4/mqdefault.jpg"
                    title="Todo el contenido del canal Soluciones para todos"
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">Canal general</Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                      Todos los videos del canal
                    </Typography>
                  </CardContent>
                </CardActionArea>
                <CardActions>
                  <Link href="https://www.youtube.com/channel/UCjZ8pafpiwPc9cS0vk-OPMg"  target="_blank" rel="noopener">Ver más</Link>
                </CardActions>
              </Card>       
            </Grid>
            <Grid item xs={12} sm={4}>
              <Card>
                <CardActionArea>
                  <CardMedia
                    component="img"
                    alt="Criptomonedas desde cero"
                    height="240"
                    image="https://i.ytimg.com/vi/VIGOexoc2Zg/mqdefault.jpg"
                    title="Criptomonedas desde cero"
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">Criptomonedas desde cero</Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                      Un playlist exclusivo para los que recién se inician con las criptomonedas
                    </Typography>
                  </CardContent>
                </CardActionArea>
                <CardActions>
                  <Link href="https://www.youtube.com/watch?v=VIGOexoc2Zg&list=PL_GbFlpvht1eQCoFMQtyAh1wm6HAZMAVu"  target="_blank" rel="noopener">Ver más</Link>
                </CardActions>
              </Card> 
            </Grid>
            <Grid item xs={12} sm={4}>
              <Card>
                <CardActionArea>
                  <CardMedia
                    component="img"
                    alt="Inversiones en criptomonedas"
                    height="240"
                    image="https://i.ytimg.com/vi/RPrmyXcwsW0/mqdefault.jpg"
                    title="Inversiones en criptomonedas"
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">Inversiones en criptomonedas</Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                      Playlist con las distintas inversiones que se pueden realizar con las criptomonedas
                    </Typography>
                  </CardContent>
                </CardActionArea>
                <CardActions>
                  <Link href="https://www.youtube.com/watch?v=RPrmyXcwsW0&list=PL_GbFlpvht1dCT_n7F6hlAYSo3ztjY71n"  target="_blank" rel="noopener">Ver más</Link>
                </CardActions>
              </Card>           
            </Grid>
            <Grid item xs={12} sm={4}>
              <Card>
                <CardActionArea>
                  <CardMedia
                    component="img"
                    alt="Todo sobre farming"
                    height="240"
                    image="https://i.ytimg.com/vi/yEsDr6GCwI8/mqdefault.jpg"
                    title="Todo sobre farming"
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">Todo sobre farming</Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                      Un playlist completo tanto para el que recién se inicia en el farming de criptomonedas como el que busca una estrategia para maximizar sus ganancias
                    </Typography>
                  </CardContent>
                </CardActionArea>
                <CardActions>
                  <Link href="https://www.youtube.com/watch?v=yEsDr6GCwI8&list=PL_GbFlpvht1ctqPoMMWOjmNT_bdTX9YEG"  target="_blank" rel="noopener">Ver más</Link>
                </CardActions>
              </Card>           
            </Grid>
            <Grid item xs={12} sm={4}>
              <Card>
                <CardActionArea>
                  <CardMedia
                    component="img"
                    alt="Como hacer trading"
                    height="240"
                    image="https://i.ytimg.com/vi/2MEzZkHk7oc/mqdefault.jpg"
                    title="Como hacer trading"
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">Como hacer trading</Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                      Aprenda sobre trading de criptomonedas, cuando ingresar a una alerta, take profit, stop loss, análisis de indicadores y mucho más
                    </Typography>
                  </CardContent>
                </CardActionArea>
                <CardActions>
                  <Link href="https://www.youtube.com/watch?v=2MEzZkHk7oc&list=PL_GbFlpvht1ffjxy4Fy-F2MOZwVBv9vzX"  target="_blank" rel="noopener">Ver más</Link>
                </CardActions>
              </Card>    
            </Grid>
            <Grid item xs={12} sm={4}>
              <Card>
                <CardActionArea>
                  <CardMedia
                    component="img"
                    alt="Inversiones inmobiliarias con criptomonedas"
                    height="240"
                    image="https://i.ytimg.com/vi/j1hz_efIsNQ/mqdefault.jpg"
                    title="Inversiones inmobiliarias con criptomonedas"
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">Inversiones inmobiliarias con criptomonedas</Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                      Información completa sobre las inversiones inmobiliarias con criptomonedas, tips útiles a la hora de comprar y vender un inmueble. Tenga ya una renta fija y despreocupese de las variaciones del mercado
                    </Typography>
                  </CardContent>
                </CardActionArea>
                <CardActions>
                  <Link href="https://www.youtube.com/watch?v=j1hz_efIsNQ&list=PL_GbFlpvht1cxhN7inlXJSPbVytVVM0Gc"  target="_blank" rel="noopener">Ver más</Link>
                </CardActions>
              </Card> 
            </Grid>
          </Grid>
        </div>
      </Container>
    </>
  );
}
