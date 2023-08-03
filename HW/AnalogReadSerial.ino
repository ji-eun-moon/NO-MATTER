void setup() {
    Serial.begin(256000); // 아두이노와 설정한 BaudRate에 맞게 수정해주세요.
}

void loop() {
    // 데이터를 보낼 로직을 작성
    int sensorValue = analogRead(A0);
    String message =  String(sensorValue);
    Serial.println(message); // 문자열을 시리얼 포트를 통해 전송
}
