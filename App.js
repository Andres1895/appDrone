import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';
import MapView, { PROVIDER_GOOGLE, Polyline }  from 'react-native-maps';


type Props = {};
export default class App extends Component<Props> {
  render() {
    return (
      <View style={styles.container}>
      <View >
        <Text style={styles.welcome}>
          Hoooooooola
        </Text>
      </View>
      <MapView
        provider={PROVIDER_GOOGLE} // remove if not using Google Maps
        style={styles.map}
        region={{
          latitude: 19.512806,
          longitude: -99.1283901,
          latitudeDelta: 0.00522,
          longitudeDelta: 0.00121,
        }}
      >
         <MapView.Marker
            coordinate={{
            latitude:  19.512307,
            longitude: -99.129611}}
            title={"Persona Detectada"}
            description={"Persona en posible situacion de riesgo"}
         />
         <Polyline
		coordinates={[
			{ latitude:  19.512307, longitude: -99.129611 },
			{ latitude: 19.512812, longitude: -99.129519 },
			{ latitude: 19.512964, longitude: -99.129637 }, 
			{ latitude: 19.512726, longitude: -99.130010 }, 
      { latitude: 19.513067, longitude:  -99.129978 } 
     
		]}
		strokeColor="#000" // fallback for when `strokeColors` is not supported by the map-provider
		strokeColors={[
			'#7F0000',
			'#00000000', // no color, creates a "long" gradient between the previous and next coordinate
			'#B24112',
			'#E5845C',
			'#238C23',
			'#7F0000'
		]}
		strokeWidth={6}
	/>
      </MapView>

    </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    height: 600,
    width: 400,
    justifyContent: 'center',
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
    alignItems: 'center'
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
