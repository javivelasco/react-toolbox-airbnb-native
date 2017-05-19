import React, { Component } from 'react';
import { TouchableWithoutFeedback } from 'react-native';
import styled from 'styled-components/native';
import withRipple from '../withRipple';

class Clear extends Component {
  render() {
    const { children, onPress, ...rest } = this.props;
    return (
      <TouchableWithoutFeedback onPress={onPress}>
        <ClearNode {...rest}>
          <ClearText>Clear</ClearText>
          {children}
        </ClearNode>
      </TouchableWithoutFeedback>
    )
  }
}

const ClearNode = styled.View`
  align-items: center;
  align-self: flex-end;
  border-color: #348c91;
  border-radius: 3;
  border-width: 1;
  justify-content: center;
  margin-right: 15;
  margin-top: 10;
  padding: 0 10;
`

const ClearText = styled.Text`
  align-self: flex-end;
  color: white;
  font-size: 12;
  line-height: 20;
`;

export default withRipple()(Clear);
