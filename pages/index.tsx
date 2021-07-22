import Circles from '../components/Circles'
import Grafica from '../components/Grafica'
import Lines from '../components/Lines'
import Navbar from '../components/Navbar'
import Circlecolor from '../components/componentcirclecolor/circlecolor'
import CircleAnidate from '../components/compCircleAnidate/circleAnidate'
import CircleA from '../components/circle2/CircleA'
import CircleThree from '../components/circleThreeColor/CircleThree'
import ThreeColorCircle from '../components/threeColorCircle/ThreeColorCircle'
import BubbleColor from '../components/bubbleColor/BubbleColor'
import { Bubble } from '../interfaces/Interfaces'
import Prueba from '../components/prueba/Prueba'
import { useEffect, useState } from 'react'
export default function Home() {
    let array1: Bubble[] = [
        {
            value: 0.639275,
            n: 640,
            country: 'Brazil'
        }, {
            value: 0.44243,
            n: 626,
            country: 'Angola'
        }, {
            value: 0.25663,
            n: 599,
            country: 'United States'
        }, {
            value: 0.76662,
            n: 656,
            country: 'United Kingdom'
        }, {
            value: 0.32345,
            n: 670,
            country: 'Germany'
        },
    ]

    let array2: Bubble[] = [
        {
            value: 0.539275,
            n: 840,
            country: 'Brazil'
        }, {
            value: 0.74243,
            n: 426,
            country: 'Angola'
        }, {
            value: 0.35663,
            n: 199,
            country: 'United States'
        }, {
            value: 0.86662,
            n: 456,
            country: 'United Kingdom'
        }, {
            value: 0.12345,
            n: 870,
            country: 'Germany'
        },
    ]

    let array3: Bubble[] = [
        {
            value: 0.639275,
            n: 640,
            country: 'Brazil'
        }, {
            value: 0.44243,
            n: 626,
            country: 'Angola'
        }, {
            value: 0.25663,
            n: 599,
            country: 'United States'
        }, {
            value: 0.76662,
            n: 656,
            country: 'United Kingdom'
        }, {
            value: 0.32345,
            n: 670,
            country: 'Germany'
        }, {
            value: 0.62345,
            n: 470,
            country: 'France'
        },
    ]

    const [a1, setA1] = useState(array1)

    function cambia() {
        setA1(array3)
    }

    useEffect(() => {

    }, [a1])
    return (<>

        <button onClick={cambia}>click</button>
        <BubbleColor array1={a1} array2={array2} array3={array3} />
        {/* <Prueba /> */}

    </>
    )
}