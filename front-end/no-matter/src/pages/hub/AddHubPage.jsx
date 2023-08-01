import * as React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepButton from '@mui/material/StepButton';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Bluetooth from './AddHub-Bluetooth'
import Wifi from './AddHub-Wifi'
import Complete from './AddHub-Complete'

const steps = [
  {
    label: 'Bluetooth 연결',
    component: <Bluetooth />,
  },
  {
    label: 'wifi 연결',
    component: <Wifi />,
  },
  {
    label: '허브 등록',
    component: <Complete />,
  },
];

export default function HorizontalNonLinearStepper() {
  const [activeStep, setActiveStep] = React.useState(0);
  const [completed, setCompleted] = React.useState({});

  const totalSteps = () => {
    return steps.length;
  };

  const completedSteps = () => {
    return Object.keys(completed).length;
  };

  const isLastStep = () => {
    return activeStep === totalSteps() - 1;
  };

  const allStepsCompleted = () => {
    return completedSteps() === totalSteps();
  };

  const handleNext = () => {
    const newActiveStep =
      isLastStep() && !allStepsCompleted()
        ? // It's the last step, but not all steps have been completed,
          // find the first step that has been completed
          steps.findIndex((step, i) => !(i in completed))
        : activeStep + 1;
    setActiveStep(newActiveStep);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleStep = (step) => () => {
    setActiveStep(step);
  };

  const handleComplete = () => {
    const newCompleted = completed;
    newCompleted[activeStep] = true;
    setCompleted(newCompleted);
    handleNext();
  };

  const handleReset = () => {
    setActiveStep(0);
    setCompleted({});
  };

  return (
    <Box sx={{ width: '100%' }}>
    <div className='m-5 text-center' style={{fontSize:"20px"}}>
      허브를 등록해주세요
    </div>
      <Stepper nonLinear activeStep={activeStep}>
        {steps.map((step, index) => (
          <Step key={step.label} completed={completed[index]}>
            <StepButton color="inherit" onClick={handleStep(index)}>
              {step.label}
            </StepButton>
          </Step>
        ))}
      </Stepper>
      <div>
        {allStepsCompleted() ? (
          <React.Fragment>
            <Typography sx={{ mt: 2, mb: 1 }}>
              All steps completed - you&apos;re finished
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
              <Box sx={{ flex: '1 1 auto' }} />
              <Button onClick={handleReset}>Reset</Button>
            </Box>
          </React.Fragment>
        ) : (
          <React.Fragment>
            <Typography sx={{ mt: 2, mb: 1, py: 1 }}>
              Step {activeStep + 1}
              

              <Stepper nonLinear activeStep={activeStep}>
                {steps.map((step, index) => (
                  <Step key={step.label} completed={completed[index]}>
                    {activeStep === index && step.component}
                  </Step>
                ))}
              </Stepper>

            </Typography>

            <Box className='d-flex justify-content-around mt-5' sx={{ display: 'flex', flexDirection: 'row', pt: 2 }} style={{width:"100%",position:"fixed", bottom:"90px"}}>
              <Button
                color="inherit"
                disabled={activeStep === 0}
                onClick={handleBack}
                sx={{ mr: 1 }}
              >
                Back
              </Button>
              
              {/* <Box sx={{ flex: '1 1 auto' }} /> */}
              
              {activeStep !== steps.length &&
                (completed[activeStep] ? (
                  <Button onClick={handleComplete}>
                    <Typography variant="caption" sx={{ display: 'inline-block' }} style={{color:"gray"}}>
                      Step {activeStep + 1} already completed
                    </Typography>
                  </Button>
                ) : (
                  <Button onClick={handleComplete}>
                    {completedSteps() === totalSteps() - 1
                      ? 'Complete'
                      : 'Next'}
                  </Button>
              ))}
            </Box>
          </React.Fragment>
        )}
      </div>
    </Box>
  );
}