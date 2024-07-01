import { Box, Grid, Step, StepLabel, Stepper, Typography } from "@mui/material";
import styles from "./styles/Register.module.css";
import Input from "../../components/FormInput";
import Form from "../../components/Form";
import { useState } from "react";
import PersonalInformation from "./PersonalInformation";
import LoginInformation from "./LoginInformation";
import Button from "../../components/Button";

const steps = ["Personal Information", "Login Information"];

const Register = () => {
  const [activeStep, setActiveStep] = useState(0);

  return (
    <div>
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
      {activeStep === steps.length ? (
        <>
          <Typography sx={{ mt: 2, mb: 1 }}>
            All steps completed - you&apos;re finished
          </Typography>
        </>
      ) : 
        activeStep === 0 ? 
        <PersonalInformation /> : <LoginInformation />
      }
      <div className={styles.main_buttons}>
        <Button
          onClick={console.log("Êh Merda")}
          disableRipple
          text="Next"
        />
      </div>
    </div>
  );
};

export default Register;
