import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

export default function BasicAccordion() {
  return (
    <div className='mt-3'>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography><h5>앱 설치 방법 확인하기</h5></Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            <p>1. Android 기기에서 Chrome <img src="/images/chrome.png" alt="chrome" style={{width: "20px"}}/> 으로 접속합니다.</p>
            <p>2. <b>설치</b>를 탭합니다.</p>
            <p>3. 화면에 표시된 안내를 따릅니다.</p>
          </Typography>
        </AccordionDetails>
      </Accordion>
    </div>
  );
}
