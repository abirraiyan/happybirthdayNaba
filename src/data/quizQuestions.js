// Reliable Fisher-Yates shuffle algorithm
export function fisherYatesShuffle(array) {
  const result = [...array];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

export const QUIZ_QUESTIONS = [
  {
    id: 1,
    question: "What is J-Hope's real Korean birth name?",
    correctAnswer: "Jung Hoseok",
    options: [
      { id: "1_a", text: "Jung Hoseok", isCorrect: true },
      { id: "1_b", text: "Kim Namjoon", isCorrect: false },
      { id: "1_c", text: "Min Yoongi", isCorrect: false },
      { id: "1_d", text: "Park Jimin", isCorrect: false },
    ],
    explanation: "J-Hope's real name is Jung Hoseok (정호석), born on February 18, 1994, in Gwangju, South Korea!",
  },
  {
    id: 2,
    question: "What is the famous greeting J-Hope always proudly shares with ARMY?",
    correctAnswer: "I'm your hope, you're my hope, I'm J-Hope!",
    options: [
      { id: "2_a", text: "I'm your hope, you're my hope, I'm J-Hope!", isCorrect: true },
      { id: "2_b", text: "Worldwide handsome here!", isCorrect: false },
      { id: "2_c", text: "I purple you forever and ever!", isCorrect: false },
      { id: "2_d", text: "Let's get this party started!", isCorrect: false },
    ],
    explanation: "His iconic sunshine intro: 'I'm your hope, you're my hope, I'm J-Hope!' brings instant smiles worldwide!",
  },
  {
    id: 3,
    question: "What was the title of J-Hope's vibrant debut solo mixtape released in 2018?",
    correctAnswer: "Hope World",
    options: [
      { id: "3_a", text: "Hope World", isCorrect: true },
      { id: "3_b", text: "Jack In The Box", isCorrect: false },
      { id: "3_c", text: "Mono", isCorrect: false },
      { id: "3_d", text: "Agust D", isCorrect: false },
    ],
    explanation: "'Hope World' was released on March 1, 2018, featuring colourful hits like 'Daydream' and 'Airplane'!",
  },
  {
    id: 4,
    question: "Before his debut with BTS, which famous underground dance crew was Hoseok a member of in Gwangju?",
    correctAnswer: "Neuron",
    options: [
      { id: "4_a", text: "Neuron", isCorrect: true },
      { id: "4_b", text: "Urban Dance Lab", isCorrect: false },
      { id: "4_c", text: "B-Boy Kingz", isCorrect: false },
      { id: "4_d", text: "Street Stars", isCorrect: false },
    ],
    explanation: "Hoseok gained early underground dance fame as part of the street dance crew 'Neuron' in Gwangju!",
  },
  {
    id: 5,
    question: "In 2022, J-Hope made history as the first South Korean artist to headline which major US music festival?",
    correctAnswer: "Lollapalooza (Hobipalooza)",
    options: [
      { id: "5_a", text: "Lollapalooza (Hobipalooza)", isCorrect: true },
      { id: "5_b", text: "Coachella", isCorrect: false },
      { id: "5_c", text: "Glastonbury", isCorrect: false },
      { id: "5_d", text: "Bonnaroo", isCorrect: false },
    ],
    explanation: "Fans lovingly renamed it 'Hobipalooza' as he delivered a phenomenal, history-making 70-minute headline set!",
  },
  {
    id: 6,
    question: "What concept theme inspired J-Hope's critically acclaimed 2022 solo studio album 'Jack In The Box'?",
    correctAnswer: "Greek mythology of Pandora's Box and artistic rebirth",
    options: [
      { id: "6_a", text: "Greek mythology of Pandora's Box and artistic rebirth", isCorrect: true },
      { id: "6_b", text: "A retro arcade gaming tournament", isCorrect: false },
      { id: "6_c", text: "A quiet acoustic coffee shop journal", isCorrect: false },
      { id: "6_d", text: "An underwater deep sea exploration", isCorrect: false },
    ],
    explanation: "'Jack In The Box' drew artistic inspiration from Pandora's box, exploring raw passion, ambition, and burning hope!",
  },
  {
    id: 7,
    question: "Which catchy 2019 cross-cultural collaboration did J-Hope release with singer Becky G?",
    correctAnswer: "Chicken Noodle Soup",
    options: [
      { id: "7_a", text: "Chicken Noodle Soup", isCorrect: true },
      { id: "7_b", text: "Butter Fly", isCorrect: false },
      { id: "7_c", text: "More", isCorrect: false },
      { id: "7_d", text: "Sweet Sunshine", isCorrect: false },
    ],
    explanation: "'Chicken Noodle Soup' paid tribute to the Harlem hip-hop classic and featured multilingual verses and viral choreography!",
  },
  {
    id: 8,
    question: "What is the docuseries and companion OST album where J-Hope reconnects with street dancers around the globe?",
    correctAnswer: "Hope on the Street",
    options: [
      { id: "8_a", text: "Hope on the Street", isCorrect: true },
      { id: "8_b", text: "Dance With Hoseok", isCorrect: false },
      { id: "8_c", text: "In the SOOP", isCorrect: false },
      { id: "8_d", text: "Burn the Stage", isCorrect: false },
    ],
    explanation: "'Hope on the Street' documented J-Hope meeting street dance masters in Osaka, Paris, New York, Seoul, and Gwangju!",
  },
  {
    id: 9,
    question: "Which of the following tracks is a fiery, guitar-heavy lead single from 'Jack In The Box'?",
    correctAnswer: "MORE",
    options: [
      { id: "9_a", text: "MORE", isCorrect: true },
      { id: "9_b", text: "Daydream", isCorrect: false },
      { id: "9_c", text: "Blue Side", isCorrect: false },
      { id: "9_d", text: "Airplane", isCorrect: false },
    ],
    explanation: "'MORE' showcased J-Hope's powerful rock and 90s old-school hip-hop edge, stunning music critics!",
  },
  {
    id: 10,
    question: "What is the name of J-Hope's adorable white Shih Tzu dog who often melts fans' hearts?",
    correctAnswer: "Mickey",
    options: [
      { id: "10_a", text: "Mickey", isCorrect: true },
      { id: "10_b", text: "Yeontan", isCorrect: false },
      { id: "10_c", text: "Bam", isCorrect: false },
      { id: "10_d", text: "Monie", isCorrect: false },
    ],
    explanation: "Mickey is Hoseok's beloved, stylish family dog who loves cute barrettes and gentle naps!",
  },
  {
    id: 11,
    question: "Which solo song on the BTS album 'Wings' was an emotional tribute dedicated to his mother?",
    correctAnswer: "MAMA",
    options: [
      { id: "11_a", text: "MAMA", isCorrect: true },
      { id: "11_b", text: "Trivia: Just Dance", isCorrect: false },
      { id: "11_c", text: "First Love", isCorrect: false },
      { id: "11_d", text: "Lie", isCorrect: false },
    ],
    explanation: "'MAMA' is a vibrant, gospel-infused tribute thanking his mother for always supporting his dream to dance and make music!",
  },
  {
    id: 12,
    question: "What is J-Hope's official role and title within BTS regarding performances?",
    correctAnswer: "Main Dancer and Performance Leader",
    options: [
      { id: "12_a", text: "Main Dancer and Performance Leader", isCorrect: true },
      { id: "12_b", text: "Visual Leader", isCorrect: false },
      { id: "12_c", text: "Acoustic Guitarist", isCorrect: false },
      { id: "12_d", text: "Lead Ballad Vocalist", isCorrect: false },
    ],
    explanation: "J-Hope is BTS's main dancer and dance captain, known for his precision, guidance, and effortless stage charisma!",
  },
  {
    id: 13,
    question: "Which colorful flower with a happy smiling face is widely associated with J-Hope's artistic aesthetic?",
    correctAnswer: "Takashi Murakami Rainbow Flower",
    options: [
      { id: "13_a", text: "Takashi Murakami Rainbow Flower", isCorrect: true },
      { id: "13_b", text: "Blue Rose", isCorrect: false },
      { id: "13_c", text: "Sunflower with sunglasses", isCorrect: false },
      { id: "13_d", text: "White Orchid", isCorrect: false },
    ],
    explanation: "Hobi is famous for his love of contemporary pop art, especially bright rainbow smiley flowers that match his energy!",
  },
  {
    id: 14,
    question: "What is the title of the introspective outro track on 'Hope World' that was later expanded into a full song?",
    correctAnswer: "Blue Side",
    options: [
      { id: "14_a", text: "Blue Side", isCorrect: true },
      { id: "14_b", text: "Base Line", isCorrect: false },
      { id: "14_c", text: "Hangsan", isCorrect: false },
      { id: "14_d", text: "Piece of Peace", isCorrect: false },
    ],
    explanation: "'Blue Side' was later released as a deeply emotional, ambient 3-minute full track on the 3rd anniversary of Hope World!",
  },
  {
    id: 15,
    question: "In March 2023, J-Hope released a touching farewell single dedicated to fans featuring hip-hop legend J. Cole. What is it called?",
    correctAnswer: "on the street",
    options: [
      { id: "15_a", text: "on the street", isCorrect: true },
      { id: "15_b", text: "Equal Sign", isCorrect: false },
      { id: "15_c", text: "Arson", isCorrect: false },
      { id: "15_d", text: "Lock / Unlock", isCorrect: false },
    ],
    explanation: "'on the street (with J. Cole)' was a heartfelt lo-fi hip-hop gift celebrating his roots and his love for listeners!",
  },
  {
    id: 16,
    question: "Why is J-Hope affectionately called the 'Sunshine' of BTS?",
    correctAnswer: "Because of his radiant smile, endless positivity, and uplifting energy",
    options: [
      { id: "16_a", text: "Because of his radiant smile, endless positivity, and uplifting energy", isCorrect: true },
      { id: "16_b", text: "Because he only performs during the daytime", isCorrect: false },
      { id: "16_c", text: "Because he wrote a meteorology report", isCorrect: false },
      { id: "16_d", text: "Because he has bright yellow hair every year", isCorrect: false },
    ],
    explanation: "His bright smile, comforting words, and joyful laughter bring golden warmth to everyone around him, just like sunshine!",
  }
];

// Prepares a new quiz session with Fisher-Yates shuffled questions AND shuffled options per question
export function prepareQuizSession(questions = QUIZ_QUESTIONS, count = 15) {
  // 1. Shuffle questions list
  const selectedQuestions = fisherYatesShuffle(questions).slice(0, count);

  // 2. Independently shuffle the 4 options for each question without mutating source
  return selectedQuestions.map((q) => {
    return {
      ...q,
      options: fisherYatesShuffle(q.options),
    };
  });
}

export const getFanRanking = (score) => {
  if (score >= 13) {
    return {
      title: "HOBI SUPERFAN 🌟",
      badge: "Crown of Sunshine",
      desc: "Incredible! Your knowledge of Hoseok's artistry, dance, and music is top-tier Hobi stan level!",
      color: "text-amber-500",
      bg: "bg-amber-100",
    };
  } else if (score >= 10) {
    return {
      title: "HOPE WORLD EXPERT 🎶",
      badge: "Gold Cassette",
      desc: "Outstanding! You know your Hope World and Jack In The Box history like a true music lover!",
      color: "text-purple-600",
      bg: "bg-purple-100",
    };
  } else if (score >= 7) {
    return {
      title: "SUNSHINE FAN ☀️",
      badge: "Warm Ray",
      desc: "Great job, sunshine! You have lots of Hobi love in your heart and great taste in music!",
      color: "text-orange-500",
      bg: "bg-orange-100",
    };
  } else {
    return {
      title: "FUTURE HOBI SUPERFAN 💜",
      badge: "Sprouting Seedling",
      desc: "A lovely effort! Every day in Hobi World is a chance to discover more groovy beats and dance moves!",
      color: "text-pink-600",
      bg: "bg-pink-100",
    };
  }
};
