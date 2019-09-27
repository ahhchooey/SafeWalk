import { connect } from 'react-redux';
import Map from './map';
import { receiveCurrentLocation } from '../actions/directions_actions';

const mapStateToProps = (state, ownProps) => {

    const safestRoute = state.entities.safest.route;
    const fastestRoute = state.entities.fastest.route;
    const setRoute = state.ui.setRoute;
    return ({
        safestRoute,
        fastestRoute,
        setRoute
    })
}


const mapDispatchToProps = (dispatch) => ({
    receiveCurrentLocation: (currentLocation) => dispatch(receiveCurrentLocation(currentLocation))
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Map);