# Metadata Validation and Completion Report

ตรวจสอบจาก `metadata_completion_queue.md` และ repository/model card ของ Hugging Face ที่ระบุไว้ในรายการ ณ 2026-09-07

## สรุปผล

- รายการที่ queue ระบุว่าขาด metadata ไม่ได้หมายความว่า model config ขาดจริงเสมอไป; หลายรายการมีค่าอยู่ใน `config.json` แต่ยังไม่ได้ถูก ingest เข้าฐานข้อมูล
- ต้องอ่านค่าจาก model repository ของ **รุ่นที่ใช้งานจริง** เท่านั้น โดยเฉพาะโมเดล multimodal/MoE ที่มี config ซ้อน (`text_config`, `language_config`) และอาจมี `head_dim` แยกจาก `hidden_size / num_attention_heads`
- ค่า `parameters (B)` ใน catalog เป็นค่าประมาณเพื่อแสดงผล ไม่ควรใช้แทน `totalParameters` จาก config/index ของ weights

## ข้อผิดพลาดที่ยืนยันได้

| ID | รายการ | ปัญหา | การแก้ไข |
|---:|---|---|---|
| 154 | Llama 3 Instruct 70B | source ปัจจุบันคือ `meta-llama/Meta-Llama-3-8B-Instruct` แต่รายการระบุ 70B; config ของ source นี้จึงให้ประมาณ 8.03B | เปลี่ยน source เป็น `meta-llama/Meta-Llama-3-70B-Instruct` หรือ repository 70B ที่ใช้งานจริง แล้วอ่าน config ใหม่ |
| 146 | Llama 3.2 Instruct 90B (Vision) | source ที่ระบุไม่มี suffix `-Instruct` และควรแยก vision/text config | ใช้ `meta-llama/Llama-3.2-90B-Vision-Instruct`; เก็บ `text_config` เป็น metadata ของ LLM และแยก vision tower |
| 133 | Pixtral Large | เป็น multimodal model; ไม่ควรใช้ config ชั้นนอกอย่างเดียวเป็น text LLM config | อ่าน nested text/language config และบันทึก `modality=vision-language` |
| 17, 54 | Ling 3.0 Flash, Nemotron 3.5 Lightning | ไม่มี first-party source ใน queue | ห้ามเติมค่าจากชื่อหรือ model size; ต้องเพิ่ม canonical repository/model card ก่อน |

## ค่าที่เติมได้ด้วยความเชื่อมั่นสูง

ค่าด้านล่างเป็นค่ามาตรฐานจาก architecture/config ของรุ่นที่ระบุ ควรเขียนลงฐานข้อมูลหลังยืนยันว่า repository ตรงกับ variant ใน catalog:

| กลุ่มโมเดล | architecture | layers | attention heads | KV heads | hidden/head dim |
|---|---|---:|---:|---:|---|
| Llama 2 70B | Llama | 80 | 64 | 8 | 8192 / 128 |
| Llama 3 70B | Llama | 80 | 64 | 8 | 8192 / 128 |
| Llama 3.1 70B | Llama | 80 | 64 | 8 | 8192 / 128 |
| Llama 3.3 70B | Llama | 80 | 64 | 8 | 8192 / 128 |
| Llama 65B (original) | Llama | 80 | 64 | 64 | 8192 / 128 |
| Mistral Large 2 | Mistral | 88 | 32 | 8 | 12288 / 128 |
| Mistral Small 3.1/3.2 | Mistral | 40 | 32 | 8 | 5120 / 128 |
| Gemma 3 27B | Gemma3 | 62 | 32 | 16 | 5376 / 128 |

หมายเหตุ: ตารางนี้เป็นค่าของ text transformer; สำหรับ vision/MoE models ให้เก็บ `totalParameters`, `activeParameters`, vision config และ expert counts แยกกัน

## รายการที่ยังไม่ควรเติมแบบเดา

ให้คงสถานะ `needs_config_verification` สำหรับ Mistral Medium 3.5, Qwen3.5/3.6, GLM-4.5V/4.6V/4.7-Flash, Nemotron 3, Qwen3 VL/Omni, Gemma 4, DiffusionGemma, Kimi Linear และโมเดลใหม่ที่มี hybrid/linear attention จนกว่าจะอ่านค่าจาก `config.json` รุ่นปัจจุบันโดยตรง เนื่องจาก:

1. บางรุ่นเป็น multimodal และมี config ซ้อน
2. บางรุ่นเป็น MoE ซึ่ง `num_experts_per_tok` ไม่ใช่จำนวน parameters ที่ต้องโหลด
3. บางรุ่นใช้ hybrid/linear attention ทำให้สูตร KV cache แบบ standard MHA ใช้ไม่ได้ทั้งโมเดล
4. ชื่อรุ่นใน queue บางรายการอาจเป็น catalog alias ไม่ใช่ชื่อ repository จริง

## Schema ที่ควรเพิ่ม

```json
{
  "canonicalRepo": "org/model",
  "configRevision": "commit-or-tag",
  "architecture": "llama|mistral|qwen3_moe|...",
  "totalParameters": 70.55,
  "activeParameters": null,
  "numHiddenLayers": 80,
  "numAttentionHeads": 64,
  "numKeyValueHeads": 8,
  "hiddenSize": 8192,
  "headDim": 128,
  "attentionType": "gqa|mha|mla|linear|hybrid",
  "maxPositionEmbeddings": 131072,
  "weightBits": 16,
  "kvCacheBits": 16,
  "modality": "text|vision-language|audio-text",
  "metadataStatus": "verified|needs_review"
}
```

## กฎตรวจสอบอัตโนมัติ

1. `hiddenSize % numAttentionHeads == 0` และถ้ามี `headDim` ให้ใช้ค่าจาก config โดยตรง
2. `numAttentionHeads % numKeyValueHeads == 0` สำหรับ GQA/MQA
3. `totalParameters >= activeParameters` สำหรับ MoE
4. `canonicalRepo` ต้องตรงกับ variant และไม่ใช้ source ของ 8B กับรายการ 70B
5. โมเดล multimodal ต้องอ่าน `text_config`/`language_config` แยกจาก vision config
6. บันทึก revision/date ของ config เพื่อให้ผลคำนวณ reproducible

## Sources

- Hugging Face model repositories listed in the queue, for example [Llama 2 70B](https://huggingface.co/meta-llama/Llama-2-70b-chat-hf), [Llama 3.1 70B](https://huggingface.co/meta-llama/Meta-Llama-3.1-70B), [Mistral Large 2](https://huggingface.co/mistralai/Mistral-Large-Instruct-2407), [Mistral Small 3.2](https://huggingface.co/mistralai/Mistral-Small-3.2-24B-Instruct-2506), and [Gemma 3 27B](https://huggingface.co/google/gemma-3-27b-it)
- Hugging Face Transformers configuration schema documents the meaning of `hidden_size`, `num_attention_heads`, and `num_hidden_layers`: [configuration reference](https://huggingface.co/docs/transformers/en/main_classes/configuration)

## Recommended next action

สร้าง ingestion job ที่ดึง `config.json` และ (สำหรับ MoE) `params.json`/weight index จาก `canonicalRepo` ที่ pin ด้วย revision จากนั้นคำนวณ derived fields (`headDim`, KV bytes/token, weight bytes) และตั้ง `metadataStatus=needs_review` เมื่อเป็น multimodal, hybrid attention หรือ source ไม่ตรง variant
