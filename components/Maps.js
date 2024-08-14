import React, { useEffect, useState } from 'react';
import { StyleSheet, View, ActivityIndicator  } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';

const Map = ({ location }) => {
  const [mapRegion, setMapRegion] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getUserLocation = async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permisos para acceder a la ubicación denegados');
        setLoading(false);
        return;
      }

      try {
        let location = await Location.getCurrentPositionAsync({ enableHighAccuracy: true });
        setMapRegion({
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
          latitudeDelta: 0.1,
          longitudeDelta: 0.1,
        });
      } catch (error) {
        console.error(error);
        setErrorMsg('Error al obtener la ubicación');
      } finally {
        setLoading(false);
      }
    };

    // Si no se proporciona una ubicación, obtén la ubicación del usuario
    if (!location) {
      getUserLocation();
    } else {
      setMapRegion({
        latitude: location.latitude,
        longitude: location.longitude,
        latitudeDelta: 0.1,
        longitudeDelta: 0.1,
      });
      setLoading(false);
    }
  }, [location]);

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (errorMsg) {
    return (
      <View style={styles.container}>
        <Text>{errorMsg}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <MapView style={styles.map} region={mapRegion}>
        {mapRegion && (
          <Marker coordinate={mapRegion} title='Ubicación actual' />
        )}
      </MapView>
    </View>
  );
}



const styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgba(173, 220, 260, 0.5)', // Celeste claro con transparencia
    borderRadius: 10,
    padding: 15,
    width: '100%', 
    height: 300, 
    alignSelf: 'center', 
    overflow: 'hidden', 
    borderBottomLeftRadius: 10, 
    borderBottomRightRadius: 10,
    borderTopLeftRadius: 0, 
    borderTopRightRadius: 0,
    marginBottom: 70,
  },
  map: {
    flex: 1,
  },
});

export default Map;
