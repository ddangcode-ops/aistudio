import { Book, Milestone, Aspiration, RetroProject, MealData } from './types';

export const MILESTONES: Milestone[] = [
  {
    period: '2024.03 - 2024.06',
    title: '교내 알고리즘 경진대회 대상',
    description: '복잡한 데이터 처리 속도를 30% 개선하는 효율적인 정렬 알고리즘을 제안하여 기술적 창의성을 인정받았습니다.',
    iconName: 'code',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCJcXLHh_Xk71vERD7yrPzqAPnQhQSJcxplNhp4pk1mA8mhJL_kei-PH8mFs43-LL68idAV_yJVM8Z8zqkmpl1T5rUs3lePjRb8Tf3BOeC1AMTbdnYAGXCpkm5zRLrAaYnUKY_o7-YAl5XVsK07Wn07g30JPqBKXWdxIiF2xMPSfvFmbrFQiUT_Zzsk4Wbk-fcap_C77wx-bI6tdgZhQNuijKiu4sy0jT6vI47ETuKeCzqPtrjAbBxzjbpL332WREM0nuIl8kS3DKU',
  },
  {
    period: '2023.09 - 2023.12',
    title: '청소년 IT 멘토링 프로젝트',
    description: '지역 사회 초등학생들을 대상으로 기초 코딩 원리를 교육하며 기술 공유의 가치와 커뮤니케이션 능력을 배양했습니다.',
    iconName: 'groups',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD6oH8CzOJiarIhxwdpv9GiUKn_2qrNiRSchYMdr_J-zUaHtRiYpE3-5NDHDDoWypkkMiskkxh9hBCEYQBeH-_vz-ufsuQx9ygut2HRFYQA6bzlz-LXUwfnQXu46UpWNTfuVOY1XUKukddxRMuwFZudUO2ei1cbTGElLcdLeP2rA3DsSo1lvumoJRs9dL7lBq52bfxLScB8tu4LhyukIy-DouIsmInua-Fahnv4cMfA2OTprr4aGHQ34XBCeSm-m57hNDoy9xYcCFc',
  },
  {
    period: '2023.03 - 2023.07',
    title: 'AI 기반 스마트 스쿨 연구',
    description: '학습 효율을 높이기 위한 학생 맞춤형 챗봇의 프로토타입을 제작하고 사용성 테스트를 진행한 소규모 연구 프로젝트입니다.',
    iconName: 'smart_toy',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAnvoi6tk8Ey9nEsEn99sF6ANPZDFLQ99DTwmtpP6KkWC7A3eW4oWhj3qWMLeqI6G2YtaXUkxA1tjb_sGmqV7-DHG3OQhOU-D8AT6yt7GJgqvZJIM09DHJISGFXI-Rq1zTbeDBY7ZZ34Qcvvd6XWSaYX1frIWpYjqZXZxyBH9zMugk5nJ-HnSgSSoVPRmIUWGkQste59HUgbPHOa50ME-pbbzMsvYX0ETSjdIQQz5kLQeXxjZc7JrZQH6F3Ll-bMSgEmD_sEjc1GL4',
  },
];

export const ASPIRATIONS: Aspiration[] = [
  {
    title: 'Academic Depth',
    description: '대학교 진학 후 전공 지식을 깊이 있게 탐구하고 학부생 연구 기회를 통해 이론과 실무의 균형을 맞추겠습니다.',
    iconName: 'school',
  },
  {
    title: 'Global Network',
    description: '글로벌 오픈 소스 프로젝트에 기여하며 전 세계 엔지니어들과 소통하고 협업하는 글로벌 감각을 키우겠습니다.',
    iconName: 'language',
  },
  {
    title: 'Ethical Tech',
    description: '기술적 완성도를 넘어 윤리적 책임감을 갖춘 개발자로서 사회적 약자를 돕는 따뜻한 기술을 고민하겠습니다.',
    iconName: 'volunteer_activism',
  },
];

export const BOOKS: Book[] = [
  {
    id: 'demian',
    title: '데미안',
    subtitle: '나 자신에게로 이르는 길을 찾는 여정',
    author: '헤르만 헤세',
    publisher: '민음사',
    publishDate: '2009.01.20',
    rating: 5.0,
    category: 'humanities',
    categoryLabel: '인문',
    coverImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD96VNK4HEfcrz3n33s9WYqyO_rQN5wSDR2jwWwah_es4LfKaRQYwSHDXYSqGoSvdqRfnQkIxJXvEnEJESnWocmniP7gVfij16vtm6s6hauV4W9oa8d6wJjxxpKm_hTkxtlzIl7fPbw03VEPw7jMtIcY8e0iHnIh112BBA-W8F4F4keS0YT_GfTVq2I1Dy_DeKqGb47zMnpwzdp5vh8LWfgbvT0LDG5fpt_l-LRfU01dws3GtxiR1Ee0JL7czeEsmJbT8KC5uW-MW9K',
    detailImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDBTJXsS0oGpjPkhNbfRgDJsEZghchaBmW2CKqIIEp9Fk1C3KzardVHGSATd3y2DEsBcWzreWEhqDILGwXnpoCDpOjcd4ZceBMtMKiB2psrgJlS8618BLG04lGTzpQO6Kf-IHLs0xDRnq59vdR7RpQEMumDx1iysNaeh0tEfsv0Jv2spnEs8cFR940sKKaBbDfiNAPgqh_bomXcdu2E1V64lz2Ngu6CU_rT2_6Z48kFoa8P1Jr1Gci45Z8WGCvy1-y0Fk_Wk6gSZqka',
    summary: '나 자신에게로 이르는 길을 찾는 여정을 담은 고전. 성장의 고통과 알을 깨고 나오는 용기에 대해 깊이 성찰하게 합니다.',
    review: {
      title: '생각의 깊이를 더하는 기록: 데미안',
      quote: '한 사람 한 사람의 삶은 자기 자신에게로 이르는 길이다. 길의 시도이며 좁은 통로의 암시이다. 일찍이 그 어떤 사람도 완전히 자기 자신이 되어본 적은 없었다.',
      quoteSource: '본문 중에서',
      paragraphs: [
        '에밀 싱클레어의 내면적 성장을 다룬 이 고전은 단순히 소년의 성장을 넘어, 우리가 진정한 자신을 마주하기 위해 깨뜨려야 할 \'알\'이 무엇인지를 질문합니다. "새는 알에서 나오려고 투쟁한다. 알은 세계이다. 태어나려는 자는 하나의 세계를 깨뜨려야 한다."라는 구절은 제 학창 시절 중 가장 큰 충격과 영감을 주었던 문장입니다.',
        '데미안이라는 인물을 통해 싱클레어는 선과 악이라는 이분법적인 세계관에서 벗어나 아브락사스라는, 빛과 어둠이 공존하는 더 넓은 세계를 인지하게 됩니다. 이는 제가 학업과 진로를 고민하며 겪었던 수많은 갈등들이 단순히 해결해야 할 \'문제\'가 아니라, 저만의 세계를 구축하기 위한 필연적인 \'투쟁\'임을 깨닫게 해주었습니다.',
        '책을 덮으며 저는 제 자신에게 질문을 던졌습니다. 지금 내가 안주하고 있는 안락한 알은 무엇인가? 그리고 그 알을 깨고 나갔을 때 마주할 나의 진실한 모습은 어떤 것인가? 헤르만 헤세는 타인의 기대를 충족시키는 삶이 아닌, 철저히 고독하게 자신에게로 침잠할 때 비로소 진정한 자아를 발견할 수 있다고 말합니다.'
      ],
      tags: ['자아성찰', '성장소설', '헤르만헤세', '독서기록']
    }
  },
  {
    id: 'ai-future',
    title: 'AI의 미래',
    subtitle: '인공지능이 가져올 사회적 변화와 윤리적 고찰',
    author: '맥스 테그마크',
    publisher: '동아시아',
    publishDate: '2020.11.25',
    rating: 4.0,
    category: 'science',
    categoryLabel: '과학',
    coverImage: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&w=400&q=80',
    detailImage: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&w=800&q=80',
    summary: '인공지능이 가져올 사회적 변화와 윤리적 고찰에 대한 기술 서적. 기술의 발전이 인간성을 어떻게 정의하는지를 조망합니다.',
    review: {
      title: '공존의 기술을 디자인하다: AI의 미래',
      quote: '인간 지능을 초월하는 초인공지능의 등장은 공상과학이 아닌, 우리가 지금 당장 대비해야 하는 필연적 미래이다.',
      quoteSource: '본문 중에서',
      paragraphs: [
        '본 서적은 개발자와 과학자뿐만 아니라 현대 사회를 살아가는 지성인 모두에게 AI 시대를 맞이하는 통찰을 제공합니다. 저자는 단순한 낙관이나 비관을 넘어, AI 라이프 3.0 시대를 능동적으로 통제하고 설계하기 위한 윤리적 프레임워크가 필수적임을 주창합니다.',
        '소프트웨어 엔지니어를 꿈꾸는 저로서는, 완벽한 알고리즘을 짜는 것보다 그 알고리즘이 사회에 가져올 순기능과 부작용을 사전에 모델링하고 인간 존엄을 해치지 않도록 설계하는 것이 얼마나 영예롭고 책임감 있는 직무인지를 느꼈습니다.',
        '인공지능 기술이 소수 빅테크 기업에 집중되지 않고 민주화될 수 있는 지속 가능한 거버넌스와, 오픈 소스 정신의 연대가 인간 가치를 수호하는 핵심 나침반임을 전공 탐색 레포트를 통해 깊이 분석해보았습니다.'
      ],
      tags: ['인공지능', '기술윤리', '맥스테그마크', '미래설계']
    }
  },
  {
    id: 'little-prince',
    title: '어린 왕자',
    subtitle: '관계의 소중함과 길들임의 책임',
    author: '앙투안 드 생텍쥐페리',
    publisher: '열린책들',
    publishDate: '2015.10.20',
    rating: 5.0,
    category: 'novel',
    categoryLabel: '소설',
    coverImage: 'https://images.unsplash.com/photo-1474932430478-367dbb6832c1?auto=format&fit=crop&w=400&q=80',
    detailImage: 'https://images.unsplash.com/photo-1474932430478-367dbb6832c1?auto=format&fit=crop&w=800&q=80',
    summary: '어른이 되어 다시 읽은 어린 왕자는 관계의 소중함과 \'길들임\'의 책임에 대해 전혀 다른 무게로 다가왔습니다.',
    review: {
      title: '보이지 않는 것의 위대함: 어린 왕자',
      quote: '내 비밀은 아주 간단해. 오직 마음으로만 보아야 잘 보인다는 거야. 가장 중요한 것은 눈에 보이지 않는단다.',
      quoteSource: '본문 중에서',
      paragraphs: [
        '어릴 때 단순한 동화로만 읽었던 어린 왕자를 고등학생의 관점에서 다시 읽었을 때 그 의미는 완전히 새로웠습니다. 여우와의 관계 속에서 나타나는 \'길들임\'은 깊은 상호 책임감과 우정을 설명합니다. 일상에서 상대를 진심으로 배려하고 시간을 들여 정성을 쏟는 것이 진정한 관계 형성의 본질임을 배웁니다.',
        '학문적 성취에만 내몰리기 쉬운 치열한 경쟁 환경 속에서, 성장이란 단지 성적이나 통계를 높이는 성취뿐만 아니라, 내 곁에 있는 동료와 선후배들과 진심 어린 관계로 소통하는 사회적 성장도 병행되어야 함을 일깨워주었습니다.',
        '본 서적은 화려한 겉보기 지표보다 사람의 온기가 담긴 보이지 않는 마음에 대한 가치를 추구하고, 따뜻하며 인문적 품격을 지닌 글로벌 리더로 자라기 위한 다짐을 다지는 계기가 되었습니다.'
      ],
      tags: ['문학치유', '관계', '성텍쥐페리', '자아성찰']
    }
  },
  {
    id: 'clean-code',
    title: '클린 코드',
    subtitle: '가독성과 유지보수성이 뛰어난 소스코드 작성 가이드',
    author: '로버트 C. 마틴',
    publisher: '인사이트',
    publishDate: '2013.12.24',
    rating: 4.0,
    category: 'science',
    categoryLabel: '기술',
    coverImage: 'https://images.unsplash.com/photo-1542831371-29b0f74f9713?auto=format&fit=crop&w=400&q=80',
    detailImage: 'https://images.unsplash.com/photo-1542831371-29b0f74f9713?auto=format&fit=crop&w=800&q=80',
    summary: '좋은 코드란 무엇인가에 대한 본질적인 답을 제시하는 책. 가독성과 유지보수 수의 중요성을 코딩 습관에 적용해봅니다.',
    review: {
      title: '예술적인 코드를 만드는 습관: 클린 코드',
      quote: '깨끗한 코드가 주는 이점은 단순히 읽기 좋은 것을 넘어, 소프트웨어의 수명을 늘리고 버그 비용을 획기적으로 줄이는 것이다.',
      quoteSource: '본문 중에서',
      paragraphs: [
        '단일 책임 원칙, 의미 있는 변수명, 주석의 최소화 등 실무 프로그래밍 가이드가 세세히 담겨 있어, 혼자 코딩하던 시절의 주먹구구식 개발 방식을 뼈저리게 성찰할 수 있었습니다. 소프트웨어를 만든다는 것은 단순히 컴파일러를 실행시켜서 기계를 움직이는 것이 아니라 다른 사람, 동료들과 텍스트로 대화하는 프로세스임을 이 책은 가르쳐 줍니다.',
        '교내 축제 도우미 웹 어플리케이션을 제작할 때, 이 책에서 배운 네이밍 규칙과 리팩토링 기법을 적용한 결과 동료 개발자들과 손쉽게 코드 리뷰를 진행할 수 있었고, 기말 시험 기간 동안 바빴음에도 협업 효율을 두 배 가까이 향상시킬 수 있었습니다.',
        '완벽한 기법만큼이나 지속적인 보이스카우트 규칙("캠핑장은 처음 올 때보다 깨끗하게 치워라")을 가슴에 품고, 제가 작성한 코드가 세상의 질서를 한층 더 정돈하기를 바라는 장인정신에 대한 열망이 생겼습니다.'
      ],
      tags: ['코딩관행', '로버트마틴', '소프트웨어공학', '협업']
    }
  },
  {
    id: 'west-art-history',
    title: '서양 미술사',
    subtitle: '원시 동굴 벽화부터 모던 아트까지의 위대한 흐름',
    author: '에른스트 곰브리치',
    publisher: '예경',
    publishDate: '2013.07.10',
    rating: 5.0,
    category: 'art',
    categoryLabel: '예술',
    coverImage: 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=400&q=80',
    detailImage: 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=800&q=80',
    summary: '인간의 역사를 예술의 시각에서 풀어낸 방대한 기록. 시대를 넘나드는 미적 가치의 변화를 한눈에 조망할 수 있습니다.',
    review: {
      title: '미적 패러다임의 혁명: 서양 미술사',
      quote: '미술이라는 것은 사실상 존재하지 않는다. 다만 미술가들이 있을 뿐이다.',
      quoteSource: '본문 중에서',
      paragraphs: [
        '곰브리치의 서양 미술사는 시대의 필요와 가치관이 예술에 어떻게 반영되어 왔는지를 탄탄하게 스토리텔링 형식으로 직조해냅니다. 르네상스의 수학적 투시도법, 인상파의 주관적인 빛의 해석 등은 공학적 기술과 마찬가지로 세상을 더 구체적으로 묘사하고자 했던 당대 예술가들의 치열한 발명품들이었습니다.',
        '이는 코딩과 UI/UX 디자인에서도 완벽하게 투사됩니다. 현대 소프트웨어의 인터페이스 또한 미적으로 아름다울 뿐만 아니라 사용자의 인지 메커니즘을 편안하게 돕도록 과학과 철학이 어우러져 있어야 함을 이 책을 통해 확인했습니다.',
        '공학과 예술은 별개의 영역이 아니라 한 뿌리에서 출발한 인류 창조적 에너지의 양대 날개임을 느끼며, 장차 테크와 아트가 유기적으로 융합된 감성적 프로덕트 개발을 지향하게 되었습니다.'
      ],
      tags: ['예술학', '곰브리치', '역사관', '융합사고']
    }
  },
  {
    id: 'sapiens',
    title: '사피엔스',
    subtitle: '변방의 유인원에서 지구의 지배자가 되기까지',
    author: '유발 하라리',
    publisher: '김영사',
    publishDate: '2015.11.23',
    rating: 5.0,
    category: 'humanities',
    categoryLabel: '사회',
    coverImage: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=400&q=80',
    detailImage: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=800&q=80',
    summary: '인류의 기원과 발전을 거시적인 관점에서 분석한 통찰력 있는 책. 우리의 존재가 우연의 산물임을 인정하는 학술적 교양서.',
    review: {
      title: '상상의 질서가 가져온 권력: 사피엔스',
      quote: '인간이 지구를 지배하게 된 비결은 오직 침팬지 무리와 달리 수많은 타인과 유연하게 협업하고, 상상 속 이야기를 믿기 때문이다.',
      quoteSource: '본문 중에서',
      paragraphs: [
        '역사, 생물학, 고고학, 심리학 등을 가로지르는 하라리의 독창적인 통찰은 매우 예리합니다. 인류가 이룩한 농업 혁명이 실제 개별 인간들에게는 오히려 더 묶여 있는 고된 노동을 의미했다는 해석, 돈, 국가, 주식회사, 종교는 모두 상상의 공동체적 질서라는 주장은 신선한 깨달음을 주었습니다.',
        '가상 자산과 클라우드 네트워크라는 무형의 가치를 다루는 IT 개발자 역시, 본질적으로 인류가 공유할 새로운 \'가상의 상상 공간\'과 비즈니스 질서를 건설하는 것과 동일함을 추론해볼 수 있었습니다.',
        '장기적인 인류의 진보 앞에 인공지능과 유전공학이 가져올 호모 사피엔스의 미래는 어떤 변곡점을 맞이할 것인가에 대한 진지한 숙명적 철학을 교양 토론 동아리에서 심도 깊게 공유하는 밑거름이 된 명저입니다.'
      ],
      tags: ['거시정치', '유발하라리', '인류발전', '문명사']
    }
  }
];

export const RETRO_PROJECTS: RetroProject[] = [
  {
    id: 'pixel-odyssey',
    title: 'Pixel Odyssey: The Lost Code',
    category: 'ACTION ADVENTURE',
    subtitle: '현실 세계와 디지털 공간을 오가는 횡스크롤 퍼즐 게임',
    description: '현실 세계와 디지털 공간을 오가는 횡스크롤 퍼즐 게임입니다. 다양한 자바스크립트 물리 엔진을 직접 구현하여 부드러운 조작감을 완성했습니다.',
    tags: ['JavaScript', 'Canvas API', 'Level Design'],
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCJj-7b55tzj-MGWj1ujep8fGB3gbatbbJ7Qtkru2JNUlJKb1wa4KqDUycyBoReqPmQwIbzX0Hk2bcmu1GK1u1azEbPdDfNDVsviFHXbT5CwyHmImuGABFZXs9v-jUVobO9ekxwa_M5KTiwibUr8VPxYVf01WaU-MrXJYTQfoFIWg1SRVU91JcJ-NgIPNhfytVfSkckod3KYcbMwwVzcjysE7X2mZAieOZxYW-LBwtsK_4QJGoUy4KOuTTHv3-nWQqUBMzFHFcUdtE',
  },
  {
    id: 'neon-runner',
    title: 'Neon Runner',
    category: 'RHYTHM ACTION DIMENSION',
    subtitle: 'Endless rhythmic dash game',
    description: '리듬에 맞춰 장애물을 피하는 하이 스코어 지향형 아케이드 게임입니다. 가볍고 중독성 있는 노이즈 생성 비주얼과 사운드트랙 컨트롤이 특장점입니다.',
    tags: ['TypeScript', 'WebGL', 'Rhythm Dev'],
    image: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=400&q=80',
  },
  {
    id: 'algorithm-poker',
    title: 'Algorithm Poker',
    category: 'Strategy & Psychology',
    subtitle: '확률 통계를 활용한 심리전 게임',
    description: '확률 통계를 활용한 심리전 게임으로, 승리 확률을 계산하는 AI 시뮬레이터를 탑재하여 실시간 베팅 힌트를 얻을 수 있는 프로젝트입니다.',
    tags: ['React', 'Math Probability', 'Local State'],
    image: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=400&q=80',
  }
];

export const MEAL_PROJECT_HISTORY: MealData[] = [
  {
    date: '2024-06-03',
    dateStr: '청라국제고등학교 • 2024년 6월 3일 월요일',
    calories: 785,
    satisfaction: 91,
    nutrition: { carbs: 124, protein: 40, fat: 14 },
    menu: [
      { name: '차조밥', type: '곡류' },
      { name: '맑은콩나물국', type: '육류/국' },
      { name: '안동찜닭', type: '육류/메인' },
      { name: '두부부침 & 양념간장', type: '두부/기타' },
      { name: '배추김치', type: '채소' },
      { name: '수박', type: '과일' }
    ]
  },
  {
    date: '2024-06-04',
    dateStr: '청라국제고등학교 • 2024년 6월 4일 화요일',
    calories: 856,
    satisfaction: 94,
    nutrition: { carbs: 135, protein: 48, fat: 12 },
    menu: [
      { name: '발아현미밥', type: '곡류' },
      { name: '쇠고기미역국', type: '육류/국' },
      { name: '제육볶음', type: '육류/메인' },
      { name: '수제돈가스', type: '튀김/메인' },
      { name: '배추김치', type: '채소' },
      { name: '조각사과', type: '과일' }
    ]
  },
  {
    date: '2024-06-05',
    dateStr: '청라국제고등학교 • 2024년 6월 5일 수요일',
    calories: 812,
    satisfaction: 89,
    nutrition: { carbs: 128, protein: 42, fat: 16 },
    menu: [
      { name: '오색야채볶음밥', type: '곡류/일식/중식' },
      { name: '맑은계란국', type: '탕/국' },
      { name: '탄두리치킨구이', type: '육류/메인' },
      { name: '단호박샐러드', type: '야채/샐러드' },
      { name: '깍두기', type: '채소' },
      { name: '바나나', type: '과일' }
    ]
  },
  {
    date: '2024-06-06',
    dateStr: '청라국제고등학교 • 2024년 6월 6일 목요일',
    calories: 760,
    satisfaction: 92,
    nutrition: { carbs: 110, protein: 38, fat: 18 },
    menu: [
      { name: '보리밥', type: '곡류' },
      { name: '김치찌개', type: '찌개/국' },
      { name: '소불고기', type: '육류/메인' },
      { name: '감자채볶음', type: '반찬' },
      { name: '단무지무침', type: '채소' },
      { name: '요구르트', type: '유제품' }
    ]
  },
];
