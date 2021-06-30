import React, { useEffect, useRef } from 'react'
import * as d3 from 'd3'
import { Size } from '../functions/Interfaces'
import { generadorArrayDeterminado } from '../functions/functions2'

export default function circlesOfColors() {
    const ref = useRef<SVGSVGElement | null>(null)
    const ref2 = useRef<SVGSVGElement | null>(null)
    const size: Size = {
        width: 800,
        height: 600
    }
    let margin = { top: 30, right: 30, bottom: 30, left: 40 }
        , width = size.width! - margin.left - margin.right
        , height = size.height! - margin.top - margin.bottom;

    function generadorArrayDeterminado1(x: number): number[] {
        let array = [1]
        for (let i = 0; i < x; i++)
            array[i] = Math.ceil((Math.random() * (1 + 1) - 1) * 200)
        return array
    }
    function graphicCircles() {
        let x = generadorArrayDeterminado1(70)
        let y = generadorArrayDeterminado1(70)
        circles(ref, x, y, 'uno', '#e1947e')
        x = generadorArrayDeterminado1(70)
        y = generadorArrayDeterminado1(70)
        circles(ref, x, y, 'dos', '#387380')
        x = generadorArrayDeterminado1(70)
        y = generadorArrayDeterminado1(70)
        circles(ref, x, y, 'tres', '#f5cf6f')
        x = generadorArrayDeterminado1(70)
        y = generadorArrayDeterminado1(70)
        circles(ref, x, y, 'cuatro', '#b5d8c0')

    }
    function circles(ref: any, x: number[], y: number[], id: string, color: string) {

        d3.select(ref.current)
            .selectAll('circle')
            .filter(`#${id}`)
            .data(x)
            .join(
                function (enter) {
                    return enter
                        .append('circle')
                        .attr('class', function (d: any, i: any) { return id + i })
                        .attr('cx', function (d: any, i: any) { return d })
                        .attr('cy', function (d: any, i: any) { return y[i] })
                        .attr('r', 10)
                        .attr('fill', color)
                        .attr('stroke', color)
                        .style('opacity', '0.6')
                },
                function (update) {
                    return update.transition()
                        .duration(2000)
                        .attr('cx', function (d: any, i: any) { return d })
                        .attr('cy', function (d: any, i: any) { return y[i] })
                },
                function (exit) {
                    return exit.exit()
                        .remove()
                }
            )
    }
    useEffect(() => {
        let xScale = d3.scaleLinear()
            .domain([1, 100])
            .range([0, size.width! - margin.left - margin.right]);

        var yScale = d3.scaleLinear()
            .domain([0, 100])
            .range([size.height! - margin.bottom - margin.top, 0]);

        let svg = d3.select(ref2.current)
            .append('g')
            .attr("class", "x axis")
            .attr("transform", "translate(" + margin.left + ", " + (size.height! - margin.bottom) + ")")
            .call(d3.axisBottom(xScale)).style('font-size', '22px')

        let svg1 = d3.select(ref2.current)
            .append('g')
            .attr("class", "y axis")
            .attr("transform", "translate(" + margin.left + ", " + margin.top + ")")
            .call(d3.axisLeft(yScale)).style('font-size', '22px');

            d3.select(ref2.current)
            .append('line')
            .attr('x1', 400)
            .attr('y1', margin.top)
            .attr('x2', 400)
            .attr('y2', size.height!-margin.bottom)
            .attr('stroke', 'black')

            d3.select(ref2.current)
            .append('line')
            .attr('x1', margin.left)
            .attr('y1', size.height!/2)
            .attr('x2', size.width!-margin.right)
            .attr('y2', size.height!/2)
            .attr('stroke', 'black')
    }, [])
    return (
        <div>
            <div>
                <svg width='800' height='600' ref={ref2} style={{ float: 'left' }} >
                    <g ref={ref} transform='translate(400, 300)'></g>
                </svg>
                <button className={'btn-btnprimary'} onClick={() => graphicCircles()}>click</button>
            </div>
        </div>
    )
}
