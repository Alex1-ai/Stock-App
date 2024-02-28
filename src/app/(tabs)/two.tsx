import { ActivityIndicator, StyleSheet } from 'react-native';

// import EditScreenInfo from '@/src/components/EditScreenInfo';
import { Text, View } from '@/src/components/Themed';
import { Stack } from 'expo-router';
import { FlatList } from 'react-native-gesture-handler';
import StockListItem from '@/src/components/StockListItem';
import { useQuery, gql } from '@apollo/client';

const query = gql`
query MyQuery($user_id: String!) {
  favoritesByUser_id(user_id: $user_id) {
    id
    quote {
      close
      name
      percent_change
      symbol
    }
  }
}

`

export default function TabTwoScreen() {
  const { loading, error, data} = useQuery(query,{
    variables: { user_id: 'chidi'}
  });

  if (loading){
    return <ActivityIndicator />
  }

  if(error){
    return <Text>Failed to load the data ...</Text>


  }
  const stocks = data.favoritesByUser_id.map((fav)=>fav.quote);
  
  // console.log(data)
  return (
    <View style={styles.container}>
        <Stack.Screen options={{
        title:"Favorites Stocks"
      }}/>


      <FlatList  
        data={stocks}
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
