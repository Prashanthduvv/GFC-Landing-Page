`timescale 1ns / 1ps
//////////////////////////////////////////////////////////////////////////////////
// Testbench: Top-Level Multiplier Verification
// Author: G. RISHWANTH (24EG202A12)
// Description: Comprehensive functional verification testbench
//////////////////////////////////////////////////////////////////////////////////

module tb_top_multiplier;

    // Parameters
    parameter WIDTH = 16;
    parameter BPR_STAGES = 4;
    parameter RESULT_WIDTH = 32;
    parameter CLK_PERIOD = 10;  // 10ns clock period (100MHz)
    
    // Testbench signals
    reg clk;
    reg rst;
    reg enable;
    reg accumulate_enable;
    reg [WIDTH-1:0] multiplicand;
    reg [WIDTH-1:0] multiplier;
    reg [RESULT_WIDTH-1:0] accumulator_in;
    
    wire pipe_valid;
    wire [RESULT_WIDTH-1:0] product_out;
    wire [RESULT_WIDTH-1:0] mac_out;
    
    // Instantiate top-level module
    top_multiplier #(
        .WIDTH(WIDTH),
        .BPR_STAGES(BPR_STAGES),
        .RESULT_WIDTH(RESULT_WIDTH)
    ) uut (
        .clk(clk),
        .rst(rst),
        .multiplicand(multiplicand),
        .multiplier(multiplier),
        .enable(enable),
        .accumulate_enable(accumulate_enable),
        .accumulator_in(accumulator_in),
        .pipe_valid(pipe_valid),
        .product_out(product_out),
        .mac_out(mac_out)
    );
    
    // Clock generation
    always #(CLK_PERIOD/2) clk = ~clk;
    
    // Test vectors
    initial begin
        $display("========================================");
        $display("Enhanced Radix-8 BPR Multiplier Testbench");
        $display("========================================");
        $display("Time\tX\tY\tProduct\tMAC\tValid");
        $display("----------------------------------------");
        
        // Initialize
        clk = 1'b0;
        rst = 1'b0;
        enable = 1'b0;
        accumulate_enable = 1'b0;
        multiplicand = 16'h0000;
        multiplier = 16'h0000;
        accumulator_in = 32'h00000000;
        
        // Reset pulse
        #(CLK_PERIOD*2) rst = 1'b1;
        enable = 1'b1;
        
        // Test Case 1: Small numbers
        #CLK_PERIOD;
        multiplicand = 16'h0002;  // 2 in FP16
        multiplier = 16'h0003;    // 3 in FP16
        accumulate_enable = 1'b0;
        
        #(CLK_PERIOD*5);
        $display("%0t\t%h\t%h\t%h\t%h\t%b", $time, multiplicand, multiplier, product_out, mac_out, pipe_valid);
        
        // Test Case 2: Larger numbers
        #CLK_PERIOD;
        multiplicand = 16'h3C00;  // 1.0 in FP16
        multiplier = 16'h4000;    // 2.0 in FP16
        
        #(CLK_PERIOD*5);
        $display("%0t\t%h\t%h\t%h\t%h\t%b", $time, multiplicand, multiplier, product_out, mac_out, pipe_valid);
        
        // Test Case 3: With accumulation
        #CLK_PERIOD;
        multiplicand = 16'h3800;  // 0.5 in FP16
        multiplier = 16'h3C00;    // 1.0 in FP16
        accumulate_enable = 1'b1;
        accumulator_in = 32'h00000100;
        
        #(CLK_PERIOD*5);
        $display("%0t\t%h\t%h\t%h\t%h\t%b", $time, multiplicand, multiplier, product_out, mac_out, pipe_valid);
        
        // Test Case 4: Zero detection
        #CLK_PERIOD;
        multiplicand = 16'h0000;
        multiplier = 16'h0000;
        accumulate_enable = 1'b0;
        
        #(CLK_PERIOD*5);
        $display("%0t\t%h\t%h\t%h\t%h\t%b", $time, multiplicand, multiplier, product_out, mac_out, pipe_valid);
        
        // Test Case 5: All ones
        #CLK_PERIOD;
        multiplicand = 16'hFFFF;
        multiplier = 16'hFFFF;
        
        #(CLK_PERIOD*5);
        $display("%0t\t%h\t%h\t%h\t%h\t%b", $time, multiplicand, multiplier, product_out, mac_out, pipe_valid);
        
        // Test Case 6: Alternating pattern
        #CLK_PERIOD;
        multiplicand = 16'hAAAA;
        multiplier = 16'h5555;
        
        #(CLK_PERIOD*5);
        $display("%0t\t%h\t%h\t%h\t%h\t%b", $time, multiplicand, multiplier, product_out, mac_out, pipe_valid);
        
        #(CLK_PERIOD*10);
        $display("========================================");
        $display("Testbench Completed Successfully");
        $display("========================================");
        $finish;
    end
    
    // Generate VCD file for waveform analysis
    initial begin
        $dumpfile("simulation_results/multiplier_waveform.vcd");
        $dumpvars(0, tb_top_multiplier);
    end

endmodule
