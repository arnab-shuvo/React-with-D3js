import React, { Component } from 'react';
import icon from '../../../assets/images/geistes_icon.png'

class DetailView extends Component {
    state = { 
        projectList: [],
        totalProject: '',
        projectdetails: {},
        index: ''
     }
    componentWillMount(){
        this.state.projectList = this.props.projectList;
        this.state.totalProject = this.state.projectList.length;
        this.state.projectdetails = this.props.projectdetails;
        this.state.index = this.props.index;
    }
    prev = () =>{
        let currentIndex = this.state.index;
        if (currentIndex != 1 ) {
            const prevIndex = currentIndex - 1;
            const prevData = this.state.projectList[prevIndex - 1];
            this.setState({ projectdetails: prevData, index: prevIndex });
        }
        
    }
    next = () =>{
        let currentIndex = this.state.index;
        if (currentIndex < this.state.totalProject) {
            const prevIndex = currentIndex + 1;
            const prevData = this.state.projectList[prevIndex - 1];
            this.setState({ projectdetails: prevData, index: prevIndex });
        }
        
        
    }
    componentDidMount(){
        // console.log(this.props.index, 'index');
        
    }

    render() { 
        console.log(this.state.index, 'index');
        const { showDatamodal, closeModal} = this.props;
        const projectdetails = this.state.projectdetails;
        const index = this.state.index;
        
        return ( 
            <div className={"detail dt_modal chartModal " + (showDatamodal ? 'show' : 'hide')}>
                <div className="modal-control">
                    <p className="modal_closer" onClick={closeModal}>X</p>
                </div>
                <div className="project_control">
                    <p><span onClick={this.prev}> ^ </span> {index } of {this.state.totalProject} in {projectdetails.start_date}<span onClick={this.next}> ^ </span></p>
                </div>
                <div className="dt_modal_header clearfix">
                    <div className="left-icon part">
                        <img src={icon} alt="logo" />
                    </div>
                    <div className="right-text part">
                        <p>forschungsprojekt_</p>
                        <p>{(projectdetails.research_area) ? projectdetails.research_area.replace(/ .*/, '') : 'N/A'}</p>
                    </div>
                </div>

                <div className="dt_modal_title">
                    <p>{(projectdetails.title) ? projectdetails.title.substr(0, 50) : 'N/A'}</p>
                </div>
                <div className="dt_modal_des">
                    <p>{(projectdetails.abstract) ? projectdetails.abstract.substr(0, 120) : 'N/A'}</p>
                </div>
                <div className="dt_modal_info">
                    <p className="info_label">hauptthema</p>
                    <p className="info_des">{(projectdetails.review_board) ? projectdetails.review_board : 'N/A'}</p>
                </div>
                <div className="dt_modal_info_split clearfix">
                    <div className="info_split info_left">
                        <div className="dt_modal_info">
                            <p className="info_label">projektleiter</p>
                            <p className="info_des">{(projectdetails.project_leader) ? projectdetails.project_leader : 'N/A'}</p>
                        </div>
                        <div className="dt_modal_info">
                            <p className="info_label">Start</p>
                            <p className="info_des">{(projectdetails.start_date) ? projectdetails.start_date : 'N/A'}</p>
                        </div>
                    </div>
                    <div className="info_split info_right">
                        <div className="dt_modal_info">
                            <p className="info_label">antragsteller</p>
                            <p className="info_des">{(projectdetails.applicant) ? projectdetails.applicant : 'N/A'}</p>
                        </div>
                        <div className="dt_modal_info">
                            <p className="info_label">Ende</p>
                            <p className="info_des">{(projectdetails.end_date) ? projectdetails.end_date : 'N/A'}</p>
                        </div>
                        
                    </div>
                </div>

                <div className="dt_modal_text_area">
                    <textarea></textarea>
                </div>
                <div className="dt_modal_info_split clearfix">
                    <div className="info_split info_left">
                        <div className="dt_modal_info">
                            <p className="info_label">GELDGEBER</p>
                            <p className="info_des">{(projectdetails.sponsor) ? projectdetails.sponsor : 'N/A'}</p>
                        </div>
                        <div className="dt_modal_info">
                            <p className="info_label">nebenthenem</p>
                            <p className="info_des">{(projectdetails.side_topics[0] !== null) ? projectdetails.side_topics : 'N/A'}</p>
                        </div>
                        
                    </div>
                    <div className="info_split info_right">
                        <div className="dt_modal_info">
                            <p className="info_label">kooperationspartner</p>
                            <p className="info_des">{(projectdetails.cooperating_institutions[0] !== null) ? projectdetails.cooperating_institutions : 'N/A'}</p>
                        </div>
                        <div className="dt_modal_info">
                            <p className="info_label">links</p>
                            <p className="info_des"><a href={(projectdetails.href) ? projectdetails.href : 'N/A'}>GO</a></p>
                        </div>
                        
                    </div>
                </div>
                


            </div>
         );
    }
}
 
export default DetailView;