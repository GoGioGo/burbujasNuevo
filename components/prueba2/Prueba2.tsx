import React, { useEffect, useRef, useState } from 'react'
import * as d3 from 'd3'

export default function Prueba2() {
    const [data, setData] = useState<any[]>([])
    const ref = useRef(null)
    let width = 400, height = width * 1.5
    function recarga() {
        d3.csv('https://raw.githubusercontent.com/holtzy/D3-graph-gallery/master/DATA/iris.csv')
            .then(da => {
                setData(da)
            })
    }
    function print() {


        let x2 = data.filter(function (x: any) {
            if (x.Species == 'setosa')
                return x
        })
        let x1: number[] = x2.map(function (z: any) {
            return z.Sepal_Length
        })

        let y1: number[] = x2.map(function (x: any) { return x.Sepal_Width })

        console.log(y1)

        let py = (Math.min(...y1) + Math.max(...y1)) / 2

        let scaleX = d3.scaleLinear()
            .domain([Math.min(...x1), Math.max(...x1)])
            // .domain([1.3, 1.7])
            .range([0, width])

        let scaleY = d3.scaleLinear()
            .domain([Math.min(...y1), Math.max(...y1)])
            // .domain([0.1, 0.2])
            .range([0, height / 6])

        let circle = d3.select(ref.current)
            .attr('width', width)
            .attr('height', height)

        let circle1 = circle.append('g')
        circle1.selectAll('circles')
            .data(x2)
            .enter()
            .append('circle')
            .attr('cx', function (d, i) {
                if (d.Species == 'setosa') {
                    return scaleX(d.Sepal_Length)
                } else
                    return 0
            })
            .attr('cy', function (d: any, i) {
                if (d.Species == 'setosa') {
                    return scaleY(py)
                }
                else {
                    return 1000
                }
            })
            .attr('r', 5)
            .attr('fill', 'black')
        let circle2 = circle.append('g')
        circle2.selectAll('circle')
            .data(x2)
            .enter()
            .append('circle')
            .attr('cx', function (d) { return scaleX(d.Sepal_Length) })
            .attr('cy', function (d) {
                console.log(scaleY(d.Sepal_Width))
                return scaleY(d.Sepal_Width)
            })
            .attr('r', 5)
            .attr('fill', 'red')
        let line = circle.append('g')
            .append('line')
            .attr('x1', scaleX(Math.min(...x1)))
            .attr('x2', scaleX(Math.max(...x1)))
            .attr('y1', scaleY(py))
            .attr('y2', scaleY(py))
            .style('stroke', 'black')
    }
    useEffect(() => {
        recarga()
    }, [])
    return (<>
        <div>
            <svg ref={ref} />
        </div>
        <div>
            <button onClick={() => print()}>genera</button>
        </div>
    </>
    )
}
