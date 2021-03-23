import React from 'react';

const usePrevious = <ValueType>(value: ValueType): ValueType | undefined => {
  const ref = React.useRef<ValueType>();

  React.useEffect(() => {
    ref.current = value;
  }, [value]);

  return ref.current;
};

export default usePrevious;
