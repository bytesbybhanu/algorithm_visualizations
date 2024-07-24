



import React, { Component } from "react";
import { Nav, Navbar, NavDropdown } from 'react-bootstrap';
import '../../styles/Sorting.css'; // Assuming this is your CSS file path
import { motion } from "framer-motion";
import selectionSort from "./SelectionSort";
import mergeSort from "./MergeSort";
import quickSort from "./QuickSort";
import { NavLink } from "react-router-dom";

const springAnim = {
    type: "spring",
    damping: 20,
    stiffness: 300
};

class Sorting extends Component {
    constructor() {
        super();
        this.state = {
            arr: [],
            method: "Algorithms",
            length: 0,
            compare: {
                i: null,
                j: null
            },
            sorted: [],
            speed: 100,
            isSorting: false // Track if sorting is in progress
        };
        this.timeoutIds = []; // Initialize array for timeout IDs
    }

    createArray = (e = Math.floor(window.innerWidth / 50) / 2) => {
        let arr = [];
        for (let i = 0; i < e; i++) {
            arr.push({
                value: Math.floor(Math.random() * ((window.innerHeight / 4) - 30 + 1)) + 30,
                id: "id-" + i
            });
        }
        this.setState({
            arr: arr,
            length: e,
            sorted: [],
            compare: {}
        });
    };

    changeArray = (e) => {
        this.createArray(e.target.value);
    };

    componentDidMount() {
        this.createArray();
        window.addEventListener("resize", this.createArray);
    }

    componentWillUnmount() {
        window.removeEventListener("resize", this.createArray);
    }

    randomize = () => {
        this.createArray(this.state.length);
    };

    sortFunc = (e) => {
        e.preventDefault();
        const arr = this.state.arr;
        const length = this.state.arr.length;
        let results = [];

        // Hide the error initially
        const errorElement = document.getElementById("error");
        if (errorElement) {
            errorElement.style.display = "none";
        }

        // Show error if no algorithm selected
        if (this.state.method === "Algorithms") {
            if (errorElement) {
                errorElement.style.display = "block";
            }
        } else {
            if (!this.state.isSorting) { // Check if sorting is not already in progress
                this.setState({ isSorting: true }); // Set isSorting to true while sorting
                if (this.state.method === "Selection Sort") {
                    results = selectionSort(arr, length);
                } else if (this.state.method === "Merge Sort") {
                    results = mergeSort(arr, length);
                } else if (this.state.method === "Quick Sort") {
                    results = quickSort(arr, length);
                }

                // Update state with sorted results
                for (let i = 0; i < results.length; i++) {
                    const timeoutId = setTimeout(() => {
                        this.setState({
                            arr: results[i]
                        });
                    }, this.state.speed * i);
                    this.timeoutIds.push(timeoutId); // Store timeout ID
                }
                const finalTimeoutId = setTimeout(() => {
                    this.setState({ isSorting: false }); // Reset isSorting to false after sorting completes
                }, this.state.speed * results.length);
                this.timeoutIds.push(finalTimeoutId); // Store final timeout ID
            }
        }
    };

    changeSpeed = (e) => {
        this.setState({
            speed: 1100 - e.target.value
        });
    };

   reset = () => {
    // Clear any pending timeouts
    for (let i = 0; i < this.timeoutIds.length; i++) {
        clearTimeout(this.timeoutIds[i]);
    }

    // Reset array to original or random position
    this.createArray(this.state.length);

    // Reset state to stop sorting
    this.setState({
        method: "Algorithms",
        compare: {
            i: null,
            j: null
        },
        sorted: [],
        speed: 100,
        isSorting: false // Reset isSorting flag
    });
};

    render() {
        return (
            <div>
                <Navbar expand="lg" bg="dark" variant="dark">
                    <Navbar.Brand href="#">
                        Sorting
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="navbarSupportedContent" />
                    <Navbar.Collapse id="navbarSupportedContent">
                        <Nav className="mr-auto">
                            <Nav.Link as={NavLink} exact to="/">
                                Home
                            </Nav.Link>
                            <Nav.Link onClick={this.randomize}>
                                Randomize
                            </Nav.Link>
                            <NavDropdown title={this.state.method} id="navbarDropdownMethod">
                                <NavDropdown.Item onClick={() => this.setState({ method: "Selection Sort" })}>
                                    Selection Sort
                                </NavDropdown.Item>
                                <NavDropdown.Item onClick={() => this.setState({ method: "Merge Sort" })}>
                                    Merge Sort
                                </NavDropdown.Item>
                                <NavDropdown.Item onClick={() => this.setState({ method: "Quick Sort" })}>
                                    Quick Sort
                                </NavDropdown.Item>
                            </NavDropdown>
                            <NavDropdown title="Controls" id="navbarDropdownControls">
                                <NavDropdown.Item>
                                    <input onChange={this.changeArray} type="range" min="2" max={Math.floor(window.screen.width / 50)} defaultValue={Math.floor((window.screen.width / 50) / 2)} id="changeSize" />
                                    Increase Array Size
                                </NavDropdown.Item>
                                <NavDropdown.Item>
                                    <input onChange={this.changeSpeed} type="range" min="100" max={1000} defaultValue={500} id="changeSpeed" />
                                    Increase Speed
                                </NavDropdown.Item>
                            </NavDropdown>
                            <Nav.Link onClick={this.reset}>
                                Reset
                            </Nav.Link>
                        </Nav>
                        <form className="form-inline my-2 my-lg-0">
                            <button className="btn btn-outline-success my-2 my-sm-0" type="submit" onClick={this.sortFunc}>
                                Sort
                            </button>
                        </form>
                    </Navbar.Collapse>
                </Navbar>
                <div className="bars" id="bars" style={{ margin: "20px" }}>
                    {this.state.arr.map((element, index) => (
                        <motion.div
                            key={element.id}
                            layout
                            transition={springAnim}
                            className={`bar ${element.style}`}
                            id={element.id}
                            style={{ height: element.value * 3, order: index }}
                        >
                            {element.value}
                        </motion.div>
                    ))}
                </div>
                <div id="error" className="alert alert-danger" style={{ marginLeft: "10px", display: "none" }} role="alert">
                    Select an algorithm first!
                </div>
            </div>
        );
    }
}

export default Sorting;








