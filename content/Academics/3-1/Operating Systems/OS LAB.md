---
title: OS Scheduling Algorithms
draft: false
tags:
---
# First-Come First-Serve (FCFS) 

```cpp
#include <bits/stdc++.h>
using namespace std;

struct Process{
	int pid, at, bt, ct=0, tat=0, wt=0;
};

int main() {
	int n; cin >> n; //Processes Number
	vector<Process> p;
	for (int i = 0 ; i < n; i++) {
		int at, bt; cin >> at >> bt;
		p.push_back({i+1, at, bt});
	}
	//The process with earliest Arrival Time get's the priority
	sort(p.begin(), p.end(), [](const Process& a, const Process& b) {return a.at < b.at;});

	int curTime = 0;
	for (int i = 0; i < n; i++) {
		curTime = max(curTime, p[i].at);
		curTime += p[i].bt;
		p[i].ct = curTime;

		p[i].tat = p[i].ct - p[i].at;
		p[i].wt = p[i].tat - p[i].bt;
	}

	float ttat = 0, twt = 0;
	cout << "PID\tAT\tBT\tCT\tTAT\tWT\n";
	for (auto i : p) {
		cout << i.pid << "\t" << i.at << "\t" << i.bt << "\t" << i.ct 
		<< "\t" << i.tat << "\t" << i.wt << "\n";
		ttat += i.tat, twt += i.wt;
	}
	cout << fixed << setprecision(2);
	cout << "AVG TAT: " << ttat/n << "\n";
	cout << "AVG WT : " << twt/n << "\n";
}
```

# Shortest Job First (SJF)


```cpp
#include <bits/stdc++.h>
using namespace std;

struct Process{
	int pid, at, bt, ct=0, tat=0, wt=0;
	bool complete = false;
};

int main() {
	int n; cin >> n; //Processes Number
	vector<Process> p;
	for (int i = 0 ; i < n; i++) {
		int at, bt; cin >> at >> bt;
		p.push_back({i+1, at, bt});
	}
	int completed = 0, curTime = 0;
	while (completed < n) {
		int idx = -1, minBurst = INT_MAX;
		// find the minimum burst time process and store it in idx
		for (int i = 0; i < n; i++) {
			if (!p[i].complete and p[i].at <= curTime and p[i].bt < minBurst) {
				minBurst = p[i].bt, idx = i;
			}
		}
		if (idx == -1){
			curTime++; continue;
		}
		curTime += p[idx].bt;
		p[idx].ct = curTime;
		p[idx].tat = p[idx].ct - p[idx].at;
		p[idx].wt = p[idx].tat - p[idx].bt;
		completed++;
		p[idx].complete = true;
	}
	
	float ttat = 0, twt = 0;
	cout << "PID\tAT\tBT\tCT\tTAT\tWT\n";
	for (auto i : p) {
		cout << i.pid << "\t" << i.at << "\t" << i.bt << "\t" << i.ct 
		<< "\t" << i.tat << "\t" << i.wt << "\n";
		ttat += i.tat, twt += i.wt;
	}
	cout << fixed << setprecision(2);
	cout << "AVG TAT: " << ttat/n << "\n";
	cout << "AVG WT : " << twt/n << "\n";
}
```
# Shortest Remaining Time First (Preemptive SJF)

```cpp
#include <bits/stdc++.h>
using namespace std;

struct Process{
	int pid, at, bt, rbt, ct=0, tat=0, wt=0;
	bool complete = false;
};

int main() {
	int n; cin >> n; //Processes Number
	vector<Process> p;
	for (int i = 0 ; i < n; i++) {
		int at, bt; cin >> at >> bt;
		p.push_back({i+1, at, bt, bt});
	}
	int completed = 0, curTime = 0;
	while (completed < n) {
		int idx = -1, minRBurst = INT_MAX;
		for (int i = 0; i < n; i++) {
			if (!p[i].complete and p[i].at <= curTime and p[i].rbt < minRBurst) {
				minRBurst = p[i].rbt, idx = i;
			}
		}
		if (idx == -1){
			curTime++; continue;
		}
		p[idx].rbt--;
		curTime++;
		if (p[idx].rbt == 0) {
			p[idx].ct = curTime;
			p[idx].tat = p[idx].ct - p[idx].at;
			p[idx].wt = p[idx].tat - p[idx].bt;
			completed++;
			p[idx].complete = true;
		}
	}
	
	float ttat = 0, twt = 0;
	cout << "PID\tAT\tBT\tCT\tTAT\tWT\n";
	for (auto i : p) {
		cout << i.pid << "\t" << i.at << "\t" << i.bt << "\t" << i.ct 
		<< "\t" << i.tat << "\t" << i.wt << "\n";
		ttat += i.tat, twt += i.wt;
	}
	cout << fixed << setprecision(2);
	cout << "AVG TAT: " << ttat/n << "\n";
	cout << "AVG WT : " << twt/n << "\n";
}
```
# Priority Scheduling  

```cpp
#include <bits/stdc++.h>
using namespace std;

struct Process{
	int pid, at, bt, pr, ct=0, tat=0, wt=0;
	bool complete = false;
};

int main() {
	int n; cin >> n; //Processes Number
	vector<Process> p;
	for (int i = 0 ; i < n; i++) {
		int at, bt, pr; cin >> at >> bt >> pr;
		p.push_back({i+1, at, bt, pr});
	}
	int completed = 0, curTime = 0;
	while (completed < n) {
		int idx = -1, minPR = INT_MAX;

		for (int i = 0; i < n; i++) {
			if (!p[i].complete and p[i].at <= curTime and (p[i].pr < minPR or 
				(p[i].pr == minPR and p[i].at < p[idx].at))) {
				minPR = p[i].pr, idx = i;
			}
		}
		if (idx == -1){
			curTime++; continue;
		}
		curTime += p[idx].bt;
		p[idx].ct = curTime;
		p[idx].tat = p[idx].ct - p[idx].at;
		p[idx].wt = p[idx].tat - p[idx].bt;
		completed++;
		p[idx].complete = true;
	}
	
	float ttat = 0, twt = 0;
	cout << "PID\tAT\tBT\tPR\tCT\tTAT\tWT\n";
	for (auto i : p) {
		cout << i.pid << "\t" << i.at << "\t" << i.bt << "\t" << i.pr << "\t" << i.ct 
		<< "\t" << i.tat << "\t" << i.wt << "\n";
		ttat += i.tat, twt += i.wt;
	}
	cout << fixed << setprecision(2);
	cout << "AVG TAT: " << ttat/n << "\n";
	cout << "AVG WT : " << twt/n << "\n";
}
```

# Round Robin

```cpp
#include <bits/stdc++.h>
using namespace std;

struct Process{
	int pid, at, bt, rbt, ct=0, tat=0, wt=0;
	bool complete = false;
};

int main() {
	int n; cin >> n; //Processes Number
	int tq; cin >> tq; //Time Quantum
	vector<Process> p;
	for (int i = 0 ; i < n; i++) {
		int at, bt; cin >> at >> bt;
		p.push_back({i+1, at, bt, bt});
	}
	int completed = 0, curTime = 0;
	queue<int> readyQueue;
	vector<bool> inQueue(n, false);
	
	for (int i = 0; i < n; i++) {
		if(p[i].at <= curTime) {
			readyQueue.push(i); inQueue[i] = true;
		}
	}

	while (completed < n) {
		if (readyQueue.empty()) {
			curTime++;
			for (int i = 0; i < n; i++) {
				if (!p[i].complete and !inQueue[i] and p[i].at <= curTime) {
					readyQueue.push(i); inQueue[i] = true;
				}
			}
			continue;
		}
		int idx = readyQueue.front(); readyQueue.pop();
		int execTime = min(tq, p[idx].rbt);
		p[idx].rbt -= execTime;
		curTime += execTime;

		for (int i = 0; i < n; i++) {
			if (!p[i].complete and !inQueue[i] and p[i].at <= curTime) {
				readyQueue.push(i); inQueue[i] = true;
			}
		}
		if (p[idx].rbt == 0) {
			p[idx].ct = curTime;
			p[idx].tat = p[idx].ct - p[idx].at;
			p[idx].wt = p[idx].tat - p[idx].bt;
			p[idx].complete = true;
			completed++;
		} else {
			readyQueue.push(idx);
		}

	}
	
	float ttat = 0, twt = 0;
	cout << "PID\tAT\tBT\tCT\tTAT\tWT\n";
	for (auto i : p) {
		cout << i.pid << "\t" << i.at << "\t" << i.bt << "\t" << i.ct 
		<< "\t" << i.tat << "\t" << i.wt << "\n";
		ttat += i.tat, twt += i.wt;
	}
	cout << fixed << setprecision(2);
	cout << "AVG TAT: " << ttat/n << "\n";
	cout << "AVG WT : " << twt/n << "\n";
}
```

# First Fit Algorithm

```cpp
#include <bits/stdc++.h>
using namespace std;

int main() {
	vector<int>blockSize = {100, 500, 200, 300, 600}; 
    vector<int>processSize = {212, 417, 112, 426}; 
	vector<int> alloc(processSize.size(), -1);
	for (int i = 0; i < processSize.size(); i++) {
		for (int j = 0; j < blockSize.size(); j++) {
			if (blockSize[j] >= processSize[i]) {
				alloc[i] = j;
				blockSize[j] -= processSize[i];
				break;
			}
		}
	}

	cout << "Process No.\tProcess Size\tBlock No.\n";
	for(int i = 0; i < processSize.size(); i++) {
		cout << i+1 << "\t\t\t|" << processSize[i] << "\t\t\t|";
		if (alloc[i] != -1) cout << alloc[i] + 1;
		else cout << "Not Allocated";
		cout << "\n";
	}
}
```

# Worst Fit Algorithm
```cpp
#include <bits/stdc++.h>
using namespace std;

int main() {
	vector<int>blockSize = {100, 500, 200, 300, 600}; 
    vector<int>processSize = {212, 417, 112, 426}; 
	vector<int> alloc(processSize.size(), -1);
	for (int i = 0; i < processSize.size(); i++) {
		int bestIdx = -1;
		for (int j = 0; j < blockSize.size(); j++) {
			if (blockSize[j] >= processSize[i]) {
				if (bestIdx == -1) bestIdx = j;
				else if (blockSize[bestIdx] < blockSize[j]) bestIdx = j;
			}
		}
		if (bestIdx != -1) {
			alloc[i] = bestIdx;
			blockSize[bestIdx] -= processSize[i];
		}
	}

	cout << "Process No.\tProcess Size\tBlock No.\n";
	for(int i = 0; i < processSize.size(); i++) {
		cout << i+1 << "\t\t\t|" << processSize[i] << "\t\t\t|";
		if (alloc[i] != -1) cout << alloc[i] + 1;
		else cout << "Not Allocated";
		cout << "\n";
	}
}
```

# Best Fit Algorithm
```cpp
#include <bits/stdc++.h>
using namespace std;

int main() {
	vector<int>blockSize = {100, 500, 200, 300, 600}; 
    vector<int>processSize = {212, 417, 112, 426}; 
	vector<int> alloc(processSize.size(), -1);
	for (int i = 0; i < processSize.size(); i++) {
		int bestIdx = -1;
		for (int j = 0; j < blockSize.size(); j++) {
			if (blockSize[j] >= processSize[i]) {
				if (bestIdx == -1) bestIdx = j;
				else if (blockSize[bestIdx] > blockSize[j]) bestIdx = j;
			}
		}
		if (bestIdx != -1) {
			alloc[i] = bestIdx;
			blockSize[bestIdx] -= processSize[i];
		}
	}

	cout << "Process No.\tProcess Size\tBlock No.\n";
	for(int i = 0; i < processSize.size(); i++) {
		cout << i+1 << "\t\t\t|" << processSize[i] << "\t\t\t|";
		if (alloc[i] != -1) cout << alloc[i] + 1;
		else cout << "Not Allocated";
		cout << "\n";
	}
}
```