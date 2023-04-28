import React from "react";

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import { userSoundsData } from './UserData.js'

// in the keyboard
// run a python script that records the keypresses from the keyboard
// update the data in the functions thing

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
    borderRadius: '10px'
};

// TODO: add all valid keys that makey can register
// TODO: specify a "pause"/"rest" key?...
const validKeys = new Set(['a', 'b', 'c', 'd', 'e', 'f']);

const addFunctionIntoLocalStorage = (listOfInputs) => {
    console.log("ADDING SEQUENCE TO LOCAL STORAGE")
    // get total number of entries in local storage 
    let seqData = JSON.parse(localStorage["sequences"]);
    console.log("sequence data:", seqData);
    let mapData = JSON.parse(localStorage["sequenceMaps"]);
    let totalFxns = Object.keys(seqData).length;
    console.log("total fxns:", totalFxns);

    // create random map of keys to sounds to start 
    // TODO: (add ability to change sounds in variables)
    let keyToSoundMap = {};
    listOfInputs.forEach((key) => {
        keyToSoundMap[key] = userSoundsData[Math.floor(Math.random() * userSoundsData.length)].path;
    })
    // add listOfInputs into the localStorage with (seq+num) : (listOfInputs)
    // localStorage.setItem(`seq${totalFxns + 1}`, listOfInputs)
    seqData[totalFxns] = listOfInputs

    // add keyToSoundMap to localStorage with (map+num) : (keyToSoundMap)
    // localStorage.setItem(`map${totalFxns + 1}`, JSON.stringify([...keyToSoundMap]));
    mapData[totalFxns] = keyToSoundMap;

    localStorage.setItem("sequences", JSON.stringify(seqData));
    localStorage.setItem("sequenceMaps", JSON.stringify(mapData));

    // on render, can just get saved functions from storage
    console.log("LOCAL STORAGE", localStorage);
};

const launchMakey = (event, setIsRecording) => {
    console.log("RECORDING KEYPRESSES");
    setIsRecording(true);
    let pressedKeys = [];

    let recordKeyPresses = (event) => {
        // TODO: maybe makes sense to play a metronome sound for people to time the sounds?

        var name = event.key;

        // if the key pressed is the esc key or a button is clicked on screen, cancel or finish recording
        if (name === "q") {
            console.log("stop record button pressed, stopping recording");
            document.removeEventListener("keypress", recordKeyPresses);
            console.log(pressedKeys);
            setIsRecording(false);

            // save 'recorded' keys into local storage
            if (pressedKeys.length > 0) {
                addFunctionIntoLocalStorage(pressedKeys);
            }
        }

        // if the key is in the valid keys, push to pressed keys
        if (validKeys.has(name)) {
            console.log(`pushed valid key: ${name}`)
            pressedKeys.push(name);
        }
    }

    // begin recording keypresses
    document.addEventListener('keypress', recordKeyPresses, false);

}

export const MakeyModal = ({ showPopup, setShowPopup, isRecording, setIsRecording }) => {

    const handleSeqClose = () => setShowPopup(false);

    // style this better :( 
    return (
        <Modal
            open={showPopup}
            onClose={handleSeqClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >

            {
                isRecording ?
                    <Box sx={style}>
                        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                            Currently recording keypresses! Press "Q" to quit.
                        </Typography>
                    </Box>
                    :
                    <Box sx={style}>
                        <Typography id="modal-modal-title" variant="h6" component="h2">
                            Click below to begin recording Makey Makey input
                        </Typography>
                        <Button onClick={(e) => launchMakey(e, setIsRecording)}> RECORD </Button>
                    </Box>
            }

        </Modal>)
};