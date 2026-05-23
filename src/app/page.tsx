import Link from "next/link";
import { getAllLessons } from "@/lib/content";
import SplitText from "@/components/SplitText";

export default function HomePage() {
  const lessons = getAllLessons();
  const total = lessons.length;

  return (
    <div className="space-y-12">
      <section className="text-center py-12">
        <SplitText
          text="تعلَّم تجويد القرآن الكريم"
          tag="h1"
          className="text-4xl sm:text-5xl font-extrabold text-brand-800 mb-4 leading-[1.6] py-2"
          splitType="words"
          delay={120}
          duration={1}
          ease="power3.out"
          from={{ opacity: 0, y: 40 }}
          to={{ opacity: 1, y: 0 }}
          threshold={0.1}
          rootMargin="-100px"
        />
        <p className="text-lg text-gray-700 max-w-2xl mx-auto leading-loose">
          منصّة تفاعلية لتعليم أحكام التجويد بأسلوب ميسَّر، مع أمثلة من القرآن الكريم
          واختبارات قصيرة لترسيخ ما تتعلّمه.
        </p>
        <div className="mt-8 flex items-center justify-center gap-3">
          <Link href="/lessons" className="btn btn-primary">
            ابدأ التعلّم
          </Link>
          <Link href="/quizzes" className="btn btn-secondary">
            تصفّح الاختبارات
          </Link>
        </div>
      </section>

      <section className="grid sm:grid-cols-3 gap-4">
        <Feature
          icon="📖"
          title={`${total} دروس`}
          body="دروس مرتَّبة من أساسيات التجويد إلى أهم الأحكام التطبيقية."
        />
        <Feature
          icon="🎯"
          title="اختبارات تفاعلية"
          body="بعد كل درس اختبار قصير يصحَّح فوراً مع شرح الإجابات."
        />
        <Feature
          icon="📊"
          title="تتبُّع تقدّمك"
          body="يحفظ المتصفّح ما أتممته من دروس ودرجاتك في الاختبارات."
        />
      </section>
    </div>
  );
}

function Feature({ icon, title, body }: { icon: string; title: string; body: string }) {
  return (
    <div className="card text-center">
      <div className="text-3xl mb-2">{icon}</div>
      <h3 className="text-xl font-bold text-brand-700 mb-2">{title}</h3>
      <p className="text-gray-700 leading-7">{body}</p>
    </div>
  );
}
