import React, { useRef, useEffect } from 'react'
import * as d3 from 'd3'

export default function Prueba() {
    let width = 400, height = width, radius = width * 0.023, margin = radius * 2
    let svg: any

    interface coordinate {
        x: number,
        y: number
    }
    let a = 40
    let b = 40
    let c = 20

    let color = ['#63a0c4', '#a2c3d6', '#edb266']
    let data: coordinate[]
    data = [{ x: 0, y: 0 }, { x: 1, y: 1 }, { x: 40, y: 40 }]

    const ref = useRef(null)
    const a3 = useRef<HTMLInputElement>(null);
    const b3 = useRef<HTMLInputElement>(null);
    const c3 = useRef<HTMLInputElement>(null);

    function compare(a: any, b: any) {
        if (a.y < b.y) {
            return -1;
        }
        if (a.y > b.y) {
            return 1;
        }
        return 0;
    }

    function generate() {
        let indice = 0;
        let sw = 0, k = 0
        let x1 = 0, y1 = 0
        for (let i = 0; i < width * 0.15; i++) {
            for (let j = 0; j < width * 0.15; j++) {
                x1 = Math.floor((Math.random() * (width / 2 - margin + width / 2 - margin)) - (width / 2 - margin))
                y1 = Math.floor((Math.random() * (width / 2 - margin + width / 2 - margin)) - (width / 2 - margin))
                if (verifica(x1, y1)) {
                    while (sw == 0 && k < data.length) {
                        if (verificaRadius(data[k], { x: x1, y: y1 })) {
                            if (k == data.length - 1) {
                                data[indice] = { x: x1, y: y1 }
                                indice++
                            }
                        }
                        else {
                            sw = 1
                        }
                        k++
                    }
                    k = 0
                    sw = 0
                }
            }
        }
    }

    function verificaRadius(a: coordinate, b: coordinate): boolean {
        if (2.1 * radius < Math.sqrt(Math.pow((a.x - b.x), 2) + Math.pow((a.y - b.y), 2))) {
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


    function graphCircle() {
        //Porcentajes
        data = data.sort(compare)

        a = Math.ceil(data.length * a / 100)
        b = Math.ceil(data.length * b / 100)
        c = Math.ceil(data.length * c / 100)

        let a1 = 0, b1 = 0, c1 = 0
        let a2 = 0, b2 = 0, c2 = 0

        svg.append('g')
            .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")")

        let circle = svg.selectAll('circle')
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
            .attr('fill', function (d: any, i: any) {
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
            .attr('stroke', function (d: any, i: any) {
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
        let circle = d3.select(ref.current)
            .selectAll('circle')
        for (let i = 0; i < data.length; i++) {
            circle.filter('#circle' + i)
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

        let circle = d3.select(ref.current)
            .selectAll('circle')
        for (let i = 0; i < data.length; i++) {
            circle.filter('#circle' + i)
                .transition()
                .duration(3000)
                .attr('r', radius)
                .attr('fill', function (d: any, i: any) {
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
                .attr('stroke', function (d: any, i: any) {
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
        console.log(radius)
        svg = d3.select(ref.current)
            .attr('width', width)
            .attr('height', height)
            .append('g')
            .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")")
        generate()
        graphCircle()
    }, [])

    return (<>
        <div>
            <svg ref={ref} />
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