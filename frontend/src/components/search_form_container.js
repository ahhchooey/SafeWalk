import {connect} from "react-redux";
import SearchForm from "./search_form.jsx";
import {fetchRoute} from "../actions/directions_actions.js";


const mapStateToProps = (state) => ({

})

const mapDispatchToProps = (dispatch) => ({
  fetchRoute: (route, query) => dispatch(fetchRoute(route, query))
})

export default connect(mapStateToProps, mapDispatchToProps)(SearchForm);
