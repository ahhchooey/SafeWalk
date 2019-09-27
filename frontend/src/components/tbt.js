import React from "react";
import $ from "jquery";
import "./stylesheets/tbt.scss";


export default class TBT extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      directions: [],
      setRoute: "",
    }
  }

  componentDidMount() {
    this.setState({setRoute: this.props.setRoute || ""});
    if (this.state.setRoute !== "") {
      this.setState({directions: this.props.entities[this.state.setRoute].directions || []})  
    }
  }

  componentDidUpdate() {
    if (this.state.setRoute !== this.props.setRoute) {
      this.setState({setRoute: this.props.setRoute || ""})
    }
    if (this.state.setRoute !== "") {
      console.log(this.state.setRoute)
      if (this.state.directions !== this.props.entities[this.state.setRoute].directions) {
        this.setState({directions: this.props.entities[this.props.setRoute].directions})
      }
    }
  }

  toggleDropdown(e) {
    e.preventDefault();
    $(".tbt-dropdown").toggleClass("visible")
    $(".tbt").toggleClass("corners")
  } 

  hideDropdown(e) {
    e.preventDefault();
    $(".tbt-dropdown").removeClass("visible")
    $(".tbt").removeClass("corners")
  }

  render() {
    if (!this.props.showTurnByTurn || this.state.directions.length === 0) return null;

    let head;
    if (!this.state.directions[0]) {
      head = null;
    } else {
      head = (
        <React.Fragment>
          {(this.state.directions[0].instruction.includes("left"))
              ? <img src="https://img.icons8.com/ios/50/000000/left2.png" alt="left"/>
              : (this.state.directions[0].instruction.includes("right"))
              ? <img src="https://img.icons8.com/ios/50/000000/right2.png" alt="right" />
              : <img src="https://img.icons8.com/ios/50/000000/gps-device.png" alt="forward" />
          } 
          {this.state.directions[0].instruction}
        </React.Fragment>
      )
    }

    let dd;
    if (!this.state.directions[1]) {
      dd = null;
    } else {
      dd = this.state.directions.slice(1).map((dir, i) => {
        if (this.state.directions[i + 1].instruction === this.state.directions[i].instruction) {
          return null;
        }
        if (this.state.directions[i + 1].instruction.includes("arrived")
          && i !== this.state.directions.length -2) return null;
        return (
          <div key={i} className="tbt-dropdown-item">
            {(dir.instruction.includes("left"))
                ? <img src="https://img.icons8.com/ios/50/000000/left2.png" alt="left" />
                : (dir.instruction.includes("right"))
                ? <img src="https://img.icons8.com/ios/50/000000/right2.png" alt="right" />
                : (dir.instruction.includes("arrived"))
                ? <img src="https://img.icons8.com/ios/50/000000/ok.png" alt="arrived" />
                : <img src="https://img.icons8.com/ios/50/000000/gps-device.png" alt="forward" />
            } 
              {dir.instruction}
              {` (${dir.distance}m)`}
          </div>
        )
      })
    }

    return (
      <div className="tbt">
        <div className="tbt-focus" onPointerDown={this.toggleDropdown}>
          {head}
        </div>
        <div className="tbt-dropdown">
          <div className="tbt-dropdown-index">
            {dd}
          </div>
          <div className="tbt-dropdown-close" onClick={this.hideDropdown}>CLOSE</div>
        </div>
      </div>
    )
  }
}
