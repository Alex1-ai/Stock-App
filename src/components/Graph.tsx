import React,{useState} from 'react'
import { View, Text } from './Themed'
import { LineGraph, GraphPoint } from 'react-native-graph';
import { MonoText } from './StyledText';
import { useQuery, gql } from '@apollo/client';
import { ActivityIndicator, StyleSheet } from 'react-native';
import { UrlObject } from 'expo-router/build/LocationProvider';

const query = gql`
query MyQuery($interval: String!, $symbol: String!) {
  time_series(interval: $interval, symbol: $symbol) {
    values {
      datetime
      close
    }
  }
}


`

const Graph = ({symbol}:{symbol: string}) => {
  const [selectedPoint, setSelectedPoint ] = useState<GraphPoint>()

  const  { data, loading, error } = useQuery(query,{
    variables:{
      symbol, 
      interval: '1day'
    }
  })


  if (loading){
    return <ActivityIndicator />
  }
  if (error){
    return <Text>could not load ....</Text>
  }
  // console.log(data)
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
     
    const points: GraphPoint[] = data.time_series.values.map((value)=>({
        date: new Date(value.datetime),
        value: Number.parseFloat(value.close)
    }))
    
    const onPointSelected = (point: GraphPoint)=>{
        console.log(point.value);
        setSelectedPoint(point);
    }
     // this is to display it to be pretty
    // console.log(JSON.stringify(graphPoints, null, 2))
  return (
    <View style={style.container}>
        
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


const style = StyleSheet.create({
  container: {
    // backgroundColor:'white'
  }
})

export default Graph