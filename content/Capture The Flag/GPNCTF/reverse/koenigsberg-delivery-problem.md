---
title: Koenigsberg Delivery Problem
draft: true
tags:
  - Reverse-Engineering
---
The binary is best solved by recognizing that it encodes a graph traversal problem, not a normal string comparison.

The uploaded file `cartographer` is a non-stripped 64-bit ELF. The useful symbols are visible:

```text
main            0x40f0
cfg             0x1190
check_instance  0x5520
```

`main` reads 250 signed bytes using repeated `scanf("%hhd;", &buf[i])` calls, then calls:

```c
cfg(buf);
```

The literal semicolon in the format explains why the final payload is usually written as:

```text
15;31;54;...
```

The semicolon is not part of the byte value. It is just input formatting.

Inside `cfg`, the program creates a 250-byte zeroed array on the stack. This array is the important part. Each state block increments exactly one byte in that array.

A typical state looks like this:

```asm
inc    BYTE PTR [rsp+state_id]
movzx  edx, BYTE PTR [rdi+rcx]
cmp    rdx, max_allowed_value
ja     check_block
inc    rcx
lea    rsi, [jump_table_for_this_state]
movsxd rdx, DWORD PTR [rsi+rdx*4]
add    rdx, rsi
jmp    rdx
```

In C-like pseudocode:

```c
state_k:
    visited[k]++;

    b = input[i];

    if (b > max_for_state_k)
        goto check_instance;

    i++;

    goto jump_table_k[b];
```

So every input byte chooses an outgoing edge from the current state. If the byte is invalid for the current state, execution stops walking the graph and calls `check_instance`.

`check_instance` does this:

```c
for (int i = 0; i < 250; i++) {
    if (visited[i] == 0) {
        puts("Not quite, try again!");
        exit(0);
    }
}

fd = open("/flag", O_RDONLY);
read(fd, buf, 100);
printf("Congratulations! Here is your flag: %s", buf);
```

That means the real objective is:

```text
Visit all 250 states at least once, then intentionally give an invalid byte.
```

The flag is not stored in the binary. The binary only prints `/flag` after the route is accepted.

The graph interpretation is:

```text
state block        = vertex
valid input byte   = labelled directed edge
jump target        = destination vertex
visited counter    = whether the vertex has been visited
invalid byte       = end the route and check success
```

Although the challenge name hints at Euler/Königsberg, the binary does not check whether every edge is used. It checks whether every vertex/state is visited. So the cleanest solve is a Hamiltonian path over the 250 states, followed by one invalid terminator byte.

A manual way to extract the graph is:

1. Open the binary in Ghidra, IDA, or Binary Ninja.
    
2. Go to `cfg`.
    
3. Identify every block containing:
    

```asm
inc BYTE PTR [rsp+...]
```

The stack offset is the state number. For example:

```asm
1210: inc BYTE PTR [rsp]
```

is state `0`.

```asm
1230: inc BYTE PTR [rsp+0x1]
```

is state `1`.

4. In each state, record the maximum accepted byte:
    

```asm
cmp rdx, 0x5f
ja  0x40d4
```

For state `0`, accepted bytes are `0..0x5f`, i.e. `0..95`.

5. Record the jump table address:
    

```asm
lea rax, [rip+0x4dfc]  ; 0x6004
```

6. Interpret the table as signed 32-bit relative offsets. Each entry is added to the table base.
    

For example, the first jump table starts at `0x6004`.

The first entry is:

```text
0xffffb22c
```

As a signed 32-bit value, that is `-0x4dd4`.

So the target is:

```text
0x6004 - 0x4dd4 = 0x1230
```

`0x1230` is state `1`.

Therefore:

```text
from state 0, byte 0 goes to state 1
```

The next entries give more edges:

```text
state 0, byte 0 -> state 1
state 0, byte 1 -> state 5
state 0, byte 2 -> state 6
state 0, byte 3 -> state 7
...
```

Doing this for all 250 state blocks gives a dense directed labelled graph. In this challenge the recovered graph has:

```text
250 states
24987 directed labelled edges
```

Now solve the graph problem. Since `main` gives exactly 250 input bytes, the ideal route is:

```text
249 valid bytes to visit 250 states
1 invalid byte to trigger check_instance
```

That is a Hamiltonian path starting at state `0`.

A manual backtracking strategy is enough because the graph is dense. Use this rule:

```text
At each state, prefer moving to an unvisited state that itself has the fewest onward unvisited exits.
```

That is the Warnsdorff heuristic, the same idea often used for knight’s tour solving. You do not need symbolic execution or angr. You only need the graph.

The solving logic is:

```python
path = [0]
visited = {0}

def dfs(u):
    if len(path) == 250:
        return True

    candidates = []
    for label, v in graph[u]:
        if v not in visited:
            future_degree = count_unvisited_neighbors(v)
            candidates.append((future_degree, label, v))

    candidates.sort()

    for _, label, v in candidates:
        visited.add(v)
        path.append(v)
        labels.append(label)

        if dfs(v):
            return True

        labels.pop()
        path.pop()
        visited.remove(v)

    return False
```

Once you find a path, the payload is the sequence of edge labels. The recovered path for this binary ends in state `179`. State `179` accepts values only up to `105`, so `127` is a safe final invalid byte.

Therefore the final shape is:

```text
[249 valid transition labels] + [127]
```

The actual accepted payload recovered earlier was:

```text
15;31;54;15;52;47;44;79;8;34;64;27;23;51;82;63;46;73;83;73;43;34;8;49;83;7;67;43;13;69;47;71;88;90;12;15;78;86;74;25;22;61;80;45;45;75;3;43;33;43;1;34;7;5;4;65;41;47;29;72;38;26;6;36;46;30;36;12;57;81;20;86;8;8;31;17;2;73;60;62;86;25;2;46;46;96;33;17;14;96;73;15;86;88;15;90;26;97;1;55;71;81;63;72;6;48;75;96;80;40;81;49;24;23;24;53;68;54;42;40;97;98;87;40;4;80;87;31;50;9;50;16;63;23;36;54;94;8;85;65;22;72;94;66;34;50;50;49;81;21;44;56;50;16;77;21;73;66;89;39;104;77;23;82;37;11;42;101;79;4;65;83;5;82;49;28;40;47;19;89;37;34;73;78;99;28;23;101;76;48;88;17;70;19;99;0;59;76;55;26;76;37;8;13;74;51;85;35;24;75;102;47;6;22;14;58;36;77;70;77;92;31;59;23;70;12;4;43;48;36;58;11;78;39;31;75;74;40;46;80;94;42;12;127;
```

When run against the official challenge service/container, that route should cause the program to open the real `/flag` and print:

```text
Congratulations! Here is your flag: GPNCTF{...}
```

The important editorial takeaway is this: once you see that every state increments a unique stack byte and `check_instance` only verifies that no counter is zero, the problem reduces cleanly to “find a route that visits every state.” The reversing part is extracting the labelled directed graph; the solving part is finding a Hamiltonian path and appending one invalid byte.