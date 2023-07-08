import React from 'react';
import { Select, Tag } from 'antd';

function ColorfulSelect({ options = [] }) {
  const tagRender = (props) => {
    const { label, value, closable, onClose } = props;
    const onPreventMouseDown = (event) => {
      event.preventDefault();
      event.stopPropagation();
    };

    const findColor = (id) => options.find((el) => el.value === id).color;
    return (
      <Tag
        color={findColor(value)}
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
