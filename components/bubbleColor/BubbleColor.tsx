import React, { useEffect, useRef, useState } from 'react'
import * as d3 from 'd3'
import { Bubble } from '../../interfaces/Interfaces'

export default function BubbleColor({ array1, array2, array3 }: { array1: Bubble[], array2: Bubble[], array3: Bubble[] }) {

    let svg: any
    let circleTwoDoses: any
    let circleOneDose: any
    let notVaccinated: any

    let mini: any, maxi: any

    let scaleX: any

    let width = 800, height = 300, margin = 8, radius = height * 0.017

    const ref = useRef(null)

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

    let textBubble = ['Yes, I am Vaccinated with two doses', 'Yes, I am Vaccinated with one dose', 'I m not Vaccinated']

    textBubble = textBubble.reverse()

    let colors = ['#7cbdd8', '#c2d9e3', '#f7d4a1']


    function insertText(svg: any, type: number, min: number, max: number) {

        svg.append('text')
            .attr('x', function (d: any) { return scaleX(max) - width * 0.13 })
            .attr('y', 5)
            .text(country)
    }

    function leftText() {
        let initialDistanceText = height / (textBubble.length)
        var text = svg.append('g')
            .attr('transform', 'translate(' + 10 + ', ' + (height) + ')')
            .selectAll('text')
            .data(textBubble)
            .enter()
            .append('text')
            .attr('x', 10)
            .attr('y', function (d: any, i: any) { return - initialDistanceText * (i + 1) + initialDistanceText / 2 })
            .text(function (d: any) { return d })
            .style('font-size', function (d: any) { return width * 0.014 })
            .style('font-family', 'bold')
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

        graphBubleE(circleTwoDoses, arra1, y1, 0)
        graphBubleE(circleOneDose, arra2, y2, 1)
        graphBubleE(notVaccinated, arra3, y3, 2)
    }

    function graphBubleE(refer: any, array: Bubble[], y: number[], type: number) {

        var scaleY1 = d3.scaleLinear()
            .domain([Math.min(...y), Math.max(...y)])
            .range([margin, height / 3 - margin * 3])

        refer.selectAll('circle')
            .data(array)
            .join(
                function (enter: any) {
                    return enter
                        .append('circle')
                        .attr('cx', function (d: any) {
                            return scaleX(d.value)
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
                },
                function (update: any) {
                    return update.transition()
                        .duration(2000)
                        .attr('cx', function (d: any) {
                            return scaleX(d.value)
                        })
                        .attr('cy', function (d: any) {
                            return -scaleY1(d.n)
                        })
                }
            )
    }
    function line(x1: number, y1: number, x2: number, y2: number) {
        svg.append('line')
            .attr('x1', x1)
            .attr('x2', x2)
            .attr('y1', y1)
            .attr('y2', y2)
            .attr('stroke', 'black')
            .style('opacity', '0.15')
    }

    function medianText(ref: any, x: number[], type: number) {
        let Me = x.sort((x, y) => x - y)
        let median = 0
        if (Me.length % 2 != 0)
            median = Me[Math.floor(Me.length / 2)]
        else {
            median = (Me[Math.floor(Me.length / 2) - 1] + Me[Math.floor(Me.length / 2) + 1]) / 2
        }
        ref
            .join(
                function (enter: any) {
                    return enter
                        .append('line')
                        .attr('x1', function (d: any) {
                            console.log('entro bien duro')
                            return scaleX(median)
                        })
                        .attr('y1', -margin)
                        .attr('x2', function (d: any) { return scaleX(median) })
                        .attr('y2', -height / 3 + margin * 2)
                },
                function (update: any) {
                    return update
                        .transition()
                        .duration(2000)
                        .attr('x1', function (d: any) { return scaleX(median) })
                        .attr('y1', -margin)
                        .attr('x2', function (d: any) { return scaleX(median) })
                        .attr('y2', -height / 3 + margin * 2)
                }
            )
            .attr('stroke', 'black')
            .attr('id', 'line' + type)

        if (scaleX(median) >= width * 0.13) {
            ref.append('text')
                .attr('x', function (d: any) { return scaleX(median) - width * 0.13 })
                .attr('y', -height / 3 + margin * 2)
                .attr('id', 'text' + type)
                .text('Median Percentage')
                .style('font-size', function (d: any) { return width * 0.014 })
                .style('font-family', 'bold')
        }
        else {
            ref.append('text')
                .attr('x', function (d: any) { return scaleX(median) + width * 0.001 })
                .attr('y', -height / 3 + margin * 2, 7)
                .text('Median Percentage')
                .style('font-size', function (d: any) { return width * 0.014 })
                .style('font-family', 'bold')
        }
    }
    useEffect(() => {

        let x1: number[] = array1.map(function (x: any) { return x.value })
        let x2: number[] = array2.map(function (x: any) { return x.value })
        let x3: number[] = array3.map(function (x: any) { return x.value })

        let y1: number[] = array1.map(function (y: any) { return y.n })
        let y2: number[] = array2.map(function (y: any) { return y.n })
        let y3: number[] = array3.map(function (y: any) { return y.n })

        mini = Math.min(...x1, ...x2, ...x3)
        maxi = Math.max(...x1, ...x2, ...x3)

        scaleX = d3.scaleLinear()
            .domain([mini, maxi])
            .range([margin * 3, width - (width * 0.25) - margin * 3])

        svg = d3.select(ref.current)
            .attr('width', width)
            .attr('height', height)

        circleTwoDoses = svg.append('g')
            .attr('transform', 'translate(' + (width * 0.25) + ', ' + (height / 3 - margin) + ')')

        circleOneDose = svg.append('g')
            .attr('transform', 'translate(' + (width * 0.25) + ', ' + (height / 3 * 2 - margin) + ')')

        notVaccinated = svg.append('g')
            .attr('transform', 'translate(' + (width * 0.25) + ', ' + (height - margin) + ')')

        leftText()
        line(0, height / 3, width, height / 3)
        line(0, height / 3 * 2, width, height / 3 * 2)
        line(0, height, width, height)
        line(width * 0.25, 0, width * 0.25, height)

        graphBubleE(circleTwoDoses, array1, y1, 0)
        graphBubleE(circleOneDose, array2, y2, 1)
        graphBubleE(notVaccinated, array3, y3, 2)

        medianText(circleTwoDoses, x1, 0)
        medianText(circleOneDose, x2, 1)
        medianText(notVaccinated, x3, 2)
    }, [])

    return (<>
        <svg ref={ref}>
        </svg>
        <button onClick={() => click()}>transition</button>
    </>
    )
}
