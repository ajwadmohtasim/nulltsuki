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

## Noise
Received signals may get unwanted signals and get modified by various distortions. These undesired signals are noises. We have thermal noise, intermodulation noise, crosstalk and impulse noise.

**Thermal noise** happens due to the thermal agitation of electrons. As usual it's due to a function of temperature and this noise gets uniformly distributed across the bandwidth. This is also referred as white noise. The amount of thermal noise that can be found in a bandwidth of 1kHz is :
$$ N_{o} = KT (\text{w/Hz})$$
Here, $N_o$ is the noise power density in watts per 1kHz of bandwidth. K is the Boltzmann's constant $1.38 \times 10^{-23}$ J/K. T is the temperature in kelvins. 
Thermal noise in watts present in a bandwidth of $B$ Hz can be expressed as : 
$$
\begin{aligned}
N &= KTB \\
&= 10\log_{10}K + 10\log_{10}T + 10\log_{10}B \\
&= -228.6\text{ dBw} + 10\log_{10}T + 10\log_{10}B 
\end{aligned}
$$
>**Example 1**
>Consider a receiver with an effective noise temperature of 294k and 10 MHz bandwidth. Calculate the thermal noise at the receiver output.
$N = -228.6\text{ dBw} + 10\log_{10}(294) + 10\log_{10}(10^7) = -133.9\text{ dBw}$ 

**Intermodulation noise** occurs when two or more signals mix together. This may happen when different frequencies share the same transmission medium and the effect here is that of a produced signal that is the result of sum or difference between the original frequencies. **Crosstalk** on the other hand is an unintended leakage of signal, experienced mostly over telephones, is the result of unwanted coupling between two signal paths. Usually happens nearby twisted pairs or coax cable lines. 

## Delay Distortion
This occurs in when **different frequency components of a signal travel at different speeds** through the transmission medium. This causes the **components of a pulse to arrive at the receiver at slightly different times**, distorting the shape of the pulse.