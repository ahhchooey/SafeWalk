import React from 'react';
import $ from 'jquery';
import {connect} from 'react-redux';
import {toggleAllDirections, 
        toggleDangerZone, 
        toggleShowSearch, 
        toggleTurnByTurn, 
        toggleTripInfo,
        setRoute} from '../actions/ui_actions'

class DangerZone extends React.Component {
    constructor(props) {
        super(props);
        this.handleDanger = this.handleDanger.bind(this);
        this.handleSafe = this.handleSafe.bind(this);
        this.toggleHold = this.toggleHold.bind(this);
    }

    handleDanger(e) {
        e.preventDefault();
        this.props.toggleDangerZone();
        this.props.toggleTripInfo();
        this.props.toggleTurnByTurn();
        this.props.setRoute('fastest');
    }

    handleSafe(e) {
        e.preventDefault();
        this.props.toggleDangerZone();
        this.props.toggleTripInfo();
        this.props.toggleTurnByTurn();
        this.props.setRoute('safest');
    }

    toggleHold(e) {
        e.preventDefault();
        $(e.currentTarget).toggleClass('hold');
    }

    render() {
        if (!this.props.showDZ) {
            return <div></div>
        }

        return(
            <div className="tripdanger">
                <button className="safe" onMouseEnter={this.toggleHold} onMouseLeave={this.toggleHold} onClick={this.handleSafe}>Safest Route</button>
                <button className="danger" onMouseEnter={this.toggleHold} onMouseLeave={this.toggleHold} onClick={this.handleDanger}>Fastest Route</button>
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
    toggleTripInfo: () => dispatch(toggleTripInfo()),
    setRoute: str => dispatch(setRoute(str))
})

export default connect(mstp, mdtp)(DangerZone);