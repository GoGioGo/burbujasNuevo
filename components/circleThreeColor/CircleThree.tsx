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
            .sum(function (d) { return d.age / 10; })
            .sort(function (a: any, b: any) { return b.value - a.value; })

        var nodes = pack(root).descendants();
        let sw = 0, sw1 = 0, sw2 = 0, radius = 0, n = nodes.length
        let color = ['#63a0c4', '#cae3f0', '#edb266']
        var circle = g.selectAll("circle")
            .data(nodes)
            .enter().append("circle")
            .attr('cx', function (d: any) { return d.x })
            .attr('cy', function (d: any) { return d.y })
            .attr('r', function (d) {
                if (sw1 == 0) {
                    sw1++
                    radius = d.r
                    return d.r
                }
                else {
                    return radius / n * 1.7
                }

            })
            .attr("class", function (d: any) {
                return d.parent ? (d.children ? "node" : "node node--leaf") : "node node--root";
            })
            .attr('stroke', function (d) {
                if (sw == 0) {
                    sw++
                    return 'transparent'
                }
                else
                    return 'black'
            })
            .style('fill', function (d: any) {
                if (sw2 != 0) {
                    console.log(d.data.age)
                    if (d.data.age <= 20) {
                        console.log('menor a 20')
                        return color[0]
                    }
                    else {
                        if (d.data.age > 40)
                            return color[2]
                        else
                            return color[1]
                    }
                }
                else {
                    sw2++
                    return 'transparent'
                }
            })
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
