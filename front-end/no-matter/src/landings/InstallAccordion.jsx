import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

export default function BasicAccordion() {
  return (
    <div className='mt-3 mb-5'>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography variant="h6" sx={{fontWeight: 'bold'}}>모바일 앱 설치 방법 확인하기</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography sx={{ lineHeight: 3 }}>
            1. Android 기기에서 Chrome <img src="/images/chrome.png" alt="chrome" style={{width: "20px"}}/> 으로 접속합니다.
          </Typography>
          <Typography sx={{ lineHeight: 3 }}>
            2. <b>설치</b>를 탭합니다.
          </Typography>
          <Typography sx={{ lineHeight: 3 }}>
            3. 화면에 표시된 안내를 따릅니다.
          </Typography>
        </AccordionDetails>
      </Accordion>
    </div>
  );
}
