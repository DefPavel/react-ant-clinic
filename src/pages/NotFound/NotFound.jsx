import React from 'react';
import { Button, Result } from 'antd';

function NotFound() {
  return (
    <Result
      status="404"
      title="404"
      subTitle="Страница не найдена."
      extra={
        <Button
          style={{ backgroundColor: '#0f7986' }}
          type="primary"
          onClick={() => {
            window.history.back(-1);
          }}
        >
          Вернутся
        </Button>
      }
    />
  );
}

export { NotFound };
