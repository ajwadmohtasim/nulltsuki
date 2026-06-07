---
title: Auto Cooker
draft: true
tags:
  - Reverse-Engineering
---
Flag:

```
GPNCTF{1_fe3l_l1k3_YOU_ar3_R34Dy_fOr_0ur_H4rdest_Dish35_N0w}
```

## 1. Basic binary inspection

Uploaded file:

```
$ ls -l /mnt/data/autocooker
-rw-r--r-- 1 root oai_shared 16616 Jun  5 15:24 /mnt/data/autocooker

$ file /mnt/data/autocooker
/mnt/data/autocooker: ELF 64-bit LSB executable, x86-64, version 1 (SYSV), dynamically linked, interpreter /lib64/ld-linux-x86-64.so.2, for GNU/Linux 3.2.0, not stripped

$ sha256sum /mnt/data/autocooker
03b39edf67c9e15b8fd7d86144e8146191c63632e0bfce340172874837a3deb0  /mnt/data/autocooker
```

The binary is not stripped, so the symbol names are directly useful.

Important symbols:

```
$ readelf -sW /mnt/data/autocooker | grep -E 'salt|taste|trim|main|FOOD|RECIPE|DELICIOUS|TARGET|GRAIN|check|explain'
19: 0000000000404120    64 OBJECT  GLOBAL DEFAULT   24 FOOD
20: 00000000004040e0    64 OBJECT  GLOBAL DEFAULT   24 RECIPE
24: 00000000004011ba    95 FUNC    GLOBAL DEFAULT   11 explain_current_food
27: 0000000000404060     4 OBJECT  GLOBAL DEFAULT   23 TARGET_LENGTH
30: 00000000004013a5   110 FUNC    GLOBAL DEFAULT   11 taste
32: 00000000004012bc    73 FUNC    GLOBAL DEFAULT   11 trim
42: 0000000000401219    75 FUNC    GLOBAL DEFAULT   11 salt
47: 0000000000404064     1 OBJECT  GLOBAL DEFAULT   23 GRAIN_OF_SALT
48: 0000000000401413   357 FUNC    GLOBAL DEFAULT   11 main
49: 0000000000401176    68 FUNC    GLOBAL DEFAULT   11 check_recipe_length
52: 0000000000404080    64 OBJECT  GLOBAL DEFAULT   23 DELICIOUS
```

Useful strings:

```
$ strings -a -tx /mnt/data/autocooker
...
2188 Welcome to the auto cooker. We'll cook any recipe for you under one condition: It must actually taste good.
21f8 Your recipe is too complicated or too simple, I already know it won't taste good :(
2250 We now have the following state of our kitchen:
2286 Salting...
2291 Frying...
22a0 Oops, it burned :(
22b3 Cutting off the burnt bits...
22d1 Mixing...
22db Taste testing...
22f0 YUCK!
2345 cooking_class
2360 Enter your recipe (flag) you want to cook and confirm with [ENTER]:
23a8 Congratulations, you "cooked" a delicious plate of food!
...
```

The argument `cooking_class` enables verbose state printing.

## 2. Static analysis

The interesting globals are in `.data`:

```
$ objdump -s -j .data /mnt/data/autocooker

Contents of section .data:
 404050 08204000 00000000 88214000 00000000  . @......!@.....
 404060 3d000000 aa000000 00000000 00000000  =...............
 404080 0a0a0a0a 7ddda94e 5ff9992c 9d3cee5f  ....}..N_..,.<._
 404090 ed9dfcec 8de92e5f 8dfda95f 8d5ecc5f  ......._..._.^._
 4040a0 3deee999 8f5f998d bc5fff5e 3f5f991c  =...._..._.^?_..
 4040b0 b96c5f6c 99fccc5f b91dceef 9e4eafde  .l_l..._.....N..
```

From this:

```text
TARGET_LENGTH = 0x3d = 61
GRAIN_OF_SALT = 0xaa
DELICIOUS = 64-byte target buffer at 0x404080
```

The length check is:

```
check_recipe_length:
    if RECIPE[TARGET_LENGTH] != 0:
        fail
    if RECIPE[TARGET_LENGTH - 1] == 0:
        fail
```

So the input buffer must contain exactly 61 bytes before the null byte. Because the program uses `fgets`, the newline is included. Therefore, the actual flag is 60 printable characters, followed by `\n`.

## 3. Recovered cooking logic

The `main` function does this:

```
fgets(RECIPE, 0x40, stdin);
check_recipe_length();

memcpy(FOOD, RECIPE, 64);

salt();
fry();
trim();
mix();
taste();
```

The individual transforms are:

### `salt`

```
for (int i = 0; i < 64; i++) {
    FOOD[i] ^= 0xaa;
}
```

### `fry`

Nibble-swap each byte:

```
for (int i = 0; i < 64; i++) {
    FOOD[i] = (FOOD[i] << 4) | (FOOD[i] >> 4);
}
```

Effectively:

```
FOOD[i] = ((FOOD[i] & 0x0f) << 4) | ((FOOD[i] & 0xf0) >> 4);
```

### `trim`

Only affects bytes `61..63`:

```
for (int i = TARGET_LENGTH; i < 64; i++) {
    FOOD[i] &= 0x0f;
}
```

Since `TARGET_LENGTH = 61`, this masks the low nibble of bytes 61, 62, and 63.

### `mix`

Reverses the entire 64-byte buffer:

```
tmp = FOOD;

for (int i = 0; i < 64; i++) {
    FOOD[i] = tmp[63 - i];
}
```

### `taste`

Compares against `DELICIOUS`:

```
for (int i = 0; i < 64; i++) {
    if (FOOD[i] != DELICIOUS[i]) {
        fail;
    }
}
```

## 4. Inverting the transform

The target buffer is:

```text
0a 0a 0a 0a 7d dd a9 4e 5f f9 99 2c 9d 3c ee 5f
ed 9d fc ec 8d e9 2e 5f 8d fd a9 5f 8d 5e cc 5f
3d ee e9 99 8f 5f 99 8d bc 5f ff 5e 3f 5f 99 1c
b9 6c 5f 6c 99 fc cc 5f b9 1d ce ef 9e 4e af de
```

Since `mix` reverses the buffer, target byte `DELICIOUS[j]` corresponds to pre-mix byte `FOOD[63 - j]`.

For bytes before index 61, the inverse is straightforward:

```
original = nibble_swap(target_after_reverse) ^ 0xaa
```

Nibble-swap is its own inverse.

The first four bytes of the final target are all `0x0a` because they correspond to the last four bytes before reversal:

```text
input[60] = '\n'
input[61] = '\0'
input[62] = '\0'
input[63] = '\0'
```

After XOR, nibble-swap, and trim, these become `0x0a`.

## 5. Solver script

```
#!/usr/bin/env python3

TARGET_LENGTH = 0x3d
GRAIN_OF_SALT = 0xaa

DELICIOUS = bytes.fromhex(
    "0a0a0a0a7ddda94e5ff9992c9d3cee5f"
    "ed9dfcec8de92e5f8dfda95f8d5ecc5f"
    "3deee9998f5f998dbc5fff5e3f5f991c"
    "b96c5f6c99fccc5fb91dceef9e4eafde"
)

def nibble_swap(b: int) -> int:
    return ((b << 4) & 0xff) | (b >> 4)

recipe = [0] * 64

# DELICIOUS[j] == transformed_recipe[63 - j]
for j, target_byte in enumerate(DELICIOUS):
    original_index = 63 - j

    # Bytes 61..63 were lossy-masked by trim, so ignore them.
    # Bytes 0..60 are recoverable.
    if original_index < TARGET_LENGTH:
        recipe[original_index] = nibble_swap(target_byte) ^ GRAIN_OF_SALT

candidate_with_newline = bytes(recipe[:TARGET_LENGTH])
flag = candidate_with_newline.rstrip(b"\n").decode()

print("Recovered input bytes:", candidate_with_newline)
print("Flag:", flag)
```

Output:

```text
Recovered input bytes: b'GPNCTF{1_fe3l_l1k3_YOU_ar3_R34Dy_fOr_0ur_H4rdest_Dish35_N0w}\n'
Flag: GPNCTF{1_fe3l_l1k3_YOU_ar3_R34Dy_fOr_0ur_H4rdest_Dish35_N0w}
```

## 6. Verification

Command:

```bash
FLAG='GPNCTF{1_fe3l_l1k3_YOU_ar3_R34Dy_fOr_0ur_H4rdest_Dish35_N0w}'
printf '%s\n' "$FLAG" | /mnt/data/autocooker
```

Output:

```text
     _   _   _ _____ ___     ____ ___   ___  _  _______ ____  
    / \ | | | |_   _/ _ \   / ___/ _ \ / _ \| |/ / ____|  _ \ 
   / _ \| | | | | || | | | | |  | | | | | | | ' /|  _| | |_) |
  / ___ \ |_| | | || |_| | |__| |_| | |_| | . \| |___|  _ < 
 /_/   \_\___/  |_| \___/   \____\___/ \___/|_|\_\_____|_| \_\
                                                              
Welcome to the auto cooker. We'll cook any recipe for you under one condition: It must actually taste good.

Enter your recipe (flag) you want to cook and confirm with [ENTER]:
Salting...
Frying...
Oops, it burned :(
Cutting off the burnt bits...
Mixing...
Taste testing...
Congratulations, you "cooked" a delicious plate of food!
```

Verbose verification using the hidden `cooking_class` mode:

```bash
printf '%s\n' "$FLAG" | /mnt/data/autocooker cooking_class
```

Relevant final state before `taste`:

```text
Mixing...
We now have the following state of our kitchen:
0A 0A 0A 0A 7D DD A9 4E 5F F9 99 2C 9D 3C EE 5F ED 9D FC EC 8D E9 2E 5F 8D FD A9 5F 8D 5E CC 5F 3D EE E9 99 8F 5F 99 8D BC 5F FF 5E 3F 5F 99 1C B9 6C 5F 6C 99 FC CC 5F B9 1D CE EF 9E 4E AF DE 
Taste testing...
Congratulations, you "cooked" a delicious plate of food!
```

That final state exactly matches the `DELICIOUS` target buffer, confirming the recovered flag.