import React, { useState, useEffect, useRef } from 'react'
import * as d3 from 'd3'
import Da from './data.json'

export default function CircleA() {

    const [data, setDat] = useState<any | null>(Da)

    const animalsHierarchy = d3.hierarchy(data).sum(() => 1)

    const createPack = d3.pack().size([500, 500]).padding(10)
    const animalPack = createPack(animalsHierarchy)

    const ref = useRef<SVGSVGElement | null>(null)
    let colors = ['#efefef', '#c5c9cb', '#9a9fa1', '#849494', '#b67e82', '#bf948c', '#646c73', 'yellow', 'blue', 'orange']

    useEffect(() => {
        let a = d3.select(ref.current)
            .selectAll('circle')
            .data(animalPack.descendants())
            .enter()
            .append('circle')
            .attr('cx', function (d: any) { return d.x })
            .attr('cy', function (d: any) { return d.y })
            .attr('r', function (d: any) { return d.r })
            .attr('fill', function (d, i) { return colors[i] })
            .attr('stroke', 'black')
        d3.select(ref.current)
            .selectAll('text')
            .data(animalPack.descendants())
            .enter()
            .append('text')
            .attr('x', function (d: any) { return d.x })
            .attr('y', function (d: any) { return d.y })
            .text(function (d: any) { return 'Texto' })
            .attr('font-weight', 'bold')
            .style('opacity', '1')
            .attr('font-size', '10px')
            .attr('font-color', 'black')

    }, [])

    return (
        <div>
            <svg ref={ref} width='500' height='500' />
        </div>
    )
}
