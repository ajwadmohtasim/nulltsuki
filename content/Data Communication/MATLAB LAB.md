---
title: MATLAB LAB
draft: true
tags:
---
## SIGNAL
```
fs = 1000;
t = 0 : 1/fs : 1-1/fs;

f1 = 2;
f2 = 5;

a1 = 1;
a2 = 0.5;

fc1 = a1*sin(2*pi*f1*t);
fc2 = a2*sin(2*pi*f2*t);

plot(t, fc1, 'r','LineWidth',2);
hold on;
grid on;
ylim([-1.5 1.5]);
plot(t, fc2, 'b','LineWidth',2);
```
## NOISE
```
fs = 1000;
t = 0 : 1/fs : 1-1/fs;

f2 = 5;
a2 = 0.5;

fc2 = a2*sin(2*pi*f2*t);
noize = 0.3*randn(1,length(fc2));
signal = fc2 + noize;

subplot(3,1,1);
plot(t, fc2,'LineWidth',2);
ylim([-1 1]);

subplot(3,1,2);
plot(t, noize, 'LineWidth',2);
ylim([-1 1]);

subplot(3,1,3);
plot(t,signal,'LineWidth',1);
ylim([-1 1]);
```
## NRZL NRZI
```
data = [1 0 1 1 0 0 1 0];
BitRate = 1;
Tb = 1/BitRate;

fs = 100;
t = 0 : 1/fs : length(data)*Tb - 1/fs;

nrzl = zeros(1,length(t));
nrzi = zeros(1,length(t));

currentLevel = 0;
for i = 1 : length(data)
    if data(i) == 1
        nrzl((i-1)*fs + 1 : fs*i) = 0;
        currentLevel = ~currentLevel;
    else
        nrzl((i-1)*fs + 1 : fs*i) = 1;
    end
    nrzi((i-1)*fs + 1 : fs*i) = currentLevel;
end

subplot(2,1,1);
stairs(t,nrzl,'LineWidth',2);
ylim([-0.5 1.5]);
grid on;

subplot(2,1,2);
stairs(t,nrzi,'LineWidth',2);
ylim([-0.5 1.5]);
grid on;
```
## ASK
```
data = [1 0 1 1 0 0 1 0];
fs = 100;
t = 0 : 1/fs : 1-1/fs;

f = 5;
fc = sin(2*pi*f*t);

inputData = repelem(data, fs);
base = zeros(1,fs);
carrier = repmat(fc, 1, length(data));

timeAxis = 0 : 1/fs : (length(data)-1/fs);

ask = [];
for i = 1 : length(data)
    if data(i) == 1
        ask = [ask fc];
    else
        ask = [ask base];
    end
end

subplot(3, 1, 1);
stairs(timeAxis, inputData,'LineWidth',2);
ylim([-0.5 1.5]);

subplot(3, 1, 2);
plot(timeAxis, carrier,'LineWidth',2);
ylim([-1.5 1.5]);

subplot(3, 1, 3);
plot(timeAxis, ask, 'LineWidth',2);
ylim([-1.5 1.5]);
```
## FSK
```
data = [1 0 1 1 0 0 1 0];
fs = 100;
t = 0 : 1/fs : (1-1/fs);

f1 = 2;
fc1 = cos(2*pi*f1*t);

f2 = 5;
fc2  = cos(2*pi*f2*t);


inputData = repelem(data, fs);
f = repmat(fc2, 1, length(data));

timeAxis = 0 : 1/fs : (length(data)-1/fs);

psk = [];
for i = 1 : length(data)
    if data(i) == 1
        psk = [psk fc2];
    else
        psk = [psk fc1];
    end
end

subplot(3, 1, 1);
stairs(timeAxis, inputData,'LineWidth',2);
ylim([-0.5 1.5]);

subplot(3, 1, 2);
plot(timeAxis, f,'LineWidth',2);
ylim([-1.5 1.5]);

subplot(3, 1, 3);
plot(timeAxis, psk, 'LineWidth',2);
ylim([-1.5 1.5]);
```
## PSK
```
data = [1 0 1 1 0 0 1 0];
fs = 100;
t = 0 : 1/fs : 1-1/fs;

f = 3;
fc = sin(2*pi*f*t);

inputData = repelem(data, fs);
base = zeros(1,fs);
carrier = repmat(fc, 1, length(data));

timeAxis = 0 : 1/fs : (length(data)-1/fs);

ask = [];
for i = 1 : length(data)
    if data(i) == 1
        ask = [ask fc];
    else
        ask = [ask -fc];
    end
end

subplot(3, 1, 1);
stairs(timeAxis, inputData,'LineWidth',2);
ylim([-0.5 1.5]);

subplot(3, 1, 2);
plot(timeAxis, carrier,'LineWidth',2);
ylim([-1.5 1.5]);

subplot(3, 1, 3);
plot(timeAxis, ask, 'LineWidth',2);
ylim([-1.5 1.5]);
```
## FDMA 
```matlab
clc; clear; close all;

%% Parameters
Fs = 20000; % sampling frequency (Hz)
T = 0.2;    % signal duration (s)
t = 0:1/Fs:T-1/Fs; % time vector

numChannels = 4;                 % number of FDMA channels/stations
baseband_freqs = [50, 120, 200, 300]; % baseband tone frequencies (Hz)
amp = [1.0, 0.8, 0.6, 0.5];      % amplitude of each channel
guard_band = 400;                 % guard band between channels (Hz)
channel_bw = 300;                 % allocated bandwidth per channel (Hz)
start_fc = 1000;                  % starting carrier freq (Hz)

%% Calculate carrier frequencies
fc = start_fc + (0:numChannels-1)*(channel_bw + guard_band);

%% Create baseband messages and modulate onto carriers (DSB-SC)
baseband = zeros(numChannels, length(t));
modulated = zeros(numChannels, length(t));

for k = 1:numChannels
    baseband(k,:) = amp(k) * sin(2*pi*baseband_freqs(k)*t);   % sine message
    modulated(k,:) = baseband(k,:) .* cos(2*pi*fc(k)*t);      % DSB-SC modulation
end

%% Multiplex: sum all modulated signals to form composite FDMA signal
composite = sum(modulated, 1);

%% Optional: Add noise
SNRdB = 40; % high SNR
composite_noisy = awgn(composite, SNRdB, 'measured');

%% FFT for frequency spectrum
nfft = 2^nextpow2(length(t));
f = Fs*(0:(nfft/2))/nfft;
COM_fft = fft(composite_noisy, nfft);
COM_Pxx = abs(COM_fft(1:nfft/2+1));

%% Plotting
figure('Name','FDMA Demonstration','NumberTitle','off','Position',[100 100 1100 700]);

% Composite signal (time segment)
subplot(3,2,1);
plot(t(1:1000), composite_noisy(1:1000));
xlabel('Time (s)'); ylabel('Amplitude');
title('Composite FDMA signal (time segment)');
grid on;

% Composite signal spectrum
subplot(3,2,2);
plot(f, 20*log10(COM_Pxx + eps)); % amplitude in dB
xlim([0 6000]);
xlabel('Frequency (Hz)'); ylabel('Magnitude (dB)');
title('Spectrum of composite FDMA signal');
grid on;

% Individual channels (time domain)
for k = 1:numChannels
    subplot(3,2,2+k); % 3,2,3 -> 3,2,6
    plot(t(1:800), modulated(k,1:800));
    xlabel('Time (s)'); ylabel('Amplitude');
    title(sprintf('Channel %d modulated (carrier = %d Hz)', k, fc(k)));
    grid on;
end

```