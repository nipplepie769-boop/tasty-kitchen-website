@echo off
echo Installing MongoDB Community Edition...
echo Please download MongoDB Community Server from:
echo https://www.mongodb.com/try/download/community
echo.
echo After installation, run these commands in PowerShell as Administrator:
echo.
echo # Create data directory
echo md "\data\db"
echo.
echo # Start MongoDB
echo "C:\Program Files\MongoDB\Server\6.0\bin\mongod.exe" --dbpath="/data/db"
echo.
echo Press any key to continue...
pause