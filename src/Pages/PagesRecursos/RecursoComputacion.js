import React from 'react';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

// import CardComponent from '../Components/Card';

const useStyles = makeStyles((theme) => ({
  icono:{
    flexDirection: 'center',
  },

  heroContent: {
    backgroundColor: 'lightblue',
    padding: theme.spacing(8, 0, 6),
  },
  heroButtons: {
    marginTop: theme.spacing(4),
  },
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
    
  },
  card: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: '#cccccc',
  },
  cardMedia: {
    paddingTop: '56.25%', // 16:9
  },
  cardContent: {
    flexGrow: 1,
  },
  
}));

const cards = [
    {index: 1, 
      enlace: "/GestorNotas",
      escuela: "Ingenieria física",
       link:"https://images.unsplash.com/photo-1568754690048-73d7d3a6bf32?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=633&q=80"},
    {index: 2, 
      enlace: "/Foruni",
      escuela: "Química", 
      link:"https://images.unsplash.com/photo-1581091012184-7e0cdfbb6797?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80"},
    {index: 3, 
      enlace: "/Horario",
      escuela: "Física", 
      link:"https://images.unsplash.com/photo-1607988795691-3d0147b43231?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80"},
    {index: 4, 
      enlace: "/GestorNotas",
      escuela: "Matematica", 
      link:"https://images.unsplash.com/photo-1581089778245-3ce67677f718?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80"},
    {index: 5, 
      enlace: "/GestorNotas",
      escuela: "Ciencia de la computación", 
      link:"https://images.unsplash.com/photo-1600267147646-33cf514b5f3e?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1030&q=80"},
];

export default function Album() {
  const classes = useStyles();

  return (
    <React.Fragment>
      
      <main>
        {/* Hero unit */}
        <div className={classes.heroContent}>
          <Container maxWidth="sm">
            <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
              Recursos de la Carrera Profesional de Ciencia de la Computación.
            </Typography>
            <Typography variant="h5" align="center" color="textSecondary" paragraph>
              En esta sección encontrarás recursos educativos divididos por carreras profesionales de la facultad de ciencias.
            </Typography>
            
          </Container>
        </div>
        
        <div className={classes.icon} >
          <Icon className="fa fa-plus-circle" color="secondary" style={{ fontSize: 30 }}/>
        </div>
        
        
        <Container className={classes.cardGrid} maxWidth="md" >
          {/* End hero unit */}
          <Grid container spacing={4}>
            {cards.map((card) => (
              <Grid item key={card.index} xs={12} sm={6} md={4} >
                <Card className={classes.card}>
                  <CardMedia
                    className={classes.cardMedia}
                    image={card.link}
                    title={card.escuela}
                  />
                  <CardContent className={classes.cardContent}>
                    <Typography gutterBottom variant="h5" component="h2" align="center">
                      {card.escuela}
                    </Typography>
                    </CardContent>
                  <CardActions>
                  <Button  variant="outlined" size="large" color="primary" href={card.enlace}>
                      Ver
                  </Button>
                                                        
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
          
        </Container>
                
        
      </main>

    </React.Fragment>
  );
}