import React, { useState } from 'react';
import QRCode from './QRCode';
import {
  Box,
  Container,
  IconButton,
  Button,
  AppBar,
  Toolbar,
  Typography,
  Divider,
} from '@material-ui/core';
import { Link as Scroll } from 'react-scroll';
import { makeStyles } from '@material-ui/core/styles';

/* Material UI Icons */
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import FavoriteIcon from '@material-ui/icons/Favorite';
import CropFreeIcon from '@material-ui/icons/CropFree';
import AddAPhotoOutlinedIcon from '@material-ui/icons/AddAPhotoOutlined';


const useStyles = makeStyles(theme => ({
  header: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
    backgroundImage: `url(${process.env.PUBLIC_URL + '/assets/cocktail.jpg)'}`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
  },
  info: {
    minHeight: '100vh',
  },
  infoBox: {
    border: 'solid 1px #202020',
    borderRadius: 40,
    minHeight: '40vh',
    padding: 20,
    margin: 20,
  },
  scrollButton: {
    fontSize: '4em',
  },
  qrButton: {
    borderRadius: 37,
    textTransform: 'none',
    float: 'right',
  },
  qrContainer: {
    display: 'flex',
    justifyContent: 'center',
  },
  appBar: {
    display: 'flex',
    backgroundColor: theme.palette.primary.background,
  },
  title: {
    fontFamily: 'Nunito',
    textAlign: 'center',
    margin: 20,
  },
  divider: {
    margin: 10
  },
  button: {
    borderRadius: 37,
    width: 450,
  },
  buttonDiv: {
    flex: 1,
    textAlign: 'center',
    margin: 25,
  },
}));

export default function ItemSheet({ item, isPreview }) {
  const classes = useStyles();
  const [showQRCode, setShowQRCode] = useState(false);

  const handleQRCode = () => {
    setShowQRCode(!showQRCode);
  }

  return (
    <div>
      <div className={classes.header} id='drink-image'>
        {
          !isPreview
          ? <Scroll to='drink-info' smooth='true'>
              <IconButton>
                <ExpandMoreIcon className={classes.scrollButton} />
              </IconButton>
            </Scroll>
          : <div> 
              <input 
                type="file" 
                accept="image/*" 
                hidden 
              />
              <label htmlFor="contained-button-file">
                <IconButton>
                  <AddAPhotoOutlinedIcon className={classes.scrollButton} />
                </IconButton>
              </label>
            </div>
        }
      </div>
      <div id="drink-info" className={classes.info}>
        <AppBar position='sticky' className={classes.appBar}>
          <Toolbar>
            <IconButton color="secondary">
              <FavoriteIcon />
            </IconButton>
            <IconButton onClick={handleQRCode} color="primary">
              <CropFreeIcon />
            </IconButton>
            <Scroll to='drink-image' smooth='true'>
              <IconButton>
                <ExpandLessIcon />
              </IconButton>
            </Scroll>
          </Toolbar>
        </AppBar>
        <Container className={classes.qrContainer}>
          { showQRCode ? <QRCode /> : false }
        </Container>
        <Container style={{textAlign: 'center'}}>
          <Typography component="h1" variant="h2" className={classes.title}>
            {item.name}
          </Typography>
          <Typography color="textSecondary">
            {item.creator}, {item.location}, {item.date}
          </Typography>
          <Divider variant="middle" className={classes.divider} />
          <Typography color="textSecondary">
            {item.description}
          </Typography>
        </Container>
        <Box className={classes.infoBox} boxShadow={5}>
          {
            item.ingredients.map((ingredient) => {
              return <Typography>{ingredient.amount} {ingredient.unit} {ingredient.name}</Typography>
            })
          }
          {
            item.miscellaneous.map((item) => {
              return <Typography>{item}</Typography>
            })
          }
          <Divider variant="middle" className={classes.divider} />
          <Typography>{item.instructions}</Typography>
        </Box>
        <div className={classes.buttonDiv}>
        {
          isPreview
          ? <Button
              className={classes.button}
              variant="outlined"
              color="primary"
            >
              Publish
            </Button>
          : false
        }
        </div>
      </div>
    </div>
  );
}
