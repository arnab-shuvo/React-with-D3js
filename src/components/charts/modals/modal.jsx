import React, { Component } from 'react';
import './modal.scss';
import DetailView from './detail'

class ChartModal extends Component {
    state = { 
        detailView: false,
        projectDetails: {},
        index: '1'
     }
    detail= (item, i) =>{
        console.log(item, 'custom_item');
        
        let detailView = true;
        let index = i+1 ;
        this.setState({ projectDetails: item, detailView, index});   
    }
    closeModal = () =>{
        if (!(this.state.detailView)) {
            this.props.modalToggle();            
        }
        else{
            this.setState({ detailView: false});
        }
        
    }
    componentWillMount(){
        if (this.props.newNode) {
            this.state.detailView = false;
        }
    }
    render() {     
        const { showDatamodal, projectList} = this.props;
        let projectdetails = this.state.projectDetails;
        let comp_this = this;
        if (!(this.state.detailView)) {
            return (
                <React.Fragment>
                    <div className={"chartModal " + (showDatamodal ? 'show' : 'hide')}>
                        <div className="modal-control">
                            <p className="modal_closer" onClick={this.closeModal}>X</p>
                        </div>
                        <p className="chartModal_title">Projects</p>
                        <ol className="chartModal_list">
                            {
                                projectList.map(function (item, i) {

                                    return <li key={i} onClick={() => comp_this.detail(item, i)}>{item.title}</li>

                                })
                            }
                        </ol>
                    </div>
                </React.Fragment>
            );
        }
        else{
            return (
                <React.Fragment>
                    <DetailView index={this.state.index} projectList={projectList} projectdetails={projectdetails} showDatamodal={showDatamodal} closeModal={this.closeModal}/>
                </React.Fragment>
            );
        }
    }
}
 
export default ChartModal;