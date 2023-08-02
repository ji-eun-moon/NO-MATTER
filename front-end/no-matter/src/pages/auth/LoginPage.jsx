import React, {useState} from 'react';
import axios from 'axios';
import {useNavigate} from 'react-router-dom'
import './LoginPage.css';
import { Container, CssBaseline, Typography, Grid, TextField, Button, Link } from '@material-ui/core'


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
    .then(() => {
      navigate('/main')
    })
    .catch((err) => {
      if (err.response.status === 401) {
        alert("비밀번호를 다시 입력해 주세요.")
      } else if (err.response.status === 404) {
        alert("가입되지 않은 아이디 입니다.")
      }
    })
  };

  return (
    <div className="LoginPage">
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
                  type='password'
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
              <Button
                type="submit"
                fullWidth
                variant="contained"
                onClick = {() => {
                  window.location.href = "https://localhost:8080/oauth2/authorization/google";
                }}
                color="primary"
                className="button">
                Google
              </Button>
          </div>
      </Container>
    </div>
  );
}

export default LoginPage;
