// Chinesisch festigen – Zeichen-Bausteine (App-Ebene, getrennt vom Buch)
// Zweck: Schreibtraining zeichenbasiert mit Dedup. Jedes Zeichen kommt nur EINMAL
// über alle Wörter vor. Pinyin steht hier silbenweise pro Zeichen (topics.js hat
// nur das Wort-Pinyin), damit Mehrzeichenwörter nicht mismatchen.
//
// Jedes Zeichen hat eine eigene Übersetzung (de). word/wordPy/wordDe = das Wort,
// in dem das Zeichen im Kapitel vorkommt (für „ganzes Wort über dem Zeichen",
// aktuelles Zeichen farbig, und für den Hinweis „Teil von …").
// review:true = Bedeutung von der/dem Beijing-Kontakt prüfen lassen
//   (v. a. gebundene/grammatische Silben, deren Einzelbedeutung wackelig ist).

window.CF_BAUSTEINE = {
  "01": {
    order: ["我","你","是","不","也","从","吗","呢","叫","看","来","好","手","机","人","名","字","什","么","哪","国","德","北","京","上","海","对","起","没","关","系","谢","再","见"],
    chars: {
      "我": { py:"wǒ",   de:"ich",                    word:"我",     wordPy:"wǒ",         wordDe:"ich" },
      "你": { py:"nǐ",   de:"du",                     word:"你",     wordPy:"nǐ",         wordDe:"du" },
      "是": { py:"shì",  de:"sein (ist)",             word:"是",     wordPy:"shì",        wordDe:"sein" },
      "不": { py:"bù",   de:"nicht",                  word:"不",     wordPy:"bù",         wordDe:"nicht" },
      "也": { py:"yě",   de:"auch",                   word:"也",     wordPy:"yě",         wordDe:"auch" },
      "从": { py:"cóng", de:"von, aus",               word:"从",     wordPy:"cóng",       wordDe:"von, aus" },
      "吗": { py:"ma",   de:"Fragepartikel (Ja/Nein-Frage)", word:"吗", wordPy:"ma",     wordDe:"Fragepartikel" },
      "呢": { py:"ne",   de:"Fragepartikel („und …?“)",      word:"你呢", wordPy:"nǐ ne", wordDe:"Und du?" },
      "叫": { py:"jiào", de:"heißen, rufen",          word:"叫",     wordPy:"jiào",       wordDe:"heißen" },
      "看": { py:"kàn",  de:"schauen, sehen",         word:"看",     wordPy:"kàn",        wordDe:"schauen" },
      "来": { py:"lái",  de:"kommen",                 word:"来",     wordPy:"lái",        wordDe:"kommen" },
      "好": { py:"hǎo",  de:"gut",                    word:"好",     wordPy:"hǎo",        wordDe:"gut" },
      "手": { py:"shǒu", de:"Hand",                   word:"手机",   wordPy:"shǒujī",     wordDe:"Handy" },
      "机": { py:"jī",   de:"Maschine, Gerät",        word:"手机",   wordPy:"shǒujī",     wordDe:"Handy" },
      "人": { py:"rén",  de:"Mensch, Person",         word:"人",     wordPy:"rén",        wordDe:"Mensch" },
      "名": { py:"míng", de:"Name",                   word:"名字",   wordPy:"míngzi",     wordDe:"Name" },
      "字": { py:"zì",   de:"(Schrift-)Zeichen, Wort",word:"名字",   wordPy:"míngzi",     wordDe:"Name" },
      "什": { py:"shén", de:"Frage-Silbe",            word:"什么",   wordPy:"shénme",     wordDe:"was", review:true },
      "么": { py:"me",   de:"Frage-/Suffixsilbe",     word:"什么",   wordPy:"shénme",     wordDe:"was", review:true },
      "哪": { py:"nǎ",   de:"welche/r/s (Frage)",     word:"哪",     wordPy:"nǎ",         wordDe:"welche/r/s" },
      "国": { py:"guó",  de:"Land",                   word:"国",     wordPy:"guó",        wordDe:"Land" },
      "德": { py:"dé",   de:"Tugend",                 word:"德国",   wordPy:"Déguó",      wordDe:"Deutschland", review:true },
      "北": { py:"běi",  de:"Norden",                 word:"北京",   wordPy:"Běijīng",    wordDe:"Beijing" },
      "京": { py:"jīng", de:"Hauptstadt",             word:"北京",   wordPy:"Běijīng",    wordDe:"Beijing" },
      "上": { py:"shàng",de:"oben, auf",              word:"上海",   wordPy:"Shànghǎi",   wordDe:"Shanghai" },
      "海": { py:"hǎi",  de:"Meer",                   word:"上海",   wordPy:"Shànghǎi",   wordDe:"Shanghai" },
      "对": { py:"duì",  de:"richtig",                word:"对不起", wordPy:"duìbuqǐ",    wordDe:"Entschuldigung" },
      "起": { py:"qǐ",   de:"(sich) erheben, aufstehen", word:"对不起", wordPy:"duìbuqǐ", wordDe:"Entschuldigung", review:true },
      "没": { py:"méi",  de:"nicht (haben)",          word:"没关系", wordPy:"méi guānxi", wordDe:"macht nichts" },
      "关": { py:"guān", de:"schließen; betreffen",   word:"没关系", wordPy:"méi guānxi", wordDe:"macht nichts", review:true },
      "系": { py:"xì",   de:"verbinden; Bezug",       word:"没关系", wordPy:"méi guānxi", wordDe:"macht nichts", review:true },
      "谢": { py:"xiè",  de:"danken",                 word:"谢谢",   wordPy:"xièxie",     wordDe:"danke" },
      "再": { py:"zài",  de:"wieder, noch einmal",    word:"再见",   wordPy:"zàijiàn",    wordDe:"Auf Wiedersehen" },
      "见": { py:"jiàn", de:"sehen, treffen",         word:"再见",   wordPy:"zàijiàn",    wordDe:"Auf Wiedersehen" }
    }
  }
};
