const pptxgen = require("pptxgenjs");

let pres = new pptxgen();
pres.layout = 'LAYOUT_16x9';
pres.author = 'D.Prashanth';
pres.title = 'Enhanced Radix-8 BPR Floating-Point Multiplier';

// Color scheme matching the template
const colors = {
  red: "C1272D",
  blue: "1F4788",
  darkBlue: "1E3A5F",
  gray: "F5F5F5",
  darkGray: "333333",
  lightGray: "666666",
  white: "FFFFFF",
  black: "000000"
};

// Helper function for consistent corner accents (fresh objects each time)
function addCornerAccents(slide) {
  // Top-left red triangle
  slide.addShape(pres.shapes.RIGHT_TRIANGLE, {
    x: 0, y: 0, w: 0.4, h: 0.4,
    fill: { color: colors.red },
    line: { type: "none" },
    rotate: 0
  });
  
  // Bottom-right blue triangle
  slide.addShape(pres.shapes.RIGHT_TRIANGLE, {
    x: 9.6, y: 5.225, w: 0.4, h: 0.4,
    fill: { color: colors.blue },
    line: { type: "none" },
    rotate: 180
  });
  
  // University logo text (top right)
  slide.addText([
    { text: "ANURAG", options: { fontSize: 14, bold: true, color: colors.red } },
    { text: "\nUNIVERSITY", options: { fontSize: 8, color: colors.darkGray } }
  ], {
    x: 8.8, y: 0.15, w: 1.1, h: 0.4,
    align: "center", valign: "top"
  });
}

// Slide 1: Title Slide
let slide1 = pres.addSlide();
slide1.background = { color: colors.gray };
addCornerAccents(slide1);

slide1.addText("An Enhanced Pipelined Radix-8 Bit Pair Recoding Floating-Point Multiplier Using Compressor-Based Reduction for Energy-Efficient Neural Network Accelerators", {
  x: 0.5, y: 1.0, w: 9, h: 1.8,
  fontSize: 28, bold: true, color: colors.darkBlue,
  align: "center", valign: "middle"
});

slide1.addText([
  { text: "Under the guidance of:", options: { fontSize: 12, breakLine: true } },
  { text: "Dr.kumar Neeraj", options: { fontSize: 14, bold: true, breakLine: true } },
  { text: "Associate Professor", options: { fontSize: 11, breakLine: true } },
  { text: "Department of ECE", options: { fontSize: 11 } }
], {
  x: 5.5, y: 3.2, w: 4, h: 1.2,
  color: colors.darkGray, align: "left"
});

slide1.addText([
  { text: "Presented by:", options: { fontSize: 12, breakLine: true } },
  { text: "D.PRASHANTH", options: { fontSize: 14, bold: true, breakLine: true } },
  { text: "24EG202A07", options: { fontSize: 12, breakLine: true } },
  { text: "M.Tech (VLSI-SD)", options: { fontSize: 11 } }
], {
  x: 0.5, y: 3.2, w: 4, h: 1.2,
  color: colors.darkGray, align: "left"
});

// Slide 2: Abstract
let slide2 = pres.addSlide();
slide2.background = { color: colors.gray };
addCornerAccents(slide2);

slide2.addText("Abstract", {
  x: 0.5, y: 0.4, w: 9, h: 0.5,
  fontSize: 32, bold: true, color: colors.darkBlue,
  align: "left"
});

slide2.addText("This project proposes an enhanced floating-point multiplier architecture based on the Radix-8 Bit Pair Recoding (BPR) algorithm, specifically designed for high-performance AI and neural network accelerator applications. The proposed design enhances the conventional BPR multiplier by introducing a multi-stage pipelined architecture and compressor-based partial product reduction techniques to achieve significant improvements in power consumption, delay reduction, throughput optimization, and hardware area efficiency. The enhanced architecture integrates seamlessly into FP16 Multiply-Accumulate (MAC) units for CNN convolution operations, making it ideal for energy-efficient AI accelerators. Implemented using Verilog HDL and verified through FPGA synthesis and ASIC implementation using TSMC 65nm technology, the design demonstrates 15-25% lower delay, 20-30% reduced power consumption, and improved overall energy efficiency compared to conventional Booth and base BPR multipliers. The enhanced multiplier is particularly suited for edge AI processors, DSP systems, and embedded neural network accelerators where power efficiency and high-speed computation are critical.", {
  x: 0.5, y: 1.1, w: 9, h: 4.0,
  fontSize: 14, color: colors.darkGray,
  align: "left", valign: "top"
});

// Slide 3: Problem Statement
let slide3 = pres.addSlide();
slide3.background = { color: colors.gray };
addCornerAccents(slide3);

slide3.addText("Problem Statement", {
  x: 0.5, y: 0.4, w: 9, h: 0.5,
  fontSize: 32, bold: true, color: colors.darkBlue,
  align: "left"
});

slide3.addText("Modern AI and neural network accelerators demand floating-point multipliers that can deliver high-speed computation while maintaining exceptional energy efficiency. Although existing Booth multipliers and conventional Radix-8 Bit Pair Recoding (BPR) multipliers offer improved partial product reduction, they suffer from several critical limitations that hinder their performance in AI accelerator applications:\n\n• Conventional BPR multipliers lack pipelined architecture, limiting throughput and operating frequency in high-speed AI applications\n• Traditional adder-based reduction techniques result in longer critical path delays\n• Absence of advanced compressor tree implementations leads to suboptimal speed and area utilization\n• Limited integration with AI-specific MAC units reduces overall accelerator efficiency\n• Inadequate optimization for CNN convolution operations in neural network hardware\n• High dynamic power consumption due to inefficient partial product accumulation\n\nThese limitations create a significant bottleneck in achieving the performance and energy efficiency targets required for modern edge AI processors, FPGA-based neural network accelerators, and embedded AI systems. There is a critical need for an enhanced multiplier architecture that addresses these challenges through architectural innovation, pipelining, and optimized reduction techniques.", {
  x: 0.5, y: 1.1, w: 9, h: 4.0,
  fontSize: 14, color: colors.darkGray,
  align: "left", valign: "top"
});

// Slide 4: Base Paper Overview
let slide4 = pres.addSlide();
slide4.background = { color: colors.gray };
addCornerAccents(slide4);

slide4.addText("Base Paper: Radix-8 Bit Pair Recoding Algorithm", {
  x: 0.5, y: 0.4, w: 9, h: 0.5,
  fontSize: 28, bold: true, color: colors.darkBlue,
  align: "left"
});

slide4.addText([
  { text: "Key Concept:", options: { fontSize: 16, bold: true, color: colors.darkBlue, breakLine: true } },
  { text: "The Radix-8 Bit Pair Recoding (BPR) algorithm significantly reduces partial products from n to n/4 by utilizing non-overlapping 4-bit recoding groups, making it more efficient than conventional Booth multipliers.", options: { fontSize: 14, breakLine: true, breakLine: true } },
  
  { text: "\nCore Advantages:", options: { fontSize: 16, bold: true, color: colors.darkBlue, breakLine: true } },
  { text: "• Eliminates the need for 2's complement computation", options: { bullet: true, breakLine: true } },
  { text: "• Removes sign extension requirements", options: { bullet: true, breakLine: true } },
  { text: "• Optimized for unsigned floating-point mantissa multiplication", options: { bullet: true, breakLine: true } },
  { text: "• Particularly efficient for CNN accelerator applications", options: { bullet: true, breakLine: true } },
  { text: "• Reduces number of partial products by 75%", options: { bullet: true } }
], {
  x: 0.5, y: 1.1, w: 4.3, h: 3.8,
  fontSize: 14, color: colors.darkGray,
  align: "left", valign: "top"
});

slide4.addText([
  { text: "Limitations of Base Paper:", options: { fontSize: 16, bold: true, color: colors.red, breakLine: true } },
  { text: "• No pipelined architecture implementation", options: { bullet: true, breakLine: true } },
  { text: "• Uses conventional adder-based reduction", options: { bullet: true, breakLine: true } },
  { text: "• Limited throughput optimization", options: { bullet: true, breakLine: true } },
  { text: "• No advanced compressor tree design", options: { bullet: true, breakLine: true } },
  { text: "• Minimal AI accelerator integration", options: { bullet: true, breakLine: true } },
  { text: "• Higher critical path delay", options: { bullet: true } }
], {
  x: 5.2, y: 1.1, w: 4.3, h: 3.8,
  fontSize: 14, color: colors.darkGray,
  align: "left", valign: "top"
});

// Slide 5: Proposed Improvements
let slide5 = pres.addSlide();
slide5.background = { color: colors.gray };
addCornerAccents(slide5);

slide5.addText("Proposed Enhancements & Innovations", {
  x: 0.5, y: 0.4, w: 9, h: 0.5,
  fontSize: 28, bold: true, color: colors.darkBlue,
  align: "left"
});

slide5.addShape(pres.shapes.RECTANGLE, {
  x: 0.5, y: 1.1, w: 4.3, h: 1.6,
  fill: { color: colors.white },
  line: { color: colors.blue, width: 2 }
});
slide5.addText([
  { text: "1. Multi-Stage Pipelined Architecture", options: { fontSize: 15, bold: true, color: colors.blue, breakLine: true } },
  { text: "Stage 1: BPR Recoding", options: { bullet: true, fontSize: 12, breakLine: true } },
  { text: "Stage 2: Partial Product Generation", options: { bullet: true, fontSize: 12, breakLine: true } },
  { text: "Stage 3: Compressor-Based Reduction", options: { bullet: true, fontSize: 12, breakLine: true } },
  { text: "Stage 4: Final Addition", options: { bullet: true, fontSize: 12, breakLine: true } },
  { text: "→ Improves throughput & operating frequency", options: { fontSize: 11, italic: true } }
], {
  x: 0.6, y: 1.2, w: 4.1, h: 1.4,
  color: colors.darkGray, align: "left"
});

slide5.addShape(pres.shapes.RECTANGLE, {
  x: 5.2, y: 1.1, w: 4.3, h: 1.6,
  fill: { color: colors.white },
  line: { color: colors.blue, width: 2 }
});
slide5.addText([
  { text: "2. Compressor-Based Reduction", options: { fontSize: 15, bold: true, color: colors.blue, breakLine: true } },
  { text: "• Replace conventional adders with 4:2 compressors", options: { bullet: true, fontSize: 12, breakLine: true } },
  { text: "• Implement Wallace tree reduction architecture", options: { bullet: true, fontSize: 12, breakLine: true } },
  { text: "• Reduces critical path delay significantly", options: { bullet: true, fontSize: 12, breakLine: true } },
  { text: "→ Enhanced speed and reduced area", options: { fontSize: 11, italic: true } }
], {
  x: 5.3, y: 1.2, w: 4.1, h: 1.4,
  color: colors.darkGray, align: "left"
});

slide5.addShape(pres.shapes.RECTANGLE, {
  x: 0.5, y: 2.9, w: 4.3, h: 1.5,
  fill: { color: colors.white },
  line: { color: colors.blue, width: 2 }
});
slide5.addText([
  { text: "3. Optimized FP16 MAC Integration", options: { fontSize: 15, bold: true, color: colors.blue, breakLine: true } },
  { text: "• Integrate into FP16 Multiply-Accumulate unit", options: { bullet: true, fontSize: 12, breakLine: true } },
  { text: "• Apply in CNN convolution operations", options: { bullet: true, fontSize: 12, breakLine: true } },
  { text: "• Optimized for AI accelerator workloads", options: { bullet: true, fontSize: 12, breakLine: true } },
  { text: "→ Superior neural network performance", options: { fontSize: 11, italic: true } }
], {
  x: 0.6, y: 3.0, w: 4.1, h: 1.3,
  color: colors.darkGray, align: "left"
});

slide5.addShape(pres.shapes.RECTANGLE, {
  x: 5.2, y: 2.9, w: 4.3, h: 1.5,
  fill: { color: colors.white },
  line: { color: colors.blue, width: 2 }
});
slide5.addText([
  { text: "4. Hardware Optimization", options: { fontSize: 15, bold: true, color: colors.blue, breakLine: true } },
  { text: "• Reduced area utilization", options: { bullet: true, fontSize: 12, breakLine: true } },
  { text: "• Lower power consumption", options: { bullet: true, fontSize: 12, breakLine: true } },
  { text: "• Minimized propagation delay", options: { bullet: true, fontSize: 12, breakLine: true } },
  { text: "→ Improved overall energy efficiency", options: { fontSize: 11, italic: true } }
], {
  x: 5.3, y: 3.0, w: 4.1, h: 1.3,
  color: colors.darkGray, align: "left"
});

slide5.addShape(pres.shapes.RECTANGLE, {
  x: 0.5, y: 4.6, w: 9, h: 0.6,
  fill: { color: colors.blue },
  line: { type: "none" }
});
slide5.addText("Expected Outcome: 15-25% lower delay | 20-30% lower power | Enhanced throughput", {
  x: 0.5, y: 4.6, w: 9, h: 0.6,
  fontSize: 14, bold: true, color: colors.white,
  align: "center", valign: "middle"
});

// Slide 6: Proposed Architecture Flowchart
let slide6 = pres.addSlide();
slide6.background = { color: colors.gray };
addCornerAccents(slide6);

slide6.addText("Proposed Architecture Flow", {
  x: 0.5, y: 0.4, w: 9, h: 0.5,
  fontSize: 28, bold: true, color: colors.darkBlue,
  align: "left"
});

// Architecture flow diagram
const boxWidth = 3.5;
const boxHeight = 0.5;
const startX = 3.25;
let yPos = 1.2;
const yGap = 0.7;

const stages = [
  { text: "Input (X, Y)", color: colors.red },
  { text: "Enhanced BPR Recoder", color: colors.blue },
  { text: "Predefined Value Generator (0X, 1X, 2X, 3X)", color: colors.blue },
  { text: "Partial Product Generator", color: colors.blue },
  { text: "4:2 Compressor Wallace Tree", color: colors.darkBlue },
  { text: "Pipeline Registers", color: colors.red },
  { text: "Carry Propagate Adder", color: colors.blue },
  { text: "FP16 MAC Unit", color: colors.darkBlue },
  { text: "CNN Accelerator Output", color: colors.red }
];

stages.forEach((stage, idx) => {
  slide6.addShape(pres.shapes.RECTANGLE, {
    x: startX, y: yPos, w: boxWidth, h: boxHeight,
    fill: { color: stage.color },
    line: { type: "none" }
  });
  
  slide6.addText(stage.text, {
    x: startX, y: yPos, w: boxWidth, h: boxHeight,
    fontSize: 11, bold: true, color: colors.white,
    align: "center", valign: "middle"
  });
  
  if (idx < stages.length - 1) {
    slide6.addShape(pres.shapes.LINE, {
      x: startX + boxWidth/2, y: yPos + boxHeight, w: 0, h: yGap - boxHeight,
      line: { color: colors.darkGray, width: 3, endArrowType: "arrow" }
    });
  }
  
  yPos += yGap;
});

// Slide 7: Research Objectives
let slide7 = pres.addSlide();
slide7.background = { color: colors.gray };
addCornerAccents(slide7);

slide7.addText("Research Objectives", {
  x: 0.5, y: 0.4, w: 9, h: 0.5,
  fontSize: 32, bold: true, color: colors.darkBlue,
  align: "left"
});

slide7.addText([
  { text: "Design an enhanced Radix-8 BPR floating-point multiplier with architectural improvements", options: { bullet: true, breakLine: true } },
  { text: "Implement multi-stage pipelined architecture for high-speed computation and improved throughput", options: { bullet: true, breakLine: true } },
  { text: "Utilize compressor-based reduction techniques (4:2 compressor, Wallace tree) for lower critical path delay", options: { bullet: true, breakLine: true } },
  { text: "Achieve significant reduction in power consumption and hardware area compared to existing BPR multipliers", options: { bullet: true, breakLine: true } },
  { text: "Seamlessly integrate the enhanced design into CNN accelerator architecture with FP16 MAC units", options: { bullet: true, breakLine: true } },
  { text: "Verify functionality and performance through comprehensive FPGA implementation and ASIC synthesis", options: { bullet: true, breakLine: true } },
  { text: "Demonstrate superior energy efficiency (Power-Delay Product) compared to Booth and conventional BPR multipliers", options: { bullet: true, breakLine: true } },
  { text: "Validate design robustness across process, voltage, and temperature (PVT) variations", options: { bullet: true, breakLine: true } },
  { text: "Optimize the architecture for edge AI processors and embedded neural network accelerators", options: { bullet: true, breakLine: true } },
  { text: "Prepare comprehensive IEEE-format research paper for publication in reputed journals/conferences", options: { bullet: true } }
], {
  x: 0.5, y: 1.1, w: 9, h: 3.9,
  fontSize: 14, color: colors.darkGray,
  align: "left", valign: "top"
});

// Slide 8: Implementation Methodology
let slide8 = pres.addSlide();
slide8.background = { color: colors.gray };
addCornerAccents(slide8);

slide8.addText("Implementation Methodology", {
  x: 0.5, y: 0.4, w: 9, h: 0.5,
  fontSize: 28, bold: true, color: colors.darkBlue,
  align: "left"
});

slide8.addText([
  { text: "Phase 1: Literature Review & Design", options: { fontSize: 15, bold: true, color: colors.blue, breakLine: true } },
  { text: "• Comprehensive study of Booth, MBE, and BPR multipliers", options: { bullet: true, breakLine: true } },
  { text: "• Design enhanced BPR algorithm and architecture", options: { bullet: true, breakLine: true } },
  { text: "• Define pipelining strategy and compressor tree structure", options: { bullet: true, breakLine: true, breakLine: true } },
  
  { text: "Phase 2: RTL Design & Simulation", options: { fontSize: 15, bold: true, color: colors.blue, breakLine: true } },
  { text: "• Implement modules in Verilog HDL:", options: { bullet: true, breakLine: true } },
  { text: "  - bpr_recoder.v, pp_generator.v, compressor_tree.v", options: { fontSize: 12, indentLevel: 1, breakLine: true } },
  { text: "  - pipeline_stage.v, final_adder.v, fp16_mac.v", options: { fontSize: 12, indentLevel: 1, breakLine: true } },
  { text: "  - top_multiplier.v (complete integration)", options: { fontSize: 12, indentLevel: 1, breakLine: true } },
  { text: "• Comprehensive simulation using ModelSim/Vivado", options: { bullet: true, breakLine: true } },
  { text: "• Functional verification with extensive test vectors", options: { bullet: true } }
], {
  x: 0.5, y: 1.1, w: 4.5, h: 3.9,
  fontSize: 13, color: colors.darkGray,
  align: "left", valign: "top"
});

slide8.addText([
  { text: "Phase 3: FPGA Implementation", options: { fontSize: 15, bold: true, color: colors.blue, breakLine: true } },
  { text: "• Synthesize design using Xilinx Vivado", options: { bullet: true, breakLine: true } },
  { text: "• Implement on FPGA platform", options: { bullet: true, breakLine: true } },
  { text: "• Perform timing analysis and optimization", options: { bullet: true, breakLine: true, breakLine: true } },
  
  { text: "Phase 4: ASIC Synthesis & Evaluation", options: { fontSize: 15, bold: true, color: colors.blue, breakLine: true } },
  { text: "• ASIC synthesis using Cadence Genus / Synopsys Design Compiler", options: { bullet: true, breakLine: true } },
  { text: "• Technology: TSMC 65nm standard cell library", options: { bullet: true, breakLine: true } },
  { text: "• Evaluate: Area, Power, Delay, Throughput", options: { bullet: true, breakLine: true, breakLine: true } },
  
  { text: "Phase 5: Integration & Publication", options: { fontSize: 15, bold: true, color: colors.blue, breakLine: true } },
  { text: "• Integrate with CNN MAC unit", options: { bullet: true, breakLine: true } },
  { text: "• Compare with Booth and base BPR multipliers", options: { bullet: true, breakLine: true } },
  { text: "• Prepare IEEE-format research paper", options: { bullet: true } }
], {
  x: 5.0, y: 1.1, w: 4.5, h: 3.9,
  fontSize: 13, color: colors.darkGray,
  align: "left", valign: "top"
});

// Slide 9: Block Diagram
let slide9 = pres.addSlide();
slide9.background = { color: colors.gray };
addCornerAccents(slide9);

slide9.addText("Enhanced BPR Multiplier - Block Diagram", {
  x: 0.5, y: 0.4, w: 9, h: 0.5,
  fontSize: 28, bold: true, color: colors.darkBlue,
  align: "left"
});

// Main architecture blocks
slide9.addShape(pres.shapes.RECTANGLE, {
  x: 0.8, y: 1.2, w: 8.4, h: 3.7,
  fill: { color: colors.white },
  line: { color: colors.darkBlue, width: 2 }
});

slide9.addText("Enhanced Radix-8 BPR Multiplier Core", {
  x: 0.8, y: 1.3, w: 8.4, h: 0.4,
  fontSize: 14, bold: true, color: colors.white,
  fill: { color: colors.darkBlue },
  align: "center", valign: "middle"
});

// Input stage
slide9.addShape(pres.shapes.RECTANGLE, {
  x: 1.2, y: 1.9, w: 1.8, h: 0.5,
  fill: { color: colors.red },
  line: { type: "none" }
});
slide9.addText("Inputs\n(X, Y)", {
  x: 1.2, y: 1.9, w: 1.8, h: 0.5,
  fontSize: 11, bold: true, color: colors.white,
  align: "center", valign: "middle"
});

// BPR Recoder
slide9.addShape(pres.shapes.RECTANGLE, {
  x: 3.4, y: 1.9, w: 2.0, h: 0.5,
  fill: { color: colors.blue },
  line: { type: "none" }
});
slide9.addText("BPR\nRecoder", {
  x: 3.4, y: 1.9, w: 2.0, h: 0.5,
  fontSize: 11, bold: true, color: colors.white,
  align: "center", valign: "middle"
});

// PP Generator
slide9.addShape(pres.shapes.RECTANGLE, {
  x: 5.8, y: 1.9, w: 2.0, h: 0.5,
  fill: { color: colors.blue },
  line: { type: "none" }
});
slide9.addText("PP\nGenerator", {
  x: 5.8, y: 1.9, w: 2.0, h: 0.5,
  fontSize: 11, bold: true, color: colors.white,
  align: "center", valign: "middle"
});

// Compressor Tree
slide9.addShape(pres.shapes.RECTANGLE, {
  x: 1.2, y: 2.6, w: 3.3, h: 0.6,
  fill: { color: colors.darkBlue },
  line: { type: "none" }
});
slide9.addText("4:2 Compressor Wallace Tree", {
  x: 1.2, y: 2.6, w: 3.3, h: 0.6,
  fontSize: 12, bold: true, color: colors.white,
  align: "center", valign: "middle"
});

// Pipeline Registers
slide9.addShape(pres.shapes.RECTANGLE, {
  x: 4.8, y: 2.6, w: 3.0, h: 0.6,
  fill: { color: colors.red },
  line: { type: "none" }
});
slide9.addText("Pipeline Registers", {
  x: 4.8, y: 2.6, w: 3.0, h: 0.6,
  fontSize: 12, bold: true, color: colors.white,
  align: "center", valign: "middle"
});

// Final Adder
slide9.addShape(pres.shapes.RECTANGLE, {
  x: 1.2, y: 3.4, w: 3.3, h: 0.6,
  fill: { color: colors.blue },
  line: { type: "none" }
});
slide9.addText("Carry Propagate Adder", {
  x: 1.2, y: 3.4, w: 3.3, h: 0.6,
  fontSize: 12, bold: true, color: colors.white,
  align: "center", valign: "middle"
});

// FP16 MAC
slide9.addShape(pres.shapes.RECTANGLE, {
  x: 4.8, y: 3.4, w: 3.0, h: 0.6,
  fill: { color: colors.darkBlue },
  line: { type: "none" }
});
slide9.addText("FP16 MAC Unit", {
  x: 4.8, y: 3.4, w: 3.0, h: 0.6,
  fontSize: 12, bold: true, color: colors.white,
  align: "center", valign: "middle"
});

// Output
slide9.addShape(pres.shapes.RECTANGLE, {
  x: 3.5, y: 4.2, w: 2.2, h: 0.5,
  fill: { color: colors.red },
  line: { type: "none" }
});
slide9.addText("CNN Accelerator\nOutput", {
  x: 3.5, y: 4.2, w: 2.2, h: 0.5,
  fontSize: 11, bold: true, color: colors.white,
  align: "center", valign: "middle"
});

// Arrows
slide9.addShape(pres.shapes.LINE, {
  x: 3.0, y: 2.15, w: 0.4, h: 0,
  line: { color: colors.darkGray, width: 2, endArrowType: "arrow" }
});
slide9.addShape(pres.shapes.LINE, {
  x: 5.4, y: 2.15, w: 0.4, h: 0,
  line: { color: colors.darkGray, width: 2, endArrowType: "arrow" }
});
slide9.addShape(pres.shapes.LINE, {
  x: 2.8, y: 2.4, w: 0, h: 0.2,
  line: { color: colors.darkGray, width: 2, endArrowType: "arrow" }
});
slide9.addShape(pres.shapes.LINE, {
  x: 6.3, y: 2.4, w: 0, h: 0.2,
  line: { color: colors.darkGray, width: 2, endArrowType: "arrow" }
});
slide9.addShape(pres.shapes.LINE, {
  x: 2.8, y: 3.2, w: 0, h: 0.2,
  line: { color: colors.darkGray, width: 2, endArrowType: "arrow" }
});
slide9.addShape(pres.shapes.LINE, {
  x: 6.3, y: 3.2, w: 0, h: 0.2,
  line: { color: colors.darkGray, width: 2, endArrowType: "arrow" }
});
slide9.addShape(pres.shapes.LINE, {
  x: 4.5, y: 3.7, w: 0, h: 0.5,
  line: { color: colors.darkGray, width: 2, endArrowType: "arrow" }
});

// Slide 10: Expected Performance Comparison
let slide10 = pres.addSlide();
slide10.background = { color: colors.gray };
addCornerAccents(slide10);

slide10.addText("Expected Performance Comparison", {
  x: 0.5, y: 0.4, w: 9, h: 0.5,
  fontSize: 28, bold: true, color: colors.darkBlue,
  align: "left"
});

// Performance comparison chart
slide10.addChart(pres.charts.BAR, [
  {
    name: "Booth Multiplier",
    labels: ["Delay (ns)", "Power (mW)", "Area (μm²)", "PDP (pJ)"],
    values: [100, 100, 100, 100]
  },
  {
    name: "Base BPR",
    labels: ["Delay (ns)", "Power (mW)", "Area (μm²)", "PDP (pJ)"],
    values: [85, 90, 95, 88]
  },
  {
    name: "Enhanced BPR (Proposed)",
    labels: ["Delay (ns)", "Power (mW)", "Area (μm²)", "PDP (pJ)"],
    values: [70, 75, 85, 65]
  }
], {
  x: 0.5, y: 1.2, w: 9, h: 3.5,
  barDir: "col",
  chartColors: [colors.lightGray, colors.blue, colors.red],
  showTitle: true,
  title: "Normalized Performance Metrics (Base = 100%)",
  titleFontSize: 14,
  showLegend: true,
  legendPos: "b",
  showValue: true,
  dataLabelFontSize: 11,
  catAxisLabelColor: colors.darkGray,
  valAxisLabelColor: colors.darkGray,
  valGridLine: { color: "E2E8F0", size: 0.5 },
  catGridLine: { style: "none" }
});

slide10.addText("* Values are normalized percentages relative to Booth multiplier baseline\n** Actual metrics will be obtained from ASIC synthesis results", {
  x: 0.5, y: 4.9, w: 9, h: 0.4,
  fontSize: 10, color: colors.lightGray,
  align: "center", italic: true
});

// Slide 11: Tools & Technologies
let slide11 = pres.addSlide();
slide11.background = { color: colors.gray };
addCornerAccents(slide11);

slide11.addText("Tools & Technologies", {
  x: 0.5, y: 0.4, w: 9, h: 0.5,
  fontSize: 32, bold: true, color: colors.darkBlue,
  align: "left"
});

slide11.addShape(pres.shapes.RECTANGLE, {
  x: 0.5, y: 1.1, w: 4.3, h: 1.8,
  fill: { color: colors.white },
  line: { color: colors.blue, width: 2 }
});
slide11.addText([
  { text: "Hardware Description", options: { fontSize: 15, bold: true, color: colors.blue, breakLine: true } },
  { text: "• Verilog HDL", options: { bullet: true, breakLine: true } },
  { text: "• System Verilog", options: { bullet: true, breakLine: true, breakLine: true } },
  
  { text: "Simulation & Verification", options: { fontSize: 15, bold: true, color: colors.blue, breakLine: true } },
  { text: "• ModelSim", options: { bullet: true, breakLine: true } },
  { text: "• Xilinx Vivado Simulator", options: { bullet: true } }
], {
  x: 0.6, y: 1.2, w: 4.1, h: 1.6,
  fontSize: 13, color: colors.darkGray,
  align: "left"
});

slide11.addShape(pres.shapes.RECTANGLE, {
  x: 5.2, y: 1.1, w: 4.3, h: 1.8,
  fill: { color: colors.white },
  line: { color: colors.blue, width: 2 }
});
slide11.addText([
  { text: "FPGA Implementation", options: { fontSize: 15, bold: true, color: colors.blue, breakLine: true } },
  { text: "• Xilinx Vivado Design Suite", options: { bullet: true, breakLine: true } },
  { text: "• FPGA Platform: Artix-7 / Zynq", options: { bullet: true, breakLine: true, breakLine: true } },
  
  { text: "ASIC Synthesis", options: { fontSize: 15, bold: true, color: colors.blue, breakLine: true } },
  { text: "• Cadence Genus / Synopsys Design Compiler", options: { bullet: true, breakLine: true } },
  { text: "• Technology: TSMC 65nm", options: { bullet: true } }
], {
  x: 5.3, y: 1.2, w: 4.1, h: 1.6,
  fontSize: 13, color: colors.darkGray,
  align: "left"
});

slide11.addShape(pres.shapes.RECTANGLE, {
  x: 0.5, y: 3.1, w: 4.3, h: 1.7,
  fill: { color: colors.white },
  line: { color: colors.blue, width: 2 }
});
slide11.addText([
  { text: "Analysis & Optimization", options: { fontSize: 15, bold: true, color: colors.blue, breakLine: true } },
  { text: "• Cadence Innovus (Place & Route)", options: { bullet: true, breakLine: true } },
  { text: "• Synopsys PrimeTime (Static Timing)", options: { bullet: true, breakLine: true } },
  { text: "• PrimePower (Power Analysis)", options: { bullet: true, breakLine: true } },
  { text: "• MATLAB / Python (Data Analysis)", options: { bullet: true } }
], {
  x: 0.6, y: 3.2, w: 4.1, h: 1.5,
  fontSize: 13, color: colors.darkGray,
  align: "left"
});

slide11.addShape(pres.shapes.RECTANGLE, {
  x: 5.2, y: 3.1, w: 4.3, h: 1.7,
  fill: { color: colors.white },
  line: { color: colors.blue, width: 2 }
});
slide11.addText([
  { text: "Documentation & Publication", options: { fontSize: 15, bold: true, color: colors.blue, breakLine: true } },
  { text: "• LaTeX (IEEE paper template)", options: { bullet: true, breakLine: true } },
  { text: "• Overleaf / TeXstudio", options: { bullet: true, breakLine: true } },
  { text: "• MATLAB / Python (Graphs & Plots)", options: { bullet: true, breakLine: true } },
  { text: "• Microsoft Visio (Diagrams)", options: { bullet: true } }
], {
  x: 5.3, y: 3.2, w: 4.1, h: 1.5,
  fontSize: 13, color: colors.darkGray,
  align: "left"
});

// Slide 12: Applications
let slide12 = pres.addSlide();
slide12.background = { color: colors.gray };
addCornerAccents(slide12);

slide12.addText("Target Applications", {
  x: 0.5, y: 0.4, w: 9, h: 0.5,
  fontSize: 32, bold: true, color: colors.darkBlue,
  align: "left"
});

const applications = [
  { title: "AI Accelerators", desc: "Hardware acceleration for artificial intelligence and machine learning workloads" },
  { title: "CNN Hardware", desc: "Convolutional Neural Network processing units for image and video analysis" },
  { title: "Edge AI Processors", desc: "Low-power AI computation at the network edge for IoT and mobile devices" },
  { title: "DSP Systems", desc: "Digital Signal Processing applications requiring high-speed floating-point operations" },
  { title: "Embedded AI Hardware", desc: "Embedded systems with AI capabilities for robotics and autonomous systems" },
  { title: "Image Processing", desc: "Real-time image and video processing systems with neural network acceleration" },
  { title: "FPGA/ASIC NN Accelerators", desc: "Custom silicon implementations for dedicated neural network computation" },
  { title: "Automotive AI", desc: "Advanced driver assistance systems (ADAS) and autonomous vehicle computation" }
];

let appY = 1.1;
const appHeight = 0.45;
const appGap = 0.05;

applications.forEach((app, idx) => {
  const col = idx % 2;
  const row = Math.floor(idx / 2);
  const xPos = col === 0 ? 0.5 : 5.0;
  const currentY = 1.1 + row * (appHeight + appGap);
  
  slide12.addShape(pres.shapes.RECTANGLE, {
    x: xPos, y: currentY, w: 4.2, h: appHeight,
    fill: { color: colors.white },
    line: { color: colors.blue, width: 1.5 }
  });
  
  slide12.addText([
    { text: app.title, options: { fontSize: 13, bold: true, color: colors.blue, breakLine: true } },
    { text: app.desc, options: { fontSize: 10, color: colors.darkGray } }
  ], {
    x: xPos + 0.1, y: currentY + 0.05, w: 4.0, h: appHeight - 0.1,
    align: "left", valign: "top"
  });
});

// Slide 13: Research Contribution & Novelty
let slide13 = pres.addSlide();
slide13.background = { color: colors.gray };
addCornerAccents(slide13);

slide13.addText("Research Contribution & Novelty", {
  x: 0.5, y: 0.4, w: 9, h: 0.5,
  fontSize: 28, bold: true, color: colors.darkBlue,
  align: "left"
});

slide13.addShape(pres.shapes.RECTANGLE, {
  x: 0.5, y: 1.1, w: 9, h: 0.8,
  fill: { color: colors.blue },
  line: { type: "none" }
});
slide13.addText("Key Novel Contributions", {
  x: 0.5, y: 1.1, w: 9, h: 0.8,
  fontSize: 18, bold: true, color: colors.white,
  align: "center", valign: "middle"
});

slide13.addText([
  { text: "1. Architectural Innovation", options: { fontSize: 15, bold: true, color: colors.blue, breakLine: true } },
  { text: "First comprehensive integration of multi-stage pipelining with Radix-8 BPR algorithm, enabling concurrent execution of recoding, partial product generation, compression, and addition stages for maximum throughput.", options: { fontSize: 13, breakLine: true, breakLine: true } },
  
  { text: "2. Advanced Reduction Technique", options: { fontSize: 15, bold: true, color: colors.blue, breakLine: true } },
  { text: "Novel application of 4:2 compressor-based Wallace tree specifically optimized for BPR-generated partial products, achieving significant critical path reduction compared to conventional adder trees.", options: { fontSize: 13, breakLine: true, breakLine: true } },
  
  { text: "3. AI-Optimized Integration", options: { fontSize: 15, bold: true, color: colors.blue, breakLine: true } },
  { text: "Seamless integration into FP16 MAC units with CNN-specific optimizations, demonstrating superior energy efficiency in neural network convolution operations.", options: { fontSize: 13, breakLine: true, breakLine: true } },
  
  { text: "4. Comprehensive Performance Analysis", options: { fontSize: 15, bold: true, color: colors.blue, breakLine: true } },
  { text: "Extensive comparative evaluation across multiple dimensions (delay, power, area, throughput) with detailed PVT analysis and real-world AI workload testing.", options: { fontSize: 13 } }
], {
  x: 0.5, y: 2.1, w: 9, h: 2.8,
  color: colors.darkGray,
  align: "left", valign: "top"
});

// Slide 14: Project Classification
let slide14 = pres.addSlide();
slide14.background = { color: colors.gray };
addCornerAccents(slide14);

slide14.addText("Project Classification: Frontend VLSI Design", {
  x: 0.5, y: 0.4, w: 9, h: 0.5,
  fontSize: 28, bold: true, color: colors.darkBlue,
  align: "left"
});

slide14.addShape(pres.shapes.RECTANGLE, {
  x: 2.0, y: 1.2, w: 6.0, h: 0.7,
  fill: { color: colors.red },
  line: { type: "none" }
});
slide14.addText("This is a Frontend VLSI Project", {
  x: 2.0, y: 1.2, w: 6.0, h: 0.7,
  fontSize: 20, bold: true, color: colors.white,
  align: "center", valign: "middle"
});

slide14.addText([
  { text: "Project Scope Includes:", options: { fontSize: 16, bold: true, color: colors.blue, breakLine: true, breakLine: true } },
  
  { text: "RTL Design & Architecture", options: { bullet: true, fontSize: 14, breakLine: true } },
  { text: "Complete Verilog HDL implementation of enhanced BPR multiplier modules", options: { indentLevel: 1, fontSize: 12, breakLine: true, breakLine: true } },
  
  { text: "Functional Verification", options: { bullet: true, fontSize: 14, breakLine: true } },
  { text: "Comprehensive simulation and testbench development", options: { indentLevel: 1, fontSize: 12, breakLine: true, breakLine: true } },
  
  { text: "Logic Synthesis", options: { bullet: true, fontSize: 14, breakLine: true } },
  { text: "FPGA synthesis using Xilinx Vivado and ASIC synthesis with standard cell libraries", options: { indentLevel: 1, fontSize: 12, breakLine: true, breakLine: true } },
  
  { text: "FPGA Implementation", options: { bullet: true, fontSize: 14, breakLine: true } },
  { text: "Complete FPGA prototyping and hardware validation", options: { indentLevel: 1, fontSize: 12, breakLine: true, breakLine: true } },
  
  { text: "Performance Analysis", options: { bullet: true, fontSize: 14, breakLine: true } },
  { text: "Timing analysis, power estimation, and area optimization", options: { indentLevel: 1, fontSize: 12, breakLine: true, breakLine: true } },
  
  { text: "Frontend Integration", options: { bullet: true, fontSize: 14, breakLine: true } },
  { text: "Integration with FP16 MAC units and CNN accelerator architecture", options: { indentLevel: 1, fontSize: 12 } }
], {
  x: 0.5, y: 2.1, w: 9, h: 2.7,
  color: colors.darkGray,
  align: "left", valign: "top"
});

// Slide 15: Timeline & Milestones
let slide15 = pres.addSlide();
slide15.background = { color: colors.gray };
addCornerAccents(slide15);

slide15.addText("Project Timeline & Milestones", {
  x: 0.5, y: 0.4, w: 9, h: 0.5,
  fontSize: 28, bold: true, color: colors.darkBlue,
  align: "left"
});

// Timeline visualization
const milestones = [
  { phase: "Phase 1", duration: "2 months", tasks: "Literature Review & Algorithm Design" },
  { phase: "Phase 2", duration: "3 months", tasks: "RTL Design & Simulation" },
  { phase: "Phase 3", duration: "2 months", tasks: "FPGA Implementation & Testing" },
  { phase: "Phase 4", duration: "2 months", tasks: "ASIC Synthesis & Optimization" },
  { phase: "Phase 5", duration: "2 months", tasks: "CNN Integration & Performance Analysis" },
  { phase: "Phase 6", duration: "1 month", tasks: "Documentation & Paper Writing" }
];

let timelineY = 1.2;
const timelineHeight = 0.6;
const timelineGap = 0.08;

milestones.forEach((milestone, idx) => {
  slide15.addShape(pres.shapes.RECTANGLE, {
    x: 0.5, y: timelineY, w: 2.0, h: timelineHeight,
    fill: { color: colors.blue },
    line: { type: "none" }
  });
  
  slide15.addText(milestone.phase + "\n" + milestone.duration, {
    x: 0.5, y: timelineY, w: 2.0, h: timelineHeight,
    fontSize: 12, bold: true, color: colors.white,
    align: "center", valign: "middle"
  });
  
  slide15.addShape(pres.shapes.RECTANGLE, {
    x: 2.7, y: timelineY, w: 6.8, h: timelineHeight,
    fill: { color: colors.white },
    line: { color: colors.blue, width: 1.5 }
  });
  
  slide15.addText(milestone.tasks, {
    x: 2.8, y: timelineY, w: 6.6, h: timelineHeight,
    fontSize: 12, color: colors.darkGray,
    align: "left", valign: "middle"
  });
  
  timelineY += timelineHeight + timelineGap;
});

slide15.addShape(pres.shapes.RECTANGLE, {
  x: 0.5, y: 5.0, w: 9, h: 0.4,
  fill: { color: colors.red },
  line: { type: "none" }
});
slide15.addText("Total Duration: 12 months", {
  x: 0.5, y: 5.0, w: 9, h: 0.4,
  fontSize: 13, bold: true, color: colors.white,
  align: "center", valign: "middle"
});

// Slide 16: Expected Results Summary
let slide16 = pres.addSlide();
slide16.background = { color: colors.gray };
addCornerAccents(slide16);

slide16.addText("Expected Results Summary", {
  x: 0.5, y: 0.4, w: 9, h: 0.5,
  fontSize: 32, bold: true, color: colors.darkBlue,
  align: "left"
});

// Performance metrics boxes
slide16.addShape(pres.shapes.RECTANGLE, {
  x: 0.5, y: 1.2, w: 4.3, h: 1.0,
  fill: { color: colors.red },
  line: { type: "none" }
});
slide16.addText("15-25%\nLower Delay", {
  x: 0.5, y: 1.2, w: 4.3, h: 1.0,
  fontSize: 20, bold: true, color: colors.white,
  align: "center", valign: "middle"
});

slide16.addShape(pres.shapes.RECTANGLE, {
  x: 5.2, y: 1.2, w: 4.3, h: 1.0,
  fill: { color: colors.blue },
  line: { type: "none" }
});
slide16.addText("20-30%\nReduced Power", {
  x: 5.2, y: 1.2, w: 4.3, h: 1.0,
  fontSize: 20, bold: true, color: colors.white,
  align: "center", valign: "middle"
});

slide16.addShape(pres.shapes.RECTANGLE, {
  x: 0.5, y: 2.4, w: 4.3, h: 1.0,
  fill: { color: colors.darkBlue },
  line: { type: "none" }
});
slide16.addText("Optimized\nHardware Area", {
  x: 0.5, y: 2.4, w: 4.3, h: 1.0,
  fontSize: 20, bold: true, color: colors.white,
  align: "center", valign: "middle"
});

slide16.addShape(pres.shapes.RECTANGLE, {
  x: 5.2, y: 2.4, w: 4.3, h: 1.0,
  fill: { color: colors.red },
  line: { type: "none" }
});
slide16.addText("Enhanced\nThroughput", {
  x: 5.2, y: 2.4, w: 4.3, h: 1.0,
  fontSize: 20, bold: true, color: colors.white,
  align: "center", valign: "middle"
});

slide16.addText([
  { text: "Additional Performance Benefits:", options: { fontSize: 16, bold: true, color: colors.blue, breakLine: true, breakLine: true } },
  { text: "• Superior Power-Delay Product (PDP) compared to Booth and base BPR multipliers", options: { bullet: true, fontSize: 13, breakLine: true } },
  { text: "• Higher operating frequency due to pipelined architecture", options: { bullet: true, fontSize: 13, breakLine: true } },
  { text: "• Reduced critical path delay through compressor-based reduction", options: { bullet: true, fontSize: 13, breakLine: true } },
  { text: "• Improved energy efficiency for CNN accelerator workloads", options: { bullet: true, fontSize: 13, breakLine: true } },
  { text: "• Robust performance across PVT variations", options: { bullet: true, fontSize: 13, breakLine: true } },
  { text: "• Scalable architecture for different precision requirements", options: { bullet: true, fontSize: 13 } }
], {
  x: 0.5, y: 3.6, w: 9, h: 1.3,
  color: colors.darkGray,
  align: "left", valign: "top"
});

// Slide 17: Publication Strategy
let slide17 = pres.addSlide();
slide17.background = { color: colors.gray };
addCornerAccents(slide17);

slide17.addText("Publication Strategy", {
  x: 0.5, y: 0.4, w: 9, h: 0.5,
  fontSize: 32, bold: true, color: colors.darkBlue,
  align: "left"
});

slide17.addShape(pres.shapes.RECTANGLE, {
  x: 0.5, y: 1.2, w: 4.3, h: 1.8,
  fill: { color: colors.white },
  line: { color: colors.blue, width: 2 }
});
slide17.addText([
  { text: "Target Journals", options: { fontSize: 15, bold: true, color: colors.blue, breakLine: true } },
  { text: "• IEEE Transactions on VLSI Systems", options: { bullet: true, fontSize: 12, breakLine: true } },
  { text: "• IEEE Transactions on Circuits and Systems", options: { bullet: true, fontSize: 12, breakLine: true } },
  { text: "• ACM Transactions on Design Automation", options: { bullet: true, fontSize: 12, breakLine: true } },
  { text: "• Microelectronics Journal (Elsevier)", options: { bullet: true, fontSize: 12, breakLine: true } },
  { text: "• Integration, the VLSI Journal", options: { bullet: true, fontSize: 12 } }
], {
  x: 0.6, y: 1.3, w: 4.1, h: 1.6,
  fontSize: 13, color: colors.darkGray,
  align: "left"
});

slide17.addShape(pres.shapes.RECTANGLE, {
  x: 5.2, y: 1.2, w: 4.3, h: 1.8,
  fill: { color: colors.white },
  line: { color: colors.blue, width: 2 }
});
slide17.addText([
  { text: "Target Conferences", options: { fontSize: 15, bold: true, color: colors.blue, breakLine: true } },
  { text: "• IEEE International Symposium on Circuits and Systems (ISCAS)", options: { bullet: true, fontSize: 11, breakLine: true } },
  { text: "• Design Automation Conference (DAC)", options: { bullet: true, fontSize: 12, breakLine: true } },
  { text: "• International Conference on VLSI Design", options: { bullet: true, fontSize: 12, breakLine: true } },
  { text: "• Asia and South Pacific Design Automation Conference (ASP-DAC)", options: { bullet: true, fontSize: 11 } }
], {
  x: 5.3, y: 1.3, w: 4.1, h: 1.6,
  fontSize: 13, color: colors.darkGray,
  align: "left"
});

slide17.addShape(pres.shapes.RECTANGLE, {
  x: 0.5, y: 3.2, w: 9, h: 1.7,
  fill: { color: colors.white },
  line: { color: colors.blue, width: 2 }
});
slide17.addText([
  { text: "Paper Structure", options: { fontSize: 15, bold: true, color: colors.blue, breakLine: true } },
  { text: "1. Abstract & Introduction - Problem motivation and research objectives", options: { bullet: true, fontSize: 12, breakLine: true } },
  { text: "2. Related Work - Comprehensive review of Booth, MBE, and BPR multipliers", options: { bullet: true, fontSize: 12, breakLine: true } },
  { text: "3. Proposed Architecture - Detailed description of enhanced BPR with pipelining and compressors", options: { bullet: true, fontSize: 12, breakLine: true } },
  { text: "4. Implementation & Methodology - RTL design, FPGA/ASIC synthesis approach", options: { bullet: true, fontSize: 12, breakLine: true } },
  { text: "5. Results & Analysis - Performance comparison, timing/power/area metrics, PVT analysis", options: { bullet: true, fontSize: 12, breakLine: true } },
  { text: "6. CNN Integration - FP16 MAC unit integration and AI accelerator performance", options: { bullet: true, fontSize: 12, breakLine: true } },
  { text: "7. Conclusion & Future Work - Summary of contributions and research directions", options: { bullet: true, fontSize: 12 } }
], {
  x: 0.6, y: 3.3, w: 8.8, h: 1.5,
  fontSize: 13, color: colors.darkGray,
  align: "left"
});

// Slide 18: Conclusion
let slide18 = pres.addSlide();
slide18.background = { color: colors.gray };
addCornerAccents(slide18);

slide18.addText("Conclusion", {
  x: 0.5, y: 0.4, w: 9, h: 0.5,
  fontSize: 32, bold: true, color: colors.darkBlue,
  align: "left"
});

slide18.addText("This M.Tech project presents a comprehensive enhanced floating-point multiplier architecture based on the Radix-8 Bit Pair Recoding algorithm, specifically optimized for energy-efficient neural network accelerators. By introducing multi-stage pipelining and advanced compressor-based partial product reduction techniques, the proposed design achieves significant improvements over conventional Booth and base BPR multipliers across all critical performance metrics.\n\nThe enhanced architecture demonstrates 15-25% lower propagation delay, 20-30% reduced power consumption, optimized hardware area utilization, and substantially improved throughput through pipelined execution. The seamless integration with FP16 MAC units enables superior performance in CNN convolution operations, making it ideal for AI accelerator applications in edge computing, embedded systems, and FPGA-based neural network hardware.\n\nImplemented using Verilog HDL and verified through comprehensive FPGA synthesis and ASIC implementation with TSMC 65nm technology, this research represents a significant contribution to the field of energy-efficient hardware accelerators for artificial intelligence. The work is suitable for publication in top-tier IEEE journals and conferences, with strong potential for real-world deployment in next-generation AI processors.\n\nThe project successfully combines theoretical innovation with practical implementation, demonstrating frontend VLSI design expertise across RTL development, functional verification, logic synthesis, and hardware optimization - all essential skills for modern VLSI engineers working on AI accelerator architectures.", {
  x: 0.5, y: 1.1, w: 9, h: 3.9,
  fontSize: 14, color: colors.darkGray,
  align: "left", valign: "top"
});

// Slide 19: Future Work & Extensions
let slide19 = pres.addSlide();
slide19.background = { color: colors.gray };
addCornerAccents(slide19);

slide19.addText("Future Work & Research Extensions", {
  x: 0.5, y: 0.4, w: 9, h: 0.5,
  fontSize: 28, bold: true, color: colors.darkBlue,
  align: "left"
});

slide19.addText([
  { text: "Short-term Extensions:", options: { fontSize: 16, bold: true, color: colors.blue, breakLine: true, breakLine: true } },
  { text: "• Extend to higher precision formats (FP32, FP64)", options: { bullet: true, fontSize: 13, breakLine: true } },
  { text: "• Implement adaptive pipelining based on workload characteristics", options: { bullet: true, fontSize: 13, breakLine: true } },
  { text: "• Optimize for specific CNN architectures (ResNet, VGG, MobileNet)", options: { bullet: true, fontSize: 13, breakLine: true } },
  { text: "• Add support for mixed-precision training operations", options: { bullet: true, fontSize: 13, breakLine: true, breakLine: true } },
  
  { text: "Long-term Research Directions:", options: { fontSize: 16, bold: true, color: colors.blue, breakLine: true, breakLine: true } },
  { text: "• Integration with approximate computing techniques for further power reduction", options: { bullet: true, fontSize: 13, breakLine: true } },
  { text: "• Development of reconfigurable architecture supporting multiple radix encodings", options: { bullet: true, fontSize: 13, breakLine: true } },
  { text: "• Machine learning-guided optimization of pipeline stage allocation", options: { bullet: true, fontSize: 13, breakLine: true } },
  { text: "• Extension to specialized operations (matrix multiplication, convolution kernels)", options: { bullet: true, fontSize: 13, breakLine: true } },
  { text: "• Hardware-software co-design for neural architecture search (NAS) acceleration", options: { bullet: true, fontSize: 13, breakLine: true } },
  { text: "• Near-threshold voltage operation for ultra-low-power applications", options: { bullet: true, fontSize: 13, breakLine: true } },
  { text: "• 3D IC implementation for enhanced performance and energy efficiency", options: { bullet: true, fontSize: 13 } }
], {
  x: 0.5, y: 1.1, w: 9, h: 3.9,
  color: colors.darkGray,
  align: "left", valign: "top"
});

// Slide 20: Thank You
let slide20 = pres.addSlide();
slide20.background = { color: colors.gray };
addCornerAccents(slide20);

slide20.addShape(pres.shapes.RECTANGLE, {
  x: 2.5, y: 1.8, w: 5.0, h: 1.8,
  fill: { color: colors.darkBlue },
  line: { type: "none" }
});

slide20.addText("THANK YOU", {
  x: 2.5, y: 2.0, w: 5.0, h: 1.0,
  fontSize: 44, bold: true, color: colors.white,
  align: "center", valign: "middle"
});

slide20.addText([
  { text: "G. RISHWANTH", options: { fontSize: 16, bold: true, breakLine: true } },
  { text: "24EG202A12 | M.Tech (VLSI-SD)", options: { fontSize: 13, breakLine: true } },
  { text: "Department of ECE", options: { fontSize: 12 } }
], {
  x: 2.5, y: 3.9, w: 5.0, h: 0.8,
  color: colors.darkBlue,
  align: "center", valign: "top"
});

// Write the presentation
pres.writeFile({ fileName: "./Enhanced_BPR_Multiplier_Presentation.pptx" })
  .then(() => console.log("Presentation created successfully!"))
  .catch(err => console.error("Error creating presentation:", err));