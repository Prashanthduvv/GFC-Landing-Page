`timescale 1ns / 1ps
//////////////////////////////////////////////////////////////////////////////////
// Module: Enhanced Radix-8 Bit Pair Recoding (BPR) Recoder
// Author: G. RISHWANTH (24EG202A12)
// Description: This module implements the Radix-8 BPR algorithm for floating-point
//              multiplier. It encodes the multiplier using 4-bit groups.
//////////////////////////////////////////////////////////////////////////////////

module bpr_recoder #(
    parameter WIDTH = 16,           // Input width
    parameter BPR_STAGES = 4        // Number of BPR recoding stages (WIDTH/4)
) (
    input  clk,
    input  rst,
    input  [WIDTH-1:0] multiplier,  // Input multiplier (Y)
    output reg [BPR_STAGES-1:0] [3:0] recoded_bits,  // Recoded bits (0-3)
    output reg [BPR_STAGES-1:0] sign_bits,           // Sign bits
    output reg [BPR_STAGES-1:0] zero_bits            // Zero flags
);

    // Radix-8 recoding lookup table
    // For each 4-bit group: generate corresponding radix-8 digit (0, 1, 2, 3)
    // and sign/zero information
    
    integer i;
    reg [3:0] four_bit_group;
    reg [3:0] recoded_value;
    reg sign_bit, zero_bit;
    
    always @(posedge clk or negedge rst) begin
        if (!rst) begin
            recoded_bits <= 0;
            sign_bits <= 0;
            zero_bits <= 0;
        end else begin
            // Process each 4-bit group
            for (i = 0; i < BPR_STAGES; i = i + 1) begin
                four_bit_group = multiplier[i*4+3:i*4];
                
                // Radix-8 BPR encoding
                case(four_bit_group)
                    4'b0000: begin recoded_value = 4'd0; sign_bit = 1'b0; zero_bit = 1'b1; end
                    4'b0001: begin recoded_value = 4'd1; sign_bit = 1'b0; zero_bit = 1'b0; end
                    4'b0010: begin recoded_value = 4'd1; sign_bit = 1'b0; zero_bit = 1'b0; end
                    4'b0011: begin recoded_value = 4'd2; sign_bit = 1'b0; zero_bit = 1'b0; end
                    4'b0100: begin recoded_value = 4'd2; sign_bit = 1'b0; zero_bit = 1'b0; end
                    4'b0101: begin recoded_value = 4'd3; sign_bit = 1'b0; zero_bit = 1'b0; end
                    4'b0110: begin recoded_value = 4'd3; sign_bit = 1'b0; zero_bit = 1'b0; end
                    4'b0111: begin recoded_value = 4'd0; sign_bit = 1'b1; zero_bit = 1'b1; end
                    4'b1000: begin recoded_value = 4'd0; sign_bit = 1'b1; zero_bit = 1'b1; end
                    4'b1001: begin recoded_value = 4'd3; sign_bit = 1'b1; zero_bit = 1'b0; end
                    4'b1010: begin recoded_value = 4'd3; sign_bit = 1'b1; zero_bit = 1'b0; end
                    4'b1011: begin recoded_value = 4'd2; sign_bit = 1'b1; zero_bit = 1'b0; end
                    4'b1100: begin recoded_value = 4'd2; sign_bit = 1'b1; zero_bit = 1'b0; end
                    4'b1101: begin recoded_value = 4'd1; sign_bit = 1'b1; zero_bit = 1'b0; end
                    4'b1110: begin recoded_value = 4'd1; sign_bit = 1'b1; zero_bit = 1'b0; end
                    4'b1111: begin recoded_value = 4'd0; sign_bit = 1'b0; zero_bit = 1'b1; end
                endcase
                
                recoded_bits[i] <= recoded_value;
                sign_bits[i] <= sign_bit;
                zero_bits[i] <= zero_bit;
            end
        end
    end

endmodule
