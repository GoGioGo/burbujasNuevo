import React, { useState, useEffect, useRef } from 'react'
import * as d3 from 'd3'
import Fla from './flare.json'

export default function CircleA() {
    const ref = useRef<SVGSVGElement | null>(null);
    const [data] = useState<any | null>(Fla);

    const height = 960;
    const width = 960;
    var diameter = width;

    var margin = 20

    function draw() {
        var svg = d3.select(ref.current)

        svg
            .style("width", width + 'px')
            .style("height", height + 'px');

        var g = svg
            .append("g")
            .attr("transform", "translate(" + diameter / 2 + "," + diameter / 2 + ")");
        var pack = d3.pack()
            .size([diameter - margin, diameter - margin])
        var colorRange: any = ["hsl(152,80%,80%)", "hsl(228,30%,40%)"];
        var d3Interpolation: any = d3.interpolateHcl;
        var color = d3.scaleLinear()
            .domain([-1, 5])
            .range(colorRange)
            .interpolate(d3Interpolation);

        var root: any = d3.hierarchy(data)
            .sum(function (d) { return d.size; })
            .sort(function (a: any, b: any) { return b.value - a.value; })

        var focus = root,
            nodes = pack(root).descendants();
        var view : any;

        var circle = g.selectAll("circle")
            .data(nodes)
            .enter().append("circle")
            .attr("class", function (d: any) {
                return d.parent ? (d.children ? "node" : "node node--leaf") : "node node--root";
            })
            .style("fill", function(d) { return d.children ? color(d.depth) : null; })
            .on("click", function(d) {
                if (focus !== d) {
                    zoom(d);
                    var _d3: any = d3;
                    var event: any = _d3.event;
                    event.stopPropagation();
                }
            });
            var text = g.selectAll("text")
                .data(nodes)
                .enter().append("text")
                .attr("class", "label")
                .style("fill-opacity", function(d) { return d.parent === root ? 1 : 0; })
                .style("display", function(d) { return d.parent === root ? "inline" : "none"; })
                .text(function(d: any) { return d.data.name; });
            var node = g.selectAll("circle,text");

            svg
                .style("background", color(-1))
                .on("click", function() { zoom(root); });

            zoomTo([root.x, root.y, root.r * 2 + margin]);
            
            function zoom(d: any) {
                var focus0 = focus; 
                focus = d;
                let v: any = view;
                var _d3: any = d3;
                var event: any = _d3.event;
                var transition = d3.transition()
                    .duration(event ? 1000 : 750)
                    .tween("zoom", function (d) {
                        var i = d3.interpolateZoom(v, [focus.x, focus.y, focus.r * 2 + margin]);
                        return function (t) { zoomTo(i(t)); };
                    });
                transition.selectAll("text")
                    .filter(function (d: any) { return d.parent === focus })
                    .style("fill-opacity", function (d: any) { return d.parent === focus ? 1 : 0; })
                    .on("start", function(d: any) {
                        //if (d.parent === focus)
                        //   this.style.display = "inline";
                    })
                    .on("end", function(d: any) {
                        //if (d.parent !== focus)
                        //   this.style.display = "none";
                    });
            }
            function zoomTo(v: any) {
                var k = diameter / v[2]; view = v;
                node.attr("transform", function (d: any) { return "translate(" + (d.x - v[0]) * k + "," + (d.y - v[1]) * k + ")"; });
                circle.attr("r", function (d: any) { return d.r * k; });
            }

    }
    useEffect(() => {
        draw()
    }, [])

    const transition = () => {

    }

    return (
        <div>
            <svg ref={ref} />
            <button type="button" onClick={transition}>
                Transition
            </button>
        </div>
    )
}

