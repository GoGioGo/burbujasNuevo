import React, { useRef, useEffect } from 'react'
import { setText, text } from '../functions/Functions'
import { Size } from '../functions/Interfaces'
import * as d3 from 'd3'
export default function Lines() {
    const cabezaModal = useRef<SVGSVGElement | null>(null)
    const percentageModal = useRef<SVGSVGElement | null>(null)
    const absisas = useRef<SVGSVGElement | null>(null)
    const footer = useRef<SVGSVGElement | null>(null)
    let tit = ['Fully Vaccinated', 'Partially Vaccinated', 'Not Vaccinated']

    const size: Size = {
        width: 500,
        height: 200
    }
    function graficaRectas(size: Size, id: number, color: string) {
        let margin = { top: 20, right: 20, bottom: 20, left: 20 }
            , width = size.width! - margin.left - margin.right
            , height = size.height! - margin.top - margin.bottom;
        var n = 10;
        var xScale = d3.scaleLinear()
            .domain([0, n - 1])
            .range([0, width]);
        var yScale = d3.scaleLinear()
            .domain([0, 100])
            .range([height, 0]);
        var dataset = d3.range(n)
            .map(function (d) {
                return { "y": d3.randomUniform(100)() }
            })
        var svg = d3.select("#graphic")
            .append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
        svg.append("g")
            .attr("class", "x axis")
            .attr("transform", "translate(0," + height + ")")
            .call(d3.axisBottom(xScale));
        svg.append("g")
            .attr("class", "y axis")
            .call(d3.axisLeft(yScale));

        var line = d3.line()
            .x(function (d, i) { return xScale(i); })
            .y(function (d: any) { return yScale(d.y); })
        svg.selectAll('path')
            .filter('#id' + id)
            .data([dataset])
            .join(
                enter => enter.append('path'),
                update => update,
                exit => exit.exit().remove()
            )
            .attr("d", function (d: any) { return line(d) })
            .attr('fill', 'none')
            .attr('stroke', color)
            .attr("class", "line")
            .attr('class', 'id' + id)
        svg.selectAll(".dot")
            .data(dataset)
            .enter().append("circle")
            .attr("class", "dot")
            .attr("cx", function (d, i) { return xScale(i) })
            .attr("cy", function (d) { return yScale(d.y) })
            .attr("r", 5)
            .attr('fill', color)

    }
    useEffect(() => {
        setText(tit, footer, 130, 30, '14px', true)
        text({ x: 10, y: 12, text: 'NERVOUSNESS BY SURVEY RESPONDENTS', size: '14px' }, cabezaModal)


    }, [])
    return (
        <div>
            <div style={{ width: '62%', height: '310px', float: 'left' }}>
                <svg ref={cabezaModal} width='100%' height='25px' style={{ color: 'red', width: '100%', height: '20px', display: 'block' }} />
                <svg ref={percentageModal} width='17%' height='200px' style={{ float: 'left' }} />
                <svg id='graphic' width='300px' height='200px' style={{ float: 'left' }} />
                <svg ref={absisas} width='100%' height='20px' style={{ display: 'block', clear: 'both' }} />
                <svg ref={footer} width='100%' height='35px' style={{ display: 'block' }} />
            </div>
            <div style={{ float: 'left', width: '30%', height: '310px' }} > <br /><br />Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Laboriosam odio, sequi fugit vel tempore voluptatum,
                nulla iure minus enim quae maiores nostrum impedit animi
                neque assumenda ad, facere distinctio eius!</div>
            <div>
                <button onClick={() => {
                graficaRectas(size, 1, 'red')
                graficaRectas(size, 2, 'yellow')
                graficaRectas(size, 3, 'blue')
            }}>generar</button></div>
        </div>
    )
}
