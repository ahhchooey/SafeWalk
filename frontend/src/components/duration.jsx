import React from 'react';
import {connect} from 'react-redux';
import {toggleTripInfo} from '../actions/ui_actions';
import {clearRoutes} from '../actions/directions_actions';
import './stylesheets/tripinfo.scss'
import { STATUS_CODES } from 'http';


class TripInfo extends React.Component {
    constructor(props) {
        super(props)
        this.handleClear = this.handleClear.bind(this);
    }

    handleClear() {
        this.props.clearRoutes();
    }

    render() {
        let dist;
        let duration;
        if (this.props.currentDist) {
            dist = `(${(this.props.currentDist / 1000).toFixed(2)} km)`;
            duration = `${Math.round(this.props.tripTime / 60)} min`;
        } else {
            dist = null;
            duration = null;
        }
        
        if (this.props.showTripInfo) {
            return(
                <div className="tripinfo">
                    <button className="cancel" onClick={this.handleClear}>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 50" width="25" height="25" fill="#3180d2">
                            <path d="M31.202,25l13.63-20.445c0.204-0.307,0.224-0.701,0.05-1.026S44.369,3,44,3h-7.34c-0.327,0-0.634,0.16-0.821,0.429L25,19 L14.16,3.429C13.973,3.16,13.667,3,13.34,3H6C5.631,3,5.292,3.203,5.118,3.528s-0.154,0.72,0.05,1.026L18.798,25L5.168,45.445 c-0.204,0.307-0.224,0.701-0.05,1.026S5.631,47,6,47h7.34c0.327,0,0.634-0.16,0.821-0.429L25,31l10.84,15.571 C36.027,46.84,36.333,47,36.66,47H44c0.369,0,0.708-0.203,0.882-0.528s0.154-0.72-0.05-1.026L31.202,25z" />
                        </svg>

                    </button>
                    <div className="tripstats">{duration} {dist}</div>
                    <div></div>
                </div>
            )
        }
        else {
            return null;
        }
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
        currentDist = sum;
    } else {
        return null;
    }

    if (state.entities.directions) {
        let sum = 0;
        Object.values(state.entities.directions).forEach(el => {
            sum = sum + el.duration;
        })
        tripTime = sum;
    } else {
        return null;
    }

    return {
        showTripInfo: state.ui.showTripInfo,
        currentDist: currentDist,
        tripTime: tripTime,
        // showTripInfo: STATUS_CODES.ui.showTripInfo
    }
}

const mdtp = (dispatch) => ({
    toggleTripInfo: () => dispatch(toggleTripInfo()),
    clearRoutes: () => dispatch(clearRoutes())
})

export default connect(mstp, mdtp)(TripInfo);