import React from 'react'
import SearchFormContainer from './search_form_container.js'
import './stylesheets/splash.scss'
import MapContainer from './map_container'
// import Map from './map'
import TripInfo from './duration';
import TBTContainer from "./tbt_container.js";

export default class Splash extends React.Component{
    constructor(props){
        super(props)
    }


    render(){
        return(
            <div className="splash">
                <div className='home'>
                    {/* <h2>Welcome to SafeWalk</h2>  */}
                    <MapContainer />
                    <SearchFormContainer />
                    <TripInfo />
                    <TBTContainer />
                </div>
            </div>
        )
    }
}
