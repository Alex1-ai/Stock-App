import React from 'react'
import { Text, View } from '../components/Themed'
import { Stack, useLocalSearchParams } from 'expo-router'
import top5 from "@/assets/data/top5.json";
import StockListItem from '../components/StockListItem';

const StockDetails = () => {
  const { symbol } = useLocalSearchParams()

  const stock = top5[symbol];

  if(!stock){
    return <View style={{padding:10}}>
      <Text>Stock with symbol {symbol} could not be found </Text>
    </View>
  }

  return (
    <View style={{padding:10}}>
    <Stack.Screen options={
      {
        title: `${symbol}`,
        headerBackTitleVisible:false
      }

    } />
    <StockListItem stock={stock} />
    </View>
  )
}

export default StockDetails