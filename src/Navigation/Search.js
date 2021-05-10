import React, { useState} from 'react';
import {
  Grid,
  InputBase,
  NativeSelect,
  FormControl,
} from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import { fade, withStyles, makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  searchBox: {
    //backgroundColor: fade(theme.palette.common.white, 0.25),
    display: 'flex',
    borderRadius: 16,
  },
  search: {
    marginTop: 8,
    marginBottom: 8,
    position: 'relative',
    color: 'white',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(1),
      width: 'auto',
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  margin: {
    margin: theme.spacing(1),
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
}));

const BootstrapInput = withStyles((theme) => ({
  root: {
    'label + &': {
      marginTop: theme.spacing(3),
    },
  },
  input: {
    borderRadius: 4,
    position: 'relative',
    color: 'white',
    backgroundColor: fade(theme.palette.common.white, 0.15),
    fontSize: 16,
    padding: '8px 24px 8px 10px',
    transition: theme.transitions.create(['border-color', 'box-shadow']),
    // Use the system font instead of the default Roboto font.
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
    '&:focus': {
      borderRadius: 4,
      borderColor: '#80bdff',
      boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)',
    },
  },
}))(InputBase);

export default function SearchInput() {
  const classes = useStyles();
  const [filter, setFilter] = useState('Cocktails');

  const handleChange = (e) => {
    setFilter(e.target.value);
  }

  return (
    <Grid container justify="center" alignItems="center">
      <div className={classes.searchBox}>
      <div className={classes.search}>
        <div className={classes.searchIcon}>
          <SearchIcon style={{color: 'white'}}/>
        </div>
        <InputBase
          placeholder="Search…"
          classes={{
            root: classes.inputRoot,
            input: classes.inputInput,
          }}
          inputProps={{ 'aria-label': 'search' }}
        />
      </div>
      <FormControl className={classes.margin}>
        <NativeSelect
          id="filter"
          value={filter}
          onChange={handleChange}
          input={<BootstrapInput />}
        >
          <option aria-label="None" value="" />
          <option value={"People"}>People</option>
          <option value={"Cocktails"}>Cocktails</option>
          <option value={"Companies"}>Companies</option>
        </NativeSelect>
      </FormControl>
      </div>
    </Grid>
  );
}
