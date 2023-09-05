import React, { useState } from 'react';
import { Form, Input, Button, Image } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { loginUser } from '../../../store/slices/LoginSlice';
import styles from './login.module.css';
import logo from '../../../assets/images/logo.png';

const Login = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const error = useSelector((state) => state.login.error); 

  const dispatch = useDispatch(); 

  const onFinish = async () => {
    try {
      const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
      if (!emailPattern.test(email)) {
        alert('Please enter a valid email address.');
        return;
      }
      await dispatch(loginUser({ email, password }));
      navigate('/dashboard');
    } catch (error) {
      alert('invalid email or password');
      console.error(error);
    }
  };

  return (
    <div className={styles.loginContainer}>
      <div className={styles.login}>
        <Image src={logo} alt="logo" className={styles.logo} />
        <Form name="login-form" initialValues={{ remember: true }} onFinish={onFinish}>
          <label className={styles.labels}>Email</label>
          <Form.Item
            name="email"
            rules={[{ required: true, message: 'Please input your email!' }]}
          >
            <Input
              placeholder="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Item>
          <label className={styles.labels}>Password</label>
          <Form.Item
            name="password"
            rules={[{ required: true, message: 'Please input your password!' }]}
          >
            <Input.Password
              placeholder="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Item>
          <Form.Item>
            <Button 
              type="primary" 
              htmlType="submit" 
              className={styles.btn}
            >
              Log in
            </Button>
          </Form.Item>
          {error && <div className={styles.error}>{error}</div>} 
        </Form>
      </div>
    </div>
  );
};

export default Login;
