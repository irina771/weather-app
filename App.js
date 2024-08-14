import React, { useCallback, useState, useEffect } from 'react';
import { View, StatusBar, Image, SafeAreaView, TextInput, TouchableOpacity, Text, ScrollView } from 'react-native';
import { theme } from './theme';
import { CalendarDaysIcon, MagnifyingGlassIcon } from 'react-native-heroicons/outline';
import { MapPinIcon } from 'react-native-heroicons/solid';
import { debounce } from 'lodash';
import * as Progress from 'react-native-progress';
import { locationsfetch, forecast } from './api/api.js';
import Maps from './components/Maps.js';
import { getData, storeData } from './components/storage.js';
// import Busqueda from './components/Search.js';
import getApiInfo from './api/apiSearch.js';
import getForecastInfo from './api/getForecast.js';
import {styles} from "./styles/appStyles.js"

export default function App() {
  const [showSearch, toggleSearch] = useState(false);
  const [locations, setLocations] = useState([]);
  const [weather, setWeather] = useState({});
  const [loading, setLoading] = useState(true);
  const [cityData, setCityData] = useState(null);
  const [cityLocation, setCityLocation] = useState(null);

  const handleCitySearch = async (cityName) => {
    try {
      // Llama a la función para obtener los datos del clima de la ciudad buscada
      const cityData = await getForecastInfo(cityName);
      // Actualiza los datos de la ciudad en el estado
      setCityData(cityData);
      // Llama a la función para obtener los datos del pronóstico de la ciudad buscada
      const forecastData = await getApiInfo(cityData.lat, cityData.lon, cityData.timezone);
      // Actualiza los datos del pronóstico en el estado
      setWeather(forecastData); // Cambiado de setForecastData a setWeather
      setLoading(false); // Agregado para indicar que la carga ha finalizado
      storeData('city', cityName);
    } catch (error) {
      console.error('Error fetching city data:', error);
      setLoading(false); // Agregado para indicar que la carga ha finalizado incluso en caso de error
    }
  };

current
  const handleSubmit = (cityName) => {
    handleCitySearch(cityName);
  };

  const handleLocation = (loc) => {
    setLocations([]);
    toggleSearch(false);
    setLoading(true);
    forecast({
      cityName: loc.name,
      days: '7'
    }).then(data => {
      setWeather(data);
      setLoading(false);
      storeData('city', loc.name);
      storeData('mapLocation', JSON.stringify({
        latitude: data?.location?.lat,
        longitude: data?.location?.lon
      }));
      setCityLocation({
        latitude: data?.location?.lat,
        longitude: data?.location?.lon
      });
    });
  }

  const handleSearch = value => {
    if (value.length > 2) {
      locationsfetch({ cityName: value }).then(data => {
        setLocations(data);
      });
    }
  }

  useEffect(() => {
    fetchWeatherData();
    fetchMapLocation(); 
  }, []);
  const fetchMapLocation = async () => {
    let mapLocation = await getData('mapLocation');
    if (mapLocation) {
      mapLocation = JSON.parse(mapLocation);
      setCityLocation(mapLocation);
    }
  };
  const fetchWeatherData = async () => {
    let myCity = await getData('city');
    let cityName = 'Buenos Aires';
    if (myCity) cityName = myCity;
    forecast({
      cityName,
      days: '3' //solo se permiten 3 dias en la api
    }).then(data => {
      setWeather(data);
      setLoading(false)
    })
  }

  const translateDescription = (description) => {
    const translations = {
      "Clear": "Cielo despejado",
      "Sunny": "Soleado",
      "Partly cloudy": "Parcialmente nublado",
      "Cloudy": "Nublado",
      "Overcast": "Nublado",
      "Mist": "Neblina",
      "Patchy rain possible": "Posible lluvia irregular",
      "Patchy rain nearby": "Posible lluvia irregular",
      "Patchy snow possible": "Posible nieve irregular",
      "Patchy sleet possible": "Posible aguanieve irregular",
      "Patchy freezing drizzle possible": "Posible llovizna helada irregular",
      "Thundery outbreaks possible": "Posibles tormentas eléctricas",
      "Blowing snow": "Nieve soplada",
      "Blizzard": "Tormenta de nieve",
      "Fog": "Niebla",
      "Freezing fog": "Niebla helada",
      "Patchy light drizzle": "Llovizna ligera irregular",
      "Light drizzle": "Llovizna ligera",
      "Freezing drizzle": "Llovizna helada",
      "Heavy freezing drizzle": "Llovizna helada intensa",
      "Patchy light rain": "Lluvia ligera irregular",
      "Light rain": "Lluvia ligera",
      "Moderate rain at times": "Lluvia moderada ocasional",
      "Moderate rain": "Lluvia moderada",
      "Heavy rain at times": "Lluvia intensa ocasional",
      "Heavy rain": "Lluvia intensa",
      "Light freezing rain": "Lluvia helada ligera",
      "Moderate or heavy freezing rain": "Lluvia helada moderada o intensa",
      "Light sleet": "Aguanieve ligera",
      "Moderate or heavy sleet": "Aguanieve moderada o intensa",
      "Patchy light snow": "Nieve ligera irregular",
      "Light snow": "Nieve ligera",
      "Patchy moderate snow": "Nieve moderada irregular",
      "Moderate snow": "Nieve moderada",
      "Patchy heavy snow": "Nieve intensa irregular",
      "Heavy snow": "Nieve intensa",
      "Ice pellets": "Granizo pequeño",
      "Light rain shower": "Chubasco ligero",
      "Moderate or heavy rain shower": "Chubasco moderado o intenso",
      "Torrential rain shower": "Chubasco torrencial",
      "Light sleet showers": "Chubascos ligeros de aguanieve",
      "Moderate or heavy sleet showers": "Chubascos moderados",
      "Light snow showers": "Chubascos ligeros de nieve",
      "Moderate or heavy snow showers": "Chubascos moderados",
      "Light showers of ice pellets": "Chubascos ligeros de granizo pequeño",
      "Moderate or heavy showers of ice pellets": "Chubascos moderados",
      "Patchy light rain with thunder": "Lluvia ligera irregular con truenos",
      "Moderate or heavy rain with thunder": "Lluvia moderada",
      "Patchy light snow with thunder": "Nieve ligera irregular con truenos",
      "Moderate or heavy snow with thunder": "Nieve moderada"
    };
    if (translations.hasOwnProperty(description)) {
      return translations[description];
    }
    return description;
  };


  const hourlyData = weather?.forecast?.forecastday[0]?.hour || [];
  const handleText = useCallback(debounce(handleSearch, 1200), []);
  const { current, location } = weather;

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <Image
        blurRadius={80}
        source={require('./assets/bg2.jpg')}
        style={styles.backgroundImage}
      />
      {
        loading ? (
          <View style={styles.loaderContainer}>
            <Progress.CircleSnail thickness={10} size={40} color="#0bb3b2" />
          </View>
        ) : (
          <SafeAreaView style={styles.safeAreaView}>
            <ScrollView>

              <View style={styles.searchContainer}>
                {/* <Busqueda handleSubmit={handleSubmit} /> */}
                <View style={[styles.searchBox, { backgroundColor: showSearch ? theme.bgWhite(0.2) : 'transparent' }]}>
                  {
                    showSearch ? (
                      <TextInput
                        onChangeText={handleText}
                        placeholder='Buscar ciudad'
                        placeholderTextColor='lightgray'
                        style={styles.textInput}
                      />
                    ) : null
                  }
                  <TouchableOpacity onPress={() => toggleSearch(!showSearch)}
                    style={{ backgroundColor: theme.bgWhite(0.3), borderRadius: 15, padding: 2, margin: 2 }}

                  >
                    <MagnifyingGlassIcon size={25} color='white' />
                  </TouchableOpacity>
                </View>
                {
                  locations.length > 0 && showSearch ? (
                    <View style={styles.searchResultsContainer}>
                      {
                        locations.map((loc, index) => {
                          let showBorder = index + 1 !== locations.length;
                          let borderStyle = showBorder ? { borderBottomWidth: 2, borderBottomColor: 'gray' } : null;
                          return (
                            <TouchableOpacity onPress={() => handleLocation(loc)} key={index} style={[styles.searchResultItem, borderStyle]}>
                              <MapPinIcon size={20} color='white' />
                              <Text style={styles.searchResultText}>{loc?.name}, {loc?.country}</Text>

                            </TouchableOpacity>
                          );
                        })
                      }
                    </View>
                  ) : null
                }
              </View>
              {/* forecast section */}
              <View style={styles.forecastContainer}>
                {/* location */}
                <Text style={styles.locationText}>{location?.name},
                  <Text style={styles.countryText}>{" " + location?.country}</Text>
                </Text>

                {/* weather icon */}
                <View style={styles.weatherIconContainer}>
                  <Image source={{ uri: 'https:' + current?.condition?.icon }} style={styles.weatherIcon} />

                </View>
                {/* degrees */}
                <View style={styles.degreesContainer}>
                  <Text style={styles.degreesText}>{current?.temp_c}°</Text>
                  <Text style={styles.conditionText}>{translateDescription(current?.condition?.text)}</Text>
                  <Text style={styles.forecastdate1}>{location?.localtime.split(' ')[0]}</Text>
                  {/* other statistics */}
                  <View style={styles.statisticsContainer}>
                    <View style={styles.statItem}>
                      <Image source={require('./assets/wind.png')} style={styles.statIcon} />
                      <Text style={styles.statText}>{current?.wind_kph} km/h</Text>
                    </View>
                    <View style={styles.statItem}>
                      <Image source={require('./assets/droplet.png')} style={styles.statIcon} />
                      <Text style={styles.statText}>{current?.humidity} %</Text>
                    </View>
                    <View style={styles.statItem}>
                      <Image source={require('./assets/clock-hour-4.png')} style={styles.statIcon} />
                      {/* <Text style={styles.statText}>{location?.localtime.split(' ')[1]} hs</Text>*/}
                      <Text style={styles.statText}>{weather?.forecast?.forecastday[0]?.astro?.sunrise}</Text>

                    </View>
                  </View>

                </View>
                <View style={styles.forecastDaysContainer}>
                  <View style={styles.forecastHeader}>
                    <CalendarDaysIcon size={23} color='white' />
                    <Text style={styles.forecastHeaderText}>Clima por horas</Text>
                  </View>
                  <View style={styles.forecastCard}>
                    <ScrollView
                      horizontal
                      contentContainerStyle={styles.forecastScrollView}
                      showsHorizontalScrollIndicator={false}
                    >
                      {hourlyData.map((hourItem, index) => (
                        <View key={index} style={styles.forecastHourItem}>
                          <Text style={styles.forecastHourText}>{new Date(hourItem.time).getHours()}:00</Text>
                          <Image source={{ uri: 'https:' + hourItem?.condition?.icon }} style={styles.forecastHourIcon} />
                          <Text style={styles.forecastHourTemp}>{hourItem.temp_c}°C</Text>
                        </View>
                      ))}
                    </ScrollView>
                  </View>
                </View>
                {/* forecast for the next days */}
                <View style={styles.forecastDaysContainer2}>
                  <View style={styles.forecastHeader2}>
                    <CalendarDaysIcon size={23} color='white' />
                    <Text style={styles.forecastHeaderText2}>Días de la semana</Text>
                  </View>
                  <View style={styles.forecastCard2}>
                    <ScrollView

                      contentContainerStyle={styles.forecastScrollView2}
                      showsVerticalScrollIndicatorScrollIndicator={false}
                    >
                      {weather?.forecast?.forecastday?.map((item, index) => {
                        let date = new Date(item.date);
                        let options = { weekday: 'long' };
                        let dayName = date.toLocaleDateString('en-AR', options);
                        dayName = dayName.split(',')[0];
                        return (
                          <View key={index} style={styles.forecastDayItem}>
                            <Text style={styles.forecastDayName}>{dayName}</Text>
                            <Image source={{ uri: 'https:' + item?.day?.condition?.icon }} style={styles.forecastDayIcon} />
                            <Text style={styles.forecastDayTemp}>{item?.day?.avgtemp_c}°</Text>
                          </View>
                        );
                      })}
                    </ScrollView>
                  </View>

                </View>
                <Maps location={cityLocation} />
              </View>
            </ScrollView>
          </SafeAreaView>
        )
      }
    </View>
  );

}


 