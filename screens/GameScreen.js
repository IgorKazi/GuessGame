import React, { useState, useRef, useEffect } from 'react'

import { View, Text, StyleSheet, Button, Alert } from 'react-native'

import NumberContainer from '../components/NumberContainer'

import Card from '../components/Card'

const generateRandomBetween = (min, max, exclude, choice) => {
  min = Math.ceil(min)
  max = Math.floor(max)
  const rndNum = Math.floor(Math.random() * (max - min)) + min
  if (rndNum === choice) return rndNum
  if (rndNum === exclude) {
    return generateRandomBetween(min, max, exclude)
  } else {
    return rndNum
  }
}

const GameScreen = props => {
  const [currentGuess, setCurrentGuess] = useState(
    generateRandomBetween(1, 100, props.userChoice)
  )

  const [rounds, setRounds] = useState(0)
  const currentLow = useRef(1)
  const currentHight = useRef(100)
  const { userChoice, onGameOver } = props

  useEffect(
    () => {
      if (currentGuess === props.userChoice) {
        onGameOver(rounds)
      }
    },
    [currentGuess, userChoice, onGameOver]
  )
  const nextGusessHandler = direction => {
    if (
      (direction === 'lower' && currentGuess < props.userChoice) ||
      (direction === 'greater' && currentGuess > props.userChoice)
    ) {
      Alert.alert("Don't lie!", 'You know that this si wrong...', [
        { text: 'Sorry!', style: 'cancel' }
      ])
      return
    }
    if (direction === 'lower') {
      currentHight.current = currentGuess
    } else {
      currentLow.current = currentGuess
    }
    const nextNumber = generateRandomBetween(
      currentLow.current,
      currentHight.current,
      currentGuess,
      props.userChoice
    )
    setCurrentGuess(nextNumber)
    setRounds(curRounds => curRounds + 1)
  }
  return (
    <View style={styles.screen}>
      <Text>Opponent's Guess</Text>
      <NumberContainer>{currentGuess}</NumberContainer>
      <Card style={styles.buttonContaioner}>
        <Button title='LOWER' onPress={nextGusessHandler.bind(this, 'lower')} />
        <Button
          title='GREATER'
          onPress={nextGusessHandler.bind(this, 'greater')}
        />
      </Card>
    </View>
  )
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 10,
    alignItems: 'center'
  },
  buttonContaioner: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
    width: 300,
    maxWidth: '80%'
  }
})

export default GameScreen
