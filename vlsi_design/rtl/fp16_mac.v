`timescale 1ns / 1ps
//////////////////////////////////////////////////////////////////////////////////
// Module: FP16 Multiply-Accumulate Unit
// Author: G. RISHWANTH (24EG202A12)
// Description: FP16 MAC unit for CNN accelerator integration
//              Performs FP16 multiplication and accumulation
//////////////////////////////////////////////////////////////////////////////////

module fp16_mac #(
    parameter FP16_WIDTH = 16,
    parameter ACCUM_WIDTH = 32
) (
    input  clk,
    input  rst,
    input  [FP16_WIDTH-1:0] operand_a,      // FP16 operand A
    input  [FP16_WIDTH-1:0] operand_b,      // FP16 operand B
    input  [ACCUM_WIDTH-1:0] accumulator,   // Accumulator value
    input  enable,
    input  accumulate,                      // Enable accumulation
    output reg [ACCUM_WIDTH-1:0] result
);

    wire [ACCUM_WIDTH-1:0] mult_result;
    wire [ACCUM_WIDTH-1:0] acc_result;
    
    // Simple FP16 multiplication (convert to integer for simulation)
    assign mult_result = {{(ACCUM_WIDTH-2*FP16_WIDTH){1'b0}}, operand_a[14:0] * operand_b[14:0]};
    
    // Accumulation logic
    assign acc_result = accumulate ? (result + mult_result) : mult_result;
    
    always @(posedge clk or negedge rst) begin
        if (!rst) begin
            result <= 0;
        end else if (enable) begin
            result <= acc_result;
        end
    end

endmodule
