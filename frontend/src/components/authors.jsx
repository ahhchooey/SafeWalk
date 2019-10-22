import React from 'react';
import './stylesheets/authors.scss';
import $ from 'jquery';
import { connect } from 'react-redux';

import { toggleAuthors } from '../actions/ui_actions'
class Authors extends React.Component {
    constructor(props) {
        super(props);
        this.handleSlide = this.handleSlide.bind(this);
        this.removeSlide = this.removeSlide.bind(this);
        
    }

    componentDidMount() {
        $('.slideout').toggleClass('slide-active');
        $('.slideout_inner').toggleClass('authors-active');
        $(".modal").toggleClass("modal-active");
      this.props.toggleAuthors();
    }
    
    handleSlide(e) {
      e.stopPropagation();
      $('.slideout').toggleClass('slide-active');
      $('.slideout_inner').toggleClass('authors-active');
      $(".modal").toggleClass("modal-active");
      this.props.toggleAuthors();
      
    }
    
    removeSlide(e) {
      e.stopPropagation();
      $('.slideout').removeClass('slide-active');
      $('.slideout_inner').removeClass('authors-active');
      $(".modal").removeClass("modal-active");
      this.props.toggleAuthors();
    }
    
    render() {
        return (

         <React.Fragment>
               <div 
                 onMouseDown={this.handleSlide} 
                 className="slideout"
               >
                 About Me
               </div>
               <div className="modal" onMouseDown={this.removeSlide}>
               </div>
               <div className="slideout_inner"
               >
                   <div style={{
                    position: "absolute",
                     fontSize: "10px",
                     top: "0px",
                     right: "5px",
                     marginBottom: "3px",
                     display: "none"
                   }}>*SafeWalker is intended for Mobile Use</div>
                  <h3>Welcome to SafeWalker!</h3>
                  <br/>
                  <p>
                      Safewalker is a mobile app that provides walking routes in the Financial District of San Francisco based on crime data pulled from DataSF, a platform by the city government that provides data on a variety of city-related infromation. We combined this data with Mapbox's map API, npm Dijkstra (a library that optimizes routes based on Dijkstra's pathfinding algorithm), and our own MongoDB database to provide you both the fastest and 'safest' routes to your destination.
                    <br/>
                    <br />
                    Authors:
                    <br/>
                    <div className='author'>Alex Chui
                    <div>
                      <a href="https://www.linkedin.com/in/alex-chui-075785117/"
                      target="_blank">
                        LinkedIn
                      </a> &nbsp;
                      <a href="https://github.com/ahhchooey" target="_blank" style={{color: '#ffcc5c'}}>GitHub</a>
                    </div>
                    </div>
                    <div className='author'>Jimmy Pham
                      <div>
                    <a href="https://www.linkedin.com/in/jimmy-pham-38a208139/"
                    target="_blank">
                      LinkedIn
                    </a> &nbsp;
                    <a href="https://github.com/jipham510" target="_blank" style={{ color: '#ffcc5c' }}>GitHub</a>
                  </div>
                  </div>
                  <div className='author'>
                    Stanton Huang
                  <div>
                    <a href="https://www.linkedin.com/in/stan1000/" target="_blank">LinkedIn</a> &nbsp;
                    <a href="https://github.com/aethervial" target="_blank" style={{ color: '#ffcc5c' }}>GitHub</a>
                  </div>
                  </div>
                <div className='author'>
                    Theodore Browne  
                  <div>
                    <a href="https://www.linkedin.com/in/theodore-browne-7201a3165/" target="_blank">
                      LinkedIn
                    </a> &nbsp;
                    <a href="https://github.com/theo-browne" target="_blank" style={{ color: '#ffcc5c' }}>GitHub</a>
                  </div>
                  </div>
                  </p>
                </div>
        </React.Fragment>

        )
    }
}


const mstp = state => {
  return {
    showAuthors: state.ui.showAuthors,
  }
}

const mdtp = dispatch => ({
  toggleAuthors: () => dispatch(toggleAuthors()),
})

export default connect(mstp, mdtp)(Authors);
