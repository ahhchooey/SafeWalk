import React from 'react';
import './stylesheets/authors.scss';
import $ from 'jquery';
class Authors extends React.Component {
    constructor(props) {
        super(props);
        this.handleSlide = this.handleSlide.bind(this);
    }

    handleSlide(e) {
        e.preventDefault();
        $('.slideout').toggleClass('slide-active');
        $('.slideout_inner').toggleClass('authors-active');
    }
    

    render() {
        return (

         <React.Fragment>
                <div onClick={this.handleSlide} onMouseLeave={this.handleSlide} className="slideout">About Me</div>
                    <div className="slideout_inner">
                        <h3>Welcome to SafeWalker!</h3>
                        <br/>
                        <p>
                            Safewalker is an app that provides walking routes in the Financial District of San Francisco based on crime data pulled from DataSF, a platform by the city government that provides data on a variety of city-related infromation. We combined this data with Mapbox's map API, npm Dijkstra (a library that optimizes routes based on Dijkstra's pathfinding algorithm), and our own MongoDB database to provide you both the fastest and 'safest' routes to your destination.
                            <br/>
                            <br />
                            Authors:
                            <br/>
                            Alex Chui |  
                            <a href="https://www.linkedin.com/in/alex-chui-075785117/">LinkedIn</a> |  
                            <a href="https://github.com/ahhchooey">GitHub</a>
                            <br/>
                            Jimmy Pham |
                            <a href="https://www.linkedin.com/in/jimmy-pham-38a208139/">LinkedIn</a> |
                            <a href="https://github.com/jipham510">GitHub</a>
                            <br/>
                            Stanton Huang |
                            <a href="https://www.linkedin.com/in/stan1000/">LinkedIn</a> |
                            <a href="https://github.com/aethervial">GitHub</a>
                            <br/>
                            Theodore Brown | 
                            <a href="https://www.linkedin.com/in/theodore-browne-7201a3165/">LinkedIn</a> |
                            <a href="https://github.com/theo-browne">GitHub</a>
                        </p>
                </div>
        </React.Fragment>

        )
    }
}



export default Authors;