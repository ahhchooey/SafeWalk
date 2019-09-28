import React from 'react';
import $ from 'jquery';
import {connect} from 'react-redux';
import {toggleAllDirections, 
        toggleDangerZone, 
        toggleShowSearch, 
        toggleTurnByTurn, 
        toggleTripInfo,
        setRoute} from '../actions/ui_actions'
import {css} from "@emotion/core";
import BarLoader from "react-spinners/BarLoader";

class DangerZone extends React.Component {
    constructor(props) {
        super(props);
        this.handleDanger = this.handleDanger.bind(this);
        this.handleSafe = this.handleSafe.bind(this);
        this.toggleHold = this.toggleHold.bind(this);
        this.state = {
          shouldRender: false
        }
    }

    componentDidUpdate(prevProps) {
      if (this.props.entities !== prevProps.entities) {
        if (this.state.shouldRender === false) {
          this.setState({shouldRender: true})
        } else {
          this.setState({shouldRender: false})
        }
      }
    }

    handleDanger(e) {
        e.preventDefault();
        this.props.toggleDangerZone();
        this.props.toggleTripInfo();
        this.props.toggleTurnByTurn();
        this.props.setRoute('fastest');
    }

    handleSafe(e) {
        e.preventDefault();
        this.props.toggleDangerZone();
        this.props.toggleTripInfo();
        this.props.toggleTurnByTurn();
        this.props.setRoute('safest');
    }

    toggleHold(e) {
        e.preventDefault();
        $(e.currentTarget).toggleClass('hold');
    }

    render() {
        if (!this.props.showDZ) {
            return <div></div>
        }

        if (!this.state.shouldRender) {
          return (
            <div className="tripdanger">
              <BarLoader
                css={override}
                sizeUnit={"px"}
                size={300}
                color={'#36D7B7'}
              />
            </div>
          )
        }

        return(
            <div className="tripdanger">
                <button className="safe" onMouseEnter={this.toggleHold} onMouseLeave={this.toggleHold} onClick={this.handleSafe}>Safest Route</button>
                <button className="danger" onMouseEnter={this.toggleHold} onMouseLeave={this.toggleHold} onClick={this.handleDanger}>Fastest Route</button>
            </div>
        )
    }
}

const override = css`
    display: block;
    margin: 0 auto;
    border-color: red;
`;

const mstp = state => {
      return {
        showDZ: state.ui.showDZ,
        entities: state.entities 
      }
}

const mdtp = dispatch => ({
    toggleAllDirections: () => dispatch(toggleAllDirections()),
    toggleDangerZone: () => dispatch(toggleDangerZone()),
    toggleShowSearch: () => dispatch(toggleShowSearch()),
    toggleTurnByTurn: () => dispatch(toggleTurnByTurn()),
    toggleTripInfo: () => dispatch(toggleTripInfo()),
    setRoute: str => dispatch(setRoute(str))
})

export default connect(mstp, mdtp)(DangerZone);
