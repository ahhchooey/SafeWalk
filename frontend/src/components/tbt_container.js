import {connect} from "react-redux";
import TBT from "./tbt.js";


const mapStateToProps = (state) => ({
  directions: state.entities.directions,
  showTurnByTurn: state.ui.showTurnByTurn
})

const mapDispatchToProps = (dispatch) => ({

})

export default connect(mapStateToProps, mapDispatchToProps)(TBT);
