import React, { 
  useState,
  useContext, 
  createContext,
} from 'react';

const CocktailContext = createContext();

export const useCocktail = () => {
  return useContext(CocktailContext);  
}

function useCocktailProvider() {
  const [recipe, setRecipe] = useState({});
  const steps = ['Basic Information', 'Unit Type', 'Ingredients', 'Miscellaneous', 'Instructions'];
  const [activeStep, setActiveStep] = useState(0);

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1)
  }

  const handleNext = () => {
    if (activeStep < steps.length) {
      setActiveStep((prevActiveStep) => prevActiveStep + 1)
//      document.getElementById(`step-${activeStep}`).scrollIntoView({behavior: 'smooth'})
    } 
  }

  // So this works for BasicInfo and Instructions
  // See comments in Ingredients.js to understand what you are trying to do better
  // I need to get this to where it works for the above two components, but also works for Ingredients.js, (and misc for that matter)
  //const buildFromInput = (event) => {
    // alternatively, I could just have this accept two args, and manually pass [event.target.name], and the other value 
    // could literally be anything
   // setRecipe({
    //  ...recipe, 
   //   [event.target.name]: event.target.value
   // });
 // }

  const buildFromInput = (data) => {
    setRecipe({...recipe, ...data})
  }

  const addIngredients = (array) => {
    setRecipe({
      ...recipe,
      ingredients: array
    })
  }

  return {
    steps,
    recipe,
    handleBack,
    handleNext,
    activeStep,
    buildFromInput, 
    addIngredients, 
  }
}

export function CocktailProvider({ children }) {
  const cocktail = useCocktailProvider();

  return (
    <CocktailContext.Provider value={cocktail}>
      {children}
    </CocktailContext.Provider>
  );
}
