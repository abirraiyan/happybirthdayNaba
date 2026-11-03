// Naba's Birthday Configuration & Editable Content
export const BIRTHDAY_CONFIG = {
  recipientName: "Naba",
  nickname: "Little Sunshine",
  dateOfBirth: "2014-12-15", // 15 December 2014
  turningAge: 12,
  senderName: "Your Big Brother ❤️",
  relationship: "Big Bondhu / Brother",
  passportId: "HW-20141215-NABA",
  
  // The Letter displayed in the secret animated envelope
  letter: {
    greeting: "Dear Naba,",
    body: [
      "Happy Birthday, little sunshine!",
      "I hope your day is filled with laughter, happiness, music, and everything that makes you smile.",
      "Keep dreaming big, being kind, and shining in your own special way.",
      "No matter how old you get, you'll always be my little sister.",
      "I love you loads!"
    ],
    closing: "Lots of love,",
    signature: "Your Big Brother ❤️"
  },

  // 3 Mystery Gift Boxes for Mission 05: The Secret Birthday Gift
  giftBoxes: [
    {
      id: 1,
      title: "A Melody of Joy 🎶",
      teaser: "A musical sparkle to brighten your smile!",
      illustration: "🌈",
      color: "from-amber-200 to-yellow-300",
      border: "border-yellow-400",
      content: {
        headline: "May Your Days Always Be Full of Rhythm!",
        text: "Just like J-Hope brings boundless energy and smiles to millions of people, you bring that exact sunshine into our family every single day. Never lose your bright laugh!",
        sparkleEmoji: "☀️🎵"
      }
    },
    {
      id: 2,
      title: "A Jar of Good Wishes ✨",
      teaser: "Packed with endless luck and big dreams!",
      illustration: "🫙",
      color: "from-purple-200 to-pink-300",
      border: "border-purple-400",
      content: {
        headline: "To A Year of Big Dreams & Magic!",
        text: "May this new year of your life bring exciting discoveries, great health, sweet friendships, and all the goals you wish to achieve. You are capable of amazing things, Naba!",
        sparkleEmoji: "✨🌟"
      }
    },
    {
      id: 3,
      title: "Brother's Secret Vault 🗝️",
      teaser: "The most special brother-sister promise!",
      illustration: "💖",
      color: "from-sky-200 to-indigo-300",
      border: "border-sky-400",
      content: {
        headline: "Always In Your Corner!",
        text: "No matter where life takes you or how tall you grow, know that your big brother always has your back. I'll always be here to support you, listen to you, and cheer for you!",
        sparkleEmoji: "💜🤝"
      }
    }
  ],

  // Scrapbook Memory Wall (Editable photos, notes, dates & captions)
  memories: [
    {
      id: 1,
      title: "Our Favorite Day ☀️",
      date: "Spring Memories",
      tag: "Bondhu Moments",
      caption: "That day we laughed so hard our stomachs hurt! You've always brought endless sunshine to the house.",
      sticker: "🌈",
      color: "bg-amber-100",
      rotation: "-rotate-2",
      emoji: "📸🌻"
    },
    {
      id: 2,
      title: "Future Dance Captain 💃",
      date: "Grooving All Day",
      tag: "Hobi Energy",
      caption: "Practicing K-pop dance moves in the living room like a true main dancer! Your rhythm is unbeatable, Naba.",
      sticker: "💜",
      color: "bg-pink-100",
      rotation: "rotate-3",
      emoji: "🎧✨"
    },
    {
      id: 3,
      title: "The Sweetest Little Sister 🍓",
      date: "Family Time",
      tag: "Always Smiling",
      caption: "Watching you grow up into such a kind, talented, and thoughtful young lady makes me the proudest brother.",
      sticker: "⭐",
      color: "bg-purple-100",
      rotation: "-rotate-1",
      emoji: "🍰🎀"
    },
    {
      id: 4,
      title: "Hope World Adventure 🎨",
      date: "Birthday 2026",
      tag: "Special Gift",
      caption: "A little world built with love just for you. Never stop dreaming big, little sunshine!",
      sticker: "☀️",
      color: "bg-sky-100",
      rotation: "rotate-2",
      emoji: "🚀💎"
    }
  ],

  // Daily Happiness Fortunes (Clickable Lucky Star)
  fortunes: [
    "Your smile has the exact same radiant warmth as J-Hope's sunshine! Keep smiling! ☀️",
    "A wonderful surprise is heading your way today. Keep your eyes open and heart full! ✨",
    "Believe in yourself as much as your big brother believes in you — you are capable of magic! 💜",
    "Dance like nobody is watching, laugh until your cheeks hurt, and stay curious! 🎶",
    "Today is filled with 100% pure happiness and lucky stars just for Naba! 🌟",
    "You are someone's hope, someone's joy, and a true blessing to our family! 🌸",
    "May your music be loud, your dreams big, and your birthday year the best one yet! 🎂"
  ],

  // Mystery Gift Machine Collectibles (Virtual rewards)
  collectibles: [
    { id: 'c1', name: 'Golden Hope Mic', icon: '🎤', rarity: 'Legendary', desc: 'Sings with pure golden sunshine energy!' },
    { id: 'c2', name: 'Rainbow Daisy Flower', icon: '🌸', rarity: 'Rare', desc: 'Takashi Murakami inspired smiling flower!' },
    { id: 'c3', name: 'Hope World Cassette', icon: '📼', rarity: 'Special', desc: 'Loaded with upbeat Daydream and Airplane beats!' },
    { id: 'c4', name: 'Princess Sunshine Crown', icon: '👑', rarity: 'Mythic', desc: 'Worn only by the true birthday champion!' },
    { id: 'c5', name: 'Sparkling Purple Heart', icon: '💜', rarity: 'Common', desc: 'A token of eternal brotherly love & BTS love!' },
    { id: 'c6', name: 'Strawberry Boba Tea', icon: '🧋', rarity: 'Sweet', desc: 'Deliciously refreshing treat for Naba & pet!' },
    { id: 'c7', name: 'Magic Crystal Fragment', icon: '💎', rarity: 'Epic', desc: 'Glows with the restored light of Hobi World!' },
    { id: 'c8', name: 'Birthday Cake Slice', icon: '🍰', rarity: 'Festive', desc: 'A yummy sweet slice packed with birthday wishes!' }
  ],

  // Finale configuration
  finale: {
    title: "HAPPY BIRTHDAY, NABAAA! 🎂",
    subheading: "You did it! You brought the sunshine back to Hobi World.",
    motto: "Keep smiling, keep dancing, and keep being your amazing self. ☀️💜",
    totalMissionsGoal: 5,
    maxStarsPossible: 110,
  }
};

// Calculate exact dynamic age from DOB (e.g. 15 December 2014)
export function calculateAge(dobString = "2014-12-15") {
  const birthDate = new Date(dobString);
  const today = new Date();
  let age = today.getFullYear() - birthDate.getFullYear();
  const m = today.getMonth() - birthDate.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  return age;
}
