# Git Setup Guide for Windows

## Installation Steps

### Method 1: Official Installer (Recommended)
1. Download Git from: https://git-scm.com/download/win
2. Run the installer
3. **Important**: During installation, select "Git from the command line and also from 3rd-party software"
4. Complete the installation
5. **Restart PowerShell** or open a new terminal

### Method 2: Using winget (Windows Package Manager)
```powershell
winget install --id Git.Git -e --source winget
```

### Method 3: Using Chocolatey
```powershell
choco install git
```

## Verify Installation

After installation, verify Git works:
```powershell
git --version
```

## Git Commands (PowerShell)

Once Git is installed, you can use these commands in PowerShell:

```powershell
# Initialize a Git repository
git init

# Check status
git status

# Add all files
git add .

# Commit changes
git commit -m "Initial commit"

# Add remote repository
git remote add origin <your-repo-url>

# Push to remote
git push -u origin main
```

## Git Commands (Bash/Git Bash)

If you install Git for Windows, it includes Git Bash. You can use the same commands:

```bash
# Initialize a Git repository
git init

# Check status
git status

# Add all files
git add .

# Commit changes
git commit -m "Initial commit"

# Add remote repository
git remote add origin <your-repo-url>

# Push to remote
git push -u origin main
```

## Quick Start for Your Project

After installing Git, run these commands in your project directory:

```powershell
# Initialize repository
git init

# Add all files (respects .gitignore)
git add .

# Make initial commit
git commit -m "Initial commit: React movie project"

# Optional: Connect to GitHub/GitLab
# git remote add origin https://github.com/yourusername/your-repo.git
# git branch -M main
# git push -u origin main
```

## Troubleshooting

If Git still doesn't work after installation:
1. Close and reopen PowerShell
2. Check if Git is in PATH: `$env:PATH`
3. Manually add Git to PATH if needed (usually: `C:\Program Files\Git\cmd`)


