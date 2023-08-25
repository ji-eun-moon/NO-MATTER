# 허브 페이지

## 허브 등록
- 사용자는 허브 페이지에서 사용 가능한 허브 리스트를 확인 가능
- 허브 리스트 하단에 허브 추가 버튼을 통해 허브 추가 가능
- 초대 코드로 추가
  - 허브를 등록한 사람(admin)이
보내준 초대코드를 입력하여
허브 등록
- 직접 등록
  - 허브 - 스마트폰 간 블루투스 페어링을 통해 WiFi 정보를 전달하여 허브와 인터넷이 연결되면 허브 등록

| 초대 코드로 등록 | 직접 등록 |
|---|---|
| <img src="./image/%EC%B4%88%EB%8C%80%EC%BD%94%EB%93%9C%EB%A1%9C_%ED%97%88%EB%B8%8C%EC%B6%94%EA%B0%80.gif"  width="200" height="400"/>   |   |

## 리모컨 등록
- 허브 리스트에서 허브를 선택하여 허브에 등록된 리모컨 리스트 확인 가능
- 리모컨 리스트 하단에 리모컨 추가 버튼을 통해 리모컨 추가 가능
- 리모컨 등록을 위한 기본 UI 제공 (에어컨/선풍기/TV)

| 에어컨 | 선풍기 | TV |
|---|---|---|
| <img src="./image/UI%20_%EC%97%90%EC%96%B4%EC%BB%A8.png"  width="200" height="400"/>  |  <img src="./image/UI%20_%EC%84%A0%ED%92%8D%EA%B8%B0.png"  width="200" height="400"/> | <img src="./image/UI%20_TV.png"  width="200" height="400"/>  |

- 허브를 향해 리모컨 신호를 3번 이상 보내면 허브는 리모컨 학습

| 리모컨 등록 |
|---|
| <img src="./image/%EB%A6%AC%EB%AA%A8%EC%BB%A8%EC%B6%94%EA%B0%80.gif"  width="200" height="400"/>  |

- [LIRC 라이브러리](https://lirc-remotes.sourceforge.net/remotes-table.html)에서 
제공하는 
적외선 리모컨 신호 다운로드 가능

| 리모컨 다운로드 |
|---|
| <img src="./image/%EB%A6%AC%EB%AA%A8%EC%BB%A8%EB%8B%A4%EC%9A%B4%EB%A1%9C%EB%93%9C.gif"  width="200" height="400"/>  |

- 리모컨 리스트에서 리모컨을 선택하여 리모컨 사용 가능

| 리모컨 사용 |
|---|
| <img src="./image/%EB%A6%AC%EB%AA%A8%EC%BB%A8%EC%82%AC%EC%9A%A9.gif"  width="200" height="400"/>  |

## 허브 공유
- 허브를 직접 등록한 사용자는 허브 멤버 페이지에서 멤버 권한 수정/삭제 가능
- 허브 권한
  - admin : 허브 멤버 관리 가능, 리모컨 관리(추가/수정/삭제) 가능, 리모컨 사용 가능
  - manager : 리모컨 관리(추가/수정/삭제) 가능, 리모컨 사용 가능
  - user : 리모컨 관리(추가/수정/삭제) 가능, 리모컨 사용 가능

| 멤버 관리 | 멤버 초대 |
|---|---|
| <img src="./image/%EB%A9%A4%EB%B2%84%EA%B4%80%EB%A6%AC.gif"  width="200" height="400"/> | <img src="./image/%EB%A9%A4%EB%B2%84%EC%B4%88%EB%8C%80.gif"  width="200" height="400"/> |