import React, { useEffect } from 'react'
import * as d3 from 'd3'
import Flare from './flare.json'

export default function circleAnidate() {
    /* useEffect(() => {
        var width = 450
        var height = 450
 
        // append the svg object to the body of the page
        var svg = d3.select("#gio")
            .append("svg")
            .attr("width", 450)
            .attr("height", 450)
 
        // create dummy data -> just one element per circle
        var data = [{ "name": "A" }, { "name": "B" }, { "name": "C" }, { "name": "D" }, { "name": "E" }, { "name": "F" }, { "name": "G" }, { "name": "H" }]
 
        // Initialize the circle: all located at the center of the svg area
        var node = svg.append("g")
            .selectAll("circle")
            .data(data)
            .enter()
            .append("circle")
            .attr("r", 25)
            .attr("cx", width / 2)
            .attr("cy", height / 2)
            .style("fill", "#69b3a2")
            .style("fill-opacity", 0.3)
            .attr("stroke", "#69a2b2")
            .style("stroke-width", 4)
 
        // Features of the forces applied to the nodes:
        var simulation = d3.forceSimulation()
            .force("center", d3.forceCenter().x(width / 2).y(height / 2)) // Attraction to the center of the svg area
            .force("charge", d3.forceManyBody().strength(0.5)) // Nodes are attracted one each other of value is > 0
            .force("collide", d3.forceCollide().strength(.01).radius(30).iterations(1)) // Force that avoids circle overlapping
 
        simulation
            .nodes(data)
            .on("tick", function (d) {
                node
                    .attr("cx", function (d) { return d.x; })
                    .attr("cy", function (d) { return d.y; })
            });
 
    }, [])  */

    var data = [
        { "child": "Jhon", "parent": "" },
        { "child": "Aaron", "parent": "Kevin" },
        { "child": "Kevin", "parent": "Jhon" },
        { "child": "Hannah", "parent": "Ann" },
        { "child": "Rosse", "parent": "Sarah" },
        { "child": "Ann", "parent": "Jhon" },
        { "child": "Sarah", "parent": "Kevin" },
        { "child": "Mark", "parent": "Ann" },
        { "child": "Angel", "parent": "Sarah" },
    ]
    useEffect(() => {
        var svg = d3.select("#gio")
            .append("svg")
            .attr('width', 600)
            .attr('height', 600)
            .append('g')
            .attr('transform', 'translate(50, 50)')
        var dataStructure = d3.stratify()
            .id(function (d: any) { return d.child; })
            .parentId(function (d: any) { return d.parent })
            (data);
        var treeStructure = d3.tree()
            .size([500, 300]);
        var information = treeStructure(dataStructure);
        console.log(information.descendants())
        console.log(information.links())

        var circles = svg.append('g').selectAll('cirle')
            .data(information.descendants())
        circles.enter()
            .append('circle')
            .attr('cx', function (d) { return d.x })
            .attr('cy', function (d) { return d.y })
            .attr('r', 5)
            .attr('fill', 'blue')
        var conections = svg.append('g').selectAll('path').data(information.links())
        conections.enter().append('path')
            .attr('d', function (d) {
                return 'M' + d.source.x + ', ' + d.source.y + ' C ' +
                    d.source.x + ',' + (d.source.y + d.target.y) / 2 + ' ' +
                    d.target.x + ',' + (d.source.y + d.target.y) / 2 + ' ' +
                    d.target.x + ',' + d.target.y;
            })
            .attr('fill', 'none')
            .attr('stroke', 'black')
        var names = svg.append('g')
            .selectAll('text')
            .data(information.descendants())
        names.enter()
            .append('text')
            .text(function (d: any) { return d.data.child; })
            .attr('x', function (d) { return d.x + 7 })
            .attr('y', function (d) { return d.y + 4 })
    }, [])


    return (
        <div id='gio'>

        </div>
    )
}
