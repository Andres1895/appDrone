import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, Button } from 'react-native';
import MapView, { PROVIDER_GOOGLE, Polyline } from 'react-native-maps';
import axios from 'axios';

function MarkerForPerson(latitude, longitude) {
  console.log(latitude, longitude)
  return (
    <MapView.Marker
      coordinate={{
        latitude: 19.51197,
        longitude:  -99.125623
      }}
      title={"Persona Detectada"}
      description={"Persona en posible situacion de riesgo"}
    />
  );
}

export default class GeoView extends Component {
  constructor() {
    super();

    this.getCoordinates = this.getCoordinates.bind(this);
    this.state = {
      data: [],
      coordinates: [],
    }
  }

  componentDidMount() {
    this.getCoordinates();
  }

  getCoordinates() {
    console.log("Coordinates");
    fetch('http://192.168.1.152:5000/getCoordinates', {
      method: 'GET',
    })
      .then((response) => response.json())
      .then((responseJson) => {
        const coordinates = responseJson.data.coordinates;

        const newCoord = coordinates.map((coordinate) => {
          return {
            'latitude': parseFloat(coordinate.latitud),
            'longitude': parseFloat(coordinate.longitud)
          }
        });

        const data = coordinates.map((coordinate) => {
          return {
            'isPerson': coordinate.isPerson,
            'latitude': parseFloat(coordinate.latitud),
            'longitude': parseFloat(coordinate.longitud)
          }
        })

        this.setState({
          data: data,
          coordinates: newCoord,
        })

        console.log(responseJson.data.coordinates, newCoord)
      })
      .catch((error) => {
        console.error(error);
      });

  }

  render() {
    console.log('state', this.state)
    const { coordinates, data } = this.state;
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

          {coordinates.length > 0 && <Polyline
            coordinates={coordinates}
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

          />}

          {data.length > 0 && data.map((coordinate) => {
            console.log(coordinate)
            if (coordinate.isPerson) {
              console.log('yes')
              return(
                <MapView.Marker
                coordinate={{
                  latitude: coordinate.latitude,
                  longitude: coordinate.longitude
                }}
                title={"Persona Detectada"}
                description={"Persona en posible situacion de riesgo"}
              />
              )
            }
            return null;
          })}
          
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