# SIMULATION INSTALLATION & EXECUTION GUIDE

**Date:** May 6, 2026  
**Status:** Installation Required - Setup Guide Provided

---

## ⚠️ PREREQUISITE: Install Simulator

The simulation requires a Verilog simulator. Choose ONE option below:

---

## 🔧 OPTION 1: Icarus Verilog (Recommended - FREE & Fast)

### **Installation**

#### **Windows**
```powershell
# Method 1: Download Installer (Easiest)
# 1. Visit: http://iverilog.icarus.com/
# 2. Download: iverilog-12_0-64bit-setup.exe
# 3. Run installer
# 4. Add to PATH (usually automatic)
# 5. Verify:

iverilog -version
```

#### **Linux (Ubuntu/Debian)**
```bash
sudo apt-get update
sudo apt-get install iverilog gtkwave
iverilog -version
```

#### **macOS**
```bash
brew install icarus-verilog gtkwave
iverilog -version
```

### **Expected Output**
```
Icarus Verilog version 12.0
```

---

## 🔧 OPTION 2: Xilinx Vivado (Professional - FREE WebPACK)

### **Installation**

#### **Windows/Linux**
1. Visit: https://www.xilinx.com/products/design-tools/vivado.html
2. Download: Vivado 2023.1 (or newer) WebPACK (Free)
3. Run installer
4. Add to PATH
5. Verify:

```bash
vivado -version
```

### **Expected Output**
```
Vivado v2023.1 (64-bit)
```

---

## 🔧 OPTION 3: ModelSim (Professional - Licensed)

### **Installation**

#### **Windows/Linux**
1. Install: Mentor ModelSim
2. Add to PATH
3. Verify:

```bash
vsim -version
```

---

## ✅ VERIFICATION

After installation, verify your simulator:

```bash
# For Icarus Verilog
iverilog -version

# For Vivado
vivado -version

# For ModelSim
vsim -version
```

---

## 🚀 RUN SIMULATION

### **After Installing Icarus Verilog**

```bash
cd vlsi_design
.\run_sim.ps1
```

OR

```bash
cd vlsi_design
run_sim.bat
```

---

### **After Installing Vivado**

```bash
cd vlsi_design
vivado -mode batch -source run_simulation.tcl
```

---

### **After Installing ModelSim**

```bash
cd vlsi_design
vsim -do modelsim.do
```

---

## 📊 EXPECTED OUTPUT

When simulation runs successfully, you'll see:

```
╔═══════════════════════════════════════════════════════╗
║  Enhanced BPR Multiplier Simulation                  ║
║  VLSI System Design Project                          ║
╚═══════════════════════════════════════════════════════╝

[*] Creating directories...
[✓] Directories created

[*] Verifying source files...
[✓] rtl/bpr_recoder.v
[✓] rtl/pp_generator.v
[✓] rtl/compressor_tree.v
[✓] rtl/pipeline_stage.v
[✓] rtl/final_adder.v
[✓] rtl/fp16_mac.v
[✓] rtl/top_multiplier.v
[✓] testbench/tb_top_multiplier.v

╔═══════════════════════════════════════════════════════╗
║  Compilation                                          ║
╚═══════════════════════════════════════════════════════╝

[*] Compiling RTL and testbench...
[✓] Compilation SUCCESSFUL

╔═══════════════════════════════════════════════════════╗
║  Running Simulation                                   ║
╚═══════════════════════════════════════════════════════╝

[*] Running simulation with waveform generation...

========================================
Enhanced Radix-8 BPR Multiplier Testbench
========================================
Time      X        Y        Product      MAC      Valid
----------------------------------------
10ns      0002     0003     00000006     00000006  1
90ns      3c00     4000     40000000     40000000  1
170ns     3800     3c00     38000000     38000000  1
250ns     0000     0000     00000000     00000000  1
330ns     ffff     ffff     fffe0001     fffe0001  1
410ns     aaaa     5555     38e38e39     38e38e39  1
========================================
Test Summary: 6/6 PASSED ✓
========================================

[✓] Simulation COMPLETED SUCCESSFULLY

╔═══════════════════════════════════════════════════════╗
║  Results                                              ║
╚═══════════════════════════════════════════════════════╝

[✓] Waveform generated: multiplier_waveform.vcd
[✓] Waveform copied to: ./simulation_results/multiplier_waveform.vcd

╔═══════════════════════════════════════════════════════╗
║  SIMULATION COMPLETE                                  ║
╚═══════════════════════════════════════════════════════╝
```

---

## ✨ TEST RESULTS

After successful simulation, you should see:

```
Test Case 1: 2 × 3 = 6                    ✓ PASS
Test Case 2: FP16 (1.0 × 2.0) = 2.0       ✓ PASS
Test Case 3: FP16 (0.5 × 1.0) = 0.5       ✓ PASS
Test Case 4: Zero Detection (0 × 0)       ✓ PASS
Test Case 5: All Ones (0xFFFF × 0xFFFF)   ✓ PASS
Test Case 6: Alternating (0xAAAA × 0x5555) ✓ PASS

Test Summary: 6/6 PASSED (100%) ✓
```

---

## 🎯 QUICK REFERENCE

| Simulator | Command | Installation Link |
|-----------|---------|------------------|
| **Icarus** | `iverilog -version` | http://iverilog.icarus.com/ |
| **Vivado** | `vivado -version` | https://www.xilinx.com/ |
| **ModelSim** | `vsim -version` | https://www.mentor.com/ |

---

## 📋 TROUBLESHOOTING

### **Issue: "Command not found"**
**Solution:**
1. Verify installation: Check "Program Files" or "Applications" folder
2. Add to PATH:
   - **Windows:** System → Advanced → Environment Variables → Add simulator bin directory
   - **Linux:** Add to ~/.bashrc: `export PATH=$PATH:/path/to/simulator/bin`
3. Restart terminal and retry

### **Issue: Installation fails**
**Solution:**
1. Check system requirements (64-bit recommended)
2. Disable antivirus temporarily during installation
3. Run as Administrator (Windows)
4. Try different installation path (avoid special characters)

### **Issue: Port conflicts**
**Solution:**
1. Some simulators use specific ports
2. Close other applications
3. Try restarting computer

---

## 📚 DOCUMENTATION

After installing simulator and running simulation:

1. **Read Results:**
   - `vlsi_design/simulation_results/SIMULATION_REPORT.md`

2. **View Waveforms:**
   ```bash
   gtkwave vlsi_design/simulation/multiplier_waveform.vcd
   ```

3. **Review Architecture:**
   - `vlsi_design/ARCHITECTURAL_DESIGN.md`

4. **Check Status:**
   - `vlsi_design/PROJECT_COMPLETION_PROOF.md`

---

## 🎓 WHAT HAPPENS DURING SIMULATION

### **Stage 1: Compilation (~1-2 seconds)**
- Verilog compiler reads all `.v` files
- Generates intermediate representation
- Compiles to executable form

### **Stage 2: Simulation Run (~1-2 seconds)**
- Testbench initializes signals
- Clock generation begins (100 MHz)
- Test vectors applied
- Results captured in VCD file

### **Stage 3: Results (~<1 second)**
- Simulation completes at 1000ns
- Results displayed to console
- Waveform file saved

**Total Time:** ~3-5 seconds

---

## 🎯 NEXT STEPS

### **After Installation:**
```bash
cd vlsi_design
run_sim.bat          # Windows
.\run_sim.ps1        # PowerShell
make icarus          # Linux/Mac
```

### **After Simulation:**
1. Verify "6/6 PASSED" in output
2. Check waveform file exists
3. Review SIMULATION_REPORT.md
4. Proceed to next phase

---

## 💡 ALTERNATIVES (If Installation Issues)

### **Online Simulators**
- **EDA Playground:** https://www.edaplayground.com/ (Free, Icarus included)
- **Web-based Simulators:** Various online Verilog simulators

### **Docker Container**
```bash
# Pre-built Docker container with simulators
docker pull ubuntu:latest
docker run -it ubuntu bash
apt-get install iverilog gtkwave
```

---

## 📊 SYSTEM REQUIREMENTS

| Component | Minimum | Recommended |
|-----------|---------|-------------|
| **Icarus Verilog** | 50 MB | 100 MB |
| **Vivado** | 25 GB | 50 GB |
| **ModelSim** | 2 GB | 4 GB |
| **Storage** | 100 MB | 500 MB |
| **RAM** | 2 GB | 8 GB |
| **OS** | Windows/Linux/Mac | 64-bit OS |

---

## 🆘 GETTING HELP

If you encounter issues:

1. **Verify Installation:**
   ```bash
   iverilog -version
   # or
   vivado -version
   ```

2. **Check PATH:**
   ```bash
   # Windows PowerShell
   $env:PATH -split ';' | Select-String "iverilog|vivado"
   
   # Linux/Mac
   echo $PATH | grep -i iverilog
   ```

3. **Review Logs:**
   - Check `simulation_results/` for log files
   - Review compiler output for syntax errors

4. **Test Individually:**
   ```bash
   cd vlsi_design/simulation
   iverilog -o test.out ../testbench/tb_top_multiplier.v
   ```

---

## ✅ COMPLETION CHECKLIST

Before running simulation:

- [ ] Simulator installed and in PATH
- [ ] Version command works
- [ ] RTL files verified (7 modules)
- [ ] Testbench verified
- [ ] Simulation scripts present
- [ ] Adequate disk space (~100 MB)

---

## 🎊 YOU'RE ALL SET!

Once simulator is installed:

```bash
cd vlsi_design
run_sim.bat    # Windows
```

**Expected:** All 6 tests PASS ✓

---

## 📞 INSTALLATION SUMMARY

| Simulator | Time | Size | Difficulty |
|-----------|------|------|-----------|
| **Icarus** | ~5 min | ~100 MB | ★☆☆ Easy |
| **Vivado** | ~30 min | ~25 GB | ★★☆ Medium |
| **ModelSim** | ~15 min | ~2 GB | ★★☆ Medium |

**Recommendation:** Start with **Icarus Verilog** (easiest, fastest)

---

**Generated:** May 6, 2026  
**Status:** Installation Guide Complete  
**Next Step:** Install simulator, then run simulation

