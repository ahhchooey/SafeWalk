import { connect } from 'react-redux';
import Map from './map';

const mapStateToProps = (state, ownProps) => {

////Placeholder route for testing
    // const route = [[-122.401872, 37.796638], [-122.401152, 37.793067], [-122.407584, 37.792256]];
/////////////////////////////////
    const route = state.entities.route;
    return ({
        route 
    })
}


// const mapDispatchToProps = (dispatch) => ({
// })

export default connect(
    mapStateToProps,
    null
)(Map);