param([Parameter(Mandatory=$true)][int]$TargetProcessId)
$ErrorActionPreference = 'Stop'
Add-Type @'
using System;
using System.Runtime.InteropServices;
public static class WindowDpiCheck {
    public delegate bool EnumWindowCallback(IntPtr window, IntPtr data);
    [DllImport("user32.dll")] public static extern bool EnumWindows(EnumWindowCallback callback, IntPtr data);
    [DllImport("user32.dll")] public static extern uint GetWindowThreadProcessId(IntPtr window, out uint process);
    [DllImport("user32.dll")] public static extern int GetWindowTextLength(IntPtr window);
    public static IntPtr FindWindow(uint process) {
        IntPtr result = IntPtr.Zero;
        EnumWindows((window, data) => {
            uint owner; GetWindowThreadProcessId(window, out owner);
            if (owner != process || GetWindowTextLength(window) == 0) return true;
            result = window; return false;
        }, IntPtr.Zero);
        return result;
    }
    [DllImport("user32.dll")] public static extern IntPtr GetWindowDpiAwarenessContext(IntPtr window);
    [DllImport("user32.dll")] public static extern bool AreDpiAwarenessContextsEqual(IntPtr first, IntPtr second);
    [DllImport("user32.dll")] public static extern uint GetDpiForWindow(IntPtr window);
}
'@
$window = [WindowDpiCheck]::FindWindow($TargetProcessId)
if ($window -eq 0) { throw 'Game window not found.' }
$context = [WindowDpiCheck]::GetWindowDpiAwarenessContext($window)
[ordered]@{
    perMonitorV2 = [WindowDpiCheck]::AreDpiAwarenessContextsEqual($context, [IntPtr](-4))
    dpi = [WindowDpiCheck]::GetDpiForWindow($window)
} | ConvertTo-Json -Compress
