import React, { useRef, useEffect } from 'react'
import * as d3 from 'd3'

export default function Prueba() {
    let width = 600, height = width, radius = width * 0.03, margin = radius * 2
    let svg: any

    interface coordinate {
        x: number,
        y: number
    }

    let data: coordinate[]
    data = [{ x: 0, y: 0 }, { x: 1, y: 1 }, { x: 40, y: 40 }]

    const ref = useRef(null)

    function generate() {
        let indice = 0;
        let sw = 0, k = 0
        let x1 = 0, y1 = 0
        for (let i = 0; i < width * 0.4; i++) {
            for (let j = 0; j < width * 0.3; j++) {
                x1 = Math.floor((Math.random() * (1000 + 1000 + 1)) - 1000)
                y1 = Math.floor((Math.random() * (1000 + 1000 + 1)) - 1000)
                if (verifica(x1, y1)) {
                    data[indice] = { x: x1, y: y1 }
                                indice++
                    /* k = 0
                    while (sw == 0 && k <= data.length) {
                        if (verificaRadius(data[k], { x: x1, y: y1 })) {
                            k++
                            if (k == data.length) {
                                data[indice] = { x: x1, y: y1 }
                                indice++
                            }
                        }
                        else {
                            sw = 1
                        }
                    } */

                }
            }
        }
        let d = [{ x: 0, y: 0 }]
        indice = 0
        let to = data.length
        for (let i = 0; i < to; i++) {
            indice = i
            d[indice] = data[i]
            for (let j = 0; j < to; j++) {
                if (verificaRadius(data[i], data[j])) {
                    indice++
                    d[indice] = data[j]
                    to--
                }
            }
            data = d
        }
    }
    function verificaRadius(a: coordinate, b: coordinate): boolean {
        if (2 * radius < Math.sqrt(Math.pow((a.x - b.x), 2) + Math.pow((a.y - b.y), 2))) {
            console.log(Math.sqrt(Math.pow((a.x - b.x), 2) + Math.pow((a.y - b.y), 2)))
            return true
        }
        else
            return false
    }
    function verifica(x: number, y: number): boolean {
        if (width / 2 - margin >= Math.sqrt(Math.pow((Math.abs(x)), 2) + Math.pow((Math.abs(y)), 2)))
            return true
        else
            return false
    }
    function print() {
        svg.selectAll('circle')
            .data(data)
            .enter()
            .append('circle')
            .attr('id', function (d: any, i: any) {
                return 'circle' + i
            })
            .attr('cx', function (d: any, i: any) {
                return d.x
            })
            .attr('cy', function (d: any, i: any) { return d.y })
            .attr('r', radius)
            .attr('fill', 'transparent')
            .attr('stroke', 'black')
    }

    useEffect(() => {
        console.log(radius)
        svg = d3.select(ref.current)
            .attr('width', width)
            .attr('height', height)
            .append('g')
            .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")")
        generate()
        print()
    }, [])

    return (
        <div>
            <svg ref={ref} />
        </div>
    )
}
