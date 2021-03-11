import React, { useState } from 'react';
import MainBar from '../Helpers/MainBar';
import Help from './Help';
import CocktailStepper from './CocktailStepper';
import {
  AppBar,
  Toolbar,
  IconButton,
  Button,
} from '@material-ui/core';
import { Link as Scroll } from 'react-scroll';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  appBar: {
    backgroundColor: theme.palette.background.main,
  },
  infoButton: {
    float: 'right',
  },
  button: {
    borderRadius: 37,
    width: 250
  },
  buttonDiv: {
    flex: 1,
    margin: 25,
    textAlign: 'center',
  },
}));

/*
 * Notes:
 *  - git branch day36 if you want to see the version where you could pick your recipe type. 
 *  - Removed that feature because it's WAY too much code and there must be a simpler way
 */

export default function Wizard() {
  const classes = useStyles();
  const steps = ['Basic Information', 'Base Spirit', 'Ingredients', 'Instructions'];
  const [activeStep, setActiveStep] = useState(0);
  const [showHelp, setShowHelp] = useState(false);
  const [readyForReview, setReadyForReview] = useState(false);

  const handleHelp = () => {
    setShowHelp(!showHelp)
  }

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1)
  }

  /*
   * This should also be pushing the entered data into the object
   * This could get complicated. I'll need to give each input a unique ID so that if I backtrack I can have it update
   * The unique item you'd want to change otherwise stuff could get messy
   */
  const handleNext = () => {
    if (activeStep < steps.length) {
      setActiveStep((prevActiveStep) => prevActiveStep + 1)
    } 
  }

  const handleReview = () => {
    setReadyForReview(true)
  }

  return (
    <main>
      <MainBar />
      <AppBar 
        position='sticky' 
        elevation={0} 
        className={classes.appBar}
      >
        <Toolbar>
        <IconButton disabled={activeStep === 0} onClick={handleBack}>
          <ExpandLessIcon />
        </IconButton>
        <Scroll to={`step-${activeStep}`} smooth="true">
          <IconButton
            variant="contained"
            color="primary"
            onClick={handleNext}
          >
            {
              /* If you're on the last step then display the CheckCircle instead of the ExpandMore */
              activeStep >= steps.length - 1
                ? <CheckCircleIcon onClick={handleReview} />
                : <ExpandMoreIcon />
            }
          </IconButton>
        </Scroll>
        {
          /* If you're at the end of your stepper then stop showing the help icon */
          activeStep <= steps.length - 1
            ? <IconButton className={classes.infoButton} onClick={handleHelp}>
                <InfoOutlinedIcon />
              </IconButton>
            : false
        }
        </Toolbar>
      </AppBar>
      <div>
        { 
          showHelp ? <Help step={activeStep} /> : false 
        }
        <CocktailStepper 
          steps={steps} 
          activeStep={activeStep} 
          handleNext={handleNext}
        />
      </div>
      <div className={classes.buttonDiv}>
      {
        /* Once all steps are completed then display the Review button */
        readyForReview && activeStep >= steps.length
          ? <Button
              className={classes.button}
              variant="outlined"
              color="primary"
              href="/cocktail"
              onClick={() => console.log("Went to next")}
            >
              Review
            </Button>
          : false
      }
      </div>
    </main>
  );
}

