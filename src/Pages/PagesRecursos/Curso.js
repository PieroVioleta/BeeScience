import axios from 'axios';
import React, { useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import Container from '@material-ui/core/Container';
import IconButton from '@material-ui/core/IconButton';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import FolderIcon from '@material-ui/icons/Folder';
import {Link, useLocation} from 'react-router-dom';
import NaviBar from "../../Components/NaviBar";


const API_BASE = "http://localhost:8080/resources/course"

const useStyles = makeStyles((theme) => ({
  demo: {
    backgroundColor: theme.palette.background.paper,
  },
  title: {
    backgroundColor: 'lightblue',
    padding: theme.spacing(8, 0, 6),
  },
  content:{
    background:'#cccccc',
  },
  cardGrid: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  card:{
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: '#cccccc',
  }
}));
const cards = [
  {index:1,
    tipo:"pc1"},
  {index:2,
    tipo:"pc2"},
  {index:3,
    tipo:"pc3"},
  {index:4,
  tipo:"pc4"},
  {index:5,
    tipo:"pc5"},
  {index:6,
    tipo:"pc6"},
  {index:7,
    tipo:"Parcial"},
  {index:8,
    tipo:"Final"},
  {index:9,
    tipo:"Sustitutorio"}
  ];

export default function Curso() {
  const classes = useStyles();
  const [userfile, setFile] = React.useState([]);
  const code = useLocation().state.cod;
  const name = useLocation().state.name;

  const getFile = async () => {
    const response = await axios.get(`${API_BASE}/${code}`);
    setFile(response.data);
  }

  useEffect(() => {
    getFile();
  }, []);

  function generate(tipo) {
    let numeroPC = userfile.filter( (index) => index.type_exam === tipo);
    return numeroPC;
  }

  return (
    <div >
      <NaviBar/>
      <div className={classes.title}>
        <Container maxWidth="sm">
          <Typography  variant="h2" align="center" color="textPrimary" >
              {name} 
            </Typography>
            <Typography  variant ="h3" align="center" color="textPrimary" >
              {code} 
            </Typography>
          </Container>
      </div>
      <Container className={classes.cardGrid} maxWidth="xl">    
        <Grid container spacing={2}>
          {cards.map((card) => (
          <Grid item xs={12} md={6}>
              <Typography variant="h3" className={classes.content}>
                {card.tipo}
              </Typography>
              <div className={classes.demo}>

                <List >
                  {generate( card.tipo).map( (data) => (
                    <ListItem>
                      <ListItemAvatar >
                        <IconButton >
                        <Link to={{ pathname: "/pdf", state: {id:data.path}}}>
                            <FolderIcon />
                        </Link>
                        </IconButton>
                        
                      </ListItemAvatar>
                      <ListItemText variant ="h3"
                        primary= {data.year}
                        secondary={data.mimetype}
                      />
                    </ListItem>
                  ))}
                </List>
              </div>
            </Grid>
          ))}
        </Grid>
        
      </Container> 
    </div>
  );
}