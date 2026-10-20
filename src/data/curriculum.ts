/* ============================================================
   TIL curriculum — data-driven content engine.
   Kazakh (Cyrillic) with EN/RU explanations.
   Content status: draft for review by a qualified Kazakh
   speaker / teacher before production publication.
   ============================================================ */

export interface Vocab {
  id: string;
  kz: string;
  en: string;
  ru: string;
  /** pronunciation aid in Latin letters — a learning helper, not an official standard */
  tr: string;
  pos: string;
  exKz: string;
  exEn: string;
  exRu: string;
  chapter: number;
}

export const VOCAB: Vocab[] = [
  // Chapter 1 — First Words
  { id:"salem", kz:"Сәлем", en:"Hello", ru:"Привет", tr:"sälem", pos:"greeting", exKz:"Сәлем! Қалың қалай?", exEn:"Hello! How are you?", exRu:"Привет! Как дела?", chapter:1 },
  { id:"salemetsizbe", kz:"Сәлеметсіз бе", en:"Hello (polite)", ru:"Здравствуйте", tr:"sälemetsiz be", pos:"greeting", exKz:"Сәлеметсіз бе, апай!", exEn:"Hello, teacher!", exRu:"Здравствуйте!", chapter:1 },
  { id:"raqmet", kz:"Рақмет", en:"Thank you", ru:"Спасибо", tr:"raqmet", pos:"phrase", exKz:"Көмегіңізге рақмет.", exEn:"Thank you for your help.", exRu:"Спасибо за помощь.", chapter:1 },
  { id:"saubol", kz:"Сау болыңыз", en:"Goodbye (polite)", ru:"До свидания", tr:"sau bolyŋyz", pos:"greeting", exKz:"Сау болыңыз, ертең көрісеміз.", exEn:"Goodbye, see you tomorrow.", exRu:"До свидания, до завтра.", chapter:1 },
  { id:"ia", kz:"Иә", en:"Yes", ru:"Да", tr:"iä", pos:"word", exKz:"— Шай ішесіз бе? — Иә.", exEn:"— Would you like tea? — Yes.", exRu:"— Будете чай? — Да.", chapter:1 },
  { id:"zhoq", kz:"Жоқ", en:"No", ru:"Нет", tr:"joq", pos:"word", exKz:"Жоқ, рақмет.", exEn:"No, thank you.", exRu:"Нет, спасибо.", chapter:1 },
  { id:"keshiriniz", kz:"Кешіріңіз", en:"Excuse me / Sorry (polite)", ru:"Извините", tr:"keşiriŋiz", pos:"phrase", exKz:"Кешіріңіз, бұл не?", exEn:"Excuse me, what is this?", exRu:"Извините, это что?", chapter:1 },
  { id:"qalinqalai", kz:"Қалыңыз қалай?", en:"How are you? (polite)", ru:"Как у вас дела?", tr:"qalyŋyz qalai?", pos:"phrase", exKz:"— Қалыңыз қалай? — Жақсы, рақмет.", exEn:"— How are you? — Good, thanks.", exRu:"— Как дела? — Хорошо, спасибо.", chapter:1 },
  { id:"zhaqsy", kz:"Жақсы", en:"Good / well", ru:"Хорошо / хороший", tr:"jaqsy", pos:"adjective", exKz:"Бәрі жақсы.", exEn:"Everything is good.", exRu:"Всё хорошо.", chapter:1 },
  { id:"otanbas", kz:"Отандас", en:"Fellow countryman", ru:"Соотечественник", tr:"otandas", pos:"noun", exKz:"Ол — менің отандасым.", exEn:"He is my fellow countryman.", exRu:"Он мой соотечественник.", chapter:1 },
  { id:"men", kz:"Мен", en:"I", ru:"Я", tr:"men", pos:"pronoun", exKz:"Мен студентпін.", exEn:"I am a student.", exRu:"Я студент.", chapter:1 },
  { id:"sen", kz:"Сен", en:"You (one person, friendly)", ru:"Ты", tr:"sen", pos:"pronoun", exKz:"Сен қайдансың?", exEn:"Where are you from?", exRu:"Ты откуда?", chapter:1 },
  { id:"siz", kz:"Сіз", en:"You (polite)", ru:"Вы", tr:"siz", pos:"pronoun", exKz:"Сіз қайдансыз?", exEn:"Where are you from? (polite)", exRu:"Вы откуда?", chapter:1 },
  { id:"ol", kz:"Ол", en:"He / she / that", ru:"Он / она / тот", tr:"ol", pos:"pronoun", exKz:"Ол — менің досым.", exEn:"She is my friend.", exRu:"Она моя подруга.", chapter:1 },
  { id:"bulne", kz:"Бұл не?", en:"What is this?", ru:"Это что?", tr:"būl ne?", pos:"phrase", exKz:"— Бұл не? — Бұл кітап.", exEn:"— What is this? — This is a book.", exRu:"— Это что? — Это книга.", chapter:1 },
  { id:"kitap", kz:"Кітап", en:"Book", ru:"Книга", tr:"kitap", pos:"noun", exKz:"Бұл — жақсы кітап.", exEn:"This is a good book.", exRu:"Это хорошая книга.", chapter:1 },
  { id:"su", kz:"Су", en:"Water", ru:"Вода", tr:"su", pos:"noun", exKz:"Су беріңізші.", exEn:"Water, please.", exRu:"Дайте воду, пожалуйста.", chapter:1 },
  { id:"shai", kz:"Шай", en:"Tea", ru:"Чай", tr:"şai", pos:"noun", exKz:"Шай ішесіз бе?", exEn:"Would you like some tea?", exRu:"Будете чай?", chapter:1 },
  // Chapter 2 — About Me
  { id:"atym", kz:"Менің атым…", en:"My name is…", ru:"Меня зовут…", tr:"meniŋ atym…", pos:"phrase", exKz:"Менің атым — Айша.", exEn:"My name is Aisha.", exRu:"Меня зовут Айша.", chapter:2 },
  { id:"qaidansyz", kz:"Қайдансыз?", en:"Where are you from? (polite)", ru:"Вы откуда?", tr:"qaidansyz?", pos:"phrase", exKz:"— Қайдансыз? — Мен Алматыданмын.", exEn:"— Where are you from? — I'm from Almaty.", exRu:"— Вы откуда? — Я из Алматы.", chapter:2 },
  { id:"almaty", kz:"Алматы", en:"Almaty", ru:"Алматы", tr:"Almaty", pos:"place", exKz:"Мен Алматыда тұрамын.", exEn:"I live in Almaty.", exRu:"Я живу в Алматы.", chapter:2 },
  { id:"astana", kz:"Астана", en:"Astana", ru:"Астана", tr:"Astana", pos:"place", exKz:"Астана — Қазақстанның астанасы.", exEn:"Astana is the capital of Kazakhstan.", exRu:"Астана — столица Казахстана.", chapter:2 },
  { id:"qazaqstan", kz:"Қазақстан", en:"Kazakhstan", ru:"Казахстан", tr:"Qazaqstan", pos:"place", exKz:"Қазақстан — үлкен ел.", exEn:"Kazakhstan is a big country.", exRu:"Казахстан — большая страна.", chapter:2 },
  { id:"student", kz:"Студент", en:"Student", ru:"Студент", tr:"student", pos:"noun", exKz:"Мен студентпін.", exEn:"I am a student.", exRu:"Я студент.", chapter:2 },
  { id:"mugalym", kz:"Мұғалім", en:"Teacher", ru:"Учитель", tr:"mūğalim", pos:"noun", exKz:"Ол — мұғалім.", exEn:"She is a teacher.", exRu:"Она учитель.", chapter:2 },
  { id:"dos", kz:"Дос", en:"Friend", ru:"Друг", tr:"dos", pos:"noun", exKz:"Бұл — менің досым.", exEn:"This is my friend.", exRu:"Это мой друг.", chapter:2 },
  { id:"til", kz:"Тіл", en:"Language / tongue", ru:"Язык", tr:"til", pos:"noun", exKz:"Қазақ тілі — әдемі тіл.", exEn:"Kazakh is a beautiful language.", exRu:"Казахский — красивый язык.", chapter:2 },
  { id:"qazaqsha", kz:"Қазақша", en:"In Kazakh", ru:"По-казахски", tr:"qazaqşa", pos:"adverb", exKz:"Мен қазақша үйреніп жүрмін.", exEn:"I am learning Kazakh.", exRu:"Я учу казахский.", chapter:2 },
  { id:"oryssha", kz:"Орысша", en:"In Russian", ru:"По-русски", tr:"orysşa", pos:"adverb", exKz:"Ол орысша сөйлейді.", exEn:"He speaks Russian.", exRu:"Он говорит по-русски.", chapter:2 },
  { id:"agylshynsha", kz:"Ағылшынша", en:"In English", ru:"По-английски", tr:"ağylşynşa", pos:"adverb", exKz:"Сіз ағылшынша сөйлейсіз бе?", exEn:"Do you speak English?", exRu:"Вы говорите по-английски?", chapter:2 },
  { id:"soileu", kz:"Сөйлеу", en:"To speak", ru:"Говорить", tr:"söileu", pos:"verb", exKz:"Мен қазақша сөйлегім келеді.", exEn:"I want to speak Kazakh.", exRu:"Я хочу говорить по-казахски.", chapter:2 },
  { id:"uirenu", kz:"Үйрену", en:"To learn", ru:"Учить / учиться", tr:"üirenu", pos:"verb", exKz:"Мен жаңа сөздер үйренемін.", exEn:"I learn new words.", exRu:"Я учу новые слова.", chapter:2 },
  { id:"soz", kz:"Сөз", en:"Word", ru:"Слово", tr:"söz", pos:"noun", exKz:"Бұл — жаңа сөз.", exEn:"This is a new word.", exRu:"Это новое слово.", chapter:2 },
  { id:"zhana", kz:"Жаңа", en:"New", ru:"Новый", tr:"jaŋa", pos:"adjective", exKz:"Бұл — жаңа кітап.", exEn:"This is a new book.", exRu:"Это новая книга.", chapter:2 },
  { id:"ulken", kz:"Үлкен", en:"Big", ru:"Большой", tr:"ülken", pos:"adjective", exKz:"Алматы — үлкен қала.", exEn:"Almaty is a big city.", exRu:"Алматы — большой город.", chapter:2 },
  { id:"ademi", kz:"Әдемі", en:"Beautiful", ru:"Красивый", tr:"ädemi", pos:"adjective", exKz:"Қандай әдемі қала!", exEn:"What a beautiful city!", exRu:"Какой красивый город!", chapter:2 },
  // Chapter 3 — Around the City
  { id:"qala", kz:"Қала", en:"City", ru:"Город", tr:"qala", pos:"noun", exKz:"Бұл қала маған ұнайды.", exEn:"I like this city.", exRu:"Мне нравится этот город.", chapter:3 },
  { id:"ui", kz:"Үй", en:"Home / house", ru:"Дом", tr:"üi", pos:"noun", exKz:"Менің үйім осында.", exEn:"My home is here.", exRu:"Мой дом здесь.", chapter:3 },
  { id:"mektep", kz:"Мектеп", en:"School", ru:"Школа", tr:"mektep", pos:"noun", exKz:"Мектеп қайда?", exEn:"Where is the school?", exRu:"Где школа?", chapter:3 },
  { id:"duken", kz:"Дүкен", en:"Shop", ru:"Магазин", tr:"düken", pos:"noun", exKz:"Дүкен ашық па?", exEn:"Is the shop open?", exRu:"Магазин открыт?", chapter:3 },
  { id:"bazar", kz:"Базар", en:"Market / bazaar", ru:"Базар / рынок", tr:"bazar", pos:"noun", exKz:"Базарда алма бар.", exEn:"There are apples at the market.", exRu:"На базаре есть яблоки.", chapter:3 },
  { id:"qaida", kz:"Қайда?", en:"Where?", ru:"Где?", tr:"qaida?", pos:"question", exKz:"Дүкен қайда?", exEn:"Where is the shop?", exRu:"Где магазин?", chapter:3 },
  { id:"osynda", kz:"Осында", en:"Here", ru:"Здесь", tr:"osynda", pos:"adverb", exKz:"Мен осында тұрамын.", exEn:"I live here.", exRu:"Я живу здесь.", chapter:3 },
  { id:"anda", kz:"Анда", en:"There (over there)", ru:"Там / туда", tr:"anda", pos:"adverb", exKz:"Базар анда.", exEn:"The market is over there.", exRu:"Базар вон там.", chapter:3 },
  { id:"tau", kz:"Тау", en:"Mountain", ru:"Гора", tr:"tau", pos:"noun", exKz:"Алматыда тау бар.", exEn:"Almaty has mountains.", exRu:"В Алматы есть горы.", chapter:3 },
  { id:"alma", kz:"Алма", en:"Apple", ru:"Яблоко", tr:"alma", pos:"noun", exKz:"Алма — дәмді.", exEn:"The apple is tasty.", exRu:"Яблоко вкусное.", chapter:3 },
  { id:"nan", kz:"Нан", en:"Bread", ru:"Хлеб", tr:"nan", pos:"noun", exKz:"Нан бар ма?", exEn:"Is there bread?", exRu:"Хлеб есть?", chapter:3 },
  { id:"bar", kz:"Бар", en:"There is / there are", ru:"Есть / имеется", tr:"bar", pos:"word", exKz:"Осында дүкен бар.", exEn:"There is a shop here.", exRu:"Здесь есть магазин.", chapter:3 },
  { id:"berinizshi", kz:"Беріңізші", en:"Please give (me)", ru:"Дайте, пожалуйста", tr:"beriŋizşi", pos:"phrase", exKz:"Су беріңізші.", exEn:"Water, please.", exRu:"Дайте воду, пожалуйста.", chapter:3 },
  { id:"qansha", kz:"Қанша?", en:"How much / how many?", ru:"Сколько?", tr:"qanşa?", pos:"question", exKz:"Бұл қанша тұрады?", exEn:"How much does this cost?", exRu:"Сколько это стоит?", chapter:3 },
  { id:"bir", kz:"Бір", en:"One", ru:"Один", tr:"bir", pos:"number", exKz:"Бір шай, өтінемін.", exEn:"One tea, please.", exRu:"Один чай, пожалуйста.", chapter:3 },
  { id:"eki", kz:"Екі", en:"Two", ru:"Два", tr:"eki", pos:"number", exKz:"Екі алма беріңізші.", exEn:"Two apples, please.", exRu:"Дайте два яблока.", chapter:3 },
  { id:"ush", kz:"Үш", en:"Three", ru:"Три", tr:"üş", pos:"number", exKz:"Үш кітап.", exEn:"Three books.", exRu:"Три книги.", chapter:3 },
  { id:"tort", kz:"Төрт", en:"Four", ru:"Четыре", tr:"tört", pos:"number", exKz:"Төрт дос.", exEn:"Four friends.", exRu:"Четверо друзей.", chapter:3 },
  { id:"bes", kz:"Бес", en:"Five", ru:"Пять", tr:"bes", pos:"number", exKz:"Бес минут.", exEn:"Five minutes.", exRu:"Пять минут.", chapter:3 },
  { id:"on2", kz:"Он", en:"Ten", ru:"Десять", tr:"on", pos:"number", exKz:"Он сөз үйрендім.", exEn:"I learned ten words.", exRu:"Я выучил десять слов.", chapter:3 },
  { id:"damdi", kz:"Дәмді", en:"Tasty", ru:"Вкусный", tr:"dämdi", pos:"adjective", exKz:"Тамақ өте дәмді.", exEn:"The food is very tasty.", exRu:"Еда очень вкусная.", chapter:3 },
  { id:"ote", kz:"Өте", en:"Very", ru:"Очень", tr:"öte", pos:"adverb", exKz:"Өте жақсы!", exEn:"Very good!", exRu:"Очень хорошо!", chapter:3 },
  { id:"tamaq", kz:"Тамақ", en:"Food / meal", ru:"Еда", tr:"tamaq", pos:"noun", exKz:"Тамақ дайын ба?", exEn:"Is the food ready?", exRu:"Еда готова?", chapter:3 },
  // Extra shared vocab for stories / grammar
  { id:"kun", kz:"Күн", en:"Day / sun", ru:"День / солнце", tr:"kün", pos:"noun", exKz:"Бүгін жақсы күн.", exEn:"Today is a good day.", exRu:"Сегодня хороший день.", chapter:3 },
  { id:"bugin", kz:"Бүгін", en:"Today", ru:"Сегодня", tr:"bügin", pos:"adverb", exKz:"Бүгін менің сабағым бар.", exEn:"I have a lesson today.", exRu:"Сегодня у меня урок.", chapter:3 },
  { id:"sabaq", kz:"Сабақ", en:"Lesson", ru:"Урок", tr:"sabaq", pos:"noun", exKz:"Сабақ басталды.", exEn:"The lesson has started.", exRu:"Урок начался.", chapter:3 },
];

export const vocabById = Object.fromEntries(VOCAB.map((v) => [v.id, v]));

/* ---------------- Exercises ---------------- */
export type ExType = "teach" | "mc" | "listen" | "tiles" | "type" | "fill" | "match" | "dialogue" | "repeat";

export interface Exercise {
  id: string;
  type: ExType;
  /** target vocab ids credited for SRS */
  vocab: string[];
  /** main Kazakh text (teach/listen/mc prompt) */
  kz?: string;
  /** meaning prompt for reverse/tiles */
  en?: string; ru?: string;
  /** option vocab ids (mc/listen/fill) */
  options?: string[];
  answerId?: string;
  /** tiles */
  tokens?: string[]; answerTokens?: string[];
  /** type: accepted Kazakh answers */
  accepted?: string[];
  /** fill: sentence with ___ */
  sentenceParts?: [string, string];
  /** match pairs (vocab ids) */
  pairs?: string[];
  /** dialogue */
  speaker?: string; lineKz?: string; lineEn?: string; lineRu?: string;
  replyOptions?: { kz: string; en: string; ru: string }[]; replyAnswer?: number;
  /** explanation shown after checking */
  explainEn: string; explainRu: string;
  isNew?: boolean;
}

const E = (e: Exercise) => e;

export interface Lesson {
  id: string; chapterId: number;
  titleEn: string; titleRu: string;
  objectiveEn: string; objectiveRu: string;
  icon: string; minutes: number;
  newVocab: string[];
  exercises: Exercise[];
  checkpoint?: boolean;
}

export interface Chapter {
  id: number; titleEn: string; titleRu: string;
  objectiveEn: string; objectiveRu: string;
  color: "Forest" | "sky" | "clay" | "plum" | "saffron";
  status: "ready" | "soon";
}

export const CHAPTERS: Chapter[] = [
  { id:1, titleEn:"First Words", titleRu:"Первые слова", objectiveEn:"Greet people, say thanks, and hold your first tiny conversation.", objectiveRu:"Приветствия, благодарность и первый короткий разговор.", color:"Forest", status:"ready" },
  { id:2, titleEn:"About Me", titleRu:"Обо мне", objectiveEn:"Say your name, where you're from, and which languages you speak.", objectiveRu:"Имя, откуда вы и на каких языках говорите.", color:"sky", status:"ready" },
  { id:3, titleEn:"Around the City", titleRu:"По городу", objectiveEn:"Find places, ask where things are, and buy small things politely.", objectiveRu:"Места в городе, вопросы «где?» и вежливые покупки.", color:"clay", status:"ready" },
  { id:4, titleEn:"Food & Everyday Life", titleRu:"Еда и повседневная жизнь", objectiveEn:"Cafés, markets and meals.", objectiveRu:"Кафе, рынки и еда.", color:"saffron", status:"soon" },
  { id:5, titleEn:"People & Connections", titleRu:"Люди и связи", objectiveEn:"Family, friends and descriptions.", objectiveRu:"Семья, друзья и описания.", color:"plum", status:"soon" },
  { id:6, titleEn:"Time & Plans", titleRu:"Время и планы", objectiveEn:"Days, schedules and simple plans.", objectiveRu:"Дни, расписание и простые планы.", color:"Forest", status:"soon" },
];

export const LESSONS: Lesson[] = [
  {
    id:"1-1", chapterId:1, icon:"hand", minutes:3,
    titleEn:"Сәлем! Say hello", titleRu:"Сәлем! Приветствия",
    objectiveEn:"Greet a friend and answer “How are you?”", objectiveRu:"Поздороваться и ответить на «Как дела?»",
    newVocab:["salem","qalinqalai","zhaqsy","raqmet"],
    exercises:[
      E({ id:"1-1-a", type:"teach", vocab:["salem"], kz:"Сәлем", isNew:true, explainEn:"Сәлем is the friendly, everyday “hi”. The letter Ә sounds like a short open “a” — like the a in “cat”.", explainRu:"Сәлем — повседневное дружеское «привет». Буква Ә звучит как открытое краткое «ә»." }),
      E({ id:"1-1-b", type:"mc", vocab:["salem"], kz:"Сәлем", options:["salem","raqmet","zhoq","saubol"], answerId:"salem", explainEn:"Сәлем = Hello (friendly).", explainRu:"Сәлем = привет." }),
      E({ id:"1-1-c", type:"teach", vocab:["qalinqalai"], kz:"Қалыңыз қалай?", isNew:true, explainEn:"The polite way to ask “How are you?” — Қ is a deep K, made at the back of the throat.", explainRu:"Вежливое «Как у вас дела?». Қ — глубокий заднеязычный звук." }),
      E({ id:"1-1-d", type:"listen", vocab:["qalinqalai"], kz:"Қалыңыз қалай?", options:["salem","qalinqalai","saubol"], answerId:"qalinqalai", explainEn:"You heard: Қалыңыз қалай? — How are you? (polite)", explainRu:"Вы услышали: Қалыңыз қалай? — Как у вас дела?" }),
      E({ id:"1-1-e", type:"teach", vocab:["zhaqsy"], kz:"Жақсы", isNew:true, explainEn:"Жақсы means “good / well” — the classic answer to “How are you?”", explainRu:"Жақсы — «хорошо», классический ответ на «Как дела?»." }),
      E({ id:"1-1-f", type:"dialogue", vocab:["zhaqsy","raqmet"], speaker:"Aizhan", lineKz:"Сәлем! Қалың қалай?", lineEn:"Hi! How are you?", lineRu:"Привет! Как дела?",
        replyOptions:[{kz:"Жақсы, рақмет!",en:"Good, thanks!",ru:"Хорошо, спасибо!"},{kz:"Сау болыңыз!",en:"Goodbye!",ru:"До свидания!"},{kz:"Жоқ.",en:"No.",ru:"Нет."}], replyAnswer:0,
        explainEn:"“Жақсы, рақмет!” — Good, thanks! You just held your first Kazakh exchange.", explainRu:"«Жақсы, рақмет!» — хорошо, спасибо. Ваш первый диалог состоялся!" }),
      E({ id:"1-1-g", type:"mc", vocab:["raqmet"], en:"Thank you", ru:"Спасибо", options:["salem","raqmet","ia"], answerId:"raqmet", explainEn:"Рақмет = Thank you. The Қ keeps it distinctly Kazakh.", explainRu:"Рақмет = спасибо." }),
      E({ id:"1-1-h", type:"repeat", vocab:["salem"], kz:"Сәлем", explainEn:"Listen, then say it out loud twice. Hearing your own voice builds the sound in memory.", explainRu:"Послушайте и повторите вслух дважды." }),
    ],
  },
  {
    id:"1-2", chapterId:1, icon:"heart", minutes:3,
    titleEn:"Thanks & goodbye", titleRu:"Спасибо и до свидания",
    objectiveEn:"Thank someone and say goodbye politely", objectiveRu:"Поблагодарить и вежливо попрощаться",
    newVocab:["salemetsizbe","saubol","keshiriniz"],
    exercises:[
      E({ id:"1-2-a", type:"teach", vocab:["salemetsizbe"], kz:"Сәлеметсіз бе", isNew:true, explainEn:"Use Сәлеметсіз бе with elders, teachers and people you're meeting formally.", explainRu:"Сәлеметсіз бе — вежливое приветствие для старших и официальных встреч." }),
      E({ id:"1-2-b", type:"mc", vocab:["salemetsizbe"], kz:"Сәлеметсіз бе", options:["salemetsizbe","saubol","keshiriniz","zhoq"], answerId:"salemetsizbe", explainEn:"Сәлеметсіз бе = Hello (polite).", explainRu:"Сәлеметсіз бе = здравствуйте." }),
      E({ id:"1-2-c", type:"teach", vocab:["saubol"], kz:"Сау болыңыз", isNew:true, explainEn:"Literally “stay healthy!” — the warm, polite goodbye.", explainRu:"Буквально «будьте здоровы!» — тёплое вежливое прощание." }),
      E({ id:"1-2-d", type:"fill", vocab:["raqmet"], sentenceParts:["Көмегіңізге ","!"], options:["raqmet","zhoq","salem"], answerId:"raqmet", explainEn:"“Көмегіңізге рақмет” = Thank you for your help.", explainRu:"«Көмегіңізге рақмет» — спасибо за помощь." }),
      E({ id:"1-2-e", type:"teach", vocab:["keshiriniz"], kz:"Кешіріңіз", isNew:true, explainEn:"Кешіріңіз opens doors: “Excuse me” before a question, “sorry” after a bump.", explainRu:"Кешіріңіз открывает двери: «извините» перед вопросом или извинением." }),
      E({ id:"1-2-f", type:"listen", vocab:["keshiriniz"], kz:"Кешіріңіз", options:["keshiriniz","raqmet","saubol"], answerId:"keshiriniz", explainEn:"You heard: Кешіріңіз — Excuse me.", explainRu:"Вы услышали: Кешіріңіз — извините." }),
      E({ id:"1-2-g", type:"match", vocab:["salem","raqmet","saubol","keshiriniz"], pairs:["salem","raqmet","saubol","keshiriniz"], explainEn:"Four phrases that carry you through almost any first meeting.", explainRu:"Четыре фразы для почти любой первой встречи." }),
      E({ id:"1-2-h", type:"tiles", vocab:["zhaqsy","raqmet"], en:"Good, thank you!", ru:"Хорошо, спасибо!", tokens:["рақмет","Жақсы","Жоқ"], answerTokens:["Жақсы","рақмет"], explainEn:"“Жақсы, рақмет!” — word order: state first, thanks second.", explainRu:"«Жақсы, рақмет!» — сначала состояние, потом благодарность." }),
    ],
  },
  {
    id:"1-3", chapterId:1, icon:"check", minutes:3,
    titleEn:"Yes, no & this", titleRu:"Да, нет и «это»",
    objectiveEn:"Answer yes/no and ask “What is this?”", objectiveRu:"Отвечать да/нет и спрашивать «Это что?»",
    newVocab:["ia","zhoq","bulne","kitap","su"],
    exercises:[
      E({ id:"1-3-a", type:"teach", vocab:["ia"], kz:"Иә", isNew:true, explainEn:"Иә = yes. Two letters, one clear sound: “ee-a”.", explainRu:"Иә = да." }),
      E({ id:"1-3-b", type:"teach", vocab:["zhoq"], kz:"Жоқ", isNew:true, explainEn:"Жоқ = no. It also means “there isn't any” — context tells you which.", explainRu:"Жоқ = нет, а также «не имеется»." }),
      E({ id:"1-3-c", type:"dialogue", vocab:["ia","shai"], speaker:"Timur", lineKz:"Шай ішесіз бе?", lineEn:"Would you like some tea?", lineRu:"Будете чай?",
        replyOptions:[{kz:"Иә, рақмет!",en:"Yes, please!",ru:"Да, спасибо!"},{kz:"Бұл не?",en:"What is this?",ru:"Это что?"},{kz:"Сау болыңыз!",en:"Goodbye!",ru:"До свидания!"}], replyAnswer:0,
        explainEn:"Tea is hospitality in Kazakhstan — “Иә, рақмет!” is always welcome.", explainRu:"Чай — это гостеприимство. «Иә, рақмет!» всегда уместно." }),
      E({ id:"1-3-d", type:"teach", vocab:["bulne"], kz:"Бұл не?", isNew:true, explainEn:"The most useful learner question in any language: “What is this?” Ұ is a short, tight “u”.", explainRu:"Самый полезный вопрос ученика: «Это что?»." }),
      E({ id:"1-3-e", type:"mc", vocab:["bulne"], kz:"Бұл не?", options:["bulne","qalinqalai","qaidansyz"], answerId:"bulne", explainEn:"Бұл не? = What is this?", explainRu:"Бұл не? = это что?" }),
      E({ id:"1-3-f", type:"teach", vocab:["kitap"], kz:"Кітап", isNew:true, explainEn:"І is a short, relaxed “i” — кітап = book.", explainRu:"Кітап = книга. Буква І — краткий звук." }),
      E({ id:"1-3-g", type:"type", vocab:["su"], en:"Water", ru:"Вода", accepted:["су"], explainEn:"Су = water. Just two letters — and one of the most useful words in the language.", explainRu:"Су = вода." }),
      E({ id:"1-3-h", type:"tiles", vocab:["kitap"], en:"This is a book.", ru:"Это книга.", tokens:["кітап","Бұл","су"], answerTokens:["Бұл","кітап"], explainEn:"“Бұл кітап” — Kazakh doesn't need a word for “is” here.", explainRu:"«Бұл кітап» — слово «есть» здесь не нужно." }),
    ],
  },
  {
    id:"1-4", chapterId:1, icon:"trophy", minutes:4, checkpoint:true,
    titleEn:"Checkpoint: First conversation", titleRu:"Контроль: первый разговор",
    objectiveEn:"Put greetings, thanks and answers together", objectiveRu:"Соединить приветствия, благодарность и ответы",
    newVocab:["men","siz"],
    exercises:[
      E({ id:"1-4-a", type:"teach", vocab:["men"], kz:"Мен", isNew:true, explainEn:"Мен = I. Kazakh word order puts the person first: Мен…", explainRu:"Мен = я." }),
      E({ id:"1-4-b", type:"teach", vocab:["siz"], kz:"Сіз", isNew:true, explainEn:"Сіз is the polite “you” — for one person you respect, or several people.", explainRu:"Сіз — вежливое «вы»." }),
      E({ id:"1-4-c", type:"mc", vocab:["salemetsizbe"], en:"Hello (to a teacher)", ru:"Здравствуйте (учителю)", options:["salem","salemetsizbe","saubol"], answerId:"salemetsizbe", explainEn:"With a teacher: Сәлеметсіз бе.", explainRu:"Учителю говорим: Сәлеметсіз бе." }),
      E({ id:"1-4-d", type:"listen", vocab:["zhaqsy"], kz:"Жақсы", options:["zhaqsy","zhana","zhoq"], answerId:"zhaqsy", explainEn:"You heard: Жақсы — good. Қ+С gives it that crisp ending.", explainRu:"Вы услышали: Жақсы — хорошо." }),
      E({ id:"1-4-e", type:"fill", vocab:["ia"], sentenceParts:["— Шай ішесіз бе? — ",", рақмет."], options:["ia","zhoq","ne2"], answerId:"ia", explainEn:"“Иә, рақмет” — yes, please.", explainRu:"«Иә, рақмет» — да, спасибо." }),
      E({ id:"1-4-f", type:"match", vocab:["men","siz","ia","zhoq"], pairs:["men","siz","ia","zhoq"], explainEn:"Мен / Сіз / Иә / Жоқ — the skeleton of every conversation.", explainRu:"Мен / Сіз / Иә / Жоқ — костяк любого разговора." }),
      E({ id:"1-4-g", type:"dialogue", vocab:["saubol"], speaker:"Aizhan", lineKz:"Сау болыңыз! Ертең көрісеміз.", lineEn:"Goodbye! See you tomorrow.", lineRu:"До свидания! До завтра.",
        replyOptions:[{kz:"Сау болыңыз!",en:"Goodbye!",ru:"До свидания!"},{kz:"Бұл не?",en:"What is this?",ru:"Это что?"},{kz:"Жоқ, рақмет.",en:"No, thank you.",ru:"Нет, спасибо."}], replyAnswer:0,
        explainEn:"Mirror the goodbye: “Сау болыңыз!” — stay well.", explainRu:"Отвечаем тем же: «Сау болыңыз!»." }),
      E({ id:"1-4-h", type:"type", vocab:["raqmet"], en:"Thank you", ru:"Спасибо", accepted:["рақмет"], explainEn:"Рақмет — remember the Қ in the middle.", explainRu:"Рақмет — не забывайте Қ посередине." }),
    ],
  },
  {
    id:"2-1", chapterId:2, icon:"user", minutes:3,
    titleEn:"My name is…", titleRu:"Меня зовут…",
    objectiveEn:"Introduce yourself and a friend", objectiveRu:"Представиться и представить друга",
    newVocab:["atym","dos","ol","sen"],
    exercises:[
      E({ id:"2-1-a", type:"teach", vocab:["atym"], kz:"Менің атым…", isNew:true, explainEn:"Literally “my name (is)…”. Just add your name at the end.", explainRu:"Буквально «моё имя…». Просто добавьте своё имя." }),
      E({ id:"2-1-b", type:"tiles", vocab:["atym"], en:"My name is Arnur.", ru:"Меня зовут Арнур.", tokens:["Арнур","атым","Менің"], answerTokens:["Менің","атым","Арнур"], explainEn:"“Менің атым Арнур” — the name comes last.", explainRu:"«Менің атым Арнур» — имя стоит в конце." }),
      E({ id:"2-1-c", type:"teach", vocab:["dos"], kz:"Дос", isNew:true, explainEn:"Дос = friend. “Менің досым” = my friend (note the -ым “my” ending).", explainRu:"Дос = друг. «Менің досым» — мой друг." }),
      E({ id:"2-1-d", type:"mc", vocab:["dos"], kz:"Менің досым", options:["dos","mugalym","student"], answerId:"dos", explainEn:"“Менің досым” = my friend.", explainRu:"«Менің досым» = мой друг." }),
      E({ id:"2-1-e", type:"teach", vocab:["ol"], kz:"Ол", isNew:true, explainEn:"Ол works for he, she and “that one” — Kazakh pronouns don't mark gender.", explainRu:"Ол — он, она или «тот»: рода в местоимениях нет." }),
      E({ id:"2-1-f", type:"teach", vocab:["sen"], kz:"Сен", isNew:true, explainEn:"Сен is the friendly “you” — for friends and people your age. Сіз stays polite.", explainRu:"Сен — дружеское «ты». Сіз — вежливое «вы»." }),
      E({ id:"2-1-g", type:"dialogue", vocab:["atym"], speaker:"Dana", lineKz:"Сәлем! Менің атым — Dana. Ал сенің атың кім?", lineEn:"Hi! My name is Dana. And what's your name?", lineRu:"Привет! Я Dana. А тебя как зовут?",
        replyOptions:[{kz:"Менің атым — Timur.",en:"My name is Timur.",ru:"Меня зовут Timur."},{kz:"Жақсы, рақмет!",en:"Good, thanks!",ru:"Хорошо, спасибо!"},{kz:"Он сөз.",en:"Ten words.",ru:"Десять слов."}], replyAnswer:0,
        explainEn:"“Атың кім?” asks the name — answer with “Менің атым…”", explainRu:"На «Атың кім?» отвечаем «Менің атым…»." }),
      E({ id:"2-1-h", type:"listen", vocab:["atym"], kz:"Менің атым", options:["atym","dos","men"], answerId:"atym", explainEn:"You heard: Менің атым — my name is…", explainRu:"Вы услышали: Менің атым — меня зовут…" }),
    ],
  },
  {
    id:"2-2", chapterId:2, icon:"map", minutes:3,
    titleEn:"Where are you from?", titleRu:"Откуда вы?",
    objectiveEn:"Say your city and country", objectiveRu:"Назвать свой город и страну",
    newVocab:["qaidansyz","almaty","astana","qazaqstan","ulken"],
    exercises:[
      E({ id:"2-2-a", type:"teach", vocab:["qaidansyz"], kz:"Қайдансыз?", isNew:true, explainEn:"The polite “Where are you from?” — one word does all the work.", explainRu:"Вежливое «Вы откуда?» — всё в одном слове." }),
      E({ id:"2-2-b", type:"teach", vocab:["qazaqstan"], kz:"Қазақстан", isNew:true, explainEn:"Қазақстан — the world's largest landlocked country.", explainRu:"Қазақстан — крупнейшая страна без выхода к морю." }),
      E({ id:"2-2-c", type:"mc", vocab:["almaty"], kz:"Алматы", options:["almaty","astana","qazaqstan"], answerId:"almaty", explainEn:"Алматы — the southern city under the Trans-Ili Alatau mountains.", explainRu:"Алматы — южный мегаполис." }),
      E({ id:"2-2-d", type:"tiles", vocab:["almaty"], en:"I am from Almaty.", ru:"Я из Алматы.", tokens:["Алматыданмын","Мен","Астанаданмын"], answerTokens:["Мен","Алматыданмын"], explainEn:"“Мен Алматыданмын” — the -дан ending means “from”.", explainRu:"«Мен Алматыданмын» — окончание -дан значит «из»." }),
      E({ id:"2-2-e", type:"teach", vocab:["astana"], kz:"Астана", isNew:true, explainEn:"Астана literally means “capital” — and it is one.", explainRu:"Астана буквально значит «столица»." }),
      E({ id:"2-2-f", type:"teach", vocab:["ulken"], kz:"Үлкен", isNew:true, explainEn:"Үлкен = big. Ү sounds like the German ü — round your lips on “ee”.", explainRu:"Үлкен = большой." }),
      E({ id:"2-2-g", type:"fill", vocab:["ulken"], sentenceParts:["Қазақстан — "," ел."], options:["ulken","zhana","ademi"], answerId:"ulken", explainEn:"“Қазақстан — үлкен ел” = Kazakhstan is a big country.", explainRu:"«Қазақстан — үлкен ел» — Казахстан большая страна." }),
      E({ id:"2-2-h", type:"dialogue", vocab:["qaidansyz","astana"], speaker:"Olzhas", lineKz:"Қайдансыз?", lineEn:"Where are you from?", lineRu:"Вы откуда?",
        replyOptions:[{kz:"Мен Астанаданмын.",en:"I'm from Astana.",ru:"Я из Астаны."},{kz:"Менің атым — Сабақ.",en:"My name is Lesson.",ru:"Меня зовут Урок."},{kz:"Он сөз үйрендім.",en:"I learned ten words.",ru:"Я выучил десять слов."}], replyAnswer:0,
        explainEn:"“Мен Астанаданмын” — clean and complete.", explainRu:"«Мен Астанаданмын» — просто и полно." }),
    ],
  },
  {
    id:"2-3", chapterId:2, icon:"message", minutes:4,
    titleEn:"Languages & people", titleRu:"Языки и люди",
    objectiveEn:"Talk about languages you speak and people you know", objectiveRu:"Говорить о языках и людях",
    newVocab:["qazaqsha","agylshynsha","oryssha","student","mugalym","til","uirenu","soz","zhana"],
    exercises:[
      E({ id:"2-3-a", type:"teach", vocab:["qazaqsha"], kz:"Қазақша", isNew:true, explainEn:"Add -ша to a people to name their language: қазақша “in Kazakh”.", explainRu:"-ша превращает народ в язык: қазақша — по-казахски." }),
      E({ id:"2-3-b", type:"teach", vocab:["agylshynsha"], kz:"Ағылшынша", isNew:true, explainEn:"Ағылшынша = in English. Ғ is a soft, voiced partner of Қ.", explainRu:"Ағылшынша = по-английски." }),
      E({ id:"2-3-c", type:"mc", vocab:["oryssha"], kz:"Орысша", options:["oryssha","qazaqsha","agylshynsha"], answerId:"oryssha", explainEn:"Орысша = in Russian.", explainRu:"Орысша = по-русски." }),
      E({ id:"2-3-d", type:"teach", vocab:["student"], kz:"Студент", isNew:true, explainEn:"“Мен студентпін” = I am a student — -пін is the “I am” ending.", explainRu:"«Мен студентпін» — я студент. -пін = «я (являюсь)»." }),
      E({ id:"2-3-e", type:"teach", vocab:["mugalym"], kz:"Мұғалім", isNew:true, explainEn:"Мұғалім = teacher — a word to always say with Сіз, not Сен.", explainRu:"Мұғалім = учитель. С ним всегда на «вы» — Сіз." }),
      E({ id:"2-3-f", type:"fill", vocab:["qazaqsha"], sentenceParts:["Мен "," үйреніп жүрмін."], options:["qazaqsha","kitap","su"], answerId:"qazaqsha", explainEn:"“Мен қазақша үйреніп жүрмін” = I'm learning Kazakh. That's you, right now.", explainRu:"«Мен қазақша үйреніп жүрмін» — я учу казахский. Это про вас!" }),
      E({ id:"2-3-g", type:"match", vocab:["qazaqsha","oryssha","agylshynsha","til"], pairs:["qazaqsha","oryssha","agylshynsha","til"], explainEn:"Three languages you'll hear daily in Kazakhstan's cities.", explainRu:"Три языка повседневной жизни в Казахстане." }),
      E({ id:"2-3-h", type:"type", vocab:["soz"], en:"Word", ru:"Слово", accepted:["сөз"], explainEn:"Сөз = word. Ө is like the German ö.", explainRu:"Сөз = слово." }),
      E({ id:"2-3-i", type:"repeat", vocab:["qazaqsha"], kz:"Мен қазақша үйреніп жүрмін", explainEn:"Say your new sentence out loud: “I'm learning Kazakh.”", explainRu:"Скажите вслух: «Я учу казахский»." }),
    ],
  },
  {
    id:"2-4", chapterId:2, icon:"trophy", minutes:4, checkpoint:true,
    titleEn:"Checkpoint: Introduce yourself", titleRu:"Контроль: представление",
    objectiveEn:"Name, city, language — in one flow", objectiveRu:"Имя, город и язык — в одном потоке",
    newVocab:["ademi","soileu"],
    exercises:[
      E({ id:"2-4-a", type:"teach", vocab:["ademi"], kz:"Әдемі", isNew:true, explainEn:"Әдемі = beautiful. “Қазақ тілі — әдемі тіл.”", explainRu:"Әдемі = красивый." }),
      E({ id:"2-4-b", type:"listen", vocab:["qaidansyz"], kz:"Қайдансыз?", options:["qaidansyz","qalinqalai","bulne"], answerId:"qaidansyz", explainEn:"You heard: Қайдансыз? — Where are you from?", explainRu:"Вы услышали: Қайдансыз? — откуда вы?" }),
      E({ id:"2-4-c", type:"tiles", vocab:["student"], en:"I am a student.", ru:"Я студент.", tokens:["студентпін","Мен","мұғаліммін"], answerTokens:["Мен","студентпін"], explainEn:"“Мен студентпін” — person first, role second.", explainRu:"«Мен студентпін» — сначала человек, потом роль." }),
      E({ id:"2-4-d", type:"mc", vocab:["mugalym"], en:"Teacher", ru:"Учитель", options:["student","mugalym","dos"], answerId:"mugalym", explainEn:"Мұғалім = teacher.", explainRu:"Мұғалім = учитель." }),
      E({ id:"2-4-e", type:"fill", vocab:["ademi"], sentenceParts:["Қазақ тілі — "," тіл."], options:["ademi","ulken","zhana"], answerId:"ademi", explainEn:"“Қазақ тілі — әдемі тіл” = Kazakh is a beautiful language.", explainRu:"«Қазақ тілі — әдемі тіл» — казахский красивый язык." }),
      E({ id:"2-4-f", type:"dialogue", vocab:["atym","qaidansyz"], speaker:"Dana", lineKz:"Сәлеметсіз бе! Менің атым — Dana.", lineEn:"Hello! My name is Dana.", lineRu:"Здравствуйте! Меня зовут Dana.",
        replyOptions:[{kz:"Сәлеметсіз бе! Мен — Аружан.",en:"Hello! I'm Aruzhan.",ru:"Здравствуйте! Я Аружан."},{kz:"Бұл қанша?",en:"How much is this?",ru:"Сколько это стоит?"},{kz:"Нан бар ма?",en:"Is there bread?",ru:"Хлеб есть?"}], replyAnswer:0,
        explainEn:"Greeting + name, mirrored back. Conversation opened.", explainRu:"Приветствие и имя в ответ — разговор открыт." }),
      E({ id:"2-4-g", type:"type", vocab:["til"], en:"Language", ru:"Язык", accepted:["тіл"], explainEn:"Тіл = language — and the name of this app.", explainRu:"Тіл = язык — и название этого приложения." }),
    ],
  },
  {
    id:"3-1", chapterId:3, icon:"building", minutes:3,
    titleEn:"Places in the city", titleRu:"Места в городе",
    objectiveEn:"Name the places you'll visit every day", objectiveRu:"Назвать повседневные места",
    newVocab:["qala","ui","mektep","duken","bazar","tau"],
    exercises:[
      E({ id:"3-1-a", type:"teach", vocab:["qala"], kz:"Қала", isNew:true, explainEn:"Қала = city. Short, deep Қ at the start.", explainRu:"Қала = город." }),
      E({ id:"3-1-b", type:"teach", vocab:["ui"], kz:"Үй", isNew:true, explainEn:"Үй = home / house — one syllable, lots of meaning.", explainRu:"Үй = дом." }),
      E({ id:"3-1-c", type:"mc", vocab:["duken"], kz:"Дүкен", options:["duken","mektep","bazar"], answerId:"duken", explainEn:"Дүкен = shop.", explainRu:"Дүкен = магазин." }),
      E({ id:"3-1-d", type:"teach", vocab:["bazar"], kz:"Базар", isNew:true, explainEn:"The базар is the beating heart of every city — produce, bread, conversation.", explainRu:"Базар — сердце города: продукты, хлеб и разговоры." }),
      E({ id:"3-1-e", type:"listen", vocab:["mektep"], kz:"Мектеп", options:["mektep","kitap","sabaq"], answerId:"mektep", explainEn:"You heard: Мектеп — school.", explainRu:"Вы услышали: Мектеп — школа." }),
      E({ id:"3-1-f", type:"teach", vocab:["tau"], kz:"Тау", isNew:true, explainEn:"Тау = mountain. In Almaty they're your compass: mountains = south.", explainRu:"Тау = гора. В Алматы горы — ваш компас: они на юге." }),
      E({ id:"3-1-g", type:"match", vocab:["qala","ui","duken","tau"], pairs:["qala","ui","duken","tau"], explainEn:"City, home, shop, mountain — your Almaty in four words.", explainRu:"Город, дом, магазин, гора — Алматы в четырёх словах." }),
    ],
  },
  {
    id:"3-2", chapterId:3, icon:"compass", minutes:3,
    titleEn:"Where is it?", titleRu:"Где это?",
    objectiveEn:"Ask where things are — and understand the answer", objectiveRu:"Спрашивать, где что находится",
    newVocab:["qaida","osynda","anda","bar"],
    exercises:[
      E({ id:"3-2-a", type:"teach", vocab:["qaida"], kz:"Қайда?", isNew:true, explainEn:"Қайда? = Where? Add any place before it: “Дүкен қайда?”", explainRu:"Қайда? = где? «Дүкен қайда?» — где магазин?" }),
      E({ id:"3-2-b", type:"tiles", vocab:["qaida","duken"], en:"Where is the shop?", ru:"Где магазин?", tokens:["қайда","Дүкен","не"], answerTokens:["Дүкен","қайда"], explainEn:"“Дүкен қайда?” — place first, question second.", explainRu:"«Дүкен қайда?» — сначала место, потом вопрос." }),
      E({ id:"3-2-c", type:"teach", vocab:["osynda"], kz:"Осында", isNew:true, explainEn:"Осында = here. “Мен осында тұрамын” — I live here.", explainRu:"Осында = здесь." }),
      E({ id:"3-2-d", type:"teach", vocab:["anda"], kz:"Анда", isNew:true, explainEn:"Анда = over there — usually with a helpful point of the chin or hand.", explainRu:"Анда = вон там." }),
      E({ id:"3-2-e", type:"dialogue", vocab:["qaida","anda"], speaker:"You", lineKz:"Кешіріңіз, базар қайда?", lineEn:"Excuse me, where is the market?", lineRu:"Извините, где базар?",
        replyOptions:[{kz:"Базар анда.",en:"The market is over there.",ru:"Базар вон там."},{kz:"Менің атым — Базар.",en:"My name is Market.",ru:"Меня зовут Базар."},{kz:"Он сөз.",en:"Ten words.",ru:"Десять слов."}], replyAnswer:0,
        explainEn:"“Базар анда” — the market's over there. Now walk with confidence.", explainRu:"«Базар анда» — базар вон там." }),
      E({ id:"3-2-f", type:"teach", vocab:["bar"], kz:"Бар", isNew:true, explainEn:"Бар = “there is / exists”. Its partner Жоқ = “there isn't”.", explainRu:"Бар = есть/имеется. Пара: Жоқ = нет/не имеется." }),
      E({ id:"3-2-g", type:"fill", vocab:["bar"], sentenceParts:["Осында дүкен ","."], options:["bar","zhoq2","ne2"], answerId:"bar", explainEn:"“Осында дүкен бар” = There is a shop here.", explainRu:"«Осында дүкен бар» — здесь есть магазин." }),
    ],
  },
  {
    id:"3-3", chapterId:3, icon:"shopping", minutes:4,
    titleEn:"Numbers & small purchases", titleRu:"Числа и небольшие покупки",
    objectiveEn:"Count to ten and ask the price", objectiveRu:"Считать до десяти и спрашивать цену",
    newVocab:["bir","eki","ush","tort","bes","on2","qansha","berinizshi","alma","nan"],
    exercises:[
      E({ id:"3-3-a", type:"teach", vocab:["bir"], kz:"Бір — Екі — Үш", isNew:true, explainEn:"One, two, three: бір, екі, үш. Kazakh counting is beautifully regular.", explainRu:"Один, два, три: бір, екі, үш." }),
      E({ id:"3-3-b", type:"mc", vocab:["ush"], kz:"Үш", options:["bir","eki","ush","tort"], answerId:"ush", explainEn:"Үш = three.", explainRu:"Үш = три." }),
      E({ id:"3-3-c", type:"teach", vocab:["tort"], kz:"Төрт — Бес — Он", isNew:true, explainEn:"Four, five, ten: төрт, бес, он.", explainRu:"Четыре, пять, десять: төрт, бес, он." }),
      E({ id:"3-3-d", type:"listen", vocab:["bes"], kz:"Бес", options:["bes","bir","on2"], answerId:"bes", explainEn:"You heard: Бес — five.", explainRu:"Вы услышали: Бес — пять." }),
      E({ id:"3-3-e", type:"teach", vocab:["qansha"], kz:"Қанша?", isNew:true, explainEn:"“Бұл қанша тұрады?” — How much does this cost? The market's key question.", explainRu:"«Бұл қанша тұрады?» — сколько это стоит?" }),
      E({ id:"3-3-f", type:"teach", vocab:["berinizshi"], kz:"Беріңізші", isNew:true, explainEn:"“Беріңізші” = please give (me)… The -ші ending makes any request gentle.", explainRu:"«Беріңізші» — дайте, пожалуйста. Окончание -ші смягчает просьбу." }),
      E({ id:"3-3-g", type:"tiles", vocab:["eki","alma","berinizshi"], en:"Two apples, please.", ru:"Два яблока, пожалуйста.", tokens:["беріңізші","алма","Екі"], answerTokens:["Екі","алма","беріңізші"], explainEn:"“Екі алма беріңізші” — number, thing, polite request. Note: no plural after numbers in Kazakh!", explainRu:"«Екі алма беріңізші» — после числительных множественное число не нужно!" }),
      E({ id:"3-3-h", type:"dialogue", vocab:["qansha"], speaker:"Seller", lineKz:"Сәлеметсіз бе! Алма аласыз ба?", lineEn:"Hello! Would you like some apples?", lineRu:"Здравствуйте! Яблоки возьмёте?",
        replyOptions:[{kz:"Иә. Бұл қанша тұрады?",en:"Yes. How much is it?",ru:"Да. Сколько стоит?"},{kz:"Мектеп қайда?",en:"Where is the school?",ru:"Где школа?"},{kz:"Менің атым — Алма.",en:"My name is Apple.",ru:"Меня зовут Яблоко."}], replyAnswer:0,
        explainEn:"“Бұл қанша тұрады?” — your first real market sentence.", explainRu:"«Бұл қанша тұрады?» — ваша первая фраза на базаре." }),
    ],
  },
  {
    id:"3-4", chapterId:3, icon:"trophy", minutes:4, checkpoint:true,
    titleEn:"Checkpoint: A day in the city", titleRu:"Контроль: день в городе",
    objectiveEn:"Navigate, count and buy — all together", objectiveRu:"Навигация, счёт и покупки вместе",
    newVocab:["damdi","ote","tamaq","bugin"],
    exercises:[
      E({ id:"3-4-a", type:"teach", vocab:["damdi"], kz:"Дәмді", isNew:true, explainEn:"Дәмді = tasty. Use it and watch faces light up.", explainRu:"Дәмді = вкусный." }),
      E({ id:"3-4-b", type:"teach", vocab:["ote"], kz:"Өте", isNew:true, explainEn:"Өте = very. “Өте дәмді!” — very tasty!", explainRu:"Өте = очень." }),
      E({ id:"3-4-c", type:"mc", vocab:["tort"], en:"Four", ru:"Четыре", options:["ush","tort","bes"], answerId:"tort", explainEn:"Төрт = four.", explainRu:"Төрт = четыре." }),
      E({ id:"3-4-d", type:"listen", vocab:["qaida"], kz:"Дүкен қайда?", options:["qaida","bulne","qansha"], answerId:"qaida", explainEn:"You heard: “Дүкен қайда?” — Where is the shop?", explainRu:"Вы услышали: «Дүкен қайда?» — где магазин?" }),
      E({ id:"3-4-e", type:"type", vocab:["nan"], en:"Bread", ru:"Хлеб", accepted:["нан"], explainEn:"Нан = bread — sacred at every Kazakh table.", explainRu:"Нан = хлеб." }),
      E({ id:"3-4-f", type:"fill", vocab:["ote"], sentenceParts:["Тамақ "," дәмді!"], options:["ote","bir","anda"], answerId:"ote", explainEn:"“Тамақ өте дәмді!” = The food is very tasty!", explainRu:"«Тамақ өте дәмді!» — еда очень вкусная!" }),
      E({ id:"3-4-g", type:"match", vocab:["bir","eki","ush","on2"], pairs:["bir","eki","ush","on2"], explainEn:"Бір, екі, үш… он — solid counters already.", explainRu:"Бір, екі, үш… он — уверенный счёт." }),
      E({ id:"3-4-h", type:"dialogue", vocab:["berinizshi","raqmet"], speaker:"Seller", lineKz:"Міне, алыңыз. Тағы бірдеме керек пе?", lineEn:"Here you go. Anything else?", lineRu:"Вот, возьмите. Что-то ещё?",
        replyOptions:[{kz:"Жоқ, рақмет! Сау болыңыз!",en:"No, thank you! Goodbye!",ru:"Нет, спасибо! До свидания!"},{kz:"Қайдансыз?",en:"Where are you from?",ru:"Вы откуда?"},{kz:"Тау қайда?",en:"Where is the mountain?",ru:"Где гора?"}], replyAnswer:0,
        explainEn:"“Жоқ, рақмет! Сау болыңыз!” — a complete, polite exit.", explainRu:"«Жоқ, рақмет! Сау болыңыз!» — вежливое завершение." }),
    ],
  },
];

// pseudo vocab entries used as plausible distractors in fill exercises
vocabById["zhoq2"] = { ...vocabById["zhoq"] };
vocabById["ne2"] = { id:"ne2", kz:"Не?", en:"What?", ru:"Что?", tr:"ne?", pos:"question", exKz:"Бұл не?", exEn:"What is this?", exRu:"Это что?", chapter:1 };

export const lessonById = Object.fromEntries(LESSONS.map((l) => [l.id, l]));

/* ---------------- Pronunciation lab ---------------- */
export interface KzLetter {
  letter: string; name: string; hintEn: string; hintRu: string;
  exampleKz: string; exampleEn: string; exampleRu: string; group: "special" | "vowel" | "consonant";
}
export const LETTERS: KzLetter[] = [
  { letter:"Ә ә", name:"Ä", hintEn:"Short open “a”, like the a in “cat”.", hintRu:"Открытое краткое «ә», как в слове «Сәлем».", exampleKz:"Сәлем", exampleEn:"hello", exampleRu:"привет", group:"special" },
  { letter:"Ғ ғ", name:"Ğ", hintEn:"Voiced deep “gh” from the back of the throat — partner of Қ.", hintRu:"Звонкий глубокий звук — пара к Қ.", exampleKz:"Мұғалім", exampleEn:"teacher", exampleRu:"учитель", group:"special" },
  { letter:"Қ қ", name:"Q", hintEn:"Deep K made far back in the throat, unlike soft К.", hintRu:"Глубокое заднеязычное «к», в отличие от мягкого К.", exampleKz:"Қазақстан", exampleEn:"Kazakhstan", exampleRu:"Казахстан", group:"special" },
  { letter:"Ң ң", name:"Ŋ", hintEn:"The “ng” of “sing” — air through the nose.", hintRu:"Звук «ng» как в английском sing.", exampleKz:"Жаңа", exampleEn:"new", exampleRu:"новый", group:"special" },
  { letter:"Ө ө", name:"Ö", hintEn:"Like German ö — say “e” with rounded lips.", hintRu:"Как немецкое ö: «э» с округлёнными губами.", exampleKz:"Сөз", exampleEn:"word", exampleRu:"слово", group:"special" },
  { letter:"Ұ ұ", name:"Ū", hintEn:"Short, tight, deep “u” — the back-vowel partner of Ү.", hintRu:"Краткое глубокое «у» — твёрдая пара к Ү.", exampleKz:"Ұл", exampleEn:"son", exampleRu:"сын", group:"special" },
  { letter:"Ү ү", name:"Ü", hintEn:"Like German ü — say “ee” with rounded lips.", hintRu:"Как немецкое ü: «и» с округлёнными губами.", exampleKz:"Үй", exampleEn:"home", exampleRu:"дом", group:"special" },
  { letter:"Һ һ", name:"H", hintEn:"A breathy “h”, used in borrowed words.", hintRu:"Придыхательное «х» в заимствованных словах.", exampleKz:"Қаһарман", exampleEn:"hero", exampleRu:"герой", group:"special" },
  { letter:"І і", name:"I (short)", hintEn:"Short relaxed “i”, partner of back Ы.", hintRu:"Краткое «і» — мягкая пара к Ы.", exampleKz:"Тіл", exampleEn:"language", exampleRu:"язык", group:"special" },
  { letter:"А а", name:"A", hintEn:"Open “a”, a back vowel.", hintRu:"Открытое «а» — твёрдый гласный.", exampleKz:"Алма", exampleEn:"apple", exampleRu:"яблоко", group:"vowel" },
  { letter:"Е е", name:"E", hintEn:"Open “ye/e”, a front vowel.", hintRu:"«Е» — мягкий гласный.", exampleKz:"Ел", exampleEn:"country / people", exampleRu:"страна / народ", group:"vowel" },
  { letter:"О о", name:"O", hintEn:"Round “o”, a back vowel.", hintRu:"«О» — твёрдый гласный.", exampleKz:"Ол", exampleEn:"he / she", exampleRu:"он / она", group:"vowel" },
  { letter:"Ы ы", name:"Y (back i)", hintEn:"Back, short “i” — partner of І.", hintRu:"Твёрдое краткое «ы» — пара к І.", exampleKz:"Қызық", exampleEn:"interesting", exampleRu:"интересно", group:"vowel" },
  { letter:"Ж ж", name:"Zh", hintEn:"Like the “s” in “measure”.", hintRu:"«Ж» как в русском.", exampleKz:"Жақсы", exampleEn:"good", exampleRu:"хорошо", group:"consonant" },
  { letter:"Ш ш", name:"Sh", hintEn:"“Sh” as in “she”.", hintRu:"«Ш» как в русском.", exampleKz:"Шай", exampleEn:"tea", exampleRu:"чай", group:"consonant" },
];

/* ---------------- Stories ---------------- */
export interface StoryLine { speaker: string; kz: string; en: string; ru: string; }
export interface Story {
  id: string; titleEn: string; titleRu: string; scene: string; emojiFreeIcon: string;
  introEn: string; introRu: string;
  lines: StoryLine[];
  choiceAt: number; // after this line index, learner picks a reply
  choices: { kz: string; en: string; ru: string }[]; choiceAnswer: number;
  questionEn: string; questionRu: string;
  qOptions: { en: string; ru: string }[]; qAnswer: number;
  newVocab: string[];
}
export const STORIES: Story[] = [
  {
    id:"s1", titleEn:"First hello at the university", titleRu:"Первое «Сәлем» в университете", scene:"Almaty · campus", emojiFreeIcon:"building",
    introEn:"Dana meets a new classmate before the first Kazakh lesson.", introRu:"Dana знакомится с одногруппником перед первым уроком.",
    lines:[
      { speaker:"Dana", kz:"Сәлем! Менің атым — Dana.", en:"Hi! My name is Dana.", ru:"Привет! Я Dana." },
      { speaker:"Timur", kz:"Сәлем, Dana! Мен — Timur. Қайдансың?", en:"Hi, Dana! I'm Timur. Where are you from?", ru:"Привет, Dana! Я Timur. Ты откуда?" },
      { speaker:"Dana", kz:"Мен Алматыданмын. Сен ше?", en:"I'm from Almaty. And you?", ru:"Я из Алматы. А ты?" },
      { speaker:"Timur", kz:"Мен Астанаданмын. Бүгін бірінші сабақ!", en:"I'm from Astana. Today is the first lesson!", ru:"Я из Астаны. Сегодня первый урок!" },
    ],
    choiceAt:1,
    choices:[{kz:"Мен Алматыданмын.",en:"I'm from Almaty.",ru:"Я из Алматы."},{kz:"Шай ішесіз бе?",en:"Would you like tea?",ru:"Будете чай?"},{kz:"Сау болыңыз!",en:"Goodbye!",ru:"До свидания!"}],
    choiceAnswer:0,
    questionEn:"Where is Timur from?", questionRu:"Откуда Timur?",
    qOptions:[{en:"Almaty",ru:"Алматы"},{en:"Astana",ru:"Астана"},{en:"The market",ru:"С базара"}], qAnswer:1,
    newVocab:["atym","qaidansyz","sabaq"],
  },
  {
    id:"s2", titleEn:"Tea at Aizhan's home", titleRu:"Чай в гостях", scene:"Astana · home", emojiFreeIcon:"heart",
    introEn:"A guest is offered tea — the warmest welcome in Kazakhstan.", introRu:"Гостю предлагают чай — самый тёплый приём в Казахстане.",
    lines:[
      { speaker:"Aizhan", kz:"Сәлеметсіз бе! Кіріңіз.", en:"Hello! Please come in.", ru:"Здравствуйте! Проходите." },
      { speaker:"Guest", kz:"Сәлеметсіз бе! Рақмет.", en:"Hello! Thank you.", ru:"Здравствуйте! Спасибо." },
      { speaker:"Aizhan", kz:"Шай ішесіз бе?", en:"Would you like some tea?", ru:"Будете чай?" },
      { speaker:"Guest", kz:"Иә, рақмет! Шай өте дәмді.", en:"Yes, please! The tea is delicious.", ru:"Да, спасибо! Чай очень вкусный." },
    ],
    choiceAt:2,
    choices:[{kz:"Иә, рақмет!",en:"Yes, please!",ru:"Да, спасибо!"},{kz:"Дүкен қайда?",en:"Where is the shop?",ru:"Где магазин?"},{kz:"Он сөз үйрендім.",en:"I learned ten words.",ru:"Я выучил десять слов."}],
    choiceAnswer:0,
    questionEn:"What does the guest say about the tea?", questionRu:"Что гость говорит о чае?",
    qOptions:[{en:"It's very tasty",ru:"Он очень вкусный"},{en:"It's a book",ru:"Это книга"},{en:"It's over there",ru:"Он вон там"}], qAnswer:0,
    newVocab:["shai","damdi","salemetsizbe"],
  },
  {
    id:"s3", titleEn:"Morning at the Green Bazaar", titleRu:"Утро на Зелёном базаре", scene:"Almaty · Көк базар", emojiFreeIcon:"shopping",
    introEn:"Buying apples where the city has traded for over a century.", introRu:"Покупаем яблоки там, где город торгует больше века.",
    lines:[
      { speaker:"Seller", kz:"Сәлеметсіз бе! Алма өте дәмді!", en:"Hello! The apples are delicious!", ru:"Здравствуйте! Яблоки очень вкусные!" },
      { speaker:"You", kz:"Сәлеметсіз бе! Бұл қанша тұрады?", en:"Hello! How much is this?", ru:"Здравствуйте! Сколько стоит?" },
      { speaker:"Seller", kz:"Бір килограмы — бес жүз теңге.", en:"Five hundred tenge a kilo.", ru:"Пятьсот тенге за килограмм." },
      { speaker:"You", kz:"Екі килограмм беріңізші. Рақмет!", en:"Two kilos, please. Thank you!", ru:"Два килограмма, пожалуйста. Спасибо!" },
    ],
    choiceAt:0,
    choices:[{kz:"Сәлеметсіз бе! Бұл қанша тұрады?",en:"Hello! How much is this?",ru:"Здравствуйте! Сколько стоит?"},{kz:"Қалыңыз қалай, алма?",en:"How are you, apple?",ru:"Как дела, яблоко?"},{kz:"Мен студентпін, алма!",en:"I am a student, apple!",ru:"Я студент, яблоко!"}],
    choiceAnswer:0,
    questionEn:"How many kilos does the buyer take?", questionRu:"Сколько килограммов берёт покупатель?",
    qOptions:[{en:"One",ru:"Один"},{en:"Two",ru:"Два"},{en:"Ten",ru:"Десять"}], qAnswer:1,
    newVocab:["alma","qansha","eki"],
  },
];

/* ---------------- Grammar ---------------- */
export interface GrammarTopic {
  id: string; titleEn: string; titleRu: string; icon: string;
  level: string; blurbEn: string; blurbRu: string;
  bodyEn: string[]; bodyRu: string[];
  examples: { kz: string; en: string; ru: string; noteEn?: string; noteRu?: string }[];
  tryExercise?: { promptEn: string; promptRu: string; options: string[]; answer: number; explainEn: string; explainRu: string };
}
export const GRAMMAR: GrammarTopic[] = [
  {
    id:"vowel-harmony", icon:"waves", level:"Foundations",
    titleEn:"Vowel harmony — words that sing together", titleRu:"Сингармонизм — слова звучат в унисон",
    blurbEn:"Kazakh vowels come in two families, and suffixes must match the family of the root word.", blurbRu:"Гласные делятся на твёрдые и мягкие, и суффиксы подстраиваются под корень.",
    bodyEn:[
      "Back (hard) vowels: А, О, Ұ, Ы. Front (soft) vowels: Ә, Е, Ө, Ү, І.",
      "Most suffixes exist in pairs. The plural is -ЛАР after back vowels and -ЛЕР after front vowels.",
      "You already know examples: сөз → сөздер (words, front Ө) and кітап → кітаптар (books, back А; here -тар because К…П ends in a voiceless consonant).",
    ],
    bodyRu:[
      "Твёрдые гласные: А, О, Ұ, Ы. Мягкие: Ә, Е, Ө, Ү, І.",
      "Большинство суффиксов парные: множественное число — -ЛАР после твёрдых и -ЛЕР после мягких.",
      "Примеры: сөз → сөздер (слова), кітап → кітаптар (книги; -тар из-за глухого конечного согласного).",
    ],
    examples:[
      { kz:"қала → қалалар", en:"city → cities (back А → -лар)", ru:"город → города" },
      { kz:"сөз → сөздер", en:"word → words (front Ө → -дер)", ru:"слово → слова" },
      { kz:"кітап → кітаптар", en:"book → books (voiceless П → -тар)", ru:"книга → книги" },
      { kz:"үй → үйлер", en:"house → houses (front Ү → -лер)", ru:"дом → дома" },
    ],
    tryExercise:{ promptEn:"Plural of мектеп (school, front vowels) is…", promptRu:"Множественное число от мектеп (школа)…", options:["мектептер","мектептар","мектеплар"], answer:0, explainEn:"мектептер — front vowels take -ЛЕР family; voiceless П chooses -тер.", explainRu:"мектептер — мягкие гласные + глухой П дают -тер." },
  },
  {
    id:"pronouns", icon:"user", level:"Foundations",
    titleEn:"Мен, сен, сіз — people and politeness", titleRu:"Мен, сен, сіз — люди и вежливость",
    blurbEn:"Three small words carry respect. Choosing between сен and сіз is choosing a relationship.", blurbRu:"Три маленьких слова несут уважение. Выбор между сен и сіз — выбор дистанции.",
    bodyEn:[
      "Мен = I. Сен = you (one friend, someone younger). Сіз = you (polite, or several people). Ол = he/she — no gender.",
      "When in doubt, use Сіз. Elders and teachers are always Сіз.",
    ],
    bodyRu:[
      "Мен = я. Сен = ты (другу, младшему). Сіз = вы (вежливо или нескольким). Ол = он/она.",
      "Сомневаетесь — выбирайте Сіз. Старшим и учителям всегда Сіз.",
    ],
    examples:[
      { kz:"Мен студентпін.", en:"I am a student.", ru:"Я студент." },
      { kz:"Сен қайдансың?", en:"Where are you from? (to a friend)", ru:"Ты откуда?" },
      { kz:"Сіз қайдансыз?", en:"Where are you from? (polite)", ru:"Вы откуда?" },
    ],
    tryExercise:{ promptEn:"Talking to your teacher, you say…", promptRu:"Обращаясь к учителю, вы скажете…", options:["Сіз","Сен","Ол"], answer:0, explainEn:"Сіз — teachers always get the polite form.", explainRu:"Сіз — учителю всегда вежливая форма." },
  },
  {
    id:"questions", icon:"help", level:"Foundations",
    titleEn:"Asking yes/no questions — ма, ме, ба, бе, па, пе", titleRu:"Вопросы да/нет — частицы ма, ме, ба, бе, па, пе",
    blurbEn:"Kazakh turns a statement into a question with a tiny particle that harmonises with the word before it.", blurbRu:"Утверждение становится вопросом с помощью частицы, гармонирующей с предыдущим словом.",
    bodyEn:[
      "“Шай ішесіз бе?” — the бе at the end does the asking. After back vowels you'll see ма/ба/па; after front vowels — ме/бе/пе.",
      "Question words work too: Бұл не? (What is this?) Қайда? (Where?) Қанша? (How much?)",
    ],
    bodyRu:[
      "«Шай ішесіз бе?» — спрашивает частица бе в конце. После твёрдых гласных: ма/ба/па, после мягких: ме/бе/пе.",
      "Вопросительные слова: Бұл не? Қайда? Қанша?",
    ],
    examples:[
      { kz:"Дүкен ашық па?", en:"Is the shop open?", ru:"Магазин открыт?" },
      { kz:"Нан бар ма?", en:"Is there bread?", ru:"Хлеб есть?" },
      { kz:"Сіз студентсіз бе?", en:"Are you a student?", ru:"Вы студент?" },
    ],
    tryExercise:{ promptEn:"“Су бар ___?” (Is there water?)", promptRu:"«Су бар ___?» (Вода есть?)", options:["ма","бе","не"], answer:0, explainEn:"бар ends in back А → ма.", explainRu:"В слове бар твёрдое А → частица ма." },
  },
  {
    id:"cases-peek", icon:"compass", level:"A taste of A1",
    titleEn:"A first look at cases — endings carry meaning", titleRu:"Первый взгляд на падежи",
    blurbEn:"Kazakh has seven cases. Instead of separate words like “in” or “from”, endings attach to the noun.", blurbRu:"В казахском семь падежей: вместо предлогов «в» и «из» работают окончания.",
    bodyEn:[
      "Алматыда = in Almaty (-да, locative). Алматыдан = from Almaty (-дан, ablative). Менің = my (-нің family, genitive).",
      "You'll meet cases gradually in lessons — always inside real phrases first, tables second.",
    ],
    bodyRu:[
      "Алматыда = в Алматы (-да). Алматыдан = из Алматы (-дан). Менің = мой.",
      "Падежи будут появляться постепенно — сначала в живых фразах, потом в таблицах.",
    ],
    examples:[
      { kz:"Мен Алматыда тұрамын.", en:"I live in Almaty.", ru:"Я живу в Алматы." },
      { kz:"Мен Алматыданмын.", en:"I am from Almaty.", ru:"Я из Алматы." },
      { kz:"Менің атым…", en:"My name is…", ru:"Меня зовут…" },
    ],
    tryExercise:{ promptEn:"“Мен Астана___ тұрамын” (I live in Astana)", promptRu:"«Мен Астана___ тұрамын» (Я живу в Астане)", options:["да","дан","дың"], answer:0, explainEn:"-да = in (locative). -дан would mean “from”.", explainRu:"-да = «в» (местный падеж). -дан значило бы «из»." },
  },
];

/* vowel-harmony interactive data */
export const HARMONY_WORDS = [
  { root:"қала", en:"city", ru:"город", vowelType:"back", plural:"қалалар", suffix:"лар" },
  { root:"кітап", en:"book", ru:"книга", vowelType:"back", plural:"кітаптар", suffix:"тар" },
  { root:"сөз", en:"word", ru:"слово", vowelType:"front", plural:"сөздер", suffix:"дер" },
  { root:"мектеп", en:"school", ru:"школа", vowelType:"front", plural:"мектептер", suffix:"тер" },
  { root:"дос", en:"friend", ru:"друг", vowelType:"back", plural:"достар", suffix:"тар" },
  { root:"үй", en:"house", ru:"дом", vowelType:"front", plural:"үйлер", suffix:"лер" },
];
