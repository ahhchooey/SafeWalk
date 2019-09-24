import React from 'react'
import $ from 'jquery'
import './stylesheets/search-form.scss'
const mbxClient = require('@mapbox/mapbox-sdk'); 
const mbxGeocoding = require('@mapbox/mapbox-sdk/services/geocoding')
const baseClient = mbxClient({ accessToken: 'pk.eyJ1IjoidGhlby1icm93bmUiLCJhIjoiY2sweDNxNml3MDJrczNpcWk2Y2VkcTRscSJ9.spEwua1RKRltkkhpouI7-g' })
const geocodingClient = mbxGeocoding(baseClient);


export default class SearchForm extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            start: "",
            destination: ""
        }
        this.selected = false
        this.handleSubmit = this.handleSubmit.bind(this)
        this.showDropdown = this.showDropdown.bind(this)
        this.handleClick = this.handleClick.bind(this)
    }
    showDropdown(e){
        e.target.nextElementSibling.classList.add('show')
   
    }
    hideDropdown(e){
        e.target.nextElementSibling.classList.remove('show')
    }
    handleClick(){
       debugger
    }

    handleInput(str) {
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
                    this.setState({ places: res.body.features})
                })
            // this.setState({ [str]: e.target.value })
        }
    }

    handleSubmit(e) {
        e.preventDefault()
        let query = this.state
        // $.ajax({
        //     url: '/api/intersections',
        //     method: 'GET',
        //     data: {
        //         query
        //     }
        // }).then(() => {
        //     console.log('success')
        //     this.setState({ start: "", destination: "" })
        // }, () => {
        //     console.log('failure')
        // })
    }


    render(){
        
      let places = this.state.places || []
        
        return(
            <div className="search-form">
                <form onSubmit={this.handleSubmit}>
                    <label htmlFor="">Start:
                    <br/>
                        <input type="text" onChange={this.handleInput('start')} onFocus={this.showDropdown} onBlur={this.hideDropdown} value={this.state.start} />
                        <div className="locations-dropdown">
                            <ul>
                                {places.map(place => <li>{place.place_name}</li>)}
                            </ul>
                        </div>
                    </label>
                    <br/>
                    <label onFocus={this.showDropdown} onBlur={this.hideDropdown} > Destination:
                        <br/>
                        <input type="text" onChange={this.handleInput('destination')} value={this.state.destination} />
                        <div className="locations-dropdown">
                            <ul>
                                {places.map((place, idx) => <li onClick={this.handleClick} key={idx}>{place.place_name}</li>)}
                            </ul>
                        </div>
                    </label>
                    <br/>
                    <button type="submit" >Create Routes</button>
                </form>
            </div>
        )
    }
}