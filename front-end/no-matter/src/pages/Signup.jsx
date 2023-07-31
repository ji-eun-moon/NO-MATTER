import React, {useState, useEffect} from 'react'
import { useDispatch } from 'react-redux'
import { Container, CssBaseline, Avatar, Typography, Grid, TextField, Button, Link, Box } from '@material-ui/core'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import axios from 'axios'
import { signup } from '../slice/userSlice'

function Signup() {    

    const dispatch = useDispatch();

    const [formData, setFormData] = useState({
        userId : "",
        userPassword : "",
        confirmPassword : "",
        userName : "",
        userEmail : "",
        userNumber : "",
    })
    const onFormHandler = (event) => {
        setFormData(event.currentTarget.value)
    }

    const idCheckHandler = (event) => {
        event.preventDefault()
        console.log('id', formData.userId)
        axios({
            method : 'Get',
            // url : `http://localhost:8080/api/v1/user/idCheck/${}`
        })
    }
      
    //찬석
    const submitHandler = async(e) => {
        e.preventDefault()
        console.log('event',e)
        if(e.target[1].value !== e.target[2].value){
            alert("비밀번호를 다시 확인해주세요")
        }
        dispatch(signup(e.target[0].value, e.target[1].value, e.target[3].value, e.target[4].value, e.target[5].value))    
    }

    useEffect(() => {
        setFormData({...formData, userId : formData.userId,
                                  userPassword : formData.userPassword,
                                  confirmPassword : formData.confirmPassword,
                                  userName : formData.userName,
                                  userEmail : formData.userEmail,
                                  userNumber : formData.userNumber,
                    })
    }, [formData.userId, formData.userPassword, formData.confirmPassword, formData.userName, formData.userEmail, formData.userNumber, ])

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
                    <TextField
                        autoComplete="id"
                        name="id"
                        variant="filled"
                        value={formData.userId}
                        onChange={onFormHandler}
                        required
                        fullWidth
                        id="userId"
                        label="아이디"
                        autoFocus
                    />
                    <Button                    
                    type="submit"
                    variant="contained"
                    onClick={idCheckHandler}
                    color="primary"
                    className="button">
                        아이디 중복 확인
                    </Button>
                </Grid>
                <Grid item xs={12}>
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