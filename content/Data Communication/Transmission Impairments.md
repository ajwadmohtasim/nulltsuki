---
title: Transmission Impairments
draft:
tags:
---
A received signal may differ from it's transmitted signal due to various transmission impairments. For analog signals, it degrades the signal quality, in digital - bit errors appears. We will look into three such impairments in this note.

## Attenuation and Attenuation distortion.

Signal strength of a signal decreases with distance. This is attenuation. In guided media, it follows an exponential pattern, while in wireless channels, it depends on distance and atmospheric conditions. There are three major concerns here - The received signal must be strong enough to detect it, must be significantly stronger than it's noise counterpart so that it can be interpreted correctly and lastly to understand that the rate of attenuation changes with frequency.

The first two issues can be handled with proper signal strength and amplifiers / repeaters. However, this becomes more difficult in multipoint lines where the transmitter-receiver distances vary. The third issue mainly affects the analog signals due to different frequencies attenuate differently and this causes distortion. In such cases equalization techniques are used. Loading coils in telephone lines or amplifiers designed to boost the higher frequencies does the job.

Attenuation of a signal can be expressed by the following formula : 
$$ A = 10\log_{10} \frac{\text{Output Signal Level}}{\text{Input Signal Level}}$$
Here, A is in dB (decibel).

>**Example 1**
>Suppose a signal travels through a transmission medium and it's power is reduced to one half. Calculate it's attenuation.
$P_2$ / $P_1$ = $0.5$ . So $A = 10 \log_{10} 0.5 = -3\text{dB}$


direct link is used to refer to the transmission path between two devices in which signals propagate directly from transmitter to receiver with no intermediate devices, other than amplifiers or repeaters used to increase signal strength