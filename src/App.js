import { useState } from 'react';
import { Button, Stack } from '@mui/material';
import Selector from './Selector';

const App = () => {
  const [file, setFile] = useState();
  const [calibration, setCalibration] = useState({
    x: -50,
    y: 100,
    width: 200,
    height: 200,
  });
  const [position, setPosition] = useState({
    x: -50,
    y: 100,
    width: 200,
    height: 200,
  });

  const [result, setResult] = useState({
    xmin: 0,
    ymin: 0,
    xmax: 0,
    ymax: 0,
  });

  const actions = ['Calibrate', 'Set Work Window', 'Back To Calibration'];

  const [displayCalibration, setDisplayCalibration] = useState(false);

  const [step, setStep] = useState(0);

  const onUploadFile = (event) => {
    setStep(0);
    const uploadedFile = event.target.files[0];
    const reader = new FileReader();

    reader.onload = () => {
      const fileDataUrl = reader.result;
      setFile(fileDataUrl);
    };

    reader.readAsDataURL(uploadedFile);
  };

  const onCalibrate = () => {
    const _step = (step + 1) % 3;
    if (_step === 2) {
      onCalculate();
      setDisplayCalibration(true);
    } else {
      setDisplayCalibration(false);
    }
    setStep(_step);
  };

  const onCalculate = () => {
    const xmin = (position.x - calibration.x) / calibration.width;
    const ymin = (position.y - calibration.y) / calibration.height;
    const xmax = position.width / calibration.width;
    const ymax = position.height / calibration.height;
    setResult({
      xmin: xmin,
      ymin: ymin,
      xmax: xmax,
      ymax: ymax,
    });
  };

  return (
    <Stack alignItems="center" justifyContent="center" spacing={5}>
      <p>This is an application for pdf rendering and zone selection</p>
      <input type="file" accept=".pdf" onChange={onUploadFile} />
      {file && (
        <Stack alignItems="center" justifyContent="center">
          {step === 0 && (
            <Selector
              position={calibration}
              setPosition={setCalibration}
              color="red"
            />
          )}
          {step === 1 && (
            <Selector
              position={position}
              setPosition={setPosition}
              color="green"
            />
          )}
          <embed
            src={file + '#toolbar=0'}
            type="application/pdf"
            width="350px"
            height="550px"
            style={{
              zIndex: 1,
              position: 'absolute',
              top: '23%',
              borderColor: 'black',
              border: 'solid',
            }}
          />
          <Stack
            direction="row"
            spacing={5}
            alignItems="center"
            justifyContent="center"
          >
            <Button variant="contained" onClick={onCalibrate}>
              {actions[step]}
            </Button>
            {displayCalibration && <p>{JSON.stringify(result)}</p>}
          </Stack>
        </Stack>
      )}
    </Stack>
  );
};

export default App;
