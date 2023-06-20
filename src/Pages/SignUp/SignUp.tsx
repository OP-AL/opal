import React, { useState, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { signUpApi, authenticateApi, signUpRequestBody } from 'api';
import { Form, Input, Button, Typography, Col, Space } from 'antd';
import '../../Styles/Sign.scss';

const { Title, Text } = Typography;

const SignUp = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordCheck, setPasswordCheck] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate(); //페이지 이동
  async function handleSignIn() {
    navigate(`/signin`);
  }
  //회원가입
  async function handleSignUp(event: FormEvent) {
    event.preventDefault();
    // 비밀번호 확인
    if (password !== passwordCheck) {
      setMessage('비밀번호를 확인해주세요.');
      return;
    }
    const requestBody: signUpRequestBody = {
      email,
      password,
      passwordCheck,
      displayName,
    };
    try {
      const signUpData = await signUpApi(requestBody);
      await authenticateCheck(signUpData.accessToken);
      setMessage('회원가입이 완료되었습니다.');
    } catch (error) {
      setMessage((error as Error).message);
    }
  }
  //인증
  async function authenticateCheck(accessToken: string) {
    try {
      await authenticateApi(accessToken);
    } catch (error) {
      setMessage('인증에 실패하였습니다.');
    }
  }
  return (
    <div className="inner">
      <Title level={2}>회원가입</Title>
      <Space align="center" direction="vertical">
        <div className="container">
          <Col>
            <Form onSubmitCapture={handleSignUp}>
              <Form.Item>
                <Input
                  value={displayName}
                  onChange={(e) => setDisplayName(e.target.value)}
                  type="text"
                  placeholder="UserName"
                  size="large"
                />
              </Form.Item>
              <Form.Item>
                <Input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  type="text"
                  placeholder="아이디(email)"
                  size="large"
                />
              </Form.Item>
              <Form.Item>
                <Input
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  type="password"
                  placeholder="비밀번호"
                  size="large"
                />
              </Form.Item>
              <Form.Item>
                <Input
                  value={passwordCheck}
                  onChange={(e) => setPasswordCheck(e.target.value)}
                  type="password"
                  placeholder="비밀번호 확인"
                  size="large"
                />
              </Form.Item>
              <Form.Item>
                <Button
                  className="btn__submit"
                  type="primary"
                  htmlType="submit"
                >
                  회원가입하기
                </Button>
              </Form.Item>
            </Form>
          </Col>
          {message && (
            <>
              <Text>{message}</Text>
              {message !== '비밀번호를 확인해주세요.' && (
                <Button onClick={handleSignIn}>로그인하기</Button>
              )}
            </>
          )}
        </div>
      </Space>
    </div>
  );
};

export default SignUp;
