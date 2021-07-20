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

export default function Home() {
    let array: Bubble[] = [
        {
            value: 0.639275,
            n: 640,
            country: 'Brazil'
        },{
            value: 0.44243,
            n: 626,
            country: 'Angola'
        },{
            value: 0.15663,
            n: 599,
            country: 'United States'
        },{
            value: 0.76662,
            n: 656,
            country: 'United Kingdom'
        },{
            value: 0.32345,
            n: 670,
            country: 'Germany'
        },
    ]


    return (<>

        <BubbleColor  array1={array} array2={array} array3={array}  />

    </>
    )
}