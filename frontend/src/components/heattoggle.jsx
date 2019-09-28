import React from 'react';
import {toggleHeat} from '../actions/ui_actions';
import {connect} from 'react-redux';


const mstp = state =>({
    showHeat: state.ui.showHeat
}
)
const mdtp = dispatch => ({
    toggleHeat: () => dispatch(toggleHeat())
})

class HeatToggle extends React.Component {
    constructor(props) {
        super(props);
        this.toggle = this.toggle.bind(this);
    }

    toggle(e){
        e.stopPropagation();
        this.props.toggleHeat();
    }

    render() {
        return(
            <div className="heatToggle" onClick={this.toggle}>
                Show Heatmap
            </div>
        )
    }
}

export default connect(mstp, mdtp)(HeatToggle);