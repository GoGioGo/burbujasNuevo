import React, { useEffect, useRef, useState } from 'react'
import * as d3 from 'd3'

export default function ThreeColorCircle() {
    const a3 = useRef<HTMLInputElement>(null);
    const b3 = useRef<HTMLInputElement>(null);
    const c3 = useRef<HTMLInputElement>(null);

    interface cordenate {
        x: number,
        y: number
    }
    //Porcentajes
    const [aa, setaa] = useState<number>()
    let a = 15
    let b = 55
    let c = 30

    let color = ['#63a0c4', '#a2c3d6', '#edb266']
    let data: cordenate[]
    data = [{ x: 0, y: 0 }]

    let width = 600, height = width, radius = width * 0.012, margin = radius * 2

    function generate() {
        let indice = 0
        let d: cordenate = { x: 1, y: 1 }
        let x2 = 0;
        let y2 = 0;
        for (let i = -width / 2 + margin; i <= width / 2 - margin; i = i + radius * 2.7) {
            for (let j = -width / 2 + margin; j <= width / 2 - margin; j = j + radius * 2.7) {
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
        if (width / 2 - margin >= Math.sqrt(Math.pow((Math.abs(x)), 2) + Math.pow((Math.abs(y)), 2)))
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
            .attr('id', function (d, i) {
                return 'circle' + i
            })
            .attr('cx', function (d: any, i) {
                return d.x
            })
            .attr('cy', function (d: any, i) { return d.y })
            .attr('r', radius)
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
    function execute() {
        let svg = d3.select('#div1')
            .selectAll('circle')
        for (let i = 0; i < data.length; i++) {
            svg.filter('#circle' + i)
                .transition()
                .duration(3000)
                .attr('r', 0)
        }
        setTimeout(() => {
            transition()
        }, 3000);
    }
    function transition() {
        a = Math.ceil(data.length * parseInt(a3.current!.value) / 100)
        b = Math.ceil(data.length * parseInt(b3.current!.value) / 100)
        c = Math.ceil(data.length * parseInt(c3.current!.value) / 100)
        let a1 = 0, b1 = 0, c1 = 0
        let a2 = 0, b2 = 0, c2 = 0

        let svg = d3.select('#div1')
            .selectAll('circle')
        for (let i = 0; i < data.length; i++) {
            svg.filter('#circle' + i)
                .transition()
                .duration(3000)
                .attr('r', radius)
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
    }

    useEffect(() => {
        console.log(margin)
        generate()
        graphCircle()
    }, [])

    return (<>
        <div id='div1' >
        </div>
        <div>
            <h2>Porcentajes</h2>
            <input ref={a3} type='number' />
            <input ref={b3} type='number' />
            <input ref={c3} type='number' />
            <button onClick={() => execute()}>EnviarPorcentajes</button>
        </div>
    </>
    )
}