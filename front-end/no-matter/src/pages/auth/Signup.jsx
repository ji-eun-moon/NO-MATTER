import React, {useState, useEffect, useRef} from 'react'
import { useDispatch } from 'react-redux'
import { Container, CssBaseline, Avatar, Typography, Grid, TextField, Button, Link, Box } from '@material-ui/core'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import axios from 'axios'
import { signup } from '../../slice/userSlice'
import { useNavigate } from 'react-router-dom';

function Signup() {    

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [userId, setUserId] = useState("")
    const [formData, setFormData] = useState({
        // userId : "",
        userPassword : "",
        confirmPassword : "",
        userName : "",
        userEmail : "",
        userNumber : "",
    }) 


    const onFormHandler = (event) => {
        const name = event.currentTarget.name
        setFormData(event.currentTarget.value)
    }

    const onIdHandler = (event) => {
        setUserId(event.currentTarget.value)
    }
    const idCheckHandler = (event) => {
        event.preventDefault()
        console.log('check', userId)
        axios({
            method : 'Get',
            url : `http://localhost:8080/api/v1/user/idCheck/${userId}`,
        })
        .then((response) => {
            console.log('response',response)
            alert('사용 가능한 아이디입니다')
            // const user = response.data
        })
        .catch((err) => {
            // console.log(userId, userPassword, userName, userEmail, userNumber)
            console.log('err',err)
            alert('이미 사용중인 아이디입니다')
          })
        }
      
    //찬석
    const submitHandler = async(e) => {
        e.preventDefault()
        console.log('event',e)
        // const focusRef = useRef()
        if(e.target[2].value !== e.target[3].value){
            alert("비밀번호를 다시 확인해주세요")
            return
        }
        dispatch(signup(userId, e.target[2].value, e.target[3].value, e.target[4].value, e.target[5].value, e.target[6].value))
        navigate('/login');    
    }

    useEffect(() => {
        setFormData({...formData, userPassword : formData.userPassword,
                                  confirmPassword : formData.confirmPassword,
                                  userName : formData.userName,
                                  userEmail : formData.userEmail,
                                  userNumber : formData.userNumber,
                    })
    }, [formData.userPassword, formData.confirmPassword, formData.userName, formData.userEmail, formData.userNumber, ])

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                
            <div className="paper">        
            
            <Avatar className="avatar">
                <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
                Messenger Sign Up
            </Typography>
            <form className="form" noValidate onSubmit={submitHandler}>
                <Grid item xs={12}>
                    <div className='d-flex'>
                        <TextField
                            autoComplete="id"
                            name="id"
                            variant="filled"
                            value={userId}
                            onChange={onIdHandler}
                            required
                            fullWidth
                            id="userId"
                            label="아이디" 
                            autoFocus
                        />
                        <Button                    
                        type="submit"
                        // variant="contained"
                        onClick={idCheckHandler}
                        // color="primary"
                        fullWidth
                        className="button"
                        style={{ backgroundColor: "#0097B2", color: "#FFFFFF"}}>
                            아이디 중복 확인
                        </Button>

                    </div>
                </Grid>
                <Grid item xs={12} >
                    <TextField
                        variant="filled"
                        required
                        fullWidth
                        value={formData.userPassword}
                        onChange={onFormHandler}
                        name="userPassword"
                        // error={hasError('password')} // 해당 텍스트필드에 error 핸들러 추가
                        label="Password(5글자 이상 필수)"
                        type="password"
                        id="userPassword"
                        autoComplete="current-password"
                        // ref={focusRef}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        variant="filled"
                        required
                        fullWidth
                        value={formData.confirmPassword}
                        onChange={onFormHandler}
                        name="confirmPassword"
                        // error={hasNotSameError('confirmPassword')} // 해당 텍스트필드에 error 핸들러 추가
                        // helperText={
                        //     hasNotSameError('confirmPassword') ? "입력한 비밀번호와 일치하지 않습니다." : null
                        // } // 에러일 경우에만 안내 문구 표시
                        label="Confirm Password"
                        type="password"
                        id="confirmPassword"
                        autoComplete="current-password"
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        autoComplete="fname"
                        name="userName"
                        variant="filled"
                        value={formData.userName}
                        onChange={onFormHandler}
                        required
                        fullWidth
                        id="userName"
                        label="이름"
                        autoFocus
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        variant="filled"
                        required
                        fullWidth
                        value={formData.userEmail}
                        onChange={onFormHandler}
                        id="userEmail"
                        label="Email Address"
                        name="email"
                        autoComplete="email"
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        variant="filled"
                        required
                        fullWidth
                        value={formData.userNumber}
                        onChange={onFormHandler}
                        id="userNumber"
                        label="phone"
                        name="phone"
                        autoComplete="phone"
                    />
                </Grid>

                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    onSubmit={submitHandler}
                    color="primary"
                    className="button"
                    >
                회원가입
                </Button>
                <Grid container justify="flex-end">
                    <Grid item>
                        <Link href="/login" variant="body2">
                        이미 가입하셨다면, 로그인해 주세요!
                        </Link>
                    </Grid>
                </Grid>
            </form>
            </div>
            <Box mt={5}>
            
            </Box>
        </Container>
    )
}

export default Signup