import React from 'react'
import SearchFormContainer from './search_form_container.js'
import './stylesheets/splash.scss'
import MapContainer from './map_container'
// import Map from './map'
import TripInfo from './duration';
import TBTContainer from "./tbt_container.js";
import DangerZone from './danger_zone';

export default class Splash extends React.Component{

    render(){
        return(
            <div className="splash">
                <div className='home'>
                    <MapContainer />
                    <SearchFormContainer />
                    <DangerZone />
                    <TripInfo />
                    <TBTContainer />
                </div>
            </div>
        )
    }
}
