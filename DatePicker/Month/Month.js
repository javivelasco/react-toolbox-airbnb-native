import monthFactory from 'react-toolbox-core/lib/components/DatePicker/Month';
import React, { Component } from 'react';
import styled from 'styled-components/native';
import { FlatList } from 'react-native';
import { addMonths } from 'date-fns';
import { range } from 'ramda';
import Day from './Day';

/**
 * Instead of exposing a Month component that receives a viewDate and displays a single month,
 * We building a wrapper component that renders a list of months from the given view date and
 * exposing it instead of a simple month. Also this component has to be measured and virtually
 * rendered for performance reasons.
 */
class MonthsList extends Component {
  componentWillReceiveProps(nextProps) {
    if (nextProps.viewDate.getTime() !== this.props.viewDate.getTime()) {
      this.setState({ data: getData(nextProps.viewDate) });
    }
  }

  state = {
    data: getData(this.props.viewDate),
    width: 0,
  };

  keyExtractor = (item, index) => (
    item.getTime().toString()
  );

  handleLayoutReady = (event) => {
    this.setState({
      width: event.nativeEvent.layout.width,
    });
  };

  renderMonth = ({ item }) => {
    const { highlighted, onDayClick, selected, ...rest } = this.props;
    const { width } = this.state;
    
    return (
      <Month
        {...rest}
        highlighted={highlighted}
        onDayClick={onDayClick}
        selected={selected}
        viewDate={item}
        width={width}
      />
    );
  };

  render() {
    const { data, width } = this.state;
    return (
      <ListWrapper onLayout={this.handleLayoutReady}>
        {width !== 0 && <FlatList
          data={data}
          initialNumToRender={4}
          keyExtractor={this.keyExtractor}
          maxToRenderPerBatch={6}
          onViewableItemsChanged={this.viewableChanged}
          renderItem={this.renderMonth}
          showsVerticalScrollIndicator={false}
          style={{ flex: 1 }}
          windowSize={4}
        />}
      </ListWrapper>
    );
  }
}

const ListWrapper = styled.View`
  align-items: center;
  flex: 1;
`;

/**
 * We use the RT factory component to generate a Month with the appropriated
 * styles. We are passing through the monthWidth because Days need the size to
 * paint a border and also onPress should be bound to onDayClick original handler.
 */
const Month = monthFactory({
  passthrough: (props, nodeName, instance) => {
    if (nodeName === 'Day') {
      return {
        monthWidth: props.width,
        onPress: function handleOnDayPress(...args) {
          props.onDayClick(...args)
        }
      }
    }
    return {};
  },
  Weekday: Empty,
  WeekdaysWrapper: Empty,
  MonthWrapper: styled.View`
    align-self: center;
    flex-direction: column;
    width: 100%;
  `,
  MonthTitle: styled.Text`
    align-items: center;
    color: white;
    font-size: 18;
    justify-content: center;
    line-height: 46;
    margin-left: 15;
  `,
  DaysWrapper: styled.View`
    flex-direction: column;
  `,
  DaysWeek: styled.View`
    align-items: center;
    flex-direction: row;
    flex-grow: 1;
    margin: 2 0;
  `,
  Day,
});

function getData(viewDate) {
  return range(0, 24).map(index => (
    addMonths(viewDate, index)
  ));
}

function Empty() {
  return null;
}

export default MonthsList;
