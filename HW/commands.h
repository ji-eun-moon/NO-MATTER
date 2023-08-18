//commands.h

#ifndef COMMENDS_H
#define COMMENDS_H

#include <string>

using namespace std;

void find_set_sig(std::string* addstr);

bool COMMAND_add(std::string rcName,std::string btnName);
void COMMAND_controll(std::string rcName,std::string btnName);
void COMMAND_REMOVE(string rcName);
void COMMAND_REMOVE(string rcName, string btnName);

int IR_STATUS();
void IR_RECEIVE();
void IR_TRANSMIT();


bool isWiFiConnected();


#endif
