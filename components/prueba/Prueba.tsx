import React, { useEffect, useRef, useState } from 'react'
import * as d3 from 'd3'
import D from './data.json'

export default function Prueba() {
    interface d {
        "sepalLength": number,
        "sepalWidth": number,
        "petalLength": number,
        "petalWidth": number,
        "species": string
    }

    const [data, setData] = useState<d[]>(D)
    const [data2, setdata2] = useState<any>([])

    const ref = useRef(null)
    let cas: any, scaleY: any, scaleX: any

    let svg: any, width = 800, height = width, radius = width * 0.002, sizeTittles = width * 0.4
    let tittles = ['Concerned about side effects.', "Don't know if vaccine will work.", "Don't like vaccines.",
        'Plan to wait.', 'Others need it more.', 'Concerned about the cost.', "It's against my religious beliefs.", 'Other.']
    function printTittles() {
        let distance = width / tittles.length / 2
        let titt = svg.append('g')
            .selectAll('text')
            .data(tittles)
            .enter()
            .append('text')
            .attr('x', 15)
            .attr('y', function (d: any, i: any) {
                return distance * (i + 1)
            })
            .text(function (d: any) { return d })
            .style('font-family', 'Times New Roman')
            .style('font-weight', 'bold')
            .style('font-size', 10)
    }
    /*     function printCircles() {
            let circl = svg.append('g')
                .attr("transform", "translate(" + sizeTittles + "," + height + ")");
    
            d3.csv("https://raw.githubusercontent.com/holtzy/D3-graph-gallery/master/DATA/iris.csv", function (data) {
    
                // Build and Show the Y scale
                var y = d3.scaleLinear()
                    .domain([3.5, 8])          // Note that here the Y scale is set manually
                    .range([height, 0])
                svg.append("g").call(d3.axisLeft(y))
    
                // Build and Show the X scale. It is a band scale like for a boxplot: each group has an dedicated RANGE on the axis. This range has a length of x.bandwidth
                var x = d3.scaleBand()
                    .range([0, width])
                    .domain(["setosa", "versicolor", "virginica"])
                    .padding(0.05)     // This is important: it is the space between 2 groups. 0 means no padding. 1 is the maximum.
                svg.append("g")
                    .attr("transform", "translate(0," + height + ")")
                    .call(d3.axisBottom(x))
    
                // Features of the histogram
                var histogram = d3.histogram()
                    .domain(y.domain())
                    .thresholds(y.ticks(20))    // Important: how many bins approx are going to be made? It is the 'resolution' of the violin plot
                    .value(d => d)
    
                // Compute the binning for each group of the dataset
                var sumstat = d3.nest()  // nest function allows to group the calculation per level of a factor
                    .key(function (d) { return d.Species; })
                    .rollup(function (d) {   // For each key..
                        input = d.map(function (g) { return g.Sepal_Length; })    // Keep the variable called Sepal_Length
                        bins = histogram(input)   // And compute the binning on it.
                        return (bins)
                    })
                    .entries(data)
    
                // What is the biggest number of value in a bin? We need it cause this value will have a width of 100% of the bandwidth.
                var maxNum = 0
                for (i in sumstat) {
                    allBins = sumstat[i].value
                    lengths = allBins.map(function (a) { return a.length; })
                    longuest = d3.max(lengths)
                    if (longuest > maxNum) { maxNum = longuest }
                }
    
                // The maximum width of a violin must be x.bandwidth = the width dedicated to a group
                var xNum = d3.scaleLinear()
                    .range([0, x.bandwidth()])
                    .domain([-maxNum, maxNum])
    
                // Color scale for dots
                var myColor = d3.scaleSequential()
                    .interpolator(d3.interpolateInferno)
                    .domain([3, 9])
    
                // Add the shape to this svg!
                svg
                    .selectAll("myViolin")
                    .data(sumstat)
                    .enter()        // So now we are working group per group
                    .append("g")
                    .attr("transform", function (d) { return ("translate(" + x(d.key) + " ,0)") }) // Translation on the right to be at the group position
                    .append("path")
                    .datum(function (d) { return (d.value) })     // So now we are working bin per bin
                    .style("stroke", "none")
                    .style("fill", "grey")
                    .attr("d", d3.area()
                        .x0(xNum(0))
                        .x1(function (d) { return (xNum(d.length)) })
                        .y(function (d) { return (y(d.x0)) })
                        .curve(d3.curveCatmullRom)    // This makes the line smoother to give the violin appearance. Try d3.curveStep to see the difference
                    )
    
                // Add individual points with jitter
                var jitterWidth = 40
                svg
                    .selectAll("indPoints")
                    .data(data)
                    .enter()
                    .append("circle")
                    .attr("cx", function (d) { return (x(d.Species) + x.bandwidth() / 2 - Math.random() * jitterWidth) })
                    .attr("cy", function (d) { return (y(d.Sepal_Length)) })
                    .attr("r", 5)
                    .style("fill", function (d) { return (myColor(d.Sepal_Length)) })
                    .attr("stroke", "white")
    
            })
        } */

    /* "sepalLength": number,
        "sepalWidth": number,
            "petalLength": number,
                "petalWidth": number,
                    "species": string */

    function print(ref: any) {
        ref.selectAll('circle')
            .data(data2)
            .enter()
            .append('circle')
            .attr("cx", function (d: any) { return (scaleX(d.Sepal_Length)) })
            .attr("cy", function (d: any) { return (scaleY(d.Sepal_Width)) })
            .attr("r", 5)
            .style("fill", function (d: any) { return 'red' })
            .attr("stroke", "white")
    }
    useEffect(() => {
        scaleX = d3.scaleLinear()
            .domain([1.3, 1.7])
            .range([sizeTittles, width])


        scaleY = d3.scaleLinear()
            .domain([0.1, 0.2])
            .range([-height / tittles.length, 0])

        svg = d3.select(ref.current)
            .attr('width', width)
            .attr('height', height)

        cas = svg.append('g')
            .attr("transform", "translate(" + sizeTittles + "," + height / tittles.length / 2 + ")");

        printTittles()

        d3.csv('https://raw.githubusercontent.com/holtzy/D3-graph-gallery/master/DATA/iris.csv')
            .then(da => {
                setdata2(da)
            })
        print(cas)
    }, [])
    useEffect(() => {
        d3.csv('https://raw.githubusercontent.com/holtzy/D3-graph-gallery/master/DATA/iris.csv')
            .then(da => {
                setdata2(da)
            })
        print(cas)
        console.log(data2)
    }, [])
    return (<>
        <div>
            <svg ref={ref} />
        </div>
        <div>
            <button onClick={() => print(cas)}>generar</button>
        </div>
    </>
    )
}
