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

    const ref = useRef<SVGSVGElement | null>(null)
    const ref2 = useRef<SVGSVGElement | null>(null)
    const size: Size = {
        width: 800,
        height: 600
    }
    let margin = { top: 30, right: 30, bottom: 30, left: 40 }
        , width = size.width! - margin.left - margin.right
        , height = size.height! - margin.top - margin.bottom;

    function circles(date:string){
        graphicCircles(date, scientists!, 'uno') 
        graphicCircles(date, friends!, 'dos') 

    }

    function graphicCircles(date: string, x:data[], id:string) {
        
        let circle = d3.select(ref.current)
            .selectAll('circle')
            .filter('#id'+id)
            .data(x!)
            .enter()
            .append('circle')
            .attr('cx', function (d: any) {
                if (date == d.month) {
                    console.log(date, d.name)
                    return d.trust
                } else return -100
            })
            .attr('cy', function (d: any) {
                if (date == d.month) {
                    return -d.exposure
                } else return 100
            })
            .attr('r', 0)
            .attr('fill', 'red')
            .attr('stroke', 'black')
            .attr('id', function (d: any) { return 'id'+ id+ d.id })
            .style('opacity', '0.6')
        circle.transition()
            .duration(3000)
            .attr('r', 10)

    }
    function borrarCircles() {
        scientists!.map((e: data) => {
            let a = d3.select('#id' + e.id)
                .transition()
                .duration(3000)
                .attr('r', 0)
            d3.select('#id' + e.id)
                .exit()
                .remove()
        })
    }
    useEffect(() => {
        setFriends(frie)
        setScientists(scienti)
        setCdc(cd)

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
    }, [])
    return (<div>
        <div>
            <svg width='800' height='600' ref={ref2} style={{ float: 'left' }} >
                <g ref={ref} transform='translate(50, 550)'></g>
            </svg>
            <button className={'btn-btnprimary'} onClick={() => circles('JUNE')}>JUNE</button>
            <button className={'btn-btnprimary'} onClick={() => borrarCircles()}>JULY</button>

        </div>
    </div>
    )
}
