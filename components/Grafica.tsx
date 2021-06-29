import { useEffect, useRef, useState } from 'react';
import { Circle, drawCircle, generadorArrayDeterminado, generaPuntosX, generaPuntosY, linePath, printChart, printChart2, printChart3 } from '../functions/functions2'
import { textGra } from '../functions/Functions'
import * as d3 from 'd3'
import { Checkbox } from 'antd';
import { chart } from '../functions/Interfaces'
const CheckboxGroup = Checkbox.Group;
export default function Grafica() {


    const [data, setData] = useState<chart[] | null>(null)

    let options = ['Not Elegible', 'Unable to provide Require', 'Technical dificultes with web site',
        'No vaccine apointments', 'Apointment times did', 'Limit internet', 'Need childcare', 'Difficulty traveling', 'Difficult leave']
    const [checkedList, setCheckedList] = useState([]);
    const onChange = (list: any) => {
        setCheckedList(list);
    };

    let color = ['black', 'black', 'black', 'black', 'black', 'black', 'black', 'black', 'black', 'black']

    let UnaPro = generadorArrayDeterminado(7);
    let TechDifi = generadorArrayDeterminado(7);
    let NoVacc = generadorArrayDeterminado(7)
    let Apoin = generadorArrayDeterminado(7)
    let Limit = generadorArrayDeterminado(7)
    let NotEle = generadorArrayDeterminado(7)
    let Need = generadorArrayDeterminado(7)
    let Dif = generadorArrayDeterminado(7)
    let DifL = generadorArrayDeterminado(7)

    const svgRef2 = useRef<SVGSVGElement | null>(null)
    const svgRef4 = useRef<SVGSVGElement | null>(null)

    function transition() {
        d3.select('#btnChart')
            .on('click', () => {
                let UnaPro1 = generadorArrayDeterminado(7);
                let TechDifi1 = generadorArrayDeterminado(7);
                let NoVacc1 = generadorArrayDeterminado(7)
                let Apoin1 = generadorArrayDeterminado(7)
                let Limit1 = generadorArrayDeterminado(7)
                let NotEle1 = generadorArrayDeterminado(7)
                let Need1 = generadorArrayDeterminado(7)
                let Dif1 = generadorArrayDeterminado(7)
                let DifL1 = generadorArrayDeterminado(7)
                printChart2(UnaPro1, TechDifi1, NoVacc1, Apoin1, Limit1, NotEle1, Need1, Dif1, DifL1, 40, 80, 120, 160, 200, 240, 280, 320, 360, svgRef2)
            })
    }

    function genera2() {
        interface b {
            id: number[],
            name: string
        }
        let a: b[] = []
        a[0] = { id: generadorArrayDeterminado(7), name: 'gio' }
        console.log(a)
        a[1] = { id: generadorArrayDeterminado(7), name: 'kio' }
        console.log(a)
    }

    function genera() {
        /* let b: chart[] = []
        for (let k = 0; k < checkedList.length; k++) {
            if (checkedList[k] == 'Not Elegible') {
                b[k] = { array: generadorArrayDeterminado(7), name: 'Not Elegible' }
            }
            else {
                if (checkedList[k] == 'Unable to provide Require') {
                    b[k] = { array: generadorArrayDeterminado(7), name: 'Unable to provide Require' }
                }
                else {
                    if (checkedList[k] == 'Technical dificultes with web site') {
                        b[k] = { array: generadorArrayDeterminado(7), name: 'Technical dificultes with web site' }
                    }
                    else {
                        if (checkedList[k] == 'No vaccine apointments') {
                            b[k] = { array: generadorArrayDeterminado(7), name: 'No vaccine apointments' }
                        }
                        else {
                            if (checkedList[k] == 'Apointment times did') {
                                b[k] = { array: generadorArrayDeterminado(7), name: 'Apointment times did' }
                            }
                            else {
                                if (checkedList[k] == 'Limit internet') {
                                    b[k] = { array: generadorArrayDeterminado(7), name: 'Limit internet' }
                                }
                                else {
                                    if (checkedList[k] == 'Need childcare') {
                                        b[k] = { array: generadorArrayDeterminado(7), name: 'Need childcare' }
                                    }
                                    else {
                                        if (checkedList[k] == 'Difficulty traveling') {
                                            b[k] = { array: generadorArrayDeterminado(7), name: 'Difficulty traveling' }
                                        }
                                        else {
                                            if (checkedList[k] == 'Difficult leave') {
                                                b[k] = { array: generadorArrayDeterminado(7), name: 'Difficult leave' }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
        printChart3(svgRef4, b) */


        /* for (let j = 0; j < checkedList.length; j++) {
            switch (checkedList[j]) {
                case 'Not Elegible':
                    a.array = generadorArrayDeterminado(7)
                    a.name = 'Not Elegible'
                    break;
                case 'Unable to provide Require':
                    a.array = generadorArrayDeterminado(7)
                    a.name = 'Unable to provide Require'
                    break;
                case 'Technical dificultes with web site':
                    a.array = generadorArrayDeterminado(7)
                    a.name = 'Technical dificultes with web site'
                    break;
                case 'No vaccine apointments':
                    a.array = generadorArrayDeterminado(7)
                    a.name = 'No vaccine apointments'
                    break;
                case 'Apointment times did':
                    a.array = generadorArrayDeterminado(7)
                    a.name = 'Apointment times did'
                    break;
                case 'Limit internet':
                    a.array = generadorArrayDeterminado(7)
                    a.name = 'Limit internet'
                    break;
                case 'Need childcare':
                    a.array = generadorArrayDeterminado(7)
                    a.name = 'Need childcare'
                    break;
                case 'Difficulty traveling':
                    a.array = generadorArrayDeterminado(7)
                    a.name = 'Difficulty traveling'
                    break;
                case 'Difficult leave':
                    a.array = generadorArrayDeterminado(7)
                    a.name = 'Difficult leave'
                    break;
            }
            b[j] = a
            console.log(b[j])
        }
        console.log(b)
 */
        /* checkedList.map((e: string, i) => {
            switch (e) {
                case 'Not Elegible':
                    a.array = generadorArrayDeterminado(7)
                    a.name = 'Not Elegible'
                    break;
                case 'Unable to provide Require':
                    a.array = generadorArrayDeterminado(7)
                    a.name = 'Unable to provide Require'
                    break;
                case 'Technical dificultes with web site':
                    a.array = generadorArrayDeterminado(7)
                    a.name = 'Technical dificultes with web site'
                    break;
                case 'No vaccine apointments':
                    a.array = generadorArrayDeterminado(7)
                    a.name = 'No vaccine apointments'
                    break;
                case 'Apointment times did':
                    a.array = generadorArrayDeterminado(7)
                    a.name = 'Apointment times did'
                    break;
                case 'Limit internet':
                    a.array = generadorArrayDeterminado(7)
                    a.name = 'Limit internet'
                    break;
                case 'Need childcare':
                    a.array = generadorArrayDeterminado(7)
                    a.name = 'Need childcare'
                    break;
                case 'Difficulty traveling':
                    a.array = generadorArrayDeterminado(7)
                    a.name = 'Difficulty traveling'
                    break;
                case 'Difficult leave':
                    a.array = generadorArrayDeterminado(7)
                    a.name = 'Difficult leave'
                    break;
            }
            console.log(a)
            b[i]=a
            
        }) */
        /* for (let i = 0; i < b.length; i++)
            console.log(b[i]) */


        //printChart3(svgRef4, checkedList.length, 360 / checkedList.length, NotEleG, UnaProG, TechDifiG, NoVaccG, ApoinG, LimitG, NeedG, DifG, DifLG)

    }

    function transition2(){

    }

    useEffect(() => {
        //Generando circulos

        let UnaProX = generaPuntosX(UnaPro, 40)
        let UnaproY = generaPuntosY(UnaPro, 40)
        //drawCircle(svgRef2, UnaProX, UnaproY, 'uno')
        linePath(svgRef2, UnaProX, UnaproY, 101, color)
        textGra(svgRef2, 310, 'Unable to provide require document', 40)

        let TechX = generaPuntosX(TechDifi, 80)
        let TechY = generaPuntosY(TechDifi, 80)
        //drawCircle(svgRef2, TechX, TechY, 'dos')
        linePath(svgRef2, TechX, TechY, 102, color)
        textGra(svgRef2, 310, 'Technical dificultes with website', 80)

        let NoVaccX = generaPuntosX(NoVacc, 120)
        let NoVaccY = generaPuntosY(NoVacc, 120)
        //drawCircle(svgRef2, NoVaccX, NoVaccY, 'tres')
        linePath(svgRef2, NoVaccX, NoVaccY, 103, color)
        textGra(svgRef2, 340, 'No Vaccine appointments', 120)

        let ApoinX = generaPuntosX(Apoin, 160)
        let ApoinY = generaPuntosY(Apoin, 160)
        //drawCircle(svgRef2, ApoinX, ApoinY, 'cuatro')
        linePath(svgRef2, ApoinX, ApoinY, 104, color)
        textGra(svgRef2, 400, 'Apointment times did', 160)

        let LimitX = generaPuntosX(Limit, 200)
        let LimitY = generaPuntosY(Limit, 200)
        //drawCircle(svgRef2, LimitX, LimitY, 'cinco')
        linePath(svgRef2, LimitX, LimitY, 105, color)
        textGra(svgRef2, 400, 'Limited internet', 200)

        let NeedX = generaPuntosX(Need, 240)
        let NeedY = generaPuntosY(Need, 240)
        //drawCircle(svgRef2, NeedX, NeedY, 'seis')
        linePath(svgRef2, NeedX, NeedY, 106, color)
        textGra(svgRef2, 340, 'Need Childcare', 240)

        let DifX = generaPuntosX(Dif, 280)
        let DifY = generaPuntosY(Dif, 280)
        //drawCircle(svgRef2, DifX, DifY, 'siete')
        linePath(svgRef2, DifX, DifY, 107, color)
        textGra(svgRef2, 320, 'Difficulty Traveling', 280)

        let DifLX = generaPuntosX(DifL, 320)
        let DifLY = generaPuntosY(DifL, 320)
        //drawCircle(svgRef2, DifLX, DifLY, 'ocho')
        linePath(svgRef2, DifLX, DifLY, 108, color)
        textGra(svgRef2, 310, 'Difficult Leave', 320)

        let NotEleX = generaPuntosX(NotEle, 360)
        let NotEleY = generaPuntosY(NotEle, 360)
        //drawCircle(svgRef2, NotEleX, NotEleY, 'nueve')
        linePath(svgRef2, NotEleX, NotEleY, 109, color)
        textGra(svgRef2, 310, 'Not elegible', 360)

        printChart(UnaPro, TechDifi, NoVacc, Apoin, Limit, NotEle, Need, Dif, DifL, 40, 80, 120, 160, 200, 240, 280, 320, 360, svgRef2)

        //printChart3(svgRef4, checkedList.length, 360/checkedList.length,  UnaPro, TechDifi, NoVacc, Apoin, Limit, NotEle, Need, Dif, DifL)


        Circle(svgRef2, [100, 150, 200, 250, 300], 'giokio')


        d3.selectAll('path')
            .on('mouseover', function (d, i) {
                d3.select(this).attr('opacity', '0.6')
            })
            .on('mouseout', function (d, i) {
                d3.select(this).attr('opacity', '0.3')
            })
    }, [])

    return <div >

        <button onClick={transition} id='btnChart'>transicion</button>

        <svg width='800' height='800'>
            <g ref={svgRef2} transform='translate(400, 400)'></g>
        </svg>
        <div>
            <CheckboxGroup options={options} value={checkedList} onChange={onChange} />
            <button onClick={() => genera()} id='btnGenera'>generar</button>
            <button onClick={() => transition2()} id='transition2'>Transision</button>
        </div>
        <svg width='800' height='800'>
            <g ref={svgRef4} transform='translate(400, 400)'></g>
        </svg>

    </div>
}