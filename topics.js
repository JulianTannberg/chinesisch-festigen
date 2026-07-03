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
        "deAnswers": [
          "und du",
          "und du?",
          "du?",
          "was ist mit dir?",
          "wie ist es mit dir?"
        ]
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
        "tokens": [
          "我",
          "叫",
          "苏然",
          "。"
        ]
      },
      {
        "de": "Wie heißt du?",
        "zh": "你叫什么名字？",
        "pinyin": "Nǐ jiào shénme míngzi?",
        "tokens": [
          "你",
          "叫",
          "什么",
          "名字",
          "？"
        ]
      },
      {
        "de": "Bist du aus Beijing?",
        "zh": "你是北京人吗？",
        "pinyin": "Nǐ shì Běijīng rén ma?",
        "tokens": [
          "你",
          "是",
          "北京人",
          "吗",
          "？"
        ]
      },
      {
        "de": "Ich komme aus Shanghai.",
        "zh": "我从上海来。",
        "pinyin": "Wǒ cóng Shànghǎi lái.",
        "tokens": [
          "我",
          "从",
          "上海",
          "来",
          "。"
        ]
      },
      {
        "de": "Ich bin Deutsche/r.",
        "zh": "我是德国人。",
        "pinyin": "Wǒ shì Déguó rén.",
        "tokens": [
          "我",
          "是",
          "德国人",
          "。"
        ]
      },
      {
        "de": "Ich bin nicht aus Beijing.",
        "zh": "我不是北京人。",
        "pinyin": "Wǒ bú shì Běijīng rén.",
        "tokens": [
          "我",
          "不",
          "是",
          "北京人",
          "。"
        ]
      }
    ],
    "gapExercises": [
      {
        "prompt": "你好，我 ___ 苏然。",
        "answer": "叫",
        "choices": [
          "叫",
          "是",
          "从",
          "吗"
        ],
        "solution": "你好，我叫苏然。",
        "pinyin": "Nǐ hǎo, wǒ jiào Sū Rán.",
        "de": "Hallo, ich heiße Su Ran."
      },
      {
        "prompt": "你是北京人 ___ ？",
        "answer": "吗",
        "choices": [
          "吗",
          "呢",
          "叫",
          "来"
        ],
        "solution": "你是北京人吗？",
        "pinyin": "Nǐ shì Běijīng rén ma?",
        "de": "Bist du aus Beijing?"
      },
      {
        "prompt": "我 ___ 上海来。",
        "answer": "从",
        "choices": [
          "从",
          "是",
          "叫",
          "看"
        ],
        "solution": "我从上海来。",
        "pinyin": "Wǒ cóng Shànghǎi lái.",
        "de": "Ich komme aus Shanghai."
      },
      {
        "prompt": "我从上海 ___ 。",
        "answer": "来",
        "choices": [
          "来",
          "看",
          "好",
          "叫"
        ],
        "solution": "我从上海来。",
        "pinyin": "Wǒ cóng Shànghǎi lái.",
        "de": "Ich komme aus Shanghai."
      },
      {
        "prompt": "我是德国人。 ___",
        "answer": "你呢？",
        "choices": [
          "你呢？",
          "是吗？",
          "什么？",
          "不。"
        ],
        "solution": "我是德国人。你呢？",
        "pinyin": "Wǒ shì Déguó rén. Nǐ ne?",
        "de": "Ich bin Deutsche/r. Und du?"
      },
      {
        "prompt": "我 ___ 德国人。",
        "answer": "是",
        "choices": [
          "是",
          "不",
          "从",
          "吗"
        ],
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
    "vocab": [
      {
        "zh": "请问",
        "pinyin": "qǐngwèn",
        "de": "Entschuldigung (vor einer Frage)",
        "hint": "q → tsch"
      },
      {
        "zh": "地铁",
        "pinyin": "dìtiě",
        "de": "U-Bahn"
      },
      {
        "zh": "在",
        "pinyin": "zài",
        "de": "sich befinden in/an/bei",
        "hint": "z → ds"
      },
      {
        "zh": "哪里",
        "pinyin": "nǎlǐ",
        "de": "wo",
        "hint": "Beijing: 哪儿"
      },
      {
        "zh": "那里",
        "pinyin": "nàlǐ",
        "de": "dort",
        "hint": "Beijing: 那儿"
      },
      {
        "zh": "这里",
        "pinyin": "zhèlǐ",
        "de": "hier",
        "hint": "Beijing: 这儿"
      },
      {
        "zh": "出口",
        "pinyin": "chūkǒu",
        "de": "Ausgang",
        "hint": "ch → tsch"
      },
      {
        "zh": "哪个",
        "pinyin": "nǎge",
        "de": "welche/r/s (vor Substantiv)"
      },
      {
        "zh": "去",
        "pinyin": "qù",
        "de": "gehen, fahren (zu/nach)",
        "hint": "q → tsch"
      },
      {
        "zh": "换车",
        "pinyin": "huàn chē",
        "de": "umsteigen",
        "hint": "ch → tsch"
      },
      {
        "zh": "对",
        "pinyin": "duì",
        "de": "richtig, ja"
      },
      {
        "zh": "不客气",
        "pinyin": "bú kèqi",
        "de": "gern geschehen",
        "hint": "q → tsch"
      }
    ],
    "understandingVocab": [
      {
        "zh": "大学",
        "pinyin": "dàxué",
        "de": "Universität"
      },
      {
        "zh": "男人",
        "pinyin": "nánrén",
        "de": "Mann",
        "hint": "r → r-sch"
      },
      {
        "zh": "五道口",
        "pinyin": "Wǔdàokǒu",
        "de": "Wǔdàokǒu (Stadtteil in Beijing)"
      },
      {
        "zh": "清华大学",
        "pinyin": "Qīnghuá Dàxué",
        "de": "Tsinghua-Universität (Eigenname)"
      },
      {
        "zh": "站",
        "pinyin": "zhàn",
        "de": "Station, Haltestelle",
        "hint": "zh → dsch"
      }
    ],
    "storyDialog": [
      {
        "speaker": "苏然",
        "zh": "请问，地铁在哪里？",
        "pinyin": "Qǐngwèn, dìtiě zài nǎlǐ?",
        "de": "Entschuldigung, wo ist die U-Bahn?"
      },
      {
        "speaker": "男人",
        "zh": "地铁在那儿。",
        "pinyin": "Dìtiě zài nàr.",
        "de": "Die U-Bahn ist da drüben."
      },
      {
        "speaker": "苏然",
        "zh": "请问，去五道口在哪里换车？",
        "pinyin": "Qǐngwèn, qù Wǔdàokǒu zài nǎlǐ huàn chē?",
        "de": "Entschuldigung, wo steigt man Richtung Wǔdàokǒu um?"
      },
      {
        "speaker": "男人",
        "zh": "看，在那儿。",
        "pinyin": "Kàn, zài nàr.",
        "de": "Schau, dort."
      },
      {
        "speaker": "男人",
        "zh": "你在这一站换车。",
        "pinyin": "Nǐ zài zhè yí zhàn huàn chē.",
        "de": "Du steigst an dieser Station um."
      },
      {
        "speaker": "苏然",
        "zh": "这里？",
        "pinyin": "Zhèlǐ?",
        "de": "Hier?"
      },
      {
        "speaker": "男人",
        "zh": "对，这儿。",
        "pinyin": "Duì, zhèr.",
        "de": "Ja, hier."
      },
      {
        "speaker": "苏然",
        "zh": "谢谢。",
        "pinyin": "Xièxie.",
        "de": "Danke."
      },
      {
        "speaker": "男人",
        "zh": "不客气。",
        "pinyin": "Bú kèqi.",
        "de": "Gern geschehen."
      },
      {
        "speaker": "苏然",
        "zh": "你好，请问，去清华大学是哪个出口？",
        "pinyin": "Nǐ hǎo, qǐngwèn, qù Qīnghuá Dàxué shì nǎge chūkǒu?",
        "de": "Hallo, entschuldigen Sie, welcher Ausgang ist zur Tsinghua-Universität?"
      },
      {
        "speaker": "男人",
        "zh": "是 B 出口。",
        "pinyin": "Shì B chūkǒu.",
        "de": "Es ist Ausgang B."
      },
      {
        "speaker": "苏然",
        "zh": "谢谢。",
        "pinyin": "Xièxie.",
        "de": "Danke."
      },
      {
        "speaker": "男人",
        "zh": "不客气。",
        "pinyin": "Bú kèqi.",
        "de": "Gern geschehen."
      }
    ],
    "studentDialog": [
      {
        "speaker": "A",
        "zh": "你好，请问，______ 在哪里？",
        "pinyin": "Nǐ hǎo, qǐngwèn, … zài nǎlǐ?",
        "de": "Hallo, entschuldige, wo ist …?"
      },
      {
        "speaker": "B",
        "zh": "______ 在那里。",
        "pinyin": "… zài nàlǐ.",
        "de": "… ist dort."
      },
      {
        "speaker": "A",
        "zh": "谢谢。",
        "pinyin": "Xièxie.",
        "de": "Danke."
      },
      {
        "speaker": "B",
        "zh": "不客气。",
        "pinyin": "Bú kèqi.",
        "de": "Gern geschehen."
      },
      {
        "speaker": "A",
        "zh": "请问，去 ______ 在哪里换车？",
        "pinyin": "Qǐngwèn, qù … zài nǎlǐ huàn chē?",
        "de": "Entschuldige, wo steigt man Richtung … um?"
      },
      {
        "speaker": "B",
        "zh": "你在这里换车。",
        "pinyin": "Nǐ zài zhèlǐ huàn chē.",
        "de": "Du steigst hier um."
      },
      {
        "speaker": "A",
        "zh": "这里？",
        "pinyin": "Zhèlǐ?",
        "de": "Hier?"
      },
      {
        "speaker": "B",
        "zh": "对，这里。",
        "pinyin": "Duì, zhèlǐ.",
        "de": "Ja, hier."
      },
      {
        "speaker": "A",
        "zh": "请问，去 ______ 是哪个出口？",
        "pinyin": "Qǐngwèn, qù … shì nǎge chūkǒu?",
        "de": "Entschuldige, welcher Ausgang ist zu …?"
      },
      {
        "speaker": "B",
        "zh": "是 ___ 出口。",
        "pinyin": "Shì … chūkǒu.",
        "de": "Es ist Ausgang …."
      }
    ],
    "storyDialogTitle": "Mit der U-Bahn nach Wǔdàokǒu",
    "studentDialogTitle": "Den Weg finden",
    "studentDialogNote": "Die Lernenden üben drei kleine Situationen aus der Geschichte: nach einem Ort fragen, nach dem Umsteigen fragen und nach dem richtigen Ausgang fragen. Orte und Stationen können frei eingesetzt werden (z. B. 地铁, 大学, 五道口, 清华大学).",
    "sentencePuzzles": [
      {
        "de": "Wo ist die U-Bahn?",
        "zh": "地铁在哪里？",
        "pinyin": "Dìtiě zài nǎlǐ?",
        "tokens": [
          "地铁",
          "在",
          "哪里",
          "？"
        ]
      },
      {
        "de": "Du steigst hier um.",
        "zh": "你在这里换车。",
        "pinyin": "Nǐ zài zhèlǐ huàn chē.",
        "tokens": [
          "你",
          "在",
          "这里",
          "换车",
          "。"
        ]
      },
      {
        "de": "Ich fahre nach Wǔdàokǒu.",
        "zh": "我去五道口。",
        "pinyin": "Wǒ qù Wǔdàokǒu.",
        "tokens": [
          "我",
          "去",
          "五道口",
          "。"
        ]
      },
      {
        "de": "Welcher Ausgang ist es?",
        "zh": "是哪个出口？",
        "pinyin": "Shì nǎge chūkǒu?",
        "tokens": [
          "是",
          "哪个",
          "出口",
          "？"
        ]
      },
      {
        "de": "Entschuldigung, wo ist der Ausgang?",
        "zh": "请问，出口在哪里？",
        "pinyin": "Qǐngwèn, chūkǒu zài nǎlǐ?",
        "tokens": [
          "请问",
          "，",
          "出口",
          "在",
          "哪里",
          "？"
        ]
      }
    ],
    "gapExercises": [
      {
        "prompt": "你 ___ 五道口。",
        "answer": "去",
        "choices": [
          "去",
          "在",
          "换车",
          "哪里"
        ],
        "solution": "你去五道口。",
        "pinyin": "Nǐ qù Wǔdàokǒu.",
        "de": "Du fährst nach Wǔdàokǒu."
      },
      {
        "prompt": "你在这里 ___ 。",
        "answer": "换车",
        "choices": [
          "换车",
          "出口",
          "去",
          "对"
        ],
        "solution": "你在这里换车。",
        "pinyin": "Nǐ zài zhèlǐ huàn chē.",
        "de": "Du steigst hier um."
      },
      {
        "prompt": "去清华大学是 ___ 出口？",
        "answer": "哪个",
        "choices": [
          "哪个",
          "哪里",
          "这里",
          "在"
        ],
        "solution": "去清华大学是哪个出口？",
        "pinyin": "Qù Qīnghuá Dàxué shì nǎge chūkǒu?",
        "de": "Welcher Ausgang ist zur Tsinghua-Universität?"
      },
      {
        "prompt": "请问，出口 ___ 哪里？",
        "answer": "在",
        "choices": [
          "在",
          "去",
          "对",
          "换车"
        ],
        "solution": "请问，出口在哪里？",
        "pinyin": "Qǐngwèn, chūkǒu zài nǎlǐ?",
        "de": "Entschuldigung, wo ist der Ausgang?"
      },
      {
        "prompt": "请问，___ 在哪里？",
        "answer": "地铁",
        "choices": [
          "地铁",
          "对",
          "去",
          "换车"
        ],
        "solution": "请问，地铁在哪里？",
        "pinyin": "Qǐngwèn, dìtiě zài nǎlǐ?",
        "de": "Entschuldigung, wo ist die U-Bahn?"
      }
    ]
  },
  {
    "id": "03",
    "title": "Im Hotel",
    "short": "Check-in, WLAN-Problem, Nachricht an die Eltern",
    "accent": "#24384A",
    "textColor": "#FFFFFF",
    "vocab": [
      {
        "zh": "房间",
        "pinyin": "fángjiān",
        "de": "Zimmer",
        "hint": "j → dsch"
      },
      {
        "zh": "预订",
        "pinyin": "yùdìng",
        "de": "Reservierung"
      },
      {
        "zh": "有",
        "pinyin": "yǒu",
        "de": "haben, es gibt"
      },
      {
        "zh": "身份证",
        "pinyin": "shēnfènzhèng",
        "de": "Personalausweis"
      },
      {
        "zh": "护照",
        "pinyin": "hùzhào",
        "de": "Reisepass"
      },
      {
        "zh": "看",
        "pinyin": "kàn",
        "de": "schauen, sehen"
      },
      {
        "zh": "房卡",
        "pinyin": "fángkǎ",
        "de": "Schlüsselkarte"
      },
      {
        "zh": "密码",
        "pinyin": "mìmǎ",
        "de": "Passwort"
      },
      {
        "zh": "WiFi",
        "pinyin": "WiFi",
        "de": "WiFi, WLAN"
      },
      {
        "zh": "好像",
        "pinyin": "hǎoxiàng",
        "de": "scheint, wohl"
      },
      {
        "zh": "不对",
        "pinyin": "bù duì",
        "de": "nicht richtig, falsch"
      },
      {
        "zh": "试",
        "pinyin": "shì",
        "de": "probieren, versuchen",
        "hint": "sh → sch"
      },
      {
        "zh": "早饭",
        "pinyin": "zǎofàn",
        "de": "Frühstück"
      },
      {
        "zh": "几点",
        "pinyin": "jǐ diǎn",
        "de": "wie viel Uhr",
        "hint": "j → dsch"
      },
      {
        "zh": "早上",
        "pinyin": "zǎoshang",
        "de": "morgens, Morgen"
      },
      {
        "zh": "到",
        "pinyin": "dào",
        "de": "bis, ankommen"
      },
      {
        "zh": "一下",
        "pinyin": "yíxià",
        "de": "kurz, mal (mildert das Verb)"
      }
    ],
    "understandingVocab": [
      {
        "zh": "前台",
        "pinyin": "qiántái",
        "de": "Rezeption"
      },
      {
        "zh": "号",
        "pinyin": "hào",
        "de": "Nummer"
      },
      {
        "zh": "新",
        "pinyin": "xīn",
        "de": "neu",
        "hint": "x → ch"
      },
      {
        "zh": "爸爸",
        "pinyin": "bàba",
        "de": "Papa"
      },
      {
        "zh": "妈妈",
        "pinyin": "māma",
        "de": "Mama"
      },
      {
        "zh": "很",
        "pinyin": "hěn",
        "de": "sehr (verbindet Adjektive)"
      },
      {
        "zh": "晚安",
        "pinyin": "wǎn'ān",
        "de": "Gute Nacht"
      },
      {
        "zh": "不客气",
        "pinyin": "bú kèqi",
        "de": "gern geschehen",
        "hint": "q → tsch"
      }
    ],
    "storyDialog": [
      {
        "speaker": "店员",
        "zh": "你好，欢迎。",
        "pinyin": "Nǐ hǎo, huānyíng.",
        "de": "Hallo, willkommen."
      },
      {
        "speaker": "苏然",
        "zh": "你好。我有预订。",
        "pinyin": "Nǐ hǎo. Wǒ yǒu yùdìng.",
        "de": "Hallo. Ich habe eine Reservierung."
      },
      {
        "speaker": "店员",
        "zh": "你叫什么名字？",
        "pinyin": "Nǐ jiào shénme míngzi?",
        "de": "Wie heißt du?"
      },
      {
        "speaker": "苏然",
        "zh": "我叫苏然。",
        "pinyin": "Wǒ jiào Sū Rán.",
        "de": "Ich heiße Sū Rán."
      },
      {
        "speaker": "店员",
        "zh": "我看一下你的身份证。",
        "pinyin": "Wǒ kàn yíxià nǐ de shēnfènzhèng.",
        "de": "Ich schaue mir kurz deinen Personalausweis an."
      },
      {
        "speaker": "店员",
        "zh": "谢谢。你的房间是 302 号。这是你的房卡。",
        "pinyin": "Xièxie. Nǐ de fángjiān shì sān líng èr hào. Zhè shì nǐ de fángkǎ.",
        "de": "Danke. Dein Zimmer ist Nummer 302. Das ist deine Schlüsselkarte."
      },
      {
        "speaker": "店员",
        "zh": "WiFi 的密码在这里。",
        "pinyin": "WiFi de mìmǎ zài zhèlǐ.",
        "de": "Das WLAN-Passwort ist hier."
      },
      {
        "speaker": "苏然",
        "zh": "不好意思，WiFi 密码好像不对。",
        "pinyin": "Bù hǎoyìsi, WiFi mìmǎ hǎoxiàng bù duì.",
        "de": "Entschuldigung, das WLAN-Passwort scheint nicht richtig zu sein."
      },
      {
        "speaker": "店员",
        "zh": "哦，我看一下。",
        "pinyin": "Ó, wǒ kàn yíxià.",
        "de": "Oh, ich schaue kurz."
      },
      {
        "speaker": "店员",
        "zh": "这是新的密码。你试一下。",
        "pinyin": "Zhè shì xīn de mìmǎ. Nǐ shì yíxià.",
        "de": "Das ist das neue Passwort. Probier es mal."
      },
      {
        "speaker": "苏然",
        "zh": "好了，谢谢。",
        "pinyin": "Hǎo le, xièxie.",
        "de": "Es geht, danke."
      },
      {
        "speaker": "苏然",
        "zh": "请问，早饭几点？",
        "pinyin": "Qǐngwèn, zǎofàn jǐ diǎn?",
        "de": "Entschuldigung, um wie viel Uhr ist Frühstück?"
      },
      {
        "speaker": "店员",
        "zh": "早上七点到九点。",
        "pinyin": "Zǎoshang qī diǎn dào jiǔ diǎn.",
        "de": "Morgens von sieben bis neun Uhr."
      },
      {
        "speaker": "苏然",
        "zh": "谢谢。",
        "pinyin": "Xièxie.",
        "de": "Danke."
      },
      {
        "speaker": "店员",
        "zh": "不客气。",
        "pinyin": "Bú kèqi.",
        "de": "Gern geschehen."
      },
      {
        "speaker": "苏然",
        "zh": "爸爸妈妈，我到北京了。我很好。",
        "pinyin": "Bàba māma, wǒ dào Běijīng le. Wǒ hěn hǎo.",
        "de": "Papa, Mama, ich bin in Beijing angekommen. Mir geht es gut."
      },
      {
        "speaker": "爸爸",
        "zh": "好，晚安。",
        "pinyin": "Hǎo, wǎn'ān.",
        "de": "Alles klar. Gute Nacht."
      }
    ],
    "studentDialog": [
      {
        "speaker": "A",
        "zh": "你好，欢迎。",
        "pinyin": "Nǐ hǎo, huānyíng.",
        "de": "Hallo, willkommen."
      },
      {
        "speaker": "B",
        "zh": "你好。我有预订。",
        "pinyin": "Nǐ hǎo. Wǒ yǒu yùdìng.",
        "de": "Hallo. Ich habe eine Reservierung."
      },
      {
        "speaker": "A",
        "zh": "你叫什么名字？",
        "pinyin": "Nǐ jiào shénme míngzi?",
        "de": "Wie heißt du?"
      },
      {
        "speaker": "B",
        "zh": "我叫 ______。",
        "pinyin": "Wǒ jiào ______.",
        "de": "Ich heiße ______."
      },
      {
        "speaker": "A",
        "zh": "我看一下你的护照。",
        "pinyin": "Wǒ kàn yíxià nǐ de hùzhào.",
        "de": "Ich schaue mir kurz deinen Reisepass an."
      },
      {
        "speaker": "A",
        "zh": "谢谢。你的房间是 ___ 号。这是你的房卡。",
        "pinyin": "Xièxie. Nǐ de fángjiān shì ___ hào. Zhè shì nǐ de fángkǎ.",
        "de": "Danke. Dein Zimmer ist Nummer ___. Das ist deine Schlüsselkarte."
      },
      {
        "speaker": "B",
        "zh": "谢谢。请问，早饭几点？",
        "pinyin": "Xièxie. Qǐngwèn, zǎofàn jǐ diǎn?",
        "de": "Danke. Entschuldigung, um wie viel Uhr ist Frühstück?"
      },
      {
        "speaker": "A",
        "zh": "早上七点到九点。",
        "pinyin": "Zǎoshang qī diǎn dào jiǔ diǎn.",
        "de": "Morgens von sieben bis neun Uhr."
      },
      {
        "speaker": "B",
        "zh": "谢谢。",
        "pinyin": "Xièxie.",
        "de": "Danke."
      },
      {
        "speaker": "A",
        "zh": "不客气。",
        "pinyin": "Bú kèqi.",
        "de": "Gern geschehen."
      }
    ],
    "storyDialogTitle": "Check-in im Hotel",
    "studentDialogTitle": "Check-in im Hotel",
    "studentDialogNote": "Die Lernenden spielen Rezeptionist und Gast. Der Gast hat eine Reservierung, zeigt seinen Reisepass und bekommt die Schlüsselkarte. Dann fragt er nach dem Frühstück.",
    "sentencePuzzles": [
      {
        "de": "Ich habe eine Reservierung.",
        "zh": "我有预订。",
        "pinyin": "Wǒ yǒu yùdìng.",
        "tokens": [
          "我",
          "有",
          "预订",
          "。"
        ]
      },
      {
        "de": "Ich schaue mir kurz deinen Personalausweis an.",
        "zh": "我看一下你的身份证。",
        "pinyin": "Wǒ kàn yíxià nǐ de shēnfènzhèng.",
        "tokens": [
          "我",
          "看",
          "一下",
          "你的",
          "身份证",
          "。"
        ]
      },
      {
        "de": "Das ist deine Schlüsselkarte.",
        "zh": "这是你的房卡。",
        "pinyin": "Zhè shì nǐ de fángkǎ.",
        "tokens": [
          "这",
          "是",
          "你的",
          "房卡",
          "。"
        ]
      },
      {
        "de": "Um wie viel Uhr ist Frühstück?",
        "zh": "早饭几点？",
        "pinyin": "Zǎofàn jǐ diǎn?",
        "tokens": [
          "早饭",
          "几点",
          "？"
        ]
      },
      {
        "de": "Probier es mal.",
        "zh": "你试一下。",
        "pinyin": "Nǐ shì yíxià.",
        "tokens": [
          "你",
          "试",
          "一下",
          "。"
        ]
      }
    ],
    "gapExercises": [
      {
        "prompt": "我 ___ 预订。",
        "answer": "有",
        "choices": [
          "有",
          "试",
          "看",
          "到"
        ],
        "solution": "我有预订。",
        "pinyin": "Wǒ yǒu yùdìng.",
        "de": "Ich habe eine Reservierung."
      },
      {
        "prompt": "这是你的 ___ 。",
        "answer": "房卡",
        "choices": [
          "房卡",
          "密码",
          "房间",
          "护照"
        ],
        "solution": "这是你的房卡。",
        "pinyin": "Zhè shì nǐ de fángkǎ.",
        "de": "Das ist deine Schlüsselkarte."
      },
      {
        "prompt": "WiFi 的 ___ 在这里。",
        "answer": "密码",
        "choices": [
          "密码",
          "房卡",
          "早饭",
          "几点"
        ],
        "solution": "WiFi 的密码在这里。",
        "pinyin": "WiFi de mìmǎ zài zhèlǐ.",
        "de": "Das WLAN-Passwort ist hier."
      },
      {
        "prompt": "WiFi 密码好像 ___ 。",
        "answer": "不对",
        "choices": [
          "不对",
          "几点",
          "新",
          "有"
        ],
        "solution": "WiFi 密码好像不对。",
        "pinyin": "WiFi mìmǎ hǎoxiàng bù duì.",
        "de": "Das WLAN-Passwort scheint nicht richtig zu sein."
      },
      {
        "prompt": "早饭 ___ ？",
        "answer": "几点",
        "choices": [
          "几点",
          "密码",
          "不对",
          "房卡"
        ],
        "solution": "早饭几点？",
        "pinyin": "Zǎofàn jǐ diǎn?",
        "de": "Um wie viel Uhr ist Frühstück?"
      },
      {
        "prompt": "你 ___ 一下新的密码。",
        "answer": "试",
        "choices": [
          "试",
          "有",
          "看",
          "到"
        ],
        "solution": "你试一下新的密码。",
        "pinyin": "Nǐ shì yíxià xīn de mìmǎ.",
        "de": "Probier mal das neue Passwort."
      }
    ]
  },
  {
    "id": "04",
    "title": "Im Café",
    "short": "Bestellen, Zählwörter, 很 + Adjektiv, Toilettenvokabular",
    "accent": "#31485E",
    "textColor": "#FFFFFF",
    "vocab": [
      {
        "zh": "咖啡",
        "pinyin": "kāfēi",
        "de": "Kaffee"
      },
      {
        "zh": "要",
        "pinyin": "yào",
        "de": "wollen, möchten"
      },
      {
        "zh": "杯",
        "pinyin": "bēi",
        "de": "Glas, Tasse (Zählwort)"
      },
      {
        "zh": "个",
        "pinyin": "ge",
        "de": "Stück (Standard-Zählwort)"
      },
      {
        "zh": "吃",
        "pinyin": "chī",
        "de": "essen",
        "hint": "ch → tsch"
      },
      {
        "zh": "喝",
        "pinyin": "hē",
        "de": "trinken"
      },
      {
        "zh": "面包",
        "pinyin": "miànbāo",
        "de": "Brot, Brötchen"
      },
      {
        "zh": "很",
        "pinyin": "hěn",
        "de": "sehr (verbindet Adjektive)"
      },
      {
        "zh": "还",
        "pinyin": "hái",
        "de": "noch, außerdem"
      },
      {
        "zh": "累",
        "pinyin": "lèi",
        "de": "müde"
      },
      {
        "zh": "饿",
        "pinyin": "è",
        "de": "hungrig"
      },
      {
        "zh": "渴",
        "pinyin": "kě",
        "de": "durstig"
      },
      {
        "zh": "开心",
        "pinyin": "kāixīn",
        "de": "fröhlich, glücklich",
        "hint": "x → ch"
      },
      {
        "zh": "起床",
        "pinyin": "qǐchuáng",
        "de": "aufstehen",
        "hint": "ch → tsch"
      },
      {
        "zh": "上午",
        "pinyin": "shàngwǔ",
        "de": "Vormittag",
        "hint": "sh → sch"
      },
      {
        "zh": "中午",
        "pinyin": "zhōngwǔ",
        "de": "Mittag",
        "hint": "zh → dsch"
      },
      {
        "zh": "下午",
        "pinyin": "xiàwǔ",
        "de": "Nachmittag",
        "hint": "x → ch"
      },
      {
        "zh": "好的",
        "pinyin": "hǎo de",
        "de": "okay, gut"
      },
      {
        "zh": "不客气",
        "pinyin": "bú kèqi",
        "de": "gern geschehen",
        "hint": "q → tsch"
      },
      {
        "zh": "厕所",
        "pinyin": "cèsuǒ",
        "de": "Toilette",
        "hint": "c → ts"
      },
      {
        "zh": "男厕所",
        "pinyin": "nán cèsuǒ",
        "de": "Herrentoilette",
        "hint": "男 + 厕所"
      },
      {
        "zh": "女厕所",
        "pinyin": "nǚ cèsuǒ",
        "de": "Damentoilette",
        "hint": "女 + 厕所"
      }
    ],
    "understandingVocab": [
      {
        "zh": "咖啡馆",
        "pinyin": "kāfēiguǎn",
        "de": "Café"
      },
      {
        "zh": "店员",
        "pinyin": "diànyuán",
        "de": "Verkäufer/in, Personal"
      }
    ],
    "storyDialog": [
      {
        "speaker": "店员",
        "zh": "你好！",
        "pinyin": "Nǐ hǎo!",
        "de": "Hallo!"
      },
      {
        "speaker": "苏然",
        "zh": "你好，我要一杯咖啡。",
        "pinyin": "Nǐ hǎo, wǒ yào yì bēi kāfēi.",
        "de": "Hallo, ich möchte einen Kaffee."
      },
      {
        "speaker": "店员",
        "zh": "好的。还要什么？",
        "pinyin": "Hǎo de. Hái yào shénme?",
        "de": "Gut. Was möchtest du noch?"
      },
      {
        "speaker": "苏然",
        "zh": "我还要一个面包。我很饿。",
        "pinyin": "Wǒ hái yào yí ge miànbāo. Wǒ hěn è.",
        "de": "Ich möchte noch ein Brötchen. Ich habe Hunger."
      },
      {
        "speaker": "苏然",
        "zh": "我很累。我要喝咖啡，也要吃面包。",
        "pinyin": "Wǒ hěn lèi. Wǒ yào hē kāfēi, yě yào chī miànbāo.",
        "de": "Ich bin müde. Ich will Kaffee trinken und auch ein Brötchen essen."
      },
      {
        "speaker": "苏然",
        "zh": "我也很渴。",
        "pinyin": "Wǒ yě hěn kě.",
        "de": "Ich bin auch durstig."
      },
      {
        "speaker": "店员",
        "zh": "好的。",
        "pinyin": "Hǎo de.",
        "de": "Gut."
      },
      {
        "speaker": "苏然",
        "zh": "请问，厕所在哪里？",
        "pinyin": "Qǐngwèn, cèsuǒ zài nǎlǐ?",
        "de": "Entschuldigung, wo ist die Toilette?"
      },
      {
        "speaker": "店员",
        "zh": "在那儿。",
        "pinyin": "Zài nàr.",
        "de": "Da drüben."
      },
      {
        "speaker": "苏然",
        "zh": "男厕所在哪里？",
        "pinyin": "Nán cèsuǒ zài nǎlǐ?",
        "de": "Wo ist die Herrentoilette?"
      },
      {
        "speaker": "店员",
        "zh": "男厕所在那儿，女厕所也在那儿。",
        "pinyin": "Nán cèsuǒ zài nàr, nǚ cèsuǒ yě zài nàr.",
        "de": "Die Herrentoilette ist da drüben, die Damentoilette auch."
      },
      {
        "speaker": "苏然",
        "zh": "谢谢。",
        "pinyin": "Xièxie.",
        "de": "Danke."
      },
      {
        "speaker": "苏然",
        "zh": "咖啡很好。我很开心。",
        "pinyin": "Kāfēi hěn hǎo. Wǒ hěn kāixīn.",
        "de": "Der Kaffee ist gut. Ich bin glücklich."
      },
      {
        "speaker": "苏然",
        "zh": "我早上起床。上午看北京，中午吃饭，下午买礼物。",
        "pinyin": "Wǒ zǎoshang qǐchuáng. Shàngwǔ kàn Běijīng, zhōngwǔ chīfàn, xiàwǔ mǎi lǐwù.",
        "de": "Ich stehe morgens auf. Am Vormittag schaue ich mir Beijing an, mittags esse ich, am Nachmittag kaufe ich Geschenke."
      }
    ],
    "studentDialog": [
      {
        "speaker": "A",
        "zh": "你好！",
        "pinyin": "Nǐ hǎo!",
        "de": "Hallo!"
      },
      {
        "speaker": "B",
        "zh": "你好，我要一杯 ______。",
        "pinyin": "Nǐ hǎo, wǒ yào yì bēi ______.",
        "de": "Hallo, ich möchte ein/eine ______."
      },
      {
        "speaker": "A",
        "zh": "好的。还要什么？",
        "pinyin": "Hǎo de. Hái yào shénme?",
        "de": "Gut. Was möchtest du noch?"
      },
      {
        "speaker": "B",
        "zh": "我还要一个 ______。",
        "pinyin": "Wǒ hái yào yí ge ______.",
        "de": "Ich möchte noch ein ______."
      },
      {
        "speaker": "A",
        "zh": "好的。",
        "pinyin": "Hǎo de.",
        "de": "Gut."
      },
      {
        "speaker": "B",
        "zh": "请问，厕所在哪里？",
        "pinyin": "Qǐngwèn, cèsuǒ zài nǎlǐ?",
        "de": "Entschuldigung, wo ist die Toilette?"
      },
      {
        "speaker": "A",
        "zh": "在那儿。",
        "pinyin": "Zài nàr.",
        "de": "Da drüben."
      },
      {
        "speaker": "B",
        "zh": "谢谢。",
        "pinyin": "Xièxie.",
        "de": "Danke."
      },
      {
        "speaker": "A",
        "zh": "不客气。",
        "pinyin": "Bú kèqi.",
        "de": "Gern geschehen."
      }
    ],
    "storyDialogTitle": "Im Café bestellen",
    "studentDialogTitle": "Im Café bestellen und nach der Toilette fragen",
    "studentDialogNote": "Die Lernenden spielen Gast und Café-Personal. Der Gast bestellt ein Getränk und etwas zu essen und fragt danach nach der Toilette. Getränke und Speisen können frei eingesetzt werden (z. B. 咖啡, 面包).",
    "sentencePuzzles": [
      {
        "de": "Ich möchte einen Kaffee.",
        "zh": "我要一杯咖啡。",
        "pinyin": "Wǒ yào yì bēi kāfēi.",
        "tokens": [
          "我",
          "要",
          "一杯",
          "咖啡",
          "。"
        ]
      },
      {
        "de": "Ich habe Hunger.",
        "zh": "我很饿。",
        "pinyin": "Wǒ hěn è.",
        "tokens": [
          "我",
          "很",
          "饿",
          "。"
        ]
      },
      {
        "de": "Wo ist die Toilette?",
        "zh": "厕所在哪里？",
        "pinyin": "Cèsuǒ zài nǎlǐ?",
        "tokens": [
          "厕所",
          "在",
          "哪里",
          "？"
        ]
      },
      {
        "de": "Ich möchte noch ein Brötchen.",
        "zh": "我还要一个面包。",
        "pinyin": "Wǒ hái yào yí ge miànbāo.",
        "tokens": [
          "我",
          "还",
          "要",
          "一个",
          "面包",
          "。"
        ]
      },
      {
        "de": "Ich bin durstig.",
        "zh": "我很渴。",
        "pinyin": "Wǒ hěn kě.",
        "tokens": [
          "我",
          "很",
          "渴",
          "。"
        ]
      }
    ],
    "gapExercises": [
      {
        "prompt": "我 ___ 一杯咖啡。",
        "answer": "要",
        "choices": [
          "要",
          "很",
          "在",
          "个"
        ],
        "solution": "我要一杯咖啡。",
        "pinyin": "Wǒ yào yì bēi kāfēi.",
        "de": "Ich möchte einen Kaffee."
      },
      {
        "prompt": "我还要一 ___ 面包。",
        "answer": "个",
        "choices": [
          "个",
          "杯",
          "要",
          "很"
        ],
        "solution": "我还要一个面包。",
        "pinyin": "Wǒ hái yào yí ge miànbāo.",
        "de": "Ich möchte noch ein Brötchen."
      },
      {
        "prompt": "我 ___ 饿。",
        "answer": "很",
        "choices": [
          "很",
          "要",
          "在",
          "个"
        ],
        "solution": "我很饿。",
        "pinyin": "Wǒ hěn è.",
        "de": "Ich habe Hunger."
      },
      {
        "prompt": "请问，___ 在哪里？",
        "answer": "厕所",
        "choices": [
          "厕所",
          "咖啡",
          "面包",
          "要"
        ],
        "solution": "请问，厕所在哪里？",
        "pinyin": "Qǐngwèn, cèsuǒ zài nǎlǐ?",
        "de": "Entschuldigung, wo ist die Toilette?"
      },
      {
        "prompt": "一 ___ 咖啡。",
        "answer": "杯",
        "choices": [
          "杯",
          "个",
          "很",
          "要"
        ],
        "solution": "一杯咖啡。",
        "pinyin": "Yì bēi kāfēi.",
        "de": "eine Tasse Kaffee"
      },
      {
        "prompt": "咖啡 ___ 那儿。",
        "answer": "在",
        "choices": [
          "在",
          "要",
          "很",
          "个"
        ],
        "solution": "咖啡在那儿。",
        "pinyin": "Kāfēi zài nàr.",
        "de": "Der Kaffee ist da drüben."
      }
    ]
  },
  {
    "id": "05",
    "title": "Souvenirs",
    "short": "Zahlen, Preise, Farben, Bezahlen — Rucksack vergessen",
    "accent": "#465D73",
    "textColor": "#FFFFFF",
    "vocab": [
      {
        "zh": "买",
        "pinyin": "mǎi",
        "de": "kaufen"
      },
      {
        "zh": "礼物",
        "pinyin": "lǐwù",
        "de": "Geschenk"
      },
      {
        "zh": "多少",
        "pinyin": "duōshao",
        "de": "wie viel, wie viele",
        "hint": "sh → sch"
      },
      {
        "zh": "钱",
        "pinyin": "qián",
        "de": "Geld",
        "hint": "q → tsch"
      },
      {
        "zh": "块",
        "pinyin": "kuài",
        "de": "Yuan (umgangssprachlich)"
      },
      {
        "zh": "百",
        "pinyin": "bǎi",
        "de": "hundert"
      },
      {
        "zh": "条",
        "pinyin": "tiáo",
        "de": "Zählwort (lang/schmal: Schal)"
      },
      {
        "zh": "围巾",
        "pinyin": "wéijīn",
        "de": "Schal",
        "hint": "j → dsch"
      },
      {
        "zh": "茶",
        "pinyin": "chá",
        "de": "Tee",
        "hint": "ch → tsch"
      },
      {
        "zh": "盒",
        "pinyin": "hé",
        "de": "Zählwort (Schachtel)"
      },
      {
        "zh": "红色",
        "pinyin": "hóngsè",
        "de": "rot"
      },
      {
        "zh": "蓝色",
        "pinyin": "lánsè",
        "de": "blau"
      },
      {
        "zh": "绿色",
        "pinyin": "lǜsè",
        "de": "grün",
        "hint": "ü wie in „über“"
      },
      {
        "zh": "的",
        "pinyin": "de",
        "de": "bildet „die rote“: 红色的"
      },
      {
        "zh": "和",
        "pinyin": "hé",
        "de": "und (verbindet Nomen)"
      },
      {
        "zh": "一共",
        "pinyin": "yígòng",
        "de": "insgesamt, zusammen"
      }
    ],
    "understandingVocab": [
      {
        "zh": "可以",
        "pinyin": "kěyǐ",
        "de": "können, dürfen"
      },
      {
        "zh": "用",
        "pinyin": "yòng",
        "de": "benutzen"
      },
      {
        "zh": "现金",
        "pinyin": "xiànjīn",
        "de": "Bargeld",
        "hint": "x → ch / j → dsch"
      },
      {
        "zh": "扫码",
        "pinyin": "sǎomǎ",
        "de": "den QR-Code scannen"
      },
      {
        "zh": "店员",
        "pinyin": "diànyuán",
        "de": "Verkäufer/in, Personal"
      }
    ],
    "storyDialog": [
      {
        "speaker": "苏然",
        "zh": "你好。请问，这条围巾多少钱？",
        "pinyin": "Nǐ hǎo. Qǐngwèn, zhè tiáo wéijīn duōshao qián?",
        "de": "Hallo. Entschuldigung, wie viel kostet dieser Schal?"
      },
      {
        "speaker": "店员",
        "zh": "八十块。",
        "pinyin": "Bāshí kuài.",
        "de": "Achtzig Yuan."
      },
      {
        "speaker": "苏然",
        "zh": "有红色的吗？",
        "pinyin": "Yǒu hóngsè de ma?",
        "de": "Gibt es ihn in Rot?"
      },
      {
        "speaker": "店员",
        "zh": "有。这条是红色的。",
        "pinyin": "Yǒu. Zhè tiáo shì hóngsè de.",
        "de": "Ja. Dieser hier ist rot."
      },
      {
        "speaker": "苏然",
        "zh": "这是我妈妈的礼物。",
        "pinyin": "Zhè shì wǒ māma de lǐwù.",
        "de": "Das ist ein Geschenk für meine Mama."
      },
      {
        "speaker": "店员",
        "zh": "红色很好。",
        "pinyin": "Hóngsè hěn hǎo.",
        "de": "Rot ist schön."
      },
      {
        "speaker": "苏然",
        "zh": "这盒茶呢？多少钱？",
        "pinyin": "Zhè hé chá ne? Duōshao qián?",
        "de": "Und dieser Tee? Wie viel kostet er?"
      },
      {
        "speaker": "店员",
        "zh": "五十块。",
        "pinyin": "Wǔshí kuài.",
        "de": "Fünfzig Yuan."
      },
      {
        "speaker": "苏然",
        "zh": "好。我要这条红色的围巾和这盒茶。",
        "pinyin": "Hǎo. Wǒ yào zhè tiáo hóngsè de wéijīn hé zhè hé chá.",
        "de": "Gut. Ich nehme diesen roten Schal und diesen Tee."
      },
      {
        "speaker": "店员",
        "zh": "好的。一共一百三十块。",
        "pinyin": "Hǎo de. Yígòng yìbǎi sānshí kuài.",
        "de": "Gut. Zusammen einhundertdreißig Yuan."
      },
      {
        "speaker": "苏然",
        "zh": "谢谢。",
        "pinyin": "Xièxie.",
        "de": "Danke."
      },
      {
        "speaker": "店员",
        "zh": "不客气。",
        "pinyin": "Bú kèqi.",
        "de": "Gern geschehen."
      }
    ],
    "studentDialog": [
      {
        "speaker": "A",
        "zh": "你好，我要买一条围巾。",
        "pinyin": "Nǐ hǎo, wǒ yào mǎi yì tiáo wéijīn.",
        "de": "Hallo, ich möchte einen Schal kaufen."
      },
      {
        "speaker": "B",
        "zh": "你好！我们有红色、蓝色和绿色。",
        "pinyin": "Nǐ hǎo! Wǒmen yǒu hóngsè, lánsè hé lǜsè.",
        "de": "Hallo! Wir haben Rot, Blau und Grün."
      },
      {
        "speaker": "A",
        "zh": "这条多少钱？",
        "pinyin": "Zhè tiáo duōshao qián?",
        "de": "Wie viel kostet dieser?"
      },
      {
        "speaker": "B",
        "zh": "八十块。",
        "pinyin": "Bāshí kuài.",
        "de": "Achtzig Yuan."
      },
      {
        "speaker": "A",
        "zh": "我要红色的。可以用现金吗？",
        "pinyin": "Wǒ yào hóngsè de. Kěyǐ yòng xiànjīn ma?",
        "de": "Ich möchte den roten. Kann ich bar bezahlen?"
      },
      {
        "speaker": "B",
        "zh": "不好意思，不可以。请扫码。",
        "pinyin": "Bù hǎoyìsi, bù kěyǐ. Qǐng sǎomǎ.",
        "de": "Tut mir leid, das geht nicht. Bitte per QR scannen."
      },
      {
        "speaker": "A",
        "zh": "好的。谢谢。",
        "pinyin": "Hǎo de. Xièxie.",
        "de": "Okay. Danke."
      },
      {
        "speaker": "B",
        "zh": "不客气。",
        "pinyin": "Bú kèqi.",
        "de": "Gern geschehen."
      }
    ],
    "storyDialogTitle": "Im Souvenirladen",
    "studentDialogTitle": "Im Souvenirladen einkaufen und nach Bezahlung fragen",
    "studentDialogNote": "Die Lernenden spielen Kunde und Verkäufer/in. Der Kunde möchte etwas kaufen, fragt nach dem Preis und nach einer Farbe und fragt am Ende, ob man bar zahlen kann. Dinge und Farben können frei eingesetzt werden (z. B. 围巾, 茶, 红色, 蓝色).",
    "sentencePuzzles": [
      {
        "de": "Wie viel kostet dieser Schal?",
        "zh": "这条围巾多少钱？",
        "pinyin": "Zhè tiáo wéijīn duōshao qián?",
        "tokens": [
          "这条",
          "围巾",
          "多少",
          "钱",
          "？"
        ]
      },
      {
        "de": "Gibt es ihn in Rot?",
        "zh": "有红色的吗？",
        "pinyin": "Yǒu hóngsè de ma?",
        "tokens": [
          "有",
          "红色的",
          "吗",
          "？"
        ]
      },
      {
        "de": "Ich nehme diesen roten Schal und diesen Tee.",
        "zh": "我要这条红色的围巾和这盒茶。",
        "pinyin": "Wǒ yào zhè tiáo hóngsè de wéijīn hé zhè hé chá.",
        "tokens": [
          "我要",
          "这条",
          "红色的",
          "围巾",
          "和",
          "这盒",
          "茶",
          "。"
        ]
      },
      {
        "de": "Zusammen einhundertdreißig Yuan.",
        "zh": "一共一百三十块。",
        "pinyin": "Yígòng yìbǎi sānshí kuài.",
        "tokens": [
          "一共",
          "一百三十",
          "块",
          "。"
        ]
      },
      {
        "de": "Dieser hier ist rot.",
        "zh": "这条是红色的。",
        "pinyin": "Zhè tiáo shì hóngsè de.",
        "tokens": [
          "这条",
          "是",
          "红色的",
          "。"
        ]
      }
    ],
    "gapExercises": [
      {
        "prompt": "这 ___ 围巾多少钱？",
        "answer": "条",
        "choices": [
          "条",
          "盒",
          "块",
          "个"
        ],
        "solution": "这条围巾多少钱？",
        "pinyin": "Zhè tiáo wéijīn duōshao qián?",
        "de": "Wie viel kostet dieser Schal?"
      },
      {
        "prompt": "八十 ___ 。",
        "answer": "块",
        "choices": [
          "块",
          "条",
          "盒",
          "百"
        ],
        "solution": "八十块。",
        "pinyin": "Bāshí kuài.",
        "de": "Achtzig Yuan."
      },
      {
        "prompt": "有 ___ 的吗？",
        "answer": "红色",
        "choices": [
          "红色",
          "一共",
          "多少",
          "块"
        ],
        "solution": "有红色的吗？",
        "pinyin": "Yǒu hóngsè de ma?",
        "de": "Gibt es einen roten?"
      },
      {
        "prompt": "我要这 ___ 茶。",
        "answer": "盒",
        "choices": [
          "盒",
          "条",
          "块",
          "个"
        ],
        "solution": "我要这盒茶。",
        "pinyin": "Wǒ yào zhè hé chá.",
        "de": "Ich möchte diesen Tee."
      },
      {
        "prompt": "___ 一百三十块。",
        "answer": "一共",
        "choices": [
          "一共",
          "多少",
          "红色",
          "块"
        ],
        "solution": "一共一百三十块。",
        "pinyin": "Yígòng yìbǎi sānshí kuài.",
        "de": "Zusammen einhundertdreißig Yuan."
      },
      {
        "prompt": "这盒茶 ___ 钱？",
        "answer": "多少",
        "choices": [
          "多少",
          "一共",
          "块",
          "条"
        ],
        "solution": "这盒茶多少钱？",
        "pinyin": "Zhè hé chá duōshao qián?",
        "de": "Wie viel kostet dieser Tee?"
      }
    ]
  },
  {
    "id": "06",
    "title": "Verschwunden",
    "short": "Verlorener Rucksack, Lín Yuè hilft, 能, 请客",
    "accent": "#5B7086",
    "textColor": "#FFFFFF",
    "vocab": [
      {
        "zh": "包",
        "pinyin": "bāo",
        "de": "Tasche, Rucksack"
      },
      {
        "zh": "丢",
        "pinyin": "diū",
        "de": "verlieren"
      },
      {
        "zh": "丢了",
        "pinyin": "diū le",
        "de": "verloren, weg"
      },
      {
        "zh": "能",
        "pinyin": "néng",
        "de": "können"
      },
      {
        "zh": "帮",
        "pinyin": "bāng",
        "de": "helfen"
      },
      {
        "zh": "黑色",
        "pinyin": "hēisè",
        "de": "schwarz"
      },
      {
        "zh": "里面",
        "pinyin": "lǐmiàn",
        "de": "drinnen, innen"
      },
      {
        "zh": "问",
        "pinyin": "wèn",
        "de": "fragen"
      },
      {
        "zh": "家",
        "pinyin": "jiā",
        "de": "Zählwort (Läden, Lokale)"
      },
      {
        "zh": "饭馆",
        "pinyin": "fànguǎn",
        "de": "Restaurant",
        "hint": "g → harter g-Laut"
      },
      {
        "zh": "喂",
        "pinyin": "wéi",
        "de": "Hallo (am Telefon)"
      },
      {
        "zh": "真的",
        "pinyin": "zhēn de",
        "de": "wirklich",
        "hint": "zh → dsch"
      },
      {
        "zh": "没",
        "pinyin": "méi",
        "de": "nicht (etwas ist nicht passiert)"
      }
    ],
    "understandingVocab": [
      {
        "zh": "怎么了",
        "pinyin": "zěnme le",
        "de": "Was ist los?",
        "hint": "z → ds"
      },
      {
        "zh": "别着急",
        "pinyin": "bié zháojí",
        "de": "Keine Panik",
        "hint": "j → dsch"
      },
      {
        "zh": "送来",
        "pinyin": "sòng lái",
        "de": "herbringen, abgeben",
        "hint": "s → ssch"
      },
      {
        "zh": "学生",
        "pinyin": "xuésheng",
        "de": "Student/in, Schüler/in",
        "hint": "x → ch"
      },
      {
        "zh": "超市",
        "pinyin": "chāoshì",
        "de": "Supermarkt",
        "hint": "ch → tsch / sh → sch"
      },
      {
        "zh": "便利店",
        "pinyin": "biànlìdiàn",
        "de": "Kiosk, Mini-Markt"
      },
      {
        "zh": "找",
        "pinyin": "zhǎo",
        "de": "suchen",
        "hint": "zh → dsch"
      },
      {
        "zh": "找到",
        "pinyin": "zhǎodào",
        "de": "finden, gefunden haben",
        "hint": "zh → dsch"
      },
      {
        "zh": "什么样",
        "pinyin": "shénme yàng",
        "de": "wie (beschaffen), wie aussehend",
        "hint": "sh → sch"
      },
      {
        "zh": "请你吃饭",
        "pinyin": "qǐng nǐ chīfàn",
        "de": "dich zum Essen einladen",
        "hint": "q → tsch"
      },
      {
        "zh": "不用了",
        "pinyin": "bú yòng le",
        "de": "nicht nötig, das musst du nicht"
      },
      {
        "zh": "不用这么客气",
        "pinyin": "bú yòng zhème kèqi",
        "de": "du musst nicht so förmlich sein"
      },
      {
        "zh": "好吧",
        "pinyin": "hǎo ba",
        "de": "na gut"
      }
    ],
    "storyDialog": [
      {
        "speaker": "苏然",
        "zh": "你好，我的包丢了。在这里吗？",
        "pinyin": "Nǐ hǎo, wǒ de bāo diū le. Zài zhèlǐ ma?",
        "de": "Hallo, mein Rucksack ist weg. Ist er hier?"
      },
      {
        "speaker": "店员",
        "zh": "包？没有。这儿没有。",
        "pinyin": "Bāo? Méiyǒu. Zhèr méiyǒu.",
        "de": "Ein Rucksack? Nein. Hier ist keiner."
      },
      {
        "speaker": "苏然",
        "zh": "喂，林月？我是苏然。",
        "pinyin": "Wéi, Lín Yuè? Wǒ shì Sū Rán.",
        "de": "Hallo, Lín Yuè? Ich bin Sū Rán."
      },
      {
        "speaker": "林月",
        "zh": "苏然？怎么了？",
        "pinyin": "Sū Rán? Zěnme le?",
        "de": "Sū Rán? Was ist los?"
      },
      {
        "speaker": "苏然",
        "zh": "我的包丢了。你能帮我吗？",
        "pinyin": "Wǒ de bāo diū le. Nǐ néng bāng wǒ ma?",
        "de": "Mein Rucksack ist weg. Kannst du mir helfen?"
      },
      {
        "speaker": "林月",
        "zh": "别着急。你在哪儿？",
        "pinyin": "Bié zháojí. Nǐ zài nǎr?",
        "de": "Keine Panik. Wo bist du?"
      },
      {
        "speaker": "林月",
        "zh": "你的包是什么样的？",
        "pinyin": "Nǐ de bāo shì shénme yàng de?",
        "de": "Wie sieht dein Rucksack aus?"
      },
      {
        "speaker": "苏然",
        "zh": "黑色的。里面有身份证和房卡。",
        "pinyin": "Hēisè de. Lǐmiàn yǒu shēnfènzhèng hé fángkǎ.",
        "de": "Schwarz. Drin sind mein Personalausweis und die Schlüsselkarte."
      },
      {
        "speaker": "林月",
        "zh": "我们问一下。",
        "pinyin": "Wǒmen wèn yíxià.",
        "de": "Lass uns mal fragen."
      },
      {
        "speaker": "林月",
        "zh": "你好，请问，有人送来一个黑色的包吗？",
        "pinyin": "Nǐ hǎo, qǐngwèn, yǒu rén sòng lái yí ge hēisè de bāo ma?",
        "de": "Hallo, hat jemand einen schwarzen Rucksack abgegeben?"
      },
      {
        "speaker": "店员",
        "zh": "没有。",
        "pinyin": "Méiyǒu.",
        "de": "Nein."
      },
      {
        "speaker": "苏然",
        "zh": "还没找到。",
        "pinyin": "Hái méi zhǎodào.",
        "de": "Immer noch nicht gefunden."
      },
      {
        "speaker": "林月",
        "zh": "这儿有一家超市。我们问一下。",
        "pinyin": "Zhèr yǒu yì jiā chāoshì. Wǒmen wèn yíxià.",
        "de": "Hier ist ein Supermarkt. Lass uns fragen."
      },
      {
        "speaker": "林月",
        "zh": "没关系。那家便利店呢？",
        "pinyin": "Méi guānxi. Nà jiā biànlìdiàn ne?",
        "de": "Macht nichts. Und der Kiosk da?"
      },
      {
        "speaker": "店员",
        "zh": "黑色的包？有。一个学生送来的。",
        "pinyin": "Hēisè de bāo? Yǒu. Yí ge xuésheng sòng lái de.",
        "de": "Ein schwarzer Rucksack? Ja. Ein Student hat ihn gebracht."
      },
      {
        "speaker": "苏然",
        "zh": "太谢谢你了！",
        "pinyin": "Tài xièxie nǐ le!",
        "de": "Vielen, vielen Dank!"
      },
      {
        "speaker": "店员",
        "zh": "不客气。",
        "pinyin": "Bú kèqi.",
        "de": "Gern geschehen."
      },
      {
        "speaker": "林月",
        "zh": "找到了。",
        "pinyin": "Zhǎodào le.",
        "de": "Gefunden."
      },
      {
        "speaker": "苏然",
        "zh": "太谢谢你了。真的。",
        "pinyin": "Tài xièxie nǐ le. Zhēn de.",
        "de": "Vielen Dank. Wirklich."
      },
      {
        "speaker": "苏然",
        "zh": "你饿吗？我请你吃饭。",
        "pinyin": "Nǐ è ma? Wǒ qǐng nǐ chīfàn.",
        "de": "Hast du Hunger? Ich lade dich zum Essen ein."
      },
      {
        "speaker": "林月",
        "zh": "不用了，你不用这么客气。",
        "pinyin": "Bú yòng le, nǐ bú yòng zhème kèqi.",
        "de": "Ach nein, das musst du nicht. Du musst nicht so förmlich sein."
      },
      {
        "speaker": "苏然",
        "zh": "真的。我请你吃饭。",
        "pinyin": "Zhēn de. Wǒ qǐng nǐ chīfàn.",
        "de": "Doch, wirklich. Ich lade dich zum Essen ein."
      },
      {
        "speaker": "林月",
        "zh": "好吧。这儿有一家饭馆。",
        "pinyin": "Hǎo ba. Zhèr yǒu yì jiā fànguǎn.",
        "de": "Na gut. Hier gibt es ein Restaurant."
      }
    ],
    "studentDialog": [
      {
        "speaker": "A",
        "zh": "喂，你好。我的 ___ 丢了。你能帮我吗？",
        "pinyin": "Wéi, nǐ hǎo. Wǒ de ___ diū le. Nǐ néng bāng wǒ ma?",
        "de": "Hallo. Mein/e ___ ist weg. Kannst du mir helfen?"
      },
      {
        "speaker": "B",
        "zh": "别着急。你的 ___ 是什么样的？",
        "pinyin": "Bié zháojí. Nǐ de ___ shì shénme yàng de?",
        "de": "Keine Panik. Wie sieht dein/e ___ aus?"
      },
      {
        "speaker": "A",
        "zh": "是 ___ 的。",
        "pinyin": "Shì ___ de.",
        "de": "Es ist ___ (Farbe)."
      },
      {
        "speaker": "B",
        "zh": "我们问一下。",
        "pinyin": "Wǒmen wèn yíxià.",
        "de": "Lass uns mal fragen."
      },
      {
        "speaker": "B",
        "zh": "你好，请问，有人送来一个 ___ 的 ___ 吗？",
        "pinyin": "Nǐ hǎo, qǐngwèn, yǒu rén sòng lái yí ge ___ de ___ ma?",
        "de": "Hallo, hat jemand ein/e ___ (Farbe) ___ abgegeben?"
      },
      {
        "speaker": "店员",
        "zh": "有。/ 没有。",
        "pinyin": "Yǒu. / Méiyǒu.",
        "de": "Ja. / Nein."
      },
      {
        "speaker": "A",
        "zh": "太谢谢你了！",
        "pinyin": "Tài xièxie nǐ le!",
        "de": "Vielen, vielen Dank!"
      },
      {
        "speaker": "B",
        "zh": "不客气。",
        "pinyin": "Bú kèqi.",
        "de": "Gern geschehen."
      }
    ],
    "storyDialogTitle": "Der verschwundene Rucksack",
    "studentDialogTitle": "Etwas verloren und um Hilfe bitten",
    "studentDialogNote": "Die Lernenden spielen zwei Rollen: eine Person, die etwas verloren hat (A), und eine Person, die hilft (B). Das verlorene Ding und die Farbe können frei eingesetzt werden (z. B. 包, 手机; 黑色, 蓝色, 红色).",
    "sentencePuzzles": [
      {
        "de": "Mein Rucksack ist weg.",
        "zh": "我的包丢了。",
        "pinyin": "Wǒ de bāo diū le.",
        "tokens": [
          "我的",
          "包",
          "丢了",
          "。"
        ]
      },
      {
        "de": "Kannst du mir helfen?",
        "zh": "你能帮我吗？",
        "pinyin": "Nǐ néng bāng wǒ ma?",
        "tokens": [
          "你",
          "能",
          "帮",
          "我",
          "吗",
          "？"
        ]
      },
      {
        "de": "Mein Rucksack ist schwarz.",
        "zh": "我的包是黑色的。",
        "pinyin": "Wǒ de bāo shì hēisè de.",
        "tokens": [
          "我的",
          "包",
          "是",
          "黑色的",
          "。"
        ]
      },
      {
        "de": "Drin sind ein Personalausweis und eine Schlüsselkarte.",
        "zh": "里面有身份证和房卡。",
        "pinyin": "Lǐmiàn yǒu shēnfènzhèng hé fángkǎ.",
        "tokens": [
          "里面",
          "有",
          "身份证",
          "和",
          "房卡",
          "。"
        ]
      },
      {
        "de": "Hier gibt es ein Restaurant.",
        "zh": "这儿有一家饭馆。",
        "pinyin": "Zhèr yǒu yì jiā fànguǎn.",
        "tokens": [
          "这儿",
          "有",
          "一家",
          "饭馆",
          "。"
        ]
      },
      {
        "de": "Immer noch nicht gefunden.",
        "zh": "还没找到。",
        "pinyin": "Hái méi zhǎodào.",
        "tokens": [
          "还",
          "没",
          "找到",
          "。"
        ]
      }
    ],
    "gapExercises": [
      {
        "prompt": "我的包 ___ 。",
        "answer": "丢了",
        "choices": [
          "丢了",
          "能",
          "帮",
          "里面"
        ],
        "solution": "我的包丢了。",
        "pinyin": "Wǒ de bāo diū le.",
        "de": "Mein Rucksack ist weg."
      },
      {
        "prompt": "你 ___ 帮我吗？",
        "answer": "能",
        "choices": [
          "能",
          "丢了",
          "家",
          "里面"
        ],
        "solution": "你能帮我吗？",
        "pinyin": "Nǐ néng bāng wǒ ma?",
        "de": "Kannst du mir helfen?"
      },
      {
        "prompt": "你能 ___ 我吗？",
        "answer": "帮",
        "choices": [
          "帮",
          "能",
          "问",
          "丢"
        ],
        "solution": "你能帮我吗？",
        "pinyin": "Nǐ néng bāng wǒ ma?",
        "de": "Kannst du mir helfen?"
      },
      {
        "prompt": "我的包是 ___ 的。",
        "answer": "黑色",
        "choices": [
          "黑色",
          "里面",
          "丢了",
          "家"
        ],
        "solution": "我的包是黑色的。",
        "pinyin": "Wǒ de bāo shì hēisè de.",
        "de": "Mein Rucksack ist schwarz."
      },
      {
        "prompt": "___ 有身份证和房卡。",
        "answer": "里面",
        "choices": [
          "里面",
          "黑色",
          "能",
          "家"
        ],
        "solution": "里面有身份证和房卡。",
        "pinyin": "Lǐmiàn yǒu shēnfènzhèng hé fángkǎ.",
        "de": "Drin sind ein Personalausweis und eine Schlüsselkarte."
      },
      {
        "prompt": "这儿有一 ___ 饭馆。",
        "answer": "家",
        "choices": [
          "家",
          "个",
          "条",
          "盒"
        ],
        "solution": "这儿有一家饭馆。",
        "pinyin": "Zhèr yǒu yì jiā fànguǎn.",
        "de": "Hier gibt es ein Restaurant."
      },
      {
        "prompt": "我 ___ 找到我的包。",
        "answer": "没",
        "choices": [
          "没",
          "了",
          "很",
          "也"
        ],
        "solution": "我没找到我的包。",
        "pinyin": "Wǒ méi zhǎodào wǒ de bāo.",
        "de": "Ich habe meinen Rucksack nicht gefunden."
      }
    ]
  },
  {
    "id": "07",
    "title": "Peking-Ente",
    "short": "Restaurant, Bestellen, Tischetikette, 干杯, Bezahlen",
    "accent": "#F6E3E5",
    "textColor": "#0B1B2E",
    "vocab": [
      {
        "zh": "饿",
        "pinyin": "è",
        "de": "hungrig"
      },
      {
        "zh": "菜单",
        "pinyin": "càidān",
        "de": "Speisekarte",
        "hint": "c → ts"
      },
      {
        "zh": "要",
        "pinyin": "yào",
        "de": "wollen, möchten"
      },
      {
        "zh": "来",
        "pinyin": "lái",
        "de": "hier: „bringen“ (beim Bestellen)"
      },
      {
        "zh": "碗",
        "pinyin": "wǎn",
        "de": "Schale (Zählwort)"
      },
      {
        "zh": "盘",
        "pinyin": "pán",
        "de": "Teller (Zählwort)"
      },
      {
        "zh": "米饭",
        "pinyin": "mǐfàn",
        "de": "Reis"
      },
      {
        "zh": "好吃",
        "pinyin": "hǎochī",
        "de": "lecker, schmeckt gut",
        "hint": "ch → tsch"
      },
      {
        "zh": "辣",
        "pinyin": "là",
        "de": "scharf"
      },
      {
        "zh": "觉得",
        "pinyin": "juéde",
        "de": "finden, meinen",
        "hint": "j → dsch"
      },
      {
        "zh": "干杯",
        "pinyin": "gānbēi",
        "de": "Prost, anstoßen",
        "hint": "g → harter g-Laut"
      },
      {
        "zh": "茶",
        "pinyin": "chá",
        "de": "Tee",
        "hint": "ch → tsch"
      },
      {
        "zh": "喜欢",
        "pinyin": "xǐhuan",
        "de": "mögen, gern haben",
        "hint": "x → ch"
      },
      {
        "zh": "买单",
        "pinyin": "mǎidān",
        "de": "die Rechnung (zahlen)"
      },
      {
        "zh": "下次",
        "pinyin": "xiàcì",
        "de": "nächstes Mal",
        "hint": "x → ch / c → ts"
      },
      {
        "zh": "过",
        "pinyin": "guo",
        "de": "Partikel (schon einmal, Erfahrung)"
      }
    ],
    "understandingVocab": [
      {
        "zh": "服务员",
        "pinyin": "fúwùyuán",
        "de": "Kellner/in, Bedienung"
      },
      {
        "zh": "北京烤鸭",
        "pinyin": "Běijīng kǎoyā",
        "de": "Peking-Ente"
      },
      {
        "zh": "饼",
        "pinyin": "bǐng",
        "de": "(dünner) Pfannkuchen, Fladen"
      },
      {
        "zh": "份",
        "pinyin": "fèn",
        "de": "Portion (Zählwort)"
      },
      {
        "zh": "点",
        "pinyin": "diǎn",
        "de": "bestellen, auswählen"
      },
      {
        "zh": "推荐",
        "pinyin": "tuījiàn",
        "de": "empfehlen"
      },
      {
        "zh": "小时候",
        "pinyin": "xiǎoshíhou",
        "de": "als Kind, in der Kindheit",
        "hint": "x → ch"
      },
      {
        "zh": "以茶代酒",
        "pinyin": "yǐ chá dài jiǔ",
        "de": "mit Tee statt Wein anstoßen",
        "hint": "j → dsch"
      },
      {
        "zh": "我请客",
        "pinyin": "wǒ qǐngkè",
        "de": "ich lade ein, ich gebe aus",
        "hint": "q → tsch"
      },
      {
        "zh": "够了",
        "pinyin": "gòu le",
        "de": "das reicht, genug"
      }
    ],
    "storyDialog": [
      {
        "speaker": "苏然",
        "zh": "我有点饿了。",
        "pinyin": "Wǒ yǒudiǎn è le.",
        "de": "Ich habe etwas Hunger."
      },
      {
        "speaker": "林月",
        "zh": "这家的北京烤鸭很有名。",
        "pinyin": "Zhè jiā de Běijīng kǎoyā hěn yǒumíng.",
        "de": "Die Peking-Ente hier ist berühmt."
      },
      {
        "speaker": "林月",
        "zh": "你喜欢吃鸭子吗？",
        "pinyin": "Nǐ xǐhuan chī yāzi ma?",
        "de": "Magst du Ente?"
      },
      {
        "speaker": "苏然",
        "zh": "喜欢。",
        "pinyin": "Xǐhuan.",
        "de": "Ja, mag ich."
      },
      {
        "speaker": "林月",
        "zh": "你吃过北京烤鸭吗？",
        "pinyin": "Nǐ chīguo Běijīng kǎoyā ma?",
        "de": "Hast du schon mal Peking-Ente gegessen?"
      },
      {
        "speaker": "苏然",
        "zh": "我没吃过。",
        "pinyin": "Wǒ méi chīguo.",
        "de": "Nein, noch nie."
      },
      {
        "speaker": "苏然",
        "zh": "菜单上有很多菜。",
        "pinyin": "Càidān shàng yǒu hěn duō cài.",
        "de": "Auf der Speisekarte stehen viele Gerichte."
      },
      {
        "speaker": "苏然",
        "zh": "你推荐什么？",
        "pinyin": "Nǐ tuījiàn shénme?",
        "de": "Was empfiehlst du?"
      },
      {
        "speaker": "林月",
        "zh": "来一份北京烤鸭吧。",
        "pinyin": "Lái yí fèn Běijīng kǎoyā ba.",
        "de": "Lass uns eine Portion Peking-Ente nehmen."
      },
      {
        "speaker": "林月",
        "zh": "还有饼。",
        "pinyin": "Hái yǒu bǐng.",
        "de": "Und Pfannkuchen dazu."
      },
      {
        "speaker": "苏然",
        "zh": "服务员，我们要一份北京烤鸭。",
        "pinyin": "Fúwùyuán, wǒmen yào yí fèn Běijīng kǎoyā.",
        "de": "Bedienung, wir möchten eine Portion Peking-Ente."
      },
      {
        "speaker": "苏然",
        "zh": "来两碗米饭。",
        "pinyin": "Lái liǎng wǎn mǐfàn.",
        "de": "Und zwei Schalen Reis."
      },
      {
        "speaker": "林月",
        "zh": "再来一盘青菜。",
        "pinyin": "Zài lái yì pán qīngcài.",
        "de": "Und noch einen Teller Gemüse."
      },
      {
        "speaker": "林月",
        "zh": "我们点的够了吗？",
        "pinyin": "Wǒmen diǎn de gòu le ma?",
        "de": "Haben wir genug bestellt?"
      },
      {
        "speaker": "苏然",
        "zh": "够了。",
        "pinyin": "Gòu le.",
        "de": "Ja, das reicht."
      },
      {
        "speaker": "服务员",
        "zh": "好的。",
        "pinyin": "Hǎo de.",
        "de": "In Ordnung."
      },
      {
        "speaker": "苏然",
        "zh": "这个辣吗？",
        "pinyin": "Zhège là ma?",
        "de": "Ist das scharf?"
      },
      {
        "speaker": "服务员",
        "zh": "有一点辣。",
        "pinyin": "Yǒu yìdiǎn là.",
        "de": "Ein bisschen scharf."
      },
      {
        "speaker": "苏然",
        "zh": "那不要了。",
        "pinyin": "Nà bú yào le.",
        "de": "Dann lieber nicht."
      },
      {
        "speaker": "苏然",
        "zh": "很好吃。",
        "pinyin": "Hěn hǎochī.",
        "de": "Sehr lecker."
      },
      {
        "speaker": "林月",
        "zh": "我也觉得很好吃。",
        "pinyin": "Wǒ yě juéde hěn hǎochī.",
        "de": "Ich finde es auch sehr lecker."
      },
      {
        "speaker": "林月",
        "zh": "我小时候不喜欢鸭子，只喜欢饼。",
        "pinyin": "Wǒ xiǎoshíhou bù xǐhuan yāzi, zhǐ xǐhuan bǐng.",
        "de": "Als Kind mochte ich keine Ente, nur die Pfannkuchen."
      },
      {
        "speaker": "苏然",
        "zh": "现在呢？",
        "pinyin": "Xiànzài ne?",
        "de": "Und jetzt?"
      },
      {
        "speaker": "林月",
        "zh": "现在都喜欢。",
        "pinyin": "Xiànzài dōu xǐhuan.",
        "de": "Jetzt mag ich beides."
      },
      {
        "speaker": "苏然",
        "zh": "来，干杯。",
        "pinyin": "Lái, gānbēi.",
        "de": "Komm, prost."
      },
      {
        "speaker": "苏然",
        "zh": "以茶代酒。",
        "pinyin": "Yǐ chá dài jiǔ.",
        "de": "Mit Tee statt Wein."
      },
      {
        "speaker": "林月",
        "zh": "干杯。",
        "pinyin": "Gānbēi.",
        "de": "Prost."
      },
      {
        "speaker": "苏然",
        "zh": "服务员，买单。",
        "pinyin": "Fúwùyuán, mǎidān.",
        "de": "Bedienung, die Rechnung bitte."
      },
      {
        "speaker": "林月",
        "zh": "我来吧。",
        "pinyin": "Wǒ lái ba.",
        "de": "Ich zahle."
      },
      {
        "speaker": "苏然",
        "zh": "不用。我请客。",
        "pinyin": "Bú yòng. Wǒ qǐngkè.",
        "de": "Nicht nötig. Ich lade ein."
      },
      {
        "speaker": "苏然",
        "zh": "你帮了我。",
        "pinyin": "Nǐ bāng le wǒ.",
        "de": "Du hast mir geholfen."
      },
      {
        "speaker": "林月",
        "zh": "好。那下次我请你。",
        "pinyin": "Hǎo. Nà xiàcì wǒ qǐng nǐ.",
        "de": "Gut. Dann lade ich dich nächstes Mal ein."
      },
      {
        "speaker": "苏然",
        "zh": "好。",
        "pinyin": "Hǎo.",
        "de": "Abgemacht."
      }
    ],
    "studentDialog": [
      {
        "speaker": "A",
        "zh": "服务员，我要一份 ___ 。",
        "pinyin": "Fúwùyuán, wǒ yào yí fèn ___.",
        "de": "Bedienung, ich möchte eine Portion ___."
      },
      {
        "speaker": "A",
        "zh": "来两碗米饭。",
        "pinyin": "Lái liǎng wǎn mǐfàn.",
        "de": "Und zwei Schalen Reis."
      },
      {
        "speaker": "服务员",
        "zh": "好的。",
        "pinyin": "Hǎo de.",
        "de": "In Ordnung."
      },
      {
        "speaker": "A",
        "zh": "这个辣吗？",
        "pinyin": "Zhège là ma?",
        "de": "Ist das scharf?"
      },
      {
        "speaker": "服务员",
        "zh": "有一点辣。/ 不辣。",
        "pinyin": "Yǒu yìdiǎn là. / Bú là.",
        "de": "Ein bisschen scharf. / Nicht scharf."
      },
      {
        "speaker": "A",
        "zh": "很好吃。服务员，买单。",
        "pinyin": "Hěn hǎochī. Fúwùyuán, mǎidān.",
        "de": "Sehr lecker. Bedienung, die Rechnung bitte."
      },
      {
        "speaker": "服务员",
        "zh": "好的。",
        "pinyin": "Hǎo de.",
        "de": "In Ordnung."
      }
    ],
    "storyDialogTitle": "Peking-Ente essen",
    "studentDialogTitle": "Im Restaurant bestellen und bezahlen",
    "studentDialogNote": "Die Lernenden spielen Gast (A) und Bedienung (服务员). A bestellt ein Gericht und Reis, fragt nach der Schärfe und zahlt am Ende. Gericht und Getränk können frei eingesetzt werden (z. B. 北京烤鸭, 米饭, 茶).",
    "sentencePuzzles": [
      {
        "de": "Auf der Speisekarte stehen viele Gerichte.",
        "zh": "菜单上有很多菜。",
        "pinyin": "Càidān shàng yǒu hěn duō cài.",
        "tokens": [
          "菜单",
          "上",
          "有",
          "很多",
          "菜",
          "。"
        ]
      },
      {
        "de": "Und zwei Schalen Reis.",
        "zh": "来两碗米饭。",
        "pinyin": "Lái liǎng wǎn mǐfàn.",
        "tokens": [
          "来",
          "两",
          "碗",
          "米饭",
          "。"
        ]
      },
      {
        "de": "Haben wir genug bestellt?",
        "zh": "我们点的够了吗？",
        "pinyin": "Wǒmen diǎn de gòu le ma?",
        "tokens": [
          "我们",
          "点",
          "的",
          "够了",
          "吗",
          "？"
        ]
      },
      {
        "de": "Ich finde es auch sehr lecker.",
        "zh": "我也觉得很好吃。",
        "pinyin": "Wǒ yě juéde hěn hǎochī.",
        "tokens": [
          "我",
          "也",
          "觉得",
          "很",
          "好吃",
          "。"
        ]
      },
      {
        "de": "Nächstes Mal lade ich dich ein.",
        "zh": "那下次我请你。",
        "pinyin": "Nà xiàcì wǒ qǐng nǐ.",
        "tokens": [
          "那",
          "下次",
          "我",
          "请",
          "你",
          "。"
        ]
      },
      {
        "de": "Ich habe noch nie Peking-Ente gegessen.",
        "zh": "我没吃过北京烤鸭。",
        "pinyin": "Wǒ méi chīguo Běijīng kǎoyā.",
        "tokens": [
          "我",
          "没",
          "吃",
          "过",
          "北京烤鸭",
          "。"
        ]
      }
    ],
    "gapExercises": [
      {
        "prompt": "我有点 ___ 了。",
        "answer": "饿",
        "choices": [
          "饿",
          "辣",
          "茶",
          "碗"
        ],
        "solution": "我有点饿了。",
        "pinyin": "Wǒ yǒudiǎn è le.",
        "de": "Ich habe etwas Hunger."
      },
      {
        "prompt": "你 ___ 吃鸭子吗？",
        "answer": "喜欢",
        "choices": [
          "喜欢",
          "觉得",
          "推荐",
          "买单"
        ],
        "solution": "你喜欢吃鸭子吗？",
        "pinyin": "Nǐ xǐhuan chī yāzi ma?",
        "de": "Magst du Ente?"
      },
      {
        "prompt": "来两 ___ 米饭。",
        "answer": "碗",
        "choices": [
          "碗",
          "盘",
          "份",
          "杯"
        ],
        "solution": "来两碗米饭。",
        "pinyin": "Lái liǎng wǎn mǐfàn.",
        "de": "Und zwei Schalen Reis."
      },
      {
        "prompt": "这个 ___ 吗？",
        "answer": "辣",
        "choices": [
          "辣",
          "饿",
          "好吃",
          "干杯"
        ],
        "solution": "这个辣吗？",
        "pinyin": "Zhège là ma?",
        "de": "Ist das scharf?"
      },
      {
        "prompt": "我也 ___ 很好吃。",
        "answer": "觉得",
        "choices": [
          "觉得",
          "喜欢",
          "推荐",
          "要"
        ],
        "solution": "我也觉得很好吃。",
        "pinyin": "Wǒ yě juéde hěn hǎochī.",
        "de": "Ich finde es auch sehr lecker."
      },
      {
        "prompt": "那 ___ 我请你。",
        "answer": "下次",
        "choices": [
          "下次",
          "菜单",
          "买单",
          "干杯"
        ],
        "solution": "那下次我请你。",
        "pinyin": "Nà xiàcì wǒ qǐng nǐ.",
        "de": "Nächstes Mal lade ich dich ein."
      },
      {
        "prompt": "我没吃 ___ 北京烤鸭。",
        "answer": "过",
        "choices": [
          "过",
          "了",
          "很",
          "的"
        ],
        "solution": "我没吃过北京烤鸭。",
        "pinyin": "Wǒ méi chīguo Běijīng kǎoyā.",
        "de": "Ich habe noch nie Peking-Ente gegessen."
      }
    ]
  },
  {
    "id": "08",
    "title": "Familie",
    "short": "Familie und Studium, Berufe, Alter",
    "accent": "#D9A6AF",
    "textColor": "#0B1B2E",
    "vocab": [
      {
        "zh": "爸爸",
        "pinyin": "bàba",
        "de": "Vater, Papa"
      },
      {
        "zh": "妈妈",
        "pinyin": "māma",
        "de": "Mutter, Mama"
      },
      {
        "zh": "哥哥",
        "pinyin": "gēge",
        "de": "älterer Bruder"
      },
      {
        "zh": "弟弟",
        "pinyin": "dìdi",
        "de": "jüngerer Bruder"
      },
      {
        "zh": "姐姐",
        "pinyin": "jiějie",
        "de": "ältere Schwester",
        "hint": "j → dsch"
      },
      {
        "zh": "妹妹",
        "pinyin": "mèimei",
        "de": "jüngere Schwester"
      },
      {
        "zh": "老师",
        "pinyin": "lǎoshī",
        "de": "Lehrer/in",
        "hint": "sh → sch"
      },
      {
        "zh": "医生",
        "pinyin": "yīshēng",
        "de": "Arzt, Ärztin",
        "hint": "sh → sch"
      },
      {
        "zh": "学",
        "pinyin": "xué",
        "de": "lernen, studieren",
        "hint": "x → ch"
      },
      {
        "zh": "大学",
        "pinyin": "dàxué",
        "de": "Universität",
        "hint": "x → ch"
      },
      {
        "zh": "今年",
        "pinyin": "jīnnián",
        "de": "dieses Jahr"
      },
      {
        "zh": "岁",
        "pinyin": "suì",
        "de": "Jahre (alt)"
      },
      {
        "zh": "都",
        "pinyin": "dōu",
        "de": "alle, beide; jeweils",
        "hint": "d → d (nicht „du“)"
      },
      {
        "zh": "工作",
        "pinyin": "gōngzuò",
        "de": "arbeiten; Arbeit",
        "hint": "z → ds"
      },
      {
        "zh": "他们",
        "pinyin": "tāmen",
        "de": "sie (Plural)"
      },
      {
        "zh": "做",
        "pinyin": "zuò",
        "de": "machen, tun",
        "hint": "z → ds"
      },
      {
        "zh": "给",
        "pinyin": "gěi",
        "de": "geben",
        "hint": "g → harter g-Laut"
      },
      {
        "zh": "忙",
        "pinyin": "máng",
        "de": "beschäftigt, viel zu tun"
      }
    ],
    "understandingVocab": [
      {
        "zh": "工程师",
        "pinyin": "gōngchéngshī",
        "de": "Ingenieur/in",
        "hint": "ch → tsch / sh → sch"
      },
      {
        "zh": "经济",
        "pinyin": "jīngjì",
        "de": "Wirtschaft",
        "hint": "j → dsch"
      },
      {
        "zh": "设计",
        "pinyin": "shèjì",
        "de": "Design, gestalten",
        "hint": "sh → sch"
      },
      {
        "zh": "兄弟姐妹",
        "pinyin": "xiōngdì jiěmèi",
        "de": "Geschwister",
        "hint": "x → ch"
      },
      {
        "zh": "多大",
        "pinyin": "duō dà",
        "de": "wie alt"
      },
      {
        "zh": "一样",
        "pinyin": "yíyàng",
        "de": "gleich, genauso"
      },
      {
        "zh": "带",
        "pinyin": "dài",
        "de": "mitnehmen, mitbringen"
      },
      {
        "zh": "胡同",
        "pinyin": "hútòng",
        "de": "Hutong (traditionelle Gasse)"
      }
    ],
    "storyDialog": [
      {
        "speaker": "林月",
        "zh": "你在上海学什么？",
        "pinyin": "Nǐ zài Shànghǎi xué shénme?",
        "de": "Was studierst du in Shanghai?"
      },
      {
        "speaker": "苏然",
        "zh": "我学经济。",
        "pinyin": "Wǒ xué jīngjì.",
        "de": "Ich studiere Wirtschaft."
      },
      {
        "speaker": "苏然",
        "zh": "你呢？",
        "pinyin": "Nǐ ne?",
        "de": "Und du?"
      },
      {
        "speaker": "林月",
        "zh": "我在清华大学学设计。",
        "pinyin": "Wǒ zài Qīnghuá Dàxué xué shèjì.",
        "de": "Ich studiere Design an der Tsinghua-Universität."
      },
      {
        "speaker": "苏然",
        "zh": "清华大学很有名。",
        "pinyin": "Qīnghuá Dàxué hěn yǒumíng.",
        "de": "Die Tsinghua ist sehr berühmt."
      },
      {
        "speaker": "林月",
        "zh": "你今年多大？",
        "pinyin": "Nǐ jīnnián duō dà?",
        "de": "Wie alt bist du dieses Jahr?"
      },
      {
        "speaker": "苏然",
        "zh": "我今年二十一岁。",
        "pinyin": "Wǒ jīnnián èrshíyī suì.",
        "de": "Ich bin einundzwanzig."
      },
      {
        "speaker": "苏然",
        "zh": "你呢？",
        "pinyin": "Nǐ ne?",
        "de": "Und du?"
      },
      {
        "speaker": "林月",
        "zh": "我也二十一岁。",
        "pinyin": "Wǒ yě èrshíyī suì.",
        "de": "Ich bin auch einundzwanzig."
      },
      {
        "speaker": "苏然",
        "zh": "你有兄弟姐妹吗？",
        "pinyin": "Nǐ yǒu xiōngdì jiěmèi ma?",
        "de": "Hast du Geschwister?"
      },
      {
        "speaker": "林月",
        "zh": "没有。我没有兄弟姐妹。",
        "pinyin": "Méiyǒu. Wǒ méiyǒu xiōngdì jiěmèi.",
        "de": "Nein. Ich habe keine Geschwister."
      },
      {
        "speaker": "林月",
        "zh": "你呢？",
        "pinyin": "Nǐ ne?",
        "de": "Und du?"
      },
      {
        "speaker": "苏然",
        "zh": "我也没有哥哥，没有弟弟，没有姐姐，也没有妹妹。",
        "pinyin": "Wǒ yě méiyǒu gēge, méiyǒu dìdi, méiyǒu jiějie, yě méiyǒu mèimei.",
        "de": "Ich habe auch keinen großen Bruder, keinen kleinen Bruder, keine große Schwester und auch keine kleine Schwester."
      },
      {
        "speaker": "林月",
        "zh": "我们都没有兄弟姐妹。",
        "pinyin": "Wǒmen dōu méiyǒu xiōngdì jiěmèi.",
        "de": "Wir haben beide keine Geschwister."
      },
      {
        "speaker": "苏然",
        "zh": "在中国，很多学生都没有兄弟姐妹。",
        "pinyin": "Zài Zhōngguó, hěn duō xuésheng dōu méiyǒu xiōngdì jiěmèi.",
        "de": "In China haben viele Studenten keine Geschwister."
      },
      {
        "speaker": "林月",
        "zh": "你爸爸妈妈做什么工作？",
        "pinyin": "Nǐ bàba māma zuò shénme gōngzuò?",
        "de": "Was arbeiten deine Eltern?"
      },
      {
        "speaker": "苏然",
        "zh": "我爸爸是工程师，我妈妈是老师。",
        "pinyin": "Wǒ bàba shì gōngchéngshī, wǒ māma shì lǎoshī.",
        "de": "Mein Vater ist Ingenieur, meine Mutter ist Lehrerin."
      },
      {
        "speaker": "苏然",
        "zh": "他们都在上海工作。",
        "pinyin": "Tāmen dōu zài Shànghǎi gōngzuò.",
        "de": "Sie arbeiten beide in Shanghai."
      },
      {
        "speaker": "苏然",
        "zh": "你呢？",
        "pinyin": "Nǐ ne?",
        "de": "Und deine?"
      },
      {
        "speaker": "林月",
        "zh": "我妈妈是医生。",
        "pinyin": "Wǒ māma shì yīshēng.",
        "de": "Meine Mutter ist Ärztin."
      },
      {
        "speaker": "林月",
        "zh": "我爸爸也工作，很忙。",
        "pinyin": "Wǒ bàba yě gōngzuò, hěn máng.",
        "de": "Mein Vater arbeitet auch, er ist sehr beschäftigt."
      },
      {
        "speaker": "苏然",
        "zh": "你的钱是爸爸妈妈给的吗？",
        "pinyin": "Nǐ de qián shì bàba māma gěi de ma?",
        "de": "Gibt dir das Geld deine Familie?"
      },
      {
        "speaker": "林月",
        "zh": "是。我们都一样。",
        "pinyin": "Shì. Wǒmen dōu yíyàng.",
        "de": "Ja. Bei uns ist das gleich."
      },
      {
        "speaker": "林月",
        "zh": "不早了。",
        "pinyin": "Bù zǎo le.",
        "de": "Es ist schon spät."
      },
      {
        "speaker": "林月",
        "zh": "明天我带你去一个胡同，好吗？",
        "pinyin": "Míngtiān wǒ dài nǐ qù yí ge hútòng, hǎo ma?",
        "de": "Morgen nehme ich dich zu einem Hutong mit, okay?"
      },
      {
        "speaker": "苏然",
        "zh": "好。",
        "pinyin": "Hǎo.",
        "de": "Gern."
      },
      {
        "speaker": "苏然",
        "zh": "谢谢你。",
        "pinyin": "Xièxie nǐ.",
        "de": "Danke dir."
      }
    ],
    "studentDialog": [
      {
        "speaker": "A",
        "zh": "你学什么？",
        "pinyin": "Nǐ xué shénme?",
        "de": "Was studierst du?"
      },
      {
        "speaker": "B",
        "zh": "我学 ___ 。你呢？",
        "pinyin": "Wǒ xué ___. Nǐ ne?",
        "de": "Ich studiere ___. Und du?"
      },
      {
        "speaker": "A",
        "zh": "我学 ___ 。你今年多大？",
        "pinyin": "Wǒ xué ___. Nǐ jīnnián duō dà?",
        "de": "Ich studiere ___. Wie alt bist du?"
      },
      {
        "speaker": "B",
        "zh": "我今年 ___ 岁。",
        "pinyin": "Wǒ jīnnián ___ suì.",
        "de": "Ich bin ___ Jahre alt."
      },
      {
        "speaker": "A",
        "zh": "你有兄弟姐妹吗？",
        "pinyin": "Nǐ yǒu xiōngdì jiěmèi ma?",
        "de": "Hast du Geschwister?"
      },
      {
        "speaker": "B",
        "zh": "有。/ 没有，我没有兄弟姐妹。",
        "pinyin": "Yǒu. / Méiyǒu, wǒ méiyǒu xiōngdì jiěmèi.",
        "de": "Ja. / Nein, ich habe keine Geschwister."
      },
      {
        "speaker": "A",
        "zh": "你爸爸妈妈做什么工作？",
        "pinyin": "Nǐ bàba māma zuò shénme gōngzuò?",
        "de": "Was arbeiten deine Eltern?"
      },
      {
        "speaker": "B",
        "zh": "我爸爸是 ___ ，我妈妈是 ___ 。",
        "pinyin": "Wǒ bàba shì ___, wǒ māma shì ___.",
        "de": "Mein Vater ist ___, meine Mutter ist ___."
      }
    ],
    "storyDialogTitle": "Über Familie und Studium",
    "studentDialogTitle": "Über Familie, Studium und Alter sprechen",
    "studentDialogNote": "Die Lernenden (A und B) lernen sich kennen und fragen nach Studium, Alter und Familie. Fach, Alter und Berufe können frei eingesetzt werden (z. B. 经济, 设计; 工程师, 老师, 医生).",
    "sentencePuzzles": [
      {
        "de": "Ich studiere Design an der Tsinghua-Universität.",
        "zh": "我在清华大学学设计。",
        "pinyin": "Wǒ zài Qīnghuá Dàxué xué shèjì.",
        "tokens": [
          "我",
          "在",
          "清华大学",
          "学",
          "设计",
          "。"
        ]
      },
      {
        "de": "Wie alt bist du dieses Jahr?",
        "zh": "你今年多大？",
        "pinyin": "Nǐ jīnnián duō dà?",
        "tokens": [
          "你",
          "今年",
          "多大",
          "？"
        ]
      },
      {
        "de": "Hast du Geschwister?",
        "zh": "你有兄弟姐妹吗？",
        "pinyin": "Nǐ yǒu xiōngdì jiěmèi ma?",
        "tokens": [
          "你",
          "有",
          "兄弟姐妹",
          "吗",
          "？"
        ]
      },
      {
        "de": "Wir haben beide keine Geschwister.",
        "zh": "我们都没有兄弟姐妹。",
        "pinyin": "Wǒmen dōu méiyǒu xiōngdì jiěmèi.",
        "tokens": [
          "我们",
          "都",
          "没有",
          "兄弟姐妹",
          "。"
        ]
      },
      {
        "de": "Was arbeiten deine Eltern?",
        "zh": "你爸爸妈妈做什么工作？",
        "pinyin": "Nǐ bàba māma zuò shénme gōngzuò?",
        "tokens": [
          "你",
          "爸爸妈妈",
          "做",
          "什么",
          "工作",
          "？"
        ]
      },
      {
        "de": "Mein Vater ist Ingenieur, meine Mutter ist Lehrerin.",
        "zh": "我爸爸是工程师，我妈妈是老师。",
        "pinyin": "Wǒ bàba shì gōngchéngshī, wǒ māma shì lǎoshī.",
        "tokens": [
          "我",
          "爸爸",
          "是",
          "工程师",
          "，",
          "我",
          "妈妈",
          "是",
          "老师",
          "。"
        ]
      }
    ],
    "gapExercises": [
      {
        "prompt": "我在清华大学 ___ 设计。",
        "answer": "学",
        "choices": [
          "学",
          "做",
          "给",
          "忙"
        ],
        "solution": "我在清华大学学设计。",
        "pinyin": "Wǒ zài Qīnghuá Dàxué xué shèjì.",
        "de": "Ich studiere Design an der Tsinghua-Universität."
      },
      {
        "prompt": "我今年二十一 ___ 。",
        "answer": "岁",
        "choices": [
          "岁",
          "学",
          "都",
          "做"
        ],
        "solution": "我今年二十一岁。",
        "pinyin": "Wǒ jīnnián èrshíyī suì.",
        "de": "Ich bin einundzwanzig."
      },
      {
        "prompt": "你有 ___ 吗？",
        "answer": "兄弟姐妹",
        "choices": [
          "兄弟姐妹",
          "工程师",
          "大学",
          "老师"
        ],
        "solution": "你有兄弟姐妹吗？",
        "pinyin": "Nǐ yǒu xiōngdì jiěmèi ma?",
        "de": "Hast du Geschwister?"
      },
      {
        "prompt": "我们 ___ 没有兄弟姐妹。",
        "answer": "都",
        "choices": [
          "都",
          "也",
          "很",
          "在"
        ],
        "solution": "我们都没有兄弟姐妹。",
        "pinyin": "Wǒmen dōu méiyǒu xiōngdì jiěmèi.",
        "de": "Wir haben beide keine Geschwister."
      },
      {
        "prompt": "我爸爸是 ___ 。",
        "answer": "工程师",
        "choices": [
          "工程师",
          "医生",
          "老师",
          "学生"
        ],
        "solution": "我爸爸是工程师。",
        "pinyin": "Wǒ bàba shì gōngchéngshī.",
        "de": "Mein Vater ist Ingenieur."
      },
      {
        "prompt": "你爸爸妈妈 ___ 什么工作？",
        "answer": "做",
        "choices": [
          "做",
          "给",
          "学",
          "带"
        ],
        "solution": "你爸爸妈妈做什么工作？",
        "pinyin": "Nǐ bàba māma zuò shénme gōngzuò?",
        "de": "Was arbeiten deine Eltern?"
      }
    ]
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
