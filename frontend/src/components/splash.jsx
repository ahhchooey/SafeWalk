import React from 'react'
import $ from 'jquery'



export default class Splash extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            start: "",
            destination: ""
        }
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleInput(str){
        return (e) => {
            this.setState({ [str]: e.target.value })
        }
    }

    handleSubmit(e){
        e.preventDefault()
        let query = this.data
        $.ajax({
            url: '/api/intersections',
            method: 'GET',
            data: {
               query
            }
        }).then(() => {
            console.log('success')
        }, () => {
            console.log('failure')
        })
    }


    render(){
        return(
            <div>
                <h1>
                    Splash
                </h1>
                <form onSubmit={this.handleSubmit}> 
                    <label htmlFor="">Start 
                        <input type="text" onChange={this.handleInput('start')}/>
                    </label>
                    <label > Destination
                        <input type="text" onChange={this.handleInput('destination')} />
                    </label>
                    <button type="submit" >Create Routes</button>
                </form>
            </div>
        )
    }
}