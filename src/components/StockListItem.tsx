import { StyleSheet, Pressable } from "react-native";
import { Text, View } from "./Themed";
import Colors from "../constants/Colors";
import { AntDesign } from "@expo/vector-icons";
import { MonoText } from "./StyledText";
import { Link } from "expo-router";

import { useMutation, gql } from "@apollo/client";


const mutation = gql`
    mutation MyMutation($symbol:String!, $user_id:String!) {
        insertFavorites(symbol: $symbol, user_id: $user_id) {
        id
        symbol
        user_id
        }
    }



`;

type Stock = {
    name: string;
    symbol: string;
    close: string;
    percent_change: string;
}

type StockListItem ={
    stock: Stock
}


function StockListItem({stock}: StockListItem) {
    const  [runMutation]= useMutation(mutation, {
        variables:{ user_id: 'chidi', symbol: stock.symbol}
    })
    const change = Number.parseFloat(stock.percent_change);

    const onFavoritesPressed = () =>{
        // console.warn('hello')
        runMutation()
    }
    return (
        <Link href={`/${stock.symbol}`} asChild>
        <Pressable style={styles.container}>
            <View style={{flex:1, gap:5}}>
                <Text style={styles.symbol}>
                    {stock.symbol} 
                    {' '}
                    <AntDesign onPress={onFavoritesPressed} name="staro" size={18} color='grey'/>
                </Text>
                <Text style={{color:'grey'}}>
                    {stock.name}
                </Text>
            </View>
            
            <View style={{alignItems:'flex-end'}}>
                <MonoText>${Number.parseFloat(stock.close).toFixed(1)}</MonoText>
                <MonoText style={{ color: change>0? 'green':'red'}}>
                    {change > 0? '+':''}{change.toFixed(1)}%
                    </MonoText>
            </View>
        </Pressable>
        </Link>
    )
}


const styles = StyleSheet.create({
    container:{
        flexDirection:'row',

        // justifyContent:'space-between'
        

    },
    symbol:{
        fontSize: 18,
        fontWeight:'bold',
        color: Colors.light.tint
      
        
    },

   
})


export default StockListItem