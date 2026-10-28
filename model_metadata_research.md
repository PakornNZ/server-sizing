# Model Metadata Research Audit

Source file: [`local_models.md`](./local_models.md)  
Audit date: 2026-09-07  
Method: first-party Hugging Face model API and repository `config.json`; the supplied GitHub URL was checked as supplied. For Hugging Face records, the API citation is `https://huggingface.co/api/models/{owner}/{repo}` and the repository/config links are cited in each record. No values are inferred from model names, leaderboard columns, or secondary sources.

Input rows: **158**; unique source URLs/repositories: **121**; duplicate evaluation variants are retained under their repository record.

## Counts

- fetched config/API record: **107**
- complete enough for explicit MHA/GQA/MQA topology: **70**
- incomplete: **37** (includes fetched records missing one or more requested topology fields)
- unavailable: **14** (no usable config from the supplied URL)

Completeness rule: `num_hidden_layers`, `num_attention_heads`, `num_key_value_heads`, and either explicit `head_dim` or explicit `hidden_size` must all be present. Missing `num_key_value_heads` is not silently treated as MHA.

## Per Repository

### 1. Unknown source URL

**Listed variants:**
- rank 17: Ling 3.0 Flash
- rank 54: Nemotron 3.5 Lightning

- Source repository: Unknown
- Config source: Unknown
- Repository revision/commit: Unknown
- Total parameter count: Unknown
- Architecture: Unknown
- Layers (`num_hidden_layers`): Unknown
- Query heads (`num_attention_heads`): Unknown
- KV heads (`num_key_value_heads`): Unknown
- Head dimension (`head_dim`): Unknown
- Hidden size (`hidden_size`): Unknown
- Max context (`max_position_embeddings` or explicit equivalent): Unknown
- Weight format/bits (explicit config): Unknown
- KV cache bits (explicit only): Unknown
- Confidence: **Low**
- Unresolved fields/errors: layers; query heads; KV heads; head_dim/hidden_size; max context; weight format/bits; KV cache bits not documented; No URL supplied
- Citation: Supplied source URL and error state above; no usable config was available.

### 2. https://github.com/zai-org/GLM-4.6

**Listed variants:**
- rank 41: GLM-4.6 (Reasoning)
- rank 55: GLM-4.6 (Non-reasoning)

- Source repository: https://github.com/zai-org/GLM-4.6
- Config source: Unknown
- Repository revision/commit: Unknown
- Total parameter count: Unknown
- Architecture: Unknown
- Layers (`num_hidden_layers`): Unknown
- Query heads (`num_attention_heads`): Unknown
- KV heads (`num_key_value_heads`): Unknown
- Head dimension (`head_dim`): Unknown
- Hidden size (`hidden_size`): Unknown
- Max context (`max_position_embeddings` or explicit equivalent): Unknown
- Weight format/bits (explicit config): Unknown
- KV cache bits (explicit only): Unknown
- Confidence: **Low**
- Unresolved fields/errors: layers; query heads; KV heads; head_dim/hidden_size; max context; weight format/bits; KV cache bits not documented; Supplied URL is a repository page without a directly supplied HF config.json
- Citation: Supplied source URL and error state above; no usable config was available.

### 3. https://huggingface.co/Qwen/Qwen-72B-Chat

**Listed variants:**
- rank 155: Qwen Chat 72B

- Source repository: https://huggingface.co/Qwen/Qwen-72B-Chat
- Config source: [`config.json` at revision 307fccc1a45211b087ab294a8d291f7632259322](https://huggingface.co/Qwen/Qwen-72B-Chat/resolve/307fccc1a45211b087ab294a8d291f7632259322/config.json)
- Repository revision/commit: `307fccc1a45211b087ab294a8d291f7632259322`
- Total parameter count: 72,287,920,128 (HF API safetensors.parameters: {"BF16":72287920128})
- Architecture: QWenLMHeadModel
- Layers (`num_hidden_layers`): 80
- Query heads (`num_attention_heads`): 64
- KV heads (`num_key_value_heads`): Unknown
- Head dimension (`head_dim`): Unknown
- Hidden size (`hidden_size`): 8192
- Max context (`max_position_embeddings` or explicit equivalent): 32768
- Weight format/bits (explicit config): Unknown
- KV cache bits (explicit only): Unknown
- Confidence: **Medium**
- Unresolved fields/errors: KV heads; weight format/bits; KV cache bits not documented
- Citation: HF API/repository/config sources above.

### 4. https://huggingface.co/Qwen/Qwen1.5-110B-Chat

**Listed variants:**
- rank 152: Qwen1.5 Chat 110B

- Source repository: https://huggingface.co/Qwen/Qwen1.5-110B-Chat
- Config source: [`config.json` at revision 85f86cec25901f2dbd870a86e06756903c9a876a](https://huggingface.co/Qwen/Qwen1.5-110B-Chat/resolve/85f86cec25901f2dbd870a86e06756903c9a876a/config.json)
- Repository revision/commit: `85f86cec25901f2dbd870a86e06756903c9a876a`
- Total parameter count: 111,209,914,368 (HF API safetensors.parameters: {"BF16":111209914368})
- Architecture: Qwen2ForCausalLM
- Layers (`num_hidden_layers`): 80
- Query heads (`num_attention_heads`): 64
- KV heads (`num_key_value_heads`): 8
- Head dimension (`head_dim`): Unknown
- Hidden size (`hidden_size`): 8192
- Max context (`max_position_embeddings` or explicit equivalent): 32768
- Weight format/bits (explicit config): bfloat16
- KV cache bits (explicit only): Unknown
- Confidence: **Medium**
- Unresolved fields/errors: KV cache bits not documented
- Citation: HF API/repository/config sources above.

### 5. https://huggingface.co/Qwen/Qwen2-72B-Instruct

**Listed variants:**
- rank 147: Qwen2 Instruct 72B

- Source repository: https://huggingface.co/Qwen/Qwen2-72B-Instruct
- Config source: [`config.json` at revision c867f763ef53f2ea9d9b31ee8501273dedd391eb](https://huggingface.co/Qwen/Qwen2-72B-Instruct/resolve/c867f763ef53f2ea9d9b31ee8501273dedd391eb/config.json)
- Repository revision/commit: `c867f763ef53f2ea9d9b31ee8501273dedd391eb`
- Total parameter count: 72,706,203,648 (HF API safetensors.parameters: {"BF16":72706203648})
- Architecture: Qwen2ForCausalLM
- Layers (`num_hidden_layers`): 80
- Query heads (`num_attention_heads`): 64
- KV heads (`num_key_value_heads`): 8
- Head dimension (`head_dim`): Unknown
- Hidden size (`hidden_size`): 8192
- Max context (`max_position_embeddings` or explicit equivalent): 32768
- Weight format/bits (explicit config): bfloat16
- KV cache bits (explicit only): Unknown
- Confidence: **Medium**
- Unresolved fields/errors: KV cache bits not documented
- Citation: HF API/repository/config sources above.

### 6. https://huggingface.co/Qwen/Qwen2.5-32B-Instruct

**Listed variants:**
- rank 136: Qwen2.5 Instruct 32B

- Source repository: https://huggingface.co/Qwen/Qwen2.5-32B-Instruct
- Config source: [`config.json` at revision 5ede1c97bbab6ce5cda5812749b4c0bdf79b18dd](https://huggingface.co/Qwen/Qwen2.5-32B-Instruct/resolve/5ede1c97bbab6ce5cda5812749b4c0bdf79b18dd/config.json)
- Repository revision/commit: `5ede1c97bbab6ce5cda5812749b4c0bdf79b18dd`
- Total parameter count: 32,763,876,352 (HF API safetensors.parameters: {"BF16":32763876352})
- Architecture: Qwen2ForCausalLM
- Layers (`num_hidden_layers`): 64
- Query heads (`num_attention_heads`): 40
- KV heads (`num_key_value_heads`): 8
- Head dimension (`head_dim`): Unknown
- Hidden size (`hidden_size`): 5120
- Max context (`max_position_embeddings` or explicit equivalent): 32768
- Weight format/bits (explicit config): bfloat16
- KV cache bits (explicit only): Unknown
- Confidence: **Medium**
- Unresolved fields/errors: KV cache bits not documented
- Citation: HF API/repository/config sources above.

### 7. https://huggingface.co/Qwen/Qwen2.5-72B-Instruct

**Listed variants:**
- rank 119: Qwen2.5 Instruct 72B

- Source repository: https://huggingface.co/Qwen/Qwen2.5-72B-Instruct
- Config source: [`config.json` at revision 495f39366efef23836d0cfae4fbe635880d2be31](https://huggingface.co/Qwen/Qwen2.5-72B-Instruct/resolve/495f39366efef23836d0cfae4fbe635880d2be31/config.json)
- Repository revision/commit: `495f39366efef23836d0cfae4fbe635880d2be31`
- Total parameter count: 72,706,203,648 (HF API safetensors.parameters: {"BF16":72706203648})
- Architecture: Qwen2ForCausalLM
- Layers (`num_hidden_layers`): 80
- Query heads (`num_attention_heads`): 64
- KV heads (`num_key_value_heads`): 8
- Head dimension (`head_dim`): Unknown
- Hidden size (`hidden_size`): 8192
- Max context (`max_position_embeddings` or explicit equivalent): 32768
- Weight format/bits (explicit config): bfloat16
- KV cache bits (explicit only): Unknown
- Confidence: **Medium**
- Unresolved fields/errors: KV cache bits not documented
- Citation: HF API/repository/config sources above.

### 8. https://huggingface.co/Qwen/Qwen2.5-Coder-32B-Instruct

**Listed variants:**
- rank 139: Qwen2.5 Coder Instruct 32B

- Source repository: https://huggingface.co/Qwen/Qwen2.5-Coder-32B-Instruct
- Config source: [`config.json` at revision 381fc969f78efac66bc87ff7ddeadb7e73c218a7](https://huggingface.co/Qwen/Qwen2.5-Coder-32B-Instruct/resolve/381fc969f78efac66bc87ff7ddeadb7e73c218a7/config.json)
- Repository revision/commit: `381fc969f78efac66bc87ff7ddeadb7e73c218a7`
- Total parameter count: 32,763,876,352 (HF API safetensors.parameters: {"BF16":32763876352})
- Architecture: Qwen2ForCausalLM
- Layers (`num_hidden_layers`): 64
- Query heads (`num_attention_heads`): 40
- KV heads (`num_key_value_heads`): 8
- Head dimension (`head_dim`): Unknown
- Hidden size (`hidden_size`): 5120
- Max context (`max_position_embeddings` or explicit equivalent): 32768
- Weight format/bits (explicit config): bfloat16
- KV cache bits (explicit only): Unknown
- Confidence: **Medium**
- Unresolved fields/errors: KV cache bits not documented
- Citation: HF API/repository/config sources above.

### 9. https://huggingface.co/Qwen/Qwen3-235B-A22B

**Listed variants:**
- rank 99: Qwen3 235B A22B (Reasoning)
- rank 111: Qwen3 235B A22B (Non-reasoning)

- Source repository: https://huggingface.co/Qwen/Qwen3-235B-A22B
- Config source: [`config.json` at revision 8efa61729e24bd65b1d152b5ab5409052aa80e65](https://huggingface.co/Qwen/Qwen3-235B-A22B/resolve/8efa61729e24bd65b1d152b5ab5409052aa80e65/config.json)
- Repository revision/commit: `8efa61729e24bd65b1d152b5ab5409052aa80e65`
- Total parameter count: 235,093,634,560 (HF API safetensors.parameters: {"BF16":235093634560})
- Architecture: Qwen3MoeForCausalLM
- Layers (`num_hidden_layers`): 94
- Query heads (`num_attention_heads`): 64
- KV heads (`num_key_value_heads`): 4
- Head dimension (`head_dim`): 128
- Hidden size (`hidden_size`): 4096
- Max context (`max_position_embeddings` or explicit equivalent): 40960
- Weight format/bits (explicit config): bfloat16
- KV cache bits (explicit only): Unknown
- Confidence: **Medium**
- Unresolved fields/errors: KV cache bits not documented
- Citation: HF API/repository/config sources above.

### 10. https://huggingface.co/Qwen/Qwen3-235B-A22B-Instruct-2507

**Listed variants:**
- rank 73: Qwen3 235B A22B 2507 Instruct

- Source repository: https://huggingface.co/Qwen/Qwen3-235B-A22B-Instruct-2507
- Config source: [`config.json` at revision ac9c66cc9b46af7306746a9250f23d47083d689e](https://huggingface.co/Qwen/Qwen3-235B-A22B-Instruct-2507/resolve/ac9c66cc9b46af7306746a9250f23d47083d689e/config.json)
- Repository revision/commit: `ac9c66cc9b46af7306746a9250f23d47083d689e`
- Total parameter count: 235,093,634,560 (HF API safetensors.parameters: {"BF16":235093634560})
- Architecture: Qwen3MoeForCausalLM
- Layers (`num_hidden_layers`): 94
- Query heads (`num_attention_heads`): 64
- KV heads (`num_key_value_heads`): 4
- Head dimension (`head_dim`): 128
- Hidden size (`hidden_size`): 4096
- Max context (`max_position_embeddings` or explicit equivalent): 262144
- Weight format/bits (explicit config): bfloat16
- KV cache bits (explicit only): Unknown
- Confidence: **Medium**
- Unresolved fields/errors: KV cache bits not documented
- Citation: HF API/repository/config sources above.

### 11. https://huggingface.co/Qwen/Qwen3-235B-A22B-Thinking-2507

**Listed variants:**
- rank 67: Qwen3 235B A22B 2507 (Reasoning)

- Source repository: https://huggingface.co/Qwen/Qwen3-235B-A22B-Thinking-2507
- Config source: [`config.json` at revision 6cbffae6d8e28b986a6b17bd36f42f9fa0f1f0a5](https://huggingface.co/Qwen/Qwen3-235B-A22B-Thinking-2507/resolve/6cbffae6d8e28b986a6b17bd36f42f9fa0f1f0a5/config.json)
- Repository revision/commit: `6cbffae6d8e28b986a6b17bd36f42f9fa0f1f0a5`
- Total parameter count: 235,093,634,560 (HF API safetensors.parameters: {"BF16":235093634560})
- Architecture: Qwen3MoeForCausalLM
- Layers (`num_hidden_layers`): 94
- Query heads (`num_attention_heads`): 64
- KV heads (`num_key_value_heads`): 4
- Head dimension (`head_dim`): 128
- Hidden size (`hidden_size`): 4096
- Max context (`max_position_embeddings` or explicit equivalent): 262144
- Weight format/bits (explicit config): bfloat16
- KV cache bits (explicit only): Unknown
- Confidence: **Medium**
- Unresolved fields/errors: KV cache bits not documented
- Citation: HF API/repository/config sources above.

### 12. https://huggingface.co/Qwen/Qwen3-30B-A3B

**Listed variants:**
- rank 121: Qwen3 30B A3B (Reasoning)
- rank 142: Qwen3 30B A3B (Non-reasoning)

- Source repository: https://huggingface.co/Qwen/Qwen3-30B-A3B
- Config source: [`config.json` at revision ad44e777bcd18fa416d9da3bd8f70d33ebb85d39](https://huggingface.co/Qwen/Qwen3-30B-A3B/resolve/ad44e777bcd18fa416d9da3bd8f70d33ebb85d39/config.json)
- Repository revision/commit: `ad44e777bcd18fa416d9da3bd8f70d33ebb85d39`
- Total parameter count: 30,532,122,624 (HF API safetensors.parameters: {"BF16":30532122624})
- Architecture: Qwen3MoeForCausalLM
- Layers (`num_hidden_layers`): 48
- Query heads (`num_attention_heads`): 32
- KV heads (`num_key_value_heads`): 4
- Head dimension (`head_dim`): 128
- Hidden size (`hidden_size`): 2048
- Max context (`max_position_embeddings` or explicit equivalent): 40960
- Weight format/bits (explicit config): bfloat16
- KV cache bits (explicit only): Unknown
- Confidence: **Medium**
- Unresolved fields/errors: KV cache bits not documented
- Citation: HF API/repository/config sources above.

### 13. https://huggingface.co/Qwen/Qwen3-30B-A3B-Instruct-2507

**Listed variants:**
- rank 126: Qwen3 30B A3B 2507 Instruct

- Source repository: https://huggingface.co/Qwen/Qwen3-30B-A3B-Instruct-2507
- Config source: [`config.json` at revision 0d7cf23991f47feeb3a57ecb4c9cee8ea4a17bfe](https://huggingface.co/Qwen/Qwen3-30B-A3B-Instruct-2507/resolve/0d7cf23991f47feeb3a57ecb4c9cee8ea4a17bfe/config.json)
- Repository revision/commit: `0d7cf23991f47feeb3a57ecb4c9cee8ea4a17bfe`
- Total parameter count: 30,532,122,624 (HF API safetensors.parameters: {"BF16":30532122624})
- Architecture: Qwen3MoeForCausalLM
- Layers (`num_hidden_layers`): 48
- Query heads (`num_attention_heads`): 32
- KV heads (`num_key_value_heads`): 4
- Head dimension (`head_dim`): 128
- Hidden size (`hidden_size`): 2048
- Max context (`max_position_embeddings` or explicit equivalent): 262144
- Weight format/bits (explicit config): bfloat16
- KV cache bits (explicit only): Unknown
- Confidence: **Medium**
- Unresolved fields/errors: KV cache bits not documented
- Citation: HF API/repository/config sources above.

### 14. https://huggingface.co/Qwen/Qwen3-30B-A3B-Thinking-2507

**Listed variants:**
- rank 89: Qwen3 30B A3B 2507 (Reasoning)

- Source repository: https://huggingface.co/Qwen/Qwen3-30B-A3B-Thinking-2507
- Config source: [`config.json` at revision 144afc2f379b542fdd4e85a1fcd5e1f79112d95d](https://huggingface.co/Qwen/Qwen3-30B-A3B-Thinking-2507/resolve/144afc2f379b542fdd4e85a1fcd5e1f79112d95d/config.json)
- Repository revision/commit: `144afc2f379b542fdd4e85a1fcd5e1f79112d95d`
- Total parameter count: 30,532,122,624 (HF API safetensors.parameters: {"BF16":30532122624})
- Architecture: Qwen3MoeForCausalLM
- Layers (`num_hidden_layers`): 48
- Query heads (`num_attention_heads`): 32
- KV heads (`num_key_value_heads`): 4
- Head dimension (`head_dim`): 128
- Hidden size (`hidden_size`): 2048
- Max context (`max_position_embeddings` or explicit equivalent): 262144
- Weight format/bits (explicit config): bfloat16
- KV cache bits (explicit only): Unknown
- Confidence: **Medium**
- Unresolved fields/errors: KV cache bits not documented
- Citation: HF API/repository/config sources above.

### 15. https://huggingface.co/Qwen/Qwen3-32B

**Listed variants:**
- rank 107: Qwen3 32B (Reasoning)
- rank 128: Qwen3 32B (Non-reasoning)

- Source repository: https://huggingface.co/Qwen/Qwen3-32B
- Config source: [`config.json` at revision 9216db5781bf21249d130ec9da846c4624c16137](https://huggingface.co/Qwen/Qwen3-32B/resolve/9216db5781bf21249d130ec9da846c4624c16137/config.json)
- Repository revision/commit: `9216db5781bf21249d130ec9da846c4624c16137`
- Total parameter count: 32,762,123,264 (HF API safetensors.parameters: {"BF16":32762123264})
- Architecture: Qwen3ForCausalLM
- Layers (`num_hidden_layers`): 64
- Query heads (`num_attention_heads`): 64
- KV heads (`num_key_value_heads`): 8
- Head dimension (`head_dim`): 128
- Hidden size (`hidden_size`): 5120
- Max context (`max_position_embeddings` or explicit equivalent): 40960
- Weight format/bits (explicit config): bfloat16
- KV cache bits (explicit only): Unknown
- Confidence: **Medium**
- Unresolved fields/errors: KV cache bits not documented
- Citation: HF API/repository/config sources above.

### 16. https://huggingface.co/Qwen/Qwen3-Coder-30B-A3B-Instruct

**Listed variants:**
- rank 97: Qwen3 Coder 30B A3B Instruct

- Source repository: https://huggingface.co/Qwen/Qwen3-Coder-30B-A3B-Instruct
- Config source: [`config.json` at revision b2cff646eb4bb1d68355c01b18ae02e7cf42d120](https://huggingface.co/Qwen/Qwen3-Coder-30B-A3B-Instruct/resolve/b2cff646eb4bb1d68355c01b18ae02e7cf42d120/config.json)
- Repository revision/commit: `b2cff646eb4bb1d68355c01b18ae02e7cf42d120`
- Total parameter count: 30,532,122,624 (HF API safetensors.parameters: {"BF16":30532122624})
- Architecture: Qwen3MoeForCausalLM
- Layers (`num_hidden_layers`): 48
- Query heads (`num_attention_heads`): 32
- KV heads (`num_key_value_heads`): 4
- Head dimension (`head_dim`): 128
- Hidden size (`hidden_size`): 2048
- Max context (`max_position_embeddings` or explicit equivalent): 262144
- Weight format/bits (explicit config): bfloat16
- KV cache bits (explicit only): Unknown
- Confidence: **Medium**
- Unresolved fields/errors: KV cache bits not documented
- Citation: HF API/repository/config sources above.

### 17. https://huggingface.co/Qwen/Qwen3-Coder-480B-A35B-Instruct

**Listed variants:**
- rank 74: Qwen3 Coder 480B A35B Instruct

- Source repository: https://huggingface.co/Qwen/Qwen3-Coder-480B-A35B-Instruct
- Config source: [`config.json` at revision 9d90cf8fca1bf7b7acca42d3fc9ae694a2194069](https://huggingface.co/Qwen/Qwen3-Coder-480B-A35B-Instruct/resolve/9d90cf8fca1bf7b7acca42d3fc9ae694a2194069/config.json)
- Repository revision/commit: `9d90cf8fca1bf7b7acca42d3fc9ae694a2194069`
- Total parameter count: 480,154,875,392 (HF API safetensors.parameters: {"BF16":480154875392})
- Architecture: Qwen3MoeForCausalLM
- Layers (`num_hidden_layers`): 62
- Query heads (`num_attention_heads`): 96
- KV heads (`num_key_value_heads`): 8
- Head dimension (`head_dim`): 128
- Hidden size (`hidden_size`): 6144
- Max context (`max_position_embeddings` or explicit equivalent): 262144
- Weight format/bits (explicit config): bfloat16
- KV cache bits (explicit only): Unknown
- Confidence: **Medium**
- Unresolved fields/errors: KV cache bits not documented
- Citation: HF API/repository/config sources above.

### 18. https://huggingface.co/Qwen/Qwen3-Coder-Next

**Listed variants:**
- rank 62: Qwen3 Coder Next

- Source repository: https://huggingface.co/Qwen/Qwen3-Coder-Next
- Config source: [`config.json` at revision a7fbcb5c0e12d62a448eaa0e260346bf5dcc0feb](https://huggingface.co/Qwen/Qwen3-Coder-Next/resolve/a7fbcb5c0e12d62a448eaa0e260346bf5dcc0feb/config.json)
- Repository revision/commit: `a7fbcb5c0e12d62a448eaa0e260346bf5dcc0feb`
- Total parameter count: 79,674,391,296 (HF API safetensors.parameters: {"BF16":79674391296})
- Architecture: Qwen3NextForCausalLM
- Layers (`num_hidden_layers`): 48
- Query heads (`num_attention_heads`): 16
- KV heads (`num_key_value_heads`): 2
- Head dimension (`head_dim`): 256
- Hidden size (`hidden_size`): 2048
- Max context (`max_position_embeddings` or explicit equivalent): 262144
- Weight format/bits (explicit config): bfloat16
- KV cache bits (explicit only): Unknown
- Confidence: **Medium**
- Unresolved fields/errors: KV cache bits not documented
- Citation: HF API/repository/config sources above.

### 19. https://huggingface.co/Qwen/Qwen3-Next-80B-A3B-Instruct

**Listed variants:**
- rank 96: Qwen3 Next 80B A3B Instruct

- Source repository: https://huggingface.co/Qwen/Qwen3-Next-80B-A3B-Instruct
- Config source: [`config.json` at revision 9c7f2fbe84465e40164a94cc16cd30b6999b0cc7](https://huggingface.co/Qwen/Qwen3-Next-80B-A3B-Instruct/resolve/9c7f2fbe84465e40164a94cc16cd30b6999b0cc7/config.json)
- Repository revision/commit: `9c7f2fbe84465e40164a94cc16cd30b6999b0cc7`
- Total parameter count: 81,324,862,720 (HF API safetensors.parameters: {"BF16":81324862720})
- Architecture: Qwen3NextForCausalLM
- Layers (`num_hidden_layers`): 48
- Query heads (`num_attention_heads`): 16
- KV heads (`num_key_value_heads`): 2
- Head dimension (`head_dim`): 256
- Hidden size (`hidden_size`): 2048
- Max context (`max_position_embeddings` or explicit equivalent): 262144
- Weight format/bits (explicit config): bfloat16
- KV cache bits (explicit only): Unknown
- Confidence: **Medium**
- Unresolved fields/errors: KV cache bits not documented
- Citation: HF API/repository/config sources above.

### 20. https://huggingface.co/Qwen/Qwen3-Next-80B-A3B-Thinking

**Listed variants:**
- rank 79: Qwen3 Next 80B A3B (Reasoning)

- Source repository: https://huggingface.co/Qwen/Qwen3-Next-80B-A3B-Thinking
- Config source: [`config.json` at revision e502dd4100cc68c0de57643fd4317ec93a128670](https://huggingface.co/Qwen/Qwen3-Next-80B-A3B-Thinking/resolve/e502dd4100cc68c0de57643fd4317ec93a128670/config.json)
- Repository revision/commit: `e502dd4100cc68c0de57643fd4317ec93a128670`
- Total parameter count: 81,324,862,720 (HF API safetensors.parameters: {"BF16":81324862720})
- Architecture: Qwen3NextForCausalLM
- Layers (`num_hidden_layers`): 48
- Query heads (`num_attention_heads`): 16
- KV heads (`num_key_value_heads`): 2
- Head dimension (`head_dim`): 256
- Hidden size (`hidden_size`): 2048
- Max context (`max_position_embeddings` or explicit equivalent): 262144
- Weight format/bits (explicit config): bfloat16
- KV cache bits (explicit only): Unknown
- Confidence: **Medium**
- Unresolved fields/errors: KV cache bits not documented
- Citation: HF API/repository/config sources above.

### 21. https://huggingface.co/Qwen/Qwen3-Omni-30B-A3B-Instruct

**Listed variants:**
- rank 148: Qwen3 Omni 30B A3B Instruct

- Source repository: https://huggingface.co/Qwen/Qwen3-Omni-30B-A3B-Instruct
- Config source: [`config.json` at revision 26291f793822fb6be9555850f06dfe95f2d7e695](https://huggingface.co/Qwen/Qwen3-Omni-30B-A3B-Instruct/resolve/26291f793822fb6be9555850f06dfe95f2d7e695/config.json)
- Repository revision/commit: `26291f793822fb6be9555850f06dfe95f2d7e695`
- Total parameter count: 35,259,818,545 (HF API safetensors.parameters: {"BF16":35259818545})
- Architecture: Qwen3OmniMoeForConditionalGeneration
- Layers (`num_hidden_layers`): Unknown
- Query heads (`num_attention_heads`): Unknown
- KV heads (`num_key_value_heads`): Unknown
- Head dimension (`head_dim`): Unknown
- Hidden size (`hidden_size`): Unknown
- Max context (`max_position_embeddings` or explicit equivalent): Unknown
- Weight format/bits (explicit config): bfloat16
- KV cache bits (explicit only): Unknown
- Confidence: **Medium**
- Unresolved fields/errors: layers; query heads; KV heads; head_dim/hidden_size; max context; KV cache bits not documented
- Citation: HF API/repository/config sources above.

### 22. https://huggingface.co/Qwen/Qwen3-Omni-30B-A3B-Thinking

**Listed variants:**
- rank 118: Qwen3 Omni 30B A3B (Reasoning)

- Source repository: https://huggingface.co/Qwen/Qwen3-Omni-30B-A3B-Thinking
- Config source: [`config.json` at revision 2f443cfc4c54b14a815c0e2bb9a9d6cbcd9a748b](https://huggingface.co/Qwen/Qwen3-Omni-30B-A3B-Thinking/resolve/2f443cfc4c54b14a815c0e2bb9a9d6cbcd9a748b/config.json)
- Repository revision/commit: `2f443cfc4c54b14a815c0e2bb9a9d6cbcd9a748b`
- Total parameter count: 31,719,205,488 (HF API safetensors.parameters: {"BF16":31719205488})
- Architecture: Qwen3OmniMoeForConditionalGeneration
- Layers (`num_hidden_layers`): Unknown
- Query heads (`num_attention_heads`): Unknown
- KV heads (`num_key_value_heads`): Unknown
- Head dimension (`head_dim`): Unknown
- Hidden size (`hidden_size`): Unknown
- Max context (`max_position_embeddings` or explicit equivalent): Unknown
- Weight format/bits (explicit config): bfloat16
- KV cache bits (explicit only): Unknown
- Confidence: **Medium**
- Unresolved fields/errors: layers; query heads; KV heads; head_dim/hidden_size; max context; KV cache bits not documented
- Citation: HF API/repository/config sources above.

### 23. https://huggingface.co/Qwen/Qwen3-VL-235B-A22B-Instruct

**Listed variants:**
- rank 64: Qwen3 VL 235B A22B (Reasoning)
- rank 93: Qwen3 VL 235B A22B Instruct

- Source repository: https://huggingface.co/Qwen/Qwen3-VL-235B-A22B-Instruct
- Config source: [`config.json` at revision 710c13861be6c466e66de3f484069440b8f31389](https://huggingface.co/Qwen/Qwen3-VL-235B-A22B-Instruct/resolve/710c13861be6c466e66de3f484069440b8f31389/config.json)
- Repository revision/commit: `710c13861be6c466e66de3f484069440b8f31389`
- Total parameter count: 235,670,022,896 (HF API safetensors.parameters: {"BF16":235670022896})
- Architecture: Qwen3VLMoeForConditionalGeneration
- Layers (`num_hidden_layers`): Unknown
- Query heads (`num_attention_heads`): Unknown
- KV heads (`num_key_value_heads`): Unknown
- Head dimension (`head_dim`): Unknown
- Hidden size (`hidden_size`): Unknown
- Max context (`max_position_embeddings` or explicit equivalent): Unknown
- Weight format/bits (explicit config): Unknown
- KV cache bits (explicit only): Unknown
- Confidence: **Medium**
- Unresolved fields/errors: layers; query heads; KV heads; head_dim/hidden_size; max context; weight format/bits; KV cache bits not documented
- Citation: HF API/repository/config sources above.

### 24. https://huggingface.co/Qwen/Qwen3-VL-30B-A3B-Instruct

**Listed variants:**
- rank 115: Qwen3 VL 30B A3B Instruct

- Source repository: https://huggingface.co/Qwen/Qwen3-VL-30B-A3B-Instruct
- Config source: [`config.json` at revision 9c4b90e1e4ba969fd3b5378b57d966d725f1b86c](https://huggingface.co/Qwen/Qwen3-VL-30B-A3B-Instruct/resolve/9c4b90e1e4ba969fd3b5378b57d966d725f1b86c/config.json)
- Repository revision/commit: `9c4b90e1e4ba969fd3b5378b57d966d725f1b86c`
- Total parameter count: 31,070,754,032 (HF API safetensors.parameters: {"BF16":31070754032})
- Architecture: Qwen3VLMoeForConditionalGeneration
- Layers (`num_hidden_layers`): Unknown
- Query heads (`num_attention_heads`): Unknown
- KV heads (`num_key_value_heads`): Unknown
- Head dimension (`head_dim`): Unknown
- Hidden size (`hidden_size`): Unknown
- Max context (`max_position_embeddings` or explicit equivalent): Unknown
- Weight format/bits (explicit config): Unknown
- KV cache bits (explicit only): Unknown
- Confidence: **Medium**
- Unresolved fields/errors: layers; query heads; KV heads; head_dim/hidden_size; max context; weight format/bits; KV cache bits not documented
- Citation: HF API/repository/config sources above.

### 25. https://huggingface.co/Qwen/Qwen3-VL-30B-A3B-Thinking

**Listed variants:**
- rank 100: Qwen3 VL 30B A3B (Reasoning)

- Source repository: https://huggingface.co/Qwen/Qwen3-VL-30B-A3B-Thinking
- Config source: [`config.json` at revision d0ed0380729be07a546fdefafbb4fe411f341e92](https://huggingface.co/Qwen/Qwen3-VL-30B-A3B-Thinking/resolve/d0ed0380729be07a546fdefafbb4fe411f341e92/config.json)
- Repository revision/commit: `d0ed0380729be07a546fdefafbb4fe411f341e92`
- Total parameter count: 31,070,754,032 (HF API safetensors.parameters: {"BF16":31070754032})
- Architecture: Qwen3VLMoeForConditionalGeneration
- Layers (`num_hidden_layers`): Unknown
- Query heads (`num_attention_heads`): Unknown
- KV heads (`num_key_value_heads`): Unknown
- Head dimension (`head_dim`): Unknown
- Hidden size (`hidden_size`): Unknown
- Max context (`max_position_embeddings` or explicit equivalent): Unknown
- Weight format/bits (explicit config): Unknown
- KV cache bits (explicit only): Unknown
- Confidence: **Medium**
- Unresolved fields/errors: layers; query heads; KV heads; head_dim/hidden_size; max context; weight format/bits; KV cache bits not documented
- Citation: HF API/repository/config sources above.

### 26. https://huggingface.co/Qwen/Qwen3-VL-32B-Instruct

**Listed variants:**
- rank 108: Qwen3 VL 32B Instruct

- Source repository: https://huggingface.co/Qwen/Qwen3-VL-32B-Instruct
- Config source: [`config.json` at revision 0cfaf48183f594c314753d30a4c4974bc75f3ccb](https://huggingface.co/Qwen/Qwen3-VL-32B-Instruct/resolve/0cfaf48183f594c314753d30a4c4974bc75f3ccb/config.json)
- Repository revision/commit: `0cfaf48183f594c314753d30a4c4974bc75f3ccb`
- Total parameter count: 33,357,390,064 (HF API safetensors.parameters: {"BF16":33357390064})
- Architecture: Qwen3VLForConditionalGeneration
- Layers (`num_hidden_layers`): Unknown
- Query heads (`num_attention_heads`): Unknown
- KV heads (`num_key_value_heads`): Unknown
- Head dimension (`head_dim`): Unknown
- Hidden size (`hidden_size`): Unknown
- Max context (`max_position_embeddings` or explicit equivalent): Unknown
- Weight format/bits (explicit config): Unknown
- KV cache bits (explicit only): Unknown
- Confidence: **Medium**
- Unresolved fields/errors: layers; query heads; KV heads; head_dim/hidden_size; max context; weight format/bits; KV cache bits not documented
- Citation: HF API/repository/config sources above.

### 27. https://huggingface.co/Qwen/Qwen3-VL-32B-Thinking

**Listed variants:**
- rank 75: Qwen3 VL 32B (Reasoning)

- Source repository: https://huggingface.co/Qwen/Qwen3-VL-32B-Thinking
- Config source: [`config.json` at revision 7edd10ffd1196091948fb245ff63e406ccb2d4d1](https://huggingface.co/Qwen/Qwen3-VL-32B-Thinking/resolve/7edd10ffd1196091948fb245ff63e406ccb2d4d1/config.json)
- Repository revision/commit: `7edd10ffd1196091948fb245ff63e406ccb2d4d1`
- Total parameter count: 33,357,390,064 (HF API safetensors.parameters: {"BF16":33357390064})
- Architecture: Qwen3VLForConditionalGeneration
- Layers (`num_hidden_layers`): Unknown
- Query heads (`num_attention_heads`): Unknown
- KV heads (`num_key_value_heads`): Unknown
- Head dimension (`head_dim`): Unknown
- Hidden size (`hidden_size`): Unknown
- Max context (`max_position_embeddings` or explicit equivalent): Unknown
- Weight format/bits (explicit config): Unknown
- KV cache bits (explicit only): Unknown
- Confidence: **Medium**
- Unresolved fields/errors: layers; query heads; KV heads; head_dim/hidden_size; max context; weight format/bits; KV cache bits not documented
- Citation: HF API/repository/config sources above.

### 28. https://huggingface.co/Qwen/Qwen3.5-122B-A10B

**Listed variants:**
- rank 28: Qwen3.5 122B A10B (Reasoning)
- rank 43: Qwen3.5 122B A10B (Non-reasoning)

- Source repository: https://huggingface.co/Qwen/Qwen3.5-122B-A10B
- Config source: [`config.json` at revision dc4d348443bc740c68e2d77492492c11606384d5](https://huggingface.co/Qwen/Qwen3.5-122B-A10B/resolve/dc4d348443bc740c68e2d77492492c11606384d5/config.json)
- Repository revision/commit: `dc4d348443bc740c68e2d77492492c11606384d5`
- Total parameter count: 125,086,497,008 (HF API safetensors.parameters: {"BF16":125086490096,"F32":6912})
- Architecture: Qwen3_5MoeForConditionalGeneration
- Layers (`num_hidden_layers`): Unknown
- Query heads (`num_attention_heads`): Unknown
- KV heads (`num_key_value_heads`): Unknown
- Head dimension (`head_dim`): Unknown
- Hidden size (`hidden_size`): Unknown
- Max context (`max_position_embeddings` or explicit equivalent): Unknown
- Weight format/bits (explicit config): Unknown
- KV cache bits (explicit only): Unknown
- Confidence: **Medium**
- Unresolved fields/errors: layers; query heads; KV heads; head_dim/hidden_size; max context; weight format/bits; KV cache bits not documented
- Citation: HF API/repository/config sources above.

### 29. https://huggingface.co/Qwen/Qwen3.5-27B

**Listed variants:**
- rank 23: Qwen3.5 27B (Reasoning)
- rank 38: Qwen3.5 27B (Non-reasoning)

- Source repository: https://huggingface.co/Qwen/Qwen3.5-27B
- Config source: [`config.json` at revision fc05daec18b0a78c049392ed2e771dde82bdf654](https://huggingface.co/Qwen/Qwen3.5-27B/resolve/fc05daec18b0a78c049392ed2e771dde82bdf654/config.json)
- Repository revision/commit: `fc05daec18b0a78c049392ed2e771dde82bdf654`
- Total parameter count: 27,781,427,952 (HF API safetensors.parameters: {"BF16":27781419504,"F32":8448})
- Architecture: Qwen3_5ForConditionalGeneration
- Layers (`num_hidden_layers`): Unknown
- Query heads (`num_attention_heads`): Unknown
- KV heads (`num_key_value_heads`): Unknown
- Head dimension (`head_dim`): Unknown
- Hidden size (`hidden_size`): Unknown
- Max context (`max_position_embeddings` or explicit equivalent): Unknown
- Weight format/bits (explicit config): Unknown
- KV cache bits (explicit only): Unknown
- Confidence: **Medium**
- Unresolved fields/errors: layers; query heads; KV heads; head_dim/hidden_size; max context; weight format/bits; KV cache bits not documented
- Citation: HF API/repository/config sources above.

### 30. https://huggingface.co/Qwen/Qwen3.5-35B-A3B

**Listed variants:**
- rank 39: Qwen3.5 35B A3B (Reasoning)
- rank 51: Qwen3.5 35B A3B (Non-reasoning)

- Source repository: https://huggingface.co/Qwen/Qwen3.5-35B-A3B
- Config source: [`config.json` at revision 59d61f3ce65a6d9863b86d2e96597125219dc754](https://huggingface.co/Qwen/Qwen3.5-35B-A3B/resolve/59d61f3ce65a6d9863b86d2e96597125219dc754/config.json)
- Repository revision/commit: `59d61f3ce65a6d9863b86d2e96597125219dc754`
- Total parameter count: 35,951,822,704 (HF API safetensors.parameters: {"BF16":35951817904,"F32":4800})
- Architecture: Qwen3_5MoeForConditionalGeneration
- Layers (`num_hidden_layers`): Unknown
- Query heads (`num_attention_heads`): Unknown
- KV heads (`num_key_value_heads`): Unknown
- Head dimension (`head_dim`): Unknown
- Hidden size (`hidden_size`): Unknown
- Max context (`max_position_embeddings` or explicit equivalent): Unknown
- Weight format/bits (explicit config): Unknown
- KV cache bits (explicit only): Unknown
- Confidence: **Medium**
- Unresolved fields/errors: layers; query heads; KV heads; head_dim/hidden_size; max context; weight format/bits; KV cache bits not documented
- Citation: HF API/repository/config sources above.

### 31. https://huggingface.co/Qwen/Qwen3.5-397B-A17B

**Listed variants:**
- rank 25: Qwen3.5 397B A17B (Reasoning)
- rank 30: Qwen3.5 397B A17B (Non-reasoning)

- Source repository: https://huggingface.co/Qwen/Qwen3.5-397B-A17B
- Config source: [`config.json` at revision 8472618112abcbd45acbcdc58436aff4233c23f7](https://huggingface.co/Qwen/Qwen3.5-397B-A17B/resolve/8472618112abcbd45acbcdc58436aff4233c23f7/config.json)
- Repository revision/commit: `8472618112abcbd45acbcdc58436aff4233c23f7`
- Total parameter count: 403,397,928,944 (HF API safetensors.parameters: {"BF16":403397920304,"F32":8640})
- Architecture: Qwen3_5MoeForConditionalGeneration
- Layers (`num_hidden_layers`): Unknown
- Query heads (`num_attention_heads`): Unknown
- KV heads (`num_key_value_heads`): Unknown
- Head dimension (`head_dim`): Unknown
- Hidden size (`hidden_size`): Unknown
- Max context (`max_position_embeddings` or explicit equivalent): Unknown
- Weight format/bits (explicit config): Unknown
- KV cache bits (explicit only): Unknown
- Confidence: **Medium**
- Unresolved fields/errors: layers; query heads; KV heads; head_dim/hidden_size; max context; weight format/bits; KV cache bits not documented
- Citation: HF API/repository/config sources above.

### 32. https://huggingface.co/Qwen/Qwen3.6-27B

**Listed variants:**
- rank 18: Qwen3.6 27B (Reasoning)
- rank 35: Qwen3.6 27B (Non-reasoning)

- Source repository: https://huggingface.co/Qwen/Qwen3.6-27B
- Config source: [`config.json` at revision 6a9e13bd6fc8f0983b9b99948120bc37f49c13e9](https://huggingface.co/Qwen/Qwen3.6-27B/resolve/6a9e13bd6fc8f0983b9b99948120bc37f49c13e9/config.json)
- Repository revision/commit: `6a9e13bd6fc8f0983b9b99948120bc37f49c13e9`
- Total parameter count: 27,781,427,952 (HF API safetensors.parameters: {"BF16":27781427952})
- Architecture: Qwen3_5ForConditionalGeneration
- Layers (`num_hidden_layers`): Unknown
- Query heads (`num_attention_heads`): Unknown
- KV heads (`num_key_value_heads`): Unknown
- Head dimension (`head_dim`): Unknown
- Hidden size (`hidden_size`): Unknown
- Max context (`max_position_embeddings` or explicit equivalent): Unknown
- Weight format/bits (explicit config): Unknown
- KV cache bits (explicit only): Unknown
- Confidence: **Medium**
- Unresolved fields/errors: layers; query heads; KV heads; head_dim/hidden_size; max context; weight format/bits; KV cache bits not documented
- Citation: HF API/repository/config sources above.

### 33. https://huggingface.co/Qwen/Qwen3.6-35B-A3B

**Listed variants:**
- rank 31: Qwen3.6 35B A3B (Reasoning)
- rank 50: Qwen3.6 35B A3B (Non-reasoning)

- Source repository: https://huggingface.co/Qwen/Qwen3.6-35B-A3B
- Config source: [`config.json` at revision 995ad96eacd98c81ed38be0c5b274b04031597b0](https://huggingface.co/Qwen/Qwen3.6-35B-A3B/resolve/995ad96eacd98c81ed38be0c5b274b04031597b0/config.json)
- Repository revision/commit: `995ad96eacd98c81ed38be0c5b274b04031597b0`
- Total parameter count: 35,951,822,704 (HF API safetensors.parameters: {"BF16":35951822704})
- Architecture: Qwen3_5MoeForConditionalGeneration
- Layers (`num_hidden_layers`): Unknown
- Query heads (`num_attention_heads`): Unknown
- KV heads (`num_key_value_heads`): Unknown
- Head dimension (`head_dim`): Unknown
- Hidden size (`hidden_size`): Unknown
- Max context (`max_position_embeddings` or explicit equivalent): Unknown
- Weight format/bits (explicit config): Unknown
- KV cache bits (explicit only): Unknown
- Confidence: **Medium**
- Unresolved fields/errors: layers; query heads; KV heads; head_dim/hidden_size; max context; weight format/bits; KV cache bits not documented
- Citation: HF API/repository/config sources above.

### 34. https://huggingface.co/Qwen/Qwen3.8-2.4T-A95B

**Listed variants:**
- rank 2: Qwen3.8 2.4T A95B

- Source repository: https://huggingface.co/Qwen/Qwen3.8-2.4T-A95B
- Config source: [`config.json` at revision 207bd685a7e3696cfaff12ded7c6a7ea0f88c996](https://huggingface.co/Qwen/Qwen3.8-2.4T-A95B/resolve/207bd685a7e3696cfaff12ded7c6a7ea0f88c996/config.json)
- Repository revision/commit: `207bd685a7e3696cfaff12ded7c6a7ea0f88c996`
- Total parameter count: 2,446,182,725,504 (HF API safetensors.parameters: {"BF16":2446182725504})
- Architecture: Qwen3_5MoeForCausalLM
- Layers (`num_hidden_layers`): 92
- Query heads (`num_attention_heads`): 64
- KV heads (`num_key_value_heads`): 4
- Head dimension (`head_dim`): 256
- Hidden size (`hidden_size`): 8192
- Max context (`max_position_embeddings` or explicit equivalent): 262144
- Weight format/bits (explicit config): bfloat16
- KV cache bits (explicit only): Unknown
- Confidence: **Medium**
- Unresolved fields/errors: KV cache bits not documented
- Citation: HF API/repository/config sources above.

### 35. https://huggingface.co/Qwen/Qwen3.8-27B

**Listed variants:**
- rank 5: Qwen3.8 27B

- Source repository: https://huggingface.co/Qwen/Qwen3.8-27B
- Config source: [`config.json` at revision 1d4bf0f2ff6012fd82039f2fa52739d0dd7c60c0](https://huggingface.co/Qwen/Qwen3.8-27B/resolve/1d4bf0f2ff6012fd82039f2fa52739d0dd7c60c0/config.json)
- Repository revision/commit: `1d4bf0f2ff6012fd82039f2fa52739d0dd7c60c0`
- Total parameter count: 27,781,427,952 (HF API safetensors.parameters: {"BF16":27781427952})
- Architecture: Qwen3_5ForConditionalGeneration
- Layers (`num_hidden_layers`): Unknown
- Query heads (`num_attention_heads`): Unknown
- KV heads (`num_key_value_heads`): Unknown
- Head dimension (`head_dim`): Unknown
- Hidden size (`hidden_size`): Unknown
- Max context (`max_position_embeddings` or explicit equivalent): Unknown
- Weight format/bits (explicit config): Unknown
- KV cache bits (explicit only): Unknown
- Confidence: **Medium**
- Unresolved fields/errors: layers; query heads; KV heads; head_dim/hidden_size; max context; weight format/bits; KV cache bits not documented
- Citation: HF API/repository/config sources above.

### 36. https://huggingface.co/deepseek-ai/DeepSeek-Coder-V2-Instruct

**Listed variants:**
- rank 149: DeepSeek-Coder-V2

- Source repository: https://huggingface.co/deepseek-ai/DeepSeek-Coder-V2-Instruct
- Config source: [`config.json` at revision 2453c79a2a0947968a054947b53daa598cb3be52](https://huggingface.co/deepseek-ai/DeepSeek-Coder-V2-Instruct/resolve/2453c79a2a0947968a054947b53daa598cb3be52/config.json)
- Repository revision/commit: `2453c79a2a0947968a054947b53daa598cb3be52`
- Total parameter count: 235,741,434,880 (HF API safetensors.parameters: {"BF16":235741434880})
- Architecture: DeepseekV2ForCausalLM
- Layers (`num_hidden_layers`): 60
- Query heads (`num_attention_heads`): 128
- KV heads (`num_key_value_heads`): 128
- Head dimension (`head_dim`): Unknown
- Hidden size (`hidden_size`): 5120
- Max context (`max_position_embeddings` or explicit equivalent): 163840
- Weight format/bits (explicit config): bfloat16
- KV cache bits (explicit only): Unknown
- Confidence: **Medium**
- Unresolved fields/errors: KV cache bits not documented
- Citation: HF API/repository/config sources above.

### 37. https://huggingface.co/deepseek-ai/DeepSeek-R1

**Listed variants:**
- rank 72: DeepSeek R1 (Jan '25)

- Source repository: https://huggingface.co/deepseek-ai/DeepSeek-R1
- Config source: [`config.json` at revision 56d4cbbb4d29f4355bab4b9a39ccb717a14ad5ad](https://huggingface.co/deepseek-ai/DeepSeek-R1/resolve/56d4cbbb4d29f4355bab4b9a39ccb717a14ad5ad/config.json)
- Repository revision/commit: `56d4cbbb4d29f4355bab4b9a39ccb717a14ad5ad`
- Total parameter count: 684,489,845,504 (HF API safetensors.parameters: {"BF16":3918786560,"F8_E4M3":680571043840,"F32":15104})
- Architecture: DeepseekV3ForCausalLM
- Layers (`num_hidden_layers`): 61
- Query heads (`num_attention_heads`): 128
- KV heads (`num_key_value_heads`): 128
- Head dimension (`head_dim`): Unknown
- Hidden size (`hidden_size`): 7168
- Max context (`max_position_embeddings` or explicit equivalent): 163840
- Weight format/bits (explicit config): bfloat16
- KV cache bits (explicit only): Unknown
- Confidence: **Medium**
- Unresolved fields/errors: KV cache bits not documented
- Citation: HF API/repository/config sources above.

### 38. https://huggingface.co/deepseek-ai/DeepSeek-R1-0528

**Listed variants:**
- rank 66: DeepSeek R1 0528 (May '25)

- Source repository: https://huggingface.co/deepseek-ai/DeepSeek-R1-0528
- Config source: [`config.json` at revision 4236a6af538feda4548eca9ab308586007567f52](https://huggingface.co/deepseek-ai/DeepSeek-R1-0528/resolve/4236a6af538feda4548eca9ab308586007567f52/config.json)
- Repository revision/commit: `4236a6af538feda4548eca9ab308586007567f52`
- Total parameter count: 684,531,386,000 (HF API safetensors.parameters: {"BF16":3918786560,"F8_E4M3":680571043840,"F32":41555600})
- Architecture: DeepseekV3ForCausalLM
- Layers (`num_hidden_layers`): 61
- Query heads (`num_attention_heads`): 128
- KV heads (`num_key_value_heads`): 128
- Head dimension (`head_dim`): Unknown
- Hidden size (`hidden_size`): 7168
- Max context (`max_position_embeddings` or explicit equivalent): 163840
- Weight format/bits (explicit config): bfloat16
- KV cache bits (explicit only): Unknown
- Confidence: **Medium**
- Unresolved fields/errors: KV cache bits not documented
- Citation: HF API/repository/config sources above.

### 39. https://huggingface.co/deepseek-ai/DeepSeek-R1-Distill-Llama-70B

**Listed variants:**
- rank 116: DeepSeek R1 Distill Llama 70B

- Source repository: https://huggingface.co/deepseek-ai/DeepSeek-R1-Distill-Llama-70B
- Config source: [`config.json` at revision b1c0b44b4369b597ad119a196caf79a9c40e141e](https://huggingface.co/deepseek-ai/DeepSeek-R1-Distill-Llama-70B/resolve/b1c0b44b4369b597ad119a196caf79a9c40e141e/config.json)
- Repository revision/commit: `b1c0b44b4369b597ad119a196caf79a9c40e141e`
- Total parameter count: 70,553,706,496 (HF API safetensors.parameters: {"BF16":70553706496})
- Architecture: LlamaForCausalLM
- Layers (`num_hidden_layers`): 80
- Query heads (`num_attention_heads`): 64
- KV heads (`num_key_value_heads`): 8
- Head dimension (`head_dim`): 128
- Hidden size (`hidden_size`): 8192
- Max context (`max_position_embeddings` or explicit equivalent): 131072
- Weight format/bits (explicit config): bfloat16
- KV cache bits (explicit only): Unknown
- Confidence: **Medium**
- Unresolved fields/errors: KV cache bits not documented
- Citation: HF API/repository/config sources above.

### 40. https://huggingface.co/deepseek-ai/DeepSeek-R1-Distill-Qwen-32B

**Listed variants:**
- rank 109: DeepSeek R1 Distill Qwen 32B

- Source repository: https://huggingface.co/deepseek-ai/DeepSeek-R1-Distill-Qwen-32B
- Config source: [`config.json` at revision 711ad2ea6aa40cfca18895e8aca02ab92df1a746](https://huggingface.co/deepseek-ai/DeepSeek-R1-Distill-Qwen-32B/resolve/711ad2ea6aa40cfca18895e8aca02ab92df1a746/config.json)
- Repository revision/commit: `711ad2ea6aa40cfca18895e8aca02ab92df1a746`
- Total parameter count: 32,763,876,352 (HF API safetensors.parameters: {"BF16":32763876352})
- Architecture: Qwen2ForCausalLM
- Layers (`num_hidden_layers`): 64
- Query heads (`num_attention_heads`): 40
- KV heads (`num_key_value_heads`): 8
- Head dimension (`head_dim`): Unknown
- Hidden size (`hidden_size`): 5120
- Max context (`max_position_embeddings` or explicit equivalent): 131072
- Weight format/bits (explicit config): bfloat16
- KV cache bits (explicit only): Unknown
- Confidence: **Medium**
- Unresolved fields/errors: KV cache bits not documented
- Citation: HF API/repository/config sources above.

### 41. https://huggingface.co/deepseek-ai/DeepSeek-V2-Chat

**Listed variants:**
- rank 153: DeepSeek-V2-Chat

- Source repository: https://huggingface.co/deepseek-ai/DeepSeek-V2-Chat
- Config source: [`config.json` at revision 8e3f5f6c2226787e41ba3e9283a06389d178c926](https://huggingface.co/deepseek-ai/DeepSeek-V2-Chat/resolve/8e3f5f6c2226787e41ba3e9283a06389d178c926/config.json)
- Repository revision/commit: `8e3f5f6c2226787e41ba3e9283a06389d178c926`
- Total parameter count: 235,741,434,880 (HF API safetensors.parameters: {"BF16":235741434880})
- Architecture: DeepseekV2ForCausalLM
- Layers (`num_hidden_layers`): 60
- Query heads (`num_attention_heads`): 128
- KV heads (`num_key_value_heads`): 128
- Head dimension (`head_dim`): Unknown
- Hidden size (`hidden_size`): 5120
- Max context (`max_position_embeddings` or explicit equivalent): 163840
- Weight format/bits (explicit config): bfloat16
- KV cache bits (explicit only): Unknown
- Confidence: **Medium**
- Unresolved fields/errors: KV cache bits not documented
- Citation: HF API/repository/config sources above.

### 42. https://huggingface.co/deepseek-ai/DeepSeek-V2.5

**Listed variants:**
- rank 145: DeepSeek-V2.5

- Source repository: https://huggingface.co/deepseek-ai/DeepSeek-V2.5
- Config source: [`config.json` at revision c85b5ede86f2a598af339624cac5723861e557ed](https://huggingface.co/deepseek-ai/DeepSeek-V2.5/resolve/c85b5ede86f2a598af339624cac5723861e557ed/config.json)
- Repository revision/commit: `c85b5ede86f2a598af339624cac5723861e557ed`
- Total parameter count: 235,741,434,880 (HF API safetensors.parameters: {"BF16":235741434880})
- Architecture: DeepseekV2ForCausalLM
- Layers (`num_hidden_layers`): 60
- Query heads (`num_attention_heads`): 128
- KV heads (`num_key_value_heads`): 128
- Head dimension (`head_dim`): Unknown
- Hidden size (`hidden_size`): 5120
- Max context (`max_position_embeddings` or explicit equivalent): 163840
- Weight format/bits (explicit config): bfloat16
- KV cache bits (explicit only): Unknown
- Confidence: **Medium**
- Unresolved fields/errors: KV cache bits not documented
- Citation: HF API/repository/config sources above.

### 43. https://huggingface.co/deepseek-ai/DeepSeek-V2.5-1210

**Listed variants:**
- rank 143: DeepSeek-V2.5 (Dec '24)

- Source repository: https://huggingface.co/deepseek-ai/DeepSeek-V2.5-1210
- Config source: [`config.json` at revision 6f134cbe88cb9284a8ce696e8ac8eefd0bc24ede](https://huggingface.co/deepseek-ai/DeepSeek-V2.5-1210/resolve/6f134cbe88cb9284a8ce696e8ac8eefd0bc24ede/config.json)
- Repository revision/commit: `6f134cbe88cb9284a8ce696e8ac8eefd0bc24ede`
- Total parameter count: 235,741,434,880 (HF API safetensors.parameters: {"BF16":235741434880})
- Architecture: DeepseekV2ForCausalLM
- Layers (`num_hidden_layers`): 60
- Query heads (`num_attention_heads`): 128
- KV heads (`num_key_value_heads`): 128
- Head dimension (`head_dim`): Unknown
- Hidden size (`hidden_size`): 5120
- Max context (`max_position_embeddings` or explicit equivalent): 163840
- Weight format/bits (explicit config): bfloat16
- KV cache bits (explicit only): Unknown
- Confidence: **Medium**
- Unresolved fields/errors: KV cache bits not documented
- Citation: HF API/repository/config sources above.

### 44. https://huggingface.co/deepseek-ai/DeepSeek-V3

**Listed variants:**
- rank 94: DeepSeek V3 (Dec '24)

- Source repository: https://huggingface.co/deepseek-ai/DeepSeek-V3
- Config source: [`config.json` at revision e815299b0bcbac849fa540c768ef21845365c9eb](https://huggingface.co/deepseek-ai/DeepSeek-V3/resolve/e815299b0bcbac849fa540c768ef21845365c9eb/config.json)
- Repository revision/commit: `e815299b0bcbac849fa540c768ef21845365c9eb`
- Total parameter count: 684,531,386,000 (HF API safetensors.parameters: {"BF16":3918786560,"F8_E4M3":680571043840,"F32":41555600})
- Architecture: DeepseekV3ForCausalLM
- Layers (`num_hidden_layers`): 61
- Query heads (`num_attention_heads`): 128
- KV heads (`num_key_value_heads`): 128
- Head dimension (`head_dim`): Unknown
- Hidden size (`hidden_size`): 7168
- Max context (`max_position_embeddings` or explicit equivalent): 163840
- Weight format/bits (explicit config): bfloat16
- KV cache bits (explicit only): Unknown
- Confidence: **Medium**
- Unresolved fields/errors: KV cache bits not documented
- Citation: HF API/repository/config sources above.

### 45. https://huggingface.co/deepseek-ai/DeepSeek-V3-0324

**Listed variants:**
- rank 84: DeepSeek V3 0324

- Source repository: https://huggingface.co/deepseek-ai/DeepSeek-V3-0324
- Config source: [`config.json` at revision e9b33add76883f293d6bf61f6bd89b497e80e335](https://huggingface.co/deepseek-ai/DeepSeek-V3-0324/resolve/e9b33add76883f293d6bf61f6bd89b497e80e335/config.json)
- Repository revision/commit: `e9b33add76883f293d6bf61f6bd89b497e80e335`
- Total parameter count: 684,531,386,000 (HF API safetensors.parameters: {"BF16":3918786560,"F8_E4M3":680571043840,"F32":41555600})
- Architecture: DeepseekV3ForCausalLM
- Layers (`num_hidden_layers`): 61
- Query heads (`num_attention_heads`): 128
- KV heads (`num_key_value_heads`): 128
- Head dimension (`head_dim`): Unknown
- Hidden size (`hidden_size`): 7168
- Max context (`max_position_embeddings` or explicit equivalent): 163840
- Weight format/bits (explicit config): bfloat16
- KV cache bits (explicit only): Unknown
- Confidence: **Medium**
- Unresolved fields/errors: KV cache bits not documented
- Citation: HF API/repository/config sources above.

### 46. https://huggingface.co/deepseek-ai/DeepSeek-V3.1

**Listed variants:**
- rank 61: DeepSeek V3.1 (Non-reasoning)
- rank 63: DeepSeek V3.1 (Reasoning)

- Source repository: https://huggingface.co/deepseek-ai/DeepSeek-V3.1
- Config source: [`config.json` at revision c0781d039fb7a1ba2abc4add0bdc293e92d2b8db](https://huggingface.co/deepseek-ai/DeepSeek-V3.1/resolve/c0781d039fb7a1ba2abc4add0bdc293e92d2b8db/config.json)
- Repository revision/commit: `c0781d039fb7a1ba2abc4add0bdc293e92d2b8db`
- Total parameter count: 684,531,386,000 (HF API safetensors.parameters: {"BF16":3918786560,"F8_E4M3":680571043840,"F32":41555600})
- Architecture: DeepseekV3ForCausalLM
- Layers (`num_hidden_layers`): 61
- Query heads (`num_attention_heads`): 128
- KV heads (`num_key_value_heads`): 128
- Head dimension (`head_dim`): Unknown
- Hidden size (`hidden_size`): 7168
- Max context (`max_position_embeddings` or explicit equivalent): 163840
- Weight format/bits (explicit config): bfloat16
- KV cache bits (explicit only): Unknown
- Confidence: **Medium**
- Unresolved fields/errors: KV cache bits not documented
- Citation: HF API/repository/config sources above.

### 47. https://huggingface.co/deepseek-ai/DeepSeek-V3.1-Terminus

**Listed variants:**
- rank 34: DeepSeek V3.1 Terminus (Reasoning)
- rank 59: DeepSeek V3.1 Terminus (Non-reasoning)

- Source repository: https://huggingface.co/deepseek-ai/DeepSeek-V3.1-Terminus
- Config source: [`config.json` at revision 19510d6dc61f79dbd925bd51ee8a9081c509a4b6](https://huggingface.co/deepseek-ai/DeepSeek-V3.1-Terminus/resolve/19510d6dc61f79dbd925bd51ee8a9081c509a4b6/config.json)
- Repository revision/commit: `19510d6dc61f79dbd925bd51ee8a9081c509a4b6`
- Total parameter count: 684,531,386,000 (HF API safetensors.parameters: {"BF16":3917742080,"F8_E4M3":680571043840,"F32":42600080})
- Architecture: DeepseekV3ForCausalLM
- Layers (`num_hidden_layers`): 61
- Query heads (`num_attention_heads`): 128
- KV heads (`num_key_value_heads`): 128
- Head dimension (`head_dim`): Unknown
- Hidden size (`hidden_size`): 7168
- Max context (`max_position_embeddings` or explicit equivalent): 163840
- Weight format/bits (explicit config): bfloat16
- KV cache bits (explicit only): Unknown
- Confidence: **Medium**
- Unresolved fields/errors: KV cache bits not documented
- Citation: HF API/repository/config sources above.

### 48. https://huggingface.co/deepseek-ai/DeepSeek-V3.2

**Listed variants:**
- rank 29: DeepSeek V3.2 (Reasoning)
- rank 49: DeepSeek V3.2 (Non-reasoning)

- Source repository: https://huggingface.co/deepseek-ai/DeepSeek-V3.2
- Config source: [`config.json` at revision a7e62ac04ecb2c0a54d736dc46601c5606cf10a6](https://huggingface.co/deepseek-ai/DeepSeek-V3.2/resolve/a7e62ac04ecb2c0a54d736dc46601c5606cf10a6/config.json)
- Repository revision/commit: `a7e62ac04ecb2c0a54d736dc46601c5606cf10a6`
- Total parameter count: 685,396,921,376 (HF API safetensors.parameters: {"BF16":3946184704,"F8_E4M3":681408069632,"F32":42667040})
- Architecture: DeepseekV32ForCausalLM
- Layers (`num_hidden_layers`): 61
- Query heads (`num_attention_heads`): 128
- KV heads (`num_key_value_heads`): 128
- Head dimension (`head_dim`): Unknown
- Hidden size (`hidden_size`): 7168
- Max context (`max_position_embeddings` or explicit equivalent): 163840
- Weight format/bits (explicit config): bfloat16
- KV cache bits (explicit only): Unknown
- Confidence: **Medium**
- Unresolved fields/errors: KV cache bits not documented
- Citation: HF API/repository/config sources above.

### 49. https://huggingface.co/deepseek-ai/DeepSeek-V3.2-Exp

**Listed variants:**
- rank 47: DeepSeek V3.2 Exp (Reasoning)
- rank 60: DeepSeek V3.2 Exp (Non-reasoning)

- Source repository: https://huggingface.co/deepseek-ai/DeepSeek-V3.2-Exp
- Config source: [`config.json` at revision 194c67e12b1b0d6df0ef373ddcf215bc84027409](https://huggingface.co/deepseek-ai/DeepSeek-V3.2-Exp/resolve/194c67e12b1b0d6df0ef373ddcf215bc84027409/config.json)
- Repository revision/commit: `194c67e12b1b0d6df0ef373ddcf215bc84027409`
- Total parameter count: 685,396,921,376 (HF API safetensors.parameters: {"BF16":3946184704,"F8_E4M3":681408069632,"F32":42667040})
- Architecture: DeepseekV32ForCausalLM
- Layers (`num_hidden_layers`): 61
- Query heads (`num_attention_heads`): 128
- KV heads (`num_key_value_heads`): 128
- Head dimension (`head_dim`): Unknown
- Hidden size (`hidden_size`): 7168
- Max context (`max_position_embeddings` or explicit equivalent): 163840
- Weight format/bits (explicit config): bfloat16
- KV cache bits (explicit only): Unknown
- Confidence: **Medium**
- Unresolved fields/errors: KV cache bits not documented
- Citation: HF API/repository/config sources above.

### 50. https://huggingface.co/deepseek-ai/DeepSeek-V3.2-Speciale

**Listed variants:**
- rank 57: DeepSeek V3.2 Speciale

- Source repository: https://huggingface.co/deepseek-ai/DeepSeek-V3.2-Speciale
- Config source: [`config.json` at revision c562883eda916fd699a44bbf1f4987a53b96008b](https://huggingface.co/deepseek-ai/DeepSeek-V3.2-Speciale/resolve/c562883eda916fd699a44bbf1f4987a53b96008b/config.json)
- Repository revision/commit: `c562883eda916fd699a44bbf1f4987a53b96008b`
- Total parameter count: 685,396,921,376 (HF API safetensors.parameters: {"BF16":3946184704,"F8_E4M3":681408069632,"F32":42667040})
- Architecture: DeepseekV32ForCausalLM
- Layers (`num_hidden_layers`): 61
- Query heads (`num_attention_heads`): 128
- KV heads (`num_key_value_heads`): 128
- Head dimension (`head_dim`): Unknown
- Hidden size (`hidden_size`): 7168
- Max context (`max_position_embeddings` or explicit equivalent): 163840
- Weight format/bits (explicit config): bfloat16
- KV cache bits (explicit only): Unknown
- Confidence: **Medium**
- Unresolved fields/errors: KV cache bits not documented
- Citation: HF API/repository/config sources above.

### 51. https://huggingface.co/deepseek-ai/DeepSeek-V4-Flash

**Listed variants:**
- rank 12: DeepSeek V4 Flash (Reasoning, Max Effort)
- rank 15: DeepSeek V4 Flash (Reasoning, High Effort)
- rank 42: DeepSeek V4 Flash (Non-reasoning)

- Source repository: https://huggingface.co/deepseek-ai/DeepSeek-V4-Flash
- Config source: [`config.json` at revision 60d8d70770c6776ff598c94bb586a859a38244f1](https://huggingface.co/deepseek-ai/DeepSeek-V4-Flash/resolve/60d8d70770c6776ff598c94bb586a859a38244f1/config.json)
- Repository revision/commit: `60d8d70770c6776ff598c94bb586a859a38244f1`
- Total parameter count: 290,944,616,402 (HF API safetensors.parameters: {"BF16":1415259264,"I64":2327040,"F32":36168018,"F8_E4M3":6023020544,"I8":283467841536})
- Architecture: DeepseekV4ForCausalLM
- Layers (`num_hidden_layers`): 43
- Query heads (`num_attention_heads`): 64
- KV heads (`num_key_value_heads`): 1
- Head dimension (`head_dim`): 512
- Hidden size (`hidden_size`): 4096
- Max context (`max_position_embeddings` or explicit equivalent): 1048576
- Weight format/bits (explicit config): bfloat16
- KV cache bits (explicit only): Unknown
- Confidence: **Medium**
- Unresolved fields/errors: KV cache bits not documented
- Citation: HF API/repository/config sources above.

### 52. https://huggingface.co/deepseek-ai/DeepSeek-V4-Flash-0731

**Listed variants:**
- rank 6: DeepSeek V4 Flash 0731 (Reasoning, Max Effort)

- Source repository: https://huggingface.co/deepseek-ai/DeepSeek-V4-Flash-0731
- Config source: [`config.json` at revision 7872f01b1d1fe23eabc4c98b48bffcef5a386062](https://huggingface.co/deepseek-ai/DeepSeek-V4-Flash-0731/resolve/7872f01b1d1fe23eabc4c98b48bffcef5a386062/config.json)
- Repository revision/commit: `7872f01b1d1fe23eabc4c98b48bffcef5a386062`
- Total parameter count: 304,180,418,494 (HF API safetensors.parameters: {"BF16":1483567488,"I64":2327040,"F32":37741630,"F8_E4M3":6304038912,"I8":296352743424})
- Architecture: DeepseekV4ForCausalLM
- Layers (`num_hidden_layers`): 43
- Query heads (`num_attention_heads`): 64
- KV heads (`num_key_value_heads`): 1
- Head dimension (`head_dim`): 512
- Hidden size (`hidden_size`): 4096
- Max context (`max_position_embeddings` or explicit equivalent): 1048576
- Weight format/bits (explicit config): bfloat16
- KV cache bits (explicit only): Unknown
- Confidence: **Medium**
- Unresolved fields/errors: KV cache bits not documented
- Citation: HF API/repository/config sources above.

### 53. https://huggingface.co/deepseek-ai/DeepSeek-V4-Pro

**Listed variants:**
- rank 8: DeepSeek V4 Pro (Reasoning, Max Effort)
- rank 10: DeepSeek V4 Pro (Reasoning, High Effort)
- rank 32: DeepSeek V4 Pro (Non-reasoning)

- Source repository: https://huggingface.co/deepseek-ai/DeepSeek-V4-Pro
- Config source: [`config.json` at revision b5968e9190ef611bbf34a7229255be88a0e937c1](https://huggingface.co/deepseek-ai/DeepSeek-V4-Pro/resolve/b5968e9190ef611bbf34a7229255be88a0e937c1/config.json)
- Repository revision/commit: `b5968e9190ef611bbf34a7229255be88a0e937c1`
- Total parameter count: 1,598,839,674,782 (HF API safetensors.parameters: {"BF16":2816899328,"I64":2327040,"F32":87776414,"F8_E4M3":23169335296,"I8":1572763336704})
- Architecture: DeepseekV4ForCausalLM
- Layers (`num_hidden_layers`): 61
- Query heads (`num_attention_heads`): 128
- KV heads (`num_key_value_heads`): 1
- Head dimension (`head_dim`): 512
- Hidden size (`hidden_size`): 7168
- Max context (`max_position_embeddings` or explicit equivalent): 1048576
- Weight format/bits (explicit config): bfloat16
- KV cache bits (explicit only): Unknown
- Confidence: **Medium**
- Unresolved fields/errors: KV cache bits not documented
- Citation: HF API/repository/config sources above.

### 54. https://huggingface.co/deepseek-ai/DeepSeek-V4-Pro-0813

**Listed variants:**
- rank 3: DeepSeek V4 Pro 0813 (Reasoning, Max Effort)

- Source repository: https://huggingface.co/deepseek-ai/DeepSeek-V4-Pro-0813
- Config source: [`config.json` at revision 72e1d3230f6c080a530b0a1d46f8eb4602340597](https://huggingface.co/deepseek-ai/DeepSeek-V4-Pro-0813/resolve/72e1d3230f6c080a530b0a1d46f8eb4602340597/config.json)
- Repository revision/commit: `72e1d3230f6c080a530b0a1d46f8eb4602340597`
- Total parameter count: 1,650,497,936,906 (HF API safetensors.parameters: {"BF16":2954820352,"I64":2327040,"F32":90530058,"F8_E4M3":23952621568,"I8":1623497637888})
- Architecture: DeepseekV4ForCausalLM
- Layers (`num_hidden_layers`): 61
- Query heads (`num_attention_heads`): 128
- KV heads (`num_key_value_heads`): 1
- Head dimension (`head_dim`): 512
- Hidden size (`hidden_size`): 7168
- Max context (`max_position_embeddings` or explicit equivalent): 1048576
- Weight format/bits (explicit config): bfloat16
- KV cache bits (explicit only): Unknown
- Confidence: **Medium**
- Unresolved fields/errors: KV cache bits not documented
- Citation: HF API/repository/config sources above.

### 55. https://huggingface.co/google/diffusiongemma-26B-A4B-it

**Listed variants:**
- rank 98: DiffusionGemma 26B A4B

- Source repository: https://huggingface.co/google/diffusiongemma-26B-A4B-it
- Config source: [`config.json` at revision f7f5b7f5fa82ffc52addd066915886d497f5517b](https://huggingface.co/google/diffusiongemma-26B-A4B-it/resolve/f7f5b7f5fa82ffc52addd066915886d497f5517b/config.json)
- Repository revision/commit: `f7f5b7f5fa82ffc52addd066915886d497f5517b`
- Total parameter count: 25,823,781,228 (HF API safetensors.parameters: {"BF16":25823781228})
- Architecture: DiffusionGemmaForBlockDiffusion
- Layers (`num_hidden_layers`): Unknown
- Query heads (`num_attention_heads`): Unknown
- KV heads (`num_key_value_heads`): Unknown
- Head dimension (`head_dim`): Unknown
- Hidden size (`hidden_size`): Unknown
- Max context (`max_position_embeddings` or explicit equivalent): Unknown
- Weight format/bits (explicit config): bfloat16
- KV cache bits (explicit only): Unknown
- Confidence: **Medium**
- Unresolved fields/errors: layers; query heads; KV heads; head_dim/hidden_size; max context; KV cache bits not documented
- Citation: HF API/repository/config sources above.

### 56. https://huggingface.co/google/gemma-3-27b-it

**Listed variants:**
- rank 135: Gemma 3 27B Instruct

- Source repository: https://huggingface.co/google/gemma-3-27b-it
- Config source: Unknown
- Repository revision/commit: `005ad3404e59d6023443cb575daa05336842228a`
- Total parameter count: 27,432,406,640 (HF API safetensors.parameters: {"BF16":27432406640})
- Architecture: Unknown
- Layers (`num_hidden_layers`): Unknown
- Query heads (`num_attention_heads`): Unknown
- KV heads (`num_key_value_heads`): Unknown
- Head dimension (`head_dim`): Unknown
- Hidden size (`hidden_size`): Unknown
- Max context (`max_position_embeddings` or explicit equivalent): Unknown
- Weight format/bits (explicit config): Unknown
- KV cache bits (explicit only): Unknown
- Confidence: **Low**
- Unresolved fields/errors: layers; query heads; KV heads; head_dim/hidden_size; max context; weight format/bits; KV cache bits not documented; config HTTP None at 005ad3404e59d6023443cb575daa05336842228a; config HTTP None at main
- Citation: Supplied source URL and error state above; no usable config was available.

### 57. https://huggingface.co/google/gemma-4-26B-A4B-it

**Listed variants:**
- rank 46: Gemma 4 26B A4B (Reasoning)
- rank 65: Gemma 4 26B A4B (Non-reasoning)

- Source repository: https://huggingface.co/google/gemma-4-26B-A4B-it
- Config source: [`config.json` at revision 4d7ae4984b7db7de8f8457170b3f1a419ee76d52](https://huggingface.co/google/gemma-4-26B-A4B-it/resolve/4d7ae4984b7db7de8f8457170b3f1a419ee76d52/config.json)
- Repository revision/commit: `4d7ae4984b7db7de8f8457170b3f1a419ee76d52`
- Total parameter count: 25,805,936,206 (HF API safetensors.parameters: {"BF16":25805936206})
- Architecture: Gemma4ForConditionalGeneration
- Layers (`num_hidden_layers`): Unknown
- Query heads (`num_attention_heads`): Unknown
- KV heads (`num_key_value_heads`): Unknown
- Head dimension (`head_dim`): Unknown
- Hidden size (`hidden_size`): Unknown
- Max context (`max_position_embeddings` or explicit equivalent): Unknown
- Weight format/bits (explicit config): bfloat16
- KV cache bits (explicit only): Unknown
- Confidence: **Medium**
- Unresolved fields/errors: layers; query heads; KV heads; head_dim/hidden_size; max context; KV cache bits not documented
- Citation: HF API/repository/config sources above.

### 58. https://huggingface.co/google/gemma-4-31B

**Listed variants:**
- rank 58: Gemma 4 31B (Non-reasoning)

- Source repository: https://huggingface.co/google/gemma-4-31B
- Config source: [`config.json` at revision 5bbc2fb1c1b2c611d06e3d9f23c170ba21659d89](https://huggingface.co/google/gemma-4-31B/resolve/5bbc2fb1c1b2c611d06e3d9f23c170ba21659d89/config.json)
- Repository revision/commit: `5bbc2fb1c1b2c611d06e3d9f23c170ba21659d89`
- Total parameter count: 31,273,088,876 (HF API safetensors.parameters: {"BF16":31273088876})
- Architecture: Gemma4ForConditionalGeneration
- Layers (`num_hidden_layers`): Unknown
- Query heads (`num_attention_heads`): Unknown
- KV heads (`num_key_value_heads`): Unknown
- Head dimension (`head_dim`): Unknown
- Hidden size (`hidden_size`): Unknown
- Max context (`max_position_embeddings` or explicit equivalent): Unknown
- Weight format/bits (explicit config): bfloat16
- KV cache bits (explicit only): Unknown
- Confidence: **Medium**
- Unresolved fields/errors: layers; query heads; KV heads; head_dim/hidden_size; max context; KV cache bits not documented
- Citation: HF API/repository/config sources above.

### 59. https://huggingface.co/google/gemma-4-31B-it

**Listed variants:**
- rank 40: Gemma 4 31B (Reasoning)

- Source repository: https://huggingface.co/google/gemma-4-31B-it
- Config source: [`config.json` at revision 842da3794eaa0b77d5f08bae87a17459d91ff475](https://huggingface.co/google/gemma-4-31B-it/resolve/842da3794eaa0b77d5f08bae87a17459d91ff475/config.json)
- Repository revision/commit: `842da3794eaa0b77d5f08bae87a17459d91ff475`
- Total parameter count: 31,273,088,876 (HF API safetensors.parameters: {"BF16":31273088876})
- Architecture: Gemma4ForConditionalGeneration
- Layers (`num_hidden_layers`): Unknown
- Query heads (`num_attention_heads`): Unknown
- KV heads (`num_key_value_heads`): Unknown
- Head dimension (`head_dim`): Unknown
- Hidden size (`hidden_size`): Unknown
- Max context (`max_position_embeddings` or explicit equivalent): Unknown
- Weight format/bits (explicit config): bfloat16
- KV cache bits (explicit only): Unknown
- Confidence: **Medium**
- Unresolved fields/errors: layers; query heads; KV heads; head_dim/hidden_size; max context; KV cache bits not documented
- Citation: HF API/repository/config sources above.

### 60. https://huggingface.co/huggyllama/llama-65b

**Listed variants:**
- rank 158: Llama 65B

- Source repository: https://huggingface.co/huggyllama/llama-65b
- Config source: [`config.json` at revision 49707c5313d34d1c5a846e29cf2a2a650c22c8ee](https://huggingface.co/huggyllama/llama-65b/resolve/49707c5313d34d1c5a846e29cf2a2a650c22c8ee/config.json)
- Repository revision/commit: `49707c5313d34d1c5a846e29cf2a2a650c22c8ee`
- Total parameter count: 65,285,665,792 (HF API safetensors.parameters: {"F32":5120,"F16":65285660672})
- Architecture: LlamaForCausalLM
- Layers (`num_hidden_layers`): 80
- Query heads (`num_attention_heads`): 64
- KV heads (`num_key_value_heads`): Unknown
- Head dimension (`head_dim`): Unknown
- Hidden size (`hidden_size`): 8192
- Max context (`max_position_embeddings` or explicit equivalent): 2048
- Weight format/bits (explicit config): float16
- KV cache bits (explicit only): Unknown
- Confidence: **Medium**
- Unresolved fields/errors: KV heads; KV cache bits not documented
- Citation: HF API/repository/config sources above.

### 61. https://huggingface.co/inclusionAI/Ling-1T

**Listed variants:**
- rank 101: Ling-1T

- Source repository: https://huggingface.co/inclusionAI/Ling-1T
- Config source: [`config.json` at revision 268f2aa76aa8cf5b36ca33805481cea91133327e](https://huggingface.co/inclusionAI/Ling-1T/resolve/268f2aa76aa8cf5b36ca33805481cea91133327e/config.json)
- Repository revision/commit: `268f2aa76aa8cf5b36ca33805481cea91133327e`
- Total parameter count: 999,705,328,640 (HF API safetensors.parameters: {"BF16":999705309184,"F32":19456})
- Architecture: BailingMoeV2ForCausalLM
- Layers (`num_hidden_layers`): 80
- Query heads (`num_attention_heads`): 64
- KV heads (`num_key_value_heads`): 8
- Head dimension (`head_dim`): 128
- Hidden size (`hidden_size`): 8192
- Max context (`max_position_embeddings` or explicit equivalent): 32768
- Weight format/bits (explicit config): bfloat16
- KV cache bits (explicit only): Unknown
- Confidence: **Medium**
- Unresolved fields/errors: KV cache bits not documented
- Citation: HF API/repository/config sources above.

### 62. https://huggingface.co/inclusionAI/Ling-2.6-1T

**Listed variants:**
- rank 45: Ling-2.6-1T

- Source repository: https://huggingface.co/inclusionAI/Ling-2.6-1T
- Config source: [`config.json` at revision 07b9e26bb1f97494b4fd62eed83f22722ffd560a](https://huggingface.co/inclusionAI/Ling-2.6-1T/resolve/07b9e26bb1f97494b4fd62eed83f22722ffd560a/config.json)
- Repository revision/commit: `07b9e26bb1f97494b4fd62eed83f22722ffd560a`
- Total parameter count: 1,025,657,871,744 (HF API safetensors.parameters: {"F32":19712,"BF16":16163328128,"F8_E4M3":1009494523904})
- Architecture: BailingMoeV2_5ForCausalLM
- Layers (`num_hidden_layers`): 80
- Query heads (`num_attention_heads`): 64
- KV heads (`num_key_value_heads`): 64
- Head dimension (`head_dim`): 128
- Hidden size (`hidden_size`): 8192
- Max context (`max_position_embeddings` or explicit equivalent): 262144
- Weight format/bits (explicit config): bfloat16
- KV cache bits (explicit only): Unknown
- Confidence: **Medium**
- Unresolved fields/errors: KV cache bits not documented
- Citation: HF API/repository/config sources above.

### 63. https://huggingface.co/inclusionAI/Ling-2.6-flash

**Listed variants:**
- rank 95: Ling 2.6 Flash

- Source repository: https://huggingface.co/inclusionAI/Ling-2.6-flash
- Config source: [`config.json` at revision 11236968749136a78d4b7cbfb786c4460f2f353e](https://huggingface.co/inclusionAI/Ling-2.6-flash/resolve/11236968749136a78d4b7cbfb786c4460f2f353e/config.json)
- Repository revision/commit: `11236968749136a78d4b7cbfb786c4460f2f353e`
- Total parameter count: 107,494,409,216 (HF API safetensors.parameters: {"BF16":107494401024,"F32":8192})
- Architecture: BailingMoeV2_5ForCausalLM
- Layers (`num_hidden_layers`): 32
- Query heads (`num_attention_heads`): 32
- KV heads (`num_key_value_heads`): 32
- Head dimension (`head_dim`): 128
- Hidden size (`hidden_size`): 4096
- Max context (`max_position_embeddings` or explicit equivalent): 131072
- Weight format/bits (explicit config): bfloat16
- KV cache bits (explicit only): Unknown
- Confidence: **Medium**
- Unresolved fields/errors: KV cache bits not documented
- Citation: HF API/repository/config sources above.

### 64. https://huggingface.co/inclusionAI/Ling-flash-2.0

**Listed variants:**
- rank 117: Ling-flash-2.0

- Source repository: https://huggingface.co/inclusionAI/Ling-flash-2.0
- Config source: [`config.json` at revision 18ca64a019b553be57bab50af3207fb2f3675edc](https://huggingface.co/inclusionAI/Ling-flash-2.0/resolve/18ca64a019b553be57bab50af3207fb2f3675edc/config.json)
- Repository revision/commit: `18ca64a019b553be57bab50af3207fb2f3675edc`
- Total parameter count: 102,889,705,216 (HF API safetensors.parameters: {"BF16":102889697280,"F32":7936})
- Architecture: BailingMoeV2ForCausalLM
- Layers (`num_hidden_layers`): 32
- Query heads (`num_attention_heads`): 32
- KV heads (`num_key_value_heads`): 4
- Head dimension (`head_dim`): 128
- Hidden size (`hidden_size`): 4096
- Max context (`max_position_embeddings` or explicit equivalent): 32768
- Weight format/bits (explicit config): bfloat16
- KV cache bits (explicit only): Unknown
- Confidence: **Medium**
- Unresolved fields/errors: KV cache bits not documented
- Citation: HF API/repository/config sources above.

### 65. https://huggingface.co/inclusionAI/Ring-1T

**Listed variants:**
- rank 81: Ring-1T

- Source repository: https://huggingface.co/inclusionAI/Ring-1T
- Config source: [`config.json` at revision 6eddd704b4cb87013998d138f26175d97ebf79fe](https://huggingface.co/inclusionAI/Ring-1T/resolve/6eddd704b4cb87013998d138f26175d97ebf79fe/config.json)
- Repository revision/commit: `6eddd704b4cb87013998d138f26175d97ebf79fe`
- Total parameter count: 999,705,328,640 (HF API safetensors.parameters: {"F32":19456,"BF16":999705309184})
- Architecture: BailingMoeV2ForCausalLM
- Layers (`num_hidden_layers`): 80
- Query heads (`num_attention_heads`): 64
- KV heads (`num_key_value_heads`): 8
- Head dimension (`head_dim`): 128
- Hidden size (`hidden_size`): 8192
- Max context (`max_position_embeddings` or explicit equivalent): 65536
- Weight format/bits (explicit config): bfloat16
- KV cache bits (explicit only): Unknown
- Confidence: **Medium**
- Unresolved fields/errors: KV cache bits not documented
- Citation: HF API/repository/config sources above.

### 66. https://huggingface.co/inclusionAI/Ring-2.6-1T

**Listed variants:**
- rank 33: Ring-2.6-1T

- Source repository: https://huggingface.co/inclusionAI/Ring-2.6-1T
- Config source: [`config.json` at revision 1e58be9318352541575130d4dbbdcc735fca7a03](https://huggingface.co/inclusionAI/Ring-2.6-1T/resolve/1e58be9318352541575130d4dbbdcc735fca7a03/config.json)
- Repository revision/commit: `1e58be9318352541575130d4dbbdcc735fca7a03`
- Total parameter count: 1,025,657,871,744 (HF API safetensors.parameters: {"F32":19712,"BF16":16163328128,"F8_E4M3":1009494523904})
- Architecture: BailingMoeV2_5ForCausalLM
- Layers (`num_hidden_layers`): 80
- Query heads (`num_attention_heads`): 64
- KV heads (`num_key_value_heads`): 64
- Head dimension (`head_dim`): 128
- Hidden size (`hidden_size`): 8192
- Max context (`max_position_embeddings` or explicit equivalent): 131072
- Weight format/bits (explicit config): bfloat16
- KV cache bits (explicit only): Unknown
- Confidence: **Medium**
- Unresolved fields/errors: KV cache bits not documented
- Citation: HF API/repository/config sources above.

### 67. https://huggingface.co/inclusionAI/Ring-flash-2.0

**Listed variants:**
- rank 132: Ring-flash-2.0

- Source repository: https://huggingface.co/inclusionAI/Ring-flash-2.0
- Config source: [`config.json` at revision f1414688165d0f7eb46c81c7ed0ebd8e47ef51f6](https://huggingface.co/inclusionAI/Ring-flash-2.0/resolve/f1414688165d0f7eb46c81c7ed0ebd8e47ef51f6/config.json)
- Repository revision/commit: `f1414688165d0f7eb46c81c7ed0ebd8e47ef51f6`
- Total parameter count: 102,889,705,216 (HF API safetensors.parameters: {"BF16":102889697280,"F32":7936})
- Architecture: BailingMoeV2ForCausalLM
- Layers (`num_hidden_layers`): 32
- Query heads (`num_attention_heads`): 32
- KV heads (`num_key_value_heads`): 4
- Head dimension (`head_dim`): 128
- Hidden size (`hidden_size`): 4096
- Max context (`max_position_embeddings` or explicit equivalent): 32768
- Weight format/bits (explicit config): bfloat16
- KV cache bits (explicit only): Unknown
- Confidence: **Medium**
- Unresolved fields/errors: KV cache bits not documented
- Citation: HF API/repository/config sources above.

### 68. https://huggingface.co/meta-llama/Llama-2-70b-chat-hf

**Listed variants:**
- rank 156: Llama 2 Chat 70B

- Source repository: https://huggingface.co/meta-llama/Llama-2-70b-chat-hf
- Config source: Unknown
- Repository revision/commit: `e9149a12809580e8602995856f8098ce973d1080`
- Total parameter count: 68,976,653,312 (HF API safetensors.parameters: {"F16":68976648192,"F32":5120})
- Architecture: Unknown
- Layers (`num_hidden_layers`): Unknown
- Query heads (`num_attention_heads`): Unknown
- KV heads (`num_key_value_heads`): Unknown
- Head dimension (`head_dim`): Unknown
- Hidden size (`hidden_size`): Unknown
- Max context (`max_position_embeddings` or explicit equivalent): Unknown
- Weight format/bits (explicit config): Unknown
- KV cache bits (explicit only): Unknown
- Confidence: **Low**
- Unresolved fields/errors: layers; query heads; KV heads; head_dim/hidden_size; max context; weight format/bits; KV cache bits not documented; config HTTP None at e9149a12809580e8602995856f8098ce973d1080; config HTTP None at main
- Citation: Supplied source URL and error state above; no usable config was available.

### 69. https://huggingface.co/meta-llama/Llama-3.2-90B-Vision

**Listed variants:**
- rank 146: Llama 3.2 Instruct 90B (Vision)

- Source repository: https://huggingface.co/meta-llama/Llama-3.2-90B-Vision
- Config source: Unknown
- Repository revision/commit: `38850089f6a42b7394680c4e4bbd4c40fb62404f`
- Total parameter count: 88,593,355,323 (HF API safetensors.parameters: {"BF16":88593355323})
- Architecture: Unknown
- Layers (`num_hidden_layers`): Unknown
- Query heads (`num_attention_heads`): Unknown
- KV heads (`num_key_value_heads`): Unknown
- Head dimension (`head_dim`): Unknown
- Hidden size (`hidden_size`): Unknown
- Max context (`max_position_embeddings` or explicit equivalent): Unknown
- Weight format/bits (explicit config): Unknown
- KV cache bits (explicit only): Unknown
- Confidence: **Low**
- Unresolved fields/errors: layers; query heads; KV heads; head_dim/hidden_size; max context; weight format/bits; KV cache bits not documented; config HTTP None at 38850089f6a42b7394680c4e4bbd4c40fb62404f; config HTTP None at main
- Citation: Supplied source URL and error state above; no usable config was available.

### 70. https://huggingface.co/meta-llama/Llama-3.3-70B-Instruct

**Listed variants:**
- rank 120: Llama 3.3 Instruct 70B

- Source repository: https://huggingface.co/meta-llama/Llama-3.3-70B-Instruct
- Config source: Unknown
- Repository revision/commit: `6f6073b423013f6a7d4d9f39144961bfbfbc386b`
- Total parameter count: 70,553,706,496 (HF API safetensors.parameters: {"BF16":70553706496})
- Architecture: Unknown
- Layers (`num_hidden_layers`): Unknown
- Query heads (`num_attention_heads`): Unknown
- KV heads (`num_key_value_heads`): Unknown
- Head dimension (`head_dim`): Unknown
- Hidden size (`hidden_size`): Unknown
- Max context (`max_position_embeddings` or explicit equivalent): Unknown
- Weight format/bits (explicit config): Unknown
- KV cache bits (explicit only): Unknown
- Confidence: **Low**
- Unresolved fields/errors: layers; query heads; KV heads; head_dim/hidden_size; max context; weight format/bits; KV cache bits not documented; config HTTP None at 6f6073b423013f6a7d4d9f39144961bfbfbc386b; config HTTP None at main
- Citation: Supplied source URL and error state above; no usable config was available.

### 71. https://huggingface.co/meta-llama/Llama-4-Maverick-17B-128E-Instruct

**Listed variants:**
- rank 91: Llama 4 Maverick

- Source repository: https://huggingface.co/meta-llama/Llama-4-Maverick-17B-128E-Instruct
- Config source: Unknown
- Repository revision/commit: `73d14711bcc77c16df3470856949c3764056b617`
- Total parameter count: 401,583,781,376 (HF API safetensors.parameters: {"BF16":401583781376})
- Architecture: Unknown
- Layers (`num_hidden_layers`): Unknown
- Query heads (`num_attention_heads`): Unknown
- KV heads (`num_key_value_heads`): Unknown
- Head dimension (`head_dim`): Unknown
- Hidden size (`hidden_size`): Unknown
- Max context (`max_position_embeddings` or explicit equivalent): Unknown
- Weight format/bits (explicit config): Unknown
- KV cache bits (explicit only): Unknown
- Confidence: **Low**
- Unresolved fields/errors: layers; query heads; KV heads; head_dim/hidden_size; max context; weight format/bits; KV cache bits not documented; config HTTP None at 73d14711bcc77c16df3470856949c3764056b617; config HTTP None at main
- Citation: Supplied source URL and error state above; no usable config was available.

### 72. https://huggingface.co/meta-llama/Llama-4-Scout-17B-16E-Instruct

**Listed variants:**
- rank 114: Llama 4 Scout

- Source repository: https://huggingface.co/meta-llama/Llama-4-Scout-17B-16E-Instruct
- Config source: Unknown
- Repository revision/commit: `92f3b1597a195b523d8d9e5700e57e4fbb8f20d3`
- Total parameter count: 108,641,793,536 (HF API safetensors.parameters: {"BF16":108641793536})
- Architecture: Unknown
- Layers (`num_hidden_layers`): Unknown
- Query heads (`num_attention_heads`): Unknown
- KV heads (`num_key_value_heads`): Unknown
- Head dimension (`head_dim`): Unknown
- Hidden size (`hidden_size`): Unknown
- Max context (`max_position_embeddings` or explicit equivalent): Unknown
- Weight format/bits (explicit config): Unknown
- KV cache bits (explicit only): Unknown
- Confidence: **Low**
- Unresolved fields/errors: layers; query heads; KV heads; head_dim/hidden_size; max context; weight format/bits; KV cache bits not documented; config HTTP None at 92f3b1597a195b523d8d9e5700e57e4fbb8f20d3; config HTTP None at main
- Citation: Supplied source URL and error state above; no usable config was available.

### 73. https://huggingface.co/meta-llama/Meta-Llama-3-8B-Instruct

**Listed variants:**
- rank 154: Llama 3 Instruct 70B

- Source repository: https://huggingface.co/meta-llama/Meta-Llama-3-8B-Instruct
- Config source: Unknown
- Repository revision/commit: `8afb486c1db24fe5011ec46dfbe5b5dccdb575c2`
- Total parameter count: 8,030,261,248 (HF API safetensors.parameters: {"BF16":8030261248})
- Architecture: Unknown
- Layers (`num_hidden_layers`): Unknown
- Query heads (`num_attention_heads`): Unknown
- KV heads (`num_key_value_heads`): Unknown
- Head dimension (`head_dim`): Unknown
- Hidden size (`hidden_size`): Unknown
- Max context (`max_position_embeddings` or explicit equivalent): Unknown
- Weight format/bits (explicit config): Unknown
- KV cache bits (explicit only): Unknown
- Confidence: **Low**
- Unresolved fields/errors: layers; query heads; KV heads; head_dim/hidden_size; max context; weight format/bits; KV cache bits not documented; config HTTP None at 8afb486c1db24fe5011ec46dfbe5b5dccdb575c2; config HTTP None at main
- Citation: Supplied source URL and error state above; no usable config was available.

### 74. https://huggingface.co/meta-llama/Meta-Llama-3.1-405B

**Listed variants:**
- rank 130: Llama 3.1 Instruct 405B

- Source repository: https://huggingface.co/meta-llama/Meta-Llama-3.1-405B
- Config source: Unknown
- Repository revision/commit: `b906e4dc842aa489c962f9db26554dcfdde901fe`
- Total parameter count: 405,853,388,800 (HF API safetensors.parameters: {"BF16":405853388800})
- Architecture: Unknown
- Layers (`num_hidden_layers`): Unknown
- Query heads (`num_attention_heads`): Unknown
- KV heads (`num_key_value_heads`): Unknown
- Head dimension (`head_dim`): Unknown
- Hidden size (`hidden_size`): Unknown
- Max context (`max_position_embeddings` or explicit equivalent): Unknown
- Weight format/bits (explicit config): Unknown
- KV cache bits (explicit only): Unknown
- Confidence: **Low**
- Unresolved fields/errors: layers; query heads; KV heads; head_dim/hidden_size; max context; weight format/bits; KV cache bits not documented; config HTTP None at b906e4dc842aa489c962f9db26554dcfdde901fe; config HTTP None at main
- Citation: Supplied source URL and error state above; no usable config was available.

### 75. https://huggingface.co/meta-llama/Meta-Llama-3.1-70B

**Listed variants:**
- rank 144: Llama 3.1 Instruct 70B

- Source repository: https://huggingface.co/meta-llama/Meta-Llama-3.1-70B
- Config source: Unknown
- Repository revision/commit: `349b2ddb53ce8f2849a6c168a81980ab25258dac`
- Total parameter count: 70,553,706,496 (HF API safetensors.parameters: {"BF16":70553706496})
- Architecture: Unknown
- Layers (`num_hidden_layers`): Unknown
- Query heads (`num_attention_heads`): Unknown
- KV heads (`num_key_value_heads`): Unknown
- Head dimension (`head_dim`): Unknown
- Hidden size (`hidden_size`): Unknown
- Max context (`max_position_embeddings` or explicit equivalent): Unknown
- Weight format/bits (explicit config): Unknown
- KV cache bits (explicit only): Unknown
- Confidence: **Low**
- Unresolved fields/errors: layers; query heads; KV heads; head_dim/hidden_size; max context; weight format/bits; KV cache bits not documented; config HTTP None at 349b2ddb53ce8f2849a6c168a81980ab25258dac; config HTTP None at main
- Citation: Supplied source URL and error state above; no usable config was available.

### 76. https://huggingface.co/mistralai/Devstral-2-123B-Instruct-2512

**Listed variants:**
- rank 71: Devstral 2

- Source repository: https://huggingface.co/mistralai/Devstral-2-123B-Instruct-2512
- Config source: [`config.json` at revision 1613bf01adb5e1c6fdc196b46e6b173eae75eb4a](https://huggingface.co/mistralai/Devstral-2-123B-Instruct-2512/resolve/1613bf01adb5e1c6fdc196b46e6b173eae75eb4a/config.json)
- Repository revision/commit: `1613bf01adb5e1c6fdc196b46e6b173eae75eb4a`
- Total parameter count: 125,025,988,608 (HF API safetensors.parameters: {"BF16":3223400448,"F8_E4M3":121802588160})
- Architecture: Ministral3ForCausalLM
- Layers (`num_hidden_layers`): 88
- Query heads (`num_attention_heads`): 96
- KV heads (`num_key_value_heads`): 8
- Head dimension (`head_dim`): 128
- Hidden size (`hidden_size`): 12288
- Max context (`max_position_embeddings` or explicit equivalent): 262144
- Weight format/bits (explicit config): bfloat16
- KV cache bits (explicit only): Unknown
- Confidence: **Medium**
- Unresolved fields/errors: KV cache bits not documented
- Citation: HF API/repository/config sources above.

### 77. https://huggingface.co/mistralai/Devstral-Small-2-24B-Instruct-2512

**Listed variants:**
- rank 77: Devstral Small 2

- Source repository: https://huggingface.co/mistralai/Devstral-Small-2-24B-Instruct-2512
- Config source: [`config.json` at revision 55c5b41e98c2dbd21b0c8afffc540dcfc9eb5128](https://huggingface.co/mistralai/Devstral-Small-2-24B-Instruct-2512/resolve/55c5b41e98c2dbd21b0c8afffc540dcfc9eb5128/config.json)
- Repository revision/commit: `55c5b41e98c2dbd21b0c8afffc540dcfc9eb5128`
- Total parameter count: 24,011,361,280 (HF API safetensors.parameters: {"BF16":1781550080,"F8_E4M3":22229811200})
- Architecture: Mistral3ForConditionalGeneration
- Layers (`num_hidden_layers`): Unknown
- Query heads (`num_attention_heads`): Unknown
- KV heads (`num_key_value_heads`): Unknown
- Head dimension (`head_dim`): Unknown
- Hidden size (`hidden_size`): Unknown
- Max context (`max_position_embeddings` or explicit equivalent): Unknown
- Weight format/bits (explicit config): bfloat16
- KV cache bits (explicit only): Unknown
- Confidence: **Medium**
- Unresolved fields/errors: layers; query heads; KV heads; head_dim/hidden_size; max context; KV cache bits not documented
- Citation: HF API/repository/config sources above.

### 78. https://huggingface.co/mistralai/Devstral-Small-2505

**Listed variants:**
- rank 105: Devstral Small (May '25)

- Source repository: https://huggingface.co/mistralai/Devstral-Small-2505
- Config source: [`config.json` at revision c2a9d81a2989af566682b4cecc828c84556076c5](https://huggingface.co/mistralai/Devstral-Small-2505/resolve/c2a9d81a2989af566682b4cecc828c84556076c5/config.json)
- Repository revision/commit: `c2a9d81a2989af566682b4cecc828c84556076c5`
- Total parameter count: 23,572,403,200 (HF API safetensors.parameters: {"BF16":23572403200})
- Architecture: MistralForCausalLM
- Layers (`num_hidden_layers`): 40
- Query heads (`num_attention_heads`): 32
- KV heads (`num_key_value_heads`): 8
- Head dimension (`head_dim`): 128
- Hidden size (`hidden_size`): 5120
- Max context (`max_position_embeddings` or explicit equivalent): 131072
- Weight format/bits (explicit config): bfloat16
- KV cache bits (explicit only): Unknown
- Confidence: **Medium**
- Unresolved fields/errors: KV cache bits not documented
- Citation: HF API/repository/config sources above.

### 79. https://huggingface.co/mistralai/Devstral-Small-2507

**Listed variants:**
- rank 122: Devstral Small (Jul '25)

- Source repository: https://huggingface.co/mistralai/Devstral-Small-2507
- Config source: [`config.json` at revision bd165ab26cebbcc2eea2c4ecbfc07f3ac42b3c39](https://huggingface.co/mistralai/Devstral-Small-2507/resolve/bd165ab26cebbcc2eea2c4ecbfc07f3ac42b3c39/config.json)
- Repository revision/commit: `bd165ab26cebbcc2eea2c4ecbfc07f3ac42b3c39`
- Total parameter count: 23,572,403,200 (HF API safetensors.parameters: {"BF16":23572403200})
- Architecture: MistralForCausalLM
- Layers (`num_hidden_layers`): 40
- Query heads (`num_attention_heads`): 32
- KV heads (`num_key_value_heads`): 8
- Head dimension (`head_dim`): 128
- Hidden size (`hidden_size`): 5120
- Max context (`max_position_embeddings` or explicit equivalent): 131072
- Weight format/bits (explicit config): bfloat16
- KV cache bits (explicit only): Unknown
- Confidence: **Medium**
- Unresolved fields/errors: KV cache bits not documented
- Citation: HF API/repository/config sources above.

### 80. https://huggingface.co/mistralai/Magistral-Small-2506

**Listed variants:**
- rank 113: Magistral Small 1

- Source repository: https://huggingface.co/mistralai/Magistral-Small-2506
- Config source: [`config.json` at revision ad2fce5b4113139e1877dcadfd826c9262ad8e8c](https://huggingface.co/mistralai/Magistral-Small-2506/resolve/ad2fce5b4113139e1877dcadfd826c9262ad8e8c/config.json)
- Repository revision/commit: `ad2fce5b4113139e1877dcadfd826c9262ad8e8c`
- Total parameter count: 23,572,403,200 (HF API safetensors.parameters: {"BF16":23572403200})
- Architecture: MistralForCausalLM
- Layers (`num_hidden_layers`): 40
- Query heads (`num_attention_heads`): 32
- KV heads (`num_key_value_heads`): 8
- Head dimension (`head_dim`): 128
- Hidden size (`hidden_size`): 5120
- Max context (`max_position_embeddings` or explicit equivalent): 40960
- Weight format/bits (explicit config): bfloat16
- KV cache bits (explicit only): Unknown
- Confidence: **Medium**
- Unresolved fields/errors: KV cache bits not documented
- Citation: HF API/repository/config sources above.

### 81. https://huggingface.co/mistralai/Magistral-Small-2509

**Listed variants:**
- rank 106: Magistral Small 1.2

- Source repository: https://huggingface.co/mistralai/Magistral-Small-2509
- Config source: [`config.json` at revision a31cc96ab10cf19bc42c628fedf1e359e0853c49](https://huggingface.co/mistralai/Magistral-Small-2509/resolve/a31cc96ab10cf19bc42c628fedf1e359e0853c49/config.json)
- Repository revision/commit: `a31cc96ab10cf19bc42c628fedf1e359e0853c49`
- Total parameter count: 24,011,361,280 (HF API safetensors.parameters: {"BF16":24011361280})
- Architecture: Mistral3ForConditionalGeneration
- Layers (`num_hidden_layers`): Unknown
- Query heads (`num_attention_heads`): Unknown
- KV heads (`num_key_value_heads`): Unknown
- Head dimension (`head_dim`): Unknown
- Hidden size (`hidden_size`): Unknown
- Max context (`max_position_embeddings` or explicit equivalent): Unknown
- Weight format/bits (explicit config): bfloat16
- KV cache bits (explicit only): Unknown
- Confidence: **Medium**
- Unresolved fields/errors: layers; query heads; KV heads; head_dim/hidden_size; max context; KV cache bits not documented
- Citation: HF API/repository/config sources above.

### 82. https://huggingface.co/mistralai/Mistral-Large-3-675B-Instruct-2512

**Listed variants:**
- rank 82: Mistral Large 3

- Source repository: https://huggingface.co/mistralai/Mistral-Large-3-675B-Instruct-2512
- Config source: Unknown
- Repository revision/commit: `383ffea2c7d60dfd44ca960e8e691709d4fdb9cd`
- Total parameter count: Unknown
- Architecture: Unknown
- Layers (`num_hidden_layers`): Unknown
- Query heads (`num_attention_heads`): Unknown
- KV heads (`num_key_value_heads`): Unknown
- Head dimension (`head_dim`): Unknown
- Hidden size (`hidden_size`): Unknown
- Max context (`max_position_embeddings` or explicit equivalent): Unknown
- Weight format/bits (explicit config): Unknown
- KV cache bits (explicit only): Unknown
- Confidence: **Low**
- Unresolved fields/errors: layers; query heads; KV heads; head_dim/hidden_size; max context; weight format/bits; KV cache bits not documented; config HTTP None at 383ffea2c7d60dfd44ca960e8e691709d4fdb9cd; config HTTP None at main
- Citation: Supplied source URL and error state above; no usable config was available.

### 83. https://huggingface.co/mistralai/Mistral-Large-Instruct-2407

**Listed variants:**
- rank 138: Mistral Large 2 (Jul '24)

- Source repository: https://huggingface.co/mistralai/Mistral-Large-Instruct-2407
- Config source: Unknown
- Repository revision/commit: `a286006d554cb37a61d13c7ae61bc90cc1d372fc`
- Total parameter count: 122,610,069,504 (HF API safetensors.parameters: {"BF16":122610069504})
- Architecture: Unknown
- Layers (`num_hidden_layers`): Unknown
- Query heads (`num_attention_heads`): Unknown
- KV heads (`num_key_value_heads`): Unknown
- Head dimension (`head_dim`): Unknown
- Hidden size (`hidden_size`): Unknown
- Max context (`max_position_embeddings` or explicit equivalent): Unknown
- Weight format/bits (explicit config): Unknown
- KV cache bits (explicit only): Unknown
- Confidence: **Low**
- Unresolved fields/errors: layers; query heads; KV heads; head_dim/hidden_size; max context; weight format/bits; KV cache bits not documented; config HTTP None at a286006d554cb37a61d13c7ae61bc90cc1d372fc; config HTTP None at main
- Citation: Supplied source URL and error state above; no usable config was available.

### 84. https://huggingface.co/mistralai/Mistral-Large-Instruct-2411

**Listed variants:**
- rank 124: Mistral Large 2 (Nov '24)

- Source repository: https://huggingface.co/mistralai/Mistral-Large-Instruct-2411
- Config source: [`config.json` at revision ba78820945ae22361b0274cf0ae6d696c967c1a4](https://huggingface.co/mistralai/Mistral-Large-Instruct-2411/resolve/ba78820945ae22361b0274cf0ae6d696c967c1a4/config.json)
- Repository revision/commit: `ba78820945ae22361b0274cf0ae6d696c967c1a4`
- Total parameter count: 122,610,069,504 (HF API safetensors.parameters: {"BF16":122610069504})
- Architecture: MistralForCausalLM
- Layers (`num_hidden_layers`): 88
- Query heads (`num_attention_heads`): 96
- KV heads (`num_key_value_heads`): 8
- Head dimension (`head_dim`): 128
- Hidden size (`hidden_size`): 12288
- Max context (`max_position_embeddings` or explicit equivalent): 131072
- Weight format/bits (explicit config): Unknown
- KV cache bits (explicit only): Unknown
- Confidence: **Medium**
- Unresolved fields/errors: weight format/bits; KV cache bits not documented
- Citation: HF API/repository/config sources above.

### 85. https://huggingface.co/mistralai/Mistral-Medium-3.5-128B

**Listed variants:**
- rank 36: Mistral Medium 3.5

- Source repository: https://huggingface.co/mistralai/Mistral-Medium-3.5-128B
- Config source: [`config.json` at revision 22b2b868a15677cfa6061277ed2f653d1349a9ab](https://huggingface.co/mistralai/Mistral-Medium-3.5-128B/resolve/22b2b868a15677cfa6061277ed2f653d1349a9ab/config.json)
- Repository revision/commit: `22b2b868a15677cfa6061277ed2f653d1349a9ab`
- Total parameter count: 127,704,210,176 (HF API safetensors.parameters: {"BF16":5901622016,"F8_E4M3":121802588160})
- Architecture: Mistral3ForConditionalGeneration
- Layers (`num_hidden_layers`): Unknown
- Query heads (`num_attention_heads`): Unknown
- KV heads (`num_key_value_heads`): Unknown
- Head dimension (`head_dim`): Unknown
- Hidden size (`hidden_size`): Unknown
- Max context (`max_position_embeddings` or explicit equivalent): Unknown
- Weight format/bits (explicit config): bfloat16
- KV cache bits (explicit only): Unknown
- Confidence: **Medium**
- Unresolved fields/errors: layers; query heads; KV heads; head_dim/hidden_size; max context; KV cache bits not documented
- Citation: HF API/repository/config sources above.

### 86. https://huggingface.co/mistralai/Mistral-Small-24B-Instruct-2501

**Listed variants:**
- rank 141: Mistral Small 3

- Source repository: https://huggingface.co/mistralai/Mistral-Small-24B-Instruct-2501
- Config source: [`config.json` at revision 9527884be6e5616bdd54de542f9ae13384489724](https://huggingface.co/mistralai/Mistral-Small-24B-Instruct-2501/resolve/9527884be6e5616bdd54de542f9ae13384489724/config.json)
- Repository revision/commit: `9527884be6e5616bdd54de542f9ae13384489724`
- Total parameter count: 23,572,403,200 (HF API safetensors.parameters: {"BF16":23572403200})
- Architecture: MistralForCausalLM
- Layers (`num_hidden_layers`): 40
- Query heads (`num_attention_heads`): 32
- KV heads (`num_key_value_heads`): 8
- Head dimension (`head_dim`): 128
- Hidden size (`hidden_size`): 5120
- Max context (`max_position_embeddings` or explicit equivalent): 32768
- Weight format/bits (explicit config): bfloat16
- KV cache bits (explicit only): Unknown
- Confidence: **Medium**
- Unresolved fields/errors: KV cache bits not documented
- Citation: HF API/repository/config sources above.

### 87. https://huggingface.co/mistralai/Mistral-Small-3.1-24B-Base-2503

**Listed variants:**
- rank 88: Mistral Small 3.1

- Source repository: https://huggingface.co/mistralai/Mistral-Small-3.1-24B-Base-2503
- Config source: [`config.json` at revision ba6496e3dce1d0bdc93848804b1d4b9d5f3c57bc](https://huggingface.co/mistralai/Mistral-Small-3.1-24B-Base-2503/resolve/ba6496e3dce1d0bdc93848804b1d4b9d5f3c57bc/config.json)
- Repository revision/commit: `ba6496e3dce1d0bdc93848804b1d4b9d5f3c57bc`
- Total parameter count: 24,011,361,280 (HF API safetensors.parameters: {"BF16":24011361280})
- Architecture: Mistral3ForConditionalGeneration
- Layers (`num_hidden_layers`): Unknown
- Query heads (`num_attention_heads`): Unknown
- KV heads (`num_key_value_heads`): Unknown
- Head dimension (`head_dim`): Unknown
- Hidden size (`hidden_size`): Unknown
- Max context (`max_position_embeddings` or explicit equivalent): Unknown
- Weight format/bits (explicit config): bfloat16
- KV cache bits (explicit only): Unknown
- Confidence: **Medium**
- Unresolved fields/errors: layers; query heads; KV heads; head_dim/hidden_size; max context; KV cache bits not documented
- Citation: HF API/repository/config sources above.

### 88. https://huggingface.co/mistralai/Mistral-Small-3.2-24B-Instruct-2506

**Listed variants:**
- rank 112: Mistral Small 3.2

- Source repository: https://huggingface.co/mistralai/Mistral-Small-3.2-24B-Instruct-2506
- Config source: [`config.json` at revision 95a6d26c4bfb886c58daf9d3f7332c857cb27b43](https://huggingface.co/mistralai/Mistral-Small-3.2-24B-Instruct-2506/resolve/95a6d26c4bfb886c58daf9d3f7332c857cb27b43/config.json)
- Repository revision/commit: `95a6d26c4bfb886c58daf9d3f7332c857cb27b43`
- Total parameter count: 24,011,361,280 (HF API safetensors.parameters: {"BF16":24011361280})
- Architecture: Mistral3ForConditionalGeneration
- Layers (`num_hidden_layers`): Unknown
- Query heads (`num_attention_heads`): Unknown
- KV heads (`num_key_value_heads`): Unknown
- Head dimension (`head_dim`): Unknown
- Hidden size (`hidden_size`): Unknown
- Max context (`max_position_embeddings` or explicit equivalent): Unknown
- Weight format/bits (explicit config): bfloat16
- KV cache bits (explicit only): Unknown
- Confidence: **Medium**
- Unresolved fields/errors: layers; query heads; KV heads; head_dim/hidden_size; max context; KV cache bits not documented
- Citation: HF API/repository/config sources above.

### 89. https://huggingface.co/mistralai/Mistral-Small-4-119B-2603

**Listed variants:**
- rank 69: Mistral Small 4 (Reasoning)
- rank 103: Mistral Small 4 (Non-reasoning)

- Source repository: https://huggingface.co/mistralai/Mistral-Small-4-119B-2603
- Config source: [`config.json` at revision a11f36bebf709121056b1dbcc943d1c6afbe494d](https://huggingface.co/mistralai/Mistral-Small-4-119B-2603/resolve/a11f36bebf709121056b1dbcc943d1c6afbe494d/config.json)
- Repository revision/commit: `a11f36bebf709121056b1dbcc943d1c6afbe494d`
- Total parameter count: 119,401,317,376 (HF API safetensors.parameters: {"BF16":1521452032,"F8_E4M3":117879865344})
- Architecture: Mistral3ForConditionalGeneration
- Layers (`num_hidden_layers`): Unknown
- Query heads (`num_attention_heads`): Unknown
- KV heads (`num_key_value_heads`): Unknown
- Head dimension (`head_dim`): Unknown
- Hidden size (`hidden_size`): Unknown
- Max context (`max_position_embeddings` or explicit equivalent): Unknown
- Weight format/bits (explicit config): bfloat16
- KV cache bits (explicit only): Unknown
- Confidence: **Medium**
- Unresolved fields/errors: layers; query heads; KV heads; head_dim/hidden_size; max context; KV cache bits not documented
- Citation: HF API/repository/config sources above.

### 90. https://huggingface.co/mistralai/Mistral-Small-Instruct-2409

**Listed variants:**
- rank 150: Mistral Small (Sep '24)

- Source repository: https://huggingface.co/mistralai/Mistral-Small-Instruct-2409
- Config source: [`config.json` at revision 4600506f6b13c7ef89e61a54263f4c9bf483de30](https://huggingface.co/mistralai/Mistral-Small-Instruct-2409/resolve/4600506f6b13c7ef89e61a54263f4c9bf483de30/config.json)
- Repository revision/commit: `4600506f6b13c7ef89e61a54263f4c9bf483de30`
- Total parameter count: 22,247,282,688 (HF API safetensors.parameters: {"BF16":22247282688})
- Architecture: MistralForCausalLM
- Layers (`num_hidden_layers`): 56
- Query heads (`num_attention_heads`): 48
- KV heads (`num_key_value_heads`): 8
- Head dimension (`head_dim`): 128
- Hidden size (`hidden_size`): 6144
- Max context (`max_position_embeddings` or explicit equivalent): 32768
- Weight format/bits (explicit config): bfloat16
- KV cache bits (explicit only): Unknown
- Confidence: **Medium**
- Unresolved fields/errors: KV cache bits not documented
- Citation: HF API/repository/config sources above.

### 91. https://huggingface.co/mistralai/Mixtral-8x22B-Instruct-v0.1

**Listed variants:**
- rank 151: Mixtral 8x22B Instruct

- Source repository: https://huggingface.co/mistralai/Mixtral-8x22B-Instruct-v0.1
- Config source: [`config.json` at revision cc88a6cc19fbd17d9f1c0ee0b0d70a748dce698d](https://huggingface.co/mistralai/Mixtral-8x22B-Instruct-v0.1/resolve/cc88a6cc19fbd17d9f1c0ee0b0d70a748dce698d/config.json)
- Repository revision/commit: `cc88a6cc19fbd17d9f1c0ee0b0d70a748dce698d`
- Total parameter count: 140,630,071,296 (HF API safetensors.parameters: {"BF16":140630071296})
- Architecture: MixtralForCausalLM
- Layers (`num_hidden_layers`): 56
- Query heads (`num_attention_heads`): 48
- KV heads (`num_key_value_heads`): 8
- Head dimension (`head_dim`): Unknown
- Hidden size (`hidden_size`): 6144
- Max context (`max_position_embeddings` or explicit equivalent): 65536
- Weight format/bits (explicit config): bfloat16
- KV cache bits (explicit only): Unknown
- Confidence: **Medium**
- Unresolved fields/errors: KV cache bits not documented
- Citation: HF API/repository/config sources above.

### 92. https://huggingface.co/mistralai/Mixtral-8x7B-Instruct-v0.1

**Listed variants:**
- rank 157: Mixtral 8x7B Instruct

- Source repository: https://huggingface.co/mistralai/Mixtral-8x7B-Instruct-v0.1
- Config source: [`config.json` at revision eba92302a2861cdc0098cc54bc9f17cb2c47eb61](https://huggingface.co/mistralai/Mixtral-8x7B-Instruct-v0.1/resolve/eba92302a2861cdc0098cc54bc9f17cb2c47eb61/config.json)
- Repository revision/commit: `eba92302a2861cdc0098cc54bc9f17cb2c47eb61`
- Total parameter count: 46,702,792,704 (HF API safetensors.parameters: {"BF16":46702792704})
- Architecture: MixtralForCausalLM
- Layers (`num_hidden_layers`): 32
- Query heads (`num_attention_heads`): 32
- KV heads (`num_key_value_heads`): 8
- Head dimension (`head_dim`): Unknown
- Hidden size (`hidden_size`): 4096
- Max context (`max_position_embeddings` or explicit equivalent): 32768
- Weight format/bits (explicit config): bfloat16
- KV cache bits (explicit only): Unknown
- Confidence: **Medium**
- Unresolved fields/errors: KV cache bits not documented
- Citation: HF API/repository/config sources above.

### 93. https://huggingface.co/mistralai/Pixtral-Large-Instruct-2411

**Listed variants:**
- rank 133: Pixtral Large

- Source repository: https://huggingface.co/mistralai/Pixtral-Large-Instruct-2411
- Config source: Unknown
- Repository revision/commit: `c1e51f6f11974a1199685d35c62f5a425c2d001e`
- Total parameter count: Unknown
- Architecture: Unknown
- Layers (`num_hidden_layers`): Unknown
- Query heads (`num_attention_heads`): Unknown
- KV heads (`num_key_value_heads`): Unknown
- Head dimension (`head_dim`): Unknown
- Hidden size (`hidden_size`): Unknown
- Max context (`max_position_embeddings` or explicit equivalent): Unknown
- Weight format/bits (explicit config): Unknown
- KV cache bits (explicit only): Unknown
- Confidence: **Low**
- Unresolved fields/errors: layers; query heads; KV heads; head_dim/hidden_size; max context; weight format/bits; KV cache bits not documented; config HTTP None at c1e51f6f11974a1199685d35c62f5a425c2d001e; config HTTP None at main
- Citation: Supplied source URL and error state above; no usable config was available.

### 94. https://huggingface.co/moonshotai/Kimi-K2-Instruct

**Listed variants:**
- rank 70: Kimi K2

- Source repository: https://huggingface.co/moonshotai/Kimi-K2-Instruct
- Config source: [`config.json` at revision fd1984e2b7a3350dbf7305fe73a4ede25c14de50](https://huggingface.co/moonshotai/Kimi-K2-Instruct/resolve/fd1984e2b7a3350dbf7305fe73a4ede25c14de50/config.json)
- Repository revision/commit: `fd1984e2b7a3350dbf7305fe73a4ede25c14de50`
- Total parameter count: 1,026,408,235,864 (HF API safetensors.parameters: {"F32":23040,"BF16":2514970968,"F8_E4M3":1023893241856})
- Architecture: DeepseekV3ForCausalLM
- Layers (`num_hidden_layers`): 61
- Query heads (`num_attention_heads`): 64
- KV heads (`num_key_value_heads`): 64
- Head dimension (`head_dim`): Unknown
- Hidden size (`hidden_size`): 7168
- Max context (`max_position_embeddings` or explicit equivalent): 131072
- Weight format/bits (explicit config): bfloat16
- KV cache bits (explicit only): Unknown
- Confidence: **Medium**
- Unresolved fields/errors: KV cache bits not documented
- Citation: HF API/repository/config sources above.

### 95. https://huggingface.co/moonshotai/Kimi-K2-Instruct-0905

**Listed variants:**
- rank 53: Kimi K2 0905

- Source repository: https://huggingface.co/moonshotai/Kimi-K2-Instruct-0905
- Config source: [`config.json` at revision ac6c49f04883bd0a0598b790693a72061c676629](https://huggingface.co/moonshotai/Kimi-K2-Instruct-0905/resolve/ac6c49f04883bd0a0598b790693a72061c676629/config.json)
- Repository revision/commit: `ac6c49f04883bd0a0598b790693a72061c676629`
- Total parameter count: 1,026,470,735,448 (HF API safetensors.parameters: {"F32":62518232,"BF16":2514975360,"F8_E4M3":1023893241856})
- Architecture: DeepseekV3ForCausalLM
- Layers (`num_hidden_layers`): 61
- Query heads (`num_attention_heads`): 64
- KV heads (`num_key_value_heads`): 64
- Head dimension (`head_dim`): Unknown
- Hidden size (`hidden_size`): 7168
- Max context (`max_position_embeddings` or explicit equivalent): 262144
- Weight format/bits (explicit config): bfloat16
- KV cache bits (explicit only): Unknown
- Confidence: **Medium**
- Unresolved fields/errors: KV cache bits not documented
- Citation: HF API/repository/config sources above.

### 96. https://huggingface.co/moonshotai/Kimi-K2-Thinking

**Listed variants:**
- rank 26: Kimi K2 Thinking

- Source repository: https://huggingface.co/moonshotai/Kimi-K2-Thinking
- Config source: [`config.json` at revision a51ccc050d73dab088bf7b0e2dd9b30ae85a4e55](https://huggingface.co/moonshotai/Kimi-K2-Thinking/resolve/a51ccc050d73dab088bf7b0e2dd9b30ae85a4e55/config.json)
- Repository revision/commit: `a51ccc050d73dab088bf7b0e2dd9b30ae85a4e55`
- Total parameter count: 1,026,408,240,256 (HF API safetensors.parameters: {"F32":23040,"I32":1014686023680,"BF16":11722193536})
- Architecture: DeepseekV3ForCausalLM
- Layers (`num_hidden_layers`): 61
- Query heads (`num_attention_heads`): 64
- KV heads (`num_key_value_heads`): 64
- Head dimension (`head_dim`): Unknown
- Hidden size (`hidden_size`): 7168
- Max context (`max_position_embeddings` or explicit equivalent): 262144
- Weight format/bits (explicit config): bfloat16
- KV cache bits (explicit only): Unknown
- Confidence: **Medium**
- Unresolved fields/errors: KV cache bits not documented
- Citation: HF API/repository/config sources above.

### 97. https://huggingface.co/moonshotai/Kimi-K2.5

**Listed variants:**
- rank 20: Kimi K2.5 (Reasoning)
- rank 37: Kimi K2.5 (Non-reasoning)

- Source repository: https://huggingface.co/moonshotai/Kimi-K2.5
- Config source: [`config.json` at revision 4d01dfe0332d63057c186e0b262165819efb6611](https://huggingface.co/moonshotai/Kimi-K2.5/resolve/4d01dfe0332d63057c186e0b262165819efb6611/config.json)
- Repository revision/commit: `4d01dfe0332d63057c186e0b262165819efb6611`
- Total parameter count: 1,026,879,376,368 (HF API safetensors.parameters: {"F32":23040,"I32":1014686023680,"BF16":12193329648})
- Architecture: KimiK25ForConditionalGeneration
- Layers (`num_hidden_layers`): Unknown
- Query heads (`num_attention_heads`): Unknown
- KV heads (`num_key_value_heads`): Unknown
- Head dimension (`head_dim`): Unknown
- Hidden size (`hidden_size`): Unknown
- Max context (`max_position_embeddings` or explicit equivalent): Unknown
- Weight format/bits (explicit config): bfloat16
- KV cache bits (explicit only): Unknown
- Confidence: **Medium**
- Unresolved fields/errors: layers; query heads; KV heads; head_dim/hidden_size; max context; KV cache bits not documented
- Citation: HF API/repository/config sources above.

### 98. https://huggingface.co/moonshotai/Kimi-K2.6

**Listed variants:**
- rank 9: Kimi K2.6
- rank 21: Kimi K2.6 (Non-reasoning)

- Source repository: https://huggingface.co/moonshotai/Kimi-K2.6
- Config source: [`config.json` at revision 7eb5002f6aadc958aed6a9177b7ed26bb94011bb](https://huggingface.co/moonshotai/Kimi-K2.6/resolve/7eb5002f6aadc958aed6a9177b7ed26bb94011bb/config.json)
- Repository revision/commit: `7eb5002f6aadc958aed6a9177b7ed26bb94011bb`
- Total parameter count: 1,026,879,376,368 (HF API safetensors.parameters: {"F32":23040,"I32":1014686023680,"BF16":12193329648})
- Architecture: KimiK25ForConditionalGeneration
- Layers (`num_hidden_layers`): Unknown
- Query heads (`num_attention_heads`): Unknown
- KV heads (`num_key_value_heads`): Unknown
- Head dimension (`head_dim`): Unknown
- Hidden size (`hidden_size`): Unknown
- Max context (`max_position_embeddings` or explicit equivalent): Unknown
- Weight format/bits (explicit config): bfloat16
- KV cache bits (explicit only): Unknown
- Confidence: **Medium**
- Unresolved fields/errors: layers; query heads; KV heads; head_dim/hidden_size; max context; KV cache bits not documented
- Citation: HF API/repository/config sources above.

### 99. https://huggingface.co/moonshotai/Kimi-K2.7-Code

**Listed variants:**
- rank 11: Kimi K2.7 Code

- Source repository: https://huggingface.co/moonshotai/Kimi-K2.7-Code
- Config source: [`config.json` at revision 74797c9c62378b951a1f6fcf5c4631024e9b8bef](https://huggingface.co/moonshotai/Kimi-K2.7-Code/resolve/74797c9c62378b951a1f6fcf5c4631024e9b8bef/config.json)
- Repository revision/commit: `74797c9c62378b951a1f6fcf5c4631024e9b8bef`
- Total parameter count: 1,026,879,376,368 (HF API safetensors.parameters: {"BF16":12193329648,"F32":23040,"I32":1014686023680})
- Architecture: KimiK25ForConditionalGeneration
- Layers (`num_hidden_layers`): Unknown
- Query heads (`num_attention_heads`): Unknown
- KV heads (`num_key_value_heads`): Unknown
- Head dimension (`head_dim`): Unknown
- Hidden size (`hidden_size`): Unknown
- Max context (`max_position_embeddings` or explicit equivalent): Unknown
- Weight format/bits (explicit config): bfloat16
- KV cache bits (explicit only): Unknown
- Confidence: **Medium**
- Unresolved fields/errors: layers; query heads; KV heads; head_dim/hidden_size; max context; KV cache bits not documented
- Citation: HF API/repository/config sources above.

### 100. https://huggingface.co/moonshotai/Kimi-K3

**Listed variants:**
- rank 1: Kimi K3 (max)
- rank 7: Kimi K3 (low)

- Source repository: https://huggingface.co/moonshotai/Kimi-K3
- Config source: [`config.json` at revision f831ab66814297da540d832a5235f8e904f29d06](https://huggingface.co/moonshotai/Kimi-K3/resolve/f831ab66814297da540d832a5235f8e904f29d06/config.json)
- Repository revision/commit: `f831ab66814297da540d832a5235f8e904f29d06`
- Total parameter count: 2,779,931,837,184 (HF API safetensors.parameters: {"F32":11122432,"BF16":57179884544,"U8":2722740830208})
- Architecture: KimiK3ForConditionalGeneration
- Layers (`num_hidden_layers`): Unknown
- Query heads (`num_attention_heads`): Unknown
- KV heads (`num_key_value_heads`): Unknown
- Head dimension (`head_dim`): Unknown
- Hidden size (`hidden_size`): Unknown
- Max context (`max_position_embeddings` or explicit equivalent): Unknown
- Weight format/bits (explicit config): bfloat16
- KV cache bits (explicit only): Unknown
- Confidence: **Medium**
- Unresolved fields/errors: layers; query heads; KV heads; head_dim/hidden_size; max context; KV cache bits not documented
- Citation: HF API/repository/config sources above.

### 101. https://huggingface.co/moonshotai/Kimi-Linear-48B-A3B-Instruct

**Listed variants:**
- rank 129: Kimi Linear 48B A3B Instruct

- Source repository: https://huggingface.co/moonshotai/Kimi-Linear-48B-A3B-Instruct
- Config source: [`config.json` at revision e1df551a447157d4658b573f9a695d57658590e9](https://huggingface.co/moonshotai/Kimi-Linear-48B-A3B-Instruct/resolve/e1df551a447157d4658b573f9a695d57658590e9/config.json)
- Repository revision/commit: `e1df551a447157d4658b573f9a695d57658590e9`
- Total parameter count: 49,122,681,728 (HF API safetensors.parameters: {"BF16":49122599168,"F32":82560})
- Architecture: KimiLinearForCausalLM
- Layers (`num_hidden_layers`): 27
- Query heads (`num_attention_heads`): 32
- KV heads (`num_key_value_heads`): 32
- Head dimension (`head_dim`): 72
- Hidden size (`hidden_size`): 2304
- Max context (`max_position_embeddings` or explicit equivalent): 1048576
- Weight format/bits (explicit config): bfloat16
- KV cache bits (explicit only): Unknown
- Confidence: **Medium**
- Unresolved fields/errors: KV cache bits not documented
- Citation: HF API/repository/config sources above.

### 102. https://huggingface.co/nvidia/Llama-3.1-Nemotron-70B-Instruct-HF

**Listed variants:**
- rank 134: Llama 3.1 Nemotron Instruct 70B

- Source repository: https://huggingface.co/nvidia/Llama-3.1-Nemotron-70B-Instruct-HF
- Config source: [`config.json` at revision 031d4042f36adc1a52cca51b331d25cbe3cf1022](https://huggingface.co/nvidia/Llama-3.1-Nemotron-70B-Instruct-HF/resolve/031d4042f36adc1a52cca51b331d25cbe3cf1022/config.json)
- Repository revision/commit: `031d4042f36adc1a52cca51b331d25cbe3cf1022`
- Total parameter count: 70,553,706,496 (HF API safetensors.parameters: {"BF16":70553706496})
- Architecture: LlamaForCausalLM
- Layers (`num_hidden_layers`): 80
- Query heads (`num_attention_heads`): 64
- KV heads (`num_key_value_heads`): 8
- Head dimension (`head_dim`): 128
- Hidden size (`hidden_size`): 8192
- Max context (`max_position_embeddings` or explicit equivalent): 131072
- Weight format/bits (explicit config): bfloat16
- KV cache bits (explicit only): Unknown
- Confidence: **Medium**
- Unresolved fields/errors: KV cache bits not documented
- Citation: HF API/repository/config sources above.

### 103. https://huggingface.co/nvidia/Llama-3_1-Nemotron-Ultra-253B-v1

**Listed variants:**
- rank 125: Llama 3.1 Nemotron Ultra 253B v1 (Reasoning)

- Source repository: https://huggingface.co/nvidia/Llama-3_1-Nemotron-Ultra-253B-v1
- Config source: [`config.json` at revision 5b47def5b8957142d82faeb44bfad9349d02840d](https://huggingface.co/nvidia/Llama-3_1-Nemotron-Ultra-253B-v1/resolve/5b47def5b8957142d82faeb44bfad9349d02840d/config.json)
- Repository revision/commit: `5b47def5b8957142d82faeb44bfad9349d02840d`
- Total parameter count: 253,401,268,224 (HF API safetensors.parameters: {"BF16":253401268224})
- Architecture: DeciLMForCausalLM
- Layers (`num_hidden_layers`): 162
- Query heads (`num_attention_heads`): 128
- KV heads (`num_key_value_heads`): Unknown
- Head dimension (`head_dim`): Unknown
- Hidden size (`hidden_size`): 16384
- Max context (`max_position_embeddings` or explicit equivalent): 131072
- Weight format/bits (explicit config): bfloat16
- KV cache bits (explicit only): Unknown
- Confidence: **Medium**
- Unresolved fields/errors: KV heads; KV cache bits not documented
- Citation: HF API/repository/config sources above.

### 104. https://huggingface.co/nvidia/Llama-3_3-Nemotron-Super-49B-v1

**Listed variants:**
- rank 104: Llama 3.3 Nemotron Super 49B v1 (Reasoning)
- rank 131: Llama 3.3 Nemotron Super 49B v1 (Non-reasoning)

- Source repository: https://huggingface.co/nvidia/Llama-3_3-Nemotron-Super-49B-v1
- Config source: [`config.json` at revision 387156d8d6868c19f3472fa607aa9bfc4f662333](https://huggingface.co/nvidia/Llama-3_3-Nemotron-Super-49B-v1/resolve/387156d8d6868c19f3472fa607aa9bfc4f662333/config.json)
- Repository revision/commit: `387156d8d6868c19f3472fa607aa9bfc4f662333`
- Total parameter count: 49,867,145,216 (HF API safetensors.parameters: {"BF16":49867145216})
- Architecture: DeciLMForCausalLM
- Layers (`num_hidden_layers`): 80
- Query heads (`num_attention_heads`): 64
- KV heads (`num_key_value_heads`): Unknown
- Head dimension (`head_dim`): Unknown
- Hidden size (`hidden_size`): 8192
- Max context (`max_position_embeddings` or explicit equivalent): 131072
- Weight format/bits (explicit config): bfloat16
- KV cache bits (explicit only): Unknown
- Confidence: **Medium**
- Unresolved fields/errors: KV heads; KV cache bits not documented
- Citation: HF API/repository/config sources above.

### 105. https://huggingface.co/nvidia/Llama-3_3-Nemotron-Super-49B-v1_5

**Listed variants:**
- rank 102: Llama Nemotron Super 49B v1.5 (Reasoning)
- rank 127: Llama Nemotron Super 49B v1.5 (Non-reasoning)

- Source repository: https://huggingface.co/nvidia/Llama-3_3-Nemotron-Super-49B-v1_5
- Config source: [`config.json` at revision 420ba7d28211abf116b8b103ab700d92619daf98](https://huggingface.co/nvidia/Llama-3_3-Nemotron-Super-49B-v1_5/resolve/420ba7d28211abf116b8b103ab700d92619daf98/config.json)
- Repository revision/commit: `420ba7d28211abf116b8b103ab700d92619daf98`
- Total parameter count: 49,867,145,216 (HF API safetensors.parameters: {"BF16":49867145216})
- Architecture: DeciLMForCausalLM
- Layers (`num_hidden_layers`): 80
- Query heads (`num_attention_heads`): 64
- KV heads (`num_key_value_heads`): Unknown
- Head dimension (`head_dim`): Unknown
- Hidden size (`hidden_size`): 8192
- Max context (`max_position_embeddings` or explicit equivalent): 131072
- Weight format/bits (explicit config): bfloat16
- KV cache bits (explicit only): Unknown
- Confidence: **Medium**
- Unresolved fields/errors: KV heads; KV cache bits not documented
- Citation: HF API/repository/config sources above.

### 106. https://huggingface.co/nvidia/NVIDIA-Nemotron-3-Nano-30B-A3B-BF16

**Listed variants:**
- rank 90: NVIDIA Nemotron 3 Nano 30B A3B (Reasoning)
- rank 137: NVIDIA Nemotron 3 Nano 30B A3B (Non-reasoning)

- Source repository: https://huggingface.co/nvidia/NVIDIA-Nemotron-3-Nano-30B-A3B-BF16
- Config source: [`config.json` at revision bf77c3174f68ad409e1c2aa60daeb46e32d1c606](https://huggingface.co/nvidia/NVIDIA-Nemotron-3-Nano-30B-A3B-BF16/resolve/bf77c3174f68ad409e1c2aa60daeb46e32d1c606/config.json)
- Repository revision/commit: `bf77c3174f68ad409e1c2aa60daeb46e32d1c606`
- Total parameter count: 31,577,940,288 (HF API safetensors.parameters: {"F32":5888,"BF16":31577934400})
- Architecture: NemotronHForCausalLM
- Layers (`num_hidden_layers`): 52
- Query heads (`num_attention_heads`): 32
- KV heads (`num_key_value_heads`): 2
- Head dimension (`head_dim`): 128
- Hidden size (`hidden_size`): 2688
- Max context (`max_position_embeddings` or explicit equivalent): 262144
- Weight format/bits (explicit config): bfloat16
- KV cache bits (explicit only): Unknown
- Confidence: **Medium**
- Unresolved fields/errors: KV cache bits not documented
- Citation: HF API/repository/config sources above.

### 107. https://huggingface.co/nvidia/NVIDIA-Nemotron-3-Super-120B-A12B-BF16

**Listed variants:**
- rank 48: Nemotron 3 Super 120B A12B (Reasoning)

- Source repository: https://huggingface.co/nvidia/NVIDIA-Nemotron-3-Super-120B-A12B-BF16
- Config source: [`config.json` at revision 2dc98e2afe4face0e4ce40972a915c45368bd34a](https://huggingface.co/nvidia/NVIDIA-Nemotron-3-Super-120B-A12B-BF16/resolve/2dc98e2afe4face0e4ce40972a915c45368bd34a/config.json)
- Repository revision/commit: `2dc98e2afe4face0e4ce40972a915c45368bd34a`
- Total parameter count: 123,611,033,088 (HF API safetensors.parameters: {"F32":20992,"BF16":123611012096})
- Architecture: NemotronHForCausalLM
- Layers (`num_hidden_layers`): 88
- Query heads (`num_attention_heads`): 32
- KV heads (`num_key_value_heads`): 2
- Head dimension (`head_dim`): 128
- Hidden size (`hidden_size`): 4096
- Max context (`max_position_embeddings` or explicit equivalent): 262144
- Weight format/bits (explicit config): bfloat16
- KV cache bits (explicit only): Unknown
- Confidence: **Medium**
- Unresolved fields/errors: KV cache bits not documented
- Citation: HF API/repository/config sources above.

### 108. https://huggingface.co/nvidia/NVIDIA-Nemotron-3-Ultra-550B-A55B-BF16

**Listed variants:**
- rank 16: Nemotron 3 Ultra 550B A55B (Reasoning)

- Source repository: https://huggingface.co/nvidia/NVIDIA-Nemotron-3-Ultra-550B-A55B-BF16
- Config source: [`config.json` at revision 77df655d5e9f8362164ed14dd8b48f8bce657498](https://huggingface.co/nvidia/NVIDIA-Nemotron-3-Ultra-550B-A55B-BF16/resolve/77df655d5e9f8362164ed14dd8b48f8bce657498/config.json)
- Repository revision/commit: `77df655d5e9f8362164ed14dd8b48f8bce657498`
- Total parameter count: 560,524,603,904 (HF API safetensors.parameters: {"BF16":560524578816,"F32":25088})
- Architecture: NemotronHForCausalLM
- Layers (`num_hidden_layers`): Unknown
- Query heads (`num_attention_heads`): 64
- KV heads (`num_key_value_heads`): 2
- Head dimension (`head_dim`): 128
- Hidden size (`hidden_size`): 8192
- Max context (`max_position_embeddings` or explicit equivalent): 262144
- Weight format/bits (explicit config): bfloat16
- KV cache bits (explicit only): Unknown
- Confidence: **Medium**
- Unresolved fields/errors: layers; KV cache bits not documented
- Citation: HF API/repository/config sources above.

### 109. https://huggingface.co/nvidia/Nemotron-3-Nano-Omni-30B-A3B-Reasoning-BF16

**Listed variants:**
- rank 86: Nemotron 3 Nano Omni 30B A3B Reasoning

- Source repository: https://huggingface.co/nvidia/Nemotron-3-Nano-Omni-30B-A3B-Reasoning-BF16
- Config source: [`config.json` at revision e5e9932441de940c9a62185c870ea5bcd4cd24e2](https://huggingface.co/nvidia/Nemotron-3-Nano-Omni-30B-A3B-Reasoning-BF16/resolve/e5e9932441de940c9a62185c870ea5bcd4cd24e2/config.json)
- Repository revision/commit: `e5e9932441de940c9a62185c870ea5bcd4cd24e2`
- Total parameter count: 33,015,632,214 (HF API safetensors.parameters: {"F32":2950,"BF16":33015629264})
- Architecture: NemotronH_Nano_Omni_Reasoning_V3
- Layers (`num_hidden_layers`): Unknown
- Query heads (`num_attention_heads`): Unknown
- KV heads (`num_key_value_heads`): Unknown
- Head dimension (`head_dim`): Unknown
- Hidden size (`hidden_size`): Unknown
- Max context (`max_position_embeddings` or explicit equivalent): 131072
- Weight format/bits (explicit config): bfloat16
- KV cache bits (explicit only): Unknown
- Confidence: **Medium**
- Unresolved fields/errors: layers; query heads; KV heads; head_dim/hidden_size; KV cache bits not documented
- Citation: HF API/repository/config sources above.

### 110. https://huggingface.co/nvidia/Nemotron-Cascade-2-30B-A3B

**Listed variants:**
- rank 76: Nemotron Cascade 2 30B A3B

- Source repository: https://huggingface.co/nvidia/Nemotron-Cascade-2-30B-A3B
- Config source: [`config.json` at revision 6327cdbcf907e1c7cec9cb29fb6e6cebdf8feaf7](https://huggingface.co/nvidia/Nemotron-Cascade-2-30B-A3B/resolve/6327cdbcf907e1c7cec9cb29fb6e6cebdf8feaf7/config.json)
- Repository revision/commit: `6327cdbcf907e1c7cec9cb29fb6e6cebdf8feaf7`
- Total parameter count: 31,577,940,288 (HF API safetensors.parameters: {"F32":2944,"BF16":31577937344})
- Architecture: NemotronHForCausalLM
- Layers (`num_hidden_layers`): 52
- Query heads (`num_attention_heads`): 32
- KV heads (`num_key_value_heads`): 2
- Head dimension (`head_dim`): 128
- Hidden size (`hidden_size`): 2688
- Max context (`max_position_embeddings` or explicit equivalent): 262144
- Weight format/bits (explicit config): bfloat16
- KV cache bits (explicit only): Unknown
- Confidence: **Medium**
- Unresolved fields/errors: KV cache bits not documented
- Citation: HF API/repository/config sources above.

### 111. https://huggingface.co/openai/gpt-oss-120b

**Listed variants:**
- rank 52: gpt-oss-120b (high)
- rank 87: gpt-oss-120b (low)

- Source repository: https://huggingface.co/openai/gpt-oss-120b
- Config source: [`config.json` at revision b5c939de8f754692c1647ca79fbf85e8c1e70f8a](https://huggingface.co/openai/gpt-oss-120b/resolve/b5c939de8f754692c1647ca79fbf85e8c1e70f8a/config.json)
- Repository revision/commit: `b5c939de8f754692c1647ca79fbf85e8c1e70f8a`
- Total parameter count: 116,829,156,672 (HF API safetensors.parameters: {"BF16":2167371072,"U8":114661785600})
- Architecture: GptOssForCausalLM
- Layers (`num_hidden_layers`): 36
- Query heads (`num_attention_heads`): 64
- KV heads (`num_key_value_heads`): 8
- Head dimension (`head_dim`): 64
- Hidden size (`hidden_size`): 2880
- Max context (`max_position_embeddings` or explicit equivalent): 131072
- Weight format/bits (explicit config): Unknown
- KV cache bits (explicit only): Unknown
- Confidence: **Medium**
- Unresolved fields/errors: weight format/bits; KV cache bits not documented
- Citation: HF API/repository/config sources above.

### 112. https://huggingface.co/openai/gpt-oss-20b

**Listed variants:**
- rank 85: gpt-oss-20b (high)
- rank 92: gpt-oss-20b (low)

- Source repository: https://huggingface.co/openai/gpt-oss-20b
- Config source: [`config.json` at revision 6cee5e81ee83917806bbde320786a8fb61efebee](https://huggingface.co/openai/gpt-oss-20b/resolve/6cee5e81ee83917806bbde320786a8fb61efebee/config.json)
- Repository revision/commit: `6cee5e81ee83917806bbde320786a8fb61efebee`
- Total parameter count: 20,914,757,184 (HF API safetensors.parameters: {"BF16":1804459584,"U8":19110297600})
- Architecture: GptOssForCausalLM
- Layers (`num_hidden_layers`): 24
- Query heads (`num_attention_heads`): 64
- KV heads (`num_key_value_heads`): 8
- Head dimension (`head_dim`): 64
- Hidden size (`hidden_size`): 2880
- Max context (`max_position_embeddings` or explicit equivalent): 131072
- Weight format/bits (explicit config): Unknown
- KV cache bits (explicit only): Unknown
- Confidence: **Medium**
- Unresolved fields/errors: weight format/bits; KV cache bits not documented
- Citation: HF API/repository/config sources above.

### 113. https://huggingface.co/zai-org/GLM-4.5

**Listed variants:**
- rank 68: GLM-4.5 (Reasoning)

- Source repository: https://huggingface.co/zai-org/GLM-4.5
- Config source: [`config.json` at revision cbb2c7cfb52fa128a9660cb1a7a78e017899e115](https://huggingface.co/zai-org/GLM-4.5/resolve/cbb2c7cfb52fa128a9660cb1a7a78e017899e115/config.json)
- Repository revision/commit: `cbb2c7cfb52fa128a9660cb1a7a78e017899e115`
- Total parameter count: 358,337,791,296 (HF API safetensors.parameters: {"BF16":358337776896,"F32":14400})
- Architecture: Glm4MoeForCausalLM
- Layers (`num_hidden_layers`): 92
- Query heads (`num_attention_heads`): 96
- KV heads (`num_key_value_heads`): 8
- Head dimension (`head_dim`): 128
- Hidden size (`hidden_size`): 5120
- Max context (`max_position_embeddings` or explicit equivalent): 131072
- Weight format/bits (explicit config): bfloat16
- KV cache bits (explicit only): Unknown
- Confidence: **Medium**
- Unresolved fields/errors: KV cache bits not documented
- Citation: HF API/repository/config sources above.

### 114. https://huggingface.co/zai-org/GLM-4.5-Air

**Listed variants:**
- rank 80: GLM-4.5-Air

- Source repository: https://huggingface.co/zai-org/GLM-4.5-Air
- Config source: [`config.json` at revision a24ceef6ce4f3536971efe9b778bdaa1bab18daa](https://huggingface.co/zai-org/GLM-4.5-Air/resolve/a24ceef6ce4f3536971efe9b778bdaa1bab18daa/config.json)
- Repository revision/commit: `a24ceef6ce4f3536971efe9b778bdaa1bab18daa`
- Total parameter count: 110,468,824,832 (HF API safetensors.parameters: {"BF16":110468818944,"F32":5888})
- Architecture: Glm4MoeForCausalLM
- Layers (`num_hidden_layers`): 46
- Query heads (`num_attention_heads`): 96
- KV heads (`num_key_value_heads`): 8
- Head dimension (`head_dim`): 128
- Hidden size (`hidden_size`): 4096
- Max context (`max_position_embeddings` or explicit equivalent): 131072
- Weight format/bits (explicit config): bfloat16
- KV cache bits (explicit only): Unknown
- Confidence: **Medium**
- Unresolved fields/errors: KV cache bits not documented
- Citation: HF API/repository/config sources above.

### 115. https://huggingface.co/zai-org/GLM-4.5V

**Listed variants:**
- rank 123: GLM-4.5V (Reasoning)
- rank 140: GLM-4.5V (Non-reasoning)

- Source repository: https://huggingface.co/zai-org/GLM-4.5V
- Config source: [`config.json` at revision ed47433b37111465ec527affaaddceff371bca04](https://huggingface.co/zai-org/GLM-4.5V/resolve/ed47433b37111465ec527affaaddceff371bca04/config.json)
- Repository revision/commit: `ed47433b37111465ec527affaaddceff371bca04`
- Total parameter count: 107,710,933,120 (HF API safetensors.parameters: {"F32":5760,"BF16":107710927360})
- Architecture: Glm4vMoeForConditionalGeneration
- Layers (`num_hidden_layers`): Unknown
- Query heads (`num_attention_heads`): Unknown
- KV heads (`num_key_value_heads`): Unknown
- Head dimension (`head_dim`): Unknown
- Hidden size (`hidden_size`): Unknown
- Max context (`max_position_embeddings` or explicit equivalent): Unknown
- Weight format/bits (explicit config): Unknown
- KV cache bits (explicit only): Unknown
- Confidence: **Medium**
- Unresolved fields/errors: layers; query heads; KV heads; head_dim/hidden_size; max context; weight format/bits; KV cache bits not documented
- Citation: HF API/repository/config sources above.

### 116. https://huggingface.co/zai-org/GLM-4.6V

**Listed variants:**
- rank 78: GLM-4.6V (Reasoning)
- rank 110: GLM-4.6V (Non-reasoning)

- Source repository: https://huggingface.co/zai-org/GLM-4.6V
- Config source: [`config.json` at revision 4e2d47eb0b41c5280d8294b17cef9e94fdcfff46](https://huggingface.co/zai-org/GLM-4.6V/resolve/4e2d47eb0b41c5280d8294b17cef9e94fdcfff46/config.json)
- Repository revision/commit: `4e2d47eb0b41c5280d8294b17cef9e94fdcfff46`
- Total parameter count: 107,710,933,120 (HF API safetensors.parameters: {"BF16":107710927360,"F32":5760})
- Architecture: Glm4vMoeForConditionalGeneration
- Layers (`num_hidden_layers`): Unknown
- Query heads (`num_attention_heads`): Unknown
- KV heads (`num_key_value_heads`): Unknown
- Head dimension (`head_dim`): Unknown
- Hidden size (`hidden_size`): Unknown
- Max context (`max_position_embeddings` or explicit equivalent): Unknown
- Weight format/bits (explicit config): Unknown
- KV cache bits (explicit only): Unknown
- Confidence: **Medium**
- Unresolved fields/errors: layers; query heads; KV heads; head_dim/hidden_size; max context; weight format/bits; KV cache bits not documented
- Citation: HF API/repository/config sources above.

### 117. https://huggingface.co/zai-org/GLM-4.7

**Listed variants:**
- rank 24: GLM-4.7 (Reasoning)
- rank 44: GLM-4.7 (Non-reasoning)

- Source repository: https://huggingface.co/zai-org/GLM-4.7
- Config source: [`config.json` at revision 602d01efcdd332c5238ca4bcede555defbe83eb7](https://huggingface.co/zai-org/GLM-4.7/resolve/602d01efcdd332c5238ca4bcede555defbe83eb7/config.json)
- Repository revision/commit: `602d01efcdd332c5238ca4bcede555defbe83eb7`
- Total parameter count: 358,337,791,296 (HF API safetensors.parameters: {"BF16":358337776896,"F32":14400})
- Architecture: Glm4MoeForCausalLM
- Layers (`num_hidden_layers`): 92
- Query heads (`num_attention_heads`): 96
- KV heads (`num_key_value_heads`): 8
- Head dimension (`head_dim`): 128
- Hidden size (`hidden_size`): 5120
- Max context (`max_position_embeddings` or explicit equivalent): 202752
- Weight format/bits (explicit config): bfloat16
- KV cache bits (explicit only): Unknown
- Confidence: **Medium**
- Unresolved fields/errors: KV cache bits not documented
- Citation: HF API/repository/config sources above.

### 118. https://huggingface.co/zai-org/GLM-4.7-Flash

**Listed variants:**
- rank 56: GLM-4.7-Flash (Reasoning)
- rank 83: GLM-4.7-Flash (Non-reasoning)

- Source repository: https://huggingface.co/zai-org/GLM-4.7-Flash
- Config source: [`config.json` at revision 7dd20894a642a0aa287e9827cb1a1f7f91386b67](https://huggingface.co/zai-org/GLM-4.7-Flash/resolve/7dd20894a642a0aa287e9827cb1a1f7f91386b67/config.json)
- Repository revision/commit: `7dd20894a642a0aa287e9827cb1a1f7f91386b67`
- Total parameter count: 31,221,488,576 (HF API safetensors.parameters: {"BF16":31221485568,"F32":3008})
- Architecture: Glm4MoeLiteForCausalLM
- Layers (`num_hidden_layers`): 47
- Query heads (`num_attention_heads`): 20
- KV heads (`num_key_value_heads`): 20
- Head dimension (`head_dim`): Unknown
- Hidden size (`hidden_size`): 2048
- Max context (`max_position_embeddings` or explicit equivalent): 202752
- Weight format/bits (explicit config): bfloat16
- KV cache bits (explicit only): Unknown
- Confidence: **Medium**
- Unresolved fields/errors: KV cache bits not documented
- Citation: HF API/repository/config sources above.

### 119. https://huggingface.co/zai-org/GLM-5

**Listed variants:**
- rank 14: GLM-5 (Reasoning)
- rank 27: GLM-5 (Non-reasoning)

- Source repository: https://huggingface.co/zai-org/GLM-5
- Config source: [`config.json` at revision c183ef8c61faee82855eca1ed9bb3a9a7ce3b0b2](https://huggingface.co/zai-org/GLM-5/resolve/c183ef8c61faee82855eca1ed9bb3a9a7ce3b0b2/config.json)
- Repository revision/commit: `c183ef8c61faee82855eca1ed9bb3a9a7ce3b0b2`
- Total parameter count: 753,864,139,008 (HF API safetensors.parameters: {"BF16":753864119552,"F32":19456})
- Architecture: GlmMoeDsaForCausalLM
- Layers (`num_hidden_layers`): 78
- Query heads (`num_attention_heads`): 64
- KV heads (`num_key_value_heads`): 64
- Head dimension (`head_dim`): 64
- Hidden size (`hidden_size`): 6144
- Max context (`max_position_embeddings` or explicit equivalent): 202752
- Weight format/bits (explicit config): bfloat16
- KV cache bits (explicit only): Unknown
- Confidence: **Medium**
- Unresolved fields/errors: KV cache bits not documented
- Citation: HF API/repository/config sources above.

### 120. https://huggingface.co/zai-org/GLM-5.1

**Listed variants:**
- rank 13: GLM-5.1 (Reasoning)
- rank 19: GLM-5.1 (Non-reasoning)

- Source repository: https://huggingface.co/zai-org/GLM-5.1
- Config source: [`config.json` at revision 26e1bd6e011feb778d25ae34b09b07074139d92d](https://huggingface.co/zai-org/GLM-5.1/resolve/26e1bd6e011feb778d25ae34b09b07074139d92d/config.json)
- Repository revision/commit: `26e1bd6e011feb778d25ae34b09b07074139d92d`
- Total parameter count: 753,864,139,008 (HF API safetensors.parameters: {"BF16":753864119552,"F32":19456})
- Architecture: GlmMoeDsaForCausalLM
- Layers (`num_hidden_layers`): 78
- Query heads (`num_attention_heads`): 64
- KV heads (`num_key_value_heads`): 64
- Head dimension (`head_dim`): 64
- Hidden size (`hidden_size`): 6144
- Max context (`max_position_embeddings` or explicit equivalent): 202752
- Weight format/bits (explicit config): bfloat16
- KV cache bits (explicit only): Unknown
- Confidence: **Medium**
- Unresolved fields/errors: KV cache bits not documented
- Citation: HF API/repository/config sources above.

### 121. https://huggingface.co/zai-org/GLM-5.2

**Listed variants:**
- rank 4: GLM-5.2 (max)
- rank 22: GLM-5.2 (Non-reasoning)

- Source repository: https://huggingface.co/zai-org/GLM-5.2
- Config source: [`config.json` at revision cf457fa734ab149ffef225f80893eb38c6ff5cdc](https://huggingface.co/zai-org/GLM-5.2/resolve/cf457fa734ab149ffef225f80893eb38c6ff5cdc/config.json)
- Repository revision/commit: `cf457fa734ab149ffef225f80893eb38c6ff5cdc`
- Total parameter count: 753,329,940,480 (HF API safetensors.parameters: {"BF16":753329921024,"F32":19456})
- Architecture: GlmMoeDsaForCausalLM
- Layers (`num_hidden_layers`): 78
- Query heads (`num_attention_heads`): 64
- KV heads (`num_key_value_heads`): 64
- Head dimension (`head_dim`): 192
- Hidden size (`hidden_size`): 6144
- Max context (`max_position_embeddings` or explicit equivalent): 1048576
- Weight format/bits (explicit config): bfloat16
- KV cache bits (explicit only): Unknown
- Confidence: **Medium**
- Unresolved fields/errors: KV cache bits not documented
- Citation: HF API/repository/config sources above.

