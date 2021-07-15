import React, { useEffect, useRef, useState } from 'react'
import * as d3 from 'd3'

export default function ThreeColorCircle() {

    interface cordenate {
        x: number,
        y: number
    }
    //Porcentajes
    let a = 15
    let b = 55
    let c = 30

    let color = ['#63a0c4', '#a2c3d6', '#edb266']
    let data: cordenate[]
    data = [{ x: 0, y: 0 }]

    let width = 400, height = 400, radius = 7

    function generate(width: number, radius: number) {
        let indice = 0
        let d: cordenate = { x: 1, y: 1 }
        let x2 = 0;
        let y2 = 0;
        for (let i = -width / 2; i < width / 2; i = i + radius * 3) {
            for (let j = -width / 2; j < width / 2; j = j + radius * 2.5) {
                x2 = j + (Math.random() * (radius * 0.8 - radius * 0.1) + radius * 0.1)
                y2 = i + (Math.random() * (radius * 0.8 - radius * 0.1) + radius * 0.1)

                if (verifica(x2, y2)) {
                    data[indice] = { x: x2, y: y2 }
                    indice++
                }
            }

        }
    }

    function verifica(x: number, y: number): boolean {
        if (200 > Math.sqrt(Math.pow((Math.abs(x)), 2) + Math.pow((Math.abs(y)), 2)))
            return true
        else
            return false
    }

    function graphCircle() {
        //Porcentajes
        a = Math.ceil(data.length * a / 100)
        b = Math.ceil(data.length * b / 100)
        c = Math.ceil(data.length * c / 100)

        let a1 = 0, b1 = 0, c1 = 0
        let a2 = 0, b2 = 0, c2 = 0

        let svg = d3.select('#div1')
            .append('svg')
            .attr('width', width)
            .attr('height', height)
            .append('g')
            .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")")

        let circle = svg.selectAll('circle')
            .data(data)
            .enter()
            .append('circle')
            .attr('cx', function (d: any, i) {
                return d.x
            })
            .attr('cy', function (d: any, i) { return d.y })
            .attr('r', radius * 0.85)
            .attr('fill', function (d, i) {
                if (a1 < a) {
                    a1++
                    return color[0]
                }
                else {
                    if (b1 < b) {
                        b1++
                        return color[1]
                    }
                    else {
                        c1++
                        return color[2]
                    }
                }
            })
            .attr('stroke', function (d, i) {
                if (a2 < a) {
                    a2++
                    return color[0]
                }
                else {
                    if (b2 < b) {
                        b2++
                        return color[1]
                    }
                    else {
                        c2++
                        return color[2]
                    }
                }
            })
    }

    useEffect(() => {
        generate(400, radius)
        graphCircle()
    }, [])

    return (
        <div id='div1' style={{ padding: '20px' }}>
        </div>
    )
}
