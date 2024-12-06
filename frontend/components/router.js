import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function App() {
  return (
    <>
      <View style={styles.container}>
      <View style={styles.container1}>
        
      </View>
      <View style={styles.container1}>
        
      </View>
      <View style={styles.container1}>
        
      </View>
      <View style={styles.container1}>
        
      </View>
      </View>
      
    </>
  );
}

const styles = StyleSheet.create({
container: {
    paddingTop:10,
    paddingLeft:10,
    flexDirection: 'row',
    marginTop:400,
    width: 367,
    height: 107,
    borderRadius: 13,
    backgroundColor: '#010101',
    gap: 28.36,
    },
container1: {
        
        width: 64.517,
        height: 64.517,
        borderRadius: 9.338,
        backgroundColor: '#282828',
        }
    
});
