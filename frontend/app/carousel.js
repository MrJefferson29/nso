// App.js
import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import Swiper from 'react-native-swiper';

export default function Carousel() {
  return (
      <Swiper style={styles.wrapper} showsButtons={false} autoplay={true}>
        <View style={styles.slide}>
          <Image
            source={require('../assets/images/ho2.webp')}
            style={styles.image}
          />
          <Text style={styles.text}>Slide 1</Text>
        </View>
        <View style={styles.slide}>
          <Image
            source={require('../assets/images/ho3.webp')}
            style={styles.image}
          />
          <Text style={styles.text}>Slide 2</Text>
        </View>
        <View style={styles.slide}>
          <Image
            source={require('../assets/images/ho4.webp')}
            style={styles.image}
          />
          <Text style={styles.text}>Slide 3</Text>
        </View>
        <View style={styles.slide}>
          <Image
            source={require('../assets/images/ho3.webp')}
            style={styles.image}
          />
          <Text style={styles.text}>Slide 3</Text>
        </View>
      </Swiper>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    height: 150,
    marginTop: 20,
  },
  slide: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  text: {
    marginTop: 20,
    fontSize: 24,
    fontWeight: 'bold',
  },
});
