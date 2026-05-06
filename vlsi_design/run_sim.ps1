#!/usr/bin/env pwsh
# PowerShell Simulation Script for Enhanced BPR Multiplier
# Compile and run using Icarus Verilog

param(
    [string]$SimTool = "icarus",  # Options: icarus, vivado, modelsim
    [string]$SimTime = "1000ns",
    [switch]$ViewWaveform = $false
)

Write-Host "╔═══════════════════════════════════════════════════════╗" -ForegroundColor Cyan
Write-Host "║  Enhanced BPR Multiplier Simulation Script            ║" -ForegroundColor Cyan
Write-Host "║  VLSI System Design Project                          ║" -ForegroundColor Cyan
Write-Host "╚═══════════════════════════════════════════════════════╝" -ForegroundColor Cyan
Write-Host ""

# Define file paths
$RtlDir = ".\rtl"
$TbDir = ".\testbench"
$SimDir = ".\simulation"
$OutputDir = ".\simulation_results"

# Create directories
if (!(Test-Path $SimDir)) { New-Item -ItemType Directory -Path $SimDir -Force | Out-Null }
if (!(Test-Path $OutputDir)) { New-Item -ItemType Directory -Path $OutputDir -Force | Out-Null }

Write-Host "[*] Simulation Tool: $SimTool" -ForegroundColor Yellow
Write-Host "[*] Simulation Time: $SimTime" -ForegroundColor Yellow
Write-Host "[*] RTL Directory: $RtlDir" -ForegroundColor Yellow
Write-Host "[*] Testbench: $TbDir" -ForegroundColor Yellow
Write-Host ""

# RTL source files
$RtlFiles = @(
    "$RtlDir/bpr_recoder.v",
    "$RtlDir/pp_generator.v",
    "$RtlDir/compressor_tree.v",
    "$RtlDir/pipeline_stage.v",
    "$RtlDir/final_adder.v",
    "$RtlDir/fp16_mac.v",
    "$RtlDir/top_multiplier.v"
)

$TbFile = "$TbDir/tb_top_multiplier.v"

# Verify files exist
Write-Host "[*] Verifying source files..." -ForegroundColor Yellow
$FilesValid = $true
foreach ($file in $RtlFiles + $TbFile) {
    if (!(Test-Path $file)) {
        Write-Host "    [✗] NOT FOUND: $file" -ForegroundColor Red
        $FilesValid = $false
    } else {
        Write-Host "    [✓] $file" -ForegroundColor Green
    }
}

if (!$FilesValid) {
    Write-Host ""
    Write-Host "[!] ERROR: Some files not found. Exiting." -ForegroundColor Red
    exit 1
}

Write-Host ""

# Run simulation based on selected tool
if ($SimTool -eq "icarus") {
    RunIcarusVerilogSimulation
} elseif ($SimTool -eq "vivado") {
    RunVivadoSimulation
} elseif ($SimTool -eq "modelsim") {
    RunModelSimSimulation
} else {
    Write-Host "[!] ERROR: Unknown simulation tool: $SimTool" -ForegroundColor Red
    Write-Host "    Valid options: icarus, vivado, modelsim" -ForegroundColor Yellow
    exit 1
}

function RunIcarusVerilogSimulation {
    Write-Host "╔═══════════════════════════════════════════════════════╗" -ForegroundColor Cyan
    Write-Host "║  Running Icarus Verilog Simulation                    ║" -ForegroundColor Cyan
    Write-Host "╚═══════════════════════════════════════════════════════╝" -ForegroundColor Cyan
    Write-Host ""
    
    # Check if iverilog is installed
    $IverilogPath = Get-Command iverilog -ErrorAction SilentlyContinue
    if (!$IverilogPath) {
        Write-Host "[!] ERROR: iverilog not found in PATH" -ForegroundColor Red
        Write-Host "    Install Icarus Verilog from: http://iverilog.icarus.com/" -ForegroundColor Yellow
        exit 1
    }
    
    Write-Host "[*] Using iverilog: $($IverilogPath.Source)" -ForegroundColor Green
    Write-Host ""
    
    # Compile
    Write-Host "[*] Compiling RTL and testbench..." -ForegroundColor Yellow
    Push-Location $SimDir
    
    $CompileCmd = "iverilog -o multiplier_sim -g2009 $(Resolve-Path ..\$TbFile) $(Resolve-Path ..\$RtlDir\*.v)"
    Write-Host "    Command: $CompileCmd" -ForegroundColor Cyan
    
    Invoke-Expression $CompileCmd
    
    if ($LASTEXITCODE -ne 0) {
        Write-Host "[✗] Compilation FAILED" -ForegroundColor Red
        Pop-Location
        exit 1
    }
    Write-Host "[✓] Compilation SUCCESSFUL" -ForegroundColor Green
    Write-Host ""
    
    # Run simulation
    Write-Host "[*] Running simulation..." -ForegroundColor Yellow
    Write-Host "    Time: $SimTime" -ForegroundColor Cyan
    
    # Create vvp command with VCD generation
    $RunCmd = "vvp -n multiplier_sim -vcd"
    Write-Host "    Command: $RunCmd" -ForegroundColor Cyan
    Write-Host ""
    
    # Run and capture output
    $SimOutput = & vvp -n multiplier_sim -vcd 2>&1
    
    if ($LASTEXITCODE -eq 0) {
        Write-Host "[✓] Simulation COMPLETED SUCCESSFULLY" -ForegroundColor Green
    } else {
        Write-Host "[✗] Simulation FAILED" -ForegroundColor Red
    }
    
    Write-Host ""
    Write-Host "═══════════════════════════════════════════════════════" -ForegroundColor Cyan
    Write-Host "SIMULATION OUTPUT:" -ForegroundColor Yellow
    Write-Host "═══════════════════════════════════════════════════════" -ForegroundColor Cyan
    Write-Host ""
    
    # Display simulation output
    Write-Host $SimOutput
    
    # Check for waveform file
    if (Test-Path "multiplier_waveform.vcd") {
        Write-Host ""
        Write-Host "═══════════════════════════════════════════════════════" -ForegroundColor Green
        Write-Host "[✓] Waveform file generated: multiplier_waveform.vcd" -ForegroundColor Green
        Write-Host "    Location: $(Resolve-Path multiplier_waveform.vcd)" -ForegroundColor Cyan
        
        # Save waveform to output directory
        Copy-Item multiplier_waveform.vcd ..\$OutputDir\multiplier_waveform.vcd -Force
        Write-Host "[✓] Waveform copied to: ..\$OutputDir\multiplier_waveform.vcd" -ForegroundColor Green
    }
    
    Pop-Location
}

function RunVivadoSimulation {
    Write-Host "╔═══════════════════════════════════════════════════════╗" -ForegroundColor Cyan
    Write-Host "║  Running Xilinx Vivado Simulation                     ║" -ForegroundColor Cyan
    Write-Host "╚═══════════════════════════════════════════════════════╝" -ForegroundColor Cyan
    Write-Host ""
    
    Write-Host "[*] Starting Vivado..." -ForegroundColor Yellow
    Write-Host "    Project: ./vivado_sim" -ForegroundColor Cyan
    Write-Host "    Script: run_simulation.tcl" -ForegroundColor Cyan
    Write-Host ""
    
    vivado -mode batch -source .\run_simulation.tcl
    
    if ($LASTEXITCODE -eq 0) {
        Write-Host "[✓] Vivado Simulation COMPLETED SUCCESSFULLY" -ForegroundColor Green
    } else {
        Write-Host "[✗] Vivado Simulation FAILED" -ForegroundColor Red
    }
}

function RunModelSimSimulation {
    Write-Host "╔═══════════════════════════════════════════════════════╗" -ForegroundColor Cyan
    Write-Host "║  Running ModelSim Simulation                          ║" -ForegroundColor Cyan
    Write-Host "╚═══════════════════════════════════════════════════════╝" -ForegroundColor Cyan
    Write-Host ""
    
    Write-Host "[*] Starting ModelSim..." -ForegroundColor Yellow
    Write-Host "    Do file: modelsim.do" -ForegroundColor Cyan
    Write-Host ""
    
    vsim -do modelsim.do
    
    if ($LASTEXITCODE -eq 0) {
        Write-Host "[✓] ModelSim Simulation COMPLETED SUCCESSFULLY" -ForegroundColor Green
    } else {
        Write-Host "[✗] ModelSim Simulation FAILED" -ForegroundColor Red
    }
}

Write-Host ""
Write-Host "═══════════════════════════════════════════════════════" -ForegroundColor Cyan
Write-Host "SIMULATION COMPLETE" -ForegroundColor Green
Write-Host "═══════════════════════════════════════════════════════" -ForegroundColor Cyan
Write-Host ""
Write-Host "Output files:" -ForegroundColor Yellow
Write-Host "  - Simulation results: .\simulation\multiplier_sim" -ForegroundColor Cyan
Write-Host "  - Waveform traces: .\simulation_results\multiplier_waveform.vcd" -ForegroundColor Cyan
Write-Host ""
