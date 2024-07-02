import { Box, Grid, Step, StepLabel, Stepper, Typography } from "@mui/material";
import { useState } from "react";
import PersonalInformation from "./PersonalInformation";
import LoginInformation from "./LoginInformation";
import Button from "../../components/Button";

import styles from "./styles/Register.module.css";

const steps = ["Personal Information", "Login Information", "Preferences"];

const style = {
  "& .MuiStepLabel-root .Mui-completed": {
    color: "green", // circle color (COMPLETED)
  },
  "& .MuiStepLabel-label.Mui-completed.MuiStepLabel-alternativeLabel": {
    color: "#FFF", // Just text label (COMPLETED)
  },
  "& .MuiStepLabel-root .Mui-active": {
    color: "#FFF", // circle color (ACTIVE)
  },
  "& .MuiStepLabel-label.Mui-active.MuiStepLabel-alternativeLabel": {
    color: "#FFF", // Just text label (ACTIVE)
  },
  "& .MuiStepLabel-root .Mui-active .MuiStepIcon-text": {
    fill: "#000", // circle's number (ACTIVE)
  },
  "& .MuiStepIcon-root": {
    color: "#666",
  },
  "& .MuiStepLabel-labelContainer": {
    color: "#666",
  },
};

const Register = () => {
  const [activeStep, setActiveStep] = useState(0);
  const renderedStep = [<PersonalInformation />, <LoginInformation />];
  const [isLastStep, setIsLastStep] = useState(false);

  const handleStep = (action) => {
    if (action === 'increment') {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    } else {
      setActiveStep((prevActiveStep) => prevActiveStep - 1);
    }
  };

  return (
    <>
      <Box sx={style}>
        <Stepper activeStep={activeStep}>
          {steps.map((label, index) => {
            const stepProps = {};
            const labelProps = {};

            return (
              <Step key={label} {...stepProps}>
                <StepLabel {...labelProps}>{label}</StepLabel>
              </Step>
            );
          })}
        </Stepper>
      </Box>
      <Box className={styles.main}>
        <Box className={styles.register_box}>
          {renderedStep[activeStep]}
          <div className={styles.main_buttons}>
            <Grid container>
              <Grid item xs={6} sx={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "start",
              }}>
                {activeStep !== 0 && <Button text="Back" onClick={() => handleStep('decrement')} />}
              </Grid>
              <Grid item xs={6} sx={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "end",
              }}>
                <Button
                  onClick={() => handleStep('increment')}
                  text={activeStep === 2 ? "Finish" : "Next"}
                />
              </Grid>
            </Grid>
          </div>
        </Box>
      </Box>
    </>
  );
};

export default Register;
