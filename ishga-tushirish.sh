#!/bin/sh
set -eu

cd "$(dirname "$0")"

kutib_tur() {
  printf '\nYopishdan oldin istalgan tugmani bosing. '
  IFS= read -r javob || true
}

if ! command -v node >/dev/null 2>&1 || ! command -v npm >/dev/null 2>&1; then
  printf 'Node.js topilmadi. Node.js LTS turini https://nodejs.org saytidan o‘rnating.\n'
  kutib_tur
  exit 1
fi

printf 'Yoshlar Diplomatiya Markazi namunasini tayyorlash boshlandi.\n'
if ! npm install; then
  printf 'Paketlarni o‘rnatib bo‘lmadi. Internet ulanishini tekshiring.\n'
  kutib_tur
  exit 1
fi

if ! npm run build; then
  printf 'Namuna tayyorlanmadi. Xatoni loyiha mas’uliga ko‘rsating.\n'
  kutib_tur
  exit 1
fi

printf 'Namuna ishga tushirilmoqda. Terminal oynasini yopmang.\n'
npm run start &
server_pid=$!
url='http://localhost:3000'
tayyor=0

tozalash() {
  kill "$server_pid" 2>/dev/null || true
}
trap tozalash EXIT INT TERM

if node -e 'let n=0;const t=setInterval(async()=>{try{const r=await fetch("http://localhost:3000");if(r.ok){clearInterval(t);process.exit(0)}}catch{}if(++n>=30){clearInterval(t);process.exit(1)}},1000)'; then
  tayyor=1
fi

if [ "$tayyor" -ne 1 ] || ! kill -0 "$server_pid" 2>/dev/null; then
  printf 'Namuna ishga tushmadi. Yuqoridagi xabarni loyiha mas’uliga ko‘rsating.\n'
  kutib_tur
  exit 1
fi

if command -v open >/dev/null 2>&1; then
  open "$url" || printf 'Brauzerni o‘zingiz ochib, %s manzilini kiriting.\n' "$url"
elif command -v xdg-open >/dev/null 2>&1; then
  xdg-open "$url" >/dev/null 2>&1 || printf 'Brauzerni o‘zingiz ochib, %s manzilini kiriting.\n' "$url"
else
  printf 'Brauzerni o‘zingiz ochib, %s manzilini kiriting.\n' "$url"
fi

printf 'Ish tugagach, to‘xtatish uchun Ctrl+C tugmalarini bosing.\n'
wait "$server_pid"
