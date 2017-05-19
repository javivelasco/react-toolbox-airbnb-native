import React from 'react';
import styled from 'styled-components/native';
import DateView from './DateView';
import Separator from './Separator';

const Heading = ({ from, to }) => (
  <HeadingLayout>
    <DateView start date={from} />
    <Separator color="#348c91" size={40} />
    <DateView date={to} />
  </HeadingLayout>
);

const HeadingLayout = styled.View`
  align-items: center;
  flex-direction: row;
  padding: 15 20;
`;

export default Heading;
