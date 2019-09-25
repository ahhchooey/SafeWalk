import React from 'react'
import SearchForm from './search_form'
import './stylesheets/splash.scss'
import Map from './map'



export default class Splash extends React.Component{
    constructor(props){
        super(props)
    }


    render(){
        return(
          
            <div className="splash">
                <div className="home">
                    <Map />
                    
                <SearchForm />
                </div>
            </div>
        )
    }
}