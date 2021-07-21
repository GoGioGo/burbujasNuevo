import React, { useEffect, useState } from 'react'
import * as d3 from 'd3'
import { Bubble } from '../../interfaces/Interfaces'

export default function BubbleColor({ array1, array2, array3 }: { array1: Bubble[], array2: Bubble[], array3: Bubble[] }) {

    let arra3: Bubble[] = [
        {
            value: 0.639275,
            n: 640,
            country: 'Brazil'
        }, {
            value: 0.44243,
            n: 626,
            country: 'Angola'
        }, {
            value: 0.25663,
            n: 599,
            country: 'United States'
        }, {
            value: 0.76662,
            n: 656,
            country: 'United Kingdom'
        }, {
            value: 0.32345,
            n: 670,
            country: 'Germany'
        },
    ]

    let arra1: Bubble[] = [
        {
            value: 0.539275,
            n: 840,
            country: 'Brazil'
        }, {
            value: 0.74243,
            n: 426,
            country: 'Angola'
        }, {
            value: 0.35663,
            n: 199,
            country: 'United States'
        }, {
            value: 0.86662,
            n: 456,
            country: 'United Kingdom'
        }, {
            value: 0.12345,
            n: 870,
            country: 'Germany'
        },
    ]

    let arra2: Bubble[] = [
        {
            value: 0.639275,
            n: 640,
            country: 'Brazil'
        }, {
            value: 0.44243,
            n: 626,
            country: 'Angola'
        }, {
            value: 0.25663,
            n: 599,
            country: 'United States'
        }, {
            value: 0.76662,
            n: 656,
            country: 'United Kingdom'
        }, {
            value: 0.32345,
            n: 670,
            country: 'Germany'
        }, {
            value: 0.62345,
            n: 470,
            country: 'France'
        },
    ]



    const [country, setCountry] = useState('Bolivia')

    let width = 800, height = 300, margin = 8, radius = height * 0.017
    let textBubble = ['Yes, I am Vaccinated with two doses', 'Yes, I am Vaccinated with one dose', 'I m not Vaccinated']
    textBubble = textBubble.reverse()
    let colors = ['#7cbdd8', '#c2d9e3', '#f7d4a1']

    function bubbleGraph(svg: any, array: Bubble[], x: number[], y: number[], type: number, min: number, max: number) {
        var scaleX1 = d3.scaleLinear()
            .domain([min, max])
            .range([margin * 3, width - (width * 0.25) - margin * 3])

        var scaleY1 = d3.scaleLinear()
            .domain([Math.min(...y), Math.max(...y)])
            .range([margin, height / 3 - margin * 3])

        svg.selectAll('circle')
            .filter('#circle' + type)
            .data(array)
            .enter()
            .append('circle')
            .attr('cx', function (d: any) {
                return scaleX1(d.value)
            })
            .attr('cy', function (d: any) {
                return -scaleY1(d.n)
            })
            .attr('r', radius)
            .attr('id', function (d: any, i: any) { return 'circle' + type + i })
            .attr('stroke', function (d: any) { return colors[type] })
            .attr('fill', function (d: any) { return colors[type] })
            .on('click', function (d: any, i: any, n: any) {

                d3.select(n[i])
                    .attr('fill', function (d: any) {
                        setCountry(d.country)
                        return colors[type + 1]
                    })
            })
        let Me = x.sort((x, y) => x - y)
        let median = 0
        if (Me.length % 2 != 0)
            median = Me[Math.floor(Me.length / 2)]
        else {
            median = (Me[Math.floor(Me.length / 2) - 1] + Me[Math.floor(Me.length / 2) + 1]) / 2
        }
        svg.append('line')
            .attr('x1', function (d: any) { return scaleX1(median) })
            .attr('y1', -margin)
            .attr('x2', function (d: any) { return scaleX1(median) })
            .attr('y2', -height / 3 + margin * 2)
            .attr('stroke', 'black')
            .attr('id', 'line' + type)
        if (scaleX1(median) >= width * 0.13) {
            svg.append('text')
                .attr('x', function (d: any) { return scaleX1(median) - width * 0.13 })
                .attr('y', -height / 3 + margin * 2)
                .attr('id', 'text' + type)
                .text('Median Percentage')
                .style('font-size', function (d: any) { return width * 0.014 })
                .style('font-family', 'bold')
        }
        else {
            svg.append('text')
                .attr('x', function (d: any) { return scaleX1(median) + width * 0.001 })
                .attr('y', -height / 3 + margin * 2, 7)
                .text('Median Percentage')
                .style('font-size', function (d: any) { return width * 0.014 })
                .style('font-family', 'bold')
        }
    }

    function graphBubble() {

        let initialDistanceText = height / (textBubble.length)

        var svg = d3.select('#bubbleColor')
            .append('svg')
            .attr('width', width)
            .attr('height', height)

        svg.append('line')
            .attr('x1', 0)
            .attr('x2', width)
            .attr('y1', height / 3)
            .attr('y2', height / 3)
            .attr('stroke', 'black')
            .style('opacity', '0.15')

        svg.append('line')
            .attr('x1', 0)
            .attr('x2', width)
            .attr('y1', height / 3 * 2)
            .attr('y2', height / 3 * 2)
            .attr('stroke', 'black')
            .style('opacity', '0.15')

        svg.append('line')
            .attr('x1', 0)
            .attr('x2', width)
            .attr('y1', height)
            .attr('y2', height)
            .attr('stroke', 'black')
            .style('opacity', '0.15')

        svg.append('line')
            .attr('x1', width * 0.25)
            .attr('x2', width * 0.25)
            .attr('y1', 0)
            .attr('y2', height)
            .attr('stroke', 'black')
            .style('opacity', '0.15')

        var text = svg.append('g')
            .attr('transform', 'translate(' + 10 + ', ' + (height) + ')')
            .selectAll('text')
            .data(textBubble)
            .enter()
            .append('text')
            .attr('x', 10)
            .attr('y', function (d, i) { return - initialDistanceText * (i + 1) + initialDistanceText / 2 })
            .text(function (d) { return d })
            .style('font-size', function (d) { return width * 0.014 })
            .style('font-family', 'bold')


        let x1: number[] = array1.map(function (x: any) { return x.value })
        let x2: number[] = array2.map(function (x: any) { return x.value })
        let x3: number[] = array3.map(function (x: any) { return x.value })

        let y1: number[] = array1.map(function (y: any) { return y.n })
        let y2: number[] = array2.map(function (y: any) { return y.n })
        let y3: number[] = array3.map(function (y: any) { return y.n })

        let min = Math.min(...x1, ...x2, ...x3)
        let max = Math.max(...x1, ...x2, ...x3)

        var circlesTwoDoses = svg.append('g')
            .attr('transform', 'translate(' + (width * 0.25) + ', ' + (height / 3 - margin) + ')')

        var circlesOneDoses = svg.append('g')
            .attr('transform', 'translate(' + (width * 0.25) + ', ' + (height / 3 * 2 - margin) + ')')

        var circlesNotVaccinated = svg.append('g')
            .attr('transform', 'translate(' + (width * 0.25) + ', ' + (height - margin) + ')')

        bubbleGraph(circlesTwoDoses, array1, x1, y1, 0, min, max)
        bubbleGraph(circlesOneDoses, array2, x2, y2, 1, min, max)
        bubbleGraph(circlesNotVaccinated, array3, x3, y3, 2, min, max)

        insertText(circlesTwoDoses, 0, min, max)


    }
    function insertText(svg: any, type: number, min: number, max: number) {
        var scaleX1 = d3.scaleLinear()
            .domain([min, max])
            .range([margin * 3, width - (width * 0.25) - margin * 3])
        svg.append('text')
            .attr('x', function (d: any) { return scaleX1(max) - width * 0.13 })
            .attr('y', 5)
            .text(country)
    }

    useEffect(() => {
        graphBubble()
    }, [])

    function transition(array1: Bubble[], type: number, x: number[], y: number[], min: number, max: number) {
        console.log('entro')
        var scaleX1 = d3.scaleLinear()
            .domain([min, max])
            .range([margin * 3, width - (width * 0.25) - margin * 3])

        var scaleY1 = d3.scaleLinear()
            .domain([Math.min(...y), Math.max(...y)])
            .range([margin, height / 3 - margin * 3])

        for (let i = 0; i < array1.length; i++) {
            d3.select('#circle' + type + i)
                .transition()
                .duration(2000)
                .attr('cx', function (d: any) {
                    console.log(scaleX1(array1[i].value))
                    return scaleX1(array1[i].value)
                })
                .attr('cy', function (d: any) {
                    return -scaleY1(array1[i].n)
                })
        }
        let Me = x.sort((x, y) => x - y)
        let median = 0
        if (Me.length % 2 != 0)
            median = Me[Math.floor(Me.length / 2)]
        else {
            median = (Me[Math.floor(Me.length / 2) - 1] + Me[Math.floor(Me.length / 2) + 1]) / 2
        }
        d3.select('#line' + type)
            .transition()
            .duration(2000)
            .attr('x1', function (d: any) { return scaleX1(median) })
            .attr('y1', -margin)
            .attr('x2', function (d: any) { return scaleX1(median) })
            .attr('y2', -height / 3 + margin * 2)

        d3.select('#text' + type)
            .transition()
            .duration(2000)
            .attr('x', function (d: any) { return scaleX1(median) - width * 0.13 })
            .attr('y', -height / 3 + margin * 2)
    }
    function click() {

        let x1: number[] = arra1.map(function (x: any) { return x.value })
        let x2: number[] = arra2.map(function (x: any) { return x.value })
        let x3: number[] = arra3.map(function (x: any) { return x.value })

        let y1: number[] = arra1.map(function (y: any) { return y.n })
        let y2: number[] = arra2.map(function (y: any) { return y.n })
        let y3: number[] = arra3.map(function (y: any) { return y.n })

        let min = Math.min(...x1, ...x2, ...x3)
        let max = Math.max(...x1, ...x2, ...x3)

        transition(arra1, 0, x1, y1, min, max)
        transition(arra2, 1, x2, y2, min, max)
        transition(arra3, 2, x3, y3, min, max)

    }
    return (
        <div id='bubbleColor'>
            <button onClick={() => click()}>transition</button>
        </div>
    )
}
