import React,{useState} from 'react'
import { View, Text } from './Themed'
import { LineGraph, GraphPoint } from 'react-native-graph';
import Colors from '../constants/Colors';
import timeseries from "@/assets/data/timeseries.json"
import { MonoText } from './StyledText';
const Graph = () => {
    
    // const points : GraphPoint[]=[
    //     {
    //         date: new Date(2024,1,1),
    //         value: 10
    //     },
    //     {
    //         date: new Date(2024,1,2),
    //         value:15
    //     },
    //     {
    //         date: new Date(2024,1,3),
    //         value:5
    //     }
        
    // ]
     
    const points: GraphPoint[] = timeseries.values.map((value)=>({
        date: new Date(value.datetime),
        value: Number.parseFloat(value.close)
    }))
    const [selectedPoint, setSelectedPoint ] = useState<GraphPoint>(points[points.length-1])

    const onPointSelected = (point: GraphPoint)=>{
        console.log(point.value);
        setSelectedPoint(point);
    }
     // this is to display it to be pretty
    // console.log(JSON.stringify(graphPoints, null, 2))
  return (
    <View>
        
        <MonoText style={{fontSize:20, fontWeight:'bold'}}>${selectedPoint?.value.toFixed(1)}</MonoText>
       <Text style={{color:'grey'}}>{selectedPoint?.date.toDateString()}</Text>
        <LineGraph 
           style={{width:'100%', height:300}}
           points={points}
           animated={true}
           color="#017560"
           gradientFillColors={["#0175605D", '#7476df31']}
           enablePanGesture
           onPointSelected={onPointSelected}
           enableIndicator
           indicatorPulsating
           enableFadeInMask

        />  
    </View>
  )
}

export default Graph