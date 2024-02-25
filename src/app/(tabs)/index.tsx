import { StyleSheet,FlatList, TouchableOpacity } from 'react-native';

// import EditScreenInfo from '@/src/components/EditScreenInfo';
import { Text, View } from '@/src/components/Themed';
import { Stack, useRouter } from 'expo-router';
import  top5  from '@/assets/data/top5.json';
import StockListItem from '@/src/components/StockListItem';
import Colors from '@/src/constants/Colors';
import React from 'react';
export default function TabOneScreen() {
  // const router = useRouter();
  // change that to list
  const stock = Object.values(top5)
  console.log(top5)
  return (
    <View style={styles.container}>
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    
    
    
  },

});
