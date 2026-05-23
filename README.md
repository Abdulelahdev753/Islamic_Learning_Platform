# منصة تعليم التجويد · Tajweed Learning Platform

تطبيق Next.js (واجهة + خادم في تطبيق واحد) لتعليم أحكام تجويد القرآن الكريم بالعربية، يعتمد على دروس مكتوبة بصيغة MDX واختبارات JSON تُصحَّح من جهة الخادم.

A full-stack Next.js app (frontend + backend in one) teaching Tajweed of the Qurʾān in Arabic. Lessons are authored in MDX, quizzes in JSON, and grading happens server-side.

## التشغيل المحلي · Run locally

```bash
npm install
npm run dev
# افتح http://localhost:3000
```

For a production build:

```bash
npm run build
npm start
```

## بنية المشروع · Project layout

```
content/lessons/*.mdx     ← نصوص الدروس
content/quizzes/*.json    ← أسئلة الاختبارات (مع الإجابات الصحيحة — لا تُرسَل للمتصفّح)
data/quran.json           ← نص القرآن الكريم (٦٢٣٦ آية، رواية حفص)
src/app/                  ← الصفحات (App Router) + واجهات API
src/components/           ← مكوّنات الواجهة (Verse, RuleHighlight, QuizRunner …)
src/lib/                  ← منطق التحميل والتخزين
mdx-components.tsx        ← خريطة مكوّنات MDX المتاحة داخل الدروس
```

## API (route handlers)

- `GET /api/lessons` — قائمة بيانات الدروس.
- `GET /api/lessons/[slug]` — بيانات درس واحد.
- `GET /api/quizzes/[slug]` — أسئلة الاختبار (بدون مفتاح الإجابات).
- `POST /api/quizzes/[slug]/grade` — يستقبل `{ answers: { [questionId]: choiceIndex } }` ويُرجع النتيجة مع شرح.

## إضافة محتوى جديد · Adding content

أضف ملفّاً جديداً تحت `content/lessons/` بهذا الشكل:

```mdx
---
slug: my-new-lesson
title: عنوان الدرس
order: 6
summary: ملخّص قصير
quiz: my-new-lesson      # اختياري — يطابق slug في content/quizzes/
---

نصّ الدرس بصيغة MDX، ويمكن استخدام:

<Verse refId="2:255" />
<RuleHighlight rule="idgham">نَصّ مظلَّل</RuleHighlight>
<Note type="tip">فائدة</Note>
```

ثمّ ملفّ اختبار `content/quizzes/my-new-lesson.json`:

```json
{
  "slug": "my-new-lesson",
  "title": "اختبار: عنوان",
  "questions": [
    {
      "id": "q1",
      "type": "single",
      "prompt": "السؤال؟",
      "choices": ["خيار 1", "خيار 2"],
      "answer": 0,
      "explanation": "..."
    }
  ]
}
```

سيظهر الدرس والاختبار تلقائياً في الواجهة بعد إعادة التحميل.

## ملاحظات · Notes

- لا حساب مستخدم — يُحفظ التقدّم (الدروس المكتملة ودرجات الاختبارات) في `localStorage` للمتصفّح فقط.
- جميع نصوص الآيات تُحمَّل محلّياً من `data/quran.json` (رواية حفص)، فلا يحتاج التطبيق إلى الإنترنت بعد الإقلاع.
- الخطوط محمَّلة من Google Fonts (Cairo و Amiri Quran).
