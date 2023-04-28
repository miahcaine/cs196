import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Sequence from './Sequence.js'


function ToolboxFunctions(props){
    // TODO: add scroll
    let clickStack = props.clickStack;
    let savedSequences = JSON.parse(localStorage.getItem("sequences"));
    console.log("sequences from storage", savedSequences);
    console.log("sequences object from storage", Object.values(savedSequences));
    return(
        <div className="toolbox-functions">
            <h4>sequences</h4>
            <ul className="savedSequences">
                    {
                        Object.values(savedSequences).map((item, index) => { 
                            return (
                                <div key={index} id={"sequence-div-"+index}>
                                    {/* <Sequence item={item} index={index} clickStack={clickStack}/> */}
                                    <Sequence item={item} index={index} clickStack = {clickStack}/>
                                </div>
                            )
                        }
                    )}
                </ul>
        </div>
    )
}


export { ToolboxFunctions };