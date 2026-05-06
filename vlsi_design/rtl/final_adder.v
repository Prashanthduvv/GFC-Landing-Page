`timescale 1ns / 1ps
//////////////////////////////////////////////////////////////////////////////////
// Module: Carry Propagate Adder (CPA)
// Author: G. RISHWANTH (24EG202A12)
// Description: Final carry propagate adder for result computation
//              Adds sum and carry from compressor tree
//////////////////////////////////////////////////////////////////////////////////

module final_adder #(
    parameter WIDTH = 32
) (
    input  clk,
    input  rst,
    input  [WIDTH:0] sum_in,
    input  [WIDTH:0] carry_in,
    output reg [WIDTH:0] result
);

    wire [WIDTH:0] temp_result;
    
    // Ripple carry adder implementation
    assign temp_result = sum_in + carry_in;
    
    always @(posedge clk or negedge rst) begin
        if (!rst) begin
            result <= 0;
        end else begin
            result <= temp_result;
        end
    end

endmodule
