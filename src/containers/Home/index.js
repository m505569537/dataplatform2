import React, { useState, useEffect } from 'react'
import { Layout, Menu } from 'antd'
import { UserOutlined, LaptopOutlined, NotificationOutlined } from '@ant-design/icons'
import { Switch, Route, Redirect } from 'react-router-dom'

import User from '../User'
import PassChange from '../PassChange'
import GoodsList from '../GoodsList'
import CreateGoods from '../CreateGoods'
import { tokenLogin } from '../../services'

import './style.css'

const { SubMenu } = Menu
const { Header, Content, Sider } = Layout


const routes = {
  '/home/user': 'user',
  '/home/pass': 'pass',
  '/home/goodslist': 'goodslist',
  '/home/creategoods': 'creategoods',
}

const Home = (props) => {

  const { history } = props

  const [key, setKey] = useState('/home/user')

  const toRoute = ({ item, key }) => {
    setKey(key)
    history.push(`/home/${key}`)
  }

  
  useEffect(() => {
    setKey(routes[history.location.pathname])
    const token = localStorage.getItem('wb_token')
    if (!token) {
      history.push('/entrance')
    } else {
        tokenLogin({ token }).then(res => {
          if (res.errcode) {
            localStorage.removeItem('wb_token')
            history.push('/entrance')
          }
        })
    }
  }, [])

  return (
    <Layout style={{ height: '100vh' }}>
      <Header className="header" style={{ backgroundColor: '#fff', marginBottom: '8px' }}>
        <div style={{ height: '100%' }}>
          <img src='' />
          <span className='name'>货物监管平台</span>
        </div>
      </Header>
      <Layout>
        <Sider width={200} className="site-layout-background">
          <Menu
            mode="inline"
            selectedKeys={[key]}
            // defaultSelectedKeys={[key]}
            defaultOpenKeys={['sub1', 'sub2']}
            style={{ height: '100%', borderRight: 0 }}
            onClick={toRoute}
          >
            <SubMenu key="sub1" icon={<UserOutlined />} title="个人信息">
              <Menu.Item key="user">个人信息</Menu.Item>
              <Menu.Item key="pass">更改密码</Menu.Item>
            </SubMenu>
            <SubMenu key="sub2" icon={<LaptopOutlined />} title="货物列表">
              <Menu.Item key="goodslist">货物列表</Menu.Item>
              <Menu.Item key="creategoods">新建货物</Menu.Item>
            </SubMenu>
          </Menu>
        </Sider>
        <Layout
          style={{
            padding: 24,
            margin: 0,
            marginLeft: '8px',
            minHeight: 280,
            backgroundColor: '#fff'
          }}
        >
          <Content
            className="site-layout-background"
          >
            <Switch>
              <Route path='/home/user' component={User} />
              <Route exact path='/home/pass' component={PassChange} />
              <Route exact path='/home/goodslist' component={GoodsList} />
              <Route exact path='/home/creategoods' component={CreateGoods} />
              <Redirect to='/home/user' />
            </Switch>
          </Content>
        </Layout>
      </Layout>
    </Layout>
  )
}

export default Home