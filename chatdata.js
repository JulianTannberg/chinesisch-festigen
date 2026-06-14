// Chat-Gespräche als verzweigter Knoten-Graph. Nur Wortschatz aus Kapitel 1.
// {name} = gespeicherter Name. accept/Eingabe werden normalisiert verglichen (Satzzeichen egal).
window.CF_CHAT = {
  "01": {
    partners: [
      { key: "linyue", name: "林月", pinyin: "Lín Yuè", avatar: "avatars/linyue.jpg" },
      { key: "suran",  name: "苏然", pinyin: "Sū Rán", avatar: "avatars/suran.jpg" }
    ],
    convo: {
      linyue: {
        start: "greet",
        nodes: {
          greet: {
            ask: [{ zh: "你好！", pinyin: "Nǐ hǎo!", de: "Hallo!" }],
            options: [
              { chip: "你好！", accept: ["你好", "你好林月"], next: "name" },
              { chip: "嗨！",   accept: ["嗨", "嗨林月"], next: "name" }
            ]
          },
          name: {
            ask: [{ zh: "你叫什么名字？", pinyin: "Nǐ jiào shénme míngzi?", de: "Wie heißt du?" }],
            options: [
              { chip: "我叫{name}。", accept: ["我叫{name}", "我是{name}", "{name}"], voicePrefix: ["我叫", "我是"], next: "origin" },
              { chip: "我叫{name}，你呢？", accept: ["我叫{name}你呢"], voicePrefix: ["我叫", "我是"], next: "origin" }
            ]
          },
          origin: {
            ask: [
              { zh: "我叫林月。", pinyin: "Wǒ jiào Lín Yuè.", de: "Ich heiße Lín Yuè." },
              { zh: "你是北京人吗？", pinyin: "Nǐ shì Běijīng rén ma?", de: "Bist du aus Beijing?" }
            ],
            options: [
              { chip: "我不是北京人。", accept: ["我不是北京人", "不是", "不"], next: "whichCountry" },
              { chip: "我是德国人。", accept: ["我是德国人", "我不是北京人我是德国人", "不我是德国人", "不是我是德国人"],
                reply: [{ zh: "啊，德国人！欢迎来北京！", pinyin: "Ā, Déguó rén! Huānyíng lái Běijīng!", de: "Ah, Deutsche! Willkommen in Beijing!" }], next: "loc" },
              { chip: "我从德国来。", accept: ["我从德国来", "我不是北京人我从德国来"],
                reply: [{ zh: "啊，德国人！欢迎来北京！", pinyin: "Ā, Déguó rén! Huānyíng lái Běijīng!", de: "Ah, Deutsche! Willkommen in Beijing!" }], next: "loc" }
            ]
          },
          whichCountry: {
            ask: [{ zh: "那你是哪国人？", pinyin: "Nà nǐ shì nǎ guó rén?", de: "Welches Land bist du dann?" }],
            options: [
              { chip: "我是德国人。", accept: ["我是德国人", "德国人", "德国"],
                reply: [{ zh: "啊，德国人！欢迎来北京！", pinyin: "Ā, Déguó rén! Huānyíng lái Běijīng!", de: "Ah, Deutsche! Willkommen in Beijing!" }], next: "loc" },
              { chip: "我从德国来。", accept: ["我从德国来"],
                reply: [{ zh: "啊，德国人！欢迎来北京！", pinyin: "Ā, Déguó rén! Huānyíng lái Běijīng!", de: "Ah, Deutsche! Willkommen in Beijing!" }], next: "loc" }
            ]
          },
          loc: {
            ask: [{ zh: "你在北京吗？", pinyin: "Nǐ zài Běijīng ma?", de: "Bist du in Beijing?" }],
            options: [
              { chip: "我在北京。", accept: ["我在北京", "是", "是的", "在", "我在"],
                reply: [{ zh: "我也在北京。", pinyin: "Wǒ yě zài Běijīng.", de: "Ich bin auch in Beijing." }], next: "bye" },
              { chip: "我不在北京。", accept: ["我不在北京", "不在", "我不在"], next: "whereAreYou" },
              { chip: "请问，地铁在哪里？", accept: ["请问地铁在哪里", "地铁在哪里", "地铁在哪儿", "我在北京请问地铁在哪里"],
                reply: [{ zh: "地铁在那儿。", pinyin: "Dìtiě zài nàr.", de: "Die U-Bahn ist da drüben." }], next: "bye" }
            ]
          },
          whereAreYou: {
            ask: [{ zh: "那你在哪里？", pinyin: "Nà nǐ zài nǎlǐ?", de: "Wo bist du dann?" }],
            options: [
              { chip: "我在德国。", accept: ["我在德国", "在德国", "德国"], next: "comeBeijing" },
              { chip: "我在上海。", accept: ["我在上海", "在上海", "上海"],
                reply: [{ zh: "啊，上海！", pinyin: "Ā, Shànghǎi!", de: "Ah, Shanghai!" }], next: "comeBeijing" }
            ]
          },
          comeBeijing: {
            ask: [{ zh: "你来北京吗？", pinyin: "Nǐ lái Běijīng ma?", de: "Kommst du nach Beijing?" }],
            options: [
              { chip: "我来北京。", accept: ["我来北京", "来", "我来", "来北京"],
                reply: [{ zh: "啊，好！欢迎！", pinyin: "Ā, hǎo! Huānyíng!", de: "Ah, schön! Willkommen!" }], next: "bye" },
              { chip: "我不来北京。", accept: ["我不来北京", "不来", "我不来"],
                reply: [{ zh: "啊，好。", pinyin: "Ā, hǎo.", de: "Ah, okay." }], next: "bye" }
            ]
          },
          bye: {
            ask: [{ zh: "那，再见！", pinyin: "Nà, zàijiàn!", de: "Dann, tschüss!" }],
            options: [
              { chip: "再见！", accept: ["再见"], next: null },
              { chip: "谢谢，再见！", accept: ["谢谢再见", "谢谢你再见"], next: null }
            ]
          }
        }
      },
      suran: {
        start: "greet",
        nodes: {
          greet: {
            ask: [{ zh: "你好！", pinyin: "Nǐ hǎo!", de: "Hallo!" }],
            options: [
              { chip: "你好！", accept: ["你好", "你好苏然"], next: "name" },
              { chip: "嗨！",   accept: ["嗨", "嗨苏然"], next: "name" }
            ]
          },
          name: {
            ask: [{ zh: "你叫什么名字？", pinyin: "Nǐ jiào shénme míngzi?", de: "Wie heißt du?" }],
            options: [
              { chip: "我叫{name}。", accept: ["我叫{name}", "我是{name}", "{name}"], voicePrefix: ["我叫", "我是"], next: "origin" },
              { chip: "我叫{name}，你呢？", accept: ["我叫{name}你呢"], voicePrefix: ["我叫", "我是"], next: "origin" }
            ]
          },
          origin: {
            ask: [
              { zh: "我叫苏然。", pinyin: "Wǒ jiào Sū Rán.", de: "Ich heiße Sū Rán." },
              { zh: "你是德国人吗？", pinyin: "Nǐ shì Déguó rén ma?", de: "Bist du Deutsche?" }
            ],
            reply: [{ zh: "啊，德国人！", pinyin: "Ā, Déguó rén!", de: "Ah, Deutsche!" }],
            options: [
              { chip: "我是德国人。", accept: ["我是德国人", "是", "是的", "是我是德国人"], next: "from" },
              { chip: "是的，我是德国人。", accept: ["是的我是德国人"], next: "from" }
            ]
          },
          from: {
            ask: [
              { zh: "我不是北京人，我从上海来。", pinyin: "Wǒ bú shì Běijīng rén, wǒ cóng Shànghǎi lái.", de: "Ich bin nicht aus Beijing, ich komme aus Shanghai." },
              { zh: "你在北京吗？", pinyin: "Nǐ zài Běijīng ma?", de: "Bist du in Beijing?" }
            ],
            options: [
              { chip: "我在北京。", accept: ["我在北京", "是", "是的", "在", "我在"],
                reply: [{ zh: "我也在北京。", pinyin: "Wǒ yě zài Běijīng.", de: "Ich bin auch in Beijing." }], next: "bye" },
              { chip: "我不在北京。", accept: ["我不在北京", "不在", "我不在"], next: "whereAreYou" },
              { chip: "请问，地铁在哪里？", accept: ["请问地铁在哪里", "地铁在哪里", "地铁在哪儿"],
                reply: [{ zh: "地铁在那儿。", pinyin: "Dìtiě zài nàr.", de: "Die U-Bahn ist da drüben." }], next: "bye" }
            ]
          },
          whereAreYou: {
            ask: [{ zh: "那你在哪里？", pinyin: "Nà nǐ zài nǎlǐ?", de: "Wo bist du dann?" }],
            options: [
              { chip: "我在德国。", accept: ["我在德国", "在德国", "德国"], next: "comeBeijing" },
              { chip: "我在上海。", accept: ["我在上海", "在上海", "上海"],
                reply: [{ zh: "啊，上海！我也是！", pinyin: "Ā, Shànghǎi! Wǒ yě shì!", de: "Ah, Shanghai! Ich auch!" }], next: "comeBeijing" }
            ]
          },
          comeBeijing: {
            ask: [{ zh: "你来北京吗？", pinyin: "Nǐ lái Běijīng ma?", de: "Kommst du nach Beijing?" }],
            options: [
              { chip: "我来北京。", accept: ["我来北京", "来", "我来", "来北京"],
                reply: [{ zh: "啊，好！", pinyin: "Ā, hǎo!", de: "Ah, schön!" }], next: "bye" },
              { chip: "我不来北京。", accept: ["我不来北京", "不来", "我不来"],
                reply: [{ zh: "啊，好。", pinyin: "Ā, hǎo.", de: "Ah, okay." }], next: "bye" }
            ]
          },
          bye: {
            ask: [{ zh: "那，再见！", pinyin: "Nà, zàijiàn!", de: "Dann, tschüss!" }],
            options: [
              { chip: "再见！", accept: ["再见"], next: null },
              { chip: "谢谢，再见！", accept: ["谢谢再见", "谢谢你再见"], next: null }
            ]
          }
        }
      }
    }
  }
};
