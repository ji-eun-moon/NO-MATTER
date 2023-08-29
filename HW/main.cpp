#include "routine_manager.h"
#include "sio_client.h"
#include <functional>
#include <mutex>
#include <condition_variable>
#include <iostream>
#include <wiringPi.h>
#include <vector>
#include <string>
#include <cstring>
#include <unistd.h>
#include <thread>
#include <chrono>
#include <fstream>
#include <json/json.h>
#include "commands.h"

#define LEDRED 16
#define LEDGREEN 20
#define LEDBLUE 21

const int BUTTON_PIN = 17;
const int LED_PIN = 18;
volatile bool isPushed = false;

using namespace sio;
using namespace std;
std::mutex _lock;

std::condition_variable_any _cond;
bool connect_finish = false;
socket::ptr current_socket;

// routine json
Json::CharReaderBuilder reader;
Json::Value routineInfo;
std::string errs;

// topic
std::string sub_topic = "00000001-1d10-4282-b68c-e17c508b94f4/*";
std::string pub_topic;
std::string pub_msg;
sio::message::ptr data = sio::object_message::create();

// feedback component
int feedback_cnt = 0;


class connection_listener
{
    sio::client &handler;

public:
    
    connection_listener(sio::client& h):
    handler(h)
    {
    }
    

    void on_connected()
    {
        _lock.lock();
        _cond.notify_all();
        connect_finish = true;
        _lock.unlock();
    }
    void on_close(client::close_reason const& reason)
    {
        std::cout<<"sio closed "<<std::endl;
        exit(0);
    }
    
    void on_fail()
    {
        std::cout<<"sio failed "<<std::endl;
        exit(0);
    }
};

void mode_variation(string topic, string msg)
{
    digitalWrite(LEDRED, 0);
    digitalWrite(LEDGREEN, 1);
    digitalWrite(LEDBLUE, 0);
 
    


    if(topic=="ROUTINE") {
	std::ofstream outputFile("myRoutines.txt");
	if(outputFile.is_open()) {
	    //msg = msg.substr(1, msg.size() - 2);

	    outputFile << msg;
	    outputFile.close();
	    std::cout << "JSON data saved to myRoutines.txt" << std::endl;
	}
	else std::cerr << "Failed to open myRoutines.txt for writing" << std::endl;
	//std::istringstream jsonStream(msg);
	//Json::parseFromStream(reader, jsonStream, &routineInfo, &errs);
	//cout << jsonData["kind"]["condition"]["selectedRemote.controllerName"]["selectedRemoteAction"]["active"].asString() 
    }
    else if(topic=="CONTROLL") {
	int bp = msg.find('/');
	std::string rcName = msg.substr(0, bp);
        std::string btnName = msg.substr(bp + 1);
        COMMAND_controll(rcName, btnName);
    }
    else if(topic=="ADD") {
        int bp = msg.find('/');
        std::string rcName = msg.substr(0, bp);
        std::string btnName = msg.substr(bp + 1);
        bool feedback=COMMAND_add(rcName, btnName);
        
	feedback_cnt++;
	pub_topic = "00000001-1d10-4282-b68c-e17c508b94f4/RC/ADD/";
        if(feedback) pub_msg = "TRUE";
	else pub_msg = "FALSE";

	std::cout << "ADD end" << std::endl;
    }
    else if(topic=="REMOVE") {
	int bp = msg.find('/');
	if(bp != std::string::npos) {
	    std::string rcName = msg.substr(0, bp);
	    std::string btnName = msg.substr(bp + 1);
	    COMMAND_REMOVE(rcName, btnName);
	}
	else COMMAND_REMOVE(msg);
    }
    else if(topic=="TEST") {
    }
    else if(topic=="IR") {
	if(msg=="STATUS") {
	    bool HUB_status = IR_STATUS();

    	    pub_topic = "00000001-1d10-4282-b68c-e17c508b94f4/IR/";

	    if(HUB_status==1) {
	        pub_msg = "RECEIVE";
	    }
	    else if(HUB_status==0) {
	        pub_msg = "TRANSMIT";
	    }
	    else {	
	        pub_msg = "ERROR";
	    }
	    feedback_cnt++;
	}
	else if(msg=="RECEIVE") {
	    IR_RECEIVE();
	}
	else if(msg=="TRANSMIT") {
	    IR_TRANSMIT();
	}
    }
    else if(topic=="VOICE") {
	for(const auto& routine : routineInfo) {
	    cout << "VOICE: " << msg << endl;
	    if(msg == routine["condition"].asString()) {
	    	std::string remoteCode = routine["selectedRemote"]["remoteCode"].asString();
		std::string remoteAction = routine["selectedRemoteAction"].asString();
		COMMAND_controll(remoteCode, remoteAction);
	    }
    	}
    }
    digitalWrite(LEDGREEN, 0);
}


void sub_message()
{
	  current_socket->on("message", sio::socket::event_listener_aux([&](string const& name, message::ptr const& data, bool isAck,message::list &ack_resp)
    {
        _lock.lock();
        //cout << name << endl; //name is 'message'
        //cout << data->get_string() << endl;
	
	string combinedMsg = data->get_string();
	size_t bp = combinedMsg.find('#');
	string clientTopic = combinedMsg.substr(0, bp);
	string clientMsg = combinedMsg.substr(bp + 1);

	clientTopic.pop_back();
	size_t lastIndex = clientTopic.rfind('/');
	string lastPart = clientTopic.substr(lastIndex + 1);

	cout << lastPart << " | " << clientMsg << endl;
	mode_variation(lastPart, clientMsg);
        
        
        _lock.unlock();
    }));
}


void buttonInterrupt(){
  isPushed=true;
}

void ResetHub() {

}

int main() {
    wiringPiSetupGpio();

    pinMode(BUTTON_PIN,INPUT);
    pullUpDnControl(BUTTON_PIN, PUD_UP);
    wiringPiISR(BUTTON_PIN, INT_EDGE_FALLING, buttonInterrupt);

    //routine begining
    std::thread routineThread(checkAndRunRoutines);

    while (true)
    {
	digitalWrite(LEDRED, 1);
        digitalWrite(LEDGREEN, 0);
        digitalWrite(LEDBLUE, 0);

        if (bool netWork=isWiFiConnected()&&!isPushed) {
            digitalWrite(LEDRED, 0);
    	    digitalWrite(LEDGREEN, 0);
            digitalWrite(LEDBLUE, 0);


	    // Initialize connection
            sio::client h;
            connection_listener l(h);
            
            h.set_open_listener(std::bind(&connection_listener::on_connected, &l));
            h.set_close_listener(std::bind(&connection_listener::on_close, &l,std::placeholders::_1));
            h.set_fail_listener(std::bind(&connection_listener::on_fail, &l));
            h.connect("http://i9c105.p.ssafy.io:3002");
            
            _lock.lock();
            if(!connect_finish)
            {
        	cout << "wait\n";
                _cond.wait(_lock);
            }
        
            _lock.unlock();
            
            current_socket = h.socket();
	    current_socket->emit("subscribe", string_message::create(sub_topic));
	    sub_message();
            
	    //test
	    /*
    	    data->get_map()["topic"] = sio::string_message::create("00000001-1d10-4282-b68c-e17c508b94f4/IR/");

	    data->get_map()["message"] = sio::string_message::create("RECEIVE");
	    current_socket->emit("publish", data);
	    */
        while (true) {	
            cout << "whilewhile" << endl;
            sleep(1);
            if(feedback_cnt>0) {	
                        data->get_map()["topic"] = sio::string_message::create(pub_topic);
                    data->get_map()["message"] = sio::string_message::create(pub_msg);
                    current_socket->emit("publish", data);
                feedback_cnt--;
            }
		
            if(isPushed){
                isPushed=false;
                auto startTime = chrono::steady_clock::now();
                if (digitalRead(BUTTON_PIN)==LOW) {
                    auto currentTime = chrono::steady_clock::now();
                    auto elapsedTime = chrono::duration_cast<chrono::seconds>(currentTime - startTime).count();

                    if (elapsedTime >= 10) {
                        ResetHub();
                        break;
                    }  
                }
            
            }  
        }
        else {
            //connect new internet with ble
	    digitalWrite(LEDRED, 0);
	    digitalWrite(LEDGREEN, 0);
	    digitalWrite(LEDBLUE, 1);
	    cout << "Bluetooth begin" << endl;
            system("python3 ./gatt_server_read_write.py");
	    cout << "Bluetooth end" << endl;
	    digitalWrite(LEDBLUE, 0);
            sleep(10000); //10 Delay
        }
        
    }

    routineThread.join();

    return -1;
    }
}