import React, { useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import styled from "styled-components";
import { useAuth } from "../../contexts/AuthContext";

const Container = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f7f8fa;
`;

const Card = styled.div`
  background: #fff;
  border: 1px solid #e6e6e6;
  border-radius: 10px;
  padding: 40px;
  width: 100%;
  max-width: 380px;
`;

const Title = styled.h1`
  font-size: 22px;
  font-weight: 700;
  color: #1e2a3a;
  margin-bottom: 8px;
`;

const Subtitle = styled.p`
  font-size: 14px;
  color: #999;
  margin-bottom: 28px;
`;

const Label = styled.label`
  display: block;
  font-size: 13px;
  font-weight: 600;
  color: #444;
  margin-bottom: 6px;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px 12px;
  border: 1px solid #e6e6e6;
  border-radius: 6px;
  font-size: 14px;
  margin-bottom: 16px;
  box-sizing: border-box;

  &:focus {
    border-color: #003569;
    outline: none;
  }
`;

const Button = styled.button`
  width: 100%;
  padding: 11px;
  background-color: #003569;
  color: #fff;
  border: none;
  border-radius: 6px;
  font-size: 15px;
  font-weight: 600;
  cursor: pointer;
  margin-top: 4px;

  &:hover {
    background-color: #00254d;
  }
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

const ErrorMsg = styled.p`
  color: #ed4956;
  font-size: 13px;
  margin-bottom: 12px;
`;

const Login = () => {
  const [email, setEmail]       = useState("");
  const [password, setPassword] = useState("");
  const [error, setError]       = useState("");
  const [submitting, setSubmitting] = useState(false);

  const { signIn } = useAuth();
  const history    = useHistory();
  const location   = useLocation();
  const from       = location.state?.from?.pathname || "/admin/members";

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSubmitting(true);

    const { error } = await signIn(email, password);

    if (error) {
      setError("이메일 또는 비밀번호가 올바르지 않습니다.");
      setSubmitting(false);
      return;
    }

    history.replace(from);
  };

  return (
    <Container>
      <Card>
        <Title>IDA Lab Admin</Title>
        <Subtitle>관리자 계정으로 로그인하세요.</Subtitle>
        <form onSubmit={handleSubmit}>
          <Label>이메일</Label>
          <Input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="admin@example.com"
            required
          />
          <Label>비밀번호</Label>
          <Input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            required
          />
          {error && <ErrorMsg>{error}</ErrorMsg>}
          <Button type="submit" disabled={submitting}>
            {submitting ? "로그인 중..." : "로그인"}
          </Button>
        </form>
      </Card>
    </Container>
  );
};

export default Login;
