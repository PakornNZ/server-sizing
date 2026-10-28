# Local Models

Source: https://artificialanalysis.ai/leaderboards/models + Hugging Face model API
Filter: open weights, `totalParameters >= 20B`, practical shortlist only
Order: `intelligence` desc, then Hugging Face downloads desc

| rank | model | provider | token | parameter | intelligence | coding | agentic | gpqa | hle | lcr | hf_downloads | hf_likes | hf_url |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| 1 | Kimi K3 (max) | Kimi | 1M | 2800B | 59.70 | 76.24 | 54.26 | 0.94 | 0.47 | 0.83 | 2.4M | 10.9k | https://huggingface.co/moonshotai/Kimi-K3 |
| 2 | Qwen3.8 2.4T A95B | Alibaba | 983.6k | 2400B | 57.70 | 71.89 | 57.10 | 0.94 | 0.42 | 0.75 | 15.7k | 1.1k | https://huggingface.co/Qwen/Qwen3.8-2.4T-A95B |
| 3 | DeepSeek V4 Pro 0813 (Reasoning, Max Effort) | DeepSeek | 1M | 1600B | 53.20 | 68.83 | 49.56 | 0.93 | 0.41 | 0.75 | 49.6k | 692 | https://huggingface.co/deepseek-ai/DeepSeek-V4-Pro-0813 |
| 4 | GLM-5.2 (max) | Z AI | 1M | 753B | 52.64 | 68.76 | 45.67 | 0.89 | 0.41 | 0.77 | 2.8M | 5k | https://huggingface.co/zai-org/GLM-5.2 |
| 5 | Qwen3.8 27B | Alibaba | 256k | 27B | 52.02 | 68.08 | 50.88 | 0.91 | 0.34 | 0.77 | 1.7M | 11.8k | https://huggingface.co/Qwen/Qwen3.8-27B |
| 6 | DeepSeek V4 Flash 0731 (Reasoning, Max Effort) | DeepSeek | 1M | 284B | 51.77 | 69.06 | 48.41 | 0.91 | 0.39 | 0.74 | 2.8M | 3.6k | https://huggingface.co/deepseek-ai/DeepSeek-V4-Flash-0731 |
| 7 | Kimi K3 (low) | Kimi | 1M | 2780B | 48.25 | 71.98 | 39.58 | 0.84 | 0.25 | 0.77 | 2.4M | 10.9k | https://huggingface.co/moonshotai/Kimi-K3 |
| 8 | DeepSeek V4 Pro (Reasoning, Max Effort) | DeepSeek | 1M | 1600B | 45.27 | 59.36 | 37.81 | 0.89 | 0.38 | 0.70 | 1.2M | 5.5k | https://huggingface.co/deepseek-ai/DeepSeek-V4-Pro |
| 9 | Kimi K2.6 | Kimi | 256k | 1000B | 45.14 | 61.77 | 31.16 | 0.91 | 0.37 | 0.77 | 834.4k | 1.6k | https://huggingface.co/moonshotai/Kimi-K2.6 |
| 10 | DeepSeek V4 Pro (Reasoning, High Effort) | DeepSeek | 1M | 1600B | 43.75 | 58.67 | 35.26 | 0.91 | 0.35 | 0.67 | 1.2M | 5.5k | https://huggingface.co/deepseek-ai/DeepSeek-V4-Pro |
| 11 | Kimi K2.7 Code | Kimi | 256k | 1000B | 43.02 | 60.76 | 30.28 | 0.90 | 0.35 | 0.75 | 483.4k | 1.4k | https://huggingface.co/moonshotai/Kimi-K2.7-Code |
| 12 | DeepSeek V4 Flash (Reasoning, Max Effort) | DeepSeek | 1M | 284B | 42.12 | 56.17 | 33.74 | 0.89 | 0.35 | 0.70 | 1.8M | 2.1k | https://huggingface.co/deepseek-ai/DeepSeek-V4-Flash |
| 13 | GLM-5.1 (Reasoning) | Z AI | 200k | 744B | 40.97 | 55.78 | 30.56 | 0.87 | 0.30 | 0.68 | 82k | 1.8k | https://huggingface.co/zai-org/GLM-5.1 |
| 14 | GLM-5 (Reasoning) | Z AI | 200k | 744B | 40.55 | -- | -- | 0.82 | 0.29 | 0.71 | 131.5k | 2.1k | https://huggingface.co/zai-org/GLM-5 |
| 15 | DeepSeek V4 Flash (Reasoning, High Effort) | DeepSeek | 1M | 284B | 39.01 | 51.96 | 30.30 | 0.87 | 0.30 | 0.69 | 1.8M | 2.1k | https://huggingface.co/deepseek-ai/DeepSeek-V4-Flash |
| 16 | Nemotron 3 Ultra 550B A55B (Reasoning) | NVIDIA | 262.1k | 550B | 38.32 | 49.27 | 27.50 | 0.87 | 0.28 | 0.71 | 442.7k | 328 | https://huggingface.co/nvidia/NVIDIA-Nemotron-3-Ultra-550B-A55B-BF16 |
| 17 | Ling 3.0 Flash | InclusionAI | 262.1k | 124B | 37.82 | 50.65 | 29.31 | 0.85 | 0.24 | 0.67 | -- | -- | -- |
| 18 | Qwen3.6 27B (Reasoning) | Alibaba | 262.1k | 27.80B | 37.70 | 53.72 | 27.51 | 0.84 | 0.23 | 0.73 | 6.5M | 2.3k | https://huggingface.co/Qwen/Qwen3.6-27B |
| 19 | GLM-5.1 (Non-reasoning) | Z AI | 200k | 744B | 36.26 | -- | -- | 0.84 | 0.28 | 0.54 | 82k | 1.8k | https://huggingface.co/zai-org/GLM-5.1 |
| 20 | Kimi K2.5 (Reasoning) | Kimi | 256k | 1000B | 36.02 | 46.78 | 21.69 | 0.88 | 0.31 | 0.73 | 764.6k | 2.9k | https://huggingface.co/moonshotai/Kimi-K2.5 |
| 21 | Kimi K2.6 (Non-reasoning) | Kimi | 256k | 1000B | 35.44 | -- | -- | 0.79 | 0.20 | 0.66 | 834.4k | 1.6k | https://huggingface.co/moonshotai/Kimi-K2.6 |
| 22 | GLM-5.2 (Non-reasoning) | Z AI | 1M | 753B | 34.81 | 46.49 | 35.12 | 0.69 | 0.10 | 0.45 | 2.8M | 5k | https://huggingface.co/zai-org/GLM-5.2 |
| 23 | Qwen3.5 27B (Reasoning) | Alibaba | 262.1k | 27.80B | 34.60 | -- | -- | 0.86 | 0.24 | 0.72 | 2.8M | 1k | https://huggingface.co/Qwen/Qwen3.5-27B |
| 24 | GLM-4.7 (Reasoning) | Z AI | 200k | 357B | 34.46 | 45.26 | 26.22 | 0.86 | 0.27 | 0.68 | 71.7k | 2.1k | https://huggingface.co/zai-org/GLM-4.7 |
| 25 | Qwen3.5 397B A17B (Reasoning) | Alibaba | 262.1k | 397B | 34.26 | 48.21 | 19.85 | 0.89 | 0.29 | 0.73 | 252k | 1.6k | https://huggingface.co/Qwen/Qwen3.5-397B-A17B |
| 26 | Kimi K2 Thinking | Kimi | 256k | 1000B | 33.49 | -- | -- | 0.84 | 0.24 | 0.70 | 52.9k | 1.7k | https://huggingface.co/moonshotai/Kimi-K2-Thinking |
| 27 | GLM-5 (Non-reasoning) | Z AI | 200k | 744B | 33.18 | -- | -- | 0.67 | 0.08 | 0.43 | 131.5k | 2.1k | https://huggingface.co/zai-org/GLM-5 |
| 28 | Qwen3.5 122B A10B (Reasoning) | Alibaba | 262.1k | 125B | 32.85 | 45.71 | 21.27 | 0.86 | 0.25 | 0.70 | 1.9M | 609 | https://huggingface.co/Qwen/Qwen3.5-122B-A10B |
| 29 | DeepSeek V3.2 (Reasoning) | DeepSeek | 128k | 685B | 32.80 | 44.17 | -- | 0.84 | 0.25 | 0.71 | 1.3M | 1.5k | https://huggingface.co/deepseek-ai/DeepSeek-V3.2 |
| 30 | Qwen3.5 397B A17B (Non-reasoning) | Alibaba | 262.1k | 397B | 32.73 | -- | -- | 0.86 | 0.20 | 0.62 | 252k | 1.6k | https://huggingface.co/Qwen/Qwen3.5-397B-A17B |
| 31 | Qwen3.6 35B A3B (Reasoning) | Alibaba | 262.1k | 36B | 32.13 | 41.88 | 21.62 | 0.84 | 0.22 | 0.67 | 5.6M | 2.7k | https://huggingface.co/Qwen/Qwen3.6-35B-A3B |
| 32 | DeepSeek V4 Pro (Non-reasoning) | DeepSeek | 1M | 1600B | 31.94 | -- | -- | 0.72 | 0.08 | 0.50 | 1.2M | 5.5k | https://huggingface.co/deepseek-ai/DeepSeek-V4-Pro |
| 33 | Ring-2.6-1T | InclusionAI | 262.1k | 1000B | 31.66 | 42.83 | 20.10 | 0.86 | 0.22 | 0.67 | 575 | 105 | https://huggingface.co/inclusionAI/Ring-2.6-1T |
| 34 | DeepSeek V3.1 Terminus (Reasoning) | DeepSeek | 128k | 685B | 31.36 | 43.50 | 19.85 | 0.79 | 0.16 | 0.68 | 18.2k | 365 | https://huggingface.co/deepseek-ai/DeepSeek-V3.1-Terminus |
| 35 | Qwen3.6 27B (Non-reasoning) | Alibaba | 262.1k | 27.80B | 31.33 | 46.63 | 23.63 | 0.83 | 0.15 | 0.64 | 6.5M | 2.3k | https://huggingface.co/Qwen/Qwen3.6-27B |
| 36 | Mistral Medium 3.5 | Mistral | 256k | 128B | 30.39 | 46.90 | 19.21 | 0.75 | 0.14 | 0.65 | 93.5k | 427 | https://huggingface.co/mistralai/Mistral-Medium-3.5-128B |
| 37 | Kimi K2.5 (Non-reasoning) | Kimi | 256k | 1000B | 30.05 | -- | -- | 0.79 | 0.13 | 0.65 | 764.6k | 2.9k | https://huggingface.co/moonshotai/Kimi-K2.5 |
| 38 | Qwen3.5 27B (Non-reasoning) | Alibaba | 262.1k | 27.80B | 29.96 | -- | -- | 0.84 | 0.14 | 0.61 | 2.8M | 1k | https://huggingface.co/Qwen/Qwen3.5-27B |
| 39 | Qwen3.5 35B A3B (Reasoning) | Alibaba | 262.1k | 36B | 29.91 | -- | -- | 0.85 | 0.21 | 0.68 | 2.5M | 1.5k | https://huggingface.co/Qwen/Qwen3.5-35B-A3B |
| 40 | Gemma 4 31B (Reasoning) | Google | 256k | 30.70B | 29.69 | 43.43 | 14.38 | 0.86 | 0.24 | 0.68 | 9.1M | 3.6k | https://huggingface.co/google/gemma-4-31B-it |
| 41 | GLM-4.6 (Reasoning) | Z AI | 200k | 357B | 29.30 | 45.77 | 18.62 | 0.78 | 0.14 | 0.55 | -- | -- | https://github.com/zai-org/GLM-4.6 |
| 42 | DeepSeek V4 Flash (Non-reasoning) | DeepSeek | 1M | 284B | 29.28 | -- | -- | 0.72 | 0.08 | 0.37 | 1.8M | 2.1k | https://huggingface.co/deepseek-ai/DeepSeek-V4-Flash |
| 43 | Qwen3.5 122B A10B (Non-reasoning) | Alibaba | 262.1k | 125B | 28.18 | 43.34 | 16.25 | 0.83 | 0.16 | 0.62 | 1.9M | 609 | https://huggingface.co/Qwen/Qwen3.5-122B-A10B |
| 44 | GLM-4.7 (Non-reasoning) | Z AI | 200k | 357B | 27.10 | -- | -- | 0.66 | 0.06 | 0.41 | 71.7k | 2.1k | https://huggingface.co/zai-org/GLM-4.7 |
| 45 | Ling-2.6-1T | InclusionAI | 262.1k | 1026B | 26.57 | -- | -- | 0.75 | 0.09 | 0.38 | 990 | 508 | https://huggingface.co/inclusionAI/Ling-2.6-1T |
| 46 | Gemma 4 26B A4B (Reasoning) | Google | 256k | 25.20B | 26.07 | 39.32 | 11.04 | 0.79 | 0.19 | 0.62 | 9.2M | 1.4k | https://huggingface.co/google/gemma-4-26B-A4B-it |
| 47 | DeepSeek V3.2 Exp (Reasoning) | DeepSeek | 128k | 685B | 25.94 | -- | -- | 0.80 | 0.15 | 0.72 | 119.5k | 997 | https://huggingface.co/deepseek-ai/DeepSeek-V3.2-Exp |
| 48 | Nemotron 3 Super 120B A12B (Reasoning) | NVIDIA | 1M | 120.60B | 25.67 | 37.72 | 8.79 | 0.80 | 0.21 | 0.60 | 934k | 422 | https://huggingface.co/nvidia/NVIDIA-Nemotron-3-Super-120B-A12B-BF16 |
| 49 | DeepSeek V3.2 (Non-reasoning) | DeepSeek | 128k | 685B | 25.13 | -- | -- | 0.75 | 0.11 | 0.43 | 1.3M | 1.5k | https://huggingface.co/deepseek-ai/DeepSeek-V3.2 |
| 50 | Qwen3.6 35B A3B (Non-reasoning) | Alibaba | 262.1k | 36B | 24.55 | 28.14 | 19.21 | 0.82 | 0.14 | 0.60 | 5.6M | 2.7k | https://huggingface.co/Qwen/Qwen3.6-35B-A3B |
| 51 | Qwen3.5 35B A3B (Non-reasoning) | Alibaba | 262.1k | 36B | 24.32 | 36.98 | 11.82 | 0.82 | 0.13 | 0.60 | 2.5M | 1.5k | https://huggingface.co/Qwen/Qwen3.5-35B-A3B |
| 52 | gpt-oss-120b (high) | OpenAI | 131.1k | 117B | 24.13 | 30.44 | 13.43 | 0.78 | 0.20 | 0.51 | 4.7M | 5.1k | https://huggingface.co/openai/gpt-oss-120b |
| 53 | Kimi K2 0905 | Kimi | 256k | 1000B | 23.96 | -- | -- | 0.77 | 0.06 | 0.54 | 41.2k | 786 | https://huggingface.co/moonshotai/Kimi-K2-Instruct-0905 |
| 54 | Nemotron 3.5 Lightning | NVIDIA | 1M | 31.60B | 23.63 | 26.76 | 13.85 | 0.74 | 0.11 | 0.55 | -- | -- | -- |
| 55 | GLM-4.6 (Non-reasoning) | Z AI | 200k | 357B | 23.38 | -- | -- | 0.63 | 0.05 | 0.28 | -- | -- | https://github.com/zai-org/GLM-4.6 |
| 56 | GLM-4.7-Flash (Reasoning) | Z AI | 200k | 31.20B | 23.28 | -- | -- | 0.58 | 0.08 | 0.41 | 2M | 1.8k | https://huggingface.co/zai-org/GLM-4.7-Flash |
| 57 | DeepSeek V3.2 Speciale | DeepSeek | 128k | 685B | 22.61 | -- | -- | 0.87 | 0.29 | 0.64 | 7.8k | 721 | https://huggingface.co/deepseek-ai/DeepSeek-V3.2-Speciale |
| 58 | Gemma 4 31B (Non-reasoning) | Google | 256k | 30.70B | 22.25 | 33.17 | 11.10 | 0.76 | 0.12 | 0.43 | 743.3k | 508 | https://huggingface.co/google/gemma-4-31B |
| 59 | DeepSeek V3.1 Terminus (Non-reasoning) | DeepSeek | 128k | 685B | 21.74 | -- | -- | 0.75 | 0.09 | 0.45 | 18.2k | 365 | https://huggingface.co/deepseek-ai/DeepSeek-V3.1-Terminus |
| 60 | DeepSeek V3.2 Exp (Non-reasoning) | DeepSeek | 128k | 685B | 21.66 | -- | -- | 0.74 | 0.09 | 0.45 | 119.5k | 997 | https://huggingface.co/deepseek-ai/DeepSeek-V3.2-Exp |
| 61 | DeepSeek V3.1 (Non-reasoning) | DeepSeek | 128k | 685B | 21.37 | -- | -- | 0.74 | 0.07 | 0.47 | 235.1k | 826 | https://huggingface.co/deepseek-ai/DeepSeek-V3.1 |
| 62 | Qwen3 Coder Next | Alibaba | 256k | 79.70B | 21.29 | 36.23 | 8.86 | 0.74 | 0.10 | 0.42 | 517.1k | 1.6k | https://huggingface.co/Qwen/Qwen3-Coder-Next |
| 63 | DeepSeek V3.1 (Reasoning) | DeepSeek | 128k | 685B | 20.97 | -- | -- | 0.78 | 0.14 | 0.57 | 235.1k | 826 | https://huggingface.co/deepseek-ai/DeepSeek-V3.1 |
| 64 | Qwen3 VL 235B A22B (Reasoning) | Alibaba | 262.1k | 235B | 20.91 | -- | -- | 0.77 | 0.12 | 0.63 | 1.4M | 415 | https://huggingface.co/Qwen/Qwen3-VL-235B-A22B-Instruct |
| 65 | Gemma 4 26B A4B (Non-reasoning) | Google | 256k | 25.20B | 20.38 | -- | -- | 0.71 | 0.11 | 0.41 | 9.2M | 1.4k | https://huggingface.co/google/gemma-4-26B-A4B-it |
| 66 | DeepSeek R1 0528 (May '25) | DeepSeek | 128k | 685B | 20.37 | -- | -- | 0.81 | 0.16 | 0.57 | 178.4k | 2.5k | https://huggingface.co/deepseek-ai/DeepSeek-R1-0528 |
| 67 | Qwen3 235B A22B 2507 (Reasoning) | Alibaba | 256k | 235B | 19.89 | 22.11 | 3.83 | 0.79 | 0.16 | 0.71 | 28.3k | 406 | https://huggingface.co/Qwen/Qwen3-235B-A22B-Thinking-2507 |
| 68 | GLM-4.5 (Reasoning) | Z AI | 128k | 355B | 19.75 | -- | -- | 0.78 | 0.13 | 0.52 | 116.4k | 1.4k | https://huggingface.co/zai-org/GLM-4.5 |
| 69 | Mistral Small 4 (Reasoning) | Mistral | 256k | 119B | 19.71 | 26.64 | 4.63 | 0.77 | 0.10 | 0.47 | 81.3k | 419 | https://huggingface.co/mistralai/Mistral-Small-4-119B-2603 |
| 70 | Kimi K2 | Kimi | 128k | 1000B | 19.65 | -- | -- | 0.77 | 0.07 | 0.53 | 174.4k | 2.4k | https://huggingface.co/moonshotai/Kimi-K2-Instruct |
| 71 | Devstral 2 | Mistral | 256k | 125B | 19.24 | 31.26 | 10.64 | 0.59 | 0.04 | 0.31 | 26.2k | 336 | https://huggingface.co/mistralai/Devstral-2-123B-Instruct-2512 |
| 72 | DeepSeek R1 (Jan '25) | DeepSeek | 128k | 685B | 18.59 | 24.64 | 3.09 | 0.71 | 0.09 | 0.56 | 5.9M | 13.6k | https://huggingface.co/deepseek-ai/DeepSeek-R1 |
| 73 | Qwen3 235B A22B 2507 Instruct | Alibaba | 256k | 235B | 18.36 | -- | -- | 0.75 | 0.11 | 0.33 | 45.8k | 793 | https://huggingface.co/Qwen/Qwen3-235B-A22B-Instruct-2507 |
| 74 | Qwen3 Coder 480B A35B Instruct | Alibaba | 262.1k | 480B | 18.18 | -- | -- | 0.62 | 0.05 | 0.45 | 76.3k | 1.4k | https://huggingface.co/Qwen/Qwen3-Coder-480B-A35B-Instruct |
| 75 | Qwen3 VL 32B (Reasoning) | Alibaba | 256k | 33.40B | 18.13 | -- | -- | 0.73 | 0.10 | 0.57 | 14.4k | 87 | https://huggingface.co/Qwen/Qwen3-VL-32B-Thinking |
| 76 | Nemotron Cascade 2 30B A3B | NVIDIA | 1M | 31.60B | 17.76 | 25.35 | -- | 0.76 | 0.12 | 0.38 | 56.9k | 523 | https://huggingface.co/nvidia/Nemotron-Cascade-2-30B-A3B |
| 77 | Devstral Small 2 | Mistral | 256k | 24B | 17.72 | 29.33 | 10.82 | 0.53 | 0.03 | 0.27 | 182.3k | 644 | https://huggingface.co/mistralai/Devstral-Small-2-24B-Instruct-2512 |
| 78 | GLM-4.6V (Reasoning) | Z AI | 128k | 108B | 16.90 | -- | -- | 0.72 | 0.10 | 0.45 | 8.3k | 396 | https://huggingface.co/zai-org/GLM-4.6V |
| 79 | Qwen3 Next 80B A3B (Reasoning) | Alibaba | 262.1k | 80B | 16.87 | 17.42 | 2.06 | 0.76 | 0.13 | 0.62 | 42k | 494 | https://huggingface.co/Qwen/Qwen3-Next-80B-A3B-Thinking |
| 80 | GLM-4.5-Air | Z AI | 128k | 106B | 16.66 | -- | -- | 0.73 | 0.07 | 0.46 | 183.9k | 635 | https://huggingface.co/zai-org/GLM-4.5-Air |
| 81 | Ring-1T | InclusionAI | 128k | 1000B | 16.29 | -- | -- | 0.77 | 0.11 | 0.53 | 244 | 233 | https://huggingface.co/inclusionAI/Ring-1T |
| 82 | Mistral Large 3 | Mistral | 256k | 675B | 15.92 | 20.07 | 5.52 | 0.68 | 0.04 | 0.35 | 1.6k | 245 | https://huggingface.co/mistralai/Mistral-Large-3-675B-Instruct-2512 |
| 83 | GLM-4.7-Flash (Non-reasoning) | Z AI | 200k | 31.20B | 15.62 | -- | -- | 0.45 | 0.05 | 0.18 | 2M | 1.8k | https://huggingface.co/zai-org/GLM-4.7-Flash |
| 84 | DeepSeek V3 0324 | DeepSeek | 128k | 671B | 15.23 | 21.16 | 1.58 | 0.65 | 0.05 | 0.41 | 1.1M | 3.2k | https://huggingface.co/deepseek-ai/DeepSeek-V3-0324 |
| 85 | gpt-oss-20b (high) | OpenAI | 131.1k | 21B | 15.23 | 20.70 | 3.10 | 0.69 | 0.11 | 0.33 | 7.5M | 4.9k | https://huggingface.co/openai/gpt-oss-20b |
| 86 | Nemotron 3 Nano Omni 30B A3B Reasoning | NVIDIA | 256k | 30B | 15.01 | 13.75 | -- | 0.47 | 0.05 | 0.41 | 400.4k | 418 | https://huggingface.co/nvidia/Nemotron-3-Nano-Omni-30B-A3B-Reasoning-BF16 |
| 87 | gpt-oss-120b (low) | OpenAI | 131.1k | 117B | 14.93 | 21.24 | 0.96 | 0.67 | 0.06 | 0.46 | 4.7M | 5.1k | https://huggingface.co/openai/gpt-oss-120b |
| 88 | Mistral Small 3.1 | Mistral | 128k | 24B | 14.87 | 26.31 | 5.30 | 0.45 | 0.04 | 0.22 | 1.7k | 273 | https://huggingface.co/mistralai/Mistral-Small-3.1-24B-Base-2503 |
| 89 | Qwen3 30B A3B 2507 (Reasoning) | Alibaba | 262.1k | 30.50B | 14.57 | 12.11 | 1.79 | 0.71 | 0.10 | 0.60 | 78.8k | 380 | https://huggingface.co/Qwen/Qwen3-30B-A3B-Thinking-2507 |
| 90 | NVIDIA Nemotron 3 Nano 30B A3B (Reasoning) | NVIDIA | 1M | 31.60B | 14.54 | 14.37 | 1.99 | 0.76 | 0.11 | 0.37 | 991.9k | 813 | https://huggingface.co/nvidia/NVIDIA-Nemotron-3-Nano-30B-A3B-BF16 |
| 91 | Llama 4 Maverick | Meta | 1M | 402B | 14.48 | 16.28 | 1.24 | 0.67 | 0.05 | 0.50 | 13.8k | 505 | https://huggingface.co/meta-llama/Llama-4-Maverick-17B-128E-Instruct |
| 92 | gpt-oss-20b (low) | OpenAI | 131.1k | 21B | 14.40 | -- | -- | 0.61 | 0.05 | 0.31 | 7.5M | 4.9k | https://huggingface.co/openai/gpt-oss-20b |
| 93 | Qwen3 VL 235B A22B Instruct | Alibaba | 262.1k | 235B | 14.37 | -- | -- | 0.71 | 0.07 | 0.32 | 1.4M | 415 | https://huggingface.co/Qwen/Qwen3-VL-235B-A22B-Instruct |
| 94 | DeepSeek V3 (Dec '24) | DeepSeek | 128k | 671B | 14.22 | 23.04 | 1.58 | 0.56 | 0.03 | 0.32 | 1M | 4.2k | https://huggingface.co/deepseek-ai/DeepSeek-V3 |
| 95 | Ling 2.6 Flash | InclusionAI | 262.1k | 107B | 14.22 | 25.26 | 2.25 | 0.59 | 0.06 | 0.28 | 2.4k | 506 | https://huggingface.co/inclusionAI/Ling-2.6-flash |
| 96 | Qwen3 Next 80B A3B Instruct | Alibaba | 262.1k | 80B | 13.75 | -- | -- | 0.74 | 0.08 | 0.52 | 244.5k | 1k | https://huggingface.co/Qwen/Qwen3-Next-80B-A3B-Instruct |
| 97 | Qwen3 Coder 30B A3B Instruct | Alibaba | 262.1k | 30.50B | 13.63 | -- | -- | 0.52 | 0.04 | 0.32 | 1M | 1.2k | https://huggingface.co/Qwen/Qwen3-Coder-30B-A3B-Instruct |
| 98 | DiffusionGemma 26B A4B | Google | 256k | 25.20B | 13.47 | 19.66 | -- | 0.67 | 0.11 | 0.18 | 2M | 1.2k | https://huggingface.co/google/diffusiongemma-26B-A4B-it |
| 99 | Qwen3 235B A22B (Reasoning) | Alibaba | 32.8k | 235B | 13.45 | -- | -- | 0.70 | 0.11 | 0 | 478.6k | 1.1k | https://huggingface.co/Qwen/Qwen3-235B-A22B |
| 100 | Qwen3 VL 30B A3B (Reasoning) | Alibaba | 256k | 30B | 13.35 | -- | -- | 0.72 | 0.09 | 0.43 | 69.8k | 200 | https://huggingface.co/Qwen/Qwen3-VL-30B-A3B-Thinking |
| 101 | Ling-1T | InclusionAI | 128k | 1000B | 12.75 | -- | -- | 0.72 | 0.07 | 0.36 | 2.3k | 544 | https://huggingface.co/inclusionAI/Ling-1T |
| 102 | Llama Nemotron Super 49B v1.5 (Reasoning) | NVIDIA | 128k | 49B | 12.40 | -- | -- | 0.75 | 0.07 | 0.35 | 16.2k | 235 | https://huggingface.co/nvidia/Llama-3_3-Nemotron-Super-49B-v1_5 |
| 103 | Mistral Small 4 (Non-reasoning) | Mistral | 256k | 119B | 12.35 | -- | -- | 0.57 | 0.04 | 0.24 | 81.3k | 419 | https://huggingface.co/mistralai/Mistral-Small-4-119B-2603 |
| 104 | Llama 3.3 Nemotron Super 49B v1 (Reasoning) | NVIDIA | 128k | 49B | 12.22 | -- | -- | 0.64 | 0.06 | 0.17 | 191.6k | 326 | https://huggingface.co/nvidia/Llama-3_3-Nemotron-Super-49B-v1 |
| 105 | Devstral Small (May '25) | Mistral | 256k | 23.60B | 11.78 | -- | -- | 0.43 | 0.04 | 0.30 | 2.7k | 867 | https://huggingface.co/mistralai/Devstral-Small-2505 |
| 106 | Magistral Small 1.2 | Mistral | 128k | 24B | 11.46 | 14.72 | 1.51 | 0.66 | 0.06 | 0.18 | 5.1k | 304 | https://huggingface.co/mistralai/Magistral-Small-2509 |
| 107 | Qwen3 32B (Reasoning) | Alibaba | 32.8k | 32.80B | 11.45 | 15.30 | 1.79 | 0.67 | 0.07 | 0 | 3.5M | 737 | https://huggingface.co/Qwen/Qwen3-32B |
| 108 | Qwen3 VL 32B Instruct | Alibaba | 256k | 33.40B | 10.99 | -- | -- | 0.67 | 0.07 | 0.34 | 1.4M | 234 | https://huggingface.co/Qwen/Qwen3-VL-32B-Instruct |
| 109 | DeepSeek R1 Distill Qwen 32B | DeepSeek | 128k | 32B | 10.96 | -- | -- | 0.62 | 0.05 | 0.08 | 641.3k | 1.6k | https://huggingface.co/deepseek-ai/DeepSeek-R1-Distill-Qwen-32B |
| 110 | GLM-4.6V (Non-reasoning) | Z AI | 128k | 108B | 10.90 | -- | -- | 0.57 | 0.04 | 0.14 | 8.3k | 396 | https://huggingface.co/zai-org/GLM-4.6V |
| 111 | Qwen3 235B A22B (Non-reasoning) | Alibaba | 32.8k | 235B | 10.77 | -- | -- | 0.61 | 0.04 | 0 | 478.6k | 1.1k | https://huggingface.co/Qwen/Qwen3-235B-A22B |
| 112 | Mistral Small 3.2 | Mistral | 128k | 24B | 10.66 | 12.54 | 2.06 | 0.51 | 0.04 | 0.19 | 298.5k | 604 | https://huggingface.co/mistralai/Mistral-Small-3.2-24B-Instruct-2506 |
| 113 | Magistral Small 1 | Mistral | 40k | 23.60B | 10.61 | -- | -- | 0.64 | 0.08 | 0 | 85.7k | 610 | https://huggingface.co/mistralai/Magistral-Small-2506 |
| 114 | Llama 4 Scout | Meta | 10M | 109B | 10.26 | 8.17 | 1.10 | 0.59 | 0.04 | 0.30 | 382.5k | 1.3k | https://huggingface.co/meta-llama/Llama-4-Scout-17B-16E-Instruct |
| 115 | Qwen3 VL 30B A3B Instruct | Alibaba | 256k | 30B | 9.90 | -- | -- | 0.69 | 0.06 | 0.27 | 396.1k | 592 | https://huggingface.co/Qwen/Qwen3-VL-30B-A3B-Instruct |
| 116 | DeepSeek R1 Distill Llama 70B | DeepSeek | 128k | 70B | 9.81 | -- | -- | 0.40 | 0.05 | 0.09 | 114.9k | 798 | https://huggingface.co/deepseek-ai/DeepSeek-R1-Distill-Llama-70B |
| 117 | Ling-flash-2.0 | InclusionAI | 128k | 103B | 9.61 | -- | -- | 0.66 | 0.06 | 0.16 | 2.8k | 218 | https://huggingface.co/inclusionAI/Ling-flash-2.0 |
| 118 | Qwen3 Omni 30B A3B (Reasoning) | Alibaba | 65.5k | 35.30B | 9.50 | -- | -- | 0.73 | 0.07 | 0 | 416.3k | 316 | https://huggingface.co/Qwen/Qwen3-Omni-30B-A3B-Thinking |
| 119 | Qwen2.5 Instruct 72B | Alibaba | 131.1k | 72B | 9.44 | -- | -- | 0.49 | 0.04 | 0.20 | 373.4k | 973 | https://huggingface.co/Qwen/Qwen2.5-72B-Instruct |
| 120 | Llama 3.3 Instruct 70B | Meta | 128k | 70B | 9.26 | 11.93 | -- | 0.50 | 0.04 | 0.16 | 309.8k | 3k | https://huggingface.co/meta-llama/Llama-3.3-70B-Instruct |
| 121 | Qwen3 30B A3B (Reasoning) | Alibaba | 32.8k | 30.50B | 9.17 | -- | -- | 0.62 | 0.06 | 0 | 2.6M | 926 | https://huggingface.co/Qwen/Qwen3-30B-A3B |
| 122 | Devstral Small (Jul '25) | Mistral | 256k | 24B | 9.11 | -- | -- | 0.41 | 0.04 | 0.19 | 60.1k | 368 | https://huggingface.co/mistralai/Devstral-Small-2507 |
| 123 | GLM-4.5V (Reasoning) | Z AI | 64k | 108B | 9 | -- | -- | 0.68 | 0.06 | 0 | 101.3k | 721 | https://huggingface.co/zai-org/GLM-4.5V |
| 124 | Mistral Large 2 (Nov '24) | Mistral | 128k | 123B | 8.99 | -- | -- | 0.49 | 0.03 | 0.05 | 12.8k | 265 | https://huggingface.co/mistralai/Mistral-Large-Instruct-2411 |
| 125 | Llama 3.1 Nemotron Ultra 253B v1 (Reasoning) | NVIDIA | 128k | 253B | 8.92 | -- | -- | 0.73 | 0.07 | 0.08 | 1.9k | 354 | https://huggingface.co/nvidia/Llama-3_1-Nemotron-Ultra-253B-v1 |
| 126 | Qwen3 30B A3B 2507 Instruct | Alibaba | 262.1k | 30.50B | 8.91 | -- | -- | 0.66 | 0.07 | 0.25 | 1.8M | 828 | https://huggingface.co/Qwen/Qwen3-30B-A3B-Instruct-2507 |
| 127 | Llama Nemotron Super 49B v1.5 (Non-reasoning) | NVIDIA | 128k | 49B | 8.51 | -- | -- | 0.48 | 0.04 | 0.24 | 16.2k | 235 | https://huggingface.co/nvidia/Llama-3_3-Nemotron-Super-49B-v1_5 |
| 128 | Qwen3 32B (Non-reasoning) | Alibaba | 32.8k | 32.80B | 8.46 | -- | -- | 0.54 | 0.04 | 0 | 3.5M | 737 | https://huggingface.co/Qwen/Qwen3-32B |
| 129 | Kimi Linear 48B A3B Instruct | Kimi | 1M | 49.10B | 8.35 | -- | -- | 0.41 | 0.02 | 0.27 | 185.3k | 578 | https://huggingface.co/moonshotai/Kimi-Linear-48B-A3B-Instruct |
| 130 | Llama 3.1 Instruct 405B | Meta | 128k | 405B | 8.32 | -- | -- | 0.52 | 0.04 | 0.25 | 162.9k | 986 | https://huggingface.co/meta-llama/Meta-Llama-3.1-405B |
| 131 | Llama 3.3 Nemotron Super 49B v1 (Non-reasoning) | NVIDIA | 128k | 49B | 8.29 | -- | -- | 0.52 | 0.04 | 0.13 | 191.6k | 326 | https://huggingface.co/nvidia/Llama-3_3-Nemotron-Super-49B-v1 |
| 132 | Ring-flash-2.0 | InclusionAI | 128k | 103B | 7.97 | -- | -- | 0.73 | 0.10 | 0.24 | 165 | 102 | https://huggingface.co/inclusionAI/Ring-flash-2.0 |
| 133 | Pixtral Large | Mistral | 128k | 124B | 7.96 | -- | -- | 0.51 | 0.03 | 0.12 | 63 | 434 | https://huggingface.co/mistralai/Pixtral-Large-Instruct-2411 |
| 134 | Llama 3.1 Nemotron Instruct 70B | NVIDIA | 128k | 70B | 7.43 | -- | -- | 0.46 | 0.04 | 0.07 | 10.7k | 2.1k | https://huggingface.co/nvidia/Llama-3.1-Nemotron-70B-Instruct-HF |
| 135 | Gemma 3 27B Instruct | Google | 128k | 27.40B | 7.36 | 10.06 | 0.27 | 0.43 | 0.04 | 0.06 | 590.1k | 2k | https://huggingface.co/google/gemma-3-27b-it |
| 136 | Qwen2.5 Instruct 32B | Alibaba | 128k | 32B | 7.23 | -- | -- | 0.47 | 0.04 | -- | 2.2M | 355 | https://huggingface.co/Qwen/Qwen2.5-32B-Instruct |
| 137 | NVIDIA Nemotron 3 Nano 30B A3B (Non-reasoning) | NVIDIA | 1M | 31.60B | 7.17 | -- | -- | 0.40 | 0.05 | 0.09 | 991.9k | 813 | https://huggingface.co/nvidia/NVIDIA-Nemotron-3-Nano-30B-A3B-BF16 |
| 138 | Mistral Large 2 (Jul '24) | Mistral | 128k | 123B | 7.04 | -- | -- | 0.47 | 0.03 | 0.02 | 8.8k | 865 | https://huggingface.co/mistralai/Mistral-Large-Instruct-2407 |
| 139 | Qwen2.5 Coder Instruct 32B | Alibaba | 131.1k | 32B | 6.88 | -- | -- | 0.42 | 0.04 | -- | 1.4M | 2.1k | https://huggingface.co/Qwen/Qwen2.5-Coder-32B-Instruct |
| 140 | GLM-4.5V (Non-reasoning) | Z AI | 64k | 108B | 6.76 | -- | -- | 0.57 | 0.03 | 0 | 101.3k | 721 | https://huggingface.co/zai-org/GLM-4.5V |
| 141 | Mistral Small 3 | Mistral | 32k | 24B | 6.69 | -- | -- | 0.46 | 0.04 | 0 | 49.2k | 966 | https://huggingface.co/mistralai/Mistral-Small-24B-Instruct-2501 |
| 142 | Qwen3 30B A3B (Non-reasoning) | Alibaba | 32.8k | 30.50B | 6.56 | -- | -- | 0.52 | 0.05 | 0 | 2.6M | 926 | https://huggingface.co/Qwen/Qwen3-30B-A3B |
| 143 | DeepSeek-V2.5 (Dec '24) | DeepSeek | 128k | 236B | 6.55 | -- | -- | 0.42 | -- | -- | 686 | 257 | https://huggingface.co/deepseek-ai/DeepSeek-V2.5-1210 |
| 144 | Llama 3.1 Instruct 70B | Meta | 128k | 70B | 6.51 | -- | -- | 0.41 | 0.04 | 0.08 | 42.9k | 432 | https://huggingface.co/meta-llama/Meta-Llama-3.1-70B |
| 145 | DeepSeek-V2.5 | DeepSeek | 128k | 236B | 6.37 | -- | -- | -- | -- | -- | 7.5k | 734 | https://huggingface.co/deepseek-ai/DeepSeek-V2.5 |
| 146 | Llama 3.2 Instruct 90B (Vision) | Meta | 128k | 90B | 5.97 | -- | -- | 0.43 | 0.04 | -- | 142 | 134 | https://huggingface.co/meta-llama/Llama-3.2-90B-Vision |
| 147 | Qwen2 Instruct 72B | Alibaba | 131.1k | 72B | 5.74 | -- | -- | 0.37 | 0.04 | -- | 46.6k | 718 | https://huggingface.co/Qwen/Qwen2-72B-Instruct |
| 148 | Qwen3 Omni 30B A3B Instruct | Alibaba | 65.5k | 35.30B | 4.80 | -- | -- | 0.62 | 0.05 | 0 | 1M | 987 | https://huggingface.co/Qwen/Qwen3-Omni-30B-A3B-Instruct |
| 149 | DeepSeek-Coder-V2 | DeepSeek | 128k | 236B | 4.74 | -- | -- | -- | -- | -- | 8.6k | 699 | https://huggingface.co/deepseek-ai/DeepSeek-Coder-V2-Instruct |
| 150 | Mistral Small (Sep '24) | Mistral | 32.8k | 22B | 4.33 | -- | -- | 0.38 | 0.04 | -- | 5.7k | 393 | https://huggingface.co/mistralai/Mistral-Small-Instruct-2409 |
| 151 | Mixtral 8x22B Instruct | Mistral | 65.4k | 141B | 4.01 | -- | -- | 0.33 | 0.04 | -- | 51.1k | 757 | https://huggingface.co/mistralai/Mixtral-8x22B-Instruct-v0.1 |
| 152 | Qwen1.5 Chat 110B | Alibaba | 32k | 110B | 3.73 | -- | -- | 0.29 | -- | -- | 2.3k | 130 | https://huggingface.co/Qwen/Qwen1.5-110B-Chat |
| 153 | DeepSeek-V2-Chat | DeepSeek | 128k | 236B | 3.27 | -- | -- | -- | -- | -- | 17.9k | 462 | https://huggingface.co/deepseek-ai/DeepSeek-V2-Chat |
| 154 | Llama 3 Instruct 70B | Meta | 8.2k | 70B | 3.10 | -- | -- | 0.38 | 0.05 | 0 | 1.8M | 4.8k | https://huggingface.co/meta-llama/Meta-Llama-3-8B-Instruct |
| 155 | Qwen Chat 72B | Alibaba | 33.8k | 72B | 3.04 | -- | -- | -- | -- | -- | 437 | 156 | https://huggingface.co/Qwen/Qwen-72B-Chat |
| 156 | Llama 2 Chat 70B | Meta | 4.1k | 70B | 2.61 | -- | -- | 0.33 | 0.05 | -- | 10.3k | 2.2k | https://huggingface.co/meta-llama/Llama-2-70b-chat-hf |
| 157 | Mixtral 8x7B Instruct | Mistral | 32.8k | 46.70B | 2.01 | -- | -- | 0.29 | 0.05 | -- | 525.5k | 4.7k | https://huggingface.co/mistralai/Mixtral-8x7B-Instruct-v0.1 |
| 158 | Llama 65B | Meta | 2k | 65B | 1.71 | -- | -- | -- | -- | -- | 926 | 78 | https://huggingface.co/huggyllama/llama-65b |
