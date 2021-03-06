import React,{useState, Fragment} from 'react'
import { UserOutlined,LockOutlined,TagOutlined } from '@ant-design/icons'
import { Button,Input, message, Modal } from 'antd'

import { userRegister, retrievePassword } from '../../services'
import './style.css'


const Signup = (props) => {
    const {history} = props
    const [noAccount,setNoAccount] = useState(history.location.search.indexOf('noAccount')>0?1:0)
    const [account, setAccount] = useState('')
    const [psd, setPsd] = useState('')
    const [code, setCode] = useState('')

    const register = () => {
        let obj = {
            account,
            password: psd,
            code
        }
        userRegister(obj).then(res => {
            if (res.errcode) {
                return message.error(res.message)
            }
            localStorage.setItem('wb_token', res.data.token)
            history.push('/home')
        })
    }

    const forgetPsd = () => {
      if (!account) {
        return message.error('请输入邮箱地址')
      }
      retrievePassword({ email: account }).then(res => {
        if (res.errcode) {
          return message.error(res.message)
        }
        Modal.success({
          title: res.message,
          okText: '确定',
          onOk: () => {
            // Modal.destroyAll()
          }
        })
      })
    }
    
    return (
        <div className='signup'>
            
            <div className="signup-header">
                <div className="signup-title">货物监管平台</div>
            </div>
            {
                noAccount ? 
                <Fragment>
                    <Input
                        placeholder="邮箱"
                        prefix={<UserOutlined  className="site-form-item-icon" />}
                        style={{marginBottom:20}}
                        value={account}
                        onChange={e => setAccount(e.target.value)}
                    />
                    <Button type="primary" style={{width:'100%',marginBottom:20}} onClick={forgetPsd}>找回密码</Button>
                    <div className="signup-footer" >
                        <div onClick={()=>history.push('/entrance/login')}><span style={{color:'black'}}>已有账号？</span>进入登录页面</div>
                        <div onClick={()=>setNoAccount(0)}>注册账号</div>
                    </div>
                </Fragment>:
                <Fragment>
                     <Input
                        placeholder="邮箱"
                        prefix={<UserOutlined className="site-form-item-icon" />}
                        style={{marginBottom:20}}
                        value={account}
                        onChange={e => setAccount(e.target.value)}
                    />
                    <Input.Password
                        placeholder="密码"
                        prefix={<LockOutlined />}
                        style={{marginBottom:20}}
                        value={psd}
                        onChange={e => setPsd(e.target.value)}
                    />
                    <Input
                        placeholder="注册码"
                        prefix={<TagOutlined  className="site-form-item-icon" />}
                        style={{marginBottom:20}}
                        value={code}
                        onChange={e => setCode(e.target.value)}
                    />
                    <Button type="primary" style={{width:'100%',marginBottom:20}} onClick={register}>注册</Button>
                    <div className="signup-footer" >
                        <div onClick={()=>history.push('/entrance/login')}><span style={{color:'black'}}>已有账号？</span>进入登录页面</div>
                    </div>
                </Fragment>
            }
           
        </div>
    )
}

export default Signup