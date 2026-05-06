`timescale 1ns / 1ps
//////////////////////////////////////////////////////////////////////////////////
// Module: 4:2 Compressor Wallace Tree
// Author: G. RISHWANTH (24EG202A12)
// Description: Implements Wallace tree partial product reduction using 4:2 compressors
//              Reduces multiple partial products to 2 operands (sum and carry)
//////////////////////////////////////////////////////////////////////////////////

module compressor_tree #(
    parameter WIDTH = 32,
    parameter NUM_PPS = 4
) (
    input  clk,
    input  rst,
    input  [NUM_PPS-1:0] [WIDTH-1:0] partial_products,
    output reg [WIDTH:0] sum_out,
    output reg [WIDTH:0] carry_out
);

    // Internal signals for tree stages
    reg [WIDTH:0] stage1_sum [NUM_PPS/2-1:0];
    reg [WIDTH:0] stage1_carry [NUM_PPS/2-1:0];
    reg [WIDTH:0] stage2_sum;
    reg [WIDTH:0] stage2_carry;
    
    integer i, j;
    
    // 4:2 Compressor logic
    function [1:0] compressor_4_2(input a, b, c, d, output cout);
        integer cnt;
        begin
            cnt = a + b + c + d;
            cout = (cnt >= 2) ? 1'b1 : 1'b0;
            compressor_4_2 = (cnt[0]);
        end
    endfunction
    
    always @(posedge clk or negedge rst) begin
        if (!rst) begin
            sum_out <= 0;
            carry_out <= 0;
        end else begin
            // Stage 1: First level of compression
            for (i = 0; i < NUM_PPS/2; i = i + 1) begin
                stage1_sum[i] <= partial_products[i*2] + partial_products[i*2+1];
                stage1_carry[i] <= (partial_products[i*2] & partial_products[i*2+1]);
            end
            
            // Stage 2: Second level compression
            stage2_sum <= stage1_sum[0] + stage1_sum[1];
            stage2_carry <= (stage1_sum[0] & stage1_sum[1]) | 
                           (stage1_carry[0] & stage1_carry[1]);
            
            // Final output
            sum_out <= stage2_sum;
            carry_out <= {stage2_carry[WIDTH-1:0], 1'b0};
        end
    end

endmodule
