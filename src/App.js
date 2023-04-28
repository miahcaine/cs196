import React, { useState } from 'react';
import Track from './Track.js'
import { ToolboxFunctions } from './Toolbox.js'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { v4 as uuidv4 } from 'uuid';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'

import { createTheme, ThemeProvider } from '@mui/material/styles';
import Button from '@mui/material/Button';

import {userSoundsData} from './UserData.js'
import { MakeyModal } from './MakeyModal';
import 'reactjs-popup/dist/index.css';
import './App.css';

// font awesome icons
library.add(fas)

const theme = createTheme({
  status: {
    danger: '#e53e3e',
  },
  palette: {
    neutral: {
      main: '#869949',
      contrastText: '#000',
    },
    bold: {
      main: '#87613B',
      contrastText: '#000',
    }
  },
  typography: {
    button: {
      fontWeight: 'bold',
      fontFamily: 'Restora'
    }
  }
});

const tracksData = [
  {
      trackId: uuidv4(),
      items: userSoundsData
  }
]

let clickStack = [];

function App() {
  // localStorage.clear();
  console.log(localStorage);

  const [showPopup, setShowPopup] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const addSequenceClick = () => {
    console.log("adding sequence");
    setShowPopup(true);
  };

  if (!localStorage.getItem("sequences")) {
    localStorage.setItem("sequences", JSON.stringify({}));
    localStorage.setItem("sequenceMaps", JSON.stringify({}));
  }

  if (!localStorage.getItem("tracks")) {
    console.log("adding tracks data")
    localStorage.setItem("tracks", JSON.stringify({}));
  }

  return (
    <div className="App">
        <header className="App-header">

            <Container className="App-container">
              <Row className="App-container">
                
                {/* "toolbox" area */}
                <Col sm={4} className="toolbox-container">

                  <ToolboxFunctions clickStack={clickStack} />

                  <ThemeProvider theme={theme}>
                    <div className="add-sequence-button">
                      <Button color="bold" onClick={addSequenceClick} variant='outlined'>add sequence</Button>
                    </div>
                  </ThemeProvider>
                  
                </Col>

                {/* "tracks" area */}
                <Col sm={8} className="tracks-container">
                  {tracksData.map((item) => {
                    return <Track key={item.trackId} item={item} index={tracksData.length} clickStack={clickStack}/>
                  })}

                  
                  <ThemeProvider theme={theme}>
                    {/* add track button */}
                    <Button variant="text" disableElevation color="neutral">
                      <FontAwesomeIcon icon="fa-solid fa-plus" />
                    </Button>

                    {/* play all tracks button */}
                    <Button variant="text" disableElevation color="neutral">
                      <FontAwesomeIcon icon="fa-solid fa-play" />
                    </Button>
                  </ThemeProvider>

                </Col>
              </Row>
            </Container>
          
        </header>
        <MakeyModal showPopup={showPopup} setShowPopup={setShowPopup} isRecording={isRecording} setIsRecording={setIsRecording}></MakeyModal>
      </div>
  );
}

export default App;
