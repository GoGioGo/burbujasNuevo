import React, { useEffect, useRef, useState } from 'react'
import Data from '../circle2/data.json'
import * as d3 from 'd3'

export default function Prueba() {
    const ref = useRef<SVGSVGElement | null>(null)
    const [data, setDat] = useState<any | null>(Data)
    const animalsHierarchy = d3.hierarchy(data).sum(() => 1)
    const createPack = d3.pack().size([500, 500]).padding(10)
    const statePack = createPack(animalsHierarchy)
    let colors = ['#efefef', '#c5c9cb', '#9a9fa1', '#849494', '#b67e82', '#bf948c', '#646c73', 'yellow', 'blue', 'orange']

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
    }, [])
    return (
        <div>
            <svg ref={ref} width='960' height='960' />
        </div>
    )
}
