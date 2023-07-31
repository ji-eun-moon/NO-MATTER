import React, {useState} from 'react';
import axios from 'axios';
import {useNavigate} from 'react-router-dom'
import './LoginPage.css';
// import { Container, Form, Button } from 'react-bootstrap';
// import 'bootstrap/dist/css/bootstrap.min.css'; // 부트스트랩 CSS import
import { Container, CssBaseline, Avatar, Typography, Grid, TextField, Button, Link, Box } from '@material-ui/core'


function LoginPage() {
  const URL = "http://localhost:8080/api/v1/user/login"
  
  let [userID, setUserID] = useState("")
  let [userPassword, setUserPassword] = useState("")
  
  let navigate = useNavigate()

  const controllId = (e) => {
    setUserID(e.target.value)
  }

  const controllPw = (e) => {
    setUserPassword(e.target.value)
  }

  const handleLogin = (e) => {
    e.preventDefault();
    console.log('UserID:', userID);
    console.log('UserPW:', userPassword);

    axios({
      method: 'POST',
      url: URL,
      data: {userId:userID, userPassword:userPassword}
    })
    .then((response) => {
      console.log(response)
      navigate('/main')
    })
    .catch((err) => {
      console.log(err)
    })
  };

  return (
    <div className="LoginPage">
      {/* <Container className="d-flex align-items-center justify-content-center min-vh-100">
        <div className="w-100 mx-3" style={{ maxWidth: '400px'}}>
          <Form onSubmit={handleLogin}>
            <Form.Group controlId="userID">
              <Form.Control className="rounded-3"
                type="text"
                placeholder="아이디"
                value={userID}
                onChange={(e)=>setUserID(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="userPassword">
              <Form.Control className="rounded-3"
                type="password"
                placeholder="비밀번호"
                value={userPassword}
                onChange={(e)=>setUserPassword(e.target.value)}
              />
            </Form.Group>
            <Button variant="dark" type="submit" className="w-100 rounded-3">
              로그인
            </Button>
          </Form>
        </div>

      </Container> */}
      <Container component="main" maxWidth="xs">
        <CssBaseline/>
          <div className="paper">
            <Typography component="h1" variant="h5">
              Login
            </Typography>
            <form className="form" noValidate onSubmit={handleLogin}>
              <Grid item xs={12}>
                <TextField
                  autoComplete="id"
                  name="id"
                  variant="filled"
                  value={userID}
                  onChange={controllId}
                  required
                  fullWidth
                  id="userID"
                  label="아이디"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  autoComplete="password"
                  name="password"
                  variant="filled"
                  value={userPassword}
                  onChange={controllPw}
                  required
                  fullWidth
                  id="userPassword"
                  label="비밀번호"
                />
              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                onSubmit={handleLogin}
                color="primary"
                className="button">
                로그인
              </Button>
              <Grid container justify="flex-end">
                    <Grid item>
                        <Link href="/signup" variant="body2">
                          회원가입
                        </Link>
                    </Grid>
                </Grid>
            </form>
          </div>
      </Container>
    </div>
  );
}

export default LoginPage;
