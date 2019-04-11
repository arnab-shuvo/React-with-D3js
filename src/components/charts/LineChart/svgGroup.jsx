import React, { Component } from 'react';
import { Group } from '@vx/group';
import { GlyphDot } from '@vx/glyph';
import { LinePath } from '@vx/shape';
import { curveMonotoneX } from '@vx/curve';
import { connect } from "react-redux";
var dataJson = require('./projects.json');

class SvgGroup extends Component {


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
        data: dataJson,
        simpleData: {},
        simpleDataLength: {},
        modalData: [],
        valueList: [],
        lineData: {
            Naturwissenschaften: [],
            Lebenswissenschaften: [],
            Geistes: [],
            Unbekannt: []
        },
        hoverEffect: false
    }
    modalToggle = () => {
        let showDatamodal = { ...this.state.showDatamodal }
        showDatamodal = !showDatamodal;
        this.setState({ showDatamodal });
    }

    componentWillMount() {
        let width = this.props.width;
        let height = this.props.height;
        let margin = {
            left: this.props.marginLeft,
            right: this.props.marginRight,
            top: this.props.marginTop,
            bottom: this.props.marginBottom
        }
        this.state.width = width;
        this.state.height = height;
        this.state.margin = margin;
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



    render() {
        
        const {
            x,
            y,
            stroke,
            strokeWidth,
            curve,
            contrast,
            secondary,
            primary,
            marginTop,
            marginleft } = this.props;

        const data = this.props.data.sort(this.dynamicSort("date"));

        const yellow = "#a4782e";


        return (

            <Group transform={"translate(" + marginleft + "," + marginTop + ")"}>

                <LinePath
                    data={data}
                    x={x}
                    y={y}
                    stroke={stroke}
                    strokeWidth={1}
                    curve={curveMonotoneX}
                />


                {data.map((d, i) => {
                    const cx = x(d);
                    const cy = y(d);


                    return (
                        <g key={`line-point-${i}`} className={'dotted'} onClick={() => this.props.click(d, this.props.dataSetTitle)}>
                            {/* <GlyphDot className={'glyph'} cx={cx} cy={cy} r={6} fill={contrast} stroke={secondary} strokeWidth={10} /> */}
                            <GlyphDot cx={cx} cy={cy} r={2} fill={contrast} stroke={primary} strokeWidth={3} />
                            <GlyphDot cx={cx} cy={cy} r={1} fill={primary} stroke={primary} />
                            {/* <GlyphDot cx={cx} cy={cy} r={4} fill={contrast} /> */}
                            {/* <GlyphDot cx={cx} cy={cy} r={2} fill={contrast} stroke={primary} /> */}

                        </g>
                    );
                })}

            </Group>
        );
    }
}


const mapStateToProps = state => {
    return state;
};
const mapDispatchToProps = (dispatch) => {
    return {
        showAllData() {
            const action = { type: "ShowAll" }
            dispatch(action);
        },
    }
}


const MappedComponent = connect(mapStateToProps, mapDispatchToProps)(SvgGroup);
export default MappedComponent;