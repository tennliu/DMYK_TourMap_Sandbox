// MRT labels transcribed from user-supplied Taipei Metro route map PDFs (2026):
// Routemap-TWEN.pdf, Routemap-JP.pdf, Routemap-KR.pdf.
// Only verified station names are included in ja/ko. Missing translations fall back to English.
// Use station codes rather than display names, so transfer stations can share one label.
window.DMYK_MRT_LOCALE_DATA = {
  supported: ['zh','en','ja','ko'],
  fallback: 'en',
  lines: {
    BR:{zh:'文湖線',en:'Wenhu Line',ja:'文湖線',ko:'원후선'},
    R:{zh:'淡水信義線',en:'Tamsui-Xinyi Line',ja:'淡水信義線',ko:'단수이-신이선'},
    G:{zh:'松山新店線',en:'Songshan-Xindian Line',ja:'松山新店線',ko:'송산-신뎬선'},
    O:{zh:'中和新蘆線',en:'Zhonghe-Xinlu Line',ja:'中和新蘆線',ko:'중허-신루선'},
    BL:{zh:'板南線',en:'Bannan Line',ja:'板南線',ko:'반난선'},
    Y:{zh:'環狀線',en:'Circular Line',ja:'環状線',ko:'순환선'}
  },
  stations: {
    BL09:{ja:'江子翠',ko:'장쯔추이'},
    BL11:{ja:'西門',ko:'시먼'},G12:{ja:'西門',ko:'시먼'},
    BL12:{ja:'台北駅',ko:'타이베이역'},R10:{ja:'台北駅',ko:'타이베이역'},
    BL14:{ja:'忠孝新生',ko:'중샤오 신성'},O07:{ja:'忠孝新生',ko:'중샤오 신성'},
    R07:{ja:'東門',ko:'동먼'},O06:{ja:'東門',ko:'동먼'},
    G10:{ja:'中正紀念堂',ko:'중정 기념당'},R08:{ja:'中正紀念堂',ko:'중정 기념당'},
    G09:{ja:'古亭',ko:'구팅'},O05:{ja:'古亭',ko:'구팅'},
    BL10:{ja:'龍山寺',ko:'룽산사'},
    BL07:{ja:'板橋',ko:'반차오'}
  }
};
