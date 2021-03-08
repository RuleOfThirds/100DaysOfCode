import React, { useState } from 'react';
import MetricSelector from '../Helpers/MetricSelector';
import ImperialSelector from '../Helpers/ImperialSelector';
import {
  Container,
  TextField,
  Grid,
  FormControlLabel,
  Checkbox,
  IconButton,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import AddBoxIcon from '@material-ui/icons/AddBox';

const useStyles = makeStyles(theme => ({
  formContainer: {
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: 'rgba(0,0,0,0.3)',
    padding: 20,
    fontFamily: 'Nunito',
  },
  input: {
    width: 900,
  },
  formControl: {
    margin: theme.spacing(2),
    minWidth: 120,
  },
}));

export default function Ingredients() {
  const classes = useStyles();
  const [isMetric, setIsMetric] = useState(false);

  const handleIsMetric = () => {
    setIsMetric(!isMetric)
  }

  return (
    <Container maxWidth="lg" className={classes.formContainer}>
      <FormControlLabel
        control={<Checkbox color="secondary" id="metric" size="small" />}
        label="Metric"
        onChange={handleIsMetric}
      />
      <Grid container alignItems="center">
        <Grid item xs>
          <TextField 
            id='ingredient'
            label='Ingredient'
            variant='outlined'
            margin='normal'
            InputProps={{
              className: classes.input
            }}
          />
        </Grid>
        <Grid item xl>
          <IconButton color="primary">
            <AddBoxIcon fontSize="large"/>
          </IconButton>
        </Grid>
      </Grid>
      {
        isMetric
          ? <MetricSelector />
          : <ImperialSelector />
      }
    </Container>
  );
}