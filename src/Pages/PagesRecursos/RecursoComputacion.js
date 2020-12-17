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
import {Link} from 'react-router-dom';

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
      curso: "Introducción a la Computación",
      link: "https://images.unsplash.com/photo-1532153975070-2e9ab71f1b14?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80",
    },
    {index: 2, 
      curso: "Física I",
      link: "https://images.unsplash.com/photo-1532153975070-2e9ab71f1b14?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80",
    },
    {index: 3, 
      curso: "Calculo Diferencial",
      link: "https://images.unsplash.com/photo-1532153975070-2e9ab71f1b14?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80",
    },
    {index: 4, 
      curso: "Algebra Lineal",
      link: "https://images.unsplash.com/photo-1532153975070-2e9ab71f1b14?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80",
    },
    {index: 5, 
      curso: "Química I",
      link: "https://images.unsplash.com/photo-1532153975070-2e9ab71f1b14?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80",
    },
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
               Ciencias de la Computación
            </Typography>
            <Typography variant="h3" align="center" color="textPrimary" gutterBottom>
               Ciclo I
            </Typography>
            <Typography variant="h5" align="center" color="textSecondary" paragraph>
              En esta sección encontrarás recursos de los cursos del Primer ciclo.
            </Typography>
          </Container>
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
                    title={card.curso}
                  />
                  <CardContent className={classes.cardContent}>
                    <Typography gutterBottom variant="h5" component="h2" align="center">
                      {card.curso}
                    </Typography>
                    </CardContent>
                  <CardActions>
                  <Link to="/CursoFisica">
                    <Button  variant="outlined" size="large" color="primary" >
                        Ver
                    </Button>
                  </Link>
                  
                                                        
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