# Hardware Sizing Overview

This folder stores fixed data for an overview model/hardware recommendation UI.

## Files

- `hardware_sizing_data.json`: machine-readable data for the web app.
- `local_models.md`: filtered model shortlist with benchmark and Hugging Face popularity fields.

## Calculator Split

Use two separate paths:

```text
if hardware.type == "dgx_spark":
  use DGX Spark fixed calculator
else:
  use standard GPU calculator
```

DGX Spark must not use the normal VRAM + system RAM formula because it uses coherent unified memory.

## Standard GPU Overview Formula

Inputs:

```text
useCase
modelB
quant
concurrent
systemRamGb
```

Derived from selected GPU:

```text
totalGpuVramGb = gpu.vramGb * gpuCount
```

Formula:

```text
weightGb = modelB * quantFactor * 1.15
kvGb = modelB * concurrent * contextTokens / 100000 * 0.12
requiredGpuVramGb = (weightGb + kvGb + 4) / 0.85
requiredSystemRamGb = weightGb + 16
```

Quant factors:

| quant | GB per 1B params |
|---|---:|
| FP16 / BF16 | 2 |
| Q-8bit | 1 |
| Q6 | 0.75 |
| Q5 | 0.625 |
| Q-4bit | 0.5 |

Use case presets:

| use case | internal context |
|---|---:|
| Chat | 4k |
| Agent | 8k |
| RAG / Docs | 16k |
| Long Context | 32k |

Recommendation rules:

| condition | recommendation |
|---|---|
| GPU VRAM short | add GPU, pick smaller model, lower quant, lower concurrent, or lower use case intensity |
| System RAM short | add RAM in 16GB or 32GB steps |
| Long context bottleneck | prefer more VRAM before more system RAM |
| Multi-GPU selected | treat VRAM as additive only if serving stack supports model parallelism |

## DGX Spark Calculator

DGX Spark uses fixed profile and capacity tables.

Source facts from NVIDIA:

| profile | memory | NVIDIA model claim |
|---|---:|---:|
| 1x DGX Spark | 128GB unified memory | up to 200B inference |
| 2x DGX Spark | 256GB unified memory | up to 405B inference |

Internal conservative profile:

| stack | usable AI memory | max model |
|---:|---:|---:|
| 1 | 100GB | 200B |
| 2 | 200GB | 405B |

DGX Spark UI inputs:

```text
useCase
modelB
concurrent
stackCount
quant
```

Do not ask for:

```text
GPU VRAM
System RAM
RAM +16GB
```

DGX Spark output should show:

```text
stack profile
supported concurrent
required unified memory
memory headroom
status
upgrade options
```

Status rules:

```text
requiredMemoryGb = (weightGb + kvGb + 4) / 0.85
if modelB > maxModelB or requiredMemoryGb > usableAiMemoryGb: not_supported
else if concurrent <= supportedConcurrent: recommended
else if concurrent <= supportedConcurrent * 1.35: borderline
else: not_recommended
```

Upgrade options:

```text
increase stack from 1x to 2x
use smaller model bucket
reduce workload intensity
reduce concurrent users
```

## GPU Selection UI

Use `gpuCatalog` from `hardware_sizing_data.json`.

The user should choose:

```text
GPU model
GPU quantity
```

The app calculates:

```text
totalGpuVramGb = selectedGpu.vramGb * quantity
```

This avoids asking the user to type VRAM manually.

## Sources

- NVIDIA DGX Spark: https://www.nvidia.com/en-us/products/workstations/dgx-spark/
- Hugging Face LLM optimization guide: https://huggingface.co/docs/transformers/main/en/llm_tutorial_optimization
- NVIDIA H100: https://www.nvidia.com/en-us/data-center/h100/
- NVIDIA L40S: https://www.nvidia.com/en-us/data-center/l40s/
