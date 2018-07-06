echo off
echo This will deploy to the Delta account
echo AWS profile "Syed" will be used, and if it doesn't exist the operation will fail.
echo For Windows, check profiles in C:\Users\(username)\.aws
pause
echo on
call serverless deploy --aws-profile Syed --prefix syed --accountId 895843423532 --verbose
pause