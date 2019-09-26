import React from 'react'
import SearchFormContainer from './search_form_container.js'
import './stylesheets/splash.scss'
import Map from './map'
import TripInfo from './duration';

export default class Splash extends React.Component{
    constructor(props){
        super(props)
    }


    render(){
        return(
            <div className="splash">
                <div className='home'>
                    {/* <h2>Welcome to SafeWalk</h2>  */}
                    <Map />
                    <SearchFormContainer />
                    <TripInfo />
                </div>
            </div>
        )
    }
}
