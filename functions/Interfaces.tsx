export interface chart {
    array:number[],
    name:string
}
export interface Size {
    width: number | undefined;
    height: number | undefined;
}
export interface propCircle  {
    cx : number,
    cy: number,
    r: number,
    fill?:string,
    stroke?:string
}
export type propC = {
    id: number,
    country: string,
    poblationWeighted: number,
    poblationMedian: number,
    percentage: number
}
export interface propLine {
    x1:number,
    y1:number,
    x2:number,
    y2:number,
    opacity?:string
}

export interface propText {
    x:number,
    y:number,
    text:String, 
    size?:String    
}
export interface data{
    x:number[],
    y:number[]
}