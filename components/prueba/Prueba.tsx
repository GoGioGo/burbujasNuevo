/* import React, { useEffect, useRef, useState } from 'react'
import * as d3 from 'd3'

export default function Prueba() {
    let a = [10, 20, 30]
    let b = [10, 20, 30, 40]
    let width = 800, height = 600, margin = 10
    useEffect(() => {
        //graph()
    }, [])
    function graph() {
        var svg = d3.select('#gio')
            .append('svg')
            .attr('width', width)
            .attr('height', height)
        var circle = svg.selectAll('circle')
            .data(a)
            .enter()
            .join(
                enter => enter
                    .append('circle')
                    .attr('cx', function (d) {
                        return d * 10
                    })
                    .attr('cy', function (d, i) {
                        return i * 10
                    })
                    .attr('r', 15)
                    .attr('stroke', 'black'),
                update => update.transition()
                    .duration(2000)
                    .attr('cx', function (d) { return d })
                    .attr('cy', function (d, i) { return i * 20 })
            )
    }
    return <div id='gio'>
            Hola mundo
    </div>
}
 */


import React, { useEffect } from 'react'
import * as d3 from 'd3'

export default function Prueba() {
    let a = [10, 20, 30]
    let b = [13, 23, 33, 45]
    let width = 800, height = 300, margin = 10

    let svg: any
    let circle: any

    function graph(circle: any, array: number[]) {

        circle.selectAll('circle')
            .data(array)
            .join(
                function (enter: any) {
                    return enter.append('circle')
                        .attr('cx', function (d: any) {
                            return d * 10
                        })
                        .attr('cy', function (d: any, i: any) {
                            return i * 10
                        })
                        .attr('r', 15)
                        .attr('stroke', 'black')
                },
                function (update: any) {
                    return update.transition()
                        .duration(2000)
                        .attr('cx', function (d: any) {
                            return d * 10
                        })
                        .attr('cy', function (d: any, i: any) {
                            return i * 10
                        })
                })

    }
    function click() {
        graph(circle, a)
    }

    function text(){
        
    }

    useEffect(() => {
        svg = d3.select('#gio')
            .append('svg')
            .attr('width', width)
            .attr('height', height)
        circle = svg.append('g')
        graph(circle, b)
    }, [])
    return (<>
        <div id='gio'>
        </div>
        <button onClick={() => click()}>transition</button>
    </>
    )
}
