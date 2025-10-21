@echo off
echo Starting deployment process...

echo.
echo Step 1: Checking Git installation...
git --version
if %errorlevel% neq 0 (
    echo ERROR: Git is not installed or not in PATH
    echo Please install Git from https://git-scm.com/download/win
    echo Or use GitHub Desktop from https://desktop.github.com/
    pause
    exit /b 1
)

echo.
echo Step 2: Initializing Git repository...
git init

echo.
echo Step 3: Adding all files...
git add .

echo.
echo Step 4: Creating commit...
git commit -m "Updated Digital Labour Chowk with mobile app, authentication, and job matching features"

echo.
echo Step 5: Adding remote origin...
echo Please replace YOUR_USERNAME with your actual GitHub username
echo git remote add origin https://github.com/YOUR_USERNAME/digital-landing-page.git

echo.
echo Step 6: Pushing to GitHub...
echo git branch -M main
echo git push -u origin main

echo.
echo Manual steps required:
echo 1. Create repository on GitHub.com named "digital-landing-page"
echo 2. Replace YOUR_USERNAME in the commands above
echo 3. Run the git remote add origin and git push commands
echo.
echo Alternative: Use GitHub Desktop for easier deployment
pause
