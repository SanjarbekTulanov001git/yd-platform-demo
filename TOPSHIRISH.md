# Yoshlar Diplomatiya Markazi namunasini topshirish qo‘llanmasi

## Bu nima

Bu loyiha taqdimot uchun tayyorlangan ko‘rgazmali namuna. Undagi barcha ism, telefon, elektron manzil, ariza va muassasa ma’lumotlari soxta. Haqiqiy ma’lumotlar bazasi, hisobga kirish va serverda ishlaydigan xavfsizlik himoyasi yo‘q. Ruxsatlar faqat ko‘rsatish uchun taqlid qilingan. Haqiqiy shaxsiy ma’lumot kiritmang.

## Namuna qanday ochiladi

### A. Windows kompyuterida

1. Kompyuterda Node.js LTS o‘rnatilgan bo‘lsin. Bo‘lmasa, `https://nodejs.org` saytidan o‘rnating.
2. Loyiha papkasidagi `ISHGA-TUSHIRISH.bat` faylini ikki marta bosing.
3. Tayyorlash vaqti internet tezligiga bog‘liq. Brauzer ochilguncha kuting.
4. Namoyish paytida kichraytirilgan server oynasini yopmang. Ish tugagach, o‘sha oynani yoping.

### B. Vercel orqali internetga chiqarish

Hozircha internetda ochiq namuna havolasi yo‘q. Joylashtirish uchun loyihani avval GitHub omboriga qo‘yish, so‘ng:

1. Vercel hisobiga kiring va yangi loyiha yarating.
2. GitHub omborini ulang; Vercel Next.js loyihasini o‘zi aniqlaydi.
3. Tayyorlash buyrug‘ini `npm run build` holida qoldirib, joylashtirishni boshlang.
4. Vercel bergan havolani ochib tekshiring. Ulashish rasmi uchun `NEXT_PUBLIC_SITE_URL` sozlamasiga berilgan yakuniy havolani kiriting va qayta joylashtiring.

Hisob, ombor yoki joylashtirish xatosi bo‘lsa, loyiha mas’ulidan yordam so‘rang. Hech qanday maxfiy kalit kiritish talab qilinmaydi.

### C. Docker orqali

Docker o‘rnatilgan kompyuter yoki serverda loyiha papkasini ochib, quyidagi ikki buyruqni ketma-ket bajaring:

```text
docker build -t yd-platform-demo .
docker run --rm -p 3000:3000 yd-platform-demo
```

So‘ng `http://localhost:3000` manzilini oching. Oyna yopilsa, namuna to‘xtaydi. Internetga chiqarish, domen va xavfsiz ulanishni sozlash uchun server mas’ulining yordami kerak.

## Taqdimot ssenariysi: 5–7 daqiqa

Rollarni almashtirish uchun yuqori menyudagi **Namuna roli** tanlovidan foydalaning. Telefonda avval **Menyu** tugmasini bosing.

1. **Ommaviy — 1 daqiqa.** `/` sahifasida markaz va ko‘rsatkichlarni ko‘rsating, so‘ng `/departments/yosh-diplomatlar-akademiyasi` ni oching. “Bu yerda markaz yo‘nalishlari bitta namuna ichida jamlangan”, deb ayting.
2. **A’zo — 1 daqiqa 15 soniya.** Rolni **A’zo** qiling; `/programs/program-academy` sahifasidan ariza shakliga o‘ting. Soxta maqsad yozib yuboring, so‘ng `/member` da yuborilganini va holat tarixini ko‘rsating.
3. **Xodim — 1 daqiqa 15 soniya.** Rolni **Xodim** qiling va `/staff/applications` ni oching. Yangi yuborilgan arizani tanlang, holatini almashtirib saqlang; `/audit` sahifasida amal qaydini ko‘rsating. Namuna xodimi Samarqand hududi bilan cheklangan.
4. **Admin — 45 soniya.** Rolni **Admin** qilib, `/staff/applications/app-002` ni oching. Ruxsat berilmaganini ko‘rsating. So‘ng **Bo‘lim rahbari** roliga o‘tib, `/dashboard` da hudud, dastur va davr tanlovlarini ko‘rsating.
5. **Xodim — 50 soniya.** `/regions` sahifasida hududni, xarita belgilarini va koordinata tasdiqlash amallarini ko‘rsating.
6. **Ommaviy — 40 soniya.** `/architecture` sahifasida bosqichlar va xavfsizlik tamoyillarini ko‘rsatib, haqiqiy tizim keyin qurilishini ayting.

## Ma’lum cheklovlar

- 295 pikselga yaqin juda tor oynada logotip matnni yopishi va sahifa yon tomonga siljishi mumkin. Taqdimotda brauzer oynasini kengaytiring; bu namunaning asosiy ko‘rinishiga ta’sir qilmaydi, ammo kichik oynalarda muammo qoladi.
- Xaritada yettita namunaviy muassasa bor, barcha haqiqiy maktab va oliygohlar kiritilmagan. Bu faqat hududlar g‘oyasini ko‘rsatadi; joylashuvlar haqiqiy deb talqin qilinmasin.
- Inglizcha va ruscha matnlar faqat bosh sahifa va menyuda tayyor. Boshqa sahifalarni namoyishdan oldin o‘zbekchaga qaytaring.
- Xarita tasvirlari internet orqali Esri xizmatidan olinadi. Tarmoq cheklangan bo‘lsa, xarita tasviri chiqmasligi mumkin; qolgan namuna sahifalari mahalliy soxta ma’lumotdan foydalanadi.
- A’zo arizalari, holat o‘zgarishlari, jurnal va koordinata tasdiqlari faqat shu brauzerda saqlanadi; boshqa kompyuterga o‘tmaydi.

Har bir namoyishda ushbu jumlani ayting: **“Bu faqat soxta ma’lumotli ko‘rgazmali namuna. Haqiqiy tizim, ma’lumotlar bazasi va xavfsizlik himoyasi hali qurilmagan.”**

## Namunani boshlang‘ich holatga qaytarish

Brauzer sozlamalaridagi sayt ma’lumotlarini oching, `localhost` ni qidiring va shu saytga tegishli ma’lumotlarni o‘chiring. Sahifani yangilang. Bu ariza, holat, audit, tasdiqlangan koordinata va saqlangan rolni tozalaydi; o‘chirish boshqa saytlarga ta’sir qilmaydi.
