import * as d3 from 'd3'
import { useState } from 'react'
import { propLine, propText, propC } from './Interfaces'
import { obtX, obtY } from './functions2'

//grafica textos de los bordes del spider chart
export function textGra(svgRef: any, x: number, y: string, grados: number) {
    let h: propText = {
        x: 0,
        y: 0,
        text: ''
    }
    if (grados < 180)
        h.y = Math.abs(obtY(x, grados))
    else
        h.y = -Math.abs(obtY(x, grados))
    if (grados < 90 || grados > 270)
        h.x = Math.abs(obtX(x, grados))
    else
        h.x = -Math.abs(obtX(x, grados))
    h.text = y
    text(h, svgRef)
}
//grafica texto en cuanquier lugar
export function text(x: propText, svgRef: any) {
    d3.select(svgRef.current)
        .append('text')
        .attr('font-size', `${x.size}`)
        .attr('font-weight', 'bold')
        .style('opacity', '1')
        .attr('x', x.x)
        .attr('y', x.y)
        .text(`${x.text}`)
}
export function printLine(x: propLine, y: string, z: string) {
    d3.select(`#${y}`)
        .append('line')
        .attr('x1', x.x1)
        .attr('y1', x.y1)
        .attr('x2', x.x2)
        .attr('y2', x.y2)
        .attr('opacity', x.opacity!)
        .style('stroke', z)

}

export function graflinea(x: propC, y: propC, z: propC, a: string, c: string) {
    printLine({ x1: x.percentage * 3, y1: x.poblationWeighted / 10000, x2: y.percentage * 3, y2: y.poblationWeighted / 10000 }, a, c)
    printLine({ x1: y.percentage * 3, y1: y.poblationWeighted / 10000, x2: z.percentage * 3, y2: z.poblationWeighted / 10000 }, a, c)
}

export function findJson(x: number, y: propC[]): propC {
    let h: propC = {
        id: 0,
        country: '',
        poblationWeighted: 0,
        poblationMedian: 0,
        percentage: 0
    }
    y.map((d: propC) => {
        if (d.id == x) {
            h = d;
        }
    })
    return h
}

export function printCircleP(x: propC[], svgRef: any, color: string, c: string) {
    let svg = d3.select(svgRef.current)
    let circle = svg.selectAll('circle')
        .data(x)
        .enter()
        .append('circle')
        .attr('id', function (d: propC, i) { return `${c}` + d.id })
        .attr('cx', function (d: propC, i) { return d.percentage * 4 })
        .attr('cy', function (d: propC, i) { return d.poblationWeighted / 10000 })
        .attr('r', function (d: propC) { return d.poblationWeighted / 100000 })
        .attr('fill', color)
}

export function transitionCircle(x: propC[], svgRef: any, c: string) {
    let h = d3.select(svgRef.current)
        .selectAll('circle')
    for (let i = 0; i <= x.length - 1; i++) {
        h.filter(`#${c}` + i)
            .transition()
            .duration(2000)
            .attr('cx', function (d, j) { return x[i].percentage * 4 })
            .attr('cy', function (d, j) { return x[i].poblationWeighted / 10000 })
    }
}

export function generateNewJson(x: propC[]) {
    x.map((e: propC) => {
        e.percentage = Math.ceil(Math.random() * 100)
        e.poblationWeighted = Math.ceil(Math.random() * 10) * 100000
        e.poblationMedian = Math.ceil(Math.random() * 10) * 100000
    })
}

export function setText(data: string[], svgRef: any, x: number, y: number, size: string, orientacionText: boolean) {
    if (orientacionText) {
        let t = d3.select(svgRef.current)
        let f = t.selectAll('text')
            .data(data)
            .enter()
            .append('text')
            .attr('font-weight', 'bold')
            .style('opacity', '1')
            .attr('font-size', size)
            .attr('x', function (d: any, i: any) {
                return (i + 0.5) * x
            })
            .attr('y', y)
            .text(function (d: string, i) { return d })
    }
    else {
        let t = d3.select(svgRef.current)
        let f = t.selectAll('text')
            .data(data)
            .enter()
            .append('text')
            .attr('font-weight', 'bold')
            .style('opacity', '1')
            .attr('font-size', size)
            .attr('x', x)
            .attr('y', function (d, i) { return ((i + 0.5) * y) })
            .text(function (d: string, i) { return d })
    }
}

export function findBigEstate(x: propC[]): propText {
    let p: propText = {
        text: '',
        x: 100,
        y: 95,
        size: '10px'
    }
    let h = 0;
    x.map((e: propC) => {
        if (e.poblationWeighted > h) {
            h = e.poblationWeighted;
            p.text = e.country;
        }
    })
    return p
}

export function findBigEstateM(x: propC[]): propText {
    let p: propText = {
        text: '',
        x: 300,
        y: 95,
        size: '10px'
    }
    let h = 0;
    x.map((e: propC) => {
        if (e.poblationWeighted > h) {
            h = e.poblationMedian;
            p.text = e.country;
        }
    })
    return p
}