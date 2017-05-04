import styled from 'styled-components/native';
import datePickerFactory from 'react-toolbox-core/lib/components/DatePicker/DatePicker';
import RangePicker from './Pickers/RangePicker';
import Month from './Month';

const DatePicker = datePickerFactory({
  NextNode: Empty,
  PickerWrapper: styled.View`
    flex: 1;
  `,
  PrevNode: Empty,
  RangePicker,
  Month,
});

function Empty() {
  return null;
};

export default DatePicker;
