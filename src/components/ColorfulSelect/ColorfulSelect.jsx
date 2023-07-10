import React, { useState, useEffect } from 'react';
import { Select, Tag } from 'antd';
import { useDispatch } from 'react-redux';
import { UpdateChecked } from '../../store/actions/users.action';
import { getAllShedule, GetDoctors } from '../../store/actions/shedule.action';

function ColorfulSelect({ options = [] }) {
  const dispatch = useDispatch();
  const [current, setCurrent] = useState([]);

  useEffect(() => {
    setCurrent(options.filter((el) => el.checked).map((el) => el.value));
  }, [options]);

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

  const onSelect = async (id) => {
    await dispatch(UpdateChecked({ id, status: true }));
    await dispatch(getAllShedule());
    await dispatch(GetDoctors());
    setCurrent([...current, id]);
  };

  const onDeselect = async (id) => {
    await dispatch(UpdateChecked({ id, status: false }));
    await dispatch(getAllShedule());
    await dispatch(GetDoctors());
    setCurrent(current.filter((el) => el !== id));
  };

  console.log(options);

  return (
    <Select
      mode="multiple"
      showArrow
      tagRender={tagRender}
      style={{
        width: '200px',
        marginBottom: '6px',
      }}
      value={current}
      onDeselect={(e) => onDeselect(e)}
      onSelect={(e) => onSelect(e)}
      options={options}
    />
  );
}

export { ColorfulSelect };
