import React, { useState, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import { logInRequestBody, logInApi } from '../../api';
import { Form, Input, Button, Typography, Space } from 'antd';
import { userValue } from 'redux/reducer/reducer';
import { useDispatch } from 'react-redux';
import '../../Styles/Sign.scss';

const { Title, Text } = Typography;

const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  // const [accessToken, setAccessToken] = useState('');
  const [cookies, setCookies] = useCookies(['accessToken']);
  const navigate = useNavigate(); //페이지 이동
  const dispatch = useDispatch();

  async function handleSignUp() {
    navigate(`/signup`);
  }

  async function handleSignIn(event: FormEvent) {
    event.preventDefault();
    const requestBody: logInRequestBody = { email, password };

    try {
      const logInData = await logInApi(requestBody);

      if (logInData.accessToken) {
        if (!cookies.accessToken) {
          const accessToken = logInData.accessToken;
          setCookies('accessToken', accessToken, { path: '/' });
        }
        // setAccessToken(logInData.accessTokens);
        localStorage.setItem('token', logInData.accessToken);
        dispatch(userValue(logInData));
        navigate(`/`);
      } else {
        setMessage(
          '로그인에 실패하였습니다. 이메일과 비밀번호를 다시 확인해주세요'
        );
      }
    } catch (error) {
      setMessage('요청을 처리하는 동안 오류가 발생했습니다.');
    }
  }

  return (
    <div className="inner">
      <Title level={2}>로그인</Title>
      <Space align="center" direction="vertical">
        <div className="container">
          <Form onSubmitCapture={handleSignIn}>
            <Form.Item>
              <Input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="text"
                placeholder="email"
                size="large"
              />
            </Form.Item>
            <Form.Item>
              <Input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                placeholder="password"
                size="large"
              />
            </Form.Item>
            <Button className="btn__submit" type="primary" htmlType="submit">
              로그인
            </Button>
          </Form>
          <div className="btn__area">
            <Button className="btn__area-item">아이디/비밀번호 찾기</Button>
            <Button className="btn__area-item" onClick={handleSignUp}>
              회원 가입
            </Button>
          </div>
          {message && <Text>{message}</Text>}
        </div>
      </Space>
    </div>
  );
};

export default SignIn;
