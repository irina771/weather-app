import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
        container: {
          flex: 1,
          position: 'relative',
        },
        backgroundImage: {
          position: 'absolute',
          width: '100%',
          height: '100%',
        },
        loaderContainer: {
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
        },
        safeAreaView: {
          flex: 1,
        },
        searchContainer: {
          marginTop: 30,
          height: '7%',
          marginHorizontal: 16,
          position: 'relative',
          zIndex: 50,
        },
        searchBox: {
          flexDirection: 'row',
          justifyContent: 'flex-end',
          alignItems: 'center',
          borderRadius: 50,
        },
        textInput: {
          paddingLeft: 24,
          height: 40,
          flex: 1,
          fontSize: 16,
          color: 'white',
        },
        searchResultsContainer: {
          position: 'absolute',
          width: '100%',
          backgroundColor: 'rgba(128, 128, 128, 0.6)',
          top: 60,
          borderRadius: 20,
          zIndex: 100,
        },
        searchResultItem: {
          flexDirection: 'row',
          alignItems: 'center',
          padding: 10,
          borderBottomWidth: 1,
          borderBottomColor: 'lightgray',
        },
        searchResultText: {
          color: 'black',
          fontSize: 16,
          marginLeft: 10,
        },
        forecastContainer: {
          marginHorizontal: 16,
        },
        locationText: {
          textAlign: 'center',
          
          color: 'white',
          fontSize: 30,
          fontWeight: 'bold',
        },
        countryText: {
          color: 'white',
          fontSize: 20,
          fontWeight: 'bold',
        },
        weatherIconContainer: {
          justifyContent: 'center',
          alignItems: 'center',
        },
        weatherIcon: {
          width: 120,
          height: 120,
          marginTop: 40,
        },
        degreesContainer: {
          alignItems: 'center',
        },
        degreesText: {
          textAlign: 'center',
          color: 'white',
          fontSize: 40,
          fontWeight: 'bold',
          marginLeft: 5,
      
        },
        conditionText: {
          textAlign: 'center',
          color: 'white',
          fontSize: 20,
          fontWeight: 'bold',
          marginTop: 10,
        },
        statisticsContainer: {
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginTop: 20,
        },
        statItem: {
          flexDirection: 'row',
          alignItems: 'center',
          marginRight: 15,
        },
        statIcon: {
          width: 20,
          height: 20,
          marginRight: 5,
        },
        statText: {
          color: 'white',
          fontSize: 16,
          fontWeight: 'bold',
        },
        forecastDaysContainer2: {
      
          marginTop: 50,
        },
        forecastHeader2: {
      
          flexDirection: 'row',
          alignItems: 'center',
        },
        forecastHeaderText2: {
          color: 'white',
      
          fontSize: 18,
          marginLeft: 5,
        },
        forecastCard2: {
          backgroundColor: 'rgba(173, 220, 260, 0.5)', // Celeste claro con transparencia
          marginTop: 20,
          borderRadius: 10,
          padding: 5,
          paddingBottom: 20,
          borderBottomLeftRadius: 0, // Sin redondeado en la esquina inferior izquierda
          borderBottomRightRadius: 0,
          overflow: 'hidden', // Evitar que el contenido se salga de los límites del contenedor
        },
        forecastScrollView: {
          flexDirection: 'column',
      
        },
        forecastDayItem: {
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingVertical: 10,
          paddingHorizontal: 20,
          borderBottomWidth: 1,
          borderBottomColor: '#fff',
        },
        forecastDayIcon: {
          width: 50,
          height: 50,
          justifyContent: 'center',
          alignItems: 'center',
        },
        forecastdate1: {
          color: 'white',
          fontSize: 15,
          marginTop: 15,
        },
        forecastdate: {
      
          color: 'white',
          fontSize: 15,
          marginTop: 5,
        },
        forecastDayName: {
          color: 'white',
          textAlign: 'left',
          fontWeight: 'bold',
          fontSize: 20,
          flex: 1,
          marginTop: 5,
          marginRight: 10,
      
        },
        forecastDayTemp: {
          color: 'white',
          textAlign: 'right',
          fontSize: 18,
          fontWeight: 'bold',
          marginTop: 5,
          flex: 1,
        },
        forecastDaysContainer: {
          marginTop: 50,
          
        },
        forecastHeader: {
          
          flexDirection: 'row',
          alignItems: 'center',
          marginBottom: 20,
        },
        forecastHeaderText: {
          color: 'white',
          fontSize: 18,
          marginLeft: 10,
          fontWeight: 'bold',
        },
        forecastCard: {
          backgroundColor: 'rgba(173, 220, 260, 0.5)',
          borderRadius: 10,
          padding: 10,
          overflow: 'hidden',
          
        },
        forecastScrollView: {
          flexDirection: 'row',
        },
        forecastHourItem: {
          width: 80, // Ancho fijo para cada "card"
          alignItems: 'center',
          justifyContent: 'center',
          marginRight: 10, // Espacio entre los "cards"
          padding: 5,
          borderWidth: 1,
          borderColor: 'rgba(255, 255, 255, 0.3)',
          borderRadius: 15,
        },
        forecastHourText: {
          color: 'white',
          fontSize: 14,
          marginBottom: 5,
        },
        forecastHourIcon: {
          width: 50,
          height: 50,
          resizeMode: 'contain',
          marginBottom: 5,
        },
        forecastHourTemp: {
          color: 'white',
          fontSize: 16,
          fontWeight: 'bold',
        },
      });