import React from 'react';
import {connect} from 'react-redux';
import {toggleAllDirections, 
        toggleDangerZone, 
        toggleShowSearch, 
        toggleTurnByTurn, 
        toggleTripInfo} from '../actions/ui_actions'

class DangerZone extends React.Component {
    constructor(props) {
        super(props);
        this.handleDanger = this.handleDanger.bind(this);
        this.handleSafe = this.handleSafe.bind(this);
    }

    handleDanger(e) {
        e.preventDefault();
        this.props.toggleDangerZone();
        this.toggleTripInfo();
        this.toggleTurnByTurn();
    }

    handleSafe(e) {
        e.preventDefault();
        this.props.toggleDangerZone();
        this.props.toggleTripInfo();
        this.props.toggleTurnByTurn();

    }

    render() {
        if (!this.props.showDZ) {
            return <div></div>
        }

        return(
            <div className="tripdanger">
                <button className="safe" onClick={this.handleSafe}></button>
                <button className="danger" onClick={this.handleDanger}></button>
            </div>
        )
    }
}

const mstp = state => 
    {
    return { showDZ: state.ui.showDZ}
}

const mdtp = dispatch => ({
    toggleAllDirections: () => dispatch(toggleAllDirections()),
    toggleDangerZone: () => dispatch(toggleDangerZone()),
    toggleShowSearch: () => dispatch(toggleShowSearch()),
    toggleTurnByTurn: () => dispatch(toggleTurnByTurn()),
    toggleTripInfo: () => dispatch(toggleTripInfo())
})

export default connect(mstp, mdtp)(DangerZone);