import React from 'react';
import {connect} from 'react-redux';
import {toggleTripInfo} from '../actions/ui_actions';
import './stylesheets/tripinfo.scss'


class TripInfo extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return(
            <div className="tripinfo">React is broke homie</div>
        )
    }
}

const mstp = (state) => ({
    showTripInfo: state.ui.showTripInfo
})

const mdtp = (dispatch) => ({
    toggleTripInfo: () => dispatch(toggleTripInfo())
})

export default TripInfo;