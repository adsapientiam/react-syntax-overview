import React from "react";
import ReactDOM from "react-dom";
import "./style.css";  // styles are now availible

// time in USA vs Sweden (subtract by 6h and 30 min); have button for taking sample "now"

function Outliner (props){ 
    <div className={border}>
        {props}  
    </div>
} // elements between two Outliners will have the border

class Clock extends React.Component{
    constructor(props){
        super(props);
        this.state = {now:new Date()}
        this.handleChange = this.handleChange.bind(this) // binding required if method uses `this`
    }

    // lifecycle method; values set up when connected to DOM
    componentDidMount(){  
        console.log("I am in the beam")
    }

    handleChange(event){  // named by convention
        this.props.timeDifference(event.target.value)  // the input's
    }

    render(){
        // before render: functions; ERROR PRONE AREA
        // inside render: variables 
        return(
            <FieldSet>
                <legend>Time is {this.state.now} in {this.props.place}</legend>
                <input value={this.props.time} onChange={this.handleChange()}/>
            </FieldSet>
        )
    }
}

class TimeOverview extends React.Component{
    constructor(props){
        super(props);
        this.state = {us:"",swe:""}
    }

    handleUSChange(time){
        this.setState({us, time})
    }

    render(){ 
        return( 
            <div> 
                <h2 style={{backgroundColor:"lightblue"}}>Sweden and USA time differences!</h2> // jsx css is camel cased css
                <Clock

                    place="Sweden"
                />
                <Clock

                    place="USA"
                />
                <IsNightTimeSweden/>
            </div>
        )
    }
}

ReactDOM.render(<OutLiner><TimeOverview/></OutLiner>, document.getElementById("root")) // appends only if preceeding element is different 