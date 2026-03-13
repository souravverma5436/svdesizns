# PowerShell script to change DNS to Google DNS (8.8.8.8)
# Run as Administrator

Write-Host "🔧 MongoDB DNS Fix Script" -ForegroundColor Cyan
Write-Host "=========================" -ForegroundColor Cyan
Write-Host ""

# Check if running as administrator
$isAdmin = ([Security.Principal.WindowsPrincipal] [Security.Principal.WindowsIdentity]::GetCurrent()).IsInRole([Security.Principal.WindowsBuiltInRole]::Administrator)

if (-not $isAdmin) {
    Write-Host "❌ This script must be run as Administrator!" -ForegroundColor Red
    Write-Host ""
    Write-Host "Right-click PowerShell and select 'Run as Administrator'" -ForegroundColor Yellow
    Write-Host "Then run this script again." -ForegroundColor Yellow
    pause
    exit
}

Write-Host "✅ Running as Administrator" -ForegroundColor Green
Write-Host ""

# Get active network adapters
$adapters = Get-NetAdapter | Where-Object {$_.Status -eq "Up"}

if ($adapters.Count -eq 0) {
    Write-Host "❌ No active network adapters found!" -ForegroundColor Red
    pause
    exit
}

Write-Host "📡 Active Network Adapters:" -ForegroundColor Cyan
$adapters | ForEach-Object { Write-Host "   - $($_.Name)" -ForegroundColor White }
Write-Host ""

# Ask user to confirm
Write-Host "This will change DNS servers to:" -ForegroundColor Yellow
Write-Host "   Primary:   8.8.8.8 (Google DNS)" -ForegroundColor White
Write-Host "   Secondary: 1.1.1.1 (Cloudflare DNS)" -ForegroundColor White
Write-Host ""

$confirm = Read-Host "Do you want to continue? (Y/N)"

if ($confirm -ne "Y" -and $confirm -ne "y") {
    Write-Host "❌ Cancelled by user" -ForegroundColor Red
    pause
    exit
}

Write-Host ""
Write-Host "🔄 Changing DNS settings..." -ForegroundColor Cyan

foreach ($adapter in $adapters) {
    try {
        Write-Host "   Processing: $($adapter.Name)..." -ForegroundColor White
        
        # Set DNS servers
        Set-DnsClientServerAddress -InterfaceIndex $adapter.ifIndex -ServerAddresses ("8.8.8.8", "1.1.1.1")
        
        Write-Host "   ✅ DNS updated for $($adapter.Name)" -ForegroundColor Green
    }
    catch {
        Write-Host "   ❌ Failed to update $($adapter.Name): $($_.Exception.Message)" -ForegroundColor Red
    }
}

Write-Host ""
Write-Host "✅ DNS settings updated!" -ForegroundColor Green
Write-Host ""
Write-Host "📝 Next steps:" -ForegroundColor Cyan
Write-Host "   1. Wait 10 seconds for DNS to propagate" -ForegroundColor White
Write-Host "   2. Run: cd server" -ForegroundColor White
Write-Host "   3. Run: node test-mongodb-connection.js" -ForegroundColor White
Write-Host ""

# Flush DNS cache
Write-Host "🔄 Flushing DNS cache..." -ForegroundColor Cyan
ipconfig /flushdns | Out-Null
Write-Host "✅ DNS cache flushed" -ForegroundColor Green
Write-Host ""

Write-Host "⏳ Waiting 10 seconds for DNS to propagate..." -ForegroundColor Yellow
Start-Sleep -Seconds 10

Write-Host ""
Write-Host "✅ Done! You can now test MongoDB connection." -ForegroundColor Green
Write-Host ""

pause
