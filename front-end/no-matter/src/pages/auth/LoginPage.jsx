import React, {useState} from 'react';
import axiosInstance from '../../config/axios'
import {useNavigate} from 'react-router-dom'
import './LoginPage.css';
import { Container, CssBaseline, Grid, TextField, Button, Link } from '@material-ui/core'
import Swal from 'sweetalert2'

function LoginPage() {
  const URL = "https://i9c105.p.ssafy.io/api/v1/user/login"
  
  let [userID, setUserID] = useState("")
  let [userPassword, setUserPassword] = useState("")
  
  let navigate = useNavigate()

  const controllId = (e) => {
    setUserID(e.target.value)
  }

  const controllPw = (e) => {
    setUserPassword(e.target.value)
  }

  const Toast = Swal.mixin({
    toast: true,
    position: 'top',
    showConfirmButton: false,
    timer: 2000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener('mouseenter', Swal.stopTimer)
      toast.addEventListener('mouseleave', Swal.resumeTimer)
    }
  })

  const handleLogin = (e) => {
    e.preventDefault();
    if (userID === '') {
      Toast.fire({
        icon: 'error',
        title: '아이디를 입력해 주세요',
      })
    } else {
      axiosInstance({
        method: 'POST',
        url: URL,
        data: {userId:userID, userPassword:userPassword}
      })
      .then((res) => {
        sessionStorage.setItem('authToken', res.data[0])
        localStorage.setItem('refreshToken', res.data[1])
        Toast.fire({
          icon: 'success',
          title: '환영합니다',
          timer: 1500
        })
        navigate('/main')
      })
      .catch((err) => {
        if (err.response.status === 401) {
          Toast.fire({
            icon: 'error',
            title: '비밀번호를 다시 입력해 주세요',
          })
        } else if (err.response.status === 404) {
          Toast.fire({
            icon: 'error',
            title: '가입되지 않은 아이디입니다',
          })
        }
      })
    }
  };

  return (
    <div className="LoginPage">
      <div className='d-flex justify-content-center p-5'>
        <img src="images/logo2.png" alt="No Matter logo" style={{width:"300px"}}/>
      </div>
      <Container component="main" maxWidth="xs">
        <CssBaseline/>
          <div className="paper">
            <div className='d-flex mb-3'>
            <div onClick={() => navigate('/')}>
              <i className="bi bi-chevron-left fs-2 me-3"></i>
            </div>
              <h1 className='font-700'>
                Login
              </h1>
            </div>
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
                size="large"
                variant="contained"
                onSubmit={handleLogin}
                color="primary"
                className="button"
                style={{ backgroundColor: "#0097B2", color: "#FFFFFF"}}>
                로그인
              </Button>
              <Grid container justifyContent="flex-end">
                <Grid item style={{marginTop:'7px'}}>
                  <Link href="/signup" variant="body2" style={{fontSize:'12pt'}}>
                    회원가입
                  </Link>
                </Grid>
              </Grid>
            </form>
            <hr />           
              <p></p>

          </div>
      </Container>
    </div>
  );
}

export default LoginPage;
