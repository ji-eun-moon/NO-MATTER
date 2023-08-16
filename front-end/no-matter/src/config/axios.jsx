// axios.js
import axios from 'axios';
import {useNavigate} from 'react-router-dom'

function AutomaticLogin() {
  const navigate = useNavigate()

  const goLogin = () => {
    navigate('/login')
  }
}

// 인스턴스 생성
const instance = axios.create({
  baseURL: 'https://i9c105.p.ssafy.io/api/v1', // 원하는 API 서버의 기본 URL을 설정합니다.
});

// 요청 인터셉터 추가
instance.interceptors.request.use(
  (config) => {
    // 요청 전에 처리해야 할 작업을 수행
    const authToken = sessionStorage.getItem('authToken')
    if (authToken) {
      config.headers.Authorization = `Bearer ${authToken}`
    }
    return config;
  },
  (error) => {
    // 요청 전에 에러가 발생한 경우 처리하는 로직을 구현합니다.
    console.log(error)
    return Promise.reject(error);
  }
);

// 응답 인터셉터 추가
instance.interceptors.response.use(
  (response) => {
    // 응답을 받은 후 처리해야 할 작업을 수행
    return response;
  }, (error) => {
    
    const originalRequest = error.config;
    // 토큰이 만료되었거나 유효하지 않은 경우에만 토큰을 재발급 받을 수 있도록 조건을 설정
    if (error.response.status === 403 && !originalRequest._retry) {
      console.log(error)
      originalRequest._retry = true;
      // 여기서 토큰을 재발급 받는 작업을 수행
      return axios.post('https://i9c105.p.ssafy.io/api/v1/user/refreshToken', { refreshToken: localStorage.getItem('refreshToken') })
      .then((response) => {
        const newAuthToken = response.data[0];
        sessionStorage.setItem('authToken', response.data[0]);
        localStorage.setItem('refreshToken', response.data[1]);
        // 기존 요청에 새로 발급된 토큰을 추가하여 다시 요청
        originalRequest.headers.Authorization = `Bearer ${newAuthToken}`;
        return axios(originalRequest);
      })
      .catch((error) => {
        // 토큰 재발급에 실패한 경우 로그인 페이지로 이동하거나 다른 작업을 수행
        // 여기에 오류 처리 코드를 작성
          localStorage.clear()
          console.log(error)
          AutomaticLogin()
          return Promise.reject(error);
        });
    }
    return Promise.reject(error);
  }
);

export default instance;