import React, { Component } from 'react';
import './checkbox.scss';
import { connect } from "react-redux";


class Checkbox extends Component {
    state = {
        ifFirst: 'notFirst',
        color: 'green',
        allSelect: true
    }

    componentDidMount() {
        this.setState({allSelect: this.props.showAll});
        
    }
    toggle = ( title) =>{
        this.props.editData(title, this.props.parentGroup, this.props.group);              
    }




    render() {
        
        let checkStatus = true;
        if(this.props.group == "forschung5ebiet"){
            if(this.props.selectedCategory.includes(this.props.title)){
                checkStatus = true;
            }
            else{
                checkStatus = false;
            }
        }
        else if(this.props.group == 'gol' && this.props.title == "GELDGEBER" && this.props.showAllSponsor){
            checkStatus = true;
        }
        else if(this.props.group == 'gol' && this.props.title == "GELDGEBER" && !this.props.showAllSponsor){
            checkStatus = false;
        }
        else{
            if(this.props.Statesponsor.includes(this.props.title)){
                checkStatus = true;
            }
            else{
                checkStatus = false;
            }
        }
        

        return (
            <React.Fragment>
                <label className={"customCheckbox " + this.props.color + ' ' + this.state.ifFirst}>{this.props.title}
                    <input type="checkbox" checked={checkStatus} onClick={() => this.toggle( this.props.title)} />
                    <span className={"checkmark " + this.props.color}></span>
                </label>
            </React.Fragment>
        );

    }
}
const mapStateToProps = state => {
    return state;
};
const mapDispatchToProps = (dispatch) => {
    return {
        editData(title, parent, group) {
            const action = { type: "edit", title : title, parent: parent, group: group }
            dispatch(action);
        },
    }
}


const MappedComponent = connect(mapStateToProps, mapDispatchToProps)(Checkbox);
export default MappedComponent;