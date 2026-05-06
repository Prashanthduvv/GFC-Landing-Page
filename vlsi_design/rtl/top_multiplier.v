`timescale 1ns / 1ps
//////////////////////////////////////////////////////////////////////////////////
// Module: Enhanced Radix-8 BPR Floating-Point Multiplier (Top-Level)
// Author: G. RISHWANTH (24EG202A12)
// Title: An Enhanced Pipelined Radix-8 Bit Pair Recoding Floating-Point 
//        Multiplier Using Compressor-Based Reduction for Energy-Efficient 
//        Neural Network Accelerators
// Description: Top-level integration of all components with multi-stage pipeline
//////////////////////////////////////////////////////////////////////////////////

module top_multiplier #(
    parameter WIDTH = 16,
    parameter BPR_STAGES = 4,
    parameter RESULT_WIDTH = 32
) (
    input  clk,
    input  rst,
    input  [WIDTH-1:0] multiplicand,    // X operand (FP16)
    input  [WIDTH-1:0] multiplier,      // Y operand (FP16)
    input  enable,
    input  accumulate_enable,
    input  [RESULT_WIDTH-1:0] accumulator_in,
    
    // Pipeline control signals
    output reg pipe_valid,              // Output valid flag
    
    // Results
    output reg [RESULT_WIDTH-1:0] product_out,
    output reg [RESULT_WIDTH-1:0] mac_out
);

    // Internal signals - Stage 1: BPR Recoding
    wire [BPR_STAGES-1:0] [3:0] recoded_bits;
    wire [BPR_STAGES-1:0] sign_bits;
    wire [BPR_STAGES-1:0] zero_bits;
    reg [BPR_STAGES-1:0] [3:0] recoded_bits_p1;
    reg [BPR_STAGES-1:0] sign_bits_p1;
    
    // Internal signals - Stage 2: Partial Product Generation
    wire [BPR_STAGES-1:0] [WIDTH+3:0] partial_products;
    reg [BPR_STAGES-1:0] [WIDTH+3:0] partial_products_p2;
    
    // Internal signals - Stage 3: Compressor Tree
    wire [RESULT_WIDTH-1:0] sum_compressed;
    wire [RESULT_WIDTH-1:0] carry_compressed;
    reg [RESULT_WIDTH-1:0] sum_p3;
    reg [RESULT_WIDTH-1:0] carry_p3;
    
    // Internal signals - Stage 4: Final Addition
    wire [RESULT_WIDTH-1:0] final_result;
    reg [RESULT_WIDTH-1:0] final_result_p4;
    
    // Pipeline valid signals
    reg valid_p1, valid_p2, valid_p3, valid_p4;
    
    // Instantiate Stage 1: BPR Recoder
    bpr_recoder #(
        .WIDTH(WIDTH),
        .BPR_STAGES(BPR_STAGES)
    ) u_bpr_recoder (
        .clk(clk),
        .rst(rst),
        .multiplier(multiplier),
        .recoded_bits(recoded_bits),
        .sign_bits(sign_bits),
        .zero_bits(zero_bits)
    );
    
    // Instantiate Stage 2: Partial Product Generator
    pp_generator #(
        .WIDTH(WIDTH),
        .BPR_STAGES(BPR_STAGES)
    ) u_pp_generator (
        .clk(clk),
        .rst(rst),
        .multiplicand(multiplicand),
        .recoded_bits(recoded_bits),
        .sign_bits(sign_bits),
        .partial_products(partial_products)
    );
    
    // Instantiate Stage 3: Compressor Tree
    compressor_tree #(
        .WIDTH(RESULT_WIDTH),
        .NUM_PPS(BPR_STAGES)
    ) u_compressor_tree (
        .clk(clk),
        .rst(rst),
        .partial_products(partial_products),
        .sum_out(sum_compressed),
        .carry_out(carry_compressed)
    );
    
    // Instantiate Stage 4: Final Adder
    final_adder #(
        .WIDTH(RESULT_WIDTH)
    ) u_final_adder (
        .clk(clk),
        .rst(rst),
        .sum_in(sum_p3),
        .carry_in(carry_p3),
        .result(final_result)
    );
    
    // Pipeline stage logic
    always @(posedge clk or negedge rst) begin
        if (!rst) begin
            recoded_bits_p1 <= 0;
            sign_bits_p1 <= 0;
            valid_p1 <= 1'b0;
            
            partial_products_p2 <= 0;
            valid_p2 <= 1'b0;
            
            sum_p3 <= 0;
            carry_p3 <= 0;
            valid_p3 <= 1'b0;
            
            final_result_p4 <= 0;
            valid_p4 <= 1'b0;
            pipe_valid <= 1'b0;
            
            product_out <= 0;
            mac_out <= 0;
        end else if (enable) begin
            // Stage 1: Store recoded outputs
            recoded_bits_p1 <= recoded_bits;
            sign_bits_p1 <= sign_bits;
            valid_p1 <= 1'b1;
            
            // Stage 2: Store partial products
            partial_products_p2 <= partial_products;
            valid_p2 <= valid_p1;
            
            // Stage 3: Store compressed sum and carry
            sum_p3 <= sum_compressed;
            carry_p3 <= carry_compressed;
            valid_p3 <= valid_p2;
            
            // Stage 4: Final result
            final_result_p4 <= final_result;
            valid_p4 <= valid_p3;
            pipe_valid <= valid_p4;
            
            // Output
            product_out <= final_result;
            if (accumulate_enable) begin
                mac_out <= final_result + accumulator_in;
            end else begin
                mac_out <= final_result;
            end
        end
    end

endmodule
