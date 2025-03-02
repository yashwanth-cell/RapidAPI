import React, { useState } from 'react';
import { View, TextInput, Button, Text, StyleSheet } from 'react-native';
import axios from 'axios';

export default function App() {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [startLocation, setStartLocation] = useState('');
  const [endLocation, setEndLocation] = useState('');
  const [message, setMessage] = useState('');

  // Handle user registration
  const registerUser = async () => {
    try {
      const response = await axios.post('http://localhost:5000/register', {
        name,
        phone,
        email,
      });
      setMessage(response.data.message);
    } catch (error) {
      setMessage('Error registering user');
    }
  };

  // Handle booking a ride
  const bookRide = async () => {
    try {
      const response = await axios.post('http://localhost:5000/book-ride', {
        userId: 1, // Here we can use an actual userId
        startLocation,
        endLocation,
      });
      setMessage(response.data.message);
    } catch (error) {
      setMessage('Error booking ride');
    }
  };

  return (
    <View style={styles.container}>
      <Text>User Registration</Text>
      <TextInput
        style={styles.input}
        placeholder="Name"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={styles.input}
        placeholder="Phone"
        value={phone}
        onChangeText={setPhone}
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
      />
      <Button title="Register" onPress={registerUser} />

      <Text>Book Ride</Text>
      <TextInput
        style={styles.input}
        placeholder="Start Location"
        value={startLocation}
        onChangeText={setStartLocation}
      />
      <TextInput
        style={styles.input}
        placeholder="End Location"
        value={endLocation}
        onChangeText={setEndLocation}
      />
      <Button title="Book Ride" onPress={bookRide} />

      <Text>{message}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingLeft: 8,
  },
});
