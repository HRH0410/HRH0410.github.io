+++
title = "2025秋 数字信号处理 期末笔记"
description = "2025秋 数字信号处理 期末笔记"
summary = "2025秋 数字信号处理 期末笔记"
date = "2026-07-02T09:53:38+08:00"
draft = false
postType = "study"
tags = ["数字花园", "Notion"]
categories = ["学习笔记"]
showTableOfContents = true
showWordCount = true
showReadingTime = true
wordCount = 800
readingTime = 2
notionSource = "2025秋 数字信号处理 期末笔记 2d4f867979aa80ed87accdaf77858d57.md"
+++

{{< katex >}}
> 10道选择，5道填空，5道判断，2道解答题，5道计算题
> 

\[
\begin{aligned}e^{j\theta} &= \cos\theta + j\sin\theta \\\cos\theta &= \frac{e^{j\theta}+e^{-j\theta}}{2} \\\sin\theta &= \frac{e^{j\theta}-e^{-j\theta}}{2j} \\e^{j\theta}-e^{-j\theta} &= 2j\sin\theta \\e^{-j\theta}-e^{j\theta} &= -2j\sin\theta \\\mathrm{Sa}(x) &= \frac{\sin x}{x} \\X(j\omega) &= |X(j\omega)|e^{j\varphi(\omega)}\end{aligned}
\]

## 01 信号的时域分析

> **如何刻画信号关于时间的变化**
> 

判断是否是周期信号的方法

![image.png](assets/image.png)

计算信号的能量和功率

![image.png](assets/image-1.png)

信号的尺度变换、平移、加和乘

经典信号

直流信号、正弦信号、实指数信号、虚指数信号、复指数信号、抽样信号、实指数序列、虚指数序列

![image.png](assets/image-2.png)

**单位脉冲、单位阶跃**

奇异信号

帕塞瓦尔定理：\(\int_{t_1}^{t_2} x^2(t)\,dt = \sum_r c_r^2\)

**冲激偶信号（冲激的导数）**

## 02 系统的时域分析

> **系统的描述以及卷积算子**
> 

判断系统的类型：

![image.png](assets/image-3.png)

**卷积（着重点，多练习）**

卷积公式

卷积和计算：表格法、矩阵法、利用卷积特性简化计算

连续、离散卷积，卷积的特性与性质

个人感觉需要熟记的（微分、积分、奇异信号的卷积）

LTI系统和冲激相应的关系：

![image.png](assets/image-4.png)

## 03 系统的时域分析

> **微分和差分方程的构建和求解**
> 

![image.png](assets/image-5.png)

![image.png](assets/image-6.png)

**零输入响应，零状态响应**

![image.png](assets/image-7.png)

![image.png](assets/image-8.png)

![image.png](assets/image-9.png)

与Laplace变换和Z变换高度关联

## 04 信号的傅里叶级数

> **如何从频率角度重构周期信号**
> 

连续周期信号

定义、分解（两种形式熟练掌握）

![image.png](assets/image-10.png)

收敛条件

![image.png](assets/image-11.png)

帕塞瓦尔能量守恒定理

![image.png](assets/image-12.png)

常见傅里叶级数的计算

![image.png](assets/image-13.png)

![image.png](assets/image-14.png)

## 05 信号的傅里叶变换

连续非周期信号

定义

![image.png](assets/image-15.png)

收敛条件

可能有讲义原题

![image.png](assets/image-16.png)

特殊信号的傅里叶变换的频谱要熟练

![image.png](assets/image-17.png)

![image.png](assets/image-18.png)

性质

![image.png](assets/image-19.png)

学会推导周期信号的傅里叶变换（冲激函数列）

![image.png](assets/image-20.png)

## 06 信号的采样

> **模拟信号和数字信号的互相转换**
> 

![信号的时域采样](assets/image-21.png)

信号的时域采样

![image.png](assets/image-22.png)

**时域采样定理**

![image.png](assets/image-23.png)

![image.png](assets/image-24.png)

## 07 调制、解调和滤波

> **从频域角度“控制”信号**
> 

调制：将低频信号“加载”或“嵌入”到一个高频振荡信号上

解调：从含有低频信号的高频振荡信号中提取低频信号

调制信号、载波信号、幅度调制、角度调制

![image.png](assets/image-25.png)

![image.png](assets/image-26.png)

![image.png](assets/image-27.png)

## 08 离散信号的傅里叶变换

> **傅里叶分析方法的“离散化”**
> 

![image.png](assets/image-28.png)

性质

![image.png](assets/image-29.png)

离散傅里叶级数

![image.png](assets/image-30.png)

![image.png](assets/image-31.png)

![image.png](assets/image-32.png)

![image.png](assets/image-33.png)

快速傅里叶变换（FFT）：**画蝶形图必考**

## 09 离散信号的傅里叶变换

> **数字图像的傅里叶分析方法**
> 

这章感觉不是很重要 了解滤波、振铃等等的概念就行

![image.png](assets/image-34.png)

![image.png](assets/image-35.png)

![image.png](assets/image-36.png)

## 10 拉普拉斯变换及其应用

> **连续信号的复频域分析**
> 

![通过这一页PPT中的FT引出拉普拉斯变换](assets/image-37.png)

通过这一页PPT中的FT引出拉普拉斯变换

定义，单边Laplace变换 **（求收敛域的题目是重点）**，性质，反变换，注意看例题

![image.png](assets/image-38.png)

1. 求Laplace反变换，**记住常用变换**
2. 二阶响应系统的s域求解
3. 求系统函数

## 11 Z变换

> **针对离散信号的复频域分析**
> 

![image.png](assets/image-39.png)

掌握单边Z变换的计算、性质以及反变换（多看例题）

![image.png](assets/image-40.png)

![image.png](assets/image-41.png)

![image.png](assets/image-42.png)
