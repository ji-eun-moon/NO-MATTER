#include "commands.h"
#include "routine_manager.h"
#include <iostream>
#include <fstream>
#include <ctime>
#include <thread>
#include <map>
#include <string>
#include <json/json.h>
/*
void readRoutineInfo(const std::string& filename, Json::Value& routineInfo) {
    std::ifstream file(filename);
    if (file.is_open()) {
        file >> routineInfo;
        file.close();
    } else {
        std::cerr << "Failed to open JSON file: " << filename << std::endl;
    }
}
*/

using namespace std;

void checkAndRunRoutines(const Json::Value& routineInfo) {
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
        std::time_t currentTime = std::time(nullptr);
        struct std::tm* timeinfo = std::localtime(&currentTime);
	std::string kind = routine["kind"].asString();

        for (const auto& routine : routineInfo) {
	    if(kind == "schedule") {
		const Json::Value& alarmDaysofWeek = routine["condition"]["day"];
		
		for(Json::Value& alarmDayofWeek : alarmDaysofWeek) {
            	    int alarmHour = routine["condition"]["hour"].asInt();
            	    int alarmMinute = routine["condition"]["minute"].asInt();
		    int alarmAmPm = routine["condition"]["ampm"].asString();
		
		    if(alarmAmPm=="pm") alarmHour += 12;

            	    if (timeinfo->tm_hour == alarmHour && timeinfo->tm_min == alarmMinute && timeinfo->tm_wday == dayMap[alarmDayOfWeek]) {
                        // It's time~~~
		        std::string remoteCode = routine["selectedRemote"]["remoteCode"].asString();
		        std::string remoteAction = routine["selectedRemoteAction"].asString();
		        COMMAND_controll(remoteCode, remoteAction);
            	    }
		}
	    }
	    else if(kind == "temp") {
		std::string temp = routine["condition"].asString();
		//if문으로 현재 날씨와 맞다면 실행
	    } 
	    else if(kind == "humidity") {
		std::string humidity = routine["condition"].asString();
	    }
	    else if(kind == "weather") {
		std::string weather = routine["condition"].asString();
	    }

        }

        std::this_thread::sleep_for(std::chrono::minutes(1));
    }
}
