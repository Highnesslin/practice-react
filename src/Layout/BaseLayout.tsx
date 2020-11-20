import React, { Suspense } from 'react';
import { NavLink, RouteChildrenProps } from 'react-router-dom';
import { Layout, PageHeader, Typography, Menu, Row, Col } from 'antd';
import { children } from '@/routes/routes.config';

import styles from './BaseLayout.module.css';

const { Title } = Typography;

interface ILayoutProps {
  children: JSX.Element;
}

export default function BaseLayout(props: ILayoutProps & RouteChildrenProps) {
  return (
    <Layout className={styles['baselayout']}>
      <Row className={styles['header']}>
        <Col span={4}>
          <Title level={3} className={styles['title']}>
            React
          </Title>
        </Col>
        <Col span={20}>
          <Menu theme="light" mode="horizontal" defaultSelectedKeys={['2']}>
            <Menu.Item key="1">nav 1</Menu.Item>
            <Menu.Item key="2">nav 2</Menu.Item>
            <Menu.Item key="3">nav 3</Menu.Item>
          </Menu>
        </Col>
      </Row>
      <Row className={styles['body']}>
        <Col span={4}>
          {/* @ts-ignore */}
          <Nav children={children} />
        </Col>
        <Col span={20} className={styles['content']}>
          <PageHeader
            className={styles['page-back']}
            onBack={() => {
              props.history.goBack();
            }}
            title={props.location.pathname}
            subTitle="我也不知道说点什么，就劝年轻人耗子尾汁吧"
          />
          <Suspense fallback={<div>loading...</div>}>{props.children}</Suspense>
        </Col>
      </Row>
    </Layout>
  );
}

type NavProps = {
  children: {
    name?: string;
    path: string;
    redirect?: string;
    component?: React.LazyExoticComponent<() => JSX.Element>;
    children?: NavProps['children'];
  }[];
};

const Nav = ({ children }: NavProps) => {
  return (
    <Menu theme="light" mode="inline">
      {children?.map((item, index) => {
        return (
          <Menu.Item key={index}>
            <NavLink to={item.path}>{item.name}</NavLink>
          </Menu.Item>
        );
      })}
    </Menu>
  );
};
