import React, { useEffect, useRef, useState } from 'react'
import * as d3 from 'd3'
import dat from './data2.json'

export default function CircleThree() {
    const ref = useRef<SVGSVGElement | null>(null);
    const [data, setData] = useState<any | null>(dat)



    const height = 960;
    const width = 960;
    var diameter = width;
    var margin = 20

    function graphCircle() {
        var svg = d3.select(ref.current)
        svg
            .style("width", width + 'px')
            .style("height", height + 'px');
        var g = svg
            .append("g")
            .attr("transform", "translate(" + 1 + "," + 1 + ")");
        var pack = d3.pack()
            .size([diameter - margin, diameter - margin])


        var root: any = d3.hierarchy(data)
            .sum(function (d) { return 33; })
            .sort(function (a: any, b: any) { return b.value - a.value; })

        var focus = root,
            nodes = pack(root).descendants();
        let sw = 0

        var circle = g.selectAll("circle")
            .data(nodes)
            .enter().append("circle")
            .attr('cx', function (d: any) { return d.x })
            .attr('cy', function (d: any) { return d.y })
            .attr('r', function (d) { return d.r - 5 })
            .attr("class", function (d: any) {
                return d.parent ? (d.children ? "node" : "node node--leaf") : "node node--root";
            })
            .attr('stroke', function (d) {
                if (sw != 2) {
                    sw++
                    return 'transparent'
                }
                else
                    return 'black'
            })
            .attr('fill', 'transparent')


    }
    useEffect(() => {
        graphCircle()
    }, [])

    return (
        <div>
            <svg ref={ref} />
        </div>
    )
}
