import { Dimensions, View } from 'react-native';
import React, { PureComponent } from 'react';
import styled, { css } from 'styled-components/native';
import dayFactory from 'react-toolbox-core/lib/components/DatePicker/Day';
import getSelectionMatch from 'react-toolbox-core/lib/components/DatePicker/getSelectionMatch';
import isSameDay from 'date-fns/is_same_day';

/**
 * We need this component to track when the node is pressed because it should change its
 * styles to a light background and so the text color. Since they are different nodes
 * (one is a touchable surface and the other one a text), they have to share state to
 * react with style changes.
 */
class DayNode extends PureComponent {
  state = { 
    pressed: false,
  };

  handlePress = (event) => {
    this.props.onPress(this.props.day, event);
  };

  handleHideUnderlay = () => {
    this.setState({ pressed: false });
  };

  handleShowUnderlay = () => {
    this.setState({ pressed: true });
  };

  render() {
    const { pressed } = this.state;
    const { children, onPress: _onPress, monthWidth, ...rest } = this.props;
    const dayWidthNoRound = Math.floor(monthWidth / 7);
    const dayWidth = dayWidthNoRound % 2 === 0 ? dayWidthNoRound : dayWidthNoRound - 1;
    const borderRadius = dayWidth / 2;

    return (
      <DayNodeWrapper 
        {...rest} 
        borderRadius={borderRadius}
        pressed={pressed}
        width={dayWidth}
      >
        {!rest.outOfMonth && (
          <TouchableDayNode
            borderRadius={borderRadius}
            onHideUnderlay={this.handleHideUnderlay}
            onPress={!rest.disabled ? this.handlePress : null}
            onShowUnderlay={this.handleShowUnderlay}
            underlayColor="#348c91"
          >
            <View aspectRatio={1} style={{ alignItems: 'center', justifyContent: 'center' }}>  
              <DayNodeText {...rest} pressed={pressed}>
                {children}
              </DayNodeText>
            </View>
          </TouchableDayNode>
        )}
      </DayNodeWrapper>
    );
  }
}

const DayNodeWrapper = styled.View`
  border-bottom-left-radius: ${props => props.borderRadius};
  border-bottom-right-radius: ${props => props.borderRadius};
  border-top-left-radius: ${props => props.borderRadius};
  border-top-right-radius: ${props => props.borderRadius};
  height: ${props => props.width};
  width: ${props => props.width};
  ${getTodayStyles}
  ${getInRangeStyles}
  ${getSelectedStyles}
`;

function getTodayStyles(props) {
  if (props.today && !props.selected && !props.pressed) {
    return css`
      border-bottom-left-radius: ${props.borderRadius};
      border-bottom-right-radius: ${props.borderRadius};
      border-color: #76adb2;
      border-top-left-radius: ${props.borderRadius};
      border-top-right-radius: ${props.borderRadius};
      border-width: 1;
    `;
  }
}

function getInRangeStyles(props) {
  if (props.inRange) {
    return css`
      background-color: white;
      border-bottom-left-radius: 0;
      border-bottom-right-radius: 0;
      border-top-left-radius: 0;
      border-top-right-radius: 0;
    `;
  }
}

function getSelectedStyles(props) {
  const { selection: { from, to }, selected, outOfMonth, selectedSource } = props;
  const selectedSameDayRange = from && to && isSameDay(from, to);
  const isRangeAndNotSameDay = from && to && !selectedSameDayRange;
  const isSelectedAsFrom = selectedSource === 'from';
  const isSelectedAsTo = selectedSource === 'to';

  if (selected && !outOfMonth) {
    return css`
      background-color: white;
      border-top-right-radius: ${(isSelectedAsFrom && isRangeAndNotSameDay) ? 0 : props.borderRadius};
      border-bottom-right-radius: ${(isSelectedAsFrom && isRangeAndNotSameDay) ? 0 : props.borderRadius};
      border-top-left-radius: ${(isSelectedAsTo && isRangeAndNotSameDay) ? 0 : props.borderRadius};
      border-bottom-left-radius: ${(isSelectedAsTo && isRangeAndNotSameDay) ? 0 : props.borderRadius};
    `;
  }
}

const TouchableDayNode = styled.TouchableHighlight`
  border-bottom-left-radius: ${props => props.borderRadius};
  border-bottom-right-radius: ${props => props.borderRadius};
  border-top-left-radius: ${props => props.borderRadius};
  border-top-right-radius: ${props => props.borderRadius};
`;

const DayNodeText = styled.Text`
  color: ${getTextColor};
  font-weight: ${props => (props.disabled ? 400 : 600)};
  opacity: ${props => (props.disabled ? 0.7 : 1)};
  text-align: center;
`;

function getTextColor(props) {
  const { pressed, selected, inRange } = props;
  if (pressed) return 'white';
  if (selected || inRange) return '#19a598';
  return 'white';
}

/**
 * Original RTDay. We are passing through the current selection and dat to allow to figure 
 * out if a selected day has to be painted with all rounded borders or just two of them 
 * and also the monthWidth to calculate the size of each Day.
 */
const RTDay = dayFactory({
  passthrough: props => ({
    day: props.day,
    monthWidth: props.monthWidth,
    selection: props.selected || {},
  }),
  DayNode,
});

/**
 * We have to override this because there is a state not included in the original component.
 * It can happen that a day is selected as start range (rounded) with end range. Then when you 
 * select the end range. You want styles to update but technically the state of the component
 * is the same so for performance reasons it is originally not re-rendered.
 */
export default class Day extends RTDay {
  shouldComponentUpdate(nextProps) {
    const { day, selected, viewDate } = this.props;
    const { day: nextDay, selected: nextSelected, viewDate: nextViewDate } = nextProps;
    const selectionMatch = getSelectionMatch(day, selected, viewDate)
    const nextSelectionMatch = getSelectionMatch(nextDay, nextSelected, nextViewDate);
    if (selectionMatch.selected && nextSelectionMatch.selected) {
      return true;
    }

    return super.shouldComponentUpdate(nextProps);
  }
}
