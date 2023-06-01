// import { HeartTwoTone, SmileTwoTone } from '@ant-design/icons';
import { PageHeaderWrapper } from '@ant-design/pro-components';
import React from 'react';
const Admin: React.FC = (pros) => {
  const {children}=pros
  return (
    <PageHeaderWrapper>
      {children}
    </PageHeaderWrapper>
  );
};
export default Admin;
