import React from 'react';
import styled from 'styled-components/native';
import { StatusBar } from 'react-native';
import Demo from './Demo';

export default class App extends React.Component {
  render() {
    return (
      <AppWrapper>
        <StatusBar barStyle="light-content" />
        <Demo />  
      </AppWrapper>
    );
  }
}

const AppWrapper = styled.View`
  background-color: #0b666e;
  flex-direction: column;
  flex: 1;
  padding-top: 20;
`;
