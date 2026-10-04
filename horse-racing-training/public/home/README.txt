Home page photos ("Why Post Time / 開跑前的用途" cards)
=====================================================

Drop four photos here, one per card. The page loads them from /home/purpose-N.jpg:

  purpose-1.jpg   Practise risk-free / 零風險練習
  purpose-2.jpg   Learn from data / 數據學習
  purpose-3.jpg   Test before you bet / 先試後投
  purpose-4.jpg   Track your progress / 追蹤進度

Recommended:
  - 1200 x 900 px (4:3). Other sizes are cropped to 4:3 (centre crop, object-fit: cover).
  - JPG (or WebP), under 300 KB each. The page asks for the .jpg names above; for WebP,
    ask for the file names in src/home/HomePage.tsx (PhotoSlot) to be changed.
  - No HKJC logos, wordmarks or people who haven't agreed to appear.

Until a file exists, the card shows a placeholder of the same size (in development it
names the missing file; in production it is a plain pattern), so the layout never jumps.
In development (npm run dev) new files show up on reload. In production the server serves dist/,
so run npm run build again (it copies public/ into dist/) or also copy the files to dist/home/.
