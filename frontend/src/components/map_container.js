import { connect } from 'react-redux';
import Map from './map';
import { receiveCurrentLocation } from '../actions/directions_actions';
import {setMap} from "../actions/ui_actions.js";

const mapStateToProps = (state, ownProps) => {
    return ({
        safestRoute: state.entities.safest.route,
        fastestRoute: state.entities.fastest.route,
        setRoute: state.ui.setRoute,
        showHeat: state.ui.showHeat
    })
}


const mapDispatchToProps = (dispatch) => ({
  receiveCurrentLocation: (currentLocation) => dispatch(receiveCurrentLocation(currentLocation)),
  setMap: () => dispatch(setMap())
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Map);
