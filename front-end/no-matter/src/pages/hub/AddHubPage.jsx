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
import axios from 'axios';
import Loading from '../../components/LoadingSpinner'
import { useNavigate } from 'react-router-dom';

const steps = [
  {
    label: 'Bluetooth',
    label2: '연결',
    component: <Bluetooth />,
  },
  {
    label: 'wifi',
    label2: '연결',
    component: <Wifi />,
  },
  {
    label: '허브',
    label2: '등록',
    component: <Complete />,
  },
];

  const AddHub = () => {
    const navigate = useNavigate();
    axios({
      method:'Post',
      url: 'http://localhost:8080/api/v1/userhub/register'
    })
    .then((response) => {
      console.log(response)
      navigate('/hubs');    
    })
    .catch((error) => {
      console.log(error)
    })  
  return(
    <div>
      <Loading/>
      <p style={{marginTop:"15px"}}>연결중</p>      
    </div>
  )}


export default function HorizontalNonLinearStepper() {
  const [activeStep, setActiveStep] = React.useState(0);
  const [completed, setCompleted] = React.useState({});
  // const [allCompleted, setAllCompleted] = React.useState(false);

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
    // setAllCompleted(true)
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
    <div className='page-container container'> 
      <Box sx={{ width: '100%' }}>
      <div className='text-center' style={{fontSize:"20px", margin:"45px"}}>
        허브를 등록해주세요
      </div>
        <Stepper nonLinear activeStep={activeStep}>
          {steps.map((step, index) => (
            <Step key={step.label} completed={completed[index]}>
              <StepButton color="inherit" onClick={handleStep(index)} style={{position:"relative"}}>
                {step.label}<br />
                {step.label2}
              </StepButton>
            </Step>
          ))}
        </Stepper>
        <div>
          {allStepsCompleted() ? (
            <div style={{position:"absolute", top:"300px", left:"45%"}}>
              <AddHub />
            </div>

          ) : (
            <React.Fragment>
              <div sx={{ mt: 2, mb: 1, py: 1 }} >
                <span style={{fontSize:"20px", fontStyle:"bold", margin:"0px 0px 10px 0px"}}>
                  Step {activeStep + 1}
                </span>
                <br />
                {/* <Stepper nonLinear activeStep={activeStep}> */}
                  {steps.map((step, index) => (
                    <Step key={step.label} completed={completed[index]}>
                      {activeStep === index && step.component}
                    </Step>
                  ))}
                {/* </Stepper> */}
              </div>

              <Box className='d-flex justify-content-evenly mt-5' sx={{ display: 'flex', flexDirection: 'row', pt: 2, width:"100%",position:"fixed", bottom:"90px"}} >
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
                      <Typography variant="caption" style={{color:"gray"}}>
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
    </div>
  );
}