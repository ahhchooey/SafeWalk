import React from 'react';
import {toggleHeat} from '../actions/ui_actions';
import {connect} from 'react-redux';
import {css} from "@emotion/core";
import BarLoader from "react-spinners/BarLoader";


const mstp = state =>({
  showHeat: state.ui.showHeat,
  mapState: state.ui.setMap
})

const mdtp = dispatch => ({
    toggleHeat: () => dispatch(toggleHeat())
})

class HeatToggle extends React.Component {
    constructor(props) {
        super(props);
        this.toggle = this.toggle.bind(this);
    }
 
    toggle(e){
        e.preventDefault();
        e.stopPropagation();
        this.props.toggleHeat();
    }

    render() {
      
      if (this.props.mapState === false) {
        return (
            <div className="tripdanger">
              <BarLoader
                css={override}
                sizeUnit={"px"}
                size={50}
                color={'#36D7B7'}
              />
            </div>
        )
      }
      
        return(
            <div className="heatToggle" onClick={this.toggle}>
                Toggle Heatmap
            </div>
        )
    }
}

const override = css`
    display: block;
    margin: 0 auto;
    border-color: red;
`;


export default connect(mstp, mdtp)(HeatToggle);
