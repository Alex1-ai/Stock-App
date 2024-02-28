import { StyleSheet,FlatList, TouchableOpacity, ActivityIndicator } from 'react-native';

// import EditScreenInfo from '@/src/components/EditScreenInfo';
import { Text, View } from '@/src/components/Themed';
import { Stack, useRouter } from 'expo-router';

import StockListItem from '@/src/components/StockListItem';
import Colors from '@/src/constants/Colors';
import React from 'react';
import { useQuery, gql } from '@apollo/client';

const query = gql`
query MyQuery($symbol: String) {
  quotes(symbol: $symbol) {
    value {
      name
      symbol
      close
      percent_change
    }
  }
}


`

export default function TabOneScreen() {
  // const router = useRouter();
  // change that to list
  // const stock = Object.values(top5)
   
  // console.log(top5)

  const { data, loading, error } = useQuery(query,{
    variables:{ symbol: 'AAPL,IBM,MSFT,META,TSLA,AMD,TRP:TSX,NVDA'}
  })
  if(loading){
    return <ActivityIndicator />;
  }
  if (error){
    return <Text>Faile to fetch stocks</Text>
  }
  const stock =data.quotes.map((q)=>q.value)

    
     
  return (
    <View >
      <Stack.Screen options={{
        title:"Stocks"
      }}/>


      <FlatList  
        data={stock}
        renderItem={({item})=>
        // <TouchableOpacity onPress={()=>{router.push('/stock')}}>
           <StockListItem stock={item}/>
        // </TouchableOpacity>
           }
        contentContainerStyle={{ gap:20, padding: 10}}
      />
      
    </View>
  );
}

