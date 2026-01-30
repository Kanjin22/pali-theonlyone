$HookPath = ".git\hooks\pre-commit"
$SourcePath = "scripts\pre-commit"

if (-not (Test-Path ".git\hooks")) {
    New-Item -ItemType Directory -Force -Path ".git\hooks"
}

Copy-Item -Path $SourcePath -Destination $HookPath -Force
# Ensure it's executable (git bash/wsl might need this, though less relevant for pure powershell users, but good practice)
# In Windows, the file itself is just run by git. git for windows runs shebangs via bash.

Write-Host "✅ Pre-commit hook installed successfully!"
