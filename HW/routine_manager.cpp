#include "commands.h"
#include "routine_manager.h"
#include <iostream>
#include <fstream>
#include <ctime>
#include <thread>
#include <map>
#include <string>
#include <json/json.h>

using namespace std;

void readRoutineInfo(const std::string& filename, Json::Value& routineInfo) {
    std::ifstream file(filename);
    if (file.is_open()) {
        file >> routineInfo;
        file.close();
    } else {
        std::cerr << "Failed to open JSON file: " << filename << std::endl;
    }
}


void checkAndRunRoutines() {
    Json::Value routineInfo;
    std::map<std::string, int> dayMap;
    dayMap["일"] = 0;
    dayMap["월"] = 1;
    dayMap["화"] = 2;
    dayMap["수"] = 3;
    dayMap["목"] = 4;
    dayMap["금"] = 5;
    dayMap["토"] = 6;

    int weatherCnt = 0;
    while (true) {
    	readRoutineInfo("./myRoutines.txt", routineInfo);
        std::time_t currentTime = std::time(nullptr);
        struct std::tm* timeinfo = std::localtime(&currentTime);

        for (const auto& routine : routineInfo) {
			cout << routine << endl;
			std::string kind = routine["kind"].asString();
			ifstream json_file("weather_data.json");
			json data;
			json_file >> data;
			json_file.close();
			if(kind == "schedule") {
				cout << "Routine: " << kind << endl;
				const Json::Value& alarmDaysofWeek = routine["condition"]["day"];
				for(const Json::Value& alarmDayofWeek : alarmDaysofWeek) {
					int alarmHour = routine["condition"]["hour"].asInt();
					int alarmMinute = routine["condition"]["minute"].asInt();
					string alarmAmPm = routine["condition"]["ampm"].asString();
					
					if(alarmAmPm=="pm") alarmHour += 12;
					cout << "schedule: " << alarmDayofWeek.asString() << alarmHour << ":" << alarmMinute << alarmAmPm;
					if (timeinfo->tm_hour == alarmHour && timeinfo->tm_min == alarmMinute && timeinfo->tm_wday == dayMap[alarmDayofWeek.asString()]) {
						std::string remoteCode = routine["selectedRemote"]["remoteCode"].asString();
						std::string remoteAction = routine["selectedRemoteAction"].asString();
						COMMAND_controll(remoteCode, remoteAction);
					}
				}
			}
			else if(kind == "temp") {
				std::string temp = routine["condition"].asString();
				if(temp == data["tmp"]) COMMAND_controll(remoteCode, remoteAction);
			} 
			else if(kind == "humidity") {
				std::string humidity = routine["condition"].asString();
				if(humidity == data["hum"]) COMMAND_controll(remoteCode, remoteAction);
			}
			else if(kind == "weather") {
				std::string weather = routine["condition"].asString();
				if(weather == data["wth"]) COMMAND_controll(remoteCode, remoteAction);
			}
        }
        std::this_thread::sleep_for(std::chrono::minutes(1));
    }
}
