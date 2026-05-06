# Vivado Simulation Script for Enhanced BPR Multiplier
# Usage: vivado -mode batch -source run_simulation.tcl

# Create project
create_project multiplier_sim ./vivado_sim -force

# Add RTL source files
add_files {
    rtl/bpr_recoder.v
    rtl/pp_generator.v
    rtl/compressor_tree.v
    rtl/pipeline_stage.v
    rtl/final_adder.v
    rtl/fp16_mac.v
    rtl/top_multiplier.v
}

# Add testbench file
add_files {
    testbench/tb_top_multiplier.v
}

# Set top module for simulation
set_property top tb_top_multiplier [get_filesets sim_1]

# Run simulation
launch_simulation -mode behavioral -type behavioral
run 1000ns
quit -force
