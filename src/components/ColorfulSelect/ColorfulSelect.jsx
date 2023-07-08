import React from 'react';
import { Select, Tag } from 'antd';

const tagRender = (props) => {
  const { label, value, closable, onClose } = props;
  const onPreventMouseDown = (event) => {
    event.preventDefault();
    event.stopPropagation();
  };
  return (
    <Tag
      color={value.color}
      onMouseDown={onPreventMouseDown}
      closable={closable}
      onClose={onClose}
      style={{
        marginRight: 3,
      }}
    >
      {label}
    </Tag>
  );
};

function ColorfulSelect({ options }) {
  return (
    <Select
      mode="multiple"
      showArrow
      tagRender={tagRender}
      style={{
        width: '200px',
        marginBottom: '6px',
      }}
      onChange={(e) => console.log(e)}
      options={options}
    />
  );
}

export { ColorfulSelect };
