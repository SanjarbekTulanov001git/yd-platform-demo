@echo off
chcp 65001 >nul
setlocal
cd /d "%~dp0"

where node >nul 2>nul
if errorlevel 1 goto node_topilmadi
where npm >nul 2>nul
if errorlevel 1 goto npm_topilmadi

echo Yoshlar Diplomatiya Markazi namunasini tayyorlash boshlandi.
call npm install
if errorlevel 1 goto ornatuv_xatosi

call npm run build
if errorlevel 1 goto yigish_xatosi

echo Namuna ishga tushirilmoqda. Server oynasini yopmang.
start "Yoshlar Diplomatiya Markazi namunasi" /min cmd /k "npm run start"
node -e "let n=0;const t=setInterval(async()=>{try{const r=await fetch('http://localhost:3000');if(r.ok){clearInterval(t);process.exit(0)}}catch{}if(++n>=30){clearInterval(t);process.exit(1)}},1000)"
if errorlevel 1 goto server_xatosi
start "" "http://localhost:3000"
echo Namuna brauzerda ochildi: http://localhost:3000
echo Ish tugagach, server oynasini yoping.
pause
exit /b 0

:node_topilmadi
echo Node.js topilmadi. Node.js LTS turini https://nodejs.org saytidan o'rnating.
goto xatolik

:npm_topilmadi
echo npm topilmadi. Node.js LTS turini https://nodejs.org saytidan o'rnating.
goto xatolik

:ornatuv_xatosi
echo Paketlarni o'rnatib bo'lmadi. Internet ulanishini tekshiring.
goto xatolik

:yigish_xatosi
echo Namuna tayyorlanmadi. Yuqoridagi xabarni loyiha mas'uliga ko'rsating.
goto xatolik

:server_xatosi
echo Namuna ishga tushmadi. Server oynasidagi xabarni loyiha mas'uliga ko'rsating.
goto xatolik

:xatolik
echo Oyna yopilmasligi uchun istalgan tugmani bosing.
pause >nul
exit /b 1
