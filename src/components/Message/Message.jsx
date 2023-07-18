import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Table, Space, Row, Button, Typography } from 'antd';
import { getAllMessage, deleteMessage } from '../../store/actions/message.action';
import { SecretRolesMiddleware } from '../../middlewares/privates.middleware';
import { MessageForm } from './MessageForm';

function Message() {
  const dispatch = useDispatch();
  const messageData = useSelector((store) => store.messageReducer?.users);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    // выдать все соощбения
    dispatch(getAllMessage());
  }, []);
  const columns = [
    {
      width: 10,
      title: 'Сообщение',
      dataIndex: 'name',
      key: 'name',
      sorter: (a, b) => a.name.length - b.name.length,
    },
    {
      width: 10,
      title: 'Дата',
      dataIndex: 'date_crt',
      key: 'date_crt',
      sorter: (a, b) => a.date_crt.length - b.date_crt.length,
    },
    {
      title: 'Действия',
      dataIndex: 'key',
      key: 'key',
      width: 10,
      render: (id) => (
        <Space size="middle">
          <Button
            onClick={async () => {
              await dispatch(deleteMessage(id));
              await dispatch(getAllMessage());
            }}
          >
            Удалить
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <SecretRolesMiddleware>
      <Typography.Title level={2}>Сообщения</Typography.Title>
      <div style={{ padding: 24, minHeight: 360, background: '#ffffff' }}>
        <Row style={{ marginBottom: '1rem', justifyContent: 'end' }}>
          <Button
            style={{ backgroundColor: '#0f7986' }}
            type="primary"
            onClick={() => setIsModalOpen(true)}
          >
            Создать
          </Button>
        </Row>
        <Table size="sm" dataSource={messageData} columns={columns} scroll={{ x: 900 }} />
        <MessageForm isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />
      </div>
    </SecretRolesMiddleware>
  );
}

export { Message };
