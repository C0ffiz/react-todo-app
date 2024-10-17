import React from 'react';
import { View, Image, StyleSheet, Text } from 'react-native';


const App = () => {
  return (
    <View style={styles.container} >
      <View style={styles.imageContainer}>
        <Image style={styles.image} source={require('../assets/images/circle.png')}/>
      
      
        <Image style={styles.image} source={require('../assets/images/circle.png')}/>
      
      
        <Image style={styles.image} source={require('../assets/images/circle.png')}/>
     
     
        <Image style={styles.image} source={require('../assets/images/circle.png')}/>
      </View>
      <View style={styles.separator} />
      <View style={styles.squareView}>
        <Image
          source={require('../assets/images/square.png')}
          style={styles.squareImage}
        />
      </View>
      <View>
        <Text>Texto</Text>
      </View>
      <View style={styles.viewsSeila}>
        <View style={styles.image2}>
          
        </View>
        <View style={styles.image2}>
          
        </View>
        <View style={styles.image2}>
          
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
  },
  imageContainer: {
    flexDirection: 'row',
    paddingTop: -10,
  },
  viewsSeila: {
    flexDirection: 'row',
    paddingTop: -10,
  },
  image: {
    width: 94, 
    height: 94, 
    marginRight: 10, 
  },
  image2: {
    width: 94, 
    height: 200, 
    marginRight: 10, 
    backgroundColor: 'grey'
  },
  squareView: {
    width: '100%', 
    height: 200, 
    justifyContent: 'center',
    alignItems: 'center',
  },
  squareImage: {
    width: '100%', 
    height: '100%', 
    resizeMode: 'cover', 
  },
  separator: {
    height: 2,
    backgroundColor: 'black', 
    width: '100%', 
  },
});

export default App;
