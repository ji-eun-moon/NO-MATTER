#include <iostream>
#include <windows.h>
#include <string>
#include <fstream>
#include <vector>
#include <cstdint>
#include <sstream>

int main() {
    // 시리얼 포트 설정
    HANDLE hSerial;
    LPCWSTR portName = L"\\\\.\\COM6"; // 시리얼 포트 문자열을 유니코드로 변환
    hSerial = CreateFile(portName, GENERIC_READ | GENERIC_WRITE, 0, 0, OPEN_EXISTING, FILE_ATTRIBUTE_NORMAL, 0);
    if (hSerial == INVALID_HANDLE_VALUE) {
        if (GetLastError() == ERROR_FILE_NOT_FOUND) {
            std::cerr << "Error: Serial port not available.\n";
        }
        else {
            std::cerr << "Error: Unable to open serial port.\n";
        }
        return 1;
    }

    // 시리얼 통신 설정
    DCB dcbSerialParams = { 0 };
    dcbSerialParams.DCBlength = sizeof(dcbSerialParams);
    if (!GetCommState(hSerial, &dcbSerialParams)) {
        std::cerr << "Error: Unable to get serial parameters.\n";
        CloseHandle(hSerial);
        return 1;
    }

    dcbSerialParams.BaudRate = CBR_256000; // 아두이노와 설정한 BaudRate에 맞게 수정해주세요.
    dcbSerialParams.ByteSize = 8;
    dcbSerialParams.StopBits = ONESTOPBIT;
    dcbSerialParams.Parity = NOPARITY;

    if (!SetCommState(hSerial, &dcbSerialParams)) {
        std::cerr << "Error: Unable to set serial parameters.\n";
        CloseHandle(hSerial);
        return 1;
    }

    // 데이터 받기
    char buffer[100];
    std::vector<int16_t> audioData;

    DWORD bytesRead;
    std::string receivedData; // 받은 데이터를 임시로 저장할 변수
    while (audioData.size()<100000) {
        if (ReadFile(hSerial, buffer, sizeof(buffer), &bytesRead, NULL)) {
            if (bytesRead > 0) {
                for (DWORD i = 0; i < bytesRead; ++i) {
                    if (buffer[i] == '\n') { // 개행 문자를 만나면 출력
                        std::cout << "Received: " << receivedData << std::endl;
                        int16_t intNumber;
                        std::stringstream ss2(receivedData);
                        ss2 >> intNumber;
                        audioData.push_back(intNumber);
                        receivedData.clear(); // 임시 변수 초기화
                    }
                    else {
                        receivedData += buffer[i]; // 받은 데이터를 임시 변수에 추가
                    }
                }
            }
        }
        else {
            std::cerr << "Error: Unable to read from serial port.\n";
            break;
        }
    }

    // 시리얼 포트 닫기
    CloseHandle(hSerial);

    std::ofstream outFile("output.wav", std::ios::binary);

    // WAV 파일로 저장
    if (!outFile) {
        std::cerr << "Error: Unable to create output file.\n";
        return 1;
    }

    outFile << "RIFF----WAVEfmt "; // WAVE 포맷
    int headerSize = 16;
    outFile.write(reinterpret_cast<const char*>(&headerSize), 4); // 헤더 크기
    int16_t audioFormat = 1;
    outFile.write(reinterpret_cast<const char*>(&audioFormat), 2); // 오디오 포맷 (PCM)
    int16_t numChannels = 1;
    outFile.write(reinterpret_cast<const char*>(&numChannels), 2); // 채널 수 (1: 모노, 2: 스테레오)
    int32_t sampleRateInt32 = 6000;
    outFile.write(reinterpret_cast<const char*>(&sampleRateInt32), 4); // 샘플링 레이트 (Hz)
    int32_t byteRate = 6000 * numChannels * sizeof(int16_t);
    outFile.write(reinterpret_cast<const char*>(&byteRate), 4); // 바이트 레이트 (샘플링 레이트 * 채널 수 * 샘플 크기)
    int16_t blockAlign = numChannels * sizeof(int16_t);
    outFile.write(reinterpret_cast<const char*>(&blockAlign), 2); // 블록 얼라인 (채널 수 * 샘플 크기)
    int16_t bitsPerSample = 16;
    outFile.write(reinterpret_cast<const char*>(&bitsPerSample), 2); // 샘플 크기 (비트 단위)

    outFile << "data----"; // 데이터
    int dataSize = audioData.size() * sizeof(int16_t);
    outFile.write(reinterpret_cast<const char*>(&dataSize), 4); // 데이터 크기

    // 음성 데이터 저장
    outFile.write(reinterpret_cast<const char*>(&audioData[0]), dataSize);


    return 0;
}
