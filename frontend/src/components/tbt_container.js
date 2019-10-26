import {connect} from "react-redux";
import TBT from "./tbt.js";
import { toggleTBTDropDown } from '../actions/ui_actions';


const mapStateToProps = (state) => ({
  entities: state.entities,
  showTurnByTurn: state.ui.showTurnByTurn,
  setRoute: state.ui.setRoute || ""
})

const mapDispatchToProps = (dispatch) => ({
  toggleTBTDropDown: () => dispatch(toggleTBTDropDown())
})

export default connect(mapStateToProps, mapDispatchToProps)(TBT);
