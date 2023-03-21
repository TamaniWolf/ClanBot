
require('dotenv').config;

class LanguageCodeConvert {
    static languageCode(code) {
        return new Promise((resolve, reject) => {
            try {
                let langCode = '';
                if (code === 'id') { langCode = 'Indonesian / Bahasa Indonesia'; };
                if (code === 'da') { langCode = 'Danish / Dansk'; };
                if (code === 'de') { langCode = 'German / Deutsch'; };
                if (code === 'en-GB') { langCode = 'English, UK'; };
                if (code === 'en-US') { langCode = 'English, US'; };
                if (code === 'es-ES') { langCode = 'Spanish / Español*a'; };
                if (code === 'fr') { langCode = 'French / Français'; };
                if (code === 'hr') { langCode = 'Croatian / Hrvatski'; };
                if (code === 'it') { langCode = 'Italian / Italiano'; };
                if (code === 'lt') { langCode = 'Lithuanian / Lietuvių Kalba'; };
                if (code === 'hu') { langCode = 'Hungarian / Magyar Nyelv'; };
                if (code === 'nl') { langCode = 'Dutch / Nederlands'; };
                if (code === 'no') { langCode = 'Norwegian / Norsk'; };
                if (code === 'pl') { langCode = 'Polish / Polski'; };
                if (code === 'pt-BR') { langCode = 'Brazilian Portuguese / Português Brasileiro'; };
                if (code === 'ro') { langCode = 'Romanian / limba română'; };
                if (code === 'fi') { langCode = 'Finnish / Suomi'; };
                if (code === 'sv-SE') { langCode = 'Swedish / Svenska'; };
                if (code === 'vi') { langCode = 'Vietnamese / Tiếng Việt'; };
                if (code === 'tr') { langCode = 'Turkish / Türkçe'; };
                if (code === 'cs') { langCode = 'Czech / čeština'; };
                if (code === 'el') { langCode = 'Greek / Ελληνικά'; };
                if (code === 'bg') { langCode = 'Bulgarian / български'; };
                if (code === 'ru') { langCode = 'Russian / Pусский язык'; };
                if (code === 'uk') { langCode = 'Ukrainian / Yкраї́нська мо́ва'; };
                if (code === 'hi') { langCode = 'Hindi / हिंदी'; };
                if (code === 'th') { langCode = 'Thai / ภาษาไทย'; };
                if (code === 'zh-CN') { langCode = 'Chinese / 现代标准汉语'; };
                if (code === 'ja') { langCode = 'Japanese / 日本語'; };
                if (code === 'zh-TW') { langCode = 'Taiwan / 臺語'; };
                if (code === 'ko') { langCode = 'South Korean / 한국어'; };
                const langNew = langCode;
                resolve(langNew || '');
            } catch(err) {
                reject(err);
            };
        });
    };
};

module.exports = LanguageCodeConvert;

/**
    1   id     Indonesian             Bahasa Indonesia     : 
    2   da     Danish                 Dansk                : 
    3   de     German                 Deutsch              : 
    4   en-GB  English, UK            English, UK          : 
    5   en-US  English, US            English, US          :
    6   es-ES  Spanish                Español              : 
    7   fr     French                 Français             : 
    8   hr     Croatian               Hrvatski             : 
    9   it     Italian                Italiano             : 
    10  lt     Lithuanian             Lietuviškai          : 
    11  hu     Hungarian              Magyar               : 
    12  nl     Dutch                  Nederlands           : 
    13  no     Norwegian              Norsk                : 
    14  pl     Polish                 Polski               : 
    15  pt-BR  Portuguese, Brazilian  Português do Brasil  : 
    16  ro     Romanian, Romania      Română               : 
    17  fi     Finnish                Suomi                : 
    18  sv-SE  Swedish                Svenska              : 
    19  vi     Vietnamese             Tiếng Việt           : 
    20  tr     Turkish                Türkçe               : 
    21  cs     Czech                  Čeština              : 
    22  el     Greek                  Ελληνικά             : 
    23  bg     Bulgarian              български            : 
    24  ru     Russian                Pусский              : 
    25  uk     Ukrainian              Українська           : 
    26  hi     Hindi                  हिन्दी                 : 
    27  th     Thai                   ไทย                  : 
    28  zh-CN  Chinese, China         中文                 : 
    29  ja     Japanese               日本語                : 
    30  zh-TW  Chinese, Taiwan        繁體中文              : 
    31  ko     Korean                 한국어                : 
 */