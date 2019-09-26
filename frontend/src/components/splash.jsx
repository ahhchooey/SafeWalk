import React from 'react'
import SearchForm from './search_form'
import './stylesheets/splash.scss'



export default class Splash extends React.Component{
    constructor(props){
        super(props)
    }


    render(){
        return(
          
            <div className="splash">
                <div>
                <h2>Welcome to SafeWalk</h2>
                <SearchForm />
                </div>
            </div>
        )
    }
}