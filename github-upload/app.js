const STORE_KEY = "hanbeat-korean-lab-v2";
const OLD_STORE_KEY = "hanbeat-korean-lab-v1";

const jamo = {
  vowels: [
    ["ㅏ", "a", "아"], ["ㅑ", "ya", "야"], ["ㅓ", "eo", "어"], ["ㅕ", "yeo", "여"],
    ["ㅗ", "o", "오"], ["ㅛ", "yo", "요"], ["ㅜ", "u", "우"], ["ㅠ", "yu", "유"],
    ["ㅡ", "eu", "으"], ["ㅣ", "i", "이"], ["ㅐ", "ae", "애"], ["ㅔ", "e", "에"],
    ["ㅚ", "oe", "외"], ["ㅟ", "wi", "위"], ["ㅢ", "ui", "의"], ["ㅒ", "yae", "얘"],
    ["ㅖ", "ye", "예"], ["ㅘ", "wa", "와"], ["ㅙ", "wae", "왜"], ["ㅝ", "wo", "워"],
    ["ㅞ", "we", "웨"]
  ],
  consonants: [
    ["ㄱ", "g/k", "가"], ["ㄴ", "n", "나"], ["ㄷ", "d/t", "다"], ["ㄹ", "r/l", "라"],
    ["ㅁ", "m", "마"], ["ㅂ", "b/p", "바"], ["ㅅ", "s", "사"], ["ㅇ", "ng/silent", "아"],
    ["ㅈ", "j", "자"], ["ㅊ", "ch", "차"], ["ㅋ", "k", "카"], ["ㅌ", "t", "타"],
    ["ㅍ", "p", "파"], ["ㅎ", "h", "하"], ["ㄲ", "kk", "까"], ["ㄸ", "tt", "따"],
    ["ㅃ", "pp", "빠"], ["ㅆ", "ss", "싸"], ["ㅉ", "jj", "짜"]
  ]
};

const bands = [
  {
    id: "svt",
    name: "SEVENTEEN",
    status: "开放学习",
    color: "#f7cac9",
    color2: "#92a8d1",
    heroVideo: "-GQg25oP0S4",
    tone: "舞台、综艺、采访、歌词",
    note: "初始内容库，适合从高频表达、歌词句和成员互动句开始。"
  },
  {
    id: "bts",
    name: "BTS",
    status: "已加资料",
    color: "#7f3fbf",
    color2: "#c7a7ff",
    heroVideo: "gdZLi9oWNZg",
    tone: "纪录片、采访、舞台花絮",
    note: "适合练音乐采访、鼓励表达和舞台常用句。"
  },
  {
    id: "txt",
    name: "TXT",
    status: "已加资料",
    color: "#7fd3c6",
    color2: "#f6db7b",
    heroVideo: "P9tKTxbgdkk",
    tone: "综艺、练习室、直播片段",
    note: "适合做年轻口语、反应词和短句训练。"
  },
  {
    id: "skz",
    name: "Stray Kids",
    status: "已加资料",
    color: "#d71920",
    color2: "#111111",
    heroVideo: "JsOOis4bBFg",
    tone: "MV、舞台、采访、挑战",
    note: "适合练强节奏歌词、舞台词和自我介绍表达。"
  },
  {
    id: "enhypen",
    name: "ENHYPEN",
    status: "已加资料",
    color: "#f05a8a",
    color2: "#1b1b2f",
    heroVideo: "wXFLzODIdUI",
    tone: "MV、演唱会、综艺、采访",
    note: "适合练剧情感歌词、礼貌句和舞台问候。"
  },
  {
    id: "exo",
    name: "EXO",
    status: "已核对 MV",
    color: "#b7c9e2",
    color2: "#0f1b2d",
    heroVideo: "I3dezFzsNss",
    tone: "二三代桥梁、SM 代表男团",
    note: "从经典韩语歌词、舞台词和采访表达进入。"
  },
  {
    id: "bigbang",
    name: "BIGBANG",
    status: "已核对 MV",
    color: "#f5c542",
    color2: "#111111",
    heroVideo: "2ips2mM7Zqw",
    tone: "二代代表、强舞台表达",
    note: "适合练高频感叹、舞台号召和强节奏词。"
  },
  {
    id: "shinee",
    name: "SHINee",
    status: "已核对 MV",
    color: "#79e5cb",
    color2: "#112e35",
    heroVideo: "roughtzsCDI",
    tone: "二代男团、发音清晰",
    note: "适合练经典歌词、情绪词和舞台礼貌表达。"
  },
  {
    id: "suju",
    name: "SUPER JUNIOR",
    status: "已核对 MV",
    color: "#244a9b",
    color2: "#9bb7ff",
    heroVideo: "x6QA3m58DQw",
    tone: "二代男团、综艺感强",
    note: "适合练口语反应、问候和经典副歌词。"
  },
  {
    id: "blackpink",
    name: "BLACKPINK",
    status: "已核对 MV",
    color: "#f4a7bd",
    color2: "#111111",
    heroVideo: "IHNzOHi8sJs",
    tone: "全球热门女团",
    note: "适合练舞台自信表达、短句和高频歌词词。"
  },
  {
    id: "twice",
    name: "TWICE",
    status: "已核对 MV",
    color: "#fcc89b",
    color2: "#ff5fa2",
    heroVideo: "ePpPVE-GGJw",
    tone: "三代女团、清晰口语感",
    note: "适合练可爱口语、疑问句和日常短句。"
  },
  {
    id: "redvelvet",
    name: "Red Velvet",
    status: "已核对 MV",
    color: "#ef4d63",
    color2: "#7cc6a4",
    heroVideo: "uR8Mrt1IpXg",
    tone: "SM 女团、音色层次丰富",
    note: "适合练情绪、形容词和采访式表达。"
  },
  {
    id: "aespa",
    name: "aespa",
    status: "已核对 MV",
    color: "#8f7cff",
    color2: "#63d2ff",
    heroVideo: "4TWR90KJl84",
    tone: "四代女团、概念词多",
    note: "适合练概念词、动作词和自我介绍表达。"
  },
  {
    id: "ive",
    name: "IVE",
    status: "已核对 MV",
    color: "#d6b4ff",
    color2: "#ffedf6",
    heroVideo: "Y8JFxS1HlDo",
    tone: "四代女团、热门歌词",
    note: "适合练自信表达、情绪词和流行短句。"
  },
  {
    id: "newjeans",
    name: "NewJeans",
    status: "已核对 MV",
    color: "#9adcf4",
    color2: "#fff0a3",
    heroVideo: "_ZAgIHmHLdc",
    tone: "四代女团、自然口语感",
    note: "适合练日常感短句、疑问句和听力节奏。"
  },
  {
    id: "snsd",
    name: "Girls' Generation",
    status: "已核对 MV",
    color: "#ff8ec7",
    color2: "#ffffff",
    heroVideo: "U7mPqycQ0tQ",
    tone: "二代女团代表",
    note: "适合练经典歌词、可爱表达和基础句型。"
  },
  {
    id: "2ne1",
    name: "2NE1",
    status: "已核对 MV",
    color: "#111111",
    color2: "#f4ce32",
    heroVideo: "j7_lSP8Vc3o",
    tone: "二代女团、强舞台表达",
    note: "适合练自信表达、否定句和强节奏听力。"
  },
  { id: "pm", name: "2PM", status: "已核对 MV", color: "#2c2c2c", color2: "#c9a45b", heroVideo: "u2pFB1dCSo4", tone: "二代男团、舞台成熟", note: "适合练邀请句、礼貌表达和演唱会口语。" },
  { id: "nct127", name: "NCT 127", status: "已核对 MV", color: "#b4ef39", color2: "#111111", heroVideo: "2OvyA2__Eas", tone: "SM 男团、节奏词多", note: "适合练动作词、概念词和舞台自信表达。" },
  { id: "nctdream", name: "NCT DREAM", status: "已核对 MV", color: "#b4ef39", color2: "#7fdc66", heroVideo: "PkKnp4SdE-w", tone: "SM 男团、青春高能", note: "适合练味觉词、感叹词和节奏型短句。" },
  { id: "ateez", name: "ATEEZ", status: "已核对 MV", color: "#f08a24", color2: "#111111", heroVideo: "U0G5OA6ZH5w", tone: "强舞台男团", note: "适合练舞台号召、动词和能量型短句。" },
  { id: "treasure", name: "TREASURE", status: "已核对 MV", color: "#55a7ff", color2: "#111111", heroVideo: "ZJaKdBBzUYk", tone: "YG 男团", note: "适合练直白表达、动作词和副歌听力。" },
  { id: "riize", name: "RIIZE", status: "已核对 MV", color: "#ff7a3d", color2: "#f4d06f", heroVideo: "iUw3LPM7OBU", tone: "新生代男团", note: "适合练乐器、感觉和日常感短句。" },
  { id: "zb1", name: "ZEROBASEONE", status: "已核对 MV", color: "#8fb8ff", color2: "#ffffff", heroVideo: "trzeUClQIIg", tone: "五代男团", note: "适合练清爽歌词、情绪词和问候表达。" },
  { id: "lesserafim", name: "LE SSERAFIM", status: "已核对 MV", color: "#111111", color2: "#efefef", heroVideo: "pyf8cbqyfPs", tone: "四代女团、强概念", note: "适合练自我肯定、否定句和强节奏表达。" },
  { id: "gidle", name: "(G)I-DLE", status: "已核对 MV", color: "#c62033", color2: "#f2d47c", heroVideo: "7HDeem-JaSY", tone: "四代女团、自信表达", note: "适合练自信、外貌描述和舞台短句。" },
  { id: "wondergirls", name: "Wonder Girls", status: "已核对 MV", color: "#7d4cc2", color2: "#f6d65b", heroVideo: "QZBn1e9pr2Q", tone: "二代女团代表", note: "适合练经典副歌、否定句和基础情感表达。" },
  { id: "kara", name: "KARA", status: "已核对 MV", color: "#ef6aa8", color2: "#ffffff", heroVideo: "s2EQm6WPMHs", tone: "二代女团代表", note: "适合练可爱口语、呼唤和短句。" },
  { id: "fx", name: "f(x)", status: "已核对 MV", color: "#a7ef3b", color2: "#563f99", heroVideo: "n8I8QGFA1oM", tone: "二代实验概念女团", note: "适合练概念词、感受词和形容词。" },
  { id: "sistar", name: "SISTAR", status: "已核对 MV", color: "#e7a533", color2: "#5b2b1f", heroVideo: "E0ZHXVp_wUE", tone: "二代夏日/声线女团", note: "适合练情绪词、离别表达和基础句型。" }
];

const videos = [
  {
    id: "svt-super",
    band: "svt",
    title: "SEVENTEEN '손오공' Official MV",
    type: "MV",
    source: "YouTube · HYBE LABELS",
    youtubeId: "-GQg25oP0S4",
    duration: "3:34",
    level: "A1-A2",
    description: "适合练习自我鼓励、动作词和歌词里的短句节奏。",
    terms: [
      ["음악", "音乐", 16, "음악이 필요해요.", "word"],
      ["뛰어", "奔跑/跳跃", 13, "계속 뛰어 봐요.", "word"],
      ["느낌", "感觉", 10, "이 느낌을 기억해요.", "word"],
      ["할 수 있어", "可以做到", 9, "우리는 할 수 있어.", "sentence"],
      ["다시", "再次", 8, "다시 시작해요.", "word"],
      ["함께", "一起", 7, "함께 노래해요.", "word"],
      ["지금", "现在", 6, "지금 들어 보세요.", "word"]
    ]
  },
  {
    id: "svt-god",
    band: "svt",
    title: "SEVENTEEN '음악의 신' Official MV",
    type: "MV",
    source: "YouTube · HYBE LABELS",
    youtubeId: "zSQ48zyWZrY",
    duration: "3:31",
    level: "A2",
    description: "围绕音乐、幸福、邀请表达，适合做句子跟读和听写。",
    terms: [
      ["음악의 신", "音乐之神", 15, "음악의 신이 있다면.", "sentence"],
      ["행복", "幸福", 12, "행복을 나눠요.", "word"],
      ["노래", "歌曲/唱歌", 11, "같이 노래해요.", "word"],
      ["세계", "世界", 9, "세계가 춤춰요.", "word"],
      ["기분", "心情", 8, "기분이 좋아요.", "word"],
      ["같이", "一起", 7, "우리 같이 가요.", "word"],
      ["괜찮아요", "没关系", 5, "괜찮아요, 천천히 해요.", "sentence"]
    ]
  },
  {
    id: "svt-maestro",
    band: "svt",
    title: "SEVENTEEN 'MAESTRO' Official MV",
    type: "MV",
    source: "YouTube · HYBE LABELS",
    youtubeId: "ThI0pBAbFnk",
    duration: "3:23",
    level: "A2-B1",
    description: "适合练命令式、节奏词和舞台相关表达。",
    terms: [
      ["지휘하다", "指挥", 12, "무대를 지휘해요.", "word"],
      ["박자", "拍子", 11, "박자를 맞춰요.", "word"],
      ["움직이다", "移动/行动", 10, "천천히 움직여요.", "word"],
      ["준비됐어요", "准备好了", 8, "이제 준비됐어요.", "sentence"],
      ["새로운", "新的", 7, "새로운 모습을 보여줘요.", "word"],
      ["소리", "声音", 6, "소리를 들어요.", "word"],
      ["시작해요", "开始吧", 5, "지금 시작해요.", "sentence"]
    ]
  },
  {
    id: "svt-concert-talk",
    band: "svt",
    title: "SEVENTEEN Concert Ment Practice",
    type: "演唱会",
    source: "公开视频样例 · Concert talk",
    youtubeId: "-GQg25oP0S4",
    duration: "6:20",
    level: "A1-A2",
    description: "演唱会问候和感谢句训练，适合跟读。",
    terms: [["고마워요", "谢谢你们", 14, "고마워요, 캐럿들!", "sentence"], ["사랑해요", "我爱你们", 12, "정말 사랑해요.", "sentence"], ["오늘", "今天", 11, "오늘 너무 행복해요.", "word"]]
  },
  {
    id: "svt-variety-talk",
    band: "svt",
    title: "Going SEVENTEEN Variety Korean",
    type: "综艺",
    source: "公开视频样例 · Variety",
    youtubeId: "zSQ48zyWZrY",
    duration: "8:42",
    level: "A2",
    description: "综艺反应词和游戏任务句训练。",
    terms: [["빨리", "快一点", 15, "빨리 와요!", "word"], ["진짜", "真的", 13, "진짜 맛있어요.", "word"], ["어떻게", "怎么/怎么办", 9, "이거 어떻게 해요?", "word"]]
  },
  {
    id: "svt-interview-talk",
    band: "svt",
    title: "SEVENTEEN Album Interview Korean",
    type: "采访",
    source: "公开视频样例 · Interview",
    youtubeId: "ThI0pBAbFnk",
    duration: "5:18",
    level: "A2-B1",
    description: "专辑介绍、推荐和正式表达训练。",
    terms: [["앨범", "专辑", 13, "이번 앨범을 소개할게요.", "word"], ["준비하다", "准备", 11, "오랫동안 준비했어요.", "word"], ["기대해 주세요", "请期待", 5, "많이 기대해 주세요.", "sentence"]]
  },
  {
    id: "bts-dynamite",
    band: "bts",
    title: "BTS 'Dynamite' Official MV",
    type: "MV",
    source: "YouTube · HYBE LABELS",
    youtubeId: "gdZLi9oWNZg",
    duration: "3:43",
    level: "A1-A2",
    description: "用熟悉的舞台语境练基础韩语反应词和鼓励句。",
    terms: [["빛", "光", 13, "빛이 보여요.", "word"], ["춤", "舞蹈", 11, "같이 춤춰요.", "word"], ["좋아요", "好/喜欢", 9, "기분이 좋아요.", "sentence"], ["시작", "开始", 7, "지금 시작해요.", "word"]]
  },
  {
    id: "bts-concert",
    band: "bts",
    title: "BTS Concert Korean Ment",
    type: "演唱会",
    source: "公开视频样例 · Concert",
    youtubeId: "gdZLi9oWNZg",
    duration: "7:10",
    level: "A1-A2",
    description: "演唱会问候、感谢和约定类短句。",
    terms: [["여러분", "大家", 12, "여러분, 감사합니다.", "word"], ["약속", "约定", 8, "우리 약속해요.", "word"], ["보고 싶어요", "想见你", 7, "정말 보고 싶어요.", "sentence"]]
  },
  {
    id: "bts-variety",
    band: "bts",
    title: "BTS Variety Reaction Korean",
    type: "综艺",
    source: "公开视频样例 · Variety",
    youtubeId: "gdZLi9oWNZg",
    duration: "9:30",
    level: "A2",
    description: "综艺里的惊讶、赞同和吐槽表达。",
    terms: [["대박", "太厉害了", 13, "와, 대박!", "word"], ["맞아요", "对的", 10, "네, 맞아요.", "sentence"], ["왜요", "为什么", 7, "왜요?", "word"]]
  },
  {
    id: "bts-interview",
    band: "bts",
    title: "BTS Interview Korean Basics",
    type: "采访",
    source: "公开视频样例 · Interview",
    youtubeId: "gdZLi9oWNZg",
    duration: "6:44",
    level: "A2-B1",
    description: "采访中常见的介绍、感谢和目标表达。",
    terms: [["목표", "目标", 10, "목표가 있어요.", "word"], ["감사합니다", "谢谢", 9, "항상 감사합니다.", "sentence"], ["소개하다", "介绍", 6, "곡을 소개할게요.", "word"]]
  },
  {
    id: "txt-sugar",
    band: "txt",
    title: "TXT 'Sugar Rush Ride' Official MV",
    type: "MV",
    source: "YouTube · HYBE LABELS",
    youtubeId: "P9tKTxbgdkk",
    duration: "3:36",
    level: "A2",
    description: "适合练感受、诱惑、移动类表达。",
    terms: [["느껴져", "感觉到", 12, "달콤함이 느껴져.", "word"], ["꿈", "梦", 10, "꿈처럼 보여요.", "word"], ["가자", "走吧", 8, "같이 가자.", "sentence"], ["달콤하다", "甜", 6, "너무 달콤해요.", "word"]]
  },
  {
    id: "txt-concert",
    band: "txt",
    title: "TXT Concert Talk Korean",
    type: "演唱会",
    source: "公开视频样例 · Concert",
    youtubeId: "P9tKTxbgdkk",
    duration: "6:00",
    level: "A1-A2",
    description: "演唱会问候和粉丝互动表达。",
    terms: [["기다리다", "等待", 9, "오래 기다렸어요.", "word"], ["반가워요", "很高兴见到你", 8, "정말 반가워요.", "sentence"], ["응원", "应援", 7, "응원 고마워요.", "word"]]
  },
  {
    id: "txt-variety",
    band: "txt",
    title: "TXT Variety Korean",
    type: "综艺",
    source: "公开视频样例 · Variety",
    youtubeId: "P9tKTxbgdkk",
    duration: "8:12",
    level: "A2",
    description: "游戏任务和自然反应词。",
    terms: [["잠깐만", "等一下", 11, "잠깐만요!", "word"], ["재미있다", "有趣", 8, "너무 재미있다.", "word"], ["몰라요", "不知道", 7, "저도 몰라요.", "sentence"]]
  },
  {
    id: "txt-interview",
    band: "txt",
    title: "TXT Interview Korean",
    type: "采访",
    source: "公开视频样例 · Interview",
    youtubeId: "P9tKTxbgdkk",
    duration: "5:40",
    level: "A2-B1",
    description: "采访里的推荐、解释和心情表达。",
    terms: [["추천하다", "推荐", 8, "이 노래를 추천해요.", "word"], ["설명하다", "说明", 7, "컨셉을 설명할게요.", "word"], ["떨려요", "紧张", 6, "조금 떨려요.", "sentence"]]
  },
  {
    id: "skz-sclass",
    band: "skz",
    title: "Stray Kids '특(S-Class)' M/V",
    type: "MV",
    source: "YouTube · JYP Entertainment",
    youtubeId: "JsOOis4bBFg",
    duration: "3:32",
    level: "A2",
    description: "强节奏歌词适合练动作词、形容词和自信表达。",
    terms: [["특별하다", "特别", 14, "우리는 특별해요.", "word"], ["별", "星星", 12, "별처럼 빛나요.", "word"], ["소리치다", "喊叫", 8, "크게 소리쳐요.", "word"], ["괜찮아", "没关系", 6, "괜찮아, 계속해.", "sentence"]]
  },
  {
    id: "skz-concert",
    band: "skz",
    title: "Stray Kids Concert Korean",
    type: "演唱会",
    source: "公开视频样例 · Concert",
    youtubeId: "JsOOis4bBFg",
    duration: "7:05",
    level: "A1-A2",
    description: "舞台问候和气氛带动句。",
    terms: [["소리 질러", "尖叫吧", 10, "다 같이 소리 질러!", "sentence"], ["준비", "准备", 8, "준비됐나요?", "word"], ["뜨겁다", "热烈", 6, "분위기가 뜨거워요.", "word"]]
  },
  {
    id: "skz-variety",
    band: "skz",
    title: "Stray Kids Variety Korean",
    type: "综艺",
    source: "公开视频样例 · Variety",
    youtubeId: "JsOOis4bBFg",
    duration: "8:50",
    level: "A2",
    description: "综艺快速反应和团队互动表达。",
    terms: [["빨리해", "快做", 11, "빨리해!", "sentence"], ["웃겨요", "好笑", 9, "진짜 웃겨요.", "word"], ["도와줘", "帮帮我", 7, "나 좀 도와줘.", "sentence"]]
  },
  {
    id: "skz-interview",
    band: "skz",
    title: "Stray Kids Interview Korean",
    type: "采访",
    source: "公开视频样例 · Interview",
    youtubeId: "JsOOis4bBFg",
    duration: "5:55",
    level: "A2-B1",
    description: "采访中自我介绍、专辑和目标表达。",
    terms: [["작업하다", "创作/工作", 8, "곡을 작업했어요.", "word"], ["메시지", "信息/主题", 7, "메시지를 담았어요.", "word"], ["보여드리다", "展示给您", 6, "좋은 모습을 보여드릴게요.", "word"]]
  },
  {
    id: "enhypen-bite",
    band: "enhypen",
    title: "ENHYPEN 'Bite Me' Official MV",
    type: "MV",
    source: "YouTube · HYBE LABELS",
    youtubeId: "wXFLzODIdUI",
    duration: "3:16",
    level: "A2",
    description: "适合练情绪、请求和剧情向歌词表达。",
    terms: [["운명", "命运", 12, "운명처럼 만났어요.", "word"], ["기억해", "记住", 10, "나를 기억해.", "sentence"], ["원하다", "想要", 8, "너를 원해.", "word"], ["가까이", "靠近", 6, "가까이 와요.", "word"]]
  },
  {
    id: "enhypen-concert",
    band: "enhypen",
    title: "ENHYPEN Concert Korean",
    type: "演唱会",
    source: "公开视频样例 · Concert",
    youtubeId: "wXFLzODIdUI",
    duration: "6:32",
    level: "A1-A2",
    description: "演唱会感谢、介绍和互动句。",
    terms: [["엔진", "ENGENE 粉丝名", 10, "엔진, 고마워요.", "word"], ["행복해요", "很幸福", 8, "오늘 행복해요.", "sentence"], ["만나요", "见面", 6, "다시 만나요.", "word"]]
  },
  {
    id: "enhypen-variety",
    band: "enhypen",
    title: "ENHYPEN Variety Korean",
    type: "综艺",
    source: "公开视频样例 · Variety",
    youtubeId: "wXFLzODIdUI",
    duration: "8:15",
    level: "A2",
    description: "综艺里的任务、反应和礼貌表达。",
    terms: [["조심해", "小心", 9, "조심해요!", "word"], ["맞춰봐", "猜猜看", 8, "한번 맞춰봐.", "sentence"], ["성공", "成功", 7, "성공했어요.", "word"]]
  },
  {
    id: "enhypen-interview",
    band: "enhypen",
    title: "ENHYPEN Interview Korean",
    type: "采访",
    source: "公开视频样例 · Interview",
    youtubeId: "wXFLzODIdUI",
    duration: "5:26",
    level: "A2-B1",
    description: "采访中常见的主题说明和期待表达。",
    terms: [["콘셉트", "概念/风格", 9, "콘셉트가 강렬해요.", "word"], ["표현하다", "表达", 8, "감정을 표현했어요.", "word"], ["기대", "期待", 7, "많이 기대해 주세요.", "word"]]
  }
];

const extraVideos = [
  makeMv("exo-growl", "exo", "EXO '으르렁 (Growl)' MV", "I3dezFzsNss", "SMTOWN", [["으르렁", "咆哮/低吼", 14, "으르렁대.", "word", 42], ["너", "你", 12, "너를 원해.", "word", 55], ["조심해", "小心", 9, "조심해.", "sentence", 68], ["사랑", "爱", 7, "사랑이 보여.", "word", 83]]),
  makeMv("bigbang-bang", "bigbang", "BIGBANG '뱅뱅뱅' M/V", "2ips2mM7Zqw", "BIGBANG", [["뱅뱅뱅", "Bang Bang Bang", 18, "뱅뱅뱅!", "word", 68], ["오늘", "今天", 10, "오늘 밤.", "word", 35], ["놀자", "玩吧", 9, "같이 놀자.", "sentence", 76], ["소리쳐", "喊出来", 8, "크게 소리쳐.", "sentence", 92]]),
  makeMv("shinee-ring", "shinee", "SHINee 'Ring Ding Dong' MV", "roughtzsCDI", "SMTOWN", [["링딩동", "拟声副歌", 18, "링딩동 링딩동.", "word", 62], ["사랑해", "爱你", 10, "너를 사랑해.", "sentence", 84], ["머리", "头/脑海", 7, "머릿속에 있어.", "word", 48], ["계속", "一直", 6, "계속 들려.", "word", 70]]),
  makeMv("suju-sorry", "suju", "SUPER JUNIOR '쏘리 쏘리' MV", "x6QA3m58DQw", "SMTOWN", [["쏘리", "Sorry", 20, "쏘리 쏘리.", "word", 45], ["내가", "我", 11, "내가 먼저 말할게.", "word", 58], ["미안해", "对不起", 8, "정말 미안해.", "sentence", 75], ["다시", "再次", 6, "다시 와줘.", "word", 96]]),
  makeMv("2pm-house", "pm", "2PM '우리집(My House)' M/V", "u2pFB1dCSo4", "JYP Entertainment", [["우리집", "我家", 15, "우리집으로 가자.", "word", 58], ["가자", "走吧", 12, "같이 가자.", "sentence", 66], ["괜찮아", "没关系", 8, "괜찮아.", "sentence", 77], ["오늘", "今天", 7, "오늘 어때?", "word", 35]]),
  makeMv("nct127-kick", "nct127", "NCT 127 '영웅; Kick It' MV", "2OvyA2__Eas", "SMTOWN", [["영웅", "英雄", 13, "나는 영웅이야.", "word", 40], ["시작", "开始", 9, "지금 시작해.", "word", 55], ["소리", "声音", 8, "소리를 들어.", "word", 72], ["이겨", "赢", 7, "우리는 이겨.", "sentence", 88]]),
  makeMv("ateez-bouncy", "ateez", "ATEEZ 'BOUNCY' Official MV", "U0G5OA6ZH5w", "KQ ENTERTAINMENT", [["매운맛", "辣味", 12, "매운맛을 보여줘.", "word", 39], ["뛰어", "跳/跑", 10, "높이 뛰어.", "word", 61], ["멈추지 마", "不要停", 8, "멈추지 마.", "sentence", 80], ["같이", "一起", 7, "같이 가자.", "word", 92]]),
  makeMv("treasure-jikjin", "treasure", "TREASURE '직진 (JIKJIN)' M/V", "ZJaKdBBzUYk", "TREASURE", [["직진", "直行", 16, "너에게 직진.", "word", 52], ["사랑", "爱", 10, "사랑을 향해.", "word", 64], ["달려", "奔跑", 8, "계속 달려.", "word", 77], ["멈출 수 없어", "停不下来", 6, "멈출 수 없어.", "sentence", 90]]),
  makeMv("riize-guitar", "riize", "RIIZE 'Get A Guitar' MV", "iUw3LPM7OBU", "SMTOWN", [["기타", "吉他", 12, "기타를 들어.", "word", 44], ["느낌", "感觉", 9, "좋은 느낌.", "word", 58], ["함께", "一起", 8, "함께 연주해.", "word", 73], ["시작해", "开始", 6, "지금 시작해.", "sentence", 86]]),
  makeMv("zb1-bloom", "zb1", "ZEROBASEONE 'In Bloom' MV", "trzeUClQIIg", "ZEROBASEONE", [["꽃", "花", 12, "꽃이 피어요.", "word", 50], ["너에게", "向你", 9, "너에게 갈게.", "word", 68], ["빛나다", "发光", 8, "환하게 빛나요.", "word", 82], ["기다려", "等我", 6, "조금 기다려.", "sentence", 95]]),
  makeMv("blackpink-d4", "blackpink", "BLACKPINK '뚜두뚜두' M/V", "IHNzOHi8sJs", "BLACKPINK", [["뚜두뚜두", "拟声副歌", 18, "뚜두뚜두.", "word", 70], ["예쁘다", "漂亮", 10, "예쁘게 웃어.", "word", 45], ["조심해", "小心", 8, "조심해.", "sentence", 63], ["원해", "想要", 7, "네가 원해.", "word", 88]]),
  makeMv("twice-tt", "twice", "TWICE 'TT' M/V", "ePpPVE-GGJw", "JYP Entertainment", [["티티", "TT", 18, "너무해 너무해.", "word", 62], ["너무해", "太过分", 12, "너무해.", "word", 70], ["몰라", "不知道", 8, "내 마음 몰라.", "word", 44], ["좋아해", "喜欢", 7, "너를 좋아해.", "sentence", 82]]),
  makeMv("redvelvet-psycho", "redvelvet", "Red Velvet 'Psycho' MV", "uR8Mrt1IpXg", "SMTOWN", [["사이코", "Psycho", 14, "우린 사이코.", "word", 55], ["괜찮아", "没关系", 10, "괜찮아질 거야.", "sentence", 78], ["이상해", "奇怪", 8, "조금 이상해.", "word", 44], ["사랑", "爱", 7, "사랑이 어려워.", "word", 92]]),
  makeMv("itzy-wannabe", "itzy", "ITZY 'WANNABE' M/V", "fE2h3lGlOsk", "JYP Entertainment", [["나", "我", 18, "나는 나야.", "word", 54], ["원해", "想要", 11, "내가 원해.", "word", 68], ["달라", "不同", 9, "나는 달라.", "word", 82], ["괜찮아", "没关系", 7, "괜찮아.", "sentence", 96]]),
  makeMv("aespa-next", "aespa", "aespa 'Next Level' MV", "4TWR90KJl84", "SMTOWN", [["다음", "下一个", 12, "다음 단계로.", "word", 42], ["레벨", "Level", 12, "넥스트 레벨.", "word", 60], ["열어", "打开", 8, "문을 열어.", "word", 78], ["가자", "走吧", 7, "같이 가자.", "sentence", 91]]),
  makeMv("ive-love-dive", "ive", "IVE 'LOVE DIVE' MV", "Y8JFxS1HlDo", "STARSHIP", [["사랑", "爱", 13, "사랑에 빠져.", "word", 46], ["다이브", "Dive", 11, "러브 다이브.", "word", 64], ["궁금해", "好奇", 8, "네가 궁금해.", "word", 81], ["들어와", "进来", 6, "내게 들어와.", "sentence", 94]]),
  makeMv("newjeans-omg", "newjeans", "NewJeans 'OMG' Official MV", "_ZAgIHmHLdc", "HYBE LABELS", [["오엠지", "OMG", 14, "오 마이 갓.", "word", 55], ["생각나", "想起", 10, "네가 생각나.", "word", 73], ["어떡해", "怎么办", 8, "나 어떡해.", "sentence", 84], ["좋아", "喜欢/好", 7, "너무 좋아.", "word", 96]]),
  makeMv("lesserafim-antifragile", "lesserafim", "LE SSERAFIM 'ANTIFRAGILE' M/V", "pyf8cbqyfPs", "HYBE LABELS", [["안티프래자일", "Antifragile", 15, "나는 안티프래자일.", "word", 62], ["강해", "坚强", 10, "더 강해져.", "word", 76], ["두려워", "害怕", 7, "두렵지 않아.", "word", 45], ["가자", "走吧", 6, "앞으로 가자.", "sentence", 90]]),
  makeMv("gidle-queencard", "gidle", "(G)I-DLE '퀸카' Official MV", "7HDeem-JaSY", "i-dle", [["퀸카", "Queen card", 16, "나는 퀸카.", "word", 53], ["예뻐", "漂亮", 10, "너무 예뻐.", "word", 67], ["자신감", "自信", 8, "자신감 있어.", "word", 82], ["빛나", "发光", 6, "오늘 빛나.", "sentence", 95]]),
  makeMv("snsd-gee", "snsd", "Girls' Generation 'Gee' MV", "U7mPqycQ0tQ", "SMTOWN", [["지", "Gee", 18, "지 지 지.", "word", 50], ["몰라", "不知道", 10, "아직 몰라.", "word", 62], ["좋아해", "喜欢", 8, "너를 좋아해.", "sentence", 75], ["어떡해", "怎么办", 7, "나 어떡해.", "word", 88]]),
  makeMv("2ne1-best", "2ne1", "2NE1 '내가 제일 잘 나가' M/V", "j7_lSP8Vc3o", "2NE1", [["제일", "最", 12, "내가 제일.", "word", 45], ["잘 나가", "最红/很厉害", 14, "내가 제일 잘 나가.", "sentence", 62], ["누구", "谁", 8, "누구보다.", "word", 75], ["멋져", "帅/酷", 7, "정말 멋져.", "word", 90]]),
  makeMv("wondergirls-nobody", "wondergirls", "Wonder Girls 'Nobody' M/V", "QZBn1e9pr2Q", "wondergirls", [["너밖에", "除了你", 12, "너밖에 없어.", "word", 48], ["아무도", "谁都", 10, "아무도 아니야.", "word", 62], ["원하지 않아", "不想要", 8, "다른 건 원하지 않아.", "sentence", 78], ["사랑해", "爱你", 6, "너를 사랑해.", "sentence", 94]]),
  makeMv("kara-mister", "kara", "KARA 'Mister' M/V", "s2EQm6WPMHs", "DSPmedia", [["미스터", "Mister", 14, "헤이 미스터.", "word", 44], ["봐봐", "看看", 10, "나를 봐봐.", "word", 60], ["기다려", "等待", 7, "잠깐 기다려.", "word", 80], ["좋아", "喜欢", 6, "네가 좋아.", "sentence", 96]]),
  makeMv("fx-electric", "fx", "f(x) 'Electric Shock' MV", "n8I8QGFA1oM", "SMTOWN", [["전기", "电", 12, "전기가 통해.", "word", 50], ["충격", "冲击", 10, "일렉트릭 쇼크.", "word", 66], ["놀라", "惊讶", 8, "깜짝 놀라.", "word", 82], ["느껴", "感觉", 7, "느껴 봐.", "sentence", 94]]),
  makeMv("sistar-alone", "sistar", "SISTAR '나혼자 (Alone)' MV", "E0ZHXVp_wUE", "STARSHIP", [["혼자", "独自", 14, "나 혼자.", "word", 48], ["떠나", "离开", 9, "네가 떠나.", "word", 62], ["아파", "痛", 8, "마음이 아파.", "word", 80], ["괜찮아", "没关系", 6, "괜찮아질 거야.", "sentence", 96]]),
  makeMv("blackpink-kill-this-love", "blackpink", "BLACKPINK 'Kill This Love' M/V", "2S24-y0Ij3Y", "BLACKPINK", [["사랑", "爱", 16, "이 사랑을 끝내.", "word", 52], ["끝내", "结束", 12, "이제 끝내야 해.", "word", 72], ["울지 마", "别哭", 8, "울지 마.", "sentence", 86], ["강해", "坚强", 7, "더 강해져.", "word", 104]]),
  makeMv("blackpink-hylt", "blackpink", "BLACKPINK 'How You Like That' M/V", "ioNng23DkIM", "BLACKPINK", [["좋아", "喜欢/好", 15, "어떻게 좋아?", "word", 44], ["날아", "飞", 10, "높이 날아.", "word", 68], ["다시", "再次", 9, "다시 일어나.", "word", 91], ["빛나", "发光", 7, "오늘 빛나.", "sentence", 113]]),
  makeMv("bts-dna", "bts", "BTS 'DNA' Official MV", "MBdVXkSdhwU", "HYBE LABELS", [["운명", "命运", 15, "이건 운명이야.", "word", 45], ["처음", "第一次", 10, "처음부터 알았어.", "word", 66], ["원해", "想要", 8, "너를 원해.", "word", 82], ["우리", "我们", 7, "우린 연결돼.", "sentence", 102]]),
  makeMv("bts-boy-with-luv", "bts", "BTS '작은 것들을 위한 시' Official MV", "XsX3ATc3FbA", "HYBE LABELS", [["작은 것", "小事物", 13, "작은 것들이 좋아.", "word", 51], ["궁금해", "好奇", 10, "네 모든 게 궁금해.", "word", 70], ["사랑", "爱", 8, "사랑이 필요해.", "word", 94], ["하늘", "天空", 7, "하늘 높이 날아.", "word", 116]]),
  makeMv("twice-fancy", "twice", "TWICE 'FANCY' M/V", "kOHB85vDuow", "JYP Entertainment", [["팬시", "Fancy", 14, "너를 팬시.", "word", 48], ["원해", "想要", 10, "내가 원해.", "word", 66], ["달콤해", "甜蜜", 8, "너무 달콤해.", "word", 84], ["좋아해", "喜欢", 7, "너를 좋아해.", "sentence", 102]]),
  makeMv("twice-feel-special", "twice", "TWICE 'Feel Special' M/V", "3ymwOvzhwHs", "JYP Entertainment", [["특별해", "特别", 15, "너는 특별해.", "word", 46], ["느껴", "感觉", 10, "특별하게 느껴.", "word", 68], ["힘들어", "辛苦/累", 8, "가끔 힘들어.", "word", 86], ["빛나", "发光", 7, "다시 빛나.", "sentence", 106]]),
  makeMv("newjeans-attention", "newjeans", "NewJeans 'Attention' Official MV", "js1CtxSY38I", "HYBE LABELS", [["관심", "关注", 14, "관심을 줘.", "word", 42], ["너", "你", 11, "너를 보고 있어.", "word", 63], ["가까이", "靠近", 9, "가까이 와줘.", "word", 83], ["말해줘", "告诉我", 7, "솔직히 말해줘.", "sentence", 103]]),
  makeMv("ive-iam", "ive", "IVE 'I AM' MV", "6ZUIwj3FgUY", "STARSHIP", [["나는", "我是", 15, "나는 나야.", "word", 40], ["길", "路", 10, "내 길을 가.", "word", 64], ["하늘", "天空", 9, "하늘 위로.", "word", 86], ["빛나", "发光", 7, "내가 빛나.", "sentence", 108]]),
  makeMv("aespa-supernova", "aespa", "aespa 'Supernova' MV", "phuiiNCxRMg", "SMTOWN", [["슈퍼노바", "Supernova", 15, "나는 슈퍼노바.", "word", 46], ["폭발", "爆发", 10, "에너지가 폭발해.", "word", 65], ["빛", "光", 9, "강한 빛이 나.", "word", 84], ["느껴", "感觉", 7, "지금 느껴 봐.", "sentence", 103]]),
  makeMv("exo-love-shot", "exo", "EXO 'Love Shot' MV", "pSudEWBAYRE", "SMTOWN", [["러브샷", "Love shot", 14, "이건 러브샷.", "word", 50], ["마음", "心", 10, "마음을 열어.", "word", 70], ["상처", "伤口", 8, "상처가 보여.", "word", 92], ["사랑", "爱", 7, "사랑이 필요해.", "sentence", 111]]),
  makeMv("shinee-sherlock", "shinee", "SHINee 'Sherlock' MV", "8kyG5tTZ1iE", "SMTOWN", [["셜록", "Sherlock", 14, "셜록처럼 찾아.", "word", 52], ["단서", "线索", 10, "단서를 찾아.", "word", 73], ["궁금해", "好奇", 8, "너무 궁금해.", "word", 94], ["말해줘", "告诉我", 7, "진실을 말해줘.", "sentence", 113]]),
  makeMv("bigbang-fantastic-baby", "bigbang", "BIGBANG 'FANTASTIC BABY' M/V", "AAbokV76tkU", "BIGBANG", [["판타스틱", "Fantastic", 16, "판타스틱 베이비.", "word", 55], ["놀자", "玩吧", 11, "오늘 놀자.", "word", 72], ["춤춰", "跳舞", 9, "같이 춤춰.", "sentence", 92], ["소리쳐", "喊出来", 8, "크게 소리쳐.", "sentence", 110]]),
  makeMv("nctdream-hot-sauce", "nctdream", "NCT DREAM '맛 (Hot Sauce)' MV", "PkKnp4SdE-w", "SMTOWN", [["맛", "味道", 15, "이 맛을 봐.", "word", 44], ["뜨거워", "热", 10, "너무 뜨거워.", "word", 66], ["원해", "想要", 9, "네가 원해.", "word", 86], ["멈추지 마", "不要停", 7, "멈추지 마.", "sentence", 104]]),
  makeMv("straykids-gods-menu", "skz", "Stray Kids '神메뉴' M/V", "TQTlCHxyuu8", "JYP Entertainment", [["메뉴", "菜单", 15, "새로운 메뉴야.", "word", 45], ["맛", "味道", 12, "맛을 보여줘.", "word", 64], ["요리", "料理", 9, "우리가 요리해.", "word", 84], ["어서 와", "欢迎来", 7, "어서 와.", "sentence", 104]]),
  makeMaterial("svt-lolla", "svt", "演唱会", "SEVENTEEN Live at Lollapalooza Berlin 2024", "anUvD2jRIkw", "SEVENTEEN"),
  makeMaterial("svt-going", "svt", "综艺", "[GOING SEVENTEEN] EP.128 MC BOO's Dangerous Invitation #1", "27FE8Brbfzs", "SEVENTEEN"),
  makeMaterial("svt-interview-public", "svt", "采访", "SEVENTEEN Interview: Get to know them like never before", "XROWxiQZtXo", "zoom"),
  makeMaterial("bts-live-public", "bts", "演唱会", "BTS Anpanman, So What, Make It Right Live", "Ha_xD1ZfI50", "BangtanLives"),
  makeMaterial("bts-vogue-korean", "bts", "采访", "BTS Teaches You Korean", "h1WViLRSOSg", "Vogue"),
  makeMaterial("blackpink-live-public", "blackpink", "演唱会", "BLACKPINK 'JUMP' Live at WORLD TOUR", "P169hsXjYQs", "BLACKPINK"),
  makeMaterial("blackpink-billboard", "blackpink", "采访", "BLACKPINK Bandmates Interview", "befa9vOsQFk", "Billboard"),
  makeMaterial("twice-lolla", "twice", "演唱会", "TWICE Full Performance Lollapalooza Chicago", "ay1wB-2npMQ", "TWICE"),
  makeMaterial("twice-time-to-twice", "twice", "综艺", "[TIME TO TWICE] Rank Battle EP.01", "NtQhb3EJcOM", "TWICE"),
  makeMaterial("newjeans-teen-vogue", "newjeans", "采访", "NewJeans Play I Dare You", "3CkI1wp8MBs", "Teen Vogue"),
  makeMaterial("aespa-mma", "aespa", "演唱会", "aespa Whiplash + Supernova + Armageddon", "oQanvSArIh4", "MMA"),
  makeMaterial("skz-code", "skz", "综艺", "[SKZ CODE] Hyunjin's Cells #1", "-q0I-4q4sjY", "Stray Kids"),
  makeMaterial("nctdream-unboxing", "nctdream", "综艺", "NCT DREAM DREAMSCAPE Album Unboxing", "EsY4hDe6yKU", "NCT DREAM")
];

function makeMv(id, band, title, youtubeId, source, terms) {
  return {
    id,
    band,
    title,
    type: "MV",
    verified: true,
    source: `YouTube · ${source}`,
    youtubeId,
    duration: "官方 MV",
    level: "A1-B1",
    description: "已通过 YouTube oEmbed 核对的官方/厂牌公开视频，词条优先来自标题、常见歌词短句和学习高频表达。",
    terms
  };
}

function makeMaterial(id, band, type, title, youtubeId, source) {
  const typeTerms = {
    "演唱会": [["여러분", "大家", 12, "여러분, 감사합니다.", "word", 18], ["소리 질러", "尖叫吧", 10, "다 같이 소리 질러!", "sentence", 42], ["오늘", "今天", 9, "오늘 너무 행복해요.", "word", 66], ["감사합니다", "谢谢", 8, "항상 감사합니다.", "sentence", 88]],
    "综艺": [["잠깐만", "等一下", 12, "잠깐만요!", "word", 16], ["진짜", "真的", 11, "진짜 웃겨요.", "word", 34], ["맞아요", "对的", 9, "네, 맞아요.", "sentence", 58], ["도와줘", "帮帮我", 7, "나 좀 도와줘.", "sentence", 80]],
    "采访": [["앨범", "专辑", 11, "이번 앨범을 소개할게요.", "word", 20], ["준비하다", "准备", 10, "오랫동안 준비했어요.", "word", 44], ["기대", "期待", 8, "많이 기대해 주세요.", "word", 68], ["감사합니다", "谢谢", 7, "항상 감사합니다.", "sentence", 92]]
  };
  return {
    id,
    band,
    title,
    type,
    verified: true,
    source: `YouTube · ${source}`,
    youtubeId,
    duration: "公开视频",
    level: type === "采访" ? "A2-B1" : "A1-B1",
    description: `${type}公开素材入口，适合练 ${type === "综艺" ? "自然反应和互动短句" : type === "采访" ? "正式表达和说明句" : "问候、感谢和舞台互动句"}。`,
    terms: typeTerms[type]
  };
}

function contentVideos() {
  return [...videos.filter((video) => !video.source?.startsWith("公开视频样例")), ...extraVideos];
}

const seedUsers = {
  mina: createSeedUser("Mina", "svt", 1420, ["고마워요", "오늘", "빨리"], ["어떻게"], ["사랑해요", "괜찮아요", "무대"]),
  joon: createSeedUser("Joon", "svt", 980, ["진짜", "맛있다"], [], ["빨리"]),
  sol: createSeedUser("Sol", "bts", 760, [], [], []),
  ari: createSeedUser("Ari", "txt", 640, [], [], [])
};

let state = loadState();
let route = state.loggedIn ? (activeUser().selectedBand ? "home" : "bands") : "login";
let selectedBand = activeUser()?.selectedBand || "svt";
let selectedVideo = firstVideoForBand(selectedBand)?.id || "svt-super";
let rankMode = "terms";
let jamoMode = "vowels";
let leaderboardMode = "members";
let videoCategory = "MV";
let companyFilter = "HYBE";
let pronunciation = { text: "", listening: false, result: "" };
let groupClip = null;
let quiz = null;
let activeAudio = null;
let playingTerm = "";
let queue = { active: false, mode: "official", terms: [], index: -1 };

function createSeedUser(name, band, points, learned, wrong, review) {
  return {
    name,
    selectedBand: band,
    points,
    bandPoints: { [band]: points },
    learned,
    wrong,
    review,
    saved: [],
    progress: { "svt-super": 68, "svt-god": 44, "svt-maestro": 20 }
  };
}

function loadState() {
  const saved = localStorage.getItem(STORE_KEY);
  const old = localStorage.getItem(OLD_STORE_KEY);
  const base = saved ? JSON.parse(saved) : old ? migrateOldState(JSON.parse(old)) : null;
  const next = base || { loggedIn: false, activeUser: "mina", users: seedUsers, toast: "" };
  Object.entries(seedUsers).forEach(([id, user]) => {
    if (!next.users[id]) next.users[id] = user;
  });
  Object.values(next.users).forEach(normalizeUser);
  return next;
}

function migrateOldState(old) {
  return {
    loggedIn: true,
    activeUser: old.activeUser || "mina",
    users: old.users || seedUsers,
    toast: ""
  };
}

function normalizeUser(user) {
  user.selectedBand ||= "svt";
  user.points ||= 0;
  user.bandPoints ||= { [user.selectedBand]: user.points };
  user.learned ||= [];
  user.wrong ||= [];
  user.review ||= [];
  user.saved ||= [];
  user.progress ||= {};
}

function saveState() {
  localStorage.setItem(STORE_KEY, JSON.stringify(state));
}

function activeUser() {
  return state.users[state.activeUser];
}

function currentBand() {
  return bands.find((band) => band.id === selectedBand) || bands[0];
}

function companyFor(bandId) {
  if (["svt", "bts", "txt", "enhypen", "lesserafim", "newjeans"].includes(bandId)) return "HYBE";
  if (["blackpink", "bigbang", "2ne1", "treasure"].includes(bandId)) return "YG";
  if (["exo", "shinee", "suju", "nct127", "nctdream", "riize", "redvelvet", "aespa", "snsd", "fx"].includes(bandId)) return "SM";
  if (["twice", "itzy", "pm"].includes(bandId)) return "JYP";
  if (["ive", "sistar"].includes(bandId)) return "STARSHIP";
  return "Other";
}

function firstVideoForBand(bandId) {
  return contentVideos().find((video) => video.band === bandId) || contentVideos()[0];
}

function allTerms() {
  return contentVideos().flatMap((video) => video.terms.map(([ko, zh, count, example, kind, start = 0, exampleZh = ""]) => ({
    ko, zh, count, example, exampleZh: exampleZh || translateExample(example, zh), kind, start, clipVerified: false, band: video.band, videoId: video.id, videoTitle: video.title
  })));
}

function videoTerms() {
  const video = contentVideos().find((item) => item.id === selectedVideo) || contentVideos()[0];
  return expandTerms(video).map(([ko, zh, count, example, kind, start = 0, exampleZh = ""]) => ({
    ko, zh, count, example, exampleZh: exampleZh || translateExample(example, zh), kind, start, clipVerified: false, band: video.band, videoId: video.id, videoTitle: video.title
  }));
}

function expandTerms(video) {
  const byKo = new Map();
  [...video.terms, ...enrichmentTerms(video), ...baseLearningTerms()].forEach((term, index) => {
    const [ko, zh, count, example, kind, start = 0, exampleZh = ""] = term;
    if (!byKo.has(ko)) byKo.set(ko, [ko, zh, Math.max(1, Number(count) || 1), example, kind || "word", start || (index * 4) % 120, exampleZh]);
  });
  return [...byKo.values()].sort((a, b) => b[2] - a[2]).slice(0, 60);
}

function translateExample(example, fallback) {
  const dict = {
    "무대가 멋져요.": "舞台很帅。",
    "노래를 들어요.": "听这首歌。",
    "춤을 춰요.": "跳舞。",
    "팬들에게 고마워요.": "谢谢粉丝们。",
    "마음이 전해져요.": "心意传达到了。",
    "정말 좋아.": "真的很好/很喜欢。",
    "조금 기다려.": "等一下。",
    "한번 들어봐.": "听听看。",
    "네 모습을 보여줘.": "让我看看你的样子。",
    "항상 고마워.": "一直都谢谢你。",
    "다시 만나요.": "再见面吧。",
    "지금 시작해요.": "现在开始。",
    "안녕, 반가워.": "你好，很高兴见到你。",
    "정말 반가워.": "真的很高兴见到你。",
    "사랑이 필요해.": "需要爱。",
    "너를 사랑해.": "我爱你。",
    "정말 미안해.": "真的对不起。",
    "괜찮아질 거야.": "会好起来的。",
    "오늘 어때?": "今天怎么样？",
    "내일 만나요.": "明天见。",
    "지금 시작해.": "现在开始。",
    "다시 들어봐.": "再听一次。",
    "같이 가자.": "一起走吧。",
    "함께 노래해.": "一起唱歌。",
    "우리 가자.": "我们走吧。",
    "내게 와줘.": "到我这里来。",
    "내 말을 들어.": "听我说。",
    "나를 봐봐.": "看看我。",
    "솔직히 말해줘.": "诚实地告诉我。",
    "아직 몰라.": "还不知道。",
    "나도 알아.": "我也知道。",
    "왜 그래?": "为什么这样？",
    "나 어떡해.": "我怎么办。",
    "너무 좋아.": "非常喜欢/很好。",
    "그건 싫어.": "不喜欢那个。",
    "정말 예뻐.": "真的很漂亮。",
    "너무 멋져.": "非常帅/酷。",
    "진짜 귀여워.": "真的很可爱。",
    "너무 재밌어.": "非常有趣。",
    "조금 힘들어.": "有点累/辛苦。",
    "오늘 행복해.": "今天很幸福。",
    "조금 슬퍼.": "有点难过。",
    "정말 기뻐.": "真的很开心。",
    "약속해 줘.": "答应我。",
    "기억해 줘.": "请记住。",
    "꿈을 꿔.": "做梦。",
    "빛이 보여.": "看到了光。",
    "별처럼 빛나.": "像星星一样闪耀。",
    "노래를 불러.": "唱歌。",
    "무대에 서.": "站上舞台。",
    "음악을 들어.": "听音乐。",
    "소리가 들려.": "听见声音。",
    "마음을 알아줘.": "请懂我的心。",
    "눈빛이 좋아.": "眼神很好。",
    "이 순간을 기억해.": "记住这一瞬间。",
    "처음 만났어.": "第一次见面。",
    "마지막처럼.": "像最后一次一样。",
    "빨리 와.": "快来。",
    "천천히 말해줘.": "慢慢告诉我。",
    "조금만 기다려.": "稍微等一下。",
    "많이 사랑해.": "非常爱你。",
    "진짜 좋아.": "真的很好/很喜欢。",
    "정말 고마워.": "真的谢谢你。",
    "너무 예뻐.": "非常漂亮。",
    "계속 가자.": "继续走吧。",
    "이제 시작이야.": "现在才开始。",
    "음악이 필요해요.": "需要音乐。",
    "계속 뛰어 봐요.": "继续跳/跑看看。",
    "이 느낌을 기억해요.": "记住这种感觉。",
    "우리는 할 수 있어.": "我们可以做到。",
    "다시 시작해요.": "重新开始。",
    "함께 노래해요.": "一起唱歌。",
    "지금 들어 보세요.": "现在听听看。",
    "음악의 신이 있다면.": "如果有音乐之神的话。",
    "행복을 나눠요.": "分享幸福。",
    "같이 노래해요.": "一起唱歌。",
    "세계가 춤춰요.": "世界在跳舞。",
    "기분이 좋아요.": "心情很好。",
    "우리 같이 가요.": "我们一起走吧。",
    "괜찮아요, 천천히 해요.": "没关系，慢慢来。",
    "무대를 지휘해요.": "指挥舞台。",
    "박자를 맞춰요.": "配合拍子。",
    "천천히 움직여요.": "慢慢移动。",
    "이제 준비됐어요.": "现在准备好了。",
    "새로운 모습을 보여줘요.": "展现新的样子。",
    "소리를 들어요.": "听声音。",
    "고마워요, 캐럿들!": "谢谢你们，CARAT！",
    "정말 사랑해요.": "真的爱你们。",
    "오늘 너무 행복해요.": "今天非常幸福。",
    "빨리 와요!": "快来！",
    "진짜 맛있어요.": "真的很好吃。",
    "이거 어떻게 해요?": "这个怎么做？",
    "이번 앨범을 소개할게요.": "来介绍这张专辑。",
    "오랫동안 준비했어요.": "准备了很久。",
    "많이 기대해 주세요.": "请多多期待。",
    "빛이 보여요.": "看见光。",
    "같이 춤춰요.": "一起跳舞。",
    "여러분, 감사합니다.": "各位，谢谢。",
    "우리 약속해요.": "我们约定吧。",
    "정말 보고 싶어요.": "真的很想见你。",
    "와, 대박!": "哇，太厉害了！",
    "네, 맞아요.": "是的，没错。",
    "왜요?": "为什么？",
    "목표가 있어요.": "有目标。",
    "항상 감사합니다.": "一直都感谢。",
    "곡을 소개할게요.": "来介绍这首歌。",
    "달콤함이 느껴져.": "感觉到甜蜜。",
    "꿈처럼 보여요.": "像梦一样。",
    "너무 달콤해요.": "太甜蜜了。",
    "오래 기다렸어요.": "等了很久。",
    "정말 반가워요.": "真的很高兴见到你。",
    "응원 고마워요.": "谢谢应援。",
    "잠깐만요!": "请等一下！",
    "너무 재미있다.": "太有趣了。",
    "저도 몰라요.": "我也不知道。",
    "이 노래를 추천해요.": "推荐这首歌。",
    "컨셉을 설명할게요.": "来说明这个概念。",
    "조금 떨려요.": "有点紧张。",
    "우리는 특별해요.": "我们很特别。",
    "별처럼 빛나요.": "像星星一样闪耀。",
    "크게 소리쳐요.": "大声喊出来。",
    "괜찮아, 계속해.": "没关系，继续吧。",
    "다 같이 소리 질러!": "大家一起尖叫吧！",
    "준비됐나요?": "准备好了吗？",
    "분위기가 뜨거워요.": "气氛很热烈。",
    "빨리해!": "快点做！",
    "진짜 웃겨요.": "真的很好笑。",
    "나 좀 도와줘.": "帮帮我。",
    "곡을 작업했어요.": "创作了这首歌。",
    "메시지를 담았어요.": "放入了想传达的信息。",
    "좋은 모습을 보여드릴게요.": "会展现好的一面。",
    "운명처럼 만났어요.": "像命运一样相遇。",
    "나를 기억해.": "记住我。",
    "가까이 와요.": "靠近一点。",
    "엔진, 고마워요.": "ENGENE，谢谢。",
    "오늘 행복해요.": "今天很幸福。",
    "조심해요!": "小心！",
    "한번 맞춰봐.": "猜猜看。",
    "성공했어요.": "成功了。",
    "콘셉트가 강렬해요.": "概念很强烈。",
    "감정을 표현했어요.": "表达了感情。",
    "너를 좋아해.": "喜欢你。",
    "정말 멋져.": "真的很帅/很酷。",
    "네가 좋아.": "喜欢你。",
    "네 마음을 보여줘.": "让我看看你的心。",
    "춤을 춰.": "跳舞。",
    "으르렁대.": "低吼吧。",
    "너를 원해.": "想要你。",
    "조심해.": "小心。",
    "사랑이 보여.": "看见爱。",
    "뱅뱅뱅!": "Bang Bang Bang！",
    "오늘 밤.": "今天晚上。",
    "같이 놀자.": "一起玩吧。",
    "크게 소리쳐.": "大声喊出来。",
    "링딩동 링딩동.": "Ring Ding Dong。",
    "머릿속에 있어.": "在脑海里。",
    "계속 들려.": "一直听见。",
    "쏘리 쏘리.": "Sorry Sorry。",
    "내가 먼저 말할게.": "我先说。",
    "다시 와줘.": "再来我身边。",
    "우리집으로 가자.": "去我家吧。",
    "괜찮아.": "没关系。",
    "나는 영웅이야.": "我是英雄。",
    "소리를 들어.": "听声音。",
    "우리는 이겨.": "我们会赢。",
    "매운맛을 보여줘.": "展现辣味。",
    "높이 뛰어.": "跳高一点。",
    "멈추지 마.": "不要停。",
    "너에게 직진.": "向你直行。",
    "사랑을 향해.": "朝着爱。",
    "계속 달려.": "继续奔跑。",
    "멈출 수 없어.": "停不下来。",
    "기타를 들어.": "拿起吉他。",
    "좋은 느낌.": "好感觉。",
    "함께 연주해.": "一起演奏。",
    "꽃이 피어요.": "花开了。",
    "너에게 갈게.": "我要走向你。",
    "환하게 빛나요.": "明亮地闪耀。",
    "뚜두뚜두.": "DDU-DU DDU-DU。",
    "예쁘게 웃어.": "漂亮地笑。",
    "네가 원해.": "是你想要。",
    "너무해 너무해.": "太过分了。",
    "너무해.": "太过分了。",
    "내 마음 몰라.": "不懂我的心。",
    "우린 사이코.": "我们是 Psycho。",
    "조금 이상해.": "有点奇怪。",
    "사랑이 어려워.": "爱很难。",
    "나는 나야.": "我就是我。",
    "내가 원해.": "是我想要。",
    "나는 달라.": "我不一样。",
    "다음 단계로.": "到下一阶段。",
    "넥스트 레벨.": "Next Level。",
    "문을 열어.": "打开门。",
    "사랑에 빠져.": "陷入爱情。",
    "러브 다이브.": "Love Dive。",
    "네가 궁금해.": "对你好奇。",
    "내게 들어와.": "走进我这里。",
    "오 마이 갓.": "Oh my god。",
    "네가 생각나.": "想起你。",
    "나는 안티프래자일.": "我是 Antifragile。",
    "더 강해져.": "变得更强。",
    "두렵지 않아.": "不害怕。",
    "앞으로 가자.": "往前走吧。",
    "나는 퀸카.": "我是 Queencard。",
    "자신감 있어.": "有自信。",
    "오늘 빛나.": "今天闪耀。",
    "지 지 지.": "Gee Gee Gee。",
    "내가 제일.": "我是最棒的。",
    "내가 제일 잘 나가.": "我最红/最厉害。",
    "누구보다.": "比谁都更。",
    "너밖에 없어.": "只有你。",
    "아무도 아니야.": "谁都不是。",
    "다른 건 원하지 않아.": "不想要别的。",
    "헤이 미스터.": "Hey Mister。",
    "잠깐 기다려.": "稍等一下。",
    "전기가 통해.": "电流通过。",
    "일렉트릭 쇼크.": "Electric Shock。",
    "깜짝 놀라.": "吓一跳。",
    "느껴 봐.": "感受看看。",
    "나 혼자.": "我独自一人。",
    "네가 떠나.": "你离开。",
    "마음이 아파.": "心很痛。",
    "이 사랑을 끝내.": "结束这份爱。",
    "이제 끝내야 해.": "现在必须结束。",
    "울지 마.": "不要哭。",
    "어떻게 좋아?": "你觉得怎么样？",
    "높이 날아.": "高高飞起。",
    "다시 일어나.": "再次站起来。",
    "이건 운명이야.": "这是命运。",
    "처음부터 알았어.": "从一开始就知道。",
    "우린 연결돼.": "我们连接在一起。",
    "작은 것들이 좋아.": "喜欢那些小事物。",
    "네 모든 게 궁금해.": "对你的一切都好奇。",
    "하늘 높이 날아.": "飞向高空。",
    "너를 팬시.": "我喜欢你。",
    "너무 달콤해.": "太甜蜜了。",
    "너는 특별해.": "你很特别。",
    "특별하게 느껴.": "感觉很特别。",
    "가끔 힘들어.": "偶尔会辛苦。",
    "다시 빛나.": "再次闪耀。",
    "관심을 줘.": "给我关注。",
    "너를 보고 있어.": "正在看着你。",
    "가까이 와줘.": "请靠近我。",
    "내 길을 가.": "走我的路。",
    "하늘 위로.": "到天空之上。",
    "내가 빛나.": "我在闪耀。",
    "나는 슈퍼노바.": "我是 Supernova。",
    "에너지가 폭발해.": "能量爆发。",
    "강한 빛이 나.": "发出强烈的光。",
    "지금 느껴 봐.": "现在感受看看。",
    "이건 러브샷.": "这是 Love Shot。",
    "마음을 열어.": "打开心。",
    "상처가 보여.": "看见伤口。",
    "셜록처럼 찾아.": "像 Sherlock 一样寻找。",
    "단서를 찾아.": "寻找线索。",
    "너무 궁금해.": "非常好奇。",
    "진실을 말해줘.": "告诉我真相。",
    "판타스틱 베이비.": "Fantastic Baby。",
    "오늘 놀자.": "今天一起玩吧。",
    "같이 춤춰.": "一起跳舞。",
    "이 맛을 봐.": "尝尝这个味道。",
    "너무 뜨거워.": "太热了。",
    "새로운 메뉴야.": "这是新菜单。",
    "맛을 보여줘.": "展现味道。",
    "우리가 요리해.": "由我们来料理。",
    "어서 와.": "欢迎来。"
  };
  return dict[example] || `包含“${fallback}”的韩语例句。`;
}

function enrichmentTerms(video) {
  const base = [
    ["무대", "舞台", 4, "무대가 멋져요.", "word", 12],
    ["노래", "歌曲/唱歌", 4, "노래를 들어요.", "word", 18],
    ["춤", "舞蹈", 3, "춤을 춰요.", "word", 24],
    ["팬", "粉丝", 3, "팬들에게 고마워요.", "word", 30],
    ["마음", "心意/心", 3, "마음이 전해져요.", "word", 36],
    ["좋아", "喜欢/好", 3, "정말 좋아.", "word", 42],
    ["기다려", "等待", 2, "조금 기다려.", "sentence", 48],
    ["들어봐", "听听看", 2, "한번 들어봐.", "sentence", 54],
    ["보여줘", "给我看", 2, "네 모습을 보여줘.", "sentence", 60],
    ["고마워", "谢谢", 2, "항상 고마워.", "sentence", 66],
    ["다시", "再次", 2, "다시 만나요.", "word", 72],
    ["지금", "现在", 2, "지금 시작해요.", "word", 78]
  ];
  return base.filter(([ko]) => !video.terms.some(([existing]) => existing === ko));
}

function baseLearningTerms() {
  return [
    ["안녕", "你好", 5, "안녕, 반가워.", "word", 8],
    ["반가워", "很高兴见到你", 5, "정말 반가워.", "sentence", 10],
    ["사랑", "爱", 5, "사랑이 필요해.", "word", 14],
    ["사랑해", "我爱你", 5, "너를 사랑해.", "sentence", 18],
    ["고마워", "谢谢", 5, "항상 고마워.", "sentence", 22],
    ["미안해", "对不起", 4, "정말 미안해.", "sentence", 26],
    ["괜찮아", "没关系", 4, "괜찮아질 거야.", "sentence", 30],
    ["오늘", "今天", 4, "오늘 어때?", "word", 34],
    ["내일", "明天", 3, "내일 만나요.", "word", 38],
    ["지금", "现在", 4, "지금 시작해.", "word", 42],
    ["다시", "再次", 4, "다시 들어봐.", "word", 46],
    ["같이", "一起", 4, "같이 가자.", "word", 50],
    ["함께", "一起", 4, "함께 노래해.", "word", 54],
    ["가자", "走吧", 4, "우리 가자.", "sentence", 58],
    ["와줘", "请来", 3, "내게 와줘.", "word", 62],
    ["들어", "听", 3, "내 말을 들어.", "word", 66],
    ["들어봐", "听听看", 3, "한번 들어봐.", "sentence", 70],
    ["봐봐", "看看", 3, "나를 봐봐.", "word", 74],
    ["보여줘", "给我看", 3, "네 마음을 보여줘.", "sentence", 78],
    ["말해줘", "告诉我", 3, "솔직히 말해줘.", "sentence", 82],
    ["몰라", "不知道", 3, "아직 몰라.", "word", 86],
    ["알아", "知道", 3, "나도 알아.", "word", 90],
    ["왜", "为什么", 3, "왜 그래?", "word", 94],
    ["어떡해", "怎么办", 3, "나 어떡해.", "word", 98],
    ["좋아", "喜欢/好", 4, "너무 좋아.", "word", 102],
    ["싫어", "讨厌/不喜欢", 2, "그건 싫어.", "word", 106],
    ["예뻐", "漂亮", 3, "정말 예뻐.", "word", 110],
    ["멋져", "帅/酷", 3, "너무 멋져.", "word", 114],
    ["귀여워", "可爱", 3, "진짜 귀여워.", "word", 118],
    ["재밌어", "有趣", 3, "너무 재밌어.", "word", 122],
    ["힘들어", "辛苦/累", 2, "조금 힘들어.", "word", 126],
    ["행복해", "幸福", 3, "오늘 행복해.", "word", 130],
    ["슬퍼", "难过", 2, "조금 슬퍼.", "word", 134],
    ["기뻐", "开心", 2, "정말 기뻐.", "word", 138],
    ["기다려", "等待", 3, "조금 기다려.", "word", 142],
    ["약속", "约定", 3, "약속해 줘.", "word", 146],
    ["기억", "记忆", 3, "기억해 줘.", "word", 150],
    ["꿈", "梦", 3, "꿈을 꿔.", "word", 154],
    ["빛", "光", 3, "빛이 보여.", "word", 158],
    ["별", "星星", 3, "별처럼 빛나.", "word", 162],
    ["노래", "歌", 4, "노래를 불러.", "word", 166],
    ["춤", "舞蹈", 4, "춤을 춰.", "word", 170],
    ["무대", "舞台", 4, "무대에 서.", "word", 174],
    ["음악", "音乐", 4, "음악을 들어.", "word", 178],
    ["소리", "声音", 3, "소리가 들려.", "word", 182],
    ["마음", "心", 3, "마음을 알아줘.", "word", 186],
    ["눈빛", "眼神", 2, "눈빛이 좋아.", "word", 190],
    ["순간", "瞬间", 2, "이 순간을 기억해.", "word", 194],
    ["처음", "第一次", 2, "처음 만났어.", "word", 198],
    ["마지막", "最后", 2, "마지막처럼.", "word", 202],
    ["빨리", "快点", 3, "빨리 와.", "word", 206],
    ["천천히", "慢慢地", 3, "천천히 말해줘.", "word", 210],
    ["조금", "一点", 3, "조금만 기다려.", "word", 214],
    ["많이", "很多", 3, "많이 사랑해.", "word", 218],
    ["항상", "一直", 3, "항상 고마워.", "word", 222],
    ["진짜", "真的", 3, "진짜 좋아.", "word", 226],
    ["정말", "真的", 3, "정말 고마워.", "word", 230],
    ["너무", "太/非常", 3, "너무 예뻐.", "word", 234],
    ["계속", "继续", 3, "계속 가자.", "word", 238],
    ["시작", "开始", 3, "이제 시작이야.", "word", 242]
  ];
}

function uniqueTerms(source = allTerms()) {
  const merged = new Map();
  source.forEach((term) => {
    const existing = merged.get(term.ko);
    if (existing) existing.count += term.count;
    else merged.set(term.ko, { ...term });
  });
  return [...merged.values()].sort((a, b) => b.count - a.count);
}

function termByKo(ko) {
  return uniqueTerms().find((term) => term.ko === ko);
}

function dailyReviewTerms(user = activeUser()) {
  const pool = user.review.map(termByKo).filter(Boolean);
  const source = pool.length >= 20 ? pool : uniqueTerms().filter((term) => term.band === selectedBand);
  const day = new Date().toISOString().slice(0, 10);
  return [...source].sort((a, b) => hash(`${day}:${a.ko}`) - hash(`${day}:${b.ko}`)).slice(0, 20);
}

function hash(text) {
  let value = 0;
  for (let index = 0; index < text.length; index += 1) value = (value * 31 + text.charCodeAt(index)) >>> 0;
  return value;
}

function setToast(message) {
  state.toast = message;
  saveState();
  render();
  setTimeout(() => {
    if (state.toast === message) {
      state.toast = "";
      saveState();
      render();
    }
  }, 2200);
}

function award(user, bandId, points) {
  user.points += points;
  user.bandPoints[bandId] = (user.bandPoints[bandId] || 0) + points;
}

function autoStudy(term, mode) {
  if (!term) return;
  const user = activeUser();
  const learned = new Set(user.learned);
  const review = new Set(user.review);
  learned.add(term.ko);
  review.add(term.ko);
  user.learned = [...learned];
  user.review = [...review];
  const key = `term:${term.ko}`;
  const saved = new Set(user.saved || []);
  if (!saved.has(key)) {
    saved.add(key);
    user.saved = [...saved];
    award(user, term.band, mode === "spoken" ? 10 : 5);
    setToast(`${term.ko} +${mode === "spoken" ? 10 : 5} 积分`);
  }
  saveState();
}

function addReview(term) {
  const user = activeUser();
  user.review = [...new Set([...user.review, term.ko])];
  user.saved = [...new Set([...user.saved, term.ko])];
  saveState();
  setToast(`${term.ko} 已加入复习题库`);
}

function markLearned(term) {
  const user = activeUser();
  user.learned = [...new Set([...user.learned, term.ko])];
  user.review = [...new Set([...user.review, term.ko])];
  award(user, term.band, term.kind === "sentence" ? 30 : 12);
  user.progress[term.videoId] = Math.min(100, (user.progress[term.videoId] || 0) + (term.kind === "sentence" ? 10 : 6));
  saveState();
  setToast(`${term.ko} 已标记掌握，获得 ${term.kind === "sentence" ? 30 : 12} 分`);
}

function markWrong(term) {
  const user = activeUser();
  user.wrong = [...new Set([...user.wrong, term.ko])];
  user.review = [...new Set([...user.review, term.ko])];
  saveState();
  setToast(`${term.ko} 已放入错词本`);
}

function removeWrong(ko) {
  const user = activeUser();
  user.wrong = user.wrong.filter((item) => item !== ko);
  saveState();
  setToast(`${ko} 已从错词本移除`);
}

function speakKorean(text) {
  const audio = new Audio(`/api/naver-tts?text=${encodeURIComponent(text)}`);
  activeAudio?.pause();
  activeAudio = audio;
  audio.volume = 1;
  audio.play().catch(() => speakWithBrowserVoice(text));
  return audio;
}

function speakWithBrowserVoice(text) {
  if (!("speechSynthesis" in window)) {
    setToast("当前浏览器不支持发音播放");
    return;
  }
  speechSynthesis.cancel();
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = "ko-KR";
  utterance.rate = 0.82;
  utterance.volume = 1;
  utterance.voice = speechSynthesis.getVoices().find((voice) => voice.lang.toLowerCase().startsWith("ko")) || null;
  speechSynthesis.speak(utterance);
}

function playOfficialAudio(ko) {
  const term = termByKo(ko);
  playingTerm = ko;
  speakKorean(ko).addEventListener("ended", () => {
    if (!queue.active) {
      playingTerm = "";
      render();
    }
  });
  autoStudy(term, "heard");
  render();
}

async function playGroupAudio(ko) {
  const term = termByKo(ko);
  if (!term) return;
  const video = contentVideos().find((item) => item.id === term.videoId);
  if (!video?.youtubeId) return setToast("当前视频缺少公开视频来源");
  setToast("正在查找成员原声片段");
  try {
    autoStudy(term, "heard");
    playingTerm = term.ko;
    render();
    activeAudio?.pause();
    const audio = new Audio(`/api/group-clip?videoId=${encodeURIComponent(video.youtubeId)}&text=${encodeURIComponent(term.ko)}&example=${encodeURIComponent(term.example)}`);
    activeAudio = audio;
    audio.play().catch(() => setToast("正在准备成员原声片段，请稍后再点一次"));
    audio.addEventListener("error", () => setToast("没有找到可播放的成员原声音频片段"), { once: true });
    audio.addEventListener("ended", () => {
      if (!queue.active) {
        playingTerm = "";
        render();
      }
    }, { once: true });
    setToast(`${term.ko} +5 积分`);
  } catch (error) {
    setToast(error.message);
  }
}

function playQueue(mode) {
  const terms = uniqueTerms(videoTerms());
  queue = { active: true, mode, terms, index: -1 };
  playNextInQueue();
}

function stopQueue() {
  queue.active = false;
  activeAudio?.pause();
  playingTerm = "";
  render();
}

async function playNextInQueue() {
  if (!queue.active) return;
  queue.index += 1;
  if (queue.index >= queue.terms.length) {
    stopQueue();
    return;
  }
  const term = queue.terms[queue.index];
  playingTerm = term.ko;
  render();
  if (queue.mode === "group") {
    await playGroupAudio(term.ko);
    setTimeout(playNextInQueue, 2800);
    return;
  }
  const audio = speakKorean(term.ko);
  autoStudy(term, "heard");
  audio.addEventListener("ended", () => setTimeout(playNextInQueue, 220), { once: true });
  audio.addEventListener("error", () => setTimeout(playNextInQueue, 220), { once: true });
}

function listenPronunciation(text) {
  const targetTerm = termByKo(text);
  const Recognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  if (!Recognition) {
    pronunciation = { text, listening: false, result: "当前浏览器不支持语音识别，建议用 Chrome 或 Edge 测试。" };
    render();
    return;
  }
  const recognition = new Recognition();
  recognition.lang = "ko-KR";
  recognition.interimResults = false;
  recognition.maxAlternatives = 3;
  pronunciation = { text, listening: true, result: "正在听，请读出这个韩语词或句子。" };
  render();
  recognition.onresult = (event) => {
    const heard = event.results[0][0].transcript.trim();
    const ok = normalizeKorean(heard).includes(normalizeKorean(text)) || similarity(normalizeKorean(heard), normalizeKorean(text)) > 0.55;
    pronunciation = {
      text,
      listening: false,
      result: ok ? `听起来很接近：${heard}` : `识别为：${heard}。可以先点 ♪ 再读一次。`
    };
    if (ok) award(activeUser(), selectedBand, 6);
    if (ok) autoStudy(targetTerm, "spoken");
    saveState();
    render();
  };
  recognition.onerror = () => {
    pronunciation = { text, listening: false, result: "没有成功识别到韩语读音，请确认麦克风权限后重试。" };
    render();
  };
  recognition.onend = () => {
    if (pronunciation.listening) {
      pronunciation = { ...pronunciation, listening: false, result: "监听已结束，可以再试一次。" };
      render();
    }
  };
  recognition.start();
}

function normalizeKorean(text) {
  return text.replace(/[^\u3131-\u318e\uac00-\ud7a3]/g, "").trim();
}

function similarity(a, b) {
  if (!a || !b) return 0;
  const setA = new Set([...a]);
  const setB = new Set([...b]);
  const overlap = [...setA].filter((char) => setB.has(char)).length;
  return overlap / Math.max(setA.size, setB.size);
}

function createUser(name, bandId) {
  const clean = name.trim();
  if (!clean) return;
  const id = clean.toLowerCase().replace(/[^a-z0-9]+/g, "-") || `user-${Date.now()}`;
  const uniqueId = state.users[id] ? `${id}-${Date.now().toString().slice(-4)}` : id;
  state.users[uniqueId] = createSeedUser(clean, bandId, 0, [], [], []);
  state.activeUser = uniqueId;
  state.loggedIn = true;
  selectedBand = bandId;
  selectedVideo = firstVideoForBand(selectedBand).id;
  route = "bands";
  saveState();
  setToast(`欢迎 ${clean}，请选择你的学习团体`);
}

function loginUser(userId) {
  state.activeUser = userId;
  state.loggedIn = true;
  selectedBand = activeUser().selectedBand || "svt";
  selectedVideo = firstVideoForBand(selectedBand).id;
  route = activeUser().selectedBand ? "home" : "bands";
  saveState();
  render();
}

function chooseBand(bandId) {
  const user = activeUser();
  user.selectedBand = bandId;
  selectedBand = bandId;
  selectedVideo = firstVideoForBand(bandId).id;
  videoCategory = "MV";
  route = "home";
  saveState();
  setToast(`已选择 ${currentBand().name}`);
}

function startQuiz(source = "review") {
  const user = activeUser();
  const names = source === "wrong" ? user.wrong : user.review.length ? user.review : user.learned;
  const pool = source === "review" ? dailyReviewTerms(user) : uniqueTerms().filter((term) => names.includes(term.ko));
  const selectedPool = pool.length ? pool : uniqueTerms(videoTerms()).slice(0, 6);
  const question = selectedPool[Math.floor(Math.random() * selectedPool.length)];
  const options = shuffle([question.zh, ...shuffle(uniqueTerms().filter((term) => term.ko !== question.ko)).slice(0, 3).map((term) => term.zh)]);
  quiz = { question, options, answered: "", source };
  route = "review";
  render();
}

function answerQuiz(answer) {
  if (!quiz || quiz.answered) return;
  const user = activeUser();
  quiz.answered = answer;
  if (answer === quiz.question.zh) {
    award(user, quiz.question.band, quiz.question.kind === "sentence" ? 20 : 8);
    user.wrong = user.wrong.filter((item) => item !== quiz.question.ko);
    setToast("答对了，积分已更新");
  } else {
    user.wrong = [...new Set([...user.wrong, quiz.question.ko])];
    setToast("已加入错词本，下次再练");
  }
  saveState();
  render();
}

function shuffle(items) {
  return [...items].sort(() => Math.random() - 0.5);
}

function render() {
  const app = document.querySelector("#app");
  const band = currentBand();
  document.documentElement.style.setProperty("--fan", band.color);
  document.documentElement.style.setProperty("--fan-2", band.color2 || band.color);
  document.documentElement.style.setProperty("--hero-img", `url("https://i.ytimg.com/vi/${band.heroVideo}/maxresdefault.jpg")`);
  if (!state.loggedIn) {
    app.innerHTML = renderLogin();
    bindEvents();
    return;
  }
  const user = activeUser();
  app.innerHTML = `
    <div class="shell">
      ${renderTopbar(user)}
      ${route === "bands" ? renderBandPicker(user) : ""}
      ${route === "home" ? renderHome(user) : ""}
      ${route === "learn" ? renderLearn(user) : ""}
      ${route === "review" ? renderReview(user) : ""}
      ${route === "jamo" ? renderJamo(user) : ""}
      ${route === "leaderboard" ? renderLeaderboard() : ""}
      ${state.toast ? `<div class="toast">${state.toast}</div>` : ""}
    </div>
  `;
  bindEvents();
}

function renderLogin() {
  return `
    <main class="login-screen">
      <section class="login-visual">
        <div class="brand login-brand"><div class="mark">한</div><div><strong>Hanbeat Korean Lab</strong><span>K-pop video Korean learning</span></div></div>
      </section>
      <section class="card login-panel">
        <div class="tabs"><button class="pill-button active">登录</button><button class="pill-button">注册</button></div>
        <form id="loginForm">
          <label>已有账号</label>
          <select id="loginUserId">${Object.entries(state.users).map(([id, user]) => `<option value="${id}">${user.name}</option>`).join("")}</select>
          <button class="primary" type="submit">登录学习</button>
        </form>
        <div class="divider"></div>
        <form id="registerForm">
          <label>新账号昵称</label>
          <input id="newUserName" type="text" placeholder="例如 CaratMomo" autocomplete="off" />
          <label>注册后先学习</label>
          <select id="registerBand">${bands.map((band) => `<option value="${band.id}">${band.name}</option>`).join("")}</select>
          <button class="secondary" type="submit">注册并选择团体</button>
        </form>
      </section>
    </main>
  `;
}

function renderTopbar(user) {
  return `
    <header class="topbar">
      <button class="brand brand-button" data-route="home">
        <div class="mark">한</div>
        <div><strong>Hanbeat Korean Lab</strong><span>${currentBand().name} · ${user.name}</span></div>
      </button>
      <nav class="nav" aria-label="主导航">
        ${navButton("bands", "团体选择")}
        ${navButton("home", "首页")}
        ${navButton("learn", "视频学习")}
        ${navButton("review", "复习题库")}
        ${navButton("jamo", "四十音训练")}
        ${navButton("leaderboard", "积分排行")}
      </nav>
      <div class="account">
        <span class="badge">${user.points} 总分</span>
        <button class="ghost" data-logout>退出</button>
      </div>
    </header>
  `;
}

function navButton(id, label) {
  return `<button class="${route === id ? "active" : ""}" data-route="${id}">${label}</button>`;
}

function renderBandPicker() {
  const companies = ["HYBE", "SM", "YG", "JYP", "STARSHIP", "Other"];
  const shownBands = bands.filter((band) => companyFor(band.id) === companyFilter);
  return `
    <main class="main">
      <div class="section-head">
        <div><h2>选择学习团体</h2></div>
      </div>
      <div class="tabs company-tabs">${companies.map((company) => `<button class="pill-button ${companyFilter === company ? "active" : ""}" data-company-filter="${company}">${company}</button>`).join("")}</div>
      <div class="band-list">
        ${shownBands.map(renderBand).join("")}
      </div>
    </main>
  `;
}

function renderHome(user) {
  const bandVideos = contentVideos().filter((video) => video.band === selectedBand && video.type === videoCategory);
  const allBandVideos = contentVideos().filter((video) => video.band === selectedBand);
  const heroVideo = allBandVideos[0] || firstVideoForBand(selectedBand);
  const typeCounts = ["MV", "演唱会", "综艺", "采访"].map((type) => [type, allBandVideos.filter((video) => video.type === type).length]);
  const shownVideos = bandVideos.length ? bandVideos : allBandVideos.slice(0, 6);
  return `
    <main class="home-shell">
      <section class="home-hero card">
        <div class="home-hero-media">
          <img src="https://i.ytimg.com/vi/${heroVideo.youtubeId}/maxresdefault.jpg" alt="${currentBand().name}" />
          <div class="home-nav-pill">
            <span>${currentBand().name}</span>
            <button data-route="bands">切换</button>
          </div>
          <div class="home-float-card">
            <small>Now studying</small>
            <strong>${heroVideo.title}</strong>
            <button class="primary" data-route="learn">进入学习</button>
          </div>
        </div>
        <div class="home-hero-copy">
          <span class="tiny-label">Korean with real K-pop clips</span>
          <h1>${currentBand().name}</h1>
          <p>${currentBand().tone}</p>
        </div>
      </section>
      <div class="home-metrics grid three">
        ${metric("个人总积分", user.points)}
        ${metric("已学内容", user.learned.length)}
        ${metric("错词本", user.wrong.length)}
      </div>
      <section class="home-board card">
        <div class="home-board-head">
          <div>
            <span class="tiny-label">Library</span>
            <h2>${currentBand().name} 内容</h2>
          </div>
          <div class="type-counts">${typeCounts.map(([type, count]) => `<span>${type}<b>${count}</b></span>`).join("")}</div>
        </div>
        <div class="tabs category-tabs">${["MV", "演唱会", "综艺", "采访"].map((item) => `<button class="pill-button ${videoCategory === item ? "active" : ""}" data-video-category="${item}">${item}</button>`).join("")}</div>
        <div class="video-list">${shownVideos.map((video) => renderVideoCard(video, user)).join("")}</div>
      </section>
    </main>
  `;
}

function metric(label, value) {
  return `<div class="card metric"><span>${label}</span><strong>${value}</strong></div>`;
}

function renderBand(band) {
  return `
    <button class="card band band-name-only ${selectedBand === band.id ? "active" : ""}" data-choose-band="${band.id}" style="--band:${band.color};--band-2:${band.color2};--band-img:url('https://i.ytimg.com/vi/${band.heroVideo}/hqdefault.jpg')">
      <h3>${band.name}</h3>
    </button>
  `;
}

function renderVideoCard(video, user) {
  return `
    <article class="card video">
      <div class="video-thumb"><img src="https://i.ytimg.com/vi/${video.youtubeId}/hqdefault.jpg" alt="${video.title}" /><span>${video.type}</span></div>
      <div class="video-body">
        <div class="video-top"><span class="badge">${video.type}</span><span class="badge">${video.duration}</span></div>
        <h3>${video.title}</h3>
        <p>${video.description}</p>
        <div class="row"><span class="badge">${video.source}</span><span class="badge">进度 ${user.progress[video.id] || 0}%</span></div>
        <button class="primary" data-open-video="${video.id}">学习这个视频</button>
      </div>
    </article>
  `;
}

function renderLearn(user) {
  const video = contentVideos().find((item) => item.id === selectedVideo) || contentVideos()[0];
  const terms = rankMode === "all" ? uniqueTerms(allTerms().filter((term) => term.band === selectedBand)) : uniqueTerms(videoTerms());
  return `
    <main class="main">
      <div class="section-head">
        <div><h2>${video.title}</h2><p>${video.type} · ${video.source} · ${video.level}</p></div>
        <select id="videoSelect" aria-label="选择视频">${contentVideos().filter((item) => item.band === selectedBand).map((item) => `<option value="${item.id}" ${item.id === selectedVideo ? "selected" : ""}>${item.title}</option>`).join("")}</select>
      </div>
      <div class="learn-layout">
        <aside class="card panel">
          <div class="section-head"><div><h2>词频排行</h2><p>按字幕样例中的出现次数排序。</p></div></div>
          <div class="tabs"><button class="pill-button ${rankMode === "terms" ? "active" : ""}" data-rank-mode="terms">本视频</button><button class="pill-button ${rankMode === "all" ? "active" : ""}" data-rank-mode="all">本团体</button></div>
          <div class="list">${terms.map((term, index) => renderTerm(term, index)).join("")}</div>
        </aside>
        <section>
          <div class="video-player card"><iframe src="https://www.youtube.com/embed/${video.youtubeId}?rel=0" title="${video.title}" allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe></div>
          <div class="audio-strip card">
            <div><strong>双音频</strong><span>团体原声 / Naver 词典发音</span>${pronunciation.result ? `<small class="pronunciation-result">${pronunciation.result}</small>` : ""}</div>
            <div class="queue-actions">
              <button class="secondary" data-play-queue="official">一键 Naver</button>
              <button class="ghost" data-play-queue="group">一键团体</button>
              ${queue.active ? `<button class="ghost" data-stop-queue>停止</button>` : ""}
            </div>
          </div>
          <div class="grid three" style="margin-top:16px">${metric("视频词条", terms.length)}${metric("当前进度", `${user.progress[video.id] || 0}%`)}${metric("句子积分", "30/条")}</div>
        </section>
      </div>
    </main>
  `;
}

function renderTerm(term, index) {
  return `
    <div class="term ${playingTerm === term.ko ? "playing" : ""}">
      <span class="rank">${index + 1}</span>
      <div><b>${term.ko}</b><small>${term.zh} · 出现 ${term.count} 次 · ${term.kind === "sentence" ? "句子 +30" : "单词 +12"}</small><small>${term.example} <span class="translation">｜${term.exampleZh}</span></small></div>
      <div class="term-actions">
        <button class="icon-button tooltip group-audio" data-tip="从公开视频字幕时间轴匹配成员原声片段" title="从公开视频字幕时间轴匹配成员原声片段" data-group-audio="${term.ko}">G</button>
        <button class="icon-button tooltip" data-tip="Naver 发音" title="Naver 发音" data-official-speak="${term.ko}">♪</button>
        <button class="icon-button tooltip" data-tip="例句播放" title="例句播放" data-official-speak="${term.example}">例</button>
        <button class="icon-button tooltip mic" data-tip="读音检测" title="读音检测" data-pronounce="${term.ko}">🎙</button>
      </div>
    </div>
  `;
}

function renderReview(user) {
  const learned = user.learned.map(termByKo).filter(Boolean);
  const wrong = user.wrong.map(termByKo).filter(Boolean);
  const review = user.review.map(termByKo).filter(Boolean);
  const daily = dailyReviewTerms(user);
  return `
    <main class="main">
      <div class="section-head"><div><h2>每日复习与错题库</h2><p>今日 20 词 · 错题回炉</p></div><div class="quiz-actions"><button class="primary" data-start-quiz="review">今日 20 词测验</button><button class="ghost" data-start-quiz="wrong">错题测验</button></div></div>
      <div class="grid two"><section class="card panel"><h3>快速测验</h3>${renderQuiz()}</section><section class="card panel"><h3>错词本</h3><div class="list">${wrong.length ? wrong.map(renderWrongTerm).join("") : `<p class="empty">暂时没有错词。</p>`}</div></section></div>
      <section class="card panel" style="margin-top:16px"><h3>已掌握</h3><div class="list">${learned.length ? learned.map((term, index) => renderTerm(term, index)).join("") : `<p class="empty">还没有掌握记录。</p>`}</div></section>
      <section class="card panel" style="margin-top:16px"><h3>今日 20 词</h3><div class="list">${daily.length ? daily.map((term, index) => renderTerm(term, index)).join("") : `<p class="empty">先听几个词或读几个词，系统就会生成每日复习。</p>`}</div></section>
      <section class="card panel" style="margin-top:16px"><h3>复习题库</h3><div class="list">${review.length ? review.map((term, index) => renderTerm(term, index)).join("") : `<p class="empty">复习队列为空。</p>`}</div></section>
    </main>
  `;
}

function renderQuiz() {
  if (!quiz) return `<p class="empty">点击上方按钮生成一题。题目会从你的学习记录和错词本里抽取。</p>`;
  return `
    <div class="quiz">
      <div class="quiz-question"><span class="badge">${quiz.question.kind === "sentence" ? "句子" : "单词"}</span><strong>${quiz.question.ko}</strong><small>${quiz.question.example}</small></div>
      <div class="options">${quiz.options.map((option) => {
        const status = quiz.answered ? option === quiz.question.zh ? "correct" : option === quiz.answered ? "wrong" : "" : "";
        return `<button class="option ${status}" data-answer="${option}">${option}</button>`;
      }).join("")}</div>
      ${quiz.answered ? `<button class="primary" data-start-quiz="${quiz.source}">下一题</button>` : ""}
    </div>
  `;
}

function renderWrongTerm(term) {
  return `<div class="term"><span class="rank">!</span><div><b>${term.ko}</b><small>${term.zh} · ${term.example}</small></div><button class="icon-button tooltip" data-tip="从错词本移除" title="从错词本移除" data-remove-wrong="${term.ko}">x</button></div>`;
}

function renderJamo(user) {
  const terms = uniqueTerms().filter((term) => user.learned.includes(term.ko) || term.videoId === selectedVideo);
  return `
    <main class="main">
      <div class="section-head"><div><h2>四十音与视频例词训练</h2><p>用视频中出现过的词反推元音和辅音，点击字母可以播放示例音。</p></div></div>
      <div class="tabs"><button class="pill-button ${jamoMode === "vowels" ? "active" : ""}" data-jamo-mode="vowels">元音 21</button><button class="pill-button ${jamoMode === "consonants" ? "active" : ""}" data-jamo-mode="consonants">辅音 19</button></div>
      <div class="grid two"><section class="card panel"><h3>${jamoMode === "vowels" ? "基础元音 21" : "基础辅音 19"}</h3><div class="hangul-grid">${jamo[jamoMode].map(([letter, sound, sample]) => `<button class="jamo tooltip" data-tip="播放 ${sample}" data-speak="${sample}"><strong>${letter}</strong><span>${sound}</span><span>${sample}</span></button>`).join("")}</div></section><section class="card panel"><h3>来自视频的例词</h3><div class="list">${terms.slice(0, 9).map((term, index) => renderTerm(term, index)).join("")}</div></section></div>
    </main>
  `;
}

function renderLeaderboard() {
  const memberLeaders = Object.entries(state.users).map(([id, user]) => ({ id, ...user, bandScore: user.bandPoints[selectedBand] || 0 })).sort((a, b) => b.bandScore - a.bandScore);
  const bandLeaders = bands.map((band) => ({
    ...band,
    score: Object.values(state.users).reduce((sum, user) => sum + (user.bandPoints?.[band.id] || 0), 0)
  })).sort((a, b) => b.score - a.score);
  return `
    <main class="main">
      <div class="section-head"><div><h2>积分排行榜</h2><p>分为当前团体内个人榜，以及全站团体累计积分榜。</p></div></div>
      <div class="tabs"><button class="pill-button ${leaderboardMode === "members" ? "active" : ""}" data-leaderboard-mode="members">${currentBand().name} 个人榜</button><button class="pill-button ${leaderboardMode === "bands" ? "active" : ""}" data-leaderboard-mode="bands">全站团体榜</button></div>
      <div class="leader">${leaderboardMode === "members" ? memberLeaders.map((user, index) => `<div class="leader-row top-${index + 1}"><span class="rank">${index + 1}</span><div><b>${user.name}</b><small class="empty">${currentBand().name} · 已学 ${user.learned.length} · 错词 ${user.wrong.length}</small></div><strong>${user.bandScore} 分</strong></div>`).join("") : bandLeaders.map((band, index) => `<div class="leader-row band-leader" style="--band:${band.color}"><span class="rank">${index + 1}</span><div><b>${bandDisplayName(band)}</b></div><strong>${band.score} 分</strong></div>`).join("")}</div>
    </main>
  `;
}

function bandDisplayName(band) {
  const full = {
    bts: "Bangtan Sonyeondan",
    txt: "TOMORROW X TOGETHER",
    skz: "Stray Kids",
    suju: "SUPER JUNIOR",
    pm: "2PM",
    snsd: "Girls' Generation / Sonyeo Sidae",
    fx: "f(x)",
    zb1: "ZEROBASEONE"
  }[band.id];
  if (!full || full === band.name) return band.name;
  return `${band.name} <small class="band-full">(${full})</small>`;
}

function bindEvents() {
  document.querySelectorAll("[data-route]").forEach((button) => button.addEventListener("click", () => { route = button.dataset.route; render(); }));
  document.querySelector("[data-logout]")?.addEventListener("click", () => { state.loggedIn = false; saveState(); route = "login"; render(); });
  document.querySelector("#loginForm")?.addEventListener("submit", (event) => { event.preventDefault(); loginUser(document.querySelector("#loginUserId").value); });
  document.querySelector("#registerForm")?.addEventListener("submit", (event) => { event.preventDefault(); createUser(document.querySelector("#newUserName").value, document.querySelector("#registerBand").value); });
  document.querySelectorAll("[data-choose-band]").forEach((button) => button.addEventListener("click", () => chooseBand(button.dataset.chooseBand)));
  document.querySelectorAll("[data-company-filter]").forEach((button) => button.addEventListener("click", () => { companyFilter = button.dataset.companyFilter; render(); }));
  document.querySelectorAll("[data-open-video]").forEach((button) => button.addEventListener("click", () => { selectedVideo = button.dataset.openVideo; route = "learn"; render(); }));
  document.querySelectorAll("[data-video-category]").forEach((button) => button.addEventListener("click", () => { videoCategory = button.dataset.videoCategory; render(); }));
  document.querySelector("#videoSelect")?.addEventListener("change", (event) => { selectedVideo = event.target.value; render(); });
  document.querySelectorAll("[data-rank-mode]").forEach((button) => button.addEventListener("click", () => { rankMode = button.dataset.rankMode; render(); }));
  document.querySelectorAll("[data-leaderboard-mode]").forEach((button) => button.addEventListener("click", () => { leaderboardMode = button.dataset.leaderboardMode; render(); }));
  document.querySelectorAll("[data-play-queue]").forEach((button) => button.addEventListener("click", () => playQueue(button.dataset.playQueue)));
  document.querySelector("[data-stop-queue]")?.addEventListener("click", stopQueue);
  document.querySelectorAll("[data-speak]").forEach((button) => button.addEventListener("click", () => speakKorean(button.dataset.speak)));
  document.querySelectorAll("[data-official-speak]").forEach((button) => button.addEventListener("click", () => playOfficialAudio(button.dataset.officialSpeak)));
  document.querySelectorAll("[data-group-audio]").forEach((button) => button.addEventListener("click", () => playGroupAudio(button.dataset.groupAudio)));
  document.querySelectorAll("[data-pronounce]").forEach((button) => button.addEventListener("click", () => listenPronunciation(button.dataset.pronounce)));
  document.querySelectorAll("[data-remove-wrong]").forEach((button) => button.addEventListener("click", () => removeWrong(button.dataset.removeWrong)));
  document.querySelectorAll("[data-start-quiz]").forEach((button) => button.addEventListener("click", () => startQuiz(button.dataset.startQuiz)));
  document.querySelectorAll("[data-answer]").forEach((button) => button.addEventListener("click", () => answerQuiz(button.dataset.answer)));
  document.querySelectorAll("[data-jamo-mode]").forEach((button) => button.addEventListener("click", () => { jamoMode = button.dataset.jamoMode; render(); }));
}

render();
