#include <iostream>
#include <cstring>
#include <vector>
#include <string>
#include <fstream>

using namespace std;



string rcName = "ssafy_TV";//������ �̸�
string btnName = "SWITCH_aa";







void find_set_sig(string* addstr)
{
	char path[100];
	bool isSig = 0;//��ȣ�� �ԷµǾ����� True

	while (!isSig)
	{
		vector<int> v[3];//���� ��ȣ �迭

		bool canStart = 0, canEnd = 0;//��ȣ�� �Է� ��������, ��ȣ�� �Է��� ���� �� �ִ���
		int orderNum = 0;//�����ȣ�� �Էµ� Ƚ��

		//��ȣ�� 3�� �Է� �޴´�.
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

		//��ȣ�� ������ �ִ��� Ȯ��
		bool sigFind = false;//���� ��ȣ�� ã�Ҵ�.
		int sigFindNum = 0;//���� ��ȣ�� 0,1�̸� 1 //���� ��ȣ�� 1,2�̸� 2 //���� ��ȣ�� 0,2�̸� 3

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

		if (!sigFind)continue;//��ȣ�� ��ã�Ҵٸ� �ٽ� ó������
		else isSig = true;


		//ã�Ҵٸ� setText�� �Է�
		int input_sigSize = v[sigFindNum - 1].size();

		for (int i = 0; i < input_sigSize - 1; i++)
		{
			if (i % 6 == 0)*addstr += "\n";
			*addstr += ("\t" + to_string(v[sigFindNum - 1][i]));
		}
	}
}




//��ȣ�� ����ϴ� ���μ���
int main() {

	char path[100];

	string frontText = "begin remote\n	name  " + rcName + "\n	flags  RAW_CODES\n  eps             25\n  aeps            100\n\n  ptrail          0\n  repeat    0     0\n  gap       20921\n\n  begin raw_codes";
	string addstr = "\n\tname " + btnName;

	ifstream inputFile(rcName + ".lircd.conf");

	if (inputFile) {// ������.lircd.conf������ �ִ� ���
		string cur_commend = "\n\n";
		bool is_commend = false;
		//������.lircd.conf���� �ȿ� �ִ� ��ɾ� ��������
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


		//������ ��ɾ ���ο� ��ɾ� �߰��ϱ�
		find_set_sig(&addstr);

		ofstream outputFile(rcName + ".lircd.conf");
		if (outputFile.is_open()) {
			outputFile << frontText + addstr + cur_commend;
			outputFile.close();
			cout << "�� ���� �Ǿ����ϴ�.";
		}
		else {
			cout << "������ ���µ� �����߽��ϴ�.";
		}
	}
	else {
		// ������.lircd.conf������ ���°��

		find_set_sig(&addstr);


		addstr += "\n\tend raw_codes\nend remote";

		ofstream outputFile(rcName + ".lircd.conf");
		if (outputFile.is_open()) {
			outputFile << frontText + addstr;
			outputFile.close();
			cout << "�� ���� �Ǿ����ϴ�.";
		}
		else {
			cout << "������ ���µ� �����߽��ϴ�.";
		}

	}


	return 0;
}


