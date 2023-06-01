import Footer from '@/components/Footer';
import {register} from '@/services/ant-design-pro/api';
import {
  LockOutlined,
  UserOutlined,
} from '@ant-design/icons';
import {
  LoginForm,
  ProFormText,
} from '@ant-design/pro-components';
import { message, Tabs } from 'antd';
import React, { useState } from 'react';
// @ts-ignore
import { history, useModel } from 'umi';
import styles from './index.less';
import {SYSTEM_LOGO} from '@/constants/index'
import {BLOG_HREF} from '@/constants/index'

const Register: React.FC = () => {
  const [type, setType] = useState<string>('account');

  //表单提交:
  const handleSubmit = async (values: API.RegisterParams) => {

    //变量:
    const {userAccount,userPassword,checkPassword,planetCode}=values;

    //校验:
    if (userPassword !== checkPassword){
        message.error('两次输入的密码不一致');
        return;//提交结束;
    }

    try {
      // 注册,返回用户的id； number类型
      const id = await register(values);

      if (id) {
        const defaultLoginSuccessMessage = '注册成功！';
        message.success(defaultLoginSuccessMessage);

        // await fetchUserInfo();*/
        /** 此方法会跳转到 redirect 参数所在的位置 */
        if (!history) return;
        const { query } = history.location;
        const { redirect } = query as {
          redirect: string;
        };
        //注册成功后 重定向:
        history.push("/user/login?redirect="+redirect);
        return;
      }
    } catch (error: any) {
      const defaultLoginFailureMessage = '注册失败，请重试！';
      message.error(error.message??defaultLoginFailureMessage);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <LoginForm
          submitter={
            {
              searchConfig:{
                submitText:'注册'
              }
            }
          }
          logo={<img alt="logo" src={SYSTEM_LOGO} />}
          title="路飞用户中心"
          subTitle={<a href={BLOG_HREF}>我的博客</a>}
          initialValues={{
            autoLogin: true,
          }}
          onFinish={async (values) => {
            await handleSubmit(values as API.RegisterParams);
          }}
        >
          <Tabs activeKey={type} onChange={setType}>
            <Tabs.TabPane key="account" tab={'账号密码注册'} />
          </Tabs>

          {type === 'account' && (
            <>
              <ProFormText
                name="userAccount"
                fieldProps={{
                  size: 'large',
                  prefix: <UserOutlined className={styles.prefixIcon} />,
                }}
                placeholder={'请输入账号'}
                rules={[
                  {
                    required: true,
                    message: '账号是必填项！',
                  },
                ]}
              />
              <ProFormText.Password
                name="userPassword"
                fieldProps={{
                  size: 'large',
                  prefix: <LockOutlined className={styles.prefixIcon} />,
                }}
                placeholder={'请输入密码'}
                rules={[
                  {
                    required: true,
                    message: '密码是必填项！',
                  },
                  //设置密码的最大长度：
                  {
                    min: 8,
                    type:'string',
                    message: '密码长度不能小于8',
                  },
                ]}
              />
              <ProFormText.Password
                name="checkPassword"
                fieldProps={{
                  size: 'large',
                  prefix: <LockOutlined className={styles.prefixIcon} />,
                }}
                placeholder={'请再次确认密码'}
                rules={[
                  {
                    required: true,
                    message: '确认密码是必填项！',
                  },
                  //设置密码的最大长度：
                  {
                    min: 8,
                    type:'string',
                    message: '密码长度不能小于8',
                  },
                ]}
              />
              <ProFormText
                name="planetCode"
                fieldProps={{
                  size: 'large',
                  prefix: <UserOutlined className={styles.prefixIcon} />,
                }}
                placeholder={'请输入星球编号'}
                rules={[
                  {
                    required: true,
                    message: '星球编号是必填项！',
                  },
                ]}
              />
            </>
          )}

          <div
            style={{
              marginBottom: 24,
            }}
          >

          </div>
        </LoginForm>
      </div>
      <Footer />
    </div>
  );
};
export default Register;
