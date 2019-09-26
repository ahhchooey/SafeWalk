
import React from 'react'
import $ from 'jquery'
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
            startCoordinates: "",
            destinationCoordinates: ""
        }
        this.selected = false
        this.handleSubmit = this.handleSubmit.bind(this)
        this.showDropdown = this.showDropdown.bind(this)
        this.handleClick = this.handleClick.bind(this)
        this.back = this.back.bind(this)
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
                // bbox: [-122.398198, 37.798924, -122.395208, 37.794190],
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
        e.preventDefault()
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
      this.props.fetchRoute("shortest", query)
        .then(res => this.setState({start: "", destination: ""}))
        .fail(err => console.log("failure"))

    }

    back(e) {
        document.querySelector('.search-link').firstChild.classList.remove('hide')
        document.querySelector(".search-form").classList.remove('reveal')
        document.querySelector(".search-form").classList.add('slide-out')
        document.querySelector('#map').classList.remove('fix')
    }

    render() {

        let places = this.state.places || []

        return (
            <div className="search-form">
                <button onClick={this.back}> X </button>
                <form onSubmit={this.handleSubmit}>

                    <label htmlFor="">From:
                    <br />
                        <input type="text" onChange={this.handleInput('start')} onFocus={() => this.showDropdown('start')} onBlur={() => this.hideDropdown('start')} value={this.state.start} />
                        <div className="locations-dropdown">
                            <ul>
                                {this.state.startPlaces.map((place, idx) => <li key={idx} onPointerDown={() => this.handleClick('start', place)}>{place.place_name}</li>)}
                            </ul>
                        </div>
                    </label>
                    <br />
                    <label onFocus={() => this.showDropdown('destination')} onBlur={() => this.hideDropdown('destination')} > To:
                        <br />
                        <input type="text" onChange={this.handleInput('destination')} value={this.state.destination} />
                        <div className="locations-dropdown">
                            
                        </div>
                    </label>
                    <br />
                    <button type="submit" >Create Routes</button>
                </form>
                <br/>
                    <div className="search-dd" id="start-dropdown">
                        <ul>
                            {this.state.startPlaces.map((place, idx) => <div>
                                <img src="https://image.flaticon.com/icons/svg/76/76865.svg" alt=""/>
                                <li key={idx} onPointerDown={() => this.handleClick('start', place)}>{place.place_name}</li>
                            </div>
                                )}
                        </ul>
                    </div>
                    <div className="search-dd" id="destination-dropdown">
                        <ul>
                            {this.state.destinationPlaces.map((place, idx) => <div>
                                <img src="https://image.flaticon.com/icons/svg/76/76865.svg" alt="" />
                                <li key={idx} onPointerDown={() => this.handleClick('destination', place)}>{place.place_name}</li>
                            </div>
                            )}
                        </ul>
                    </div>
            </div>
        )
    }
}
