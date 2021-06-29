import { useRef, useState } from "react";
import * as d3 from 'd3'
import { data, Size, chart } from './Interfaces'
import { textGra } from "./Functions";

export function graficaRectas(size: Size, id: number, color: string) {
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

export function generaPuntosY(array: number[], grados: number): number[] {
    let puntosY = [0]
    for (let i = 0; i < array.length; i++) {
        if (grados < 180)
            puntosY[i] = Math.abs(obtY(array[i], grados))
        else
            puntosY[i] = -Math.abs(obtY(array[i], grados))
    }
    return puntosY
}
export function obtY(x: number, grados: number): number {
    let m = Math.tan(grados * Math.PI / 180)
    let z = x * Math.abs(m) / Math.sqrt(1 + Math.pow(m, 2))
    return z
}
export function generaPuntosX(array: number[], grados: number): number[] {
    let puntosX = [0]
    for (let i = 0; i < array.length; i++) {
        if (grados < 90 || grados > 270)
            puntosX[i] = Math.abs(obtX(array[i], grados))
        else
            puntosX[i] = -Math.abs(obtX(array[i], grados))
    }
    return puntosX
}
export function obtX(x: number, grados: number): number {
    let m = Math.tan(grados * Math.PI / 180)
    let z = x / Math.sqrt(1 + Math.pow(m, 2))
    return z
}
export function maxValueArray(x: number[]): number {
    let h = 0
    for (let i = 0; i < x.length; i++) {
        if (x[i] > h)
            h = x[i];
    }
    return h;
}
export function generadorArray(): number[] {
    let array = [1]
    let length = Math.ceil(Math.random() * 10)
    for (let i = 0; i < length; i++)
        array[i] = Math.ceil(Math.random() * 100)
    return array
}

export function generadorArrayDeterminado(x: number): number[] {
    let array = [1]
    for (let i = 0; i < x; i++)
        array[i] = Math.ceil((Math.random() * (1 - 0.2) + 0.2) * 300)
    return array
}
export function lineP(svgRef: any, dat: data[]) {
    const svg3 = d3.select(svgRef.current)
    const myLine = d3.line()
        .x((value: any, index) => value.x[index])
        .x((value: any, index) => value.y[index])
    svg3.selectAll('path')
        .data([dat])
        .join(
            enter => enter
                .append('path'),
            update => update
                .attr('opacity', '0.8')
        )
        .attr('d', function (d: any) {
            return myLine(d)
        })
        .attr('fill', 'pink')
        .attr('stroke', 'red')
        .attr('opacity', '0.4')
}

export function graficaUncirculo(x: number, y: number, r: number, svgRef: any, h: number, j: number) {
    d3.select(svgRef.current)
        .append('circle')
        .attr('cx', x)
        .attr('cy', y)
        .attr('r', r)
        .attr('fill', 'black')
        .attr('id', 'smallcircle' + h + j)
}
export function printChart(a1: number[], a2: number[], a3: number[], a4: number[], a5: number[], a6: number[], a7: number[], a8: number[], a9: number[],
    m1: number, m2: number, m3: number, m4: number, m5: number, m6: number, m7: number, m8: number, m9: number, svgRef: any) {
    let x = [0];
    let y = [0];
    for (let i = 0; i < 7; i++) {
        for (let j = 0; j < 9; j++) {
            switch (j) {
                case 0:
                    if (m1 < 90 || m1 > 270)
                        x[j] = Math.abs(obtX(a1[i], m1))
                    else
                        x[j] = -Math.abs(obtX(a1[i], m1))
                    if (m1 < 180)
                        y[j] = Math.abs(obtY(a1[i], m1))
                    else
                        y[j] = -Math.abs(obtY(a1[i], m1))
                    graficaUncirculo(x[j], y[j], 4, svgRef, i, j)
                    break;
                case 1:
                    if (m2 < 90 || m2 > 270)
                        x[j] = Math.abs(obtX(a2[i], m2))
                    else
                        x[j] = -Math.abs(obtX(a2[i], m2))
                    if (m2 < 180)
                        y[j] = Math.abs(obtY(a2[i], m2))
                    else
                        y[j] = -Math.abs(obtY(a2[i], m2))
                    graficaUncirculo(x[j], y[j], 4, svgRef, i, j)
                    break;
                case 2:
                    if (m3 < 90 || m3 > 270)
                        x[j] = Math.abs(obtX(a3[i], m3))
                    else
                        x[j] = -Math.abs(obtX(a3[i], m3))
                    if (m3 < 180)
                        y[j] = Math.abs(obtY(a3[i], m3))
                    else
                        y[j] = -Math.abs(obtY(a3[i], m3))
                    graficaUncirculo(x[j], y[j], 4, svgRef, i, j)
                    break;
                case 3:
                    if (m4 < 90 || m4 > 270)
                        x[j] = Math.abs(obtX(a4[i], m4))
                    else
                        x[j] = -Math.abs(obtX(a4[i], m4))
                    if (m4 < 180)
                        y[j] = Math.abs(obtY(a4[i], m4))
                    else
                        y[j] = -Math.abs(obtY(a4[i], m4))
                    graficaUncirculo(x[j], y[j], 4, svgRef, i, j)
                    break;
                case 4:
                    if (m5 < 90 || m5 > 270)
                        x[j] = Math.abs(obtX(a5[i], m5))
                    else
                        x[j] = -Math.abs(obtX(a5[i], m5))
                    if (m5 < 180)
                        y[j] = Math.abs(obtY(a5[i], m5))
                    else
                        y[j] = -Math.abs(obtY(a5[i], m5))
                    graficaUncirculo(x[j], y[j], 4, svgRef, i, j)
                    break;
                case 5:
                    if (m6 < 90 || m6 > 270)
                        x[j] = Math.abs(obtX(a6[i], m6))
                    else
                        x[j] = -Math.abs(obtX(a6[i], m6))
                    if (m6 < 180)
                        y[j] = Math.abs(obtY(a6[i], m6))
                    else
                        y[j] = -Math.abs(obtY(a6[i], m6))
                    graficaUncirculo(x[j], y[j], 4, svgRef, i, j)
                    break;
                case 6:
                    if (m7 < 90 || m7 > 270)
                        x[j] = Math.abs(obtX(a7[i], m7))
                    else
                        x[j] = -Math.abs(obtX(a7[i], m7))
                    if (m7 < 180)
                        y[j] = Math.abs(obtY(a7[i], m7))
                    else
                        y[j] = -Math.abs(obtY(a7[i], m7))
                    graficaUncirculo(x[j], y[j], 4, svgRef, i, j)
                    break;
                case 7:
                    if (m8 < 90 || m8 > 270)
                        x[j] = Math.abs(obtX(a8[i], m8))
                    else
                        x[j] = -Math.abs(obtX(a8[i], m8))
                    if (m8 < 180)
                        y[j] = Math.abs(obtY(a8[i], m8))
                    else
                        y[j] = -Math.abs(obtY(a8[i], m8))
                    graficaUncirculo(x[j], y[j], 4, svgRef, i, j)
                    break;
                case 8:
                    if (m9 < 90 || m9 > 270)
                        x[j] = Math.abs(obtX(a9[i], m9))
                    else
                        x[j] = -Math.abs(obtX(a9[i], m9))
                    if (m9 < 180)
                        y[j] = Math.abs(obtY(a9[i], m9))
                    else
                        y[j] = -Math.abs(obtY(a9[i], m9))
                    graficaUncirculo(x[j], y[j], 4, svgRef, i, j)
                    break;
                default:
                    console.log('se salio del switch')
            }
        }
        x[9] = x[0]
        y[9] = y[0]
        linePath(svgRef, x, y, i, ['red', 'pink', 'yelllow', 'blue', 'green', 'orange', 'brown', 'purple', 'gray'])
    }
}

export function printChart3(svgRef: any, chart: chart[]) {
    Circle(svgRef, [100, 150, 200, 250, 300], 'giokio2')

    let pendiente = []
    let x = [0];
    let y = [0];
    for (let h = 0; h < chart.length; h++) {
        pendiente[h] = 360 / chart.length * (h + 1)
        textGra(svgRef, 350, chart[h].name, pendiente[h])
    }
    for (let i = 0; i < 7; i++) {
        for (let j = 0; j < chart.length; j++) {
            if (pendiente[j] < 90 || pendiente[j] > 270)
                x[j] = Math.abs(obtX(chart[j].array[i], pendiente[j]))
            else
                x[j] = -Math.abs(obtX(chart[j].array[i], pendiente[j]))
            if (pendiente[j] < 180)
                y[j] = Math.abs(obtY(chart[j].array[i], pendiente[j]))
            else
                y[j] = -Math.abs(obtY(chart[j].array[i], pendiente[j]))
            graficaUncirculo(x[j], y[j], 4, svgRef, i, j)

        }
        /*  x[9] = x[0]
         y[9] = y[0] */
        //textGra(svgRef,350 , chart[i].name  , pendiente[i])

        linePath(svgRef, x, y, i, ['red', 'pink', 'yelllow', 'blue', 'green', 'orange', 'brown', 'purple', 'gray'])
    }
}

export function graficaUncirculoT(x: number, y: number, r: number, svgRef: any, h: number, j: number) {
    d3.select('#smallcircle' + h + j)
        .transition()
        .duration(2000)
        .attr('cx', x)
        .attr('cy', y)
}
export function printChart2(a1: number[], a2: number[], a3: number[], a4: number[], a5: number[], a6: number[], a7: number[], a8: number[], a9: number[],
    m1: number, m2: number, m3: number, m4: number, m5: number, m6: number, m7: number, m8: number, m9: number, svgRef: any) {
    let x = [0];
    let y = [0];
    for (let i = 0; i < 7; i++) {
        for (let j = 0; j < 9; j++) {
            switch (j) {
                case 0:
                    if (m1 < 90 || m1 > 270)
                        x[j] = Math.abs(obtX(a1[i], m1))
                    else
                        x[j] = -Math.abs(obtX(a1[i], m1))
                    if (m1 < 180)
                        y[j] = Math.abs(obtY(a1[i], m1))
                    else
                        y[j] = -Math.abs(obtY(a1[i], m1))
                    graficaUncirculoT(x[j], y[j], 4, svgRef, i, j)
                    break;
                case 1:
                    if (m2 < 90 || m2 > 270)
                        x[j] = Math.abs(obtX(a2[i], m2))
                    else
                        x[j] = -Math.abs(obtX(a2[i], m2))
                    if (m2 < 180)
                        y[j] = Math.abs(obtY(a2[i], m2))
                    else
                        y[j] = -Math.abs(obtY(a2[i], m2))
                    graficaUncirculoT(x[j], y[j], 4, svgRef, i, j)
                    break;
                case 2:
                    if (m3 < 90 || m3 > 270)
                        x[j] = Math.abs(obtX(a3[i], m3))
                    else
                        x[j] = -Math.abs(obtX(a3[i], m3))
                    if (m3 < 180)
                        y[j] = Math.abs(obtY(a3[i], m3))
                    else
                        y[j] = -Math.abs(obtY(a3[i], m3))
                    graficaUncirculoT(x[j], y[j], 4, svgRef, i, j)
                    break;
                case 3:
                    if (m4 < 90 || m4 > 270)
                        x[j] = Math.abs(obtX(a4[i], m4))
                    else
                        x[j] = -Math.abs(obtX(a4[i], m4))
                    if (m4 < 180)
                        y[j] = Math.abs(obtY(a4[i], m4))
                    else
                        y[j] = -Math.abs(obtY(a4[i], m4))
                    graficaUncirculoT(x[j], y[j], 4, svgRef, i, j)
                    break;
                case 4:
                    if (m5 < 90 || m5 > 270)
                        x[j] = Math.abs(obtX(a5[i], m5))
                    else
                        x[j] = -Math.abs(obtX(a5[i], m5))
                    if (m5 < 180)
                        y[j] = Math.abs(obtY(a5[i], m5))
                    else
                        y[j] = -Math.abs(obtY(a5[i], m5))
                    graficaUncirculoT(x[j], y[j], 4, svgRef, i, j)
                    break;
                case 5:
                    if (m6 < 90 || m6 > 270)
                        x[j] = Math.abs(obtX(a6[i], m6))
                    else
                        x[j] = -Math.abs(obtX(a6[i], m6))
                    if (m6 < 180)
                        y[j] = Math.abs(obtY(a6[i], m6))
                    else
                        y[j] = -Math.abs(obtY(a6[i], m6))
                    graficaUncirculoT(x[j], y[j], 4, svgRef, i, j)
                    break;
                case 6:
                    if (m7 < 90 || m7 > 270)
                        x[j] = Math.abs(obtX(a7[i], m7))
                    else
                        x[j] = -Math.abs(obtX(a7[i], m7))
                    if (m7 < 180)
                        y[j] = Math.abs(obtY(a7[i], m7))
                    else
                        y[j] = -Math.abs(obtY(a7[i], m7))
                    graficaUncirculoT(x[j], y[j], 4, svgRef, i, j)
                    break;
                case 7:
                    if (m8 < 90 || m8 > 270)
                        x[j] = Math.abs(obtX(a8[i], m8))
                    else
                        x[j] = -Math.abs(obtX(a8[i], m8))
                    if (m8 < 180)
                        y[j] = Math.abs(obtY(a8[i], m8))
                    else
                        y[j] = -Math.abs(obtY(a8[i], m8))
                    graficaUncirculoT(x[j], y[j], 4, svgRef, i, j)
                    break;
                case 8:
                    if (m9 < 90 || m9 > 270)
                        x[j] = Math.abs(obtX(a9[i], m9))
                    else
                        x[j] = -Math.abs(obtX(a9[i], m9))
                    if (m9 < 180)
                        y[j] = Math.abs(obtY(a9[i], m9))
                    else
                        y[j] = -Math.abs(obtY(a9[i], m9))
                    graficaUncirculoT(x[j], y[j], 4, svgRef, i, j)
                    break;
                default:
                    console.log('se salio del switch')
            }
        }
        x[9] = x[0]
        y[9] = y[0]
        transitionLinePath(svgRef, x, y, i)
    }
}

export function linePath(svgRef: any, x: number[], y: number[], id: number, color: string[]) {

    const svg = d3.select(svgRef.current)
    const myLine = d3.line()
        .x((value, index) => x[index])
        .y((value: any) => value)

    var f = svg
        .selectAll('path')
        .filter('#Path' + id)
        .data([y]);
    f.join(
        enter => enter
            .append('path')
            .attr('d', function (d: any, i) {
                return myLine(d)
            }),
        update => update
            .attr('opacity', '0.4')
    )
        .attr('d', function (d: any, i) {
            return myLine(d)
        })
        .attr('fill', function (d, i) {
            return color[id]
        })
        .attr('stroke', 'black')
        .attr('id', 'Path' + id)
        .attr('opacity', '0.3')
        .style('stroke-opacity', '1')

    d3.select(svgRef.current)
        .selectAll('path')
        .on('mouseover', function (d, i) {
            d3.select(this).attr('opacity', '0.6')
        })
        .on('mouseout', function (d, i) {
            d3.select(this).attr('opacity', '0.3')
        })
    svg.selectAll('path').exit().remove()

}
export function transitionLinePath(svgRef: any, x: number[], y: number[], id: number) {
    const svg3 = d3.select(svgRef.current)
        .selectAll('path')
        .filter('#Path' + id)
    const myLine = d3.line()
        .x((value, index) => x[index])
        .y((value: any, index) => y[index])
    for (let i = 0; i < x.length; i++) {
        svg3
            .transition()
            .duration(2000)
            .attr('d', function (d: any, i) {
                return myLine(d)
            })
    }
}

export function drawCircle(ref: any, x: number[], y: number[], id: string) {
    let svg = d3.select(ref.current)
        .selectAll('circle')
        .filter(`#id`)
        .data(x)
        .enter()
        .append('circle')
        .attr('id', function (d: any, i) { return `${id}` + i })
        .attr('cx', function (d: any, i) { return x[i] })
        .attr('cy', function (d: any, i) { return y[i] })
        .attr('r', function (d: any) { return 5 })
        .attr('fill', 'black')
}

export function Circle(ref: any, x: number[], id: string) {
    let svg = d3.select(ref.current)
        .selectAll('circle')
        .filter(`#${id}`)
        .data(x)
        .enter()
        .append('circle')
        .attr('id', function (d, i) { return id + i })
        .attr('r', function (d: any) { return d })
        .attr('fill', 'none')
        .attr('stroke', 'black')
}