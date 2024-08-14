import React, { useState, useEffect } from "react";
import { View, TextInput, Button, StyleSheet,Alert  } from "react-native";
import axios from "axios";
import getApiInfo from "../api/apiSearch";


const Search = ({ handleSubmit }) => {
  const [text, setText] = useState("");

  const onChangeHandler = (text) => {
    setText(text);
  };

  const onSearchHandler = async () => {
    try {
      const data = await getApiInfo(text);
      handleSubmit(data.city); // Pasar el nombre de la ciudad como argumento
      setText(""); // Limpiar el campo de texto después de la búsqueda
    } catch (error) {
      console.log(error.message);
    }
  };
  
  
  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          onChangeText={onChangeHandler}
          value={text}
          placeholder="Escribe el nombre de tu ciudad"
        />
        <Button
          title="Buscar"
          onPress={onSearchHandler}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 10,
    marginTop: 20,
    alignItems: 'center',
    margin: 10,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  input: {
    flex: 1,
    height: 30,
    borderColor: 'white',
    borderWidth: 1,
    paddingLeft: 5,
    marginRight: 5,
    backgroundColor: 'white',
  },
  button: {
    backgroundColor: 'black',
  },
});

export default Search;
