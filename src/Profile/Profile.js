import React, { useState }  from 'react';
import { useFirebase } from '../Providers/FirebaseProvider';
import MainBar from '../Components/MainBar';
import CardList from '../Products/CardList';
import QRCode from '../Components/QRCode';
import exampleDatabase from '../static/exampleDatabase';
import {
  AppBar,
  Avatar,
  Container,
  IconButton,
  Box,
  Link,
  Typography,
  Breadcrumbs,
  Tabs,
  Tab,
  Button,
} from '@material-ui/core';
import LinkIcon from '@material-ui/icons/Link';
import TwitterIcon from '@material-ui/icons/Twitter';
import InstagramIcon from '@material-ui/icons/Instagram';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  container: {
    display: 'flex',
    padding: 20,
    backgroundColor: theme.palette.primary.background
  },
  info: {
    display: 'flex',
    flexDirection: 'column',
    fontFamily: 'Nunito',
    borderRadius: 15,
  },
  nav: {
    display: 'flex',
    justifyContent: 'center',
  },
  navBar: {
    backgroundColor: theme.palette.primary.background,
    color: theme.palette.primary.main,
    borderRadius: 5,
  },
  bio: {
    fontFamily: 'Roboto',
  },
  profilePic: {
    height: theme.spacing(26),
    width: theme.spacing(26),
    cursor: "pointer",
  },
  breadcrumbs: {
    fontFamily: 'Nunito',
    margin: 20
  },
  link: {
    display: 'flex',
    color: theme.palette.secondary.main
  },
  button: {
    marginLeft: theme.spacing(8),
    textTransform: 'none',
    fontFamily: 'Nunito',
  },
}));

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function TabPanel(props) {
  const { children, value, index, ...other } = props;
  const classes = useStyles();

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box className={classes.nav} p={3}>
          {children}
        </Box>
      )}
    </div>
  );
}

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

/*
 * Firebase Auth API Reference 
 * https://firebase.google.com/docs/reference/js/firebase.User
 */

export default function Profile() {
  const classes = useStyles();
  const auth = useFirebase();
  const [value, setValue] = useState(0);
  const [image, setImage] = useState(auth.user.picture)

  const handleChange = (event, newValue) => {
    setValue(newValue)
  }

  const handleImageUpload = (event) => {
    const imageName = event.target.files[0].name

    if (event.target.files.length > 0) {
      const imageFile = URL.createObjectURL(event.target.files[0]);
      console.log(auth.user.picture)
      setImage(imageFile);

      // upload to firebase and set the user's new avatar image
      auth.uploadImageToStorage(imageFile, imageName)
    }
  }

  return (
    <div>
      <div style={{backgroundColor: '#202020'}}>
        <MainBar noLogo />
      </div>
      <Container maxWidth="xl" className={classes.container}>
        <div id="avatar-section">
          <input 
            accept="image/*" 
            hidden 
            id="photo-upload" 
            type="file" 
            onChange={(e) => handleImageUpload(e)} 
          />
          <label htmlFor="photo-upload">
            <Avatar 
              className={classes.profilePic} 
              src={image}
            />
          </label>
        </div>
        <Container className={classes.info}>
          <Typography component="h1" variant="h3" style={{fontFamily: 'Nunito'}}>
            {auth.user.name} <Button variant="outlined" color="primary" href="/edit-profile" className={classes.button}>Edit Profile</Button>
          </Typography>
          <span style={{color: '#d0d0d0'}}>{auth.user.accountType}</span>
          <Breadcrumbs className={classes.breadcrumbs}>
            <Link rel="noopener" href={auth.user.social.twitter} className={classes.link}>
              <TwitterIcon />
            </Link>
            <Link rel="noopener" href={auth.user.social.instagram} className={classes.link}>
              <InstagramIcon />
            </Link>
            <Link rel="noopener" href={auth.user.social.website} className={classes.link}>
              <LinkIcon />
            </Link>
          </Breadcrumbs>
          <Typography className={classes.bio}>
            {auth.user.bio}
          </Typography>
        </Container>
        <QRCode />       
      </Container>
      <AppBar position="sticky" className={classes.navBar}>
        <Tabs 
          value={value}
          indicatorColor="primary"
          onChange={handleChange} 
          variant="fullWidth" 
          aria-label="simple tabs example"
        >
          <Tab disableRipple label="My Creations" {...a11yProps(1)} />
          <Tab disableRipple label="Favorites" {...a11yProps(2)} />
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0}>
        <CardList data={exampleDatabase} />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <CardList data={exampleDatabase} />
      </TabPanel>
    </div>
  );
}


