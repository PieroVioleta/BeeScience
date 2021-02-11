import axios from 'axios';
import React, {useState, useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import Container from '@material-ui/core/Container';
import IconButton from '@material-ui/core/IconButton';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import FolderIcon from '@material-ui/icons/Folder';
import DeleteIcon from '@material-ui/icons/Delete';
import {Link, useLocation} from 'react-router-dom';
import NaviBar from "../../../Components/NaviBar";

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
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(3),
  },
  card:{
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: '#cccccc',
  }
}));

function generate(element) {
  return [0, 1, 2].map((value) =>
    React.cloneElement(element, {
      key: value,
    }),
  );
}

export default function Curso() {
  const classes = useStyles();
  const [dense, setDense] = React.useState(false);
  const [secondary, setSecondary] = React.useState(false);
  const [file, setFile] = React.useState([]);
  const code = useLocation().state.cod;
  const name = useLocation().state.name;

  const getFile = async () => {
    const response = await axios.get(`${API_BASE}/${code}`);
    setFile(response.data);
  }

  useEffect(() => {
    getFile();
  }, []);

  console.log(file);

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
        <Grid item xs={12} md={6}>
            <Typography variant="h6" className={classes.content}>
              Avatar with text and icon
            </Typography>
            <div className={classes.demo}>
              <List dense={dense}>
                {generate(
                  <ListItem>
                    <ListItemAvatar>
                      <Avatar>
                        <FolderIcon />
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      primary="Single-line item"
                      secondary={secondary ? 'Secondary text' : null}
                    />
                    <ListItemSecondaryAction>
                      <IconButton edge="end" aria-label="delete">
                        <DeleteIcon />
                      </IconButton>
                    </ListItemSecondaryAction>
                  </ListItem>,
                )}
              </List>
            </div>
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography variant="h6" className={classes.content}>
              Avatar with text and icon
            </Typography>
            <div className={classes.demo}>
              <List dense={dense}>
                {generate(
                  <ListItem>
                    <ListItemAvatar>
                      <Avatar>
                        <FolderIcon />
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      primary="Single-line item"
                      secondary={secondary ? 'Secondary text' : null}
                    />
                    <ListItemSecondaryAction>
                      <IconButton edge="end" aria-label="delete">
                        <DeleteIcon />
                      </IconButton>
                    </ListItemSecondaryAction>
                  </ListItem>,
                )}
              </List>
            </div>
          </Grid>
        </Grid>
      </Container> 
    </div>
  );
}