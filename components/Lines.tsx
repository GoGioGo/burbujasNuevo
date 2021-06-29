import React, {useRef, useEffect} from 'react'
import {setText, text} from '../functions/Functions'

export default function Lines() {
    const cabezaModal = useRef<SVGSVGElement | null>(null)
    const percentageModal = useRef<SVGSVGElement | null>(null)
    const absisas = useRef<SVGSVGElement | null>(null)
    const footer = useRef<SVGSVGElement | null>(null)
    let tit = ['Fully Vaccinated', 'Partially Vaccinated', 'Not Vaccinated']

    useEffect(() => {
        setText(tit, footer, 130, 30, '14px', true)
        text({ x: 10, y: 12, text: 'NERVOUSNESS BY SURVEY RESPONDENTS', size: '14px' }, cabezaModal)

        
    }, [])
    return (
        <div>
             <div style={{ width: '62%', height: '310px', float: 'left' }}>
                    <svg ref={cabezaModal} width='100%' height='25px' style={{ color: 'red', width: '100%', height: '20px', display: 'block' }} />
                    <svg ref={percentageModal} width='17%' height='200px' style={{ float: 'left' }} />
                    <svg id='graphic' width='300px' height='200px' style={{ float: 'left' }} />
                    <svg ref={absisas} width='100%' height='20px' style={{ display: 'block', clear: 'both' }} />
                    <svg ref={footer} width='100%' height='35px' style={{ display: 'block' }} />
                </div>
                <div  style={{ float: 'left', width:'30%',  height:'310px'}} > <br/><br/>Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Laboriosam odio, sequi fugit vel tempore voluptatum,
                    nulla iure minus enim quae maiores nostrum impedit animi
                    neque assumenda ad, facere distinctio eius!</div>
        </div>
    )
}
