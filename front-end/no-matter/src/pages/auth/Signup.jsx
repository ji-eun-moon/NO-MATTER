// import React, {useState, useEffect, useRef} from 'react'
// import { useDispatch } from 'react-redux'
// import { Container, CssBaseline, Avatar, Typography, Grid, TextField, Button, Link, Box } from '@material-ui/core'
// import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
// import axios from 'axios'
// import { signup } from '../../slice/userSlice'
// import { useNavigate } from 'react-router-dom';
// import { Pattern } from '@mui/icons-material'

// function Signup() {    

//     const dispatch = useDispatch();
//     const navigate = useNavigate();

//     const [userId, setUserId] = useState("")
//     const [idCheck, setIdCheck] = useState(false)
//     const [formData, setFormData] = useState({
//         // userId : "",
//         userPassword : "",
//         confirmPassword : "",
//         userName : "",
//         userEmail : "",
//         userNumber : "",
//     }) 

//     useEffect(() => {
//         setFormData({...formData, userPassword : formData.userPassword,
//                                   confirmPassword : formData.confirmPassword,
//                                   userName : formData.userName,
//                                   userEmail : formData.userEmail,
//                                   userNumber : formData.userNumber,
//                     })
//     }, [formData.userPassword, formData.confirmPassword, formData.userName, formData.userEmail, formData.userNumber])


//     const onFormHandler = (event) => {
//         setFormData(event.currentTarget.value)
//     }

//     const onIdHandler = (event) => {
//         setUserId(event.currentTarget.value)
//     }
    // const idCheckHandler = (event) => {
    //     event.preventDefault()
    //     axios({
    //         method : 'Get',
    //         url : `http://localhost:8080/api/v1/user/idCheck/${userId}`,
    //     })
    //     .then((response) => {
    //         console.log('response',response)
    //         window.confirm('사용 가능한 아이디입니다')
    //         setIdCheck(true)
    //         console.log(idCheck)
    //         // const user = response.data
    //     })
    //     .catch((err) => {
    //         // console.log(userId, userPassword, userName, userEmail, userNumber)
    //         console.log('err',err)
    //         alert('이미 사용중인 아이디입니다')
    //         setIdCheck(false)
    //       })
    // }

      
//     //찬석
    // const submitHandler = async(e) => {
    //     e.preventDefault()        

    //     dispatch(signup(userId, e.target[2].value, e.target[4].value, e.target[5].value, e.target[6].value))
    //     navigate('/login');    
    // }


//     return (
//         <Container component="main" maxWidth="xs">
//             <CssBaseline />                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                
//             <div className="paper">        
            
//             <Avatar className="avatar">
//                 <LockOutlinedIcon />
//             </Avatar>
//             <Typography component="h1" variant="h5">
//                 Sign Up
//             </Typography>
//             <form className="form" noValidate onSubmit={submitHandler}>
//                 <Grid item xs={12}>
//                     <div className='d-flex'>
//                         <TextField
//                             autoComplete="id"
//                             name="id"
//                             variant="filled"
//                             value={userId}
//                             onChange={onIdHandler}
//                             required
//                             fullWidth
//                             id="userId"
//                             label="아이디" 
//                             autoFocus
//                         />
//                         <Button                    
//                         type="submit"
//                         // variant="contained"
//                         onClick={idCheckHandler}
//                         // color="primary"
//                         fullWidth
//                         className="button"
//                         style={{ backgroundColor: "#0097B2", color: "#FFFFFF"}}>
//                             아이디 중복 확인
//                         </Button>

//                     </div>
//                 </Grid>
//                 <Grid item xs={12} >
//                     <TextField
//                         variant="filled"
//                         required
//                         fullWidth
//                         value={formData.userPassword}
//                         onChange={onFormHandler}
//                         name="userPassword"
//                         // error={hasError('password')} // 해당 텍스트필드에 error 핸들러 추가
//                         label="Password(5글자 이상 필수)"
//                         type="password"
//                         id="userPassword"
//                         autoComplete="current-password"
                        
//                         // ref={focusRef}
//                     />
//                 </Grid>
//                 <Grid item xs={12}>
//                     <TextField
//                         variant="filled"
//                         required
//                         fullWidth
//                         value={formData.confirmPassword}
//                         onChange={onFormHandler}
//                         name="confirmPassword"
//                         // error={hasNotSameError('confirmPassword')} // 해당 텍스트필드에 error 핸들러 추가
//                         // helperText={
//                         //     hasNotSameError('confirmPassword') ? "입력한 비밀번호와 일치하지 않습니다." : null
//                         // } // 에러일 경우에만 안내 문구 표시
//                         label="Confirm Password"
//                         type="password"
//                         id="confirmPassword"
//                         autoComplete="current-password"
//                     />
//                 </Grid>
//                 <Grid item xs={12}>
//                     <TextField
//                         autoComplete="fname"
//                         name="userName"
//                         variant="filled"
//                         value={formData.userName}
//                         onChange={onFormHandler}
//                         required
//                         fullWidth
//                         id="userName"
//                         label="이름"
//                     />
//                 </Grid>
//                 <Grid item xs={12}>
//                     <TextField
//                         required
//                         fullWidth
//                         id="userEmail"
//                         label="Email Address"
//                         name="email"
//                         variant="filled"
//                         value={formData.userEmail}
//                         onChange={onFormHandler}
//                         autoComplete="email"
//                         type='email'
//                     />
//                 </Grid>
//                 <Grid item xs={12}>
//                     <TextField
//                         variant="filled"
//                         required
//                         fullWidth
//                         value={formData.userNumber}
//                         onChange={onFormHandler}
//                         id="userNumber"
//                         label="phone"
//                         name="phone"
//                         autoComplete="phone"
//                     />
//                 </Grid>

//                 <Button
//                     type="submit"
//                     fullWidth
//                     variant="contained"
//                     onSubmit={submitHandler}
//                     color="primary"
//                     className="button"
//                     >
//                 회원가입
//                 </Button>
//                 <Grid container justify="flex-end">
//                     <Grid item>
//                         <Link href="/login" variant="body2">
//                         이미 가입하셨다면, 로그인해 주세요!
//                         </Link>
//                     </Grid>
//                 </Grid>
//             </form>
//             </div>
//             <Box mt={5}>
            
//             </Box>
//         </Container>
//     )
// }

// export default Signup




































import React, {useCallback, useEffect, useState} from 'react'
import { useDispatch } from 'react-redux'
import { Container, CssBaseline, Avatar, Typography, Grid, TextField, Button, Link, Box } from '@material-ui/core'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import axios from 'axios'
import { signup } from '../../slice/userSlice'
import { useNavigate } from 'react-router-dom';
import { EventRepeat } from '@mui/icons-material'

function Signup() {    

    const dispatch = useDispatch();
    const navigate = useNavigate();

    // props , state -> 이 안에서는 state 를 변화시켜서 이 안의 데이터를 변화시킬 수 있음
    // 입력한 이메일과 비밀번호를 서버에 넘길 수 있도록 state 에서 받고 있음
    const [userId, setUserId] = useState("")
    const [idCheck, setIdCheck] = useState(false)
    const [idMsg, setIdMsg] = useState("")

    const [userPassword, setUserPassword] = useState("")
    const [userConfirmPassword, setUserConfirmPassword] = useState("")
    const [pwdCheck, setPwdCheck] = useState(false)
    const [pwdMsg, setPwdMsg] = useState("")
    const [confirmPwdCheck, setConfirmPwdCheck] = useState(false)
    const [confirmPwdMsg, setConfirmPwdMsg] = useState("")

    const [userName, setUserName] = useState("")
    const [nameCheck, setNameCheck] = useState(false)
    const [nameMsg, setNameMsg] = useState("")

    const [userEmail, setUserEmail] = useState("")
    const [emailCheck, setEmailCheck] = useState(false)
    const [emailMsg, setEmailMsg] = useState("")

    const [userNumber, setUserNumber] = useState("")
    const [numberCheck, setNumberdCheck] = useState(false)
    const [numberMsg, setNumberMsg] = useState("")



    const onIdHandler = useCallback((event) => {
        setUserId(event.currentTarget.value)
        if(0<event.currentTarget.value.length && event.currentTarget.value.length<5){
            setIdMsg('5글자 이상으로 입력해주세요')
            setIdCheck(false)
        }
        else{
            setIdMsg('올바른 Id 형식입니다')
            setIdCheck(true)
        }
    },[])
    const idCheckHandler = (event) => {
        event.preventDefault()
        axios({
            method : 'Get',
            url : `http://localhost:8080/api/v1/user/idCheck/${userId}`,
        })
        .then((response) => {
            console.log('response',response)
            window.confirm('사용 가능한 아이디입니다')
            console.log(idCheck)
            setIdCheck(true)
            console.log(idCheck)
        })
        .catch((err) => {
            console.log('err',err)
            alert('이미 사용중인 아이디입니다')
            setIdCheck(false)
          })
    }



    const onPasswordHandler = useCallback((event) => {
        const pwdReg = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,25}$/

        setUserPassword(event.currentTarget.value)

        if(!pwdReg.test(event.currentTarget.value)){
            setPwdMsg('숫자+영문자+특수문자 조합으로 8자리 이상 입력해주세요')
            setPwdCheck(false)
        }
        else{
            setPwdMsg('안전한 비밀번호입니다')
            setPwdCheck(true)
        }        
    },[])

    const onconfirmPasswordHandler = useCallback((event) => {
        setUserConfirmPassword(event.currentTarget.value)

        if(event.currentTarget.value === userPassword){
            setConfirmPwdMsg('비밀번호가 일치합니다')
            setConfirmPwdCheck(true)
        }
        else{
            setConfirmPwdMsg('비밀번호가 일치하지 않습니다')
            setConfirmPwdCheck(false)
        }        
    },[userPassword])




    const onNameHandler = useCallback((event) => {
        setUserName(event.currentTarget.value)

        if(event.currentTarget.value.length < 0){
            setNameMsg('이름을 입력해주세요')
            setNameCheck(false)
        }
        else{
            setNameMsg('이름이 확인되었습니다')
            setNameCheck(true)
        }        
    },[])




    const onEmailHandler = useCallback((event) => {
        const emailReg = /([\w-.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/
        setUserEmail(event.currentTarget.value)

        if(!emailReg.test(event.currentTarget.value)){
            setEmailMsg('이메일 형식을 다시 확인해주세요')
            setEmailCheck(false)
        }
        else{
            setEmailMsg('올바른 이메일 형식입니다')
            setEmailCheck(true)
        }
    },[])


    const onNumberHandler = useCallback((event) => {
        const numReg = /^(01[016789]{1})[0-9]{3,4}[0-9]{4}$/
        setUserNumber(event.currentTarget.value)

        if(!numReg.test(event.currentTarget.value)){
            setNumberMsg('전화번호를 "01012345678" 형식으로 입력해주세요')
            setNumberdCheck(false)
        }
        else{
            setNumberMsg('올바른 전화번호 형식입니다')
            setNumberdCheck(true)
        }
    },[])



    // const hasError = passwordEntered =>
    //     Password.length < 5 ? true : false;
    
    // const hasNotSameError = passwordEntered =>
    //     Password != confirmPassword ? true : false;    
    

    const onSubmitHandler = async(e) => {
    e.preventDefault()        
    dispatch(signup( userId, userPassword, userName, userEmail, userNumber ))
    navigate('/login');    
    }
    
        



    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                
            <div className="paper">        
            
            <Typography component="h1" variant="h5" style={{padding:"30px 10px"}}>
                <b>Sign Up</b>
            </Typography>
            <form className="form" noValidate onSubmit={onSubmitHandler}>                     
                <Grid item xs={12}>
                    <div>
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
                                error={!idCheck}
                                // helperText={idCheck?null:'5글자 이상 입력해주세요'}
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
                        {userId.length > 0 && <span className={`message ${idCheck ? 'success' : 'error'}`}>{idMsg}</span>}              
                    </div>
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        variant="filled"
                        required
                        fullWidth
                        value={userPassword}
                        onChange={onPasswordHandler}
                        name="userPassword"
                        // error={hasError('password')} // 해당 텍스트필드에 error 핸들러 추가
                        label="비밀번호"
                        type="password"
                        id="userPassword"
                        autoComplete="current-password"
                        error={!pwdCheck}
                    />
                    {userPassword.length > 0 && <span className={`message ${pwdCheck ? 'success' : 'error'}`}>{pwdMsg}</span>}              
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        variant="filled"
                        required
                        fullWidth
                        value={userConfirmPassword}
                        onChange={onconfirmPasswordHandler}
                        name="confirmPassword"
                        // error={hasNotSameError('confirmPassword')} // 해당 텍스트필드에 error 핸들러 추가
                        // helperText={
                        //     hasNotSameError('confirmPassword') ? "입력한 비밀번호와 일치하지 않습니다." : null
                        // } // 에러일 경우에만 안내 문구 표시
                        label="비밀번호 확인"
                        type="password"
                        id="userConfirmPassword"
                        autoComplete="current-password"
                        error={!confirmPwdCheck}
                    />
                    {userConfirmPassword.length > 0 && <span className={`message ${confirmPwdCheck ? 'success' : 'error'}`}>{confirmPwdMsg}</span>}              
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        autoComplete="fname"
                        name="userName"
                        variant="filled"
                        value={userName}
                        onChange={onNameHandler}
                        required
                        fullWidth
                        id="userName"
                        label="이름"
                        error={!nameCheck}
                    />
                    {userName.length > 0 && <span className={`message ${nameCheck ? 'success' : 'error'}`}>{nameMsg}</span>}              
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        variant="filled"
                        required
                        fullWidth
                        value={userEmail}
                        onChange={onEmailHandler}
                        id="userEmail"
                        label="이메일"
                        name="email"
                        autoComplete="email"
                        error={!emailCheck}
                    />
                    {userEmail.length > 0 && <span className={`message ${emailCheck ? 'success' : 'error'}`}>{emailMsg}</span>}              
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        variant="filled"
                        required
                        fullWidth
                        value={userNumber}
                        onChange={onNumberHandler}
                        id="userNumber"
                        label="전화번호"
                        name="phone"
                        autoComplete="phone"
                        error={!numberCheck}
                    />
                    {userNumber.length > 0 && <span className={`message ${numberCheck ? 'success' : 'error'}`}>{numberMsg}</span>}              
                </Grid>

                <Button
                type="submit"
                fullWidth
                variant="contained"
                onSubmit={onSubmitHandler}
                // color="primary"
                className="button"
                style={{ backgroundColor: "#0097B2", color: "#FFFFFF"}}
                >
                회원가입
                </Button>
                <Grid container justify="flex-end">
                    <Grid item style={{margin:"10px 0px"}}>
                        <Link href="/login" variant="body2" >
                            이미 가입하셨다면, <b style={{fontWeight:"1000"}}>로그인</b>해 주세요!
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