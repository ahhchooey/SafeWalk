import React from "react";


export default class TBT extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      directions: []
    }
  }

  componentDidMount() {
    this.setState({directions: this.props.directions})  
  }

  render() {
    return (
      <div className="tbt">
        <div className="tbt-focus">
           
        </div>
        <div className="tbt-dropdown">
        
        </div>
      </div>
    )
  }
}
