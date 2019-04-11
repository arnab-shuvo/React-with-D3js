import React, { Component } from 'react';
import Checkbox from '../form/checkbox';


class CheckGroup extends Component {
    state = {
        groupOne: true,
        subGroupOne: true,
        subGroupTwo: true,
        subGroupThree: true,
        subGroupFour: true
    }
    
    
    render() { 
        return ( 
            <React.Fragment>
                <div className="all-check">
                    <Checkbox group={'forschung5ebiet'} color={'green'} title={'forschung5ebiet'} allSelect={true} checked={this.state.groupOne} />
                </div>

                <div className="checkGroup">
                    <Checkbox ifFirst={'first'} group={'forschung5ebiet'}
                    togglePart={this.togglePart} color={'yellow'} 
                    title={'naturwissenchaften'} 
                    partCheckSub={this.state.subGroupOne} 
                    checked={this.state.groupOne} />


                    <Checkbox group={'forschung5ebiet'} parentGroup={"naturwissenchaften"} partCheckSub={this.state.subGroupOne} color={'yellow'} title={'Geochemie, Mineralogie und Kristallographie'} checked={this.state.groupOne} />
                    <Checkbox group={'forschung5ebiet'} parentGroup={"naturwissenchaften"} partCheckSub={this.state.subGroupOne} color={'yellow'} title={'Geophysik und Geodäsie'} checked={this.state.groupOne} />
                    <Checkbox group={'forschung5ebiet'} parentGroup={"naturwissenchaften"} partCheckSub={this.state.subGroupOne} color={'yellow'} title={'Geologie und Paläontologie'} checked={this.state.groupOne} />
                    <Checkbox group={'forschung5ebiet'} parentGroup={"naturwissenchaften"} partCheckSub={this.state.subGroupOne} color={'yellow'} title={'Atmosphären-, Meeres- und Klimaforschung'} checked={this.state.groupOne} />
                </div>
                <div className="checkGroup"> 
                    <Checkbox group={'forschung5ebiet'} togglePart={this.togglePart} partCheckSub={this.state.subGroupTwo}  ifFirst={'first'} color={'red'} title={'lebenswissenschaften'} checked={this.state.groupOne} />
                    <Checkbox group={'forschung5ebiet'} parentGroup={"lebenswissenschaften"} partCheckSub={this.state.subGroupTwo} color={'red'} title={'Zoologie'} checked={this.state.groupOne} />
                    <Checkbox group={'forschung5ebiet'} parentGroup={"lebenswissenschaften"} partCheckSub={this.state.subGroupTwo} color={'red'} title={'Agrar-, Forstwissenschaften und Tiermedizin'} checked={this.state.groupOne} />
                    <Checkbox group={'forschung5ebiet'} parentGroup={"lebenswissenschaften"} partCheckSub={this.state.subGroupTwo} color={'red'} title={'Pflanzenwissenschaften'} checked={this.state.groupOne} />
                </div>
                <div className="checkGroup">
                    <Checkbox group={'forschung5ebiet'} togglePart={this.togglePart} partCheckSub={this.state.subGroupThree}  ifFirst={'first'} color={'green'} title={'Geistes- und Sozialwissenschaften'} checked={this.state.groupOne} />
                    <Checkbox group={'forschung5ebiet'} parentGroup={"geistes"} partCheckSub={this.state.subGroupThree} color={'green'} title={'Kunst-, Musik-, Theater- und Medienwissenschaften'} checked={this.state.groupOne} />
                    <Checkbox group={'forschung5ebiet'} parentGroup={"geistes"} partCheckSub={this.state.subGroupThree} color={'green'} title={'Geschichtswissenschaften'} checked={this.state.groupOne} />
                    <Checkbox group={'forschung5ebiet'} parentGroup={"geistes"} partCheckSub={this.state.subGroupThree} color={'green'} title={'geistes- und sozialwissenschaften'} checked={this.state.groupOne} />
                </div>
                <div className="checkGroup">
                    <Checkbox group={'forschung5ebiet'} togglePart={this.togglePart} partCheckSub={this.state.subGroupFour}  ifFirst={'first'} color={'violet'} title={'unbekannt'} checked={this.state.groupOne} />
                    <Checkbox group={'forschung5ebiet'} parentGroup={"unbekannt"} partCheckSub={this.state.subGroupFour} color={'violet'} title={'unbekannt'} checked={this.state.groupOne} />
                </div>
            </React.Fragment>
         );
    }
}
 
export default CheckGroup;