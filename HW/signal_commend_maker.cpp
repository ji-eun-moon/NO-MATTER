#include <iostream>
#include <cstring>
#include <vector>
#include <string>
#include <fstream>

using namespace std;



string rcName = "ssafy_TV";//리모컨 이름
string btnName = "SWITCH_aa";







void find_set_sig(string* addstr)
{
	char path[100];
	bool isSig = 0;//신호가 입력되었을때 True

	while (!isSig)
	{
		vector<int> v[3];//정상 신호 배열

		bool canStart = 0, canEnd = 0;//신호가 입력 가능한지, 신호가 입력이 끝날 수 있는지
		int orderNum = 0;//정상신호가 입력된 횟수

		//신호를 3번 입력 받는다.
		FILE* fp = fopen("input.txt", "r");

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
			}

			if (orderNum == 3) {
				orderNum = 0;
				break;
			}
		}
		_pclose(fp);

		//신호가 같은게 있는지 확인
		bool sigFind = false;//같은 신호를 찾았다.
		int sigFindNum = 0;//같은 신호가 0,1이면 1 //같은 신호가 1,2이면 2 //같은 신호가 0,2이면 3

		if (v[0].size() == v[1].size()) {
			int sigSize = v[0].size();
			bool same = true;
			for (int n = 0; n < sigSize - 1; n++)
			{
				if (v[0][n] != v[1][n]) {
					same = false; break;
				}
			}
			if (same) {
				sigFind = true; sigFindNum = 1;
			}
		}
		if (!sigFind && v[1].size() == v[2].size()) {
			int sigSize = v[1].size();
			bool same = true;
			for (int n = 0; n < sigSize - 1; n++)
			{
				if (v[2][n] != v[1][n]) {
					same = false; break;
				}
			}
			if (same) {
				sigFind = true; sigFindNum = 2;
			}
		}
		if (!sigFind && v[0].size() == v[2].size()) {
			int sigSize = v[0].size();
			bool same = true;
			for (int n = 0; n < sigSize - 1; n++)
			{
				if (v[0][n] != v[2][n]) {
					same = false; break;
				}
			}
			if (same) {
				sigFind = true; sigFindNum = 3;
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
	}
}




//신호를 등록하는 프로세스
int main() {

	char path[100];

	string frontText = "begin remote\n	name  " + rcName + "\n	flags  RAW_CODES\n  eps             25\n  aeps            100\n\n  ptrail          0\n  repeat    0     0\n  gap       20921\n\n  begin raw_codes";
	string addstr = "\n\tname " + btnName;

	ifstream inputFile(rcName + ".lircd.conf");

	if (inputFile) {// 리모컨.lircd.conf파일이 있는 경우
		string cur_commend = "\n\n";
		bool is_commend = false;
		//리모컨.lircd.conf파일 안에 있는 명령어 가져오기
		FILE* fp = fopen("ssafy_TV.lircd.conf", "r");

		if (fp == nullptr) {
			cout << "Error" << endl;
		}
		while (fgets(path, sizeof(path) - 1, fp) != nullptr)
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


		//가져온 명령어에 새로운 명령어 추가하기
		find_set_sig(&addstr);

		ofstream outputFile(rcName + ".lircd.conf");
		if (outputFile.is_open()) {
			outputFile << frontText + addstr + cur_commend;
			outputFile.close();
			cout << "잘 저장 되었습니다.";
		}
		else {
			cout << "파일을 여는데 실패했습니다.";
		}
	}
	else {
		// 리모컨.lircd.conf파일이 없는경우

		find_set_sig(&addstr);


		addstr += "\n\tend raw_codes\nend remote";

		ofstream outputFile(rcName + ".lircd.conf");
		if (outputFile.is_open()) {
			outputFile << frontText + addstr;
			outputFile.close();
			cout << "잘 저장 되었습니다.";
		}
		else {
			cout << "파일을 여는데 실패했습니다.";
		}

	}


	return 0;
}


