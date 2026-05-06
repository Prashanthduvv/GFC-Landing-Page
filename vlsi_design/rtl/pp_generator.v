`timescale 1ns / 1ps
//////////////////////////////////////////////////////////////////////////////////
// Module: Partial Product Generator
// Author: G. RISHWANTH (24EG202A12)
// Description: Generates partial products for each recoded BPR digit
//              Supports 0X, 1X, 2X, 3X multiplication
//////////////////////////////////////////////////////////////////////////////////

module pp_generator #(
    parameter WIDTH = 16,
    parameter BPR_STAGES = 4
) (
    input  clk,
    input  rst,
    input  [WIDTH-1:0] multiplicand,           // Input multiplicand (X)
    input  [BPR_STAGES-1:0] [3:0] recoded_bits,
    input  [BPR_STAGES-1:0] sign_bits,
    output reg [BPR_STAGES-1:0] [WIDTH+3:0] partial_products  // PP with sign extension
);

    integer i, j;
    reg [WIDTH+3:0] temp_pp;
    
    always @(posedge clk or negedge rst) begin
        if (!rst) begin
            partial_products <= 0;
        end else begin
            for (i = 0; i < BPR_STAGES; i = i + 1) begin
                // Generate partial products based on recoded value
                case(recoded_bits[i])
                    4'd0: temp_pp = {(WIDTH+4){1'b0}};                    // 0 * X
                    4'd1: temp_pp = {{4{multiplicand[WIDTH-1]}}, multiplicand};    // 1 * X
                    4'd2: temp_pp = {{3{multiplicand[WIDTH-1]}}, multiplicand, 1'b0}; // 2 * X
                    4'd3: begin
                        // 3 * X = 2 * X + X
                        temp_pp = {{2{multiplicand[WIDTH-1]}}, multiplicand, 2'b0} + 
                                  {{4{multiplicand[WIDTH-1]}}, multiplicand};
                    end
                    default: temp_pp = {(WIDTH+4){1'b0}};
                endcase
                
                // Apply sign if needed
                if (sign_bits[i]) begin
                    temp_pp = ~temp_pp + 1'b1;  // 2's complement
                end
                
                // Shift to correct position (i * 4 bits)
                partial_products[i] <= temp_pp << (i * 4);
            end
        end
    end

endmodule
