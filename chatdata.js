// Chat-Gespräche (geführt, mit vielen Antwortvarianten).
// {name} wird durch den gespeicherten Übungsnamen ersetzt.
// accept: normalisierte Vergleichstexte (Satzzeichen egal). chip: Anzeige/Vorschlag.
// reply: Antwort des Partners auf diese Option. ask: Partnerzeilen zu Rundenbeginn.
// WICHTIG: nur Wortschatz aus Kapitel 1.
window.CF_CHAT = {
  "01": {
    partners: [
      { key: "linyue", name: "林月", pinyin: "Lín Yuè", tag: "aus Beijing" },
      { key: "suran",  name: "苏然", pinyin: "Sū Rán", tag: "aus Shanghai" }
    ],
    convo: {
      linyue: [
        {
          ask: [{ zh: "你好！", pinyin: "Nǐ hǎo!", de: "Hallo!" }],
          options: [
            { chip: "你好！", accept: ["你好", "你好林月"] },
            { chip: "嗨！",   accept: ["嗨", "嗨林月"] }
          ]
        },
        {
          ask: [{ zh: "你叫什么名字？", pinyin: "Nǐ jiào shénme míngzi?", de: "Wie heißt du?" }],
          options: [
            { chip: "我叫{name}。", accept: ["我叫{name}", "我是{name}", "{name}"] },
            { chip: "我叫{name}，你呢？", accept: ["我叫{name}你呢"] }
          ]
        },
        {
          ask: [
            { zh: "我叫林月。", pinyin: "Wǒ jiào Lín Yuè.", de: "Ich heiße Lín Yuè." },
            { zh: "你是北京人吗？", pinyin: "Nǐ shì Běijīng rén ma?", de: "Bist du aus Beijing?" }
          ],
          reply: [{ zh: "啊，德国人！欢迎来北京！", pinyin: "Ā, Déguó rén! Huānyíng lái Běijīng!", de: "Ah, Deutsche! Willkommen in Beijing!" }],
          options: [
            { chip: "我不是北京人，我是德国人。", accept: ["我不是北京人我是德国人", "我是德国人", "不是我是德国人", "不我是德国人", "我不是北京人"] },
            { chip: "我从德国来。", accept: ["我从德国来", "我不是北京人我从德国来"] }
          ]
        },
        {
          ask: [{ zh: "你在北京吗？", pinyin: "Nǐ zài Běijīng ma?", de: "Bist du in Beijing?" }],
          options: [
            { chip: "请问，地铁在哪里？", accept: ["我在北京请问地铁在哪里", "请问地铁在哪里", "地铁在哪里", "地铁在哪儿"],
              reply: [{ zh: "地铁在那儿。", pinyin: "Dìtiě zài nàr.", de: "Die U-Bahn ist da drüben." }] },
            { chip: "我在北京。", accept: ["我在北京", "是", "是的", "在", "我在"],
              reply: [{ zh: "我也在北京。", pinyin: "Wǒ yě zài Běijīng.", de: "Ich bin auch in Beijing." }] }
          ]
        },
        {
          ask: [{ zh: "那，再见！", pinyin: "Nà, zàijiàn!", de: "Dann, tschüss!" }],
          options: [
            { chip: "再见！", accept: ["再见"] },
            { chip: "谢谢，再见！", accept: ["谢谢再见", "谢谢你再见"] }
          ]
        }
      ],
      suran: [
        {
          ask: [{ zh: "你好！", pinyin: "Nǐ hǎo!", de: "Hallo!" }],
          options: [
            { chip: "你好！", accept: ["你好", "你好苏然"] },
            { chip: "嗨！",   accept: ["嗨", "嗨苏然"] }
          ]
        },
        {
          ask: [{ zh: "你叫什么名字？", pinyin: "Nǐ jiào shénme míngzi?", de: "Wie heißt du?" }],
          options: [
            { chip: "我叫{name}。", accept: ["我叫{name}", "我是{name}", "{name}"] },
            { chip: "我叫{name}，你呢？", accept: ["我叫{name}你呢"] }
          ]
        },
        {
          ask: [
            { zh: "我叫苏然。", pinyin: "Wǒ jiào Sū Rán.", de: "Ich heiße Sū Rán." },
            { zh: "你是德国人吗？", pinyin: "Nǐ shì Déguó rén ma?", de: "Bist du Deutsche?" }
          ],
          reply: [{ zh: "啊，德国人！", pinyin: "Ā, Déguó rén!", de: "Ah, Deutsche!" }],
          options: [
            { chip: "我是德国人。", accept: ["我是德国人", "是", "是的", "是我是德国人"] },
            { chip: "不是，我是德国人。", accept: ["不是我是德国人", "不我是德国人"] }
          ]
        },
        {
          ask: [
            { zh: "我不是北京人，我从上海来。", pinyin: "Wǒ bú shì Běijīng rén, wǒ cóng Shànghǎi lái.", de: "Ich bin nicht aus Beijing, ich komme aus Shanghai." },
            { zh: "你在北京吗？", pinyin: "Nǐ zài Běijīng ma?", de: "Bist du in Beijing?" }
          ],
          options: [
            { chip: "请问，地铁在哪里？", accept: ["请问地铁在哪里", "地铁在哪里", "我在北京请问地铁在哪里"],
              reply: [{ zh: "地铁在那儿。", pinyin: "Dìtiě zài nàr.", de: "Die U-Bahn ist da drüben." }] },
            { chip: "我在北京。", accept: ["我在北京", "是", "是的", "在"],
              reply: [{ zh: "我也在北京。", pinyin: "Wǒ yě zài Běijīng.", de: "Ich bin auch in Beijing." }] }
          ]
        },
        {
          ask: [{ zh: "那，再见！", pinyin: "Nà, zàijiàn!", de: "Dann, tschüss!" }],
          options: [
            { chip: "再见！", accept: ["再见"] },
            { chip: "谢谢，再见！", accept: ["谢谢再见", "谢谢你再见"] }
          ]
        }
      ]
    }
  }
};
