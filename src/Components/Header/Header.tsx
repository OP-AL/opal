import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Row, Col, Button, Typography } from 'antd';

const { Title } = Typography;

const Header = () => {
  const navigate = useNavigate(); // 페이지 이동
  const accessToken = localStorage.getItem('token'); // localStorage에서 accessToken 가져오기

  async function handleSignIn() {
    navigate(`/signin`);
  }

  async function handleLogout() {
    localStorage.removeItem('token'); // localStorage에서 accessToken 제거
    navigate(`/`);
  }

  async function handleMyPage() {
    navigate(`/`);
  }

  return (
    <Row justify="space-between" align="middle">
      <Col>
        <Title level={1}>OP-AL</Title>
      </Col>
      <Col>
        {accessToken ? (
          <>
            <Button onClick={handleLogout}>로그아웃</Button>
            <Button onClick={handleMyPage}>마이페이지</Button>
          </>
        ) : (
          <Button onClick={handleSignIn}>로그인</Button>
        )}
      </Col>
    </Row>
  );
};

export default Header;
