import {connect} from "react-redux";
import TBT from "./tbt.js";


const mapStateToProps = (state) => ({
  entities: state.entities,
  showTurnByTurn: state.ui.showTurnByTurn,
  setRoute: state.ui.setRoute || ""
})

const mapDispatchToProps = (dispatch) => ({

})

export default connect(mapStateToProps, mapDispatchToProps)(TBT);
