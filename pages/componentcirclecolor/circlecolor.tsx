import React, { useEffect, useRef, useState } from 'react'
import * as d3 from 'd3'
import { Size } from '../../functions/Interfaces'
import { generadorArrayDeterminado } from '../../functions/functions2'
import { data } from './accesories/interfaces'

import scienti from './accesories/scientists.json'
import cd from './accesories/cdc.json'
import frie from './accesories/friends.json'
import jour from './accesories/journalists.json'
import lo from './accesories/local.json'
import poli from './accesories/politicians.json'
import rel from './accesories/religious.json'

export default function circlecolor() {

    const [localH, setLocalh] = useState<data[] | null>([])
    const [scientists, setScientists] = useState<data[] | null>([])
    const [cdc, setCdc] = useState<data[] | null>([])
    const [journalists, setJournalists] = useState<data[] | null>([])
    const [religious, setReligious] = useState<data[] | null>([])
    const [politicians, setPoliticians] = useState<data[] | null>([])
    const [friends, setFriends] = useState<data[] | null>([])

    let color = ['red', 'pink', 'yelllow', 'blue', 'green', 'orange', 'purple']
    let variables = ['Local Healt woeckecs', 'Scientists and helth', 'CDC WHO', 'Journalists', 'Religiuos Leaders', 'Politicians', 'Friends and Family']

    const ref = useRef<SVGSVGElement | null>(null)
    const ref2 = useRef<SVGSVGElement | null>(null)
    const ref3 = useRef<SVGSVGElement | null>(null)

    const size: Size = {
        width: 800,
        height: 600
    }
    let margin = { top: 30, right: 30, bottom: 30, left: 40 }
        , width = size.width! - margin.left - margin.right
        , height = size.height! - margin.top - margin.bottom;

    function generateCircles(date: string) {
        erase(scientists!, 1)
        erase(friends!, 2)
        erase(localH!, 3)
        erase(cdc!, 4)
        erase(journalists!, 5)
        erase(religious!, 6)
        erase(politicians!, 7)

        graphicCircles(date, scientists!, 1)
        graphicCircles(date, friends!, 2)
        graphicCircles(date, localH!, 3)
        graphicCircles(date, cdc!, 4)
        graphicCircles(date, journalists!, 5)
        graphicCircles(date, religious!, 6)
        graphicCircles(date, politicians!, 7)
    }

    function graphicCircles(date: string, x: data[], id: number) {

        let circle = d3.select(ref.current)
            .selectAll('circle')
            .filter('#id' + id)
            .data(x.filter((e: data) => {
                if (e.month === date)
                    return e
            }))
            .enter()
            .append('circle')
            .attr('cx', function (d: any) {
                return d.trust
            })
            .attr('cy', function (d: any) {
                return -d.exposure
            })
            .attr('r', 0)
            .attr('fill', function (d) { return color[id] })
            .attr('stroke', 'black')
            .attr('id', function (d: any) {
                return 'id' + id + d.id
            })
            .style('opacity', '0.6')
        circle.transition()
            .duration(3000)
            .attr('r', 10)
    }

    function erase(x: data[], id: number) {
        x!.map((e: data) => {
            let a = d3.select('#id' + id + e.id)
                .transition()
                .duration(3000)
                .attr('r', 0)
            d3.select('#id' + e.id + e.id)
                .remove()
        })
    }
    useEffect(() => {
        setFriends(frie)
        setScientists(scienti)
        setCdc(cd)
        setLocalh(lo)
        setJournalists(jour)
        setReligious(rel)
        setPoliticians(poli)

        let xScale = d3.scaleLinear()
            .domain([1, 100])
            .range([0, size.width! - margin.left - margin.right]);

        var yScale = d3.scaleLinear()
            .domain([0, 100])
            .range([size.height! - margin.bottom - margin.top, 0]);

        let svg = d3.select(ref2.current)
            .append('g')
            .attr("class", "x axis")
            .attr("transform", "translate(" + margin.left + ", " + (size.height! - margin.bottom) + ")")
            .call(d3.axisBottom(xScale)).style('font-size', '22px')

        let svg1 = d3.select(ref2.current)
            .append('g')
            .attr("class", "y axis")
            .attr("transform", "translate(" + margin.left + ", " + margin.top + ")")
            .call(d3.axisLeft(yScale)).style('font-size', '22px');

        d3.select(ref2.current)
            .append('line')
            .attr('x1', 400)
            .attr('y1', margin.top)
            .attr('x2', 400)
            .attr('y2', size.height! - margin.bottom)
            .attr('stroke', 'black')

        d3.select(ref2.current)
            .append('line')
            .attr('x1', margin.left)
            .attr('y1', size.height! / 2)
            .attr('x2', size.width! - margin.right)
            .attr('y2', size.height! / 2)
            .attr('stroke', 'black')

        let l = d3.select(ref3.current)
        l.selectAll('circle')
            .data(color)
            .enter()
            .append('circle')
            .attr('cx', function (d, i) { return (i + 1) * 100 })
            .attr('cy', function (d, i) { return 80 })
            .attr('r', 8)
            .attr('fill', function (d) { return d })
            .attr('stroke', function (d) { return d })

        l.selectAll('text')
            .data(variables)
            .enter()
            .append('text')

            .attr('font-weight', 'bold')
            .style('opacity', '1')
            .attr('font-size', '10px')
            .attr('x', function (d: any, i: any) {
                return (i + 1) * 100 + 13
            })
            .attr('y', 80)
            .text(function (d: string, i) { return d })

    }, [])
    return (<div>
        <div>
            <svg width='800' height='100' ref={ref3} style={{ display: 'block' }} />
            <svg width='800' height='600' ref={ref2} style={{ display: 'block' }}>
                <g ref={ref} transform='translate(50, 550)'></g>
            </svg>
            <button className={'btn-btnprimary'} onClick={() => generateCircles('JUNE')}>JUNE</button>
            <button className={'btn-btnprimary'} onClick={() => generateCircles('JULY')}>JULY</button>
            <button className={'btn-btnprimary'} onClick={() => generateCircles('AUGUST')}>AUGUST</button>

        </div>
    </div>
    )
}
