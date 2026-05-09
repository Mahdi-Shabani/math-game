
import { Level } from '../types';

export const levels: Level[] = [
  {
    id: 1,
    title: "جنگل اعداد سبز",
    minNumber: 1,
    maxNumber: 10,
    operations: ['+'],
    targetScore: 5,
    timeLimit: 60,
    unlocked: true,
    description: "جمع اعداد ساده برای شروع ماجراجویی!",
    challengeGoal: "۵ جمع درست انجام بده تا راه جنگل باز بشه.",
    nextChallengePreview: "در مرحله بعد باید با تفریق در غار تاریک روبرو بشی!"
  },
  {
    id: 2,
    title: "غار تفریق تاریک",
    minNumber: 1,
    maxNumber: 20,
    operations: ['-', '+'],
    targetScore: 8,
    timeLimit: 50,
    unlocked: false,
    description: "اعداد را از هم کم کن تا راه خروج را پیدا کنی.",
    challengeGoal: "۸ معمای ترکیب جمع و تفریق رو حل کن.",
    nextChallengePreview: "آماده باش که در مرحله بعد باید غول ضرب رو شکست بدی!"
  },
  {
    id: 3,
    title: "کوهستان ضرب جادویی",
    minNumber: 1,
    maxNumber: 12,
    operations: ['*'],
    targetScore: 10,
    timeLimit: 45,
    unlocked: false,
    description: "غول ضرب در قله کوه منتظر توست!",
    challengeGoal: "۱۰ ضرب درست انجام بده تا به قله برسی.",
    nextChallengePreview: "مرحله بعد باید از رودخانه خروشان تقسیم عبور کنی!"
  },
  {
    id: 4,
    title: "رودخانه تقسیم بلورین",
    minNumber: 1,
    maxNumber: 50,
    operations: ['/'],
    targetScore: 10,
    timeLimit: 50,
    unlocked: false,
    description: "اعداد را به درستی تقسیم کن تا از رودخانه عبور کنی.",
    challengeGoal: "۱۰ تقسیم صحیح انجام بده تا قایق غرق نشه!",
    nextChallengePreview: "وارد قلعه اسرارآمیز میشی که اعداد در اون گم شدن."
  },
  {
    id: 5,
    title: "قلعه اعداد گمشده",
    minNumber: 10,
    maxNumber: 50,
    operations: ['+', '-'],
    targetScore: 12,
    timeLimit: 45,
    unlocked: false,
    description: "ترکیبی از جمع و تفریق در راهروهای پیچیده قلعه.",
    challengeGoal: "۱۲ معمای اعداد بزرگ رو حل کن تا کلید قلعه رو بگیری.",
    nextChallengePreview: "مراقب باش! آتشفشان در حال فوران کردنه و باید خیلی سریع باشی!"
  },
  {
    id: 6,
    title: "آتشفشان محاسبات سریع",
    minNumber: 2,
    maxNumber: 15,
    operations: ['*', '+'],
    targetScore: 15,
    timeLimit: 30,
    unlocked: false,
    description: "سریع باش! گدازه‌ها در حال نزدیک شدن هستند!",
    challengeGoal: "۱۵ سوال رو در زمان خیلی کم جواب بده تا فرار کنی.",
    nextChallengePreview: "داری به قصر پادشاه ریاضی نزدیک میشی، چالش‌های سختی در پیشه."
  },
  {
    id: 7,
    title: "قصر پادشاه ریاضی",
    minNumber: 20,
    maxNumber: 100,
    operations: ['+', '-'],
    targetScore: 15,
    timeLimit: 60,
    unlocked: false,
    description: "بزرگترین چالش جمع و تفریق در حضور پادشاه.",
    challengeGoal: "۱۵ محاسبه با اعداد تا ۱۰۰ انجام بده تا وفاداریت رو ثابت کنی.",
    nextChallengePreview: "آخرین ایستگاه: کهکشان بی‌پایان که تمام مهارت‌هات رو امتحان می‌کنه!"
  },
  {
    id: 8,
    title: "کهکشان بی‌پایان اعداد",
    minNumber: 2,
    maxNumber: 100,
    operations: ['+', '-', '*', '/'],
    targetScore: 20,
    timeLimit: 90,
    unlocked: false,
    description: "مرحله نهایی: تمام مهارت‌هایت را به کار بگیر!",
    challengeGoal: "۲۰ سوال از تمام چهار عمل اصلی رو حل کن تا قهرمان کهکشان بشی.",
    nextChallengePreview: "تبریک! تو تمام مراحل رو با موفقیت پشت سر گذاشتی!"
  }
];
