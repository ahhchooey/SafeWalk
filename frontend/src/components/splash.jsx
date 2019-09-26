import React from 'react'
import SearchForm from './search_form'
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
                    <SearchForm />
                    <TripInfo />
                </div>
            </div>
        )
    }
}