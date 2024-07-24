import React, {Component} from 'react';
import '../../styles/TuringMachine.css'
class Cell extends Component {
    render() {
        return (
            <div className={'turing-cell'}>
                {this.props.val}
            </div>
        );
    }
}

export default Cell;