# Manual Security Scrub Script (Bypasses GitHub Actions)
# Usage: powershell -ExecutionPolicy Bypass -File .\scripts\manual_scrub.ps1

$RepoUrl = "https://github.com/Kanjin22/pali-theonlyone.git"
$TempDir = "..\pali-scrub-temp"
$CleanedBranch = "cleaned-mirror-manual-" + (Get-Date -Format "yyyyMMdd-HHmmss")

Write-Host "Step 1: Cloning fresh copy to $TempDir..." -ForegroundColor Cyan
if (Test-Path $TempDir) { 
    Write-Host "Removing existing temp dir..."
    Remove-Item -Path $TempDir -Recurse -Force 
}
git clone $RepoUrl $TempDir
Set-Location $TempDir

Write-Host "Step 2: Checking git-filter-repo..." -ForegroundColor Cyan
try {
    python -c "import git_filter_repo" 2>$null
    if ($LASTEXITCODE -ne 0) {
        Write-Host "Installing git-filter-repo..."
        pip install git-filter-repo
    }
} catch {
    Write-Host "Python not found or error checking module." -ForegroundColor Red
    exit 1
}

Write-Host "Step 3: Preparing replacement patterns..." -ForegroundColor Cyan
$Patterns = @"
AIza[0-9A-Za-z_-]{35}==>REDACTED_API_KEY
"@
$Patterns | Out-File -Encoding UTF8 replace_expressions.txt

Write-Host "Step 4: Running git-filter-repo (This rewrites history)..." -ForegroundColor Cyan
# Run filter-repo to scrub history
# --force is needed because we are not in a fresh clone (technically we are, but filter-repo is strict)
python -m git_filter_repo --path service-account-key.json --invert-paths --replace-text replace_expressions.txt --force

Write-Host "Step 5: Restoring Remote & Pushing..." -ForegroundColor Cyan
# git-filter-repo removes remotes for safety. We re-add origin.
git remote add origin $RepoUrl

# Create the new branch pointing to the rewritten history
git checkout -b $CleanedBranch

# Push to GitHub
git push origin $CleanedBranch --force

Write-Host "---------------------------------------------------" -ForegroundColor Green
Write-Host "✅ Success! Cleaned history pushed to branch: $CleanedBranch" -ForegroundColor Green
Write-Host "Next Step: Create a PR from this branch to main to review changes." -ForegroundColor Yellow
Write-Host "Run: gh pr create --base main --head $CleanedBranch --title 'Security Scrub (Manual)' --body 'Cleaned history manually due to GHA billing issue.'" -ForegroundColor Yellow
Write-Host "---------------------------------------------------"

# Cleanup
Set-Location ..
Write-Host "Removing temp directory..."
Remove-Item -Path $TempDir -Recurse -Force
