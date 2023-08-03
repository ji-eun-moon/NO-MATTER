// axios.js
import axios from 'axios';

// 인스턴스 생성
const instance = axios.create({
  baseURL: 'http://localhost:8080/api/v1', // 원하는 API 서버의 기본 URL을 설정합니다.
});

// 요청 인터셉터 추가
instance.interceptors.request.use(
  (config) => {
    // 요청 전에 처리해야 할 작업을 수행합니다. 예: 헤더에 인증 토큰 추가
    const authToken = sessionStorage.getItem('authToken')
    if (authToken) {
      config.headers.Authorization = `${authToken}`
    }
    return config;
  },
  (error) => {
    // 요청 전에 에러가 발생한 경우 처리하는 로직을 구현합니다.
    return Promise.reject(error);
  }
);

// 응답 인터셉터 추가
instance.interceptors.response.use(
  (response) => {
    // 응답을 받은 후 처리해야 할 작업을 수행합니다.
    return response;
  },
  /*
  (error) => {
    
    return Promise.reject(error);
  }
  */
  (error) => {
    const originalRequest = error.config;
    // 토큰이 만료되었거나 유효하지 않은 경우에만 토큰을 재발급 받을 수 있도록 조건을 설정합니다.
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      // 여기서 토큰을 재발급 받는 작업을 수행합니다.
      const nowauthtoken = sessionStorage.getItem('authToken')
      return axios.post('/api/refresh-token', { refreshToken: nowauthtoken })
        .then((response) => {
          // 새로 발급된 토큰을 저장합니다.
          const newAuthToken = response.data.access_token;
          sessionStorage.setItem('authToken', newAuthToken);

          // 기존 요청에 새로 발급된 토큰을 추가하여 다시 요청합니다.
          originalRequest.headers.Authorization = `Bearer ${newAuthToken}`;
          return axios(originalRequest);
        })
        .catch((error) => {
          // 토큰 재발급에 실패한 경우 로그인 페이지로 이동하거나 다른 작업을 수행합니다.
          // 여기에 오류 처리 코드를 작성합니다.
          return Promise.reject(error);
        });
    }
    return Promise.reject(error);
  }
);

export default instance;
