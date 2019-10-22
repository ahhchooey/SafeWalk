
import React from 'react'
import './stylesheets/search-form.scss'
const mbxClient = require('@mapbox/mapbox-sdk');
const mbxGeocoding = require('@mapbox/mapbox-sdk/services/geocoding')
const baseClient = mbxClient({ accessToken: 'pk.eyJ1IjoidGhlby1icm93bmUiLCJhIjoiY2sweDNxNml3MDJrczNpcWk2Y2VkcTRscSJ9.spEwua1RKRltkkhpouI7-g' })
const geocodingClient = mbxGeocoding(baseClient);


export default class SearchForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            start: "",
            destination: "",
            startPlaces: [],
            destinationPlaces: [],
            startCoordinates: {},
            destinationCoordinates: {}
        }
        this.selected = false
        this.handleSubmit = this.handleSubmit.bind(this)
        this.showDropdown = this.showDropdown.bind(this)
        this.handleClick = this.handleClick.bind(this)
        this.back = this.back.bind(this)
        this.demoRoute = this.demoRoute.bind(this)
        this.clearTo = this.clearTo.bind(this)
        this.clearFrom = this.clearFrom.bind(this)
      this.routing = false;
    }

    showDropdown(str) {
        let dd = (str === 'destination') ? 'destination-dropdown' : 'start-dropdown'
        document.querySelector(`#${dd}`).classList.add('show')
        // e.target.nextElementSibling.classList.add('show')

    }
    hideDropdown(str) {
        let dd = (str === 'destination') ? 'destination-dropdown' : 'start-dropdown'
        document.querySelector(`#${dd}`).classList.remove('show')
        // e.target.nextElementSibling.classList.remove('show')
    }
    handleClick(str, place) {
        let coord = (str === 'destination') ? 'destinationCoordinates' : 'startCoordinates'
        this.setState({ [coord]: { longitude: place.geometry.coordinates[0], latitude: place.geometry.coordinates[1] }, [str]: place.place_name })
        // console.log(this.state)
    }

    handleInput(str) {
        let places = (str === 'start') ? 'startPlaces' : 'destinationPlaces'
        return (e) => {
            this.setState({ [str]: e.target.value })
            if (e.target.value === '') return
            let val = e.target.value
            geocodingClient.forwardGeocode({
                query: val,
                proximity: [-122.401672, 37.794418],
                // bbox: [-122.398198, -122.395208, 37.794190, 37.798924],
                countries: ['us'],
                limit: 5,
                types: ['address']
            }).send()
                .then(res => {
                    this.setState({ [places]: res.body.features })
                })
            // this.setState({ [str]: e.target.value })
        }
    }

    handleSubmit(e) {
        if (e) e.preventDefault();
        let query = { start: this.state.startCoordinates, destination: this.state.destinationCoordinates }
      //        $.ajax({
      //      url: '/api/intersections/shortest',
      //      method: 'GET',
      //      data: {
      //          query
      //      }
      //  }).then((res) => {
      //      console.log(res)
      //      this.setState({ start: "", destination: "" })
      //  }, (res) => {
      //      console.log('failure')
      //  })
        this.props.fetchRoute(query)
          .then(res => this.setState({start: "", destination: ""}))
          .fail(err => console.log("failure"));
        //this.props.toggleTripInfo();
        this.props.toggleDangerZone();
        //this.props.toggleAllDirections();
        this.props.toggleSearch();
        // this.props.toggleTurnByTurn();
    }

    back(e) {
        document.querySelector('.search-link').firstChild.classList.remove('hide')
        document.querySelector(".search-form").classList.remove('reveal')
        document.querySelector(".search-form").classList.add('slide-out')
        document.querySelector('#map').classList.remove('fix')
    }

    demoRoute(e) {
      this.routing = true;

      const start = "825 Battery Street, San Francisco, California 94111, United States"
      const destination = "1 Sutter Street, San Francisco, California 94104, United States"

      const typer = (string, type) => () => {
        if (string.length > 0) {
          this.setState({[type]: this.state[type] + string[0]});
          setTimeout(typer(string.slice(1), type), 25);
        }
      }

      typer(start, "start")();
      typer(destination, "destination")();

      this.setState({
        startPlaces: [],
        destinationPlaces: [],
        startCoordinates: {longitude: -122.401172, latitude: 37.799009},
        destinationCoordinates: {longitude: -122.400828, latitude: 37.790227}
      })

      setTimeout(() => {
        let query = { start: this.state.startCoordinates, destination: this.state.destinationCoordinates }
        this.props.fetchRoute(query)
          .then(res => this.setState({start: "", destination: ""}))
          .fail(err => console.log("failure"));
        this.props.toggleDangerZone();
        this.props.toggleSearch();
        this.routing = false;
      }, 3000);
    }

    clearFrom(e) {
      
      this.setState({
        start: ""
      })
    } 

    clearTo(e) {
      
      this.setState({
        destination: ""
      })
    }

    render() {
        if (!this.props.showSearch) {
            return <div></div>
        }


        return (
            <div className="search-form">
                <form className="formsies" onSubmit={this.handleSubmit}>

                    <div>
                    <input 
                      type="text" 
                      placeholder="Start location?"
                      required 
                      onChange={this.handleInput('start')} 
                      onFocus={() => this.showDropdown('start')} 
                      onBlur={() => this.hideDropdown('start')} 
                      value={this.state.start} 
                    />
                        <div className="locations-dropdown">
                            <ul>
                              {this.state.startPlaces.map((place, idx) => {
                                return (
                                  <li key={idx} 
                                    onMouseDown={() => this.handleClick('start', place)}
                                  >
                                    {place.place_name}
                                  </li>
                                )
                              })}
                            </ul>
                        </div>
                      {
                  (this.state.start) ? <span className="clear-from" onMouseDown={this.clearFrom} onClick={() => {}}>x</span> : ""
                      }
                    </div>

                    <label 
                      onFocus={() => this.showDropdown('destination')} 
                      onBlur={() => this.hideDropdown('destination')} 
                    >
                        <input 
                          type="text" 
                          placeholder="Where to?"
                          required
                          onChange={this.handleInput('destination')} 
                          value={this.state.destination} 
                        />
                        {
                  (this.state.destination) ? <span className="clear-to" onMouseDown={this.clearTo} onClick={() => { }}>x</span> : ""
                        }
                        <div className="locations-dropdown">
                            
                        </div>
                    </label>
                    <div id="form-buttons">
                      <button type="submit" >Create Routes</button>
                      <div className="demo-button" onClick={(e) => {
                        if (this.routing) return;
                        this.demoRoute(e);
                      }}>
                        Demo Route
                      </div>
                    </div>
              </form>


                    <div className="search-dd" id="start-dropdown">
                        <ul>
                          {this.state.startPlaces.map((place, idx) => {
                            return (
                              <div key={idx} >
                                <img src="https://image.flaticon.com/icons/svg/76/76865.svg" alt=""/>
                                <li 
                                  onMouseDown={() => this.handleClick('start', place)}
                                >
                                  {place.place_name}
                                </li>
                            </div>
                            )
                          }
                                )}
                        </ul>
                    </div>
                    <div className="search-dd" id="destination-dropdown">
                        <ul>
                            {this.state.destinationPlaces.map((place, idx) => <div key={idx}>
                                <img src="https://image.flaticon.com/icons/svg/76/76865.svg" alt="" />
                                <li 
                                  onMouseDown={() => this.handleClick('destination', place)}
                                >
                                  {place.place_name}
                                </li>
                            </div>
                            )}
                        </ul>
                    </div>
            </div>
        )
    }
}
