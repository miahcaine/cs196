import Row from 'react-bootstrap/Row';
import React from 'react';
import { v4 as uuidv4 } from 'uuid';
import Button from '@mui/material/Button';
import { createTheme, ThemeProvider } from '@mui/material/styles';

class Track extends React.Component {
    constructor(props) {
        super(props);
        this.clickStack = props.clickStack;
        this.index = props.index;

        // check if there is already info for a track in local storage
        let tracksData = JSON.parse(localStorage.getItem("tracks"));
        if (!tracksData[this.index]){
            tracksData[this.index] = [];
            localStorage.setItem("tracks", JSON.stringify(tracksData));
        };

        // saved in local storage under "tracks" key with index
        this.sequencesInTrack = tracksData[this.index]; // list of sequences in the track
        this.state = {
            clickedClass: "unclicked",
            type: "seq"
        }
    }

    addSequenceToTrackInStorage(sequenceIndex) {
        let tracksDataString = localStorage.getItem(`tracks`);

        // parse info in the track
        let tracksDataJson = JSON.parse(tracksDataString);
        let curTrack = tracksDataJson[`${this.index}`];
        console.log(`${curTrack} - type: ${typeof(curTrack)}`);
        // add sequence to the curTrack
        curTrack.push(sequenceIndex);
        // readd the list to the storage
        tracksDataJson[`${this.index}`] = curTrack;
        this.sequencesInTrack = curTrack;
        localStorage.setItem(`tracks`, JSON.stringify(tracksDataJson));
    }

    handleTrackClick(item, index, clickStack) {
        console.log("track " + this.index + " clicked");
        if (this.clickStack.length === 0) {
            this.clickStack.push(this)
            this.setState({clickedClass: "clicked"});
        } else {
            let lastElementInStack = this.clickStack.pop();
            console.log("stack not empty");
            if (lastElementInStack.state.type === "track") {

                console.log("track in stack");
                // clear the stack
                lastElementInStack.setState({clickedClass:"unclicked"});
                if (lastElementInStack.index !== this.index) {
                    this.setState({clickedClass: "clicked"})
                    this.clickStack.push(this)
                }

            } else if (lastElementInStack.state.type === "seq") {
                console.log("adding sequence to track!")
                lastElementInStack.setState({clickedClass:"unclicked"});
                this.addSequenceToTrackInStorage(lastElementInStack.index);
                // add the index of which sequence is in the track
                
                console.log("pushed to track sequence "+ lastElementInStack.index);
            }
        }
        
        console.log(this.clickStack);
        window.location.reload();
    }

    render() {
        console.log("SEQUENCES IN TRACK");
        console.log(this.sequencesInTrack);
        return (
            // play button
            // stop button
            <Row>
                <div className="track-div" onClick={() => this.handleTrackClick(this.clickStack)}>
                    {this.renderSequences()}
                </div>
            </Row>
        )
    }

    handleDeleteSequenceClick = (indexInTrack) => {
        console.log("clicked delete button");
        // handle delete
        console.log("deleting sequence in track");
        this.sequencesInTrack.pop(indexInTrack);
        window.location.reload();
    }

    renderSequences = () => {
        let renderedSequences = [];
        console.log(localStorage);
        let mappedData = JSON.parse(localStorage.getItem("sequenceMaps"));
        let sequenceData = JSON.parse(localStorage.getItem("sequences"));
        this.sequencesInTrack.forEach((index, sequenceIdx) => {
            // add duration, index, and color
            renderedSequences.push(
                // TODO: fix buttons not showing on track
                <Button key={uuidv4()} className="track-sequence" onClick={(index) => this.deleteTrackSequenceClick(index)}/>
            )
        });
        return(renderedSequences);
    }
}
export default Track;
