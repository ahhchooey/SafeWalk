import React from 'react';
import { toggleHeat } from '../actions/ui_actions';
import { connect } from 'react-redux';
import './stylesheets/legend.scss'


const mstp = state => ({
    showHeat: state.ui.showHeat,
    mapState: state.ui.setMap
})

const mdtp = dispatch => ({
    toggleHeat: () => dispatch(toggleHeat())
})

class Legend extends React.Component {
    constructor(props) {
        super(props);

        this.showLegend = this.showLegend.bind(this);
        this.hideLegend = this.hideLegend.bind(this);
        this.addLegend = this.addLegend.bind(this);
    }
    componentDidMount(){
        this.addLegend();
    }
    componentDidUpdate(prevProps){
        if (prevProps !== this.props) {
            if (this.props.showHeat) {
                this.showLegend();
            } else {
                this.hideLegend();
            }
        }
    }
    addLegend(){
        const ratings = ["A", "B", "C", "D", "E", "F"];

        const colors = ['rgb(0,200,0)', 'rgb(103,169,207)', 'rgb(209,229,240)', 'rgb(253,219,199)', 'rgb(239,138,98)', 'rgb(178,24,43)'];
        const legend = document.getElementById("legend")
        for (let i = 0; i < ratings.length; i++) {
            const rating = ratings[i];
            const color = colors[i];
            const item = document.createElement('div');
            const key = document.createElement('span');
            key.className = 'legend-key';
            key.style.backgroundColor = color;

            const value = document.createElement('span');
            value.innerHTML = rating;
            item.appendChild(key);
            item.appendChild(value);
            legend.appendChild(item);
        }
    }
    showLegend(){
        const legend = document.getElementById("legend");
        legend.classList.remove("hide");
    }
    hideLegend(){
        const legend = document.getElementById("legend");
        legend.classList.add("hide");
    }
    render() {
        return (
            <div id="legend" className='map-overlay hide'>
                Safety Rating
            </div>
        )
    }
}



export default connect(mstp, mdtp)(Legend);
