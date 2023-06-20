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
