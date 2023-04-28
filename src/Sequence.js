import React from 'react';
import { ToolboxFunctions } from './Toolbox.js'

// TODO: can remove passing in items and index to functions
class Sequence extends React.Component {
    constructor(props) {
        super(props);
        this.item = props.item;
        this.index = props.index;
        this.clickStack = props.clickStack;
        this.state = {
            clickedClass: "unclicked",
            type: "seq"
        }
    }

    handleClick = (e) => {
        switch (e.detail) {
            default: // single click
                this.handleSequenceClick(this.index, this.clickStack);
                break;
            case 2: // double click
                this.handleDelete(this.index);
                break;
        }
    }

    handleSequenceClick(index, clickStack) {
        console.log("sequence " + index + " clicked");
        if (clickStack.length === 0) {
            clickStack.push(this)
            this.setState({clickedClass: "clicked"});
        } else {
            let lastElementInStack = this.clickStack.pop();
            console.log("stack not empty");
            if (lastElementInStack.state.type === "track") {

                console.log("attaching sound to track");
                // ! TODO

            } else if (lastElementInStack.state.type === "seq") {

                console.log("sequence in stack");
                // clear the stack
                lastElementInStack.setState({clickedClass:"unclicked"});
                if (lastElementInStack.index !== this.index) {
                    // this.setState({clickedClass:"unclicked-sequence"});
                    this.setState({clickedClass: "clicked"})
                    clickStack.push(this)
                }

            }
        }
        
        console.log(clickStack);
        ToolboxFunctions({clickStack: clickStack});
    }

    handleDelete (index) {
        console.log("DELETING SEQUENCE")
        let seqData = JSON.parse(localStorage.getItem("sequences"));
        let mapData = JSON.parse(localStorage.getItem("sequenceMaps"));
        delete seqData[index];
        delete mapData[index];
        localStorage.setItem("sequences", JSON.stringify(seqData));
        localStorage.setItem("sequenceMaps", JSON.stringify(mapData));
        window.location.reload()
    }

    render() {
        if (this.item) {
            return (
                <div>
                    <li className={'sequence-listitem ' + this.state.clickedClass} 
                    onClick={this.handleClick}>
                    {/* onDoubleClick={() => this.handleDelete(e, this.item, this.index)}> */}
                        <div index={this.index} className="sequence-innerdiv" style={{backgroundColor: "blue"}}></div>
                    </li> 
                </div>
            )
        }
    }

}

export default Sequence;