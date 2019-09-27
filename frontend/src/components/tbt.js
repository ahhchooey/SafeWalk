import React from "react";
import "./stylesheets/tbt.scss";


export default class TBT extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      directions: []
    }
  }

  componentDidMount() {
    this.setState({directions: this.props.directions || []})  
  }

  componentDidUpdate() {
    if (this.state.directions !== this.props.directions) {
      this.setState({directions: this.props.directions})
    }
  }

  render() {
    if (this.state.directions.length === 0) return null;

    return (
      <div className="tbt">
        <div className="tbt-focus">
          {this.state.directions[0].instruction}
        </div>
        <div className="tbt-dropdown">
        
        </div>
      </div>
    )
  }
}
