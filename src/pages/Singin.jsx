import React from 'react';
import axios from 'axios';
import { message, Form, Input, Button, Row, Col } from 'antd';
import { Redirect } from 'react-router-dom';
import withAuth from '../hocs/withAuth';

const layout = {
  labelCol: {
    span: 8,
  },
};
// const tailLayout = {

// };
class Signin extends React.Component {
  state = {
    email: '',
  };
  passwordRef = React.createRef();
  render() {
    const token = localStorage.getItem('token');
    if (token !== null) {
      return <Redirect to="/" />;
    }
    return (
      <div className="login-wrap">
        {/* <h1>LOGIN</h1>
        <strong>with your My Book account</strong>
        <p className="input-email">
          <input type="text" value={this.state.email} onChange={this.change} />
        </p>
        <p className="input-password">
          <input type="password" ref={this.passwordRef} />
        </p>
        <p>
          <button onClick={this.click}>로그인</button>
        </p> */}
        <Row
          type="flex"
          justify="center"
          align="middle"
          style={{
            width: '70%',
          }}
        >
          <Col
            span={12}
            style={{
              position: 'relative',
              height: '90vh',
              color: '#fff',
              backgroundImage: 'url("./images/lilacBg.jpg")',
              backgroundSize: 'cover',
              backgroundPositionX: '80%',
            }}
            justify="center"
            align="middle"
          >
            <div className="login-title-wrap">
              <strong>Welcome to My Books</strong>
              <p>Sign in with your My Books's account</p>
            </div>
          </Col>
          <Col
            span={12}
            style={{
              position: 'relative',
              height: '90vh',
              padding: '20px',
              background: '#fff',
            }}
            justify="center"
            align="middle"
          >
            <Form
              {...layout}
              ref={this.formRef}
              name="control-ref"
              onFinish={this.onFinish}
              style={{
                position: 'absolute',
                left: '50%',
                top: '50%',
                width: '100%',
                transform: 'translate(-50%, -50%)',
                padding: '20px',
                background: '#fff',
              }}
            >
              <h1>LOGIN</h1>
              <Form.Item
                name="email"
                label="email"
                labelAlign="left"
                rules={[
                  {
                    type: 'email',
                    message: '이메일 형식으로 입력해주세요!',
                  },
                  {
                    required: true,
                    message: '이메일을 입력해주세요!',
                  },
                ]}
              >
                <Input
                  value={this.state.email}
                  onChange={this.change}
                  type="text"
                />
              </Form.Item>
              <Form.Item
                name="password"
                label="password"
                labelAlign="left"
                rules={[
                  {
                    required: true,
                    message: '비밀번호를 입력해주세요!',
                  },
                ]}
                hasFeedback
              >
                <Input.Password ref={this.passwordRef} />
              </Form.Item>

              <Form.Item {...tailLayout}>
                <Button
                  htmlType="submit"
                  onClick={this.click}
                  className="login-btn"
                >
                  LOGIN
                </Button>
              </Form.Item>
            </Form>
          </Col>
        </Row>
      </div>
    );
  }
  click = async () => {
    // current에 들어있는 이유 => 한바퀴 돌아지고 current키에 할당되는거
    // console.log('로그인', this.state.email);
    // console.log('패스워드', this.passwordRef.current.props.value);

    // 이메일과 패스워드를 뽑아서 서버에 보낸다. POST
    const email = this.state.email;
    const password = this.passwordRef.current.props.value;

    if (email === '' || password === '') return;
    try {
      const response = await axios.post('https://api.marktube.tv/v1/me', {
        email,
        password,
      });
      const token = response.data.token;
      // console.log(token);
      localStorage.setItem('token', token);
      this.props.history.push('/');
    } catch (error) {
      const errorCode = error?.response?.data?.error || ' NOT_MATCH';
      if (errorCode === 'PASSWORD_NOT_MATCH') {
        message.error('패스워드가 일치하지 않습니다.');
      } else if (errorCode === 'USER_NOT_EXIST') {
        message.error('등록된 이메일이 없습니다.');
      } else {
        message.error('관리자에게 문의바랍니다.');
      }
    }
  };

  change = (e) => {
    // this.setState({ email: e.target.value });
    this.setState({ email: e.target.value });
    // console.log(e.target.value);
  };
}

export default withAuth(Signin, false);
