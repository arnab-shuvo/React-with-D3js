import React, { Component } from 'react';
import DrawLineChart from './drawLineChart';
import { connect } from "react-redux";


class LineChart extends Component {
    state = {
        width: 800,
        height: 300,
        data: this.props.SortedData,
        lineData: {
            Naturwissenschaften: {},
            Lebenswissenschaften: {},
            Geistes: {},
            Unbekannt: {}
        },
        simplifiedJson: {}
    }


    componentWillMount() {





        let width = window.innerWidth;
        if (width > "1517") {
            this.state.width = 1140;
            this.state.height = 600;
        }
        else {
            this.state.width = 800;
            this.state.height = 400;
        }


        let comp_this = this;
        this.state.data.map(function (item, i) {

            let totalWords = item.research_area;
            if (totalWords == null) {
                totalWords = '';
            }
            var firstWord = totalWords.replace(/ .*/, '');


            switch (firstWord) {
                case "Lebenswissenschaften":
                    if (!(comp_this.state.lineData.Lebenswissenschaften.hasOwnProperty(item.start_date))) {
                        comp_this.state.lineData.Lebenswissenschaften[item.start_date] = [item];
                    }
                    else {
                        comp_this.state.lineData.Lebenswissenschaften[item.start_date].push(item);
                    }
                    break;
                case "Naturwissenschaften":
                    if (!(comp_this.state.lineData.Naturwissenschaften.hasOwnProperty(item.start_date))) {
                        comp_this.state.lineData.Naturwissenschaften[item.start_date] = [item];
                    }
                    else {
                        comp_this.state.lineData.Naturwissenschaften[item.start_date].push(item);
                    }
                    break;

                case "Geistes-":
                    if (!(comp_this.state.lineData.Geistes.hasOwnProperty(item.start_date))) {
                        comp_this.state.lineData.Geistes[item.start_date] = [item];
                    }
                    else {
                        comp_this.state.lineData.Geistes[item.start_date].push(item);
                    }
                    break;
                default:
                    if (!(comp_this.state.lineData.Unbekannt.hasOwnProperty(item.start_date))) {
                        comp_this.state.lineData.Unbekannt[item.start_date] = [item];
                    }
                    else {
                        comp_this.state.lineData.Unbekannt[item.start_date].push(item);
                    }
                    break;
            }
        });
    }

    categorySorter = (start_date, end_date, Parent, mainData, subCat) => {
        let comp_this = this;
        let category = [];
        switch (mainData) {
            case 'naturwissenschaften':
                category = this.props.subCatNat;                
                break;

            case 'lebenswissenschaften':
                category = this.props.subCatLeben;    
                break;

            case 'geistes-':
                category = this.props.subCatGeists;    
                break;

            default:
                break;
        }

        Parent.item.map(function (item, i) {
            let date = parseInt(item.start_date);
            if (category.includes(item.review_board)) {
                if (Parent.subGraphData.length == 0) {
                    Parent.subGraphData.push({
                        date: date,
                        value: 1
                    });
                }
                else 
                {
                    
                    let isFound = Parent.subGraphData.find((d) => {
                        return d.date == date;
                    });
                    if (!isFound) {
                        Parent.subGraphData.push({
                            date: date,
                            value: 1
                        });
                    }
                    else {
                        let index = Parent.subGraphData.findIndex(x => x.date == date);
                        Parent.subGraphData[index].value = Parent.subGraphData[index].value + 1;
                    }
                }
            }

            
        });

    }


    dataSorter = (start_date, end_date, GrandParentArray, mainData, subCatagory, subsponser) => {
        let parentArray = [];

        let subCat = subCatagory;
        switch (mainData) {
            case 'naturwissenschaften':
                parentArray = GrandParentArray.Naturwissenschaften;                
                break;

            case 'lebenswissenschaften':
                parentArray = GrandParentArray.Lebenswissenschaften;
                break;

            case 'geistes-':
                parentArray = GrandParentArray.Geistes;
                break;

            case 'unbakent':
                parentArray = GrandParentArray.Unbekannt;
                break;

            default:
                break;
        }
        
        this.state.data.map(function (item, i) {
            let date = parseInt(item.start_date)

            let research_area = item.research_area;
            if (research_area == null) {
                research_area = '';
            }
            let dataKey = research_area.replace(/ .*/, '').toLowerCase();
            
            if (research_area ) {
                
                if ((dataKey == mainData) && (item.start_date >= start_date) && 
                    (item.start_date <= end_date) && (item.review_board != null) && 
                    (subsponser.includes(item.sponsor))) {

                    
                    
                    if(item.review_board !== null){                        
                        parentArray.item.push(item);
                    }
                    
                    
                    
                    if (parentArray.graphData.length === 0) {
                        parentArray.graphData.push({
                            date: date,
                            value: 1
                        });
                    }
                    else {
                        var isFound = parentArray.graphData.find((d) => {
                            return d.date == date;
                        });
                        if (!isFound) {
                            parentArray.graphData.push({
                                date: date,
                                value: 1
                            });
                        }
                        else {
                            let index = parentArray.graphData.findIndex(x => x.date == date);
                            parentArray.graphData[index].value += 1;


                        }
                    }
                }


            }
            else if(item.research_area == null && mainData == "unbakent") {
                
                
                if ((item.research_area == null) && (item.start_date >= start_date) && (item.start_date <= end_date) && (subsponser.includes(item.sponsor))) {
                    parentArray.item.push(item);

                    if (parentArray.graphData.length == 0) {
                        parentArray.graphData.push({
                            date: date,
                            value: 1
                        });
                    }
                    else {
                        var isFound = parentArray.graphData.find((d) => {
                            return d.date == item.start_date;
                        });
                        if (!isFound) {
                            parentArray.graphData.push({
                                date: date,
                                value: 1
                            });
                        }
                        else {
                            let index = parentArray.graphData.findIndex(x => x.date == date);
                            parentArray.graphData[index].value += 1;


                        }
                    }
                }
            }


        });


        this.categorySorter(start_date, end_date, parentArray, mainData, subCat);



    }



    componentDidMount() {

    }
    dynamicSort = (property) => {
        var sortOrder = 1;
        if (property[0] === "-") {
            sortOrder = -1;
            property = property.substr(1);
        }
        return function (a, b) {
            var result = (a[property] < b[property]) ? -1 : (a[property] > b[property]) ? 1 : 0;
            return result * sortOrder;
        }
    }



    generalDataSet = (parentArray) => {
        this.state.data.map(function (item, i) {

            if (parentArray.generalData.length == 0) {
                parentArray.generalData.push({
                    date: item.start_date,
                    value: 1
                });
            }
            else {
                var isFound = parentArray.generalData.find((d) => {
                    return d.date == item.start_date;
                });
                if (!isFound) {
                    parentArray.generalData.push({
                        date: item.start_date,
                        value: 1
                    });
                }
                else {
                    let index = parentArray.generalData.findIndex(x => x.date == item.start_date);
                    parentArray.generalData[index].value += 1;


                }
            }
        });
        parentArray.generalData.sort(this.dynamicSort("date"));
    }


    render() {



        let DataHolder = {
            Naturwissenschaften: {
                item: [],
                graphData: [],
                subGraphData: []
            },
            Lebenswissenschaften: {
                item: [],
                graphData: [],
                subGraphData: []
            },
            Geistes: {
                item: [],
                graphData: [],
                subGraphData: []
            },
            Unbekannt: {
                item: [],
                graphData: []
            },
            generalData: []
        }
        let data = this.state.data;
        const start_date = Math.min.apply(Math, data.map(function (o) { return o.start_date; }));
        const end_date = Math.max.apply(Math, data.map(function (o) { return o.end_date; }));

        this.dataSorter(start_date, end_date, DataHolder, "naturwissenschaften", this.props.subCatNat, this.props.Statesponsor);
        this.dataSorter(start_date, end_date, DataHolder, "lebenswissenschaften", this.props.subCatLeben, this.props.Statesponsor);
        this.dataSorter(start_date, end_date, DataHolder, "geistes-", this.props.subCatGeists, this.props.Statesponsor);
        this.dataSorter(start_date, end_date, DataHolder, "unbakent", [], this.props.Statesponsor);
        this.generalDataSet(DataHolder);
        this.state.simplifiedJson = DataHolder;






        return (
            <div id="line-chart">
                <DrawLineChart
                    lineData={this.state.lineData}
                    formatedData={this.state.simplifiedJson}
                    height={this.state.height}
                    width={this.state.width}
                    marginLeft={60}
                    marginRight={60}
                    marginTop={60}
                    marginBottom={60} />
            </div>
        )
    }
}

const mapStateToProps = state => {
    return state;
};
const mapDispatchToProps = (dispatch) => {

}


const MappedComponent = connect(mapStateToProps, mapDispatchToProps)(LineChart);
export default MappedComponent;