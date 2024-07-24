import React, { Component } from 'react';
import CanvasSvg from "./canvasSVG";
import { getFibTree, getTree } from "./fib";
import Menu from "./menu";
import Navbar from "./navbar";
import Details from "./details";

class Graph extends Component {
    constructor() {
        super();
        this.state = {
            root: undefined,
            vertices: [],
            edges: [],
            current: -1,
            n: 0,
            r: 2,
            algo: 0,
            offset: 0,
            isRunning: false // State variable to track if the algorithm is running
        };
    }

    setAlgo = (pos, val) => {
        if (!this.state.isRunning) { // Check if algorithm is not running
            if (pos === 0) {
                this.setState({ algo: val });
            }
        }
    }

    setN = (pos, val) => {
        if (!this.state.isRunning) { // Check if algorithm is not running
            if (pos === 0) {
                this.setState({ n: val });
            }
        }
    }

    setR = (pos, val) => {
        if (!this.state.isRunning) { // Check if algorithm is not running
            if (pos === 0) {
                this.setState({ r: val });
            }
        }
    }

    addNumber = async () => {
        if (!this.state.isRunning) { // Check if algorithm is not running
            this.setState({ isRunning: true }); // Set isRunning to true when algorithm starts
            let tree = getTree(this.state.n, this.state.algo, this.state.r);
            this.setState({ edges: [], vertices: [], offset: tree.x });
            this.state.vertices = [];
            await this.recur(tree, undefined);
            this.setState({ isRunning: false }); // Set isRunning to false when algorithm finishes
        }
    }

    resetState = () => {
        if (!this.state.isRunning) { // Check if algorithm is not running
            this.setState({
                root: undefined,
                vertices: [],
                edges: [],
                current: -1,
                n: 0,
                r: 2,
                algo: 0,
                offset: 0
            });
        }
    };

    recur = async (node, parent) => {
        let vertices = this.state.vertices;
        let current = this.state.vertices.length;

        if (parent !== undefined) {
            if (node.children.length)
                vertices.push({ label: node.tree.label, val: 0, x: node.x, y: node.y, px: parent.x, py: parent.y });
            else
                vertices.push({ label: node.tree.label, val: node.tree.node, x: node.x, y: node.y, px: parent.x, py: parent.y });
            this.setState({ vertices, current });

            let edges = this.state.edges;
            edges.push({
                x1: parent.x,
                y1: parent.y,
                x2: node.x,
                y2: node.y
            });
            this.setState({ edges });
        } else {
            if (node.children.length)
                vertices.push({ label: node.tree.label, val: 0, x: node.x, y: node.y, px: node.x, py: node.y });
            else
                vertices.push({ label: node.tree.label, val: node.tree.node, x: node.x, y: node.y, px: node.x, py: node.y });
            this.setState({ vertices, current });
        }
        await sleep(500);

        for (let i = 0; i < node.children.length; i++) {
            await this.recur(node.children[i], node);
            this.setState({ current });
            await sleep(500);
        }
        let verticess = [...this.state.vertices];
        verticess[current].val = node.tree.node;
        this.setState({ vertices: verticess });
    }

    render() {
        return (
            <div>
                <Navbar />
                <Menu
                    setN={this.setN}
                    setR={this.setR}
                    setAlgo={this.setAlgo}
                    onStart={this.addNumber}
                    onReset={this.resetState}
                    disable={this.state.isRunning} // Disable buttons when algorithm is running
                />
                <Details algo={this.state.algo} />
                <CanvasSvg
                    vertices={this.state.vertices}
                    edges={this.state.edges}
                    current={this.state.current}
                    offset={this.state.offset}
                />
            </div>
        );
    }
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

export default Graph;
