# Makefile for Enhanced BPR Multiplier Simulation
# Usage: make [target]

# Simulator
SIM ?= icarus
VIVADO ?= vivado
MODELSIM ?= vsim

# Directories
RTL_DIR := rtl
TB_DIR := testbench
SIM_DIR := simulation
OUTPUT_DIR := simulation_results

# Source files
RTL_SOURCES := $(RTL_DIR)/bpr_recoder.v \
               $(RTL_DIR)/pp_generator.v \
               $(RTL_DIR)/compressor_tree.v \
               $(RTL_DIR)/pipeline_stage.v \
               $(RTL_DIR)/final_adder.v \
               $(RTL_DIR)/fp16_mac.v \
               $(RTL_DIR)/top_multiplier.v

TB_SOURCE := $(TB_DIR)/tb_top_multiplier.v

# Simulation time
SIM_TIME := 1000ns

# Output files
EXECUTABLE := $(SIM_DIR)/multiplier_sim
WAVEFORM := $(SIM_DIR)/multiplier_waveform.vcd
OUTPUT_WAVEFORM := $(OUTPUT_DIR)/multiplier_waveform.vcd

# Targets
.PHONY: all sim help clean vivado modelsim icarus view directories

all: directories icarus

help:
	@echo "╔═══════════════════════════════════════════════════════╗"
	@echo "║  Enhanced BPR Multiplier Simulation Makefile          ║"
	@echo "╚═══════════════════════════════════════════════════════╝"
	@echo ""
	@echo "Available targets:"
	@echo "  make all         - Create directories and run icarus simulation"
	@echo "  make icarus      - Run Icarus Verilog simulation"
	@echo "  make vivado      - Run Xilinx Vivado simulation"
	@echo "  make modelsim    - Run ModelSim simulation"
	@echo "  make view        - View waveforms with GTKWave"
	@echo "  make clean       - Clean simulation artifacts"
	@echo "  make directories - Create required directories"
	@echo ""
	@echo "Usage examples:"
	@echo "  make              # Run default (icarus) simulation"
	@echo "  make vivado       # Run Vivado simulation"
	@echo "  make modelsim     # Run ModelSim simulation"
	@echo "  make view         # Open waveform viewer"
	@echo ""

directories:
	@echo "[*] Creating directories..."
	@mkdir -p $(SIM_DIR)
	@mkdir -p $(OUTPUT_DIR)
	@echo "[✓] Directories created"

icarus: directories
	@echo "╔═══════════════════════════════════════════════════════╗"
	@echo "║  Icarus Verilog Simulation                            ║"
	@echo "╚═══════════════════════════════════════════════════════╝"
	@echo ""
	@echo "[*] Compiling with iverilog..."
	@cd $(SIM_DIR) && iverilog -o multiplier_sim -g2009 \
		../$(TB_SOURCE) $(addprefix ../,$(RTL_SOURCES))
	@echo "[✓] Compilation successful"
	@echo ""
	@echo "[*] Running simulation..."
	@cd $(SIM_DIR) && vvp -n multiplier_sim -vcd
	@echo "[✓] Simulation completed"
	@echo ""
	@if [ -f $(WAVEFORM) ]; then \
		echo "[✓] Waveform generated: $(WAVEFORM)"; \
		cp $(WAVEFORM) $(OUTPUT_WAVEFORM); \
		echo "[✓] Copied to: $(OUTPUT_WAVEFORM)"; \
	else \
		echo "[X] Waveform file not found"; \
	fi

vivado: directories
	@echo "╔═══════════════════════════════════════════════════════╗"
	@echo "║  Xilinx Vivado Simulation                             ║"
	@echo "╚═══════════════════════════════════════════════════════╝"
	@echo ""
	@echo "[*] Starting Vivado..."
	$(VIVADO) -mode batch -source run_simulation.tcl
	@echo "[✓] Vivado simulation completed"

modelsim: directories
	@echo "╔═══════════════════════════════════════════════════════╗"
	@echo "║  ModelSim Simulation                                  ║"
	@echo "╚═══════════════════════════════════════════════════════╝"
	@echo ""
	@echo "[*] Starting ModelSim..."
	$(MODELSIM) -do modelsim.do
	@echo "[✓] ModelSim simulation completed"

view:
	@echo "[*] Opening waveform viewer..."
	@if [ -f $(WAVEFORM) ]; then \
		gtkwave $(WAVEFORM); \
	elif [ -f $(OUTPUT_WAVEFORM) ]; then \
		gtkwave $(OUTPUT_WAVEFORM); \
	else \
		echo "[X] Waveform file not found"; \
		echo "    Run 'make' or 'make icarus' first"; \
	fi

clean:
	@echo "[*] Cleaning simulation artifacts..."
	@rm -rf $(SIM_DIR)
	@rm -rf vivado_sim
	@rm -rf vivado.log vivado.jou
	@rm -f *.pb *.pb.lock
	@echo "[✓] Cleanup complete"

print-%:
	@echo $* = $($*)

# Default target
.DEFAULT_GOAL := all
