import React from "react";
import ReactDOM from "react-dom";
import "./style.css";  // use style 


const Outliner = props => <div className="border"> {props.children} </div>; // props.children is every item between two Outliners


const toDegrees = rads => rads*(180/Math.PI);
const toRadian = deg => deg*(Math.PI/180);
const tryConvert = (num, method) => (input=parseFloat(num), Number.isNaN(input) ? "" : method(input)); 

class Input extends React.Component{
    constructor(props){
        super(props);
        this.handleChange = this.handleChange.bind(this) // binding required if method uses `setState`
    }

    // lifecycle method; values set up when instance connected to DOM
    componentDidMount(){  
        console.log("Connected to DOM")
    }

    handleChange(event){
        this.props.onDegreeChange(event.target.value); 
        /* event = the event handler
         * target = the <input/>
         * value= the value attribute
        */
    }

    render(){
        // before render: functions;
        // inside render: variables 
        return(
            <fieldset className="input-field">
                <legend>Enter degrees in {this.props.scale}</legend>
                <input value={this.props.degreeValue} 
                        onChange={this.handleChange}/>
            </fieldset>
        )
    }
}

export default class Calculator extends React.Component{
    constructor(props){
        super(props);  
        this.handleDegChange=this.handleDegChange.bind(this);
        this.handleRadChange=this.handleRadChange.bind(this);
        this.handleSave=this.handleSave.bind(this);

        this.state = {degValue:"", scale:"deg", saves:[]}; // saves is unecessary here; state is supposed to contain values to be manipulated in other components
    }

    handleDegChange(degrees){
        this.setState({scale:"deg",degValue:degrees})
    }

    handleRadChange(radiants){
        this.setState({scale:"rad",degValue:radiants})
    }

    handleSave(deg, rad){  
        // how to dynamically manipulate state;
        // `props` is the props of the calling object
        // `state.saves.concat` since `.push` will return an integer, instead of an array
        this.setState((state, props)=> ((deg&&rad) && {saves: state.saves.concat([[deg, rad]])}))
    }                                   

    render(){ // jsx css is camel cased css
        const curScale = this.state.scale;
        const curDegValue = this.state.degValue;

        const degrees = curScale === "rad" ? tryConvert(curDegValue, toDegrees): curDegValue;
        const radiants = curScale === "deg" ? tryConvert(curDegValue, toRadian): curDegValue;
        return( 
            <Outliner> 
                <Input 
                    scale="Degrees" 
                    onDegreeChange={this.handleDegChange} 
                    degreeValue={degrees}/>
                <Input 
                    scale="Radiant" 
                    onDegreeChange={this.handleRadChange} 
                    degreeValue={radiants}/>
                <input type="button" value="Save" onClick={e=>this.handleSave(degrees, radiants)}/>
                <ul>
                    {this.state.saves.map((c,i)=><li key={i}>{c[0]} equals {c[1]}</li>)}
                    {/*expression above becomes an array of elements which code brackets expand out as JSX*/}
                </ul>
            </Outliner>
        );
    }
}

ReactDOM.render(<Calculator/>, document.getElementById("root")) // appends only if preceeding element is different 

