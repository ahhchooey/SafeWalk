import { connect } from 'react-redux';
import Map from './map';
import { receiveCurrentLocation } from '../actions/directions_actions';

const mapStateToProps = (state, ownProps) => {

    // const route = state.entities.route;
    // return ({
    //     route
    // })

    const safestRoute = state.entities.safest.route;
    const fastestRoute = state.entities.fastest.route;
    return ({
        safestRoute,
        fastestRoute
    })
}


const mapDispatchToProps = (dispatch) => ({
    receiveCurrentLocation: (currentLocation) => dispatch(receiveCurrentLocation(currentLocation))
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Map);