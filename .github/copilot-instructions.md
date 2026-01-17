# Copilot Instructions (tiny-gpu)

## Project Overview
- `tiny-gpu` is a minimal GPU written in SystemVerilog for learning architecture/ISA basics.
- RTL lives in `src/`, cocotb-based simulation lives in `test/`, diagrams in `docs/images/`, and GDS snapshots in `gds/`.

## Architecture Map (read these together)
- `src/gpu.sv`: top-level GPU; wires `dcr` → `dispatch` → per-core `core` instances; hooks `controller` blocks for data/program memory.
- `src/core.sv`: per-core resources; each thread gets its own `alu`, `lsu`, `pc`, and `registers`. `THREADS_PER_BLOCK` sets replication.
- `src/scheduler.sv`: core FSM stages `FETCH → DECODE → REQUEST → WAIT → EXECUTE → UPDATE`; no branch divergence (next PC comes from a single thread index).
- `src/decoder.sv` + `src/pc.sv`: ISA decode (11 ops) and NZP/`BRnzp` behavior.
- `src/controller.sv`: channelized memory arbiter for async global memory; handles read/write handshakes and relays.
- `src/registers.sv`: R0–R12 are writable; R13–R15 are read-only `%blockIdx/%blockDim/%threadIdx`.

## Simulation & Workflow
- Prereqs: `sv2v`, `iverilog`, and `cocotb`; create `build/` before compiling.
- `make test_matadd` / `make test_matmul` runs cocotb tests and logs traces to `test/logs/`.
- `test/helpers/memory.py` models external memory and expects packed channel buses like `*_mem_read_valid`/`*_mem_read_address`.

## Project-Specific Conventions
- RTL uses ``default_nettype none`` and synchronous `always @(posedge clk)` blocks.
- Arrays-of-ports are used heavily for channels/threads; `src/gpu.sv` avoids slicing top-level arrays due to OpenLane/Verilog-2005 limits.
- Tests encode kernels as 16-bit instruction words (see `test/test_matadd.py`, `test/test_matmul.py`).

## External Knowledgebases (useful for extending)
- cocotb docs: https://docs.cocotb.org/en/stable/
- Icarus Verilog: https://steveicarus.github.io/iverilog/
- sv2v (SV→Verilog): https://github.com/zachjs/sv2v
- MIAOW GPU: https://github.com/VerticalResearchGroup/miaow
- VeriGPU: https://github.com/hughperkins/VeriGPU
