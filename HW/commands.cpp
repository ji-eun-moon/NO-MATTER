//commands.cpp

#include <iostream>
#include <string>
#include <stdio.h>
#include <vector>
#include <cstring>
#include <string>
#include <fstream>
#include <cstdlib>
#include <sstream>
#include "commands.h"
#include "sio_client.h"


using namespace std;


//- 리모컨 신호를 받아오는 함수---------------------------------------------------------------
void find_set_sig(string* addstr)
{
    char path[1000];
    bool isSig = 0;//신호가 입력되었을때 True

    while (!isSig)
    {
        vector<int> v[3];//정상 신호 배열

        bool canStart = 0, canEnd = 0;//신호가 입력 가능한지, 신호가 입력이 끝날 수 있는지
        int orderNum = 0;//정상신호가 입력된 횟수

        //신호를 3번 입력 받는다.
        

        FILE* fp = popen("sudo mode2 -m -d /dev/lirc0", "r");


        if (fp == nullptr) {
            cout << "Error" << endl;
        }
    
  
    
        while (fgets(path, sizeof(path) - 1, fp) != nullptr)
        {
            int num[6];
            int numRead = sscanf(path, "%d %d %d %d %d %d", &num[0], &num[1], &num[2], &num[3], &num[4], &num[5]);
            if (canStart == 0 && numRead == -1)canStart = true;
            if (canStart && numRead == 6) {

                for (int i = 0; i < 6; i++)
                    v[orderNum].push_back(num[i]);
                canEnd = true;
            }
            else if (canEnd) {
                canStart = false; canEnd = false;
                for (int i = 0; i < numRead; i++)
                    v[orderNum].push_back(num[i]);
                orderNum++;
            cout<<"입력을 받았습니다."<<endl;
            }

            if (orderNum >= 3) {
                orderNum = 0;
                system("pkill mode2");
                cout<<"받기 끝"<<endl;
                if(pclose(fp)!=-1)cout<<"성공"<<endl;
                else cout<<"실패"<<endl;
                fflush(fp);
               
                break;
            }
        }
        
        cout<<"같은신호 찾기 시작"<<endl;
        //신호가 같은게 있는지 확인
        bool sigFind = false;//같은 신호를 찾았다.
        int sigFindNum = 0;//같은 신호가 0,1이면 1 //같은 신호가 1,2이면 2 //같은 신호가 0,2이면 3
        cout<<v[0].size()<<v[1].size()<<v[2].size()<<endl;
        if (v[0].size() == v[1].size()) {
            int sigSize = v[0].size();
            bool same = true;
            for (int n = 0; n < sigSize - 1; n++)
            {
                cout<<v[0][n]<<' '<<v[1][n]<<endl;
                if (v[0][n]-v[1][n]>150||v[0][n]-v[1][n]<-150) {
                    same = false; 
                    cout<<"1번 탈락"<<endl;
                    break;
                }
            }
            if (same) {
                sigFind = true; sigFindNum = 1;
                cout<<"0번 1번같네 "<<endl;
            }
        }
        if (!sigFind && v[1].size() == v[2].size()) {
            int sigSize = v[1].size();
            bool same = true;
            for (int n = 0; n < sigSize - 1; n++)
            {
                if (v[1][n]-v[2][n]>150||v[1][n]-v[2][n]<-150) {
                    same = false; 
                    cout<<"2번 탈락"<<endl;break;
                }
            }
            if (same) {
                sigFind = true; sigFindNum = 2;
        cout<<"2번 1번같네 "<<endl;
            }
        }
        if (!sigFind && v[0].size() == v[2].size()) {
            int sigSize = v[0].size();
            bool same = true;
            for (int n = 0; n < sigSize - 1; n++)
            {
                if (v[2][n]-v[0][n]>150||v[2][n]-v[0][n]<-150) {
                    same = false;
                    cout<<"3번 탈락"<<endl; break;
                }
            }
            if (same) {
                sigFind = true; sigFindNum = 3;
                cout<<"0번 2번같네 "<<endl;
            }
        }

        if (!sigFind)continue;//신호를 못찾았다면 다시 처음부터
        else isSig = true;


        //찾았다면 setText에 입력
        int input_sigSize = v[sigFindNum - 1].size();

        for (int i = 0; i < input_sigSize - 1; i++)
        {
            if (i % 6 == 0)*addstr += "\n";
            *addstr += ("\t" + to_string(v[sigFindNum - 1][i]));
        }
        cout<<"입력 끝"<<endl;
        
    }
   

}




//RC-----------------------------------------------------------------------------------------------------
bool COMMAND_add(string rcName, string btnName) {
    cout<<"Add"<<endl;
 char path[3000];

    string frontText = "begin remote\n    name  " + rcName + "\n    flags  RAW_CODES\n  eps             25\n  aeps            100\n\n  ptrail          0\n  repeat    0     0\n  gap       20921\n\n  begin raw_codes";
    string addstr = "\n\tname " + btnName;

    ifstream inputFile("/etc/lirc/lircd.conf.d/"+rcName + ".lircd.conf");
    

    if (inputFile) {// 리모컨.lircd.conf파일이 있는 경우
        string cur_commend = "\n\n";
        string fileName="/etc/lirc/lircd.conf.d/"+rcName+".lircd.conf";
        bool is_commend = false;
        //리모컨.lircd.conf파일 안에 있는 명령어 가져오기
        FILE* fpp = fopen(fileName.c_str(), "r");
        
        if (fpp == nullptr) {
            cout << "Error" << endl;
        }
        cout<<"파일이 있는경우"<<endl;
        while (fgets(path, sizeof(path) - 1, fpp) != nullptr)
        {
            if (is_commend) {
                string line(path);
                cur_commend += line;
            }
           
            char* foundPosition = strstr(path, "begin raw_codes");
            if (foundPosition != nullptr)
                is_commend = true;
            
            for (int i = 0; i < 50; i++)path[i] = ' ';
            
        }
         cout<<"파일 읽었어요"<<endl;

        //가져온 명령어에 새로운 명령어 추가하기
        find_set_sig(&addstr);
        cout<<"버튼 신호 가져왔어"<<endl;
        ofstream outputFile(rcName + ".lircd.conf");
        if (outputFile.is_open()) {
            outputFile << frontText<<addstr<<cur_commend;
            outputFile.close();
            cout << "잘 저장 되었습니다.";
            std::string command = "sudo mv " +rcName + ".lircd.conf /etc/lirc/lircd.conf.d/";
            int result = system(command.c_str());
            return 1;
        }
        else {
            cout << "파일을 여는데 실패했습니다.";
            return 0;
        }
    }
    else {
        // 리모컨.lircd.conf파일이 없는경우

        find_set_sig(&addstr);


        addstr += "\n\tend raw_codes\nend remote";
    cout<<addstr<<endl;

        ofstream outputFile(rcName + ".lircd.conf");
        if (outputFile.is_open()) {
            outputFile << frontText + addstr;
            outputFile.close();
            cout << "잘 저장 되었습니다.";
            std::string command = "sudo mv " +rcName + ".lircd.conf /etc/lirc/lircd.conf.d/";
            int result = system(command.c_str());
            return 1;
        }
        else {
            cout << "파일을 여는데 실패했습니다.";
            return 0;
        }

    }
    return 0;
}
//-----------------------------------------------------------------------------------
void COMMAND_controll(string rcName, string btnName) {
    cout<<"Controll"<<rcName<<' '<<btnName<<endl;
        string command = "irsend SEND_ONCE " + rcName + " " + btnName;
        const char* cmd = command.c_str();
        int result = system(cmd);

        if (result == 0) {
            cout << "Command executed successfully." << std::endl;
        }
        else {
            cerr << "Command execution failed." << std::endl;
        }    
}    
//-----------------------------------------------------------------------------------
// 리모컨 안에 버튼을 제거하는 경우
void COMMAND_REMOVE(string rcName) {
    std::string fileName = rcName+".lircd.conf";
    std::string filePath = "/etc/lirc/lircd.conf.d/" + fileName;
    
    std::cout << "Removing file: " << filePath << std::endl;
    
    // Execute the "sudo rm" command to remove the file
    std::string command = "sudo rm " + filePath;
    int result = system(command.c_str());
    
    if (result == -1) {
        std::cerr << "Failed to execute rm command." << std::endl;
        return;
    }
}
// 리모컨 안에 버튼을 제거하는 경우
void COMMAND_REMOVE(string rcName, string btnName) {
    std::string fileName = rcName+".lircd.conf";
    std::string filePath = "/etc/lirc/lircd.conf.d/";
    std::string nameBtn = "name " + btnName;
    
    std::cout << "Processing file: " << filePath << std::endl;
    
    std::ifstream inputFile(filePath);
    if (!inputFile.is_open()) {
        std::cerr << "Error opening file: " << filePath << std::endl;
        return;
    }
    //파일이 열리고 난 이후 
    std::stringstream updatedContent;
    std::string line;
    bool skipSection = false;  // 해당 섹션을 스킵할지 여부
    
    while (std::getline(inputFile, line)) {
        if (line.find(nameBtn) != std::string::npos) {
            skipSection = true;  // 해당 섹션을 스킵
        } 
        else if (skipSection && line.empty()) {
            skipSection = false;  // 스킵 모드 해제
        }
        if (!skipSection) {
            updatedContent << line << std::endl;  // 스킵되지 않은 내용 추가
        }
    }
    
    inputFile.close();
    
    // 원래 파일을 지우고 새로운 내용으로 덮어쓰기
    std::ofstream outputFile(fileName);
    outputFile << updatedContent.str();
    outputFile.close();
    std::string command = "sudo mv " +fileName+" /etc/lirc/lircd.conf.d/";
    int result = system(command.c_str());
    
    std::cout << "Content removed." << std::endl;
}


//IR--------------------------------------------------------------------------------
//IR_RECEIVE함수 수신상태로 상태 변환 후 재시작 -----------------------------------------------------------
void IR_RECEIVE(){
    std::string configFilePath = "/boot/firmware/config.txt";
    std::ifstream configFile(configFilePath);
    
    if (!configFile.is_open()) {
        std::cout << "Error opening " << configFilePath << std::endl;
        return;
    }
    
    std::string line;
    std::string targetLine = "dtoverlay=gpio-ir-tx,gpio_pin=17";  // 타겟 라인
    
    std::ofstream tempFile("temp_config.txt");
    
    bool lineFound = false;
    
    while (std::getline(configFile, line)) {
        if (line.find(targetLine) != std::string::npos) {
            lineFound = true;
            if (line[0] == '#') {
                tempFile << line << std::endl;  // 주석 제거
            } else {
                tempFile << "#" << line << std::endl;      // 주석 추가
            }
        } else {
            tempFile << line << std::endl;
        }
    }
    
    configFile.close();
    tempFile.close();
    
    if (lineFound) {
        std::ifstream tempFileRead("temp_config.txt");
        std::ofstream configFileWrite("config.txt");
        
        while (std::getline(tempFileRead, line)) {
            configFileWrite << line << std::endl;
        }
        
        tempFileRead.close();
        configFileWrite.close();
        
        // 임시 파일 삭제
        remove("temp_config.txt");
        std::string command = "sudo mv config.txt /boot/firmware/";
        int result = system(command.c_str());
        
        std::cout << "Receive state change completed." << std::endl;
    } 
    else {
        std::cout << "Target line not found." << std::endl;
    }
     
    int result = system("sudo reboot");
    
    if (result == -1) {
        std::cerr << "Failed to execute reboot command." << std::endl;
        return;
    }

    
}


//IR_TRANSMIT함수 송신상태로 상태 변환 후 재시작 -----------------------
void IR_TRANSMIT(){
    std::string configFilePath = "/boot/firmware/config.txt";
    std::ifstream configFile(configFilePath);
    
    if (!configFile.is_open()) {
        std::cout << "Error opening " << configFilePath << std::endl;
        return;
    }
    
    std::string line;
    std::string targetLine = "dtoverlay=gpio-ir-tx,gpio_pin=17";  // 타겟 라인
    
    std::ofstream tempFile("temp_config.txt");
    
    bool lineFound = false;
    
    while (std::getline(configFile, line)) {
        if (line.find(targetLine) != std::string::npos) {
            lineFound = true;
            if (line[0] == '#') {
                tempFile << line.substr(1) << std::endl;  // 주석 제거
            } else {
                tempFile << line << std::endl;      // 주석 추가
            }
        } else {
            tempFile << line << std::endl;
        }
    }
    
    configFile.close();
    tempFile.close();
    
    if (lineFound) {
        std::ifstream tempFileRead("temp_config.txt");
        std::ofstream configFileWrite("config.txt");
        
        while (std::getline(tempFileRead, line)) {
            configFileWrite << line << std::endl;
        }
        
        tempFileRead.close();
        configFileWrite.close();
        
        // 임시 파일 삭제
        remove("temp_config.txt");
        std::string command = "sudo mv config.txt /boot/firmware/";
        int result = system(command.c_str());
        
        std::cout << "Receive state change completed." << std::endl;
    } 
    else {
        std::cout << "Target line not found." << std::endl;
    }
     
    int result = system("sudo reboot");
    
    if (result == -1) {
        std::cerr << "Failed to execute reboot command." << std::endl;
        return;
    }
    
    
}
//IR_STATUS함수 상태를 반 환 -----------------------
int IR_STATUS(){
    
    //현재 상태를 찾기 true면 수신 false면 송신 
    std::string configFilePath = "/boot/firmware/config.txt";
    std::ifstream configFile(configFilePath);
    
    if (!configFile.is_open()) {
        std::cout << "Error opening " << configFilePath << std::endl;
        return -1;
    }
    
    std::string line;
    std::string targetLine = "dtoverlay=gpio-ir-tx,gpio_pin=17";  // 타겟 라인
    

    
    bool irStatus_receive = false;
    
    while (std::getline(configFile, line)) {
        if (line.find(targetLine) != std::string::npos) {
            //lineFound = true;
            if (line[0] == '#') {
                irStatus_receive=1;
                break;
            } else {
                irStatus_receive=0;
                break;
            }
        }
    }
    
    configFile.close();
    
    
    return irStatus_receive;
    
}







//와이파이 확인 함수------------------------------------------------------------
bool isWiFiConnected() {
    // 실행할 명령어
    const char* cmd = "iwconfig wlan0 | grep -i 'essid'";

    // 명령어를 실행하고 결과를 읽어옴
    FILE* pipe = popen(cmd, "r");
    if (!pipe) {
        std::cerr << "Error executing command." << std::endl;
        return false;
    }

    // 명령어 실행 결과를 읽어서 문자열로 저장
    char buffer[128];
    std::string result = "";
    while (!feof(pipe)) {
        if (fgets(buffer, 128, pipe) != NULL)
            result += buffer;
    }

    // 명령어 실행 결과에 'ESSID:"' 문자열이 포함되어 있다면 와이파이 연결이 있음을 의미
    if (result.find("ESSID:") != std::string::npos) {
        return true;
    }

    pclose(pipe);
    return false;
}

