import React, { Component } from "react";
import { connect } from "react-redux";
import { genDateValue } from "@vx/mock-data";
import { AxisLeft, AxisBottom } from "@vx/axis";
import { scaleTime, scaleLinear } from "@vx/scale";
import { curveMonotoneX } from "@vx/curve";
import ChartModal from "../modals/modal";
import SvgGroup from "./svgGroup";

class DrawLineChart extends Component {
  state = {
    width: 0,
    height: 0,
    margin: {
      left: 0,
      right: 0,
      top: 0,
      bottom: 0
    },
    showDatamodal: false,
    data: this.props.SortedData,
    modalData: [],
    valueList: [],
    formatedData: {},
    commonData: {}
  };
  modalToggle = () => {
    let showDatamodal = { ...this.state.showDatamodal };
    showDatamodal = !showDatamodal;
    this.setState({ showDatamodal });
  };

  modalDataFormatter = cat => {
    let formatedData = {};
    let sorterData = [];
    let subcat = [];
    let unbakentChecker = false;

    switch (cat) {
      case "naturwissenschaften":
        sorterData = this.props.formatedData.Naturwissenschaften.item;
        subcat = this.props.subCatNat;
        break;

      case "geistes-":
        sorterData = this.props.formatedData.Geistes.item;
        subcat = this.props.subCatGeists;
        break;

      case "lebenswissenschaften":
        sorterData = this.props.formatedData.Lebenswissenschaften.item;
        subcat = this.props.subCatLeben;
        break;

      default:
        sorterData = this.props.formatedData.Unbekannt.item;
        unbakentChecker = true;
        break;
    }

    if (unbakentChecker) {
      sorterData.map(function(item, i) {
        if (!formatedData[item.start_date]) {
          formatedData[item.start_date] = [item];
        } else {
          formatedData[item.start_date].push(item);
        }
      });
    } else {
      sorterData.map(function(item, i) {
        if (subcat.includes(item.review_board)) {
          if (!formatedData[item.start_date]) {
            formatedData[item.start_date] = [item];
          } else {
            formatedData[item.start_date].push(item);
          }
        }
      });
    }
    return formatedData;
  };

  componentWillMount() {
    let width = this.props.width;
    let height = this.props.height;
    let margin = {
      left: this.props.marginLeft,
      right: this.props.marginRight,
      top: this.props.marginTop,
      bottom: this.props.marginBottom
    };
    this.state.width = width;
    this.state.height = height;
    this.state.margin = margin;
  }

  componentDidMount() {
    let valueList = [];
    this.state.data.map(function(item, i) {
      let date = parseInt(item.start_date, 10);
      if (valueList.length == 0) {
        valueList.push({
          date: date,
          value: 1
        });
      } else {
        var isFound = valueList.find(d => {
          return d.date == date;
        });
        if (!isFound) {
          valueList.push({
            date: date,
            value: 1
          });
        } else {
          let index = valueList.findIndex(x => x.date == date);
          valueList[index].value = valueList[index].value + 1;
        }
      }
    });
    valueList.sort(this.dynamicSort("date"));
    this.setState({ valueList, formatedData: this.props.dataSorted });
  }
  dynamicSort = property => {
    var sortOrder = 1;
    if (property[0] === "-") {
      sortOrder = -1;
      property = property.substr(1);
    }
    return function(a, b) {
      var result =
        a[property] < b[property] ? -1 : a[property] > b[property] ? 1 : 0;
      return result * sortOrder;
    };
  };

  click = (data, dataSetTitle) => {
    let dataSource = [];
    let title = "naturwissenschaften";
    switch (dataSetTitle) {
      case "nat":
        title = "naturwissenschaften";
        break;

      case "giests":
        title = "geistes-";
        break;

      case "leben":
        title = "lebenswissenschaften";
        break;

      default:
        title = "unbekent";
        break;
    }

    const year = data.date;
    let dataArray = this.modalDataFormatter(title);
    let modalData = dataArray[year];
    let showDatamodal = !this.state.showDatamodal;
    this.setState({ modalData, showDatamodal });
  };

  render() {
    const data = this.state.valueList;
    window.unb = this.props.formatedData.Unbekannt;

    let geistsDataDrawer = this.props.formatedData.Geistes.subGraphData;
    let LebenswissenschaftenDataDrawer = this.props.formatedData
      .Lebenswissenschaften.subGraphData;
    let NaturwissenschaftenDataDrawer = this.props.formatedData
      .Naturwissenschaften.subGraphData;
    let UnbekanntDataDrawer = this.props.formatedData.Unbekannt.graphData;

    // if (!this.props.showAll && (this.props.subCatNat.length > 0)) {
    //     NaturwissenschaftenDataDrawer = this.props.formatedData.Naturwissenschaften.subGraphData;
    // }
    // if (!this.props.showAll && (this.props.subCatLeben.length > 0)) {
    //     LebenswissenschaftenDataDrawer = this.props.formatedData.Lebenswissenschaften.subGraphData;
    // }
    // if (!this.props.showAll && (this.props.subCatGeists.length > 0)) {
    //     geistsDataDrawer = this.props.formatedData.Geistes.subGraphData;
    // }

    // console.log(, 'NaturwissenschaftenDataDrawer');

    const width = this.state.width;
    const height = this.state.height;
    const margin = this.state.margin;
    // scales
    const date = d => d.date;
    const value = d => d.value;
    const xScale = scaleTime({
      domain: [Math.min(...data.map(date)), Math.max(...data.map(date))]
    });

    const yScale = scaleLinear({
      domain: [0, Math.max(...data.map(value))]
    });

    // positions
    const x = d => xScale(date(d));
    const y = d => yScale(value(d));

    // colors
    const contrast = "#069172";
    const secondary = "transparent";
    const primary = "#50e3c2";

    const yellow = "#a4782e";
    const red = "#994a49";
    const green = "#435b22";
    const violet = "#7675b2";

    // bounds
    const xMax = width - margin.left - margin.right;
    const yMax = height - margin.top - margin.bottom;

    // update scale range to match bounds
    xScale.range([0, xMax]);
    yScale.range([yMax, 0]);

    return (
      <React.Fragment>
        <svg width={width} height={height}>
          <AxisBottom
            scale={xScale}
            top={yMax + margin.top}
            left={margin.left}
            axisClassName="axis-class"
            labelClassName="axis-label-class"
            tickClassName="tick-label-class"
            label=""
            stroke="transparent"
            tickStroke="transparent"
            numTicks={30}
            labelProps={{ fontSize: 12, fill: "#fff" }}
            tickFormat={(val, i) => val / 1}
            tickLabelProps={(value, index) => ({
              dx: "0",
              fill: "#717071",
              fontSize: 8,
              opacity: 1
            })}
          />
          <AxisLeft
            scale={yScale}
            top={margin.top}
            left={margin.left}
            label=""
            labelProps={{ fontSize: 12, fill: "#fff" }}
            tickFormat={(value, index) => `${value}`}
            stroke="transparent"
            tickStroke="trasnparent"
            tickfill="red"
            tickLabelProps={(value, index) => ({
              dx: "-20",
              fill: "#717071",
              fontSize: 8,
              opacity: 1
            })}
          />
          <rect
            x={60}
            y={60}
            width={width}
            height={height}
            fill={secondary}
            rx={14}
          />

          {(this.props.showAll || this.props.showNaturwissenschaften) && (
            <SvgGroup
              data={NaturwissenschaftenDataDrawer}
              x={x}
              y={y}
              stroke={yellow}
              strokeWidth={3}
              curve={curveMonotoneX}
              contrast={yellow}
              secondary={secondary}
              primary={"#fca30e"}
              marginTop={margin.top}
              marginleft={margin.left}
              click={this.click}
              dataSetTitle={"nat"}
            />
          )}

          {(this.props.showAll || this.props.showLebenswissenschaften) && (
            <SvgGroup
              data={LebenswissenschaftenDataDrawer}
              x={x}
              y={y}
              stroke={red}
              strokeWidth={3}
              curve={curveMonotoneX}
              contrast={red}
              secondary={secondary}
              primary={"#fe2825"}
              marginTop={margin.top}
              marginleft={margin.left}
              click={this.click}
              dataSetTitle={"leben"}
            />
          )}
          {(this.props.showAll || this.props.showUnbakent) && (
            <SvgGroup
              data={UnbekanntDataDrawer}
              x={x}
              y={y}
              stroke={violet}
              strokeWidth={3}
              curve={curveMonotoneX}
              contrast={violet}
              secondary={secondary}
              primary={"#9c9bff"}
              marginTop={margin.top}
              marginleft={margin.left}
              click={this.click}
              dataSetTitle={"unbekant"}
            />
          )}
          {(this.props.showAll || this.props.showgeists) && (
            <SvgGroup
              data={geistsDataDrawer}
              x={x}
              y={y}
              stroke={green}
              strokeWidth={3}
              curve={curveMonotoneX}
              contrast={green}
              secondary={secondary}
              primary={"#7ad102"}
              marginTop={margin.top}
              marginleft={margin.left}
              click={this.click}
              dataSetTitle={"giests"}
            />
          )}
        </svg>
        {this.state.modalData.length > 0 && this.state.showDatamodal && (
          <ChartModal
            showDatamodal={this.state.showDatamodal}
            modalToggle={this.modalToggle}
            projectList={this.state.modalData}
            newNode={true}
          />
        )}
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => {
  return state;
};
const mapDispatchToProps = dispatch => {
  return {
    showAllData() {
      const action = { type: "ShowAll" };
      dispatch(action);
    }
  };
};

const MappedComponent = connect(
  mapStateToProps,
  mapDispatchToProps
)(DrawLineChart);
export default MappedComponent;
