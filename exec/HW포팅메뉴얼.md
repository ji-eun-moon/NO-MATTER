# HW 포팅 메뉴얼

## 목차
1. 소개
2. 요구 사항
3. 코드 포팅 절차
    3.1. 라이브러리 및 의존성 설치
    3.2. 코드 이식
    3.3. 하드웨어 설정
4. 빌드 및 실행
5. 문제 해결
6. 참고 사항

<hr/>

### 1. 소개:
이 문서는 NoMatter프로젝트의 허브에 코드를 다른 환경으로 포팅하기 위한 절차를 안내합니다. 주어진 코드는 라즈베리 파이와 관련된 GPIO 제어 및 Socket.IO 기능을 포함하고 있습니다.

### 2. 요구 사항:

- 목표 플랫폼: 리눅스 기반 - 라즈비안(Raspbian GNU/Linux 11) 및 우분투(22.04.3 LTS) 환경에서 진행하였습니다.
- 컴파일러 및 빌드 도구: g++
- WiringPi 라이브러리: 리눅스의 GPIO 제어를 위한 WiringPi 라이브러리가 필요합니다.
- JsonCpp 라이브러리:  JSON 데이터를 다루기 위한 라이브러리로, 코드에서 JSON 파싱 및 생성을 위해 필요합니다.
- sio_client 라이브러리: Socket_io 라이브러리로 실시간 웹 기술을 지원하며, 서버와 클라이언트 간의 양방향 통신을 단순화하는데 필요합니다.
- lirc 라이브러리: IR신호를 구조화하고 송수신을 하기 위한 프로토콜을 위해 필요합니다.

### 3. 코드 포팅 절차:

    3.1. 라이브러리 및 의존성 설치:

    리눅스 플랫폼에서 
    - lirc 라이브러리 설치(sudo apt-get install lirc -y)
    - WiringPi 라이브러리 설치(git clone https://github.com/WiringPi/WiringPi )
    - Jsoncpp 라이브러리 설치(https://github.com/open-source-parsers/jsoncpp )
        1) 컴파일 한다. 
            python amalgamate.py
        2) 컴파일 결과 파일 확인
            컴파일이 정상 동작하면, 아래와 같은 3개 파일이 만들어진다.
            jsoncpp.cpp
            json.h
            json-forward.h
        3) 설치 및 심볼릭 링크 설정
            sudo apt-get install libjsoncpp-dev
            sudo ln -s /usr/include/jsoncpp/json/ /usr/include/json

    3.2. 코드 이식:
    - lirc 라이브러리 설정
    ```
    #/boot/config.txt or /boot/firmware/config.txt에서 변경(없으면 입력)
    #dtoverlay=gpio-ir,gpio_pin=17
    #dtoverlay=gpio-ir-tx,gpio_pin=18

    dtoverlay=gpio-ir,gpio_pin=18
    dtoverlay=gpio-ir-tx,gpio_pin=17

    ```

    ```
    # /etc/lirc/hardware.conf에서 입력
    LIRCD_ARGS="--uinput --listen"
    LOAD_MODULES=true
    DRIVER="default"
    DEVICE="/dev/lirc0"
    MODULES="lirc_rpi"
    ```

    ```
    # /etc/lirc/lirc_options.conf에서 변경
    #driver         = devinput
    #device         = auto
    driver          = default
    device          = /dev/lirc0
    ```
    - 
    주어진 코드 파일들을 대상 환경으로 복사합니다.
    필요한 헤더 파일과 라이브러리를 정확한 경로로 변경합니다.

    3.3. 하드웨어 설정:

    


### 4. 빌드 명령어:
g++ -std=c++11 -I./socket.io-client-cpp/lib/asio/asio/include -I./socket.io-client-cpp/lib/websocketpp -I./socket.io-client-cpp/lib/rapidjson/include -I./socket.io-client-cpp/src -DASIO_STANDALONE -D_WEBSOCKETPP_CPP11_STL_ -D_WEBSOCKETPP_CPP11_FUNCTIONAL_ -o runNomatter main.cpp commands.cpp routine_manager.cpp ./socket.io-client-cpp/src/sio_client.cpp ./socket.io-client-cpp/src/sio_socket.cpp ./socket.io-client-cpp/src/internal/sio_client_impl.cpp ./socket.io-client-cpp/src/internal/sio_packet.cpp -lpthread -lwiringPi -ljsoncpp


컴파일러 및 빌드 도구를 사용하여 코드를 빌드합니다.
빌드된 실행 파일을 실행하여 코드의 동작을 확인합니다.
### 5. 문제 해결:

코드를 빌드하는 동안 발생하는 컴파일 에러나 링크 에러를 해결합니다.
실행 중에 발생하는 문제 또는 오류를 해결합니다.
### 6. 참고 사항:

코드에서 사용되는 라이브러리 버전 및 의존성을 확인하고 필요에 따라 업데이트합니다.
코드를 다른 플랫폼으로 포팅하는 과정에서 플랫폼 특정한 차이점을 고려합니다.
코드의 특정 부분을 주석 처리하거나 수정하여 필요한 기능만 유지하거나 추가할 수 있습니다.
최종 단계:
이 포팅 메뉴얼을 참조하여 주어진 코드를 대상 플랫폼으로 성공적으로 포팅하실 수 있습니다. 각 단계를 차례대로 수행하면서 문제가 발생하면 해당 문제를 해결하기 위해 인터넷 검색, 레퍼런스 문서 및 커뮤니티 지원을 활용하시면 됩니다.