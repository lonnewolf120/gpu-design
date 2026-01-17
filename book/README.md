# Create Your Own GPU From Scratch - Complete Book

This is a comprehensive 750+ page book on GPU design, from fundamentals to manufacturing silicon.

## 📚 Book Structure

- **25 Chapters** organized in 5 parts
- **~750-800 pages** of detailed content
- **40-50 hours** of reading material
- Designed for students, GPU engineers, and hardware startups

## 🚀 Quick Start

### Option 1: Local File (Simple)
Open `table-of-contents.html` in your browser to see the complete book index.

### Option 2: Local Server (Recommended)
For the best experience with chapter navigation:

```bash
cd /mnt/e/Projects/OpenSource/tiny-gpu/book
python3 -m http.server 8000
```

Then visit `http://localhost:8000/table-of-contents.html`

## 📁 File Structure

```
book/
├── table-of-contents.html   ← Start here! Complete book index
├── index.html                ← Quick summary page (legacy)
├── BOOK_PLAN.md             ← Detailed outline of all 25 chapters
├── chapters/                 ← Individual chapter files
│   ├── chapter-01.html      ✓ Big Picture: What is a GPU?
│   ├── chapter-02.html      ✓ GPU vs CPU Deep Dive
│   ├── chapter-19.html      ✓ RTL Design (Verilog/SystemVerilog)
│   └── [chapter-XX.html]    (More chapters being written)
├── images/                   ← Diagrams and figures
├── styles.css                ← GitBook-style theme
└── script.js                 ← Navigation and search
```

## 📖 Book Parts

### Part I: GPU Fundamentals (Ch 1-5)
Understanding the "why" and "what" of GPU architecture

### Part II: Execution & Scheduling (Ch 6-11)
How GPUs actually run code - pipelines, memory, scheduling

### Part III: Software & Tooling (Ch 12-14)
Compilers, drivers, programming models, and testing

### Part IV: Hardware Implementation (Ch 15-21)
Writing actual RTL, building cores, synthesis, and timing

### Part V: Physical Design & Manufacturing (Ch 22-25)
From RTL to silicon - layout, signoff, tape-out, bring-up

## ✅ Current Status

**Completed Chapters:**
- ✓ Chapter 1: Big Picture - What is a GPU? (~20 pages)
- ✓ Chapter 2: GPU vs CPU Deep Dive (~25 pages)
- ✓ Chapter 19: RTL Design with full code examples (~35 pages)

**In Progress:**
- Chapters 3-18, 20-25 (detailed outlines ready in BOOK_PLAN.md)

## 👥 Who This Book is For

### Students
Read sequentially, do exercises, build the GPU as a capstone project

### Startup Founders
Focus on Parts I-II for architecture decisions, deep-dive Parts IV-V for silicon

### Hobbyists
Read at your own pace, focus on simulation and RTL, skip heavy theory

## 🔧 Tools Referenced

- **Simulation:** Icarus Verilog, Verilator, cocotb
- **Synthesis:** Yosys, Synopsys Design Compiler
- **Physical Design:** OpenLane, Cadence Innovus
- **Languages:** Verilog, SystemVerilog, Python

## 📜 License

Same as tiny-gpu project - check main repository LICENSE

## 🤝 Contributing

Content improvements and additional chapters welcome! See tiny-gpu repository for contribution guidelines.
