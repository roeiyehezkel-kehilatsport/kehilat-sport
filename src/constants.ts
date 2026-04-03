/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Athlete } from './types';

export const ATHLETES_DATA: Athlete[] = [
  {
    id: "raz-hershko",
    name: "רז הרשקו",
    sport: "ג'ודו",
    category: "מעל 78 ק\"ג",
    rank: "24",
    olympicMedals: 1,
    bio: "רז הרשקו נולדה ב-1998 והחלה את דרכה על המזרן כבר בגיל צעיר. כיום היא נחשבת לאחת הג'ודוקא המובילות בעולם בקטגוריית המשקל שלה, המשלבת כוח מתפרץ עם טכניקה חסרת פשרות. הקריירה המקצוענית שלה המריאה עם זכיות במדליות בטורנירי הגראנד סלאם והגראנד פרי היוקרתיים. היא ידועה ברוח הלחימה שלה ובחיוך המפורסם שמסתיר מאחוריו נחישות של אלופה אמיתית.",
    heroImage: "https://picsum.photos/seed/raz-hershko-hero/1200/800",
    bgText: "JUDO",
    birthDate: "19 ביוני, 1998",
    height: "1.74 מ'",
    coach: "שני הרשקו",
    upcomingEvent: {
      title: "גראנד סלאם פריז 2024",
      date: "2-4 בפברואר, 2024"
    },
    achievements: [
      { year: "2023", title: "מדליית זהב היסטורית", desc: "ניצחון דרמטי בגמר גראנד סלאם תל אביב מול הקהל הביתי.", icon: "military_tech", color: "primary" },
      { year: "2022", title: "סגנית אלופת אירופה", desc: "הופעה מרשימה לאורך כל יום התחרויות בסופיה.", icon: "emoji_events", color: "secondary" },
      { year: "2021", title: "מדליית ארד קבוצתית", desc: "הישג שיא לנבחרת ישראל בג'ודו בטוקיו.", icon: "stars", color: "tertiary" }
    ],
    news: [
      { title: "רז הרשקו מסכמת שנה: \"היעד הבא - פריז 2024\"", desc: "בראיון בלעדי, הג'ודוקא מדברת על ההכנות המנטליות והשאיפה לעמוד בראש הפודיום האולימפי.", image: "https://picsum.photos/seed/raz-news-1/800/600", tag: "REPORT" },
      { title: "מאחורי הקלעים של מחנה האימונים ביפן", desc: "הצצה מיוחדת לשגרת האימונים האינטנסיבית של הרשקו יחד עם אלופות עולם יפניות.", image: "https://picsum.photos/seed/raz-news-2/800/600", tag: "TRAINING" },
      { title: "השראה לדור הבא: הרשקו במפגש עם ספורטאים צעירים", desc: "\"אל תפחדו לחלום בגדול\", אמרה הרשקו למאות בני נוער.", image: "https://picsum.photos/seed/raz-news-3/800/600", tag: "INTERVIEW" }
    ],
    schedule: [
      { day: "02", month: "FEB", title: "Grand Slam Paris", location: "Paris, France" },
      { day: "22", month: "MAR", title: "Tbilisi Grand Slam", location: "Tbilisi, Georgia" },
      { day: "25", month: "APR", title: "European Championships", location: "Zagreb, Croatia" }
    ]
  },
  {
    id: "artem-dolgopyat",
    name: "ארטיום דולגופיאט",
    sport: "התעמלות",
    category: "מכשירים | קרקע",
    rank: "1",
    olympicMedals: 2,
    bio: "ארטיום דולגופיאט הוא המתעמל הישראלי המעוטר ביותר בכל הזמנים. האלוף האולימפי מטוקיו 2020 ופריז 2024 בתרגיל הקרקע. דולגופיאט ידוע ברמת קושי גבוהה במיוחד ובביצועים מדויקים שהפכו אותו לשם דבר בעולם ההתעמלות.",
    heroImage: "https://picsum.photos/seed/artem-hero/1200/800",
    bgText: "GOLD",
    birthDate: "16 ביוני, 1997",
    height: "1.62 מ'",
    coach: "סרגיי וייסבורג",
    upcomingEvent: {
      title: "אליפות אירופה 2024",
      date: "24-28 באפריל, 2024"
    },
    achievements: [
      { year: "2024", title: "מדליית זהב אולימפית", desc: "הגנה על התואר האולימפי בפריז עם תרגיל קרקע מושלם.", icon: "military_tech", color: "primary" },
      { year: "2023", title: "אלוף העולם", desc: "זכייה היסטורית במדליית הזהב באליפות העולם באנטוורפן.", icon: "emoji_events", color: "primary" },
      { year: "2021", title: "מדליית זהב אולימפית", desc: "הישג היסטורי בטוקיו - מדליית זהב ראשונה לישראל בהתעמלות.", icon: "stars", color: "primary" }
    ],
    news: [
      { title: "ארטיום דולגופיאט: \"הזהב הוא רק ההתחלה\"", desc: "האלוף האולימפי על הדרך להגנה על התואר.", image: "https://picsum.photos/seed/artem-news-1/800/600", tag: "GOLD" },
      { title: "הטכניקה מאחורי הניצחון", desc: "ניתוח מעמיק של תרגיל הקרקע שהדהים את העולם.", image: "https://picsum.photos/seed/artem-news-2/800/600", tag: "ANALYSIS" },
      { title: "יום בחיי אלוף אולימפי", desc: "הצצה לשגרת האימונים המפרכת של ארטיום.", image: "https://picsum.photos/seed/artem-news-3/800/600", tag: "LIFE" }
    ],
    schedule: [
      { day: "24", month: "APR", title: "European Championships", location: "Rimini, Italy" },
      { day: "15", month: "MAY", title: "World Cup Varna", location: "Varna, Bulgaria" }
    ]
  },
  {
    id: "anastasia-gorbenko",
    name: "אנסטסיה גורבנקו",
    sport: "שחייה",
    category: "200 מ' מעורב",
    rank: "3",
    olympicMedals: 0,
    bio: "אנסטסיה גורבנקו היא השחיינית הישראלית המצליחה ביותר בכל הזמנים. היא מחזיקה בעשרות שיאים לאומיים וזכתה בתארים אירופיים ועולמיים. גורבנקו ידועה ביכולת הרב-גונית שלה ובחוסן המנטלי המאפשר לה להתחרות ברמות הגבוהות ביותר.",
    heroImage: "https://picsum.photos/seed/anastasia-hero/1200/800",
    bgText: "SWIM",
    birthDate: "7 באוגוסט, 2003",
    height: "1.76 מ'",
    coach: "טום ראשטון",
    upcomingEvent: {
      title: "אליפות אירופה 2024",
      date: "10-23 ביוני, 2024"
    },
    achievements: [
      { year: "2024", title: "סגנית אלופת העולם", desc: "מדליית כסף היסטורית באליפות העולם בדוחא ב-400 מ' מעורב.", icon: "military_tech", color: "secondary" },
      { year: "2022", title: "אלופת אירופה", desc: "הגנה על התואר ב-200 מ' מעורב אישי ברומא.", icon: "emoji_events", color: "primary" },
      { year: "2021", title: "אלופת העולם (בריכות קצרות)", desc: "שתי מדליות זהב באליפות העולם באבו דאבי.", icon: "stars", color: "primary" }
    ],
    news: [
      { title: "אנסטסיה גורבנקו: שיא ישראלי חדש", desc: "השחיינית הישראלית ממשיכה להדהים את העולם עם תוצאה היסטורית.", image: "https://picsum.photos/seed/ana-news-1/800/600", tag: "RECORD" },
      { title: "הדרך לגמר האולימפי", desc: "הכנות הנבחרת לקראת פריז 2024.", image: "https://picsum.photos/seed/ana-news-2/800/600", tag: "PREP" },
      { title: "ראיון עם המאמן טום ראשטון", desc: "על העבודה עם הכשרון הגדול ביותר של השחייה הישראלית.", image: "https://picsum.photos/seed/ana-news-3/800/600", tag: "COACH" }
    ],
    schedule: [
      { day: "10", month: "JUN", title: "European Championships", location: "Belgrade, Serbia" },
      { day: "27", month: "JUL", title: "Olympic Games", location: "Paris, France" }
    ]
  },
  {
    id: "sharon-kantor",
    name: "שרון קנטור",
    sport: "שייט",
    category: "iQFoil",
    rank: "1",
    olympicMedals: 1,
    bio: "שרון קנטור היא אלופת העולם וסגנית האלופה האולימפית בדגם ה-iQFoil. היא פרצה לצמרת העולמית במהירות מסחררת והפכה לאחת הגולשות הדומיננטיות ביותר בסבב העולמי. קנטור ידועה ביכולת הטקטית שלה וביכולת להתמודד עם תנאי ים משתנים.",
    heroImage: "https://picsum.photos/seed/sharon-hero/1200/800",
    bgText: "WIND",
    birthDate: "28 בינואר, 2003",
    height: "1.70 מ'",
    coach: "שחר צוברי",
    upcomingEvent: {
      title: "אליפות אירופה 2024",
      date: "6-12 באוקטובר, 2024"
    },
    achievements: [
      { year: "2024", title: "מדליית כסף אולימפית", desc: "הישג אדיר במשחקים האולימפיים בפריז.", icon: "military_tech", color: "secondary" },
      { year: "2024", title: "אלופת העולם", desc: "זכייה בזהב באליפות העולם בלנזרוטה.", icon: "emoji_events", color: "primary" },
      { year: "2023", title: "מדליית כסף באליפות אירופה", desc: "המשך הרצף המרשים ביוון.", icon: "stars", color: "secondary" }
    ],
    news: [
      { title: "שרון קנטור: \"הים הוא הבית השני שלי\"", desc: "ראיון עם אלופת העולם הטרייה על ההכנות למשחקים.", image: "https://picsum.photos/seed/sharon-news-1/800/600", tag: "INTERVIEW" },
      { title: "המהפכה של דגם ה-iQFoil", desc: "איך הגלשן המעופף שינה את עולם השייט.", image: "https://picsum.photos/seed/sharon-news-2/800/600", tag: "TECH" },
      { title: "שחר צוברי על ההצלחה של שרון", desc: "המאמן והמדליסט האולימפי לשעבר מנתח את ההישג.", image: "https://picsum.photos/seed/sharon-news-3/800/600", tag: "COACH" }
    ],
    schedule: [
      { day: "06", month: "OCT", title: "European Championships", location: "Cagliari, Italy" },
      { day: "15", month: "NOV", title: "PWA World Tour", location: "Yokosuka, Japan" }
    ]
  }
];

export const SPORT_CONTENT: Record<string, any> = {
  "ג'ודו": {
    heroTitle: "ג'ודו",
    heroDesc: "המסורת של מצוינות ממשיכה. הג'ודו הישראלי עומד בחזית הספורט העולמי עם נבחרת מעוטרת ששואפת תמיד למדרגה הגבוהה ביותר על הפודיום.",
    heroImage: "https://picsum.photos/seed/judo-hero/1200/800",
    bgText: "IPPON",
    news: [
      { title: "הדרך לפריז: ראיון עומק עם המאמן הלאומי", desc: "ההכנות בשיאן, הלחץ עולה והמטרות ברורות. המאמן חושף את האסטרטגיה שתביא אותנו שוב לפודיום האולימפי.", image: "https://picsum.photos/seed/judo-news-1/800/600", tag: "בלעדי" },
      { title: "5 המהלכים המנצחים של העונה", desc: "ניתוח טכני של הקרבות המכריעים והטקטיקות שהובילו לניצחון.", image: "https://picsum.photos/seed/judo-news-2/400/300", tag: "ניתוח טכני" },
      { title: "דור העתיד: הכירו את אלופי הנוער", desc: "הכשרונות הצעירים שצפויים להוביל את הענף בשנים הבאות.", image: "https://picsum.photos/seed/judo-news-3/400/300", tag: "נוער" }
    ],
    athletes: [
      { name: "פיטר פלצ'יק", rank: "Gold Rank", category: "עד 100 ק\"ג", desc: "אלוף אירופה לשעבר, מדליסט ארד אולימפי", image: "https://picsum.photos/seed/peter/400/500" },
      { name: "רז הרשקו", rank: "Silver Rank", category: "מעל 78 ק\"ג", desc: "מדורגת ראשונה בעולם, אלופת אירופה", image: "https://picsum.photos/seed/raz-h/400/500" },
      { name: "ברוך שמאילוב", rank: "Bronze Rank", category: "עד 66 ק\"ג", desc: "זוכה מדליות גראנד סלאם רבות", image: "https://picsum.photos/seed/baruch-s/400/500" }
    ],
    rankings: [
      { name: "רז הרשקו", category: "נשים | +78 ק\"ג", rank: 1, points: "8,450" },
      { name: "פיטר פלצ'יק", category: "גברים | -100 ק\"ג", rank: 4, points: "5,120" },
      { name: "תמנע נלסון לוי", category: "נשים | -57 ק\"ג", rank: 7, points: "4,890" }
    ],
    medals: { gold: 0, silver: 1, bronze: 5 }
  },
  "שייט": {
    heroTitle: "שייט",
    heroDesc: "עם רוח גבית ומפרשים פרוסים, נבחרת השייט של ישראל כובשת את הימים. מסורת של הצלחות אולימפיות ודור חדש של גולשים וגולשות.",
    heroImage: "https://picsum.photos/seed/sailing-hero/1200/800",
    bgText: "WIND",
    news: [
      { title: "שרון קנטור: 'הים הוא הבית השני שלי'", desc: "ראיון עם אלופת העולם הטרייה על ההכנות למשחקים האולימפיים.", image: "https://picsum.photos/seed/sailing-news-1/800/600", tag: "ראיון" },
      { title: "טכנולוגיית המפרשים החדשה", desc: "איך המדע עוזר לשייטים שלנו להשיג יתרון משמעותי.", image: "https://picsum.photos/seed/sailing-news-2/400/300", tag: "טכנולוגיה" },
      { title: "סיכום שבוע השייט בפלמה", desc: "הישגים מרשימים לנבחרת הישראלית בתחרות הבינלאומית.", image: "https://picsum.photos/seed/sailing-news-3/400/300", tag: "תחרות" }
    ],
    athletes: [
      { name: "שרון קנטור", rank: "Gold Rank", category: "iQFoil", desc: "אלופת העולם 2024", image: "https://picsum.photos/seed/sharon/400/500" },
      { name: "תום ראובני", rank: "Gold Rank", category: "iQFoil", desc: "אלוף אולימפי פריז 2024", image: "https://picsum.photos/seed/tom/400/500" },
      { name: "גל צוקרמן", rank: "Silver Rank", category: "קייט פויל", desc: "מהכשרונות המבטיחים בעולם", image: "https://picsum.photos/seed/gal/400/500" }
    ],
    rankings: [
      { name: "שרון קנטור", category: "נשים | iQFoil", rank: 1, points: "9,200" },
      { name: "תום ראובני", category: "גברים | iQFoil", rank: 1, points: "8,800" },
      { name: "נועה לסרי", category: "נשים | 470", rank: 5, points: "4,200" }
    ],
    medals: { gold: 2, silver: 1, bronze: 2 }
  },
  "שחייה": {
    heroTitle: "שחייה",
    heroDesc: "המים הם הזירה שלנו. נבחרת השחייה של ישראל מנפצת שיאים ומגיעה לגמרים היסטוריים באליפויות העולם ובמשחקים האולימפיים.",
    heroImage: "https://picsum.photos/seed/swimming-hero/1200/800",
    bgText: "WAVES",
    news: [
      { title: "אנסטסיה גורבנקו: שיא ישראלי חדש", desc: "השחיינית הישראלית ממשיכה להדהים את העולם עם תוצאה היסטורית.", image: "https://picsum.photos/seed/swim-news-1/800/600", tag: "שיא" },
      { title: "הכנות נבחרת השליחים", desc: "איך בונים קבוצה מנצחת למשחה ה-4X100.", image: "https://picsum.photos/seed/swim-news-2/400/300", tag: "נבחרת" },
      { title: "מרכז השחייה החדש בווינגייט", desc: "הבית החדש של השחיינים הישראלים נפתח רשמית.", image: "https://picsum.photos/seed/swim-news-3/400/300", tag: "תשתית" }
    ],
    athletes: [
      { name: "אנסטסיה גורבנקו", rank: "Gold Rank", category: "200 מ' מעורב", desc: "אלופת אירופה, מדליסטית באליפות העולם", image: "https://picsum.photos/seed/anastasia/400/500" },
      { name: "מירון חירותי", rank: "Silver Rank", category: "50 מ' חופשי", desc: "שיאן ישראל ב-50 מ' חופשי", image: "https://picsum.photos/seed/meiron/400/500" },
      { name: "גל כהן גרומי", rank: "Bronze Rank", category: "100 מ' פרפר", desc: "פיינליסט אולימפי", image: "https://picsum.photos/seed/gal-c/400/500" }
    ],
    rankings: [
      { name: "אנסטסיה גורבנקו", category: "נשים | 200 מעורב", rank: 3, points: "7,100" },
      { name: "מירון חירותי", category: "גברים | 50 חופשי", rank: 12, points: "3,800" }
    ],
    medals: { gold: 0, silver: 0, bronze: 0 }
  },
  "אתלטיקה": {
    heroTitle: "אתלטיקה",
    heroDesc: "מהיר יותר, גבוה יותר, חזק יותר. מלכת הספורט בישראל חווה פריחה מחודשת עם הישגים היסטוריים בריצות המרתון ובקפיצות.",
    heroImage: "https://picsum.photos/seed/athletics-hero/1200/800",
    bgText: "FAST",
    news: [
      { title: "מארו טפרי: 'המרתון הוא קרב מנטלי'", desc: "סגן אלוף העולם משתף בתחושות אחרי ההישג ההיסטורי.", image: "https://picsum.photos/seed/run-news-1/800/600", tag: "מרתון" },
      { title: "חנה קנייזבה מיננקו חוזרת למסלול", desc: "הקופצת הבכירה מתאוששת מפציעה ומכוונת לפריז.", image: "https://picsum.photos/seed/run-news-2/400/300", tag: "קפיצות" },
      { title: "שיא נוער חדש ב-100 מטר", desc: "הכירו את האצן הצעיר ששבר את השיא המיתולוגי.", image: "https://picsum.photos/seed/run-news-3/400/300", tag: "נוער" }
    ],
    athletes: [
      { name: "מארו טפרי", rank: "Gold Rank", category: "מרתון", desc: "סגן אלוף העולם 2023", image: "https://picsum.photos/seed/maru/400/500" },
      { name: "לונה צ'מטאי סלפטר", rank: "Gold Rank", category: "מרתון", desc: "מדליסטית ארד באליפות העולם", image: "https://picsum.photos/seed/lonah/400/500" },
      { name: "חנה קנייזבה מיננקו", rank: "Silver Rank", category: "קפיצה משולשת", desc: "סגנית אלופת העולם לשעבר", image: "https://picsum.photos/seed/hanna/400/500" }
    ],
    rankings: [
      { name: "מארו טפרי", category: "גברים | מרתון", rank: 5, points: "6,500" },
      { name: "לונה סלפטר", category: "נשים | מרתון", rank: 4, points: "6,800" }
    ],
    medals: { gold: 0, silver: 0, bronze: 0 }
  },
  "התעמלות": {
    heroTitle: "התעמלות",
    heroDesc: "דיוק, עוצמה ואסתטיקה. ענף ההתעמלות הפך לאחד הענפים המצליחים ביותר בישראל עם מדליות זהב אולימפיות ודור של אלופים.",
    heroImage: "https://picsum.photos/seed/gym-hero/1200/800",
    bgText: "GOLD",
    news: [
      { title: "ארטיום דולגופיאט: 'הזהב הוא רק ההתחלה'", desc: "האלוף האולימפי על הדרך להגנה על התואר.", image: "https://picsum.photos/seed/gym-news-1/800/600", tag: "זהב" },
      { title: "נבחרת ההתעמלות האמנותית בשיא הכושר", desc: "הבנות שחולמות על פודיום קבוצתי היסטורי.", image: "https://picsum.photos/seed/gym-news-2/400/300", tag: "אמנותית" },
      { title: "הכירו את דריה אטמנוב", desc: "הכוכבת העולה של ההתעמלות האמנותית הישראלית.", image: "https://picsum.photos/seed/gym-news-3/400/300", tag: "פרופיל" }
    ],
    athletes: [
      { name: "ארטיום דולגופיאט", rank: "Gold Rank", category: "מכשירים | קרקע", desc: "אלוף אולימפי טוקיו 2020", image: "https://picsum.photos/seed/artium/400/500" },
      { name: "דריה אטמנוב", rank: "Gold Rank", category: "אמנותית", desc: "אלופת אירופה 2022", image: "https://picsum.photos/seed/daria/400/500" },
      { name: "ליהיא רז", rank: "Silver Rank", category: "מכשירים", desc: "מדליסטית ארד באליפות אירופה", image: "https://picsum.photos/seed/lihi/400/500" }
    ],
    rankings: [
      { name: "ארטיום דולגופיאט", category: "גברים | קרקע", rank: 1, points: "9,500" },
      { name: "דריה אטמנוב", category: "נשים | אמנותית", rank: 2, points: "8,900" }
    ],
    medals: { gold: 2, silver: 0, bronze: 0 }
  },
  "ספורט פראלימפי": {
    heroTitle: "ספורט פראלימפי",
    heroDesc: "ניצחון הרוח על הגוף. הספורטאים הפראלימפיים של ישראל הם מקור לגאווה עצומה והשראה, עם עשרות מדליות לאורך השנים.",
    heroImage: "https://picsum.photos/seed/para-hero/1200/800",
    bgText: "SPIRIT",
    news: [
      { title: "עמי דדאון: 'המים נותנים לי חופש'", desc: "השחיין המעוטר על ההכנות למשחקים הפראלימפיים.", image: "https://picsum.photos/seed/para-news-1/800/600", tag: "השראה" },
      { title: "נבחרת הכדורשער מכוונת גבוה", desc: "הבנות שרוצות לשחזר את ההישג מאליפות העולם.", image: "https://picsum.photos/seed/para-news-2/400/300", tag: "נבחרת" },
      { title: "מורן סמואל: 'החתירה היא החיים שלי'", desc: "החותרת הבכירה על האתגרים והניצחונות.", image: "https://picsum.photos/seed/para-news-3/400/300", tag: "חתירה" }
    ],
    athletes: [
      { name: "עמי דדאון", rank: "Gold Rank", category: "שחייה", desc: "אלוף פראלימפי רב פעמי", image: "https://picsum.photos/seed/ami/400/500" },
      { name: "מורן סמואל", rank: "Gold Rank", category: "חתירה", desc: "אלופת עולם ומדליסטית פראלימפית", image: "https://picsum.photos/seed/moran/400/500" },
      { name: "גיא ששון", rank: "Gold Rank", category: "טניס כסאות גלגלים", desc: "אלוף הרולאן גארוס 2024", image: "https://picsum.photos/seed/guy/400/500" }
    ],
    rankings: [
      { name: "עמי דדאון", category: "שחייה | S4", rank: 1, points: "10,000" },
      { name: "גיא ששון", category: "טניס | Quad", rank: 2, points: "8,500" }
    ],
    medals: { gold: 129, silver: 125, bronze: 130 }
  },
  "ענפים אחרים": {
    heroTitle: "ענפים נוספים",
    heroDesc: "מעבר לענפי הליבה, ישראל מצטיינת במגוון רחב של ענפי ספורט - מטאקוונדו ועד רכיבת סוסים, כולם שואפים למצוינות אולימפית.",
    heroImage: "https://picsum.photos/seed/other-hero/1200/800",
    bgText: "MORE",
    news: [
      { title: "אבישג סמברג: 'הטאקוונדו הוא הכל עבורי'", desc: "המדליסטית האולימפית על החלום לזהב בפריז.", image: "https://picsum.photos/seed/other-news-1/800/600", tag: "טאקוונדו" },
      { title: "נבחרת הרכיבה על סוסים הבטיחה מקום", desc: "הישג היסטורי לנבחרת הקפיצות הישראלית.", image: "https://picsum.photos/seed/other-news-2/400/300", tag: "רכיבה" },
      { title: "הכוכבים העולים בטיפוס ספורטיבי", desc: "הענף החדש שסוחף את ישראל.", image: "https://picsum.photos/seed/other-news-3/400/300", tag: "טיפוס" }
    ],
    athletes: [
      { name: "אבישג סמברג", rank: "Gold Rank", category: "טאקוונדו", desc: "מדליסטית ארד אולימפית", image: "https://picsum.photos/seed/avishag/400/500" },
      { name: "דניאל בלומן", rank: "Gold Rank", category: "רכיבת סוסים", desc: "מהרוכבים הטובים בעולם", image: "https://picsum.photos/seed/daniel/400/500" },
      { name: "מיכאל יעקובלב", rank: "Silver Rank", category: "אופני מסלול", desc: "שיאן עולם לשעבר", image: "https://picsum.photos/seed/mikhail/400/500" }
    ],
    rankings: [
      { name: "אבישג סמברג", category: "נשים | -49 ק\"ג", rank: 5, points: "4,200" },
      { name: "דניאל בלומן", category: "רכיבה | קפיצות", rank: 10, points: "3,500" }
    ],
    medals: { gold: 0, silver: 0, bronze: 1 }
  }
};
