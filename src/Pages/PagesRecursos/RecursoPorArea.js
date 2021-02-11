import React, { useState, useEffect} from 'react';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import {Link, useLocation} from 'react-router-dom';
import axios from 'axios';

const API_BASE = "http://localhost:8080/escuelas"
const card = "https://images.unsplash.com/photo-1532153975070-2e9ab71f1b14?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80"
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

export default function Album() {
  const [userData, setUserData] = useState([]);
  const id = useLocation().state.id;
  const classes = useStyles();
  
  const getEscuela = async () => {
    const response = await axios.get(`${API_BASE}/${id}`);
    setUserData(response.data);
    
  }

  useEffect(() => {
    getEscuela();
  }, []);
  
  return (
    <React.Fragment> 
        {userData.map( (data) => (
          <main>
            <div className={classes.heroContent}>
              <Container maxWidth="sm" key={data._id}>
                  <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
                    {data.escuela}
                  </Typography>
                  <Typography variant="h3" align="center" color="textPrimary" gutterBottom>
                    {data.ciclo}
                  </Typography>           
                  <Typography variant="h5" align="center" color="textSecondary" paragraph>
                    En esta sección encontrarás recursos de los cursos del {data.ciclo}.
                  </Typography>
              </Container>
            </div>
            <Container className={classes.cardGrid} key={data.ciclo} maxWidth="md" >
              <Grid container spacing={4}>
                {data.courses.map((course) => (
                  <Grid item key={course[0]} xs={12} sm={6} md={4} >
                    <Card className={classes.card}>
                      <CardMedia
                        className={classes.cardMedia}
                        image={card}
                        title={course[1]}
                      />
                      <CardActions>
                      <Link to={{ pathname: "/CursoFisica", state: {cod:course[0] , name:course[1]}}}>
                        <CardContent className={classes.cardContent}>
                          <Typography gutterBottom variant="h4" align="center">
                            {course[1]}({course[0]})
                          </Typography>
                        </CardContent>
                      </Link>
                      </CardActions>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            </Container>
          </main>
          ))}
    </React.Fragment>
  );
}