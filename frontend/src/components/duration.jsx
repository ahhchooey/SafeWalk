import React from 'react';
import {connect} from 'react-redux';
import {toggleTripInfo} from '../actions/ui_actions';
import './stylesheets/tripinfo.scss'


class TripInfo extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        let dist;
        let duration;
        if (this.props.currentDist) {
            dist = `(${(this.props.currentDist / 1000).toFixed(2)} km)`;
            duration = `${Math.round(this.props.tripTime / 60)} min`;
            console.log(duration)
        } else {
            dist = null;
            duration = null;
        }
        return(
            <div className="tripinfo">
                <div className="tripstats">{duration} {dist}</div>
                <div></div>
            </div>
        )
    }
}

const mstp = (state) => {
    let currentDist;
    let tripTime;
    if (state.entities.directions) {
        let sum = 0;
        Object.values(state.entities.directions).forEach(el => {
            sum = sum + el.distance;
        })
        console.log(sum);
        currentDist = sum;
    } else {
        return null;
    }

    if (state.entities.directions) {
        let sum = 0;
        Object.values(state.entities.directions).forEach(el => {
            sum = sum + el.duration;
        })
        console.log(sum);
        tripTime = sum;
    } else {
        return null;
    }

    return {
        showTripInfo: state.ui.showTripInfo,
        currentDist: currentDist,
        tripTime: tripTime,
    }
}

const mdtp = (dispatch) => ({
    toggleTripInfo: () => dispatch(toggleTripInfo())
})

export default connect(mstp, mdtp)(TripInfo);