# ModelSim simulation do file for Enhanced BPR Multiplier
# Usage: vsim -do modelsim.do

# Compile design
vlib work

# Map libraries
vmap unisim ""
vmap xilinxcorelib ""

# Compile RTL modules
vlog rtl/bpr_recoder.v
vlog rtl/pp_generator.v
vlog rtl/compressor_tree.v
vlog rtl/pipeline_stage.v
vlog rtl/final_adder.v
vlog rtl/fp16_mac.v
vlog rtl/top_multiplier.v

# Compile testbench
vlog testbench/tb_top_multiplier.v

# Load testbench
vsim -gui work.tb_top_multiplier

# Add waveforms
add wave -noupdate -group "Clock" /tb_top_multiplier/clk
add wave -noupdate -group "Inputs" /tb_top_multiplier/multiplicand
add wave -noupdate -group "Inputs" /tb_top_multiplier/multiplier
add wave -noupdate -group "Outputs" /tb_top_multiplier/product_out
add wave -noupdate -group "Outputs" /tb_top_multiplier/mac_out
add wave -noupdate -group "Control" /tb_top_multiplier/pipe_valid

# Run simulation
run 1000ns

# Save waveform
write vcd multiplier_waveform.vcd

# Exit
quit
