import { StyleSheet,FlatList } from 'react-native';

// import EditScreenInfo from '@/src/components/EditScreenInfo';
import { Text, View } from '@/src/components/Themed';
import { Stack } from 'expo-router';
import  top5  from '@/assets/data/top5.json';
import StockListItem from '@/src/components/StockListItem';
import Colors from '@/src/constants/Colors';
export default function TabOneScreen() {
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
        renderItem={({item})=><StockListItem stock={item}/>}
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
