---
title: Multiplexing
draft:
tags:
---
Multiplexing combines multiple signals or data streams into one signal over a shared medium. This allows efficient use of resources and can significantly increase the amount of data that can be sent of the network. 

There are $n$ inputs to a Multiplexer and the Multiplexer is connected by a single data link to a Demultiplexer. The link can carry $n$ separate channels of data.  The multiplexer would combine the data and transmit over a higher-capacity data link which will then be demultiplexed by the Demultiplexer into $n$ outputs. 
![[Multiplexing.png | center]]
There are mainly two forms of multiplexing - FDM and TDM. 
1. [[#FDM (Frequency Division Multiplexing)|FDM (Frequency Division Multiplexing) - Analog]]
2. WDM (Wavelength Division Multiplexing) - Analog
3. [[#Synchronous TDM (Time-Division Multiplexing)|Synchronous TDM (Synchronous Time Division Multiplexing) - Digital]]
4. [[#Statistical TDM (Time-Division Multiplexing)|Statistical TDM (Statistical Time Division Multiplexing) - Digital]]

For simpler context, FDM is most heavily used in radio or television sets. TDM on the other hand is commonly used for multiplexing digitized voice streams and data streams. There are other applications of it however. 
## FDM (Frequency Division Multiplexing)
![[FDM_a.png | 400 right]]**FDM is an analog multiplexing technique that combines analog signals.** Here, the bandwidth of a single medium is divided into a number of smaller, independent frequency channels. This is possible when the bandwidth exceed the required bandwidth signals to be transmitted. 

In the figure, we can see Six signals sources are fed into a multiplexer, which modulates each signal into a different frequency ($f_1,\dots, f_{6}$). Each of the modulated signals requires a certain bandwidth centered on it's carrier frequency (**channels**). And to prevent interference, the channels are separated by **guard bands**. These are unused portions of the spectrum. 
![[FDMAsignal.png | center]]


**Multiplexing  and Demultiplexing Process:**

![[FMDmux.png| 550]]![[FDMdemux.png | 550]]

### FDM Examples

> **Problem 1**
> Let us consider a simple example of transmitting three voice signals simultaneously over a medium. The bandwidth of a voice signal is generally taken to be 4 kHz, with an effective spectrum of 300 to 3400 Hz. Is such a signal is used to amplitude-modulate a 64-kHz carrier what would be the spectrum?
 
So, before we solve this, we need to know that in AM Modulation, a carrier signal at frequency $f_c$ as a resulting spectrum of 
1. Carrier at $f_c$
2. Upper Sideband : $f_c + f_m$
3. Lower Sideband : $f_c - f_m$

So if the message has bandwidth of $B_m$  then $\text{AM bandwidth} = 2\cdot B_m$
In the figure, **(a)** is our spectrum voice signal which if modulated at 64-kHZ will result in a modulated signal that has 8kHZ bandwidth extending from 60 - 68 kHz **(b)**. To make efficient use of bandwidth we will only transmit the lower sideband. These are lossless and choosing lower sideband at different frequency (64, 68, 72) kHz will do our job.
![[FDMexampleA.png | 600 center]]


> **Problem 2**
> Now, Assume that a voice channel occupies a bandwidth of 4 kHz. We need to combine three voice channels into a link with a bandwidth of 12 kHz, from 20 to 32 kHz. Show the configuration, using the frequency domain. Assume there are no guard bands.

Since we need to shift three voice channels into a 12kHz bandwidth, we can chose the first bandwidth from 20-24kHz, second from 24-28kHz and third one from 28-32kHz. Since there's no guard band it fits perfectly. 
![[FMDexampleB.png | 600 center]]

> **Problem 3**
> Five channels, each with a 100-kHz bandwidth, are to be multiplexed together. What is the minimum bandwidth of the link if there is a need for a guard band of 10 kHz between the channels to prevent interference?

For five channels, we need at least four guard bands. This means that the required bandwidth is at least 5 × 100 + 4 × 10 = 540 kHz.
![[FMDexampleC.png | 500 center ]]

> **Problem 4**
> There are 8 voice frequencies. Each carrier is 4kHz and the Guard Band is 1kHz. What is the total bandwidth? Consider another case, where the total bandwidth is 48kHz and no. of frequency is 7. If each frequency is 6kHz, what is the guard band?

Total Bandwidth for the first case: (8 x 4) + (8 - 1) x 1 = 39kHz. As for the second case, Guard band would be (48 - (6 x 7)) / 6 = 1kHz.


## Synchronous TDM (Time-Division Multiplexing)
![[TDM.png | 400 right]]**Time-division multiplexing (TDM) is a digital process that allows several connections to share the high bandwidth of a link**. Instead of sharing a portion of the bandwidth as in FDM, time is shared.

**In synchronous TDM**, the data flow of each input connection is divided into units, where each input occupies one input time slot. A unit can be 1 bit, one character, or one block of data. Each input unit becomes one output unit and occupies one output time slot.


![[TDMb.png | center]]
> [!NOTE]
> **In synchronous TDM, the data rate of the link is $n$ times faster, and the unit duration is $n$ times shorter.**

### Synchronous TDM examples

> **Problem 1**
> The data rate for each input connection is 1 kbps. If 1 bit at a time is multiplexed (a unit is 1 bit), what is the duration of 1. each input slot, 2. each output slot, and 3. each frame?
![[TDMexampleA.png | 500 center]]
1. Since each input connection is 1kbps, each bit duration is 1/1000s or 1ms. Input slot duration is the same as bit duration so the answer is 1ms.
2. Each output slot is 1/3ms.
3. Each frame carries about 3 slots, so it's duration : 3 x 1/3ms = 1ms.

> **Problem 2**
> The following figure shows synchronous TDM with a data stream for each input and one data stream for the output. The unit of data is 1 bit. Find (1) the input bit duration, (2) the output bit duration, (3) the output bit rate, and (4) the output frame rate.
![[STDMexampleB.png | 500 center]]
1. The input rate is about 1Mbps, so the input bit duration is 1/ 1Mbps = 1$\mu s$.
2. As input bit duration is 1$\mu s$, the output bit duration is 1$\mu s$/4 = 0.25$\mu s$
3. As the output data rate $n$ times faster than input data rate, we have 1Mbps x 4 = 4Mbps as our output bit rate.
4. The frame rate is always the same as any input rate. So our output frame rate is 1Mbps. 

> **Problem 3**
> Four 1-kbps connections are multiplexed together. A unit is 1 bit. Find (1) the duration of 1 bit before multiplexing, (2) the transmission rate of the link, (3) the duration of a time slot, and (4) the duration of a frame.

1. The duration of 1 bit before multiplexing is 1/1 kbps, or 0.001 s (1 ms). 
2. The rate of the link is 4 times the rate of a connection, or 4 kbps. 
3. The duration of each time slot is one-fourth of the duration of each bit before multiplexing, or 1/4 ms or 250 μs. *Note that we can also calculate this from the data rate of the link, 4 kbps. The bit duration is the inverse of the data rate, or 1/4 kbps or 250 μs.* 
4. The duration of a frame is always the same as the duration of a unit before multiplexing, or 1 ms. We can also calculate this in another way. Each frame in this case has four time slots. So the duration of a frame is 4 times 250 μs, or 1 ms.
## Statistical TDM (Time-Division Multiplexing)
In synchronous TDM, each input has a reserved slot in the output frame. This can be inefficient if some input lines have no data to send. So in statistical TDM, slots are dynamically allocated to improve band width efficiency.
![[STDMcomp.png | 500 center]]
The above figure shows a major difference between slots in **synchronous TDM** and **statistical TDM**. An output slot in synchronous TDM is totally occupied by data; in statistical TDM, a slot needs to carry data as well as the address of the destination.

So, there is no fixed relation ship between the inputs and outputs because there are no preassigned or reserved slots. This forces us to include the address of the receiver inside each slot to show where it is to be delivered. 

The addressing in its simplest form can be $n$ bits to define $N$ different output lines with $n = \log_{2}{N}$. For example, for eight different output lines, we need a 3-bit address.


> **Example Problem**
> We assume there are 15 senders. These senders are to be multiplexed into a single line/channel. Each sender are in burst and each can generate data rate at 55kbps. Certain cases are idle and some are active. Under these circumstances, find out the **channel capacity** for the following conditions:
> 1. 15 senders are active under Synchronous TDM.
> 2. Maximum 5 senders are active under Statistical TDM.
> 3. 15 senders are active under FDM.

Here, Channel capacity is **the minimum transmission rate (in kbps or Mbps) required on the shared channel to carry all sender data without loss**, under the given multiplexing condition.

1. **Synchronous TDM (15 active)**  Every sender gets a fixed slot, so required channel capacity = $(15 \times 55\ \text{kbps} = 825\ \text{kbps})$.
2. **Statistical TDM (max 5 simultaneous active)** We only need enough bandwidth for the worst-case number of simultaneously active senders: $(5 \times 55\ \text{kbps} = 275\ \text{kbps})$.  (Statistical TDM is more efficient because not all users transmit at once.)
3. **FDM (15 active)** : Each sender occupies its own frequency band at 55 kbps, so capacity = $(15 \times 55\ \text{kbps} = 825\ \text{kbps})$.  If there was guard band mentioned we would've multiplied it's bandwidth with (15-1 = 14) and added it to the channel capacity. 