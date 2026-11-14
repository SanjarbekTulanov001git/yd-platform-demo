# Yoshlar Diplomatiya Markazi — ko‘rgazmali namuna

Bu loyiha homiylar va rahbariyatga taqdim etish uchun tayyorlangan qisman ishlaydigan namuna. U yakuniy arxitektura hujjatidagi modullar, hududlar, dasturlar va ruxsat tamoyillarini ko‘rsatadi.

## Ishga tushirish

```powershell
npm install
npm run dev
```

So‘ng brauzerda `http://localhost:3000` manzilini oching.

Ishlab chiqarish yig‘masini tekshirish:

```powershell
npm run build
npm run start
```

## Bulut serveriga chiqarish

Loyiha Docker orqali bulut serveriga joylashga tayyor. `Dockerfile` Next.js ishlab chiqarish yig‘masini ixcham ishga tushirish uchun tayyorlaydi. Docker o‘rnatilgan serverda:

```powershell
docker build --build-arg NEXT_PUBLIC_SITE_URL=https://sizning-demo-domeningiz.uz -t yd-platform-demo .
docker run -d --name yd-platform-demo --restart unless-stopped -p 3000:3000 yd-platform-demo
```

`sizning-demo-domeningiz.uz` o‘rniga hosting bergan haqiqiy manzilni kiriting. Havola internetdan ochilishi uchun server portini, domenni va HTTPS sertifikatini hosting sozlamalarida yoqish kerak. `NEXT_PUBLIC_SITE_URL` yig‘ish vaqtida beriladi, chunki u ulashish rasmi havolalarini tayyorlashda ishlatiladi. Bu sozlama maxfiy kalit emas.

Bulutga chiqarish uchun alohida hosting hisobi va server yoki hosting xizmati kerak. Ular tanlanmagani sababli bu loyiha ichida hozircha ommaviy demo havolasi yaratilmagan.

## Namuna imkoniyatlari

- Bosh sahifa o‘nta bo‘lim, dasturlar va soxta ma’lumotlardan hisoblangan ko‘rsatkichlarni ko‘rsatadi.
- Bo‘limlar, dasturlar, hududlar, tashriflar va arxitektura sahifalari mavjud.
- Yuqori menyudagi namuna rolini almashtirib, ommaviy, a’zo, hamkor, xodim, bo‘lim rahbari, tahlilchi va admin ko‘rinishlarini sinash mumkin.
- A’zo namunaviy ariza yuboradi; ariza holati, holat tarixi va audit yozuvi brauzer xotirasida saqlanadi.
- Xodim o‘ziga biriktirilgan namuna doirasidagi ariza holatini o‘zgartiradi.
- Hududlar sahifasida namuna muassasalari, koordinata holati, tasdiqlash amali va tashriflar ko‘rsatiladi.
- Boshqaruv panelidagi diagrammalar ariza va tashrif namunalaridan hisoblanadi.
- O‘zbekcha to‘liq; inglizcha va ruscha matnlar hozircha faqat menyu va bosh sahifa uchun berilgan.
- Har bir sahifada “DEMO: namunaviy ma’lumot” belgisi ko‘rinadi.

## Logotip va ranglar

- `public/images/logo.png` — berilgan rasmning o‘zgartirilmagan, shaffof fonli nusxasi.
- `public/images/logo-mark.png` — shu rasmdan alohida kesilgan “YD” belgisi; telefon menyusi va belgi rasmlarida ishlatiladi.
- To‘q ko‘k `#001D57`, yorqin ko‘k `#0278E2` va oltin `#BA892F` logotip hamda yozuvlardagi piksel qiymatlarini o‘lchash orqali olindi.
- `app/favicon.ico`, `app/icon.png`, `app/apple-icon.png` va `app/opengraph-image.png` asl logotipning shakli hamda rangini saqlagan holda tayyorlandi.
- To‘q fonda to‘liq logotip oq, yumaloq burchakli taglikda; ochiq fonda esa tagliksiz ishlatiladi.
- Mahalliy namuna `http://localhost:3000` manzilidan foydalanadi. Nashr qilishdan oldin `NEXT_PUBLIC_SITE_URL` qiymatini saytning haqiqiy manziliga moslang.

## Muhim cheklovlar

Bu faqat ko‘rgazmali namuna. Haqiqiy backend, ma’lumotlar bazasi, hisobga kirish, parol, ruxsatlarni serverda tekshirish, elektron pochta yoki SMS jo‘natish, fayl yuklash va tashqi shaxsni tekshirish xizmati yo‘q.

Ruxsat tekshiruvi brauzer ichida soxta tarzda bajariladi. Uni haqiqiy himoya deb hisoblamang. Ko‘rsatilgan ism, elektron pochta, telefon, hududdagi muassasa, tashrif va ariza ma’lumotlari namuna uchun to‘qib chiqarilgan. Haqiqiy shaxsiy ma’lumot kiritmang.

Arizalar, holatlar, audit yozuvlari va tasdiqlangan koordinatalar brauzerning mahalliy xotirasida saqlanadi. Ularni boshqa qurilmaga uzatish yoki serverdan tiklash imkoni yo‘q. Sinovni boshidan boshlash uchun brauzerning ushbu saytga tegishli mahalliy xotirasini tozalang.

Xaritada Esri xizmatining yozuvsiz sun’iy yo‘ldosh tasvirlari ishlatiladi; tasvir manbalari xarita ostida ko‘rsatilgan. Tashqi xizmatga faqat xarita plitkalarini olish so‘rovi yuboriladi; namuna arizasi yoki boshqa shaxsiy ma’lumot yuborilmaydi.

## Papkalar

- `app/` — sahifalar va umumiy joylashuv
- `components/` — qayta ishlatiladigan ekran qismlari
- `data/mock.ts` — to‘qib chiqarilgan namuna ma’lumotlari
- `lib/api/` — ekranlar foydalanadigan yagona ma’lumot qatlami
- `lib/access.ts` — brauzerdagi namuna ruxsat tekshiruvi
- `messages/uz/`, `messages/en/`, `messages/ru/` — til matnlari
- `types/` — ma’lumotlar modeliga mos TypeScript turlari

## Keyingi bosqichda almashtiriladigan qismlar

Taqdimot ma’qullangach, quyidagilar alohida ishlab chiqiladi:

1. `lib/api/` ichidagi namuna amallari serverdagi haqiqiy API so‘rovlari bilan almashtiriladi.
2. `data/mock.ts` o‘rniga hujjatdagi ma’lumotlar modeli bo‘yicha boshqariladigan ma’lumotlar bazasi va migratsiyalar joriy qilinadi.
3. Brauzerdagi namuna rollari o‘rniga server tekshiradigan hisoblar, rollar, bo‘lim/hudud/loyiha doirasi va xodim takliflari quriladi.
4. Namuna ariza, holat tarixi, audit va koordinata tasdiqlash oqimlari serverda tekshiriladigan amallarga aylantiriladi.
5. Hujjatlarda belgilangan talablar asosida zaxira nusxa, kuzatuv, xavfsizlik sinovlari, fayl ombori va tashqi bildirishnomalar alohida joriy qilinadi.

Namuna kodi haqiqiy tizimga tayyor xavfsizlik yechimi yoki to‘liq ishlab chiqarish tizimi sifatida ishlatilmasligi kerak.
