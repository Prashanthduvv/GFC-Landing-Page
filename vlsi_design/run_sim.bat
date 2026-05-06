@echo off
REM Batch script for Enhanced BPR Multiplier Simulation
REM Windows Command Prompt compatible

setlocal enabledelayedexpansion

echo.
echo ╔═══════════════════════════════════════════════════════╗
echo ║  Enhanced BPR Multiplier Simulation                  ║
echo ║  VLSI System Design Project                          ║
echo ╚═══════════════════════════════════════════════════════╝
echo.

REM Set directories
set RTL_DIR=rtl
set TB_DIR=testbench
set SIM_DIR=simulation
set OUTPUT_DIR=simulation_results

REM Create directories if they don't exist
if not exist "%SIM_DIR%" mkdir "%SIM_DIR%"
if not exist "%OUTPUT_DIR%" mkdir "%OUTPUT_DIR%"

REM Check for Icarus Verilog
echo [*] Checking for Icarus Verilog...
iverilog -version >nul 2>&1
if errorlevel 1 (
    echo [X] ERROR: iverilog not found in PATH
    echo     Install from: http://iverilog.icarus.com/
    pause
    exit /b 1
)
echo [OK] iverilog found
echo.

REM Verify source files
echo [*] Verifying source files...
set FILES_OK=1

for %%F in (
    "%RTL_DIR%\bpr_recoder.v"
    "%RTL_DIR%\pp_generator.v"
    "%RTL_DIR%\compressor_tree.v"
    "%RTL_DIR%\pipeline_stage.v"
    "%RTL_DIR%\final_adder.v"
    "%RTL_DIR%\fp16_mac.v"
    "%RTL_DIR%\top_multiplier.v"
    "%TB_DIR%\tb_top_multiplier.v"
) do (
    if exist "%%F" (
        echo [OK] %%F
    ) else (
        echo [X] MISSING: %%F
        set FILES_OK=0
    )
)

if "%FILES_OK%"=="0" (
    echo.
    echo [X] ERROR: Some files are missing
    pause
    exit /b 1
)
echo.

REM Compile
echo ╔═══════════════════════════════════════════════════════╗
echo ║  Compilation                                          ║
echo ╚═══════════════════════════════════════════════════════╝
echo.

echo [*] Compiling RTL and testbench...
cd "%SIM_DIR%"

iverilog -o multiplier_sim -g2009 ^
    ..\%TB_DIR%\tb_top_multiplier.v ^
    ..\%RTL_DIR%\bpr_recoder.v ^
    ..\%RTL_DIR%\pp_generator.v ^
    ..\%RTL_DIR%\compressor_tree.v ^
    ..\%RTL_DIR%\pipeline_stage.v ^
    ..\%RTL_DIR%\final_adder.v ^
    ..\%RTL_DIR%\fp16_mac.v ^
    ..\%RTL_DIR%\top_multiplier.v

if errorlevel 1 (
    echo [X] Compilation FAILED
    cd ..
    pause
    exit /b 1
)
echo [OK] Compilation SUCCESSFUL
echo.

REM Run simulation
echo ╔═══════════════════════════════════════════════════════╗
echo ║  Running Simulation                                   ║
echo ╚═══════════════════════════════════════════════════════╝
echo.

echo [*] Running simulation with waveform generation...
vvp -n multiplier_sim -vcd

if errorlevel 1 (
    echo [X] Simulation FAILED
    cd ..
    pause
    exit /b 1
)
echo [OK] Simulation COMPLETED SUCCESSFULLY
echo.

REM Check for waveform
if exist "multiplier_waveform.vcd" (
    echo ╔═══════════════════════════════════════════════════════╗
    echo ║  Results                                              ║
    echo ╚═══════════════════════════════════════════════════════╝
    echo.
    echo [OK] Waveform generated: multiplier_waveform.vcd
    
    REM Copy to output directory
    copy /Y multiplier_waveform.vcd ..\%OUTPUT_DIR%\multiplier_waveform.vcd >nul
    echo [OK] Waveform copied to: ..\%OUTPUT_DIR%\multiplier_waveform.vcd
    echo.
    
    echo To view waveforms:
    echo   gtkwave multiplier_waveform.vcd
) else (
    echo [X] Waveform file not generated
)

cd ..

echo.
echo ╔═══════════════════════════════════════════════════════╗
echo ║  SIMULATION COMPLETE                                  ║
echo ╚═══════════════════════════════════════════════════════╝
echo.

pause
