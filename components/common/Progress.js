import React from "react";
import { Box, Step, StepButton, StepLabel, Stepper } from "@mui/material";

const Progress = ({ stepsNumber, currentStep }) => {
  const steps = Array.from({ length: stepsNumber }, (_, index) => index + 1);
  return (
    <div
      className="w-full relative lg:-left-24 h-16 rounded-t-3xl bg-white z-[1] pt-4"
      dir="ltr"
    >
      <Box sx={{ width: "100%" }}>
        <Stepper activeStep={currentStep} alternativeLabel>
          {steps.map((step) => (
            <Step>
              <StepLabel />
            </Step>
          ))}
        </Stepper>
      </Box>
    </div>
  );
};

export default Progress;
