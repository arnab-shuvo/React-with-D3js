import React, { Component } from 'react';
import * as d3 from 'd3';
import ReactDOM from 'react-dom'
import { hierarchy, pack } from 'd3-hierarchy'
const dataJson = require('./flare.json');


class ReactD3Pack extends React.Component {
    // ------------------------------
    // React lifecycle
    // ------------------------------

    // propTypes: {
    //     json: React.PropTypes.string.isRequired,
    //     startDelay: React.PropTypes.number,
    //     elementDelay: React.PropTypes.number
    // },

    // React component Mount
    componentDidMount() {
        this.initD3(this.props.json);
    }

    // Components receive new this.props
    componentWillReceivethis(props) {
        this.load(props);
    }



    // React UnMount
    componentWillUnmount() {
        clearInterval(this.resizeTimer);
    }


    initD3 = (data) => {
        var sampleDate = data.project_data;
        var modifiedDate = [];        
        sampleDate.map(function(item, k){
            let newArray = [];
            newArray.push(item.point[0],item.point[1], item.id, item.cluster);
            modifiedDate.push(newArray);
            
        })
        var data = modifiedDate;
        var docWidth = document.getElementById('svgHolder').offsetWidth; 
        var docheight = document.getElementById('svgHolder').offsetHeight 
        var margin = { top: 20, right: 15, bottom: 60, left: 60 }
            , width = docWidth - margin.left - margin.right
            , height = docheight - margin.top - margin.bottom;

        var x = d3.scaleLinear()
            .domain([0, d3.max(data, function (d) { return d[0]/2; })])
            .range([-50, 50]);

        var y = d3.scaleLinear()
            .domain([0, d3.max(data, function (d) { return d[1]/2; })])
            .range([50, -50]);

        var chart = d3.select('.svgHolder')
            .append('svg:svg')
            .attr('width', width + margin.right + margin.left)
            .attr('height', height + margin.top + margin.bottom)
            .attr('class', 'chart')

        var main = chart.append('g')
            .attr('transform', 'translate(' + width/2 + ',' +height/2 + ')')
            .attr('width', width)
            .attr('height', height)
            .attr('class', 'main')

        // draw the x axis
        // var xAxis =  d3.axisBottom(x).tickFormat(function(d){ return d.x;});

        main.append('g')
            .attr('transform', 'translate('+ width +',' + height + ')')
            .attr('class', 'main axis date')
        // .call(xAxis);

        // draw the y axis
        // var yAxis = d3.axisLeft(y);

        main.append('g')
            .attr('transform', 'translate(0,0)')
            .attr('class', 'main axis date')
        // .call(yAxis);

        var g = main.append("svg:g");


        var natGradient = main.append("svg:defs")
            .append("svg:radialGradient")
            .attr("id", "natgradient")

        // Define the gradient colors
        natGradient.append("svg:stop")
            .attr("offset", "0%")
            .attr("stop-color", "#a4782e")
            .attr("stop-opacity", 1);

        natGradient.append("svg:stop")
            .attr("offset", "100%")
            .attr("stop-color", "transparent")
            // .attr("stop-color", "#46310d")
            .attr("stop-opacity", 1);




        var lebenGradient = main.append("svg:defs")
            .append("svg:radialGradient")
            .attr("id", "lebengradient")

        // Define the gradient colors
        lebenGradient.append("svg:stop")
            .attr("offset", "0%")
            .attr("stop-color", "#994a49")
            .attr("stop-opacity", 1);

        lebenGradient.append("svg:stop")
            .attr("offset", "100%")
            .attr("stop-color", "transparent")
            // .attr("stop-color", "#5a0706")
            .attr("stop-opacity", 1);




        var giestGradient = main.append("svg:defs")
            .append("svg:radialGradient")
            .attr("id", "giestgradient")

        // Define the gradient colors
        giestGradient.append("svg:stop")
            .attr("offset", "0%")
            .attr("stop-color", "#435b22")
            .attr("stop-opacity", 1);

        giestGradient.append("svg:stop")
            .attr("offset", "100%")
            .attr("stop-color", "transparent")
            // .attr("stop-color", "#162502")
            .attr("stop-opacity", 1);



        var unGradient = main.append("svg:defs")
            .append("svg:radialGradient")
            .attr("id", "ungradient")

        // Define the gradient colors
        unGradient.append("svg:stop")
            .attr("offset", "0%")
            .attr("stop-color", "#7675b2")
            .attr("stop-opacity", 1);

        unGradient.append("svg:stop")
            .attr("offset", "100%")
            // .attr("stop-color", "#24235f")
            .attr("stop-color", "transparent")
            .attr("stop-opacity", 1);

        g.selectAll("scatter-dots")
            .data(data)
            .enter().append("svg:circle")
            .attr("cx", function (d, i) { return x(d[0]); })
            .attr("cy", function (d) { return y(d[1]); })
            .attr("r", 10)
            .attr("fill", function (d) {
                if(d[3] == 1){
                    return 'url(#lebengradient)'
                }
                if(d[3] == 2){
                    return 'url(#giestgradient)'
                }
                if(d[3] == 3){
                    return 'url(#ungradient)'
                }
                if(d[3] == 0){
                    return 'url(#natgradient)'
                }
                
            })
            .attr("stroke", function (d) {
                    return "#fff";
            })
            .attr("stroke-width", function (d) {
                    return "0.5";
            })
            .attr("stroke-dasharray", function (d) {
                    return "5,5";
            })
            .on('click', function () {
                alert('Modal Design is on the way');
            });
    }
    zoom = () => {
        alert('test');
    }



    // Render
    render() {
        return <span ></span>
    }

}

export default ReactD3Pack;
