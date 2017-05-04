import React, { Component } from 'react';
import styled from 'styled-components/native';
import {
  AppRegistry,
  StyleSheet,
  StatusBar,
  Text,
  Modal,
  ScrollView,
  ListView,
  TouchableHighlight,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import isBefore from 'date-fns/is_before';
import isToday from 'date-fns/is_today';
import DatePicker, { Heading, Month } from './DatePicker';

export default class App extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>Open up App.js to start working on your app!</Text>
        <Text>Biennn!</Text>
        <TestDatePicker />
      </View>
    );
  }
}

class TestDatePicker extends Component {
  state = {
    focusedInput: null,
    value: { from: null, to: null },
  };

  setModalVisible(visible) {
    this.setState({modalVisible: visible});
  }

  handleChange = (value) => {
    this.setState({ value });
  };

  isDayBlocked = date => (
    date.getMonth() === 1
      && date.getDate() === 17
  );

  isDayDisabled = (date) => {
    return isBefore(date, Date.now()) &&
      !isToday(date);
  }

  handleFocusedInputChange = (focusedInput) => {
    this.setState({ focusedInput });
  };

  render() {
    return (
      <View style={{marginTop: 22}}>
        <Modal
          animationType={"slide"}
          transparent={false}
          visible={this.state.modalVisible}
          onRequestClose={() => {alert("Modal has been closed.")}}
          >
         <View style={{backgroundColor: '#0b666e', flexDirection: 'column', flex: 1, paddingTop: 30}}>
            <StatusBar barStyle="light-content" />
            <Icon name="close" size={26} color="#FFF" />
            <View style={{ flex: 1 }}>
              <DatePicker
                focusedInput={this.state.focusedInput}
                isDayBlocked={this.isDayBlocked}
                isDayDisabled={this.isDayDisabled}
                numberOfMonths={1}
                onChange={this.handleChange}
                onFocusedInputChange={this.handleFocusedInputChange}
                selected={this.state.value}
                viewDate={new Date()}
              />
            </View>
         </View>
        </Modal>

        <TouchableHighlight onPress={() => {
          this.setModalVisible(true)
        }}>
          <Text>Show Modal</Text>
        </TouchableHighlight>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
