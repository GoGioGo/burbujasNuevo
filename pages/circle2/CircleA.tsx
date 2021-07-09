import React, { useState, useEffect, useRef } from 'react'
import * as d3 from 'd3'
import Da from './data.json'
import Fla from './flare.json'

export default function CircleA() {
    const ref = useRef<SVGSVGElement | null>(null)
    const [data, setDat] = useState<any | null>(Fla)
    var svg: any
    //ESTE DATO ES EL PROBLEMA
    var view=[470, 470, 960]
    var margin = 20
    var diameter: any
    var nodes: any
    var node: any

    var circle: any
    var focus: any

    function initial() {

        var g = svg.append("g").attr("transform", "translate(" + 1 + "," + 1 + ")");
        var pack = d3.pack()
            .size([diameter - margin, diameter - margin])

        var rot = d3.hierarchy(data)
            .sum(function (d) { return d.size; })
            //.sum(() => 1)
            .sort(function (a: any, b: any) { return b.value - a.value; })
        focus = rot;
        nodes = pack(rot).descendants();
        circle = g.selectAll("circle")
            .data(nodes)
            .enter().append("circle")
            .attr("class", function (d: any) { return d.parent ? d.children ? "node" : "node node--leaf" : "node node--root"; })
            .attr('cx', function (d: any) { return d.x })
            .attr('cy', function (d: any) { return d.y })
            .attr('r', function (d: any) { return d.r })
            .attr('fill', 'transparent')
            .attr('stroke', 'black')
            .on("click", function (d: any) { if (focus !== d) zoom(d), d3.event.stopPropagation(); });
        node = g.selectAll("circle,text");

    }
    function zoom(d: any) {
        var focus0 = focus; focus = d;
        console.log('view=>', view, 'llego hasta aqui')
        
        var transition = d3.transition()
            .duration(750)
            .tween("zoom", function (d) {
                var i = d3.interpolateZoom(view, [focus.x, focus.y, focus.r * 2 + margin]);
                return function (t) { zoomTo(i(t)); };
            });
        transition.selectAll("text")
            .filter(function (d: any) { return d.parent === focus })
            .style("fill-opacity", function (d: any) { return d.parent === focus ? 1 : 0; })
    }
    function zoomTo(v: any) {
        console.log('no llego aqui')
        var k = diameter / v[2]; view = v;
        node.attr("transform", function (d: any) { return "translate(" + (d.x - v[0]) * k + "," + (d.y - v[1]) * k + ")"; });
        circle.attr("r", function (d: any) { return d.r * k; });
    }
    useEffect(() => {
        svg = d3.select(ref.current)
        diameter = +svg.attr("width")
        initial()
    }, [])
    return (
        <div>
            <svg ref={ref} width='960' height='960' />
        </div>
    )
}
