import React, { Component } from 'react';
import { isBefore, isToday } from 'date-fns';
import styled from 'styled-components/native';
import DatePicker from '../DatePicker';
import Clear from './Clear';

const initialState = {
  focusedInput: null,
  value: { from: null, to: null },
};

export default class TestDatePicker extends Component {
  state = initialState;

  handleChange = (value) => {
    this.setState({ value });
  };

  isDayDisabled = (date) => (
    isBefore(date, Date.now()) && !isToday(date)
  );

  handleFocusedInputChange = (focusedInput) => {
    this.setState({ focusedInput });
  };

  handleClearPress = () => {
    this.setState(initialState);
  }

  render() {
    return (
      <Wrapper>
        <Clear onPress={this.handleClearPress} rippleColor="white" />
        <DatePicker
          focusedInput={this.state.focusedInput}
          isDayDisabled={this.isDayDisabled}
          numberOfMonths={1}
          onChange={this.handleChange}
          onFocusedInputChange={this.handleFocusedInputChange}
          resetToWhenFromChanges
          selected={this.state.value}
          viewDate={new Date()}
        />
      </Wrapper>
    );
  }
}

const Wrapper = styled.View`
  flex: 1
`;
