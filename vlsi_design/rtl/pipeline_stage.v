`timescale 1ns / 1ps
//////////////////////////////////////////////////////////////////////////////////
// Module: Pipeline Stage Register
// Author: G. RISHWANTH (24EG202A12)
// Description: Pipeline register stage for multi-stage pipelined architecture
//              Enables concurrent execution of design stages
//////////////////////////////////////////////////////////////////////////////////

module pipeline_stage #(
    parameter DATA_WIDTH = 32
) (
    input  clk,
    input  rst,
    input  enable,
    input  [DATA_WIDTH-1:0] data_in,
    output reg [DATA_WIDTH-1:0] data_out
);

    always @(posedge clk or negedge rst) begin
        if (!rst) begin
            data_out <= 0;
        end else if (enable) begin
            data_out <= data_in;
        end
    end

endmodule
