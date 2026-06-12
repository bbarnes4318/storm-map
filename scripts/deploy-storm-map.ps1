# ==============================================================================
# deploy-storm-map.ps1
# ==============================================================================
# Packages, uploads, and deploys the Storm Map application to Hetzner.
# ==============================================================================

# Get absolute path of repository root relative to script directory
$repoRoot = (Resolve-Path "$PSScriptRoot\..").Path
Set-Location $repoRoot

$serverIp = "87.99.155.241"
$sshKeyPath = "$env:USERPROFILE\.ssh\hetzner_pvn"
$archiveFile = Join-Path $repoRoot "storm-map-deploy.tar"
$deployScript = Join-Path $repoRoot "scripts/remote-deploy-storm-map.sh"
$envProdPath = Join-Path $repoRoot ".env.production"

# Mapbox Access Token (Read from env or local config)
$mapboxToken = $env:NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN
$envLocalPath = Join-Path $repoRoot ".env.local"
if (-not $mapboxToken -and (Test-Path $envLocalPath)) {
    $envContent = Get-Content $envLocalPath
    foreach ($line in $envContent) {
        if ($line -match "^NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN=(.*)$") {
            $mapboxToken = $Matches[1].Trim().Trim('"').Trim("'")
            break
        }
    }
}
if (-not $mapboxToken) {
    Write-Error "Mapbox Access Token not found. Please set NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN in env or .env.local"
    exit 1
}

# 1. Create .env.production file for the Docker build context
Write-Host "Creating temporary .env.production file..." -ForegroundColor Yellow
$envProdContent = @"
NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN=$mapboxToken
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_dHVtYmxlLXdlYXNlbC0yOC5jbGVyay5hY2NvdW50cy5kZXYk
CLERK_SECRET_KEY=sk_test_uyneoCird48L5lSvpVhfFK3j17EzIQmT
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/storm-map/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/storm-map/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/storm-map
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/storm-map
"@
$envProdContent | Out-File -FilePath $envProdPath -Encoding utf8 -Force

# 2. Clean up any existing deploy archive
if (Test-Path $archiveFile) {
    Remove-Item $archiveFile -Force
}

# 3. Package the workspace using tar
Write-Host "Packaging workspace using tar..." -ForegroundColor Cyan
$excludeArgs = @(
    "-cf", $archiveFile,
    "--exclude=.git",
    "--exclude=node_modules",
    "--exclude=.next",
    "--exclude=.env.local",
    "--exclude=storm-map-deploy.tar",
    "."
)
& tar $excludeArgs

# 4. Upload deploy assets
Write-Host "Uploading deploy tarball to Hetzner server ($serverIp)..." -ForegroundColor Cyan
scp -i "$sshKeyPath" "$archiveFile" "root@$($serverIp):/tmp/storm-map-deploy.tar"
if ($LASTEXITCODE -ne 0) {
    Write-Error "Failed to upload tarball."
    # Clean up local temp file
    Remove-Item $envProdPath -Force
    exit 1
}

Write-Host "Uploading remote deployment script..." -ForegroundColor Cyan
scp -i "$sshKeyPath" "$deployScript" "root@$($serverIp):/tmp/remote-deploy-storm-map.sh"
if ($LASTEXITCODE -ne 0) {
    Write-Error "Failed to upload deployment script."
    # Clean up local temp file
    Remove-Item $envProdPath -Force
    exit 1
}

# Clean up local temporary environment file
Write-Host "Cleaning up local temporary .env.production..." -ForegroundColor Yellow
Remove-Item $envProdPath -Force

# 5. Execute remote deployment script
Write-Host "Running remote deployment script on Hetzner server..." -ForegroundColor Green
ssh -i "$sshKeyPath" root@$serverIp "chmod +x /tmp/remote-deploy-storm-map.sh && /tmp/remote-deploy-storm-map.sh"

Write-Host "Deployment completed successfully!" -ForegroundColor Green
