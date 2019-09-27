import { connect } from 'react-redux';
import Map from './map';
import { receiveCurrentLocation } from '../actions/directions_actions';

const mapStateToProps = (state, ownProps) => {

    const route = state.entities.route;
    return ({
        route
    })
}


const mapDispatchToProps = (dispatch) => ({
    receiveCurrentLocation: (currentLocation) => dispatch(receiveCurrentLocation(currentLocation))
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Map);