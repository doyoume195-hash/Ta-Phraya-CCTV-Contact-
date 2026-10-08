# เว็บไซต์ร้านคอนแทคตาพระยา (GitHub Pages)

## วิธีนำขึ้น GitHub (ครั้งเดียว)
1. สมัคร/เข้า GitHub แล้วเปิด **2FA** (Settings → Password and authentication)
2. สร้าง repository ใหม่ ตั้งเป็น **Public** (GitHub Pages ฟรีต้อง Public) เช่น ชื่อ `ctp-shop`
3. อัปโหลดไฟล์ทั้งหมดในโฟลเดอร์นี้ (index.html, app.js, style.css, data.json, .nojekyll และโฟลเดอร์ img) เข้า repo
4. Settings → Pages → Source: **Deploy from a branch** → Branch: `main` / `(root)` → Save
5. รอ 1-2 นาที จะได้ลิงก์ `https://ชื่อผู้ใช้.github.io/ctp-shop/` แล้วติ๊ก **Enforce HTTPS**

## สร้าง Token สำหรับแอดมิน (ครั้งเดียว)
1. GitHub → Settings → Developer settings → Personal access tokens → **Fine-grained tokens** → Generate new token
2. Repository access: **Only select repositories** เลือกเฉพาะ repo ของร้านนี้
3. Permissions → Repository permissions → **Contents: Read and write** (อย่างอื่นไม่ต้องเปิด)
4. Expiration: 90 วัน (หมดอายุแล้วสร้างใหม่)
5. คัดลอก token เก็บไว้ (แสดงครั้งเดียว) **ห้ามใส่ token ในไฟล์ในเว็บหรือ repo**

## เข้าสู่ระบบแอดมิน
- กด "เข้าสู่ระบบแอดมิน" ท้ายหน้าเว็บ หรือเปิด `ลิงก์เว็บ#admin`
- ครั้งแรก: ใส่ชื่อ GitHub, ชื่อ repo, token และตั้ง **รหัสผ่านแอดมิน (12 ตัวอักษรขึ้นไป)** ระบบเข้ารหัส token ด้วยรหัสผ่านนี้ (PBKDF2 600,000 รอบ + AES-256-GCM) แล้วเก็บในเครื่องนั้นเท่านั้น
- ครั้งต่อไป: ใส่แค่รหัสผ่าน ใส่ผิดหลายครั้งระบบจะหน่วงเวลา
- ไม่ได้ใช้งาน 15 นาทีระบบออกจากระบบเอง
- เครื่องใหม่/ลืมรหัส: กด "ลืมรหัส / ตั้งค่าใหม่" แล้วใส่ token ใหม่
- แก้ไขเสร็จกด **บันทึกและเผยแพร่** (ระบบ commit เข้า repo เอง) รอประมาณ 1 นาที

## ความปลอดภัยที่ทำไว้
- CSP เข้มงวด: ไม่มี inline script, โหลดสคริปต์จากเว็บเราเท่านั้น, เชื่อมต่อได้เฉพาะ api.github.com
- ไม่มี token หรือรหัสผ่านอยู่ใน repo หรือหน้าเว็บ
- ข้อมูลทุกจุดถูก escape ก่อนแสดง, ลิงก์รับเฉพาะ http(s)/tel/mailto, ลิงก์ภายนอกใช้ noopener noreferrer
- กันถูกฝังใน iframe (clickjacking), ไม่ส่ง referrer

## ข้อจำกัดที่ต้องรู้
- โค้ดหน้าแอดมินเป็นสาธารณะ รหัสผ่านจึงตรวจในเบราว์เซอร์ ตัวที่ป้องกันการเขียนจริงคือ **GitHub token + สิทธิ์ของ repo** ถ้ามีคนขโมยทั้งเครื่องและเดารหัสสำเร็จ จึงต้องตั้งรหัสให้ยาวและยกเลิก token ที่ GitHub ทันทีถ้าเครื่องหาย
- ข้อมูลใน data.json และ repo เป็นสาธารณะ ห้ามเก็บราคาทุนหรือข้อมูลลูกค้า
- รูปที่ลบออกจากเว็บยังค้างในโฟลเดอร์ img ของ repo (ลบเองได้ใน GitHub)
- ฟอนต์โหลดจาก Google Fonts
