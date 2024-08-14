import axios from "axios";

const API_KEY_SEARCH = process.env.EXPO_PUBLIC_API_KEY_SEARCH;

const getApiInfo = async (city) => {
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city || 'Junin'}&appid=${API_KEY_SEARCH}`
      );
      const data = response.data;
      return data;
    } catch (error) {
      alert("No se encontró la ciudad que buscas");
    }
  };

export default getApiInfo;