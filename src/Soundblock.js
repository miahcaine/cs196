import React from 'react';
import { Draggable } from 'react-beautiful-dnd'
import { userSoundsData } from './UserData.js'
// import { ToolboxSounds } from './Toolbox.js'

class Soundblock extends React.Component {
    constructor(props) {
        super(props);
        this.item = props.item;
        this.index = props.index;
        this.clickStack = props.clickStack;
        this.state = {
            clickedClass: "unclicked-sound"
        }
    }

    handleSoundClick(item, index, clickStack) {
        console.log("soundblock " + index + " clicked");
        if (clickStack.length === 0) {
            clickStack.push(
                {
                    type: "sound",
                    index: index
                }
            )
            this.setState({clickedClass: "clicked-sound"});
        } else {
            console.log("stack not empty");
            if (clickStack[0].type === "track") {
                console.log("attaching sound to track");
            } else if (clickStack[0].type === "function") {
                // clear the stack
                console.log("function in stack")
            } else { // the stack has a sound in it
                console.log("sound in stack");
                if (clickStack[0].index === index) {
                    this.setState({clickedClass: "unclicked-sound"});
                } else {
                    userSoundsData[clickStack[0].index].clickedClass = "unclicked-sound";
                    clickStack.push(
                        {
                            type: "sound",
                            index: index
                        }
                    )
                    this.setState({clickedClass: "clicked-sound"});
                }
                this.clickStack.pop();
            }
        }
        
        // this.render();
        console.log(clickStack);
        // ToolboxSounds({clickStack: clickStack});
    }

    render() {
        if (this.item) {
            return (
                // <Draggable draggableId={item.path} key={item} index={index}>
                    // {(provided) => (
                        <div
                            // ref={provided.innerRef} 
                            // {...provided.dragHandleProps}
                            // {...provided.draggableProps}
                        >
                            <li className={'soundblock-listitem ' + this.state.clickedClass} onClick={() => this.handleSoundClick(this.item, this.index, this.clickStack)}>
                                <div index={this.index} className="soundblock-innerdiv" style={{backgroundColor: this.item.color}}></div>
                            </li> 
                        </div>
                    // )}
                    
                // </Draggable>
            )
        }
    }

}

export default Soundblock;