import React from 'react';
import "./Legend.scss";

const Legend = () => {
    return (
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-auto legend-item">
                    <div className="node start-node"></div>
                    <span>Start Node</span>
                </div>
                <div className="col-auto legend-item">
                    <div className="node target-node"></div>
                    <span>Target Node</span>
                </div>
                <div className="col-auto legend-item">
                    <div className="node wall-node"></div>
                    <span>Wall Node</span>
                </div>
                <div className="col-auto legend-item">
                    <div className="node unvisited-node"></div>
                    <span>Unvisited Node</span>
                </div>
                <div className="col-auto legend-item">
                    <div className="node visited-node"></div>
                    <span>Visited Node</span>
                </div>
                <div className="col-auto legend-item">
                    <div className="node shortest-path-node"></div>
                    <span>Shortest Path Node</span>
                </div>
            </div>
        </div>
    );
}
 
export default Legend;
