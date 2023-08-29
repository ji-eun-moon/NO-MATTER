#ifndef ROUTINE_MANAGER_H
#define ROUTINE_MANAGER_H

#include <json/json.h>

void readRoutineInfo(const std::string& filename, Json::Value& routineInfo);
void checkAndRunRoutines();

#endif

