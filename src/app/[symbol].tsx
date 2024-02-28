import React from 'react'
import { Text, View } from '../components/Themed'
import { Stack, useLocalSearchParams } from 'expo-router'

import StockListItem from '../components/StockListItem';
import Graph from '../components/Graph';
import { useQuery, gql } from '@apollo/client';import { ActivityIndicator } from 'react-native';


const query = gql`
query MyQuery($symbol: String) {
  quote(symbol: $symbol) {
    name
    percent_change
    close
    symbol
  }
}


`
const StockDetails = () => {
  const { symbol } = useLocalSearchParams()
  const { data, loading, error } = useQuery(query,{
    variables:{symbol}
  })
  if (loading){
    return <ActivityIndicator />
  }

  if(error){
    return <Text> Stock with symbol {symbol} could not be fetched</Text>
  }


  const stock = data.quote;
  // const stock = top5[symbol];

  // if(!stock){
  //   return <View style={{padding:10}}>
  //     <Text>Stock with symbol {symbol} could not be found </Text>
  //   </View>
  // }

  return (
    <View style={{padding:10}}>
    <Stack.Screen options={
      {
        title: `${symbol}`,
        headerBackTitleVisible:false
      }

    } />
    <StockListItem stock={stock} />
    <Graph symbol={stock.symbol}/>
    </View>
  )
}

export default StockDetails