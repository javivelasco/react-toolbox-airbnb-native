import withRippleFactory from 'react-toolbox-core/lib/hoc/withRipple/withRipple';
import RippleWrapper from './RippleWrapper';
import RippleNode from './RippleNode';

const withRipple = withRippleFactory({
  passthrough: (props, nodeName) => {
    switch (nodeName) {
      case 'RippleNode':
        return { color: props.rippleColor };
      default:
        return {};
    }
  },
  RippleWrapper,
  RippleNode,
});

export default withRipple;
