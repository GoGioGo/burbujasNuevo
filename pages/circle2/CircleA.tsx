import React, { useState, useEffect, useRef } from 'react'
import * as d3 from 'd3'
import Da from './data.json'
import Fla from './flare.json'

export default function CircleA() {

    const ref = useRef<SVGSVGElement | null>(null)
    const [data, setDat] = useState<any | null>(Da)

    const animalsHierarchy = d3.hierarchy(data).sum(() => 1)
    const createPack = d3.pack().size([500, 500]).padding(10)
    const statePack = createPack(animalsHierarchy)
    let colors = ['#efefef', '#c5c9cb', '#9a9fa1', '#849494', '#b67e82', '#bf948c', '#646c73', 'yellow', 'blue', 'orange']
    let focus = statePack;
    console.log(focus, 'state =>', statePack)

    /*  function zoom(d:any) {
        var focus0 = focus; focus = d;

        var transition = d3.transition()
            .duration(3000)
            .attrTween("transform", function (d) {
                var i = d3.interpolateZoom(v, [focus.x, focus.y, focus.r * 2 + margin]);
                return function (t) { zoomTo(i(t)); };
            });

        transition.selectAll("text")
            .filter(function (d:any) { return d.parent === focus || this.style.display === "inline"; })
            .style("fill-opacity", function (d:any) { return d.parent === focus ? 1 : 0; })
            .on("start", function (d:any) { if (d.parent === focus) this.style.display = "inline"; })
            .on("end", function (d:any) { if (d.parent !== focus) this.style.display = "none"; });
    } 
 */

    // const interpolator = d3.interpolateZoom((start:any), (end:any))

    useEffect(() => {
        let a = d3.select(ref.current)
            .selectAll('circle')
            .data(statePack.descendants())
            .enter()
            .append('circle')
            .attr('cx', function (d: any) { return d.x })
            .attr('cy', function (d: any) { return d.y })
            .attr('r', function (d: any) { return d.r })
            .attr('fill', function (d, i) { return colors[i] })
            .attr('stroke', 'black')
            .on("mouseover", function () { d3.select(this).attr("stroke", "#000"); })
            .on("mouseout", function () { d3.select(this).attr("stroke", null); })
        //           .on("click", function (d) { if (focus !== d) zoom(d)});

        d3.select(ref.current)
            .selectAll('text')
            .data(statePack.descendants().slice(1))
            .enter()
            .append('text')
            .attr('x', function (d: any) { return d.x })
            .attr('y', function (d: any) { return d.y })
            .text(function (d: any) { return d.data.name })
            .attr('font-weight', 'bold')
            .style('opacity', '1')
            .attr('font-size', '10px')
            .attr('font-color', 'black')

        /*             function transform(t:any) {
                        
                        const view = interpolator(t);
                      
                        const k = Math.min(w, h) / view[2]; // scale
                        const translate = [w / 2 - view[0] * k, h / 2 - view[1] * k]; // translate
                      
                        return `translate(${translate}) scale(${k})`;
                      } */


    }, [])
    return (
        <div>
            <svg ref={ref} width='960' height='960' />
        </div>
    )
}
