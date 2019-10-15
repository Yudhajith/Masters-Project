import React, {Component} from 'react';
import {actionview,actiondelete} from '../actions/loginactions';
import {connect} from 'react-redux';
import history from "./history";
import {Button, ListGroup, ListGroupItem, Table} from 'reactstrap';

class View extends Component {

    constructor(props) {
        super(props);
        this.state = {
            email:'',
            username: '',
            password: '',
            del:'',
            modal: false
        };
        this.toggle = this.toggle.bind(this);
    }
    toggle() {
        this.setState({
            modal: !this.state.modal
        });
    }


    navigate()
    {
        history.push('/welcome');
    }

    componentWillMount(){
        this.props.log(this.state);
    }


    render() {

        if (this.props.loggedin===200){
            this.navigate();
        }






        return (
            <div>

                <div className="bgImg">
                </div>


                <div className="Welcome" >
                    Sensors
                </div>

                <div className="cardoutline" style={{backgroundColor:"black"}}>

                    <Table>

                        <thead>

                        <tr>

                            <th style={{color:"orange"}} >Sensor</th>
                            <th style={{color:"orange"}}>{this.state.sensor} Location</th>
                            <th style={{color:"orange"}}>{this.state.installed} Action</th>
                        </tr>
                        </thead>

                        <tbody>
                        { this.props.loggedin!==undefined&&this.props.loggedin.length!==0?
                            this.props.loggedin.map(row => {
                                return(
                                    <tr>
                                        <td key={row.devicetype} style={{color:"silver"}}>{row.devicetype}</td>
                                        <td key={row.location} style={{color:"silver"}}>{row.location}</td>
                                        <td key={row.location} style={{color:"silver"}}> <Button

                                            type="button"
                                            onClick={() =>
                                            {this.setState({
                                                    del: row.devicetype
                                                })
                                                this.props.del(this.state);} }>
                                            Delete
                                        </Button></td>

                                    </tr>
                                )
                            }):<div>Loading....</div>}
                        </tbody>
                    </Table>











                </div>


            </div>
        );
    }
}

const mapDispatchToProps =(dispatch)=> {
    return {
        log : (data) => dispatch(actionview(data)),
        del : (data) => dispatch(actiondelete(data))
    };
}
const mapStateToProps =(stores)=> {
    console.log('view:',stores.stores.view);
    return {
        loggedin : stores.stores.view,
    };
}
export default connect(mapStateToProps, mapDispatchToProps)(View);
