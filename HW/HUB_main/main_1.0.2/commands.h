#ifndef COMMENDS_H
#define COMMENDS_H

#include <string>

void find_set_sig(std::string* addstr);

void COMMAND_add(std::string rcName,std::string btnName);
void COMMAND_controll(std::string rcName,std::string btnName);
void COMMAND_share();


bool isWiFiConnected();


#endif
