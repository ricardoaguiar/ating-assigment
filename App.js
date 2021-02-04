import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Button,
  TouchableOpacity,
  Keyboard,
  TouchableWithoutFeedback,
} from 'react-native';
import { TextInput } from 'react-native-gesture-handler';

TouchableOpacity.defaultProps = { activeOpacity: 0.8 };

const DismissKeyboard = ({ children }) => (
  <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
    {children}
  </TouchableWithoutFeedback>
);

const randomArray = (length, max) =>
  [...new Array(length)].map(() => Math.round(Math.random() * max));

// previously set at 28, reduced to 16 to avoid off screen push on android simulator (a bit of a cheap solution).
const randomNumbers = Array.from(randomArray(16, 1000));

// reveal the numbers on the console to find the right numbers and display them on the screen.
console.log(randomNumbers);

const GuessButton = ({ onPress, title }) => (
  <TouchableOpacity onPress={onPress} style={styles.guessButtonContainer}>
    <Text style={styles.guessButtonTitle}>{title}</Text>
  </TouchableOpacity>
);

export default function App() {
  const [guess, setGuess] = useState('');
  const [guesses, setGuesses] = useState([]);

  const handleChange = (text) => {
    setGuess(text);
  };

  //thanks to Bence for the next two functions
  const addGuess = (guess) => {
    setGuesses([...guesses, Number(guess)]);
  };
  const previousGuess = (number) => guesses.includes(number);
  //

  const hiddenNumber = <Text style={styles.hideNumber}>?</Text>;

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.inputBox}
          value={guess}
          onChangeText={(text) => handleChange(text)}
          keyboardType={'number-pad'}
        />
        {/* old button */}
        {/* <Button
          style={styles.guessButton}
          title={'GUESS THE NUMBER'}
          onPress={() => {
            if (guess !== '') {
              addGuess(guess);
              setGuess('');
            }
          }}
        /> */}

        <GuessButton
          title={'GUESS THE NUMBER'}
          onPress={() => {
            if (guess !== '') {
              addGuess(guess);
              setGuess('');
            }
          }}
        />
      </View>

      <DismissKeyboard>
        {/* tried to implement  a flatlist below but didn't quite get it right, so kept it as a view component. */}
        <View style={styles.listContainer}>
          {randomNumbers.map((number, index) => (
            <View
              key={index}
              style={
                previousGuess(number) ? styles.numbersList : styles.hiddenList
              }
            >
              <Text
                style={
                  previousGuess(number) ? styles.showNumber : styles.hideNumber
                }
              >
                {previousGuess(number) ? number : hiddenNumber}
              </Text>
            </View>
          ))}
          <StatusBar style="auto" />
        </View>
      </DismissKeyboard>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 40,
    backgroundColor: '#9400FF55',
  },
  inputBox: {
    borderColor: '#fff',
    backgroundColor: '#f0d667',
    borderWidth: 4,
    width: '90%',
    marginBottom: 10,
    borderRadius: 50,
    paddingLeft: 10,
    paddingTop: 5,
    paddingBottom: 5,
    fontSize: 20,
    fontWeight: '800',
    color: '#4b42ff',
  },
  showNumber: {
    fontWeight: '800',
    fontSize: 20,
    color: '#f0d667',
  },
  hideNumber: {
    color: '#4b42ff',
    fontWeight: '900',
    fontSize: 30,
  },
  numbersList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 0,
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
    borderColor: 'black',
    borderRadius: 50,
    borderWidth: 4,
    borderColor: '#fff',
    width: 70,
    height: 70,
    margin: 6,
    backgroundColor: '#4b42ff',
  },
  hiddenList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 0,
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
    borderColor: 'black',
    borderRadius: 50,
    borderWidth: 4,
    borderColor: '#fff',
    width: 70,
    height: 70,
    margin: 8,
    backgroundColor: '#f0d667',
  },
  listContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignContent: 'center',
    padding: 0,
  },
  searchContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignContent: 'center',
  },
  guessButton: {
    backgroundColor: '#fff',
    borderWidth: 1,
  },
  guessButtonContainer: {
    borderRadius: 50,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginTop: 5,
    marginBottom: 20,
    backgroundColor: '#4b42ff',
    borderColor: '#fff',
    borderWidth: 4,
    elevation: 6,
  },
  guessButtonTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: '#f0d667',
  },
});
