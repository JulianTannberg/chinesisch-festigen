// Chinesisch festigen – zentrale Kapiteldaten
// vocab = aktive Vokabeln für Hören + Schreiben
// understandingVocab = Zusatzvokabeln zum Verstehen; erscheinen nur in Hören
// storyDialog = Dialogzeilen aus der Geschichte
// studentDialog = Schülerdialog für Sprechen / KI-Prompt

window.CF_TOPICS = [
  {
    "id": "01",
    "title": "Ankunft",
    "short": "Bahnhof Beijing Süd, Anrempeln, Vorstellen, WeChat-Tausch",
    "accent": "#03172B",
    "textColor": "#FFFFFF",
    "vocab": [
      {
        "zh": "我",
        "pinyin": "wǒ",
        "de": "ich"
      },
      {
        "zh": "你",
        "pinyin": "nǐ",
        "de": "du"
      },
      {
        "zh": "是",
        "pinyin": "shì",
        "de": "sein",
        "hint": "sh → sch"
      },
      {
        "zh": "不",
        "pinyin": "bù",
        "de": "nicht (Verneinung)"
      },
      {
        "zh": "也",
        "pinyin": "yě",
        "de": "auch"
      },
      {
        "zh": "从",
        "pinyin": "cóng",
        "de": "von, aus",
        "hint": "c → ts"
      },
      {
        "zh": "吗",
        "pinyin": "ma",
        "de": "Fragepartikel"
      },
      {
        "zh": "你呢？",
        "pinyin": "nǐ ne",
        "de": "Und du?",
        "hint": "kurze Rückfrage",
        "writeZh": "你呢？",
        "writePinyin": "nǐ ne",
        "writeDe": "und du?",
        "deAnswers": ["und du", "und du?", "du?", "was ist mit dir?", "wie ist es mit dir?"]
      },
      {
        "zh": "叫",
        "pinyin": "jiào",
        "de": "heißen",
        "hint": "j → dsch"
      },
      {
        "zh": "看",
        "pinyin": "kàn",
        "de": "schauen, sehen"
      },
      {
        "zh": "来",
        "pinyin": "lái",
        "de": "kommen"
      },
      {
        "zh": "好",
        "pinyin": "hǎo",
        "de": "gut, ok"
      },
      {
        "zh": "手机",
        "pinyin": "shǒujī",
        "de": "Handy",
        "hint": "sh → sch / j → dsch"
      },
      {
        "zh": "人",
        "pinyin": "rén",
        "de": "Mensch, Person",
        "hint": "r → r-sch"
      },
      {
        "zh": "名字",
        "pinyin": "míngzi",
        "de": "Name",
        "hint": "z → ds"
      },
      {
        "zh": "什么",
        "pinyin": "shénme",
        "de": "was, welche/r/s",
        "hint": "sh → sch"
      },
      {
        "zh": "哪",
        "pinyin": "nǎ",
        "de": "welche/r/s (Frage)"
      },
      {
        "zh": "国",
        "pinyin": "guó",
        "de": "Land"
      },
      {
        "zh": "德国",
        "pinyin": "Déguó",
        "de": "Deutschland"
      },
      {
        "zh": "德国人",
        "pinyin": "Déguó rén",
        "de": "Deutsche/r",
        "hint": "Land + 人"
      },
      {
        "zh": "北京",
        "pinyin": "Běijīng",
        "de": "Beijing (Peking)",
        "hint": "j → dsch"
      },
      {
        "zh": "北京人",
        "pinyin": "Běijīng rén",
        "de": "Beijinger/-in",
        "hint": "r → r-sch"
      },
      {
        "zh": "上海",
        "pinyin": "Shànghǎi",
        "de": "Shanghai",
        "hint": "sh → sch"
      },
      {
        "zh": "你好",
        "pinyin": "nǐ hǎo",
        "de": "Hallo"
      },
      {
        "zh": "对不起",
        "pinyin": "duìbuqǐ",
        "de": "Entschuldigung",
        "hint": "q → tsch"
      },
      {
        "zh": "没关系",
        "pinyin": "méi guānxi",
        "de": "macht nichts",
        "hint": "x → ch"
      },
      {
        "zh": "谢谢",
        "pinyin": "xièxie",
        "de": "danke",
        "hint": "x → ch"
      },
      {
        "zh": "再见",
        "pinyin": "zàijiàn",
        "de": "Tschüss, Auf Wiedersehen",
        "hint": "z → ds / j → dsch"
      }
    ],
    "understandingVocab": [
      {
        "zh": "苏然",
        "pinyin": "Sū Rán",
        "de": "Eigenname (m.)",
        "hint": "r → r-sch"
      },
      {
        "zh": "林月",
        "pinyin": "Lín Yuè",
        "de": "Eigenname (w.)"
      },
      {
        "zh": "嗨",
        "pinyin": "hāi",
        "de": "Hi"
      },
      {
        "zh": "啊",
        "pinyin": "ā",
        "de": "Ah!"
      },
      {
        "zh": "没事",
        "pinyin": "méi shì",
        "de": "alles in Ordnung",
        "hint": "sh → sch"
      },
      {
        "zh": "是的",
        "pinyin": "shì de",
        "de": "ja, genau",
        "hint": "sh → sch"
      },
      {
        "zh": "那",
        "pinyin": "nà",
        "de": "also dann"
      },
      {
        "zh": "吧",
        "pinyin": "ba",
        "de": "Modalpartikel (Vorschlag)"
      },
      {
        "zh": "了",
        "pinyin": "le",
        "de": "Partikel (Handlung abgeschlossen)",
        "hint": "nur verstehen"
      },
      {
        "zh": "欢迎",
        "pinyin": "huānyíng",
        "de": "willkommen heißen"
      },
      {
        "zh": "我们",
        "pinyin": "wǒmen",
        "de": "wir",
        "hint": "我 + 们"
      },
      {
        "zh": "加",
        "pinyin": "jiā",
        "de": "hinzufügen",
        "hint": "j → dsch"
      },
      {
        "zh": "微信",
        "pinyin": "Wēixìn",
        "de": "WeChat",
        "hint": "x → ch"
      },
      {
        "zh": "地铁",
        "pinyin": "dìtiě",
        "de": "U-Bahn"
      },
      {
        "zh": "哪里",
        "pinyin": "nǎlǐ",
        "de": "wo"
      },
      {
        "zh": "那儿",
        "pinyin": "nàr",
        "de": "dort",
        "hint": "Beijing-Form"
      },
      {
        "zh": "请问",
        "pinyin": "qǐngwèn",
        "de": "Entschuldigung / darf ich fragen",
        "hint": "q → tsch"
      },
      {
        "zh": "在",
        "pinyin": "zài",
        "de": "sein / sich befinden in/an/bei",
        "hint": "z → ds"
      }
    ],
    "storyDialog": [
      {
        "speaker": "苏然",
        "zh": "啊！对不起！",
        "pinyin": "Ā! Duìbuqǐ!",
        "de": "Ah! Entschuldigung!"
      },
      {
        "speaker": "林月",
        "zh": "没关系。",
        "pinyin": "Méi guānxi.",
        "de": "Macht nichts."
      },
      {
        "speaker": "林月",
        "zh": "你没事吧？",
        "pinyin": "Nǐ méi shì ba?",
        "de": "Alles in Ordnung mit dir?"
      },
      {
        "speaker": "苏然",
        "zh": "没事，谢谢。",
        "pinyin": "Méi shì, xièxie.",
        "de": "Alles gut, danke."
      },
      {
        "speaker": "苏然",
        "zh": "我看手机了。",
        "pinyin": "Wǒ kàn shǒujī le.",
        "de": "Ich habe auf mein Handy geschaut."
      },
      {
        "speaker": "林月",
        "zh": "我也看手机了。",
        "pinyin": "Wǒ yě kàn shǒujī le.",
        "de": "Ich habe auch aufs Handy geschaut."
      },
      {
        "speaker": "苏然",
        "zh": "你好，我叫苏然。",
        "pinyin": "Nǐ hǎo, wǒ jiào Sū Rán.",
        "de": "Hallo, ich heiße Sū Rán."
      },
      {
        "speaker": "苏然",
        "zh": "你叫什么名字？",
        "pinyin": "Nǐ jiào shénme míngzi?",
        "de": "Wie heißt du?"
      },
      {
        "speaker": "林月",
        "zh": "嗨，我叫林月。",
        "pinyin": "Hāi, wǒ jiào Lín Yuè.",
        "de": "Hi, ich heiße Lín Yuè."
      },
      {
        "speaker": "苏然",
        "zh": "你是北京人吗？",
        "pinyin": "Nǐ shì Běijīng rén ma?",
        "de": "Bist du aus Beijing?"
      },
      {
        "speaker": "林月",
        "zh": "是的，我是北京人。",
        "pinyin": "Shì de, wǒ shì Běijīng rén.",
        "de": "Ja, ich bin aus Beijing."
      },
      {
        "speaker": "林月",
        "zh": "你呢？",
        "pinyin": "Nǐ ne?",
        "de": "Und du?"
      },
      {
        "speaker": "苏然",
        "zh": "我不是北京人。",
        "pinyin": "Wǒ bú shì Běijīng rén.",
        "de": "Ich bin nicht aus Beijing."
      },
      {
        "speaker": "苏然",
        "zh": "我从上海来。",
        "pinyin": "Wǒ cóng Shànghǎi lái.",
        "de": "Ich komme aus Shanghai."
      },
      {
        "speaker": "林月",
        "zh": "欢迎来北京。",
        "pinyin": "Huānyíng lái Běijīng.",
        "de": "Willkommen in Beijing."
      },
      {
        "speaker": "苏然",
        "zh": "请问，地铁在哪里？",
        "pinyin": "Qǐngwèn, dìtiě zài nǎlǐ?",
        "de": "Entschuldigung, wo ist die U-Bahn?"
      },
      {
        "speaker": "林月",
        "zh": "地铁在那儿。",
        "pinyin": "Dìtiě zài nàr.",
        "de": "Die U-Bahn ist da drüben."
      },
      {
        "speaker": "林月",
        "zh": "我们加微信吧？",
        "pinyin": "Wǒmen jiā Wēixìn ba?",
        "de": "Wollen wir uns auf WeChat hinzufügen?"
      },
      {
        "speaker": "苏然",
        "zh": "好，谢谢你。",
        "pinyin": "Hǎo, xièxie nǐ.",
        "de": "Okay, danke dir."
      },
      {
        "speaker": "林月",
        "zh": "那，再见！",
        "pinyin": "Nà, zàijiàn!",
        "de": "Dann, tschüss!"
      },
      {
        "speaker": "苏然",
        "zh": "再见！",
        "pinyin": "Zàijiàn!",
        "de": "Tschüss!"
      }
    ],
    "studentDialog": [
      {
        "speaker": "A",
        "zh": "你好，我叫……。你叫什么名字？",
        "pinyin": "Nǐ hǎo, wǒ jiào… Nǐ jiào shénme míngzi?",
        "de": "Hallo, ich heiße … Wie heißt du?"
      },
      {
        "speaker": "B",
        "zh": "你好，我叫……。",
        "pinyin": "Nǐ hǎo, wǒ jiào…",
        "de": "Hallo, ich heiße …"
      },
      {
        "speaker": "A",
        "zh": "你是德国人吗？",
        "pinyin": "Nǐ shì Déguó rén ma?",
        "de": "Bist du Deutsche/r? / Kommst du aus Deutschland?"
      },
      {
        "speaker": "B – Antwort 1",
        "zh": "我也是德国人。",
        "pinyin": "Wǒ yě shì Déguó rén.",
        "de": "Ich bin auch Deutsche/r."
      },
      {
        "speaker": "B – Antwort 2",
        "zh": "不是，我不是德国人。",
        "pinyin": "Bú shì, wǒ bú shì Déguó rén.",
        "de": "Nein, ich bin nicht Deutsche/r."
      },
      {
        "speaker": "A",
        "zh": "你是哪国人？",
        "pinyin": "Nǐ shì nǎ guó rén?",
        "de": "Aus welchem Land bist du?"
      },
      {
        "speaker": "B",
        "zh": "我是……人。你呢？",
        "pinyin": "Wǒ shì … rén. Nǐ ne?",
        "de": "Ich bin … Und du?"
      },
      {
        "speaker": "A",
        "zh": "我是……人。",
        "pinyin": "Wǒ shì … rén.",
        "de": "Ich bin …"
      }
    ],
    "storyDialogTitle": "Ankunft am Bahnhof Beijing Süd",
    "studentDialogTitle": "Begrüßung, Name und Herkunft",
    "studentDialogNote": "Die Lernenden begrüßen sich, stellen sich vor und fragen nach der Nationalität. Bei Nein wird nach dem richtigen Land gefragt.",
    "sentencePuzzles": [
      {
        "de": "Ich heiße Su Ran.",
        "zh": "我叫苏然。",
        "pinyin": "Wǒ jiào Sū Rán.",
        "tokens": ["我", "叫", "苏然", "。"]
      },
      {
        "de": "Wie heißt du?",
        "zh": "你叫什么名字？",
        "pinyin": "Nǐ jiào shénme míngzi?",
        "tokens": ["你", "叫", "什么", "名字", "？"]
      },
      {
        "de": "Bist du aus Beijing?",
        "zh": "你是北京人吗？",
        "pinyin": "Nǐ shì Běijīng rén ma?",
        "tokens": ["你", "是", "北京人", "吗", "？"]
      },
      {
        "de": "Ich komme aus Shanghai.",
        "zh": "我从上海来。",
        "pinyin": "Wǒ cóng Shànghǎi lái.",
        "tokens": ["我", "从", "上海", "来", "。"]
      },
      {
        "de": "Ich bin Deutsche/r.",
        "zh": "我是德国人。",
        "pinyin": "Wǒ shì Déguó rén.",
        "tokens": ["我", "是", "德国人", "。"]
      },
      {
        "de": "Ich bin nicht aus Beijing.",
        "zh": "我不是北京人。",
        "pinyin": "Wǒ bú shì Běijīng rén.",
        "tokens": ["我", "不", "是", "北京人", "。"]
      }
    ],
    "gapExercises": [
      {
        "prompt": "你好，我 ___ 苏然。",
        "answer": "叫",
        "choices": ["叫", "是", "从", "吗"],
        "solution": "你好，我叫苏然。",
        "pinyin": "Nǐ hǎo, wǒ jiào Sū Rán.",
        "de": "Hallo, ich heiße Su Ran."
      },
      {
        "prompt": "你是北京人 ___ ？",
        "answer": "吗",
        "choices": ["吗", "呢", "叫", "来"],
        "solution": "你是北京人吗？",
        "pinyin": "Nǐ shì Běijīng rén ma?",
        "de": "Bist du aus Beijing?"
      },
      {
        "prompt": "我 ___ 上海来。",
        "answer": "从",
        "choices": ["从", "是", "叫", "看"],
        "solution": "我从上海来。",
        "pinyin": "Wǒ cóng Shànghǎi lái.",
        "de": "Ich komme aus Shanghai."
      },
      {
        "prompt": "我从上海 ___ 。",
        "answer": "来",
        "choices": ["来", "看", "好", "叫"],
        "solution": "我从上海来。",
        "pinyin": "Wǒ cóng Shànghǎi lái.",
        "de": "Ich komme aus Shanghai."
      },
      {
        "prompt": "我是德国人。 ___",
        "answer": "你呢？",
        "choices": ["你呢？", "是吗？", "什么？", "不。"],
        "solution": "我是德国人。你呢？",
        "pinyin": "Wǒ shì Déguó rén. Nǐ ne?",
        "de": "Ich bin Deutsche/r. Und du?"
      },
      {
        "prompt": "我 ___ 德国人。",
        "answer": "是",
        "choices": ["是", "不", "从", "吗"],
        "solution": "我是德国人。",
        "pinyin": "Wǒ shì Déguó rén.",
        "de": "Ich bin Deutsche/r."
      }
    ]
  },
  {
    "id": "02",
    "title": "Zum Hotel",
    "short": "U-Bahn-Fahrt nach Wudaokou, Umsteigen, Ausgang finden",
    "accent": "#1E2A34",
    "textColor": "#FFFFFF",
    "vocab": [],
    "understandingVocab": [],
    "storyDialog": [],
    "studentDialog": []
  },
  {
    "id": "03",
    "title": "Im Hotel",
    "short": "Check-in, WLAN-Problem, Nachricht an die Eltern",
    "accent": "#24384A",
    "textColor": "#FFFFFF",
    "vocab": [],
    "understandingVocab": [],
    "storyDialog": [],
    "studentDialog": []
  },
  {
    "id": "04",
    "title": "Im Café",
    "short": "Bestellen, Zählwörter, 很 + Adjektiv, Toilettenvokabular",
    "accent": "#31485E",
    "textColor": "#FFFFFF",
    "vocab": [],
    "understandingVocab": [],
    "storyDialog": [],
    "studentDialog": []
  },
  {
    "id": "05",
    "title": "Souvenirs",
    "short": "Zahlen, Preise, Farben, Bezahlen — Rucksack vergessen",
    "accent": "#465D73",
    "textColor": "#FFFFFF",
    "vocab": [],
    "understandingVocab": [],
    "storyDialog": [],
    "studentDialog": []
  },
  {
    "id": "06",
    "title": "Verschwunden",
    "short": "Verlorener Rucksack, Lín Yuè hilft, 能, 请客",
    "accent": "#5B7086",
    "textColor": "#FFFFFF",
    "vocab": [],
    "understandingVocab": [],
    "storyDialog": [],
    "studentDialog": []
  },
  {
    "id": "07",
    "title": "Peking-Ente",
    "short": "Restaurant, Bestellen, Tischetikette, 干杯, Bezahlen",
    "accent": "#F6E3E5",
    "textColor": "#0B1B2E",
    "vocab": [],
    "understandingVocab": [],
    "storyDialog": [],
    "studentDialog": []
  },
  {
    "id": "08",
    "title": "Familie",
    "short": "Familie und Studium, Berufe, Alter",
    "accent": "#D9A6AF",
    "textColor": "#0B1B2E",
    "vocab": [],
    "understandingVocab": [],
    "storyDialog": [],
    "studentDialog": []
  },
  {
    "id": "09",
    "title": "Im Hutong",
    "short": "Hutongs, 四合院, Wohnen, Möbel, Positionen",
    "accent": "#F1D8CC",
    "textColor": "#0B1B2E",
    "vocab": [],
    "understandingVocab": [],
    "storyDialog": [],
    "studentDialog": []
  },
  {
    "id": "10",
    "title": "Wetter und Pläne",
    "short": "Wetter, Jahreszeiten, Mauer-Tag planen, Zukunftspläne",
    "accent": "#E7CEBA",
    "textColor": "#0B1B2E",
    "vocab": [],
    "understandingVocab": [],
    "storyDialog": [],
    "studentDialog": []
  },
  {
    "id": "11",
    "title": "Die Mauer",
    "short": "Bus nach Mùtiányù, Tickets, Eindrücke, Vergleiche",
    "accent": "#D6BCA2",
    "textColor": "#0B1B2E",
    "vocab": [],
    "understandingVocab": [],
    "storyDialog": [],
    "studentDialog": []
  },
  {
    "id": "12",
    "title": "Im Park",
    "short": "Hobbys, Pfützen-Vorfall, 能/会/可以 zusammen",
    "accent": "#9B8266",
    "textColor": "#FFFFFF",
    "vocab": [],
    "understandingVocab": [],
    "storyDialog": [],
    "studentDialog": []
  },
  {
    "id": "13",
    "title": "Erkältet",
    "short": "Apotheke, Körperteile, Symptome, 中药/西药",
    "accent": "#CD984B",
    "textColor": "#0B1B2E",
    "vocab": [],
    "understandingVocab": [],
    "storyDialog": [],
    "studentDialog": []
  },
  {
    "id": "14",
    "title": "In der Stadt",
    "short": "Verbotene Stadt, Wegbeschreibung, Verkehrsmittel",
    "accent": "#EBBC6A",
    "textColor": "#0B1B2E",
    "vocab": [],
    "understandingVocab": [],
    "storyDialog": [],
    "studentDialog": []
  },
  {
    "id": "15",
    "title": "Bis bald",
    "short": "Sommerpalast, Rückblick, Vergleiche, Abschied",
    "accent": "#F6D083",
    "textColor": "#0B1B2E",
    "vocab": [],
    "understandingVocab": [],
    "storyDialog": [],
    "studentDialog": []
  }
];

window.CF_APP = {
  title: "Chinesisch festigen",
  storagePrefix: "cf_",
  speaking: {
    defaultRoleA: "ChatGPT",
    defaultRoleB: "Ich"
  }
};
