/**
 * 100 Reasons I Love You - Azra Baby
 * 
 * Each reason is written with love, warmth, humor, and sincerity.
 * Feel free to customize any of these texts or categories to add your own personal memories!
 */

const REASONS = [
  {
    id: 1,
    tag: "Your Warmth",
    text: "The radiant warmth of your smile—the kind that can instantly dissolve the heaviest clouds on my hardest days."
  },
  {
    id: 2,
    tag: "Sweet Quirks",
    text: "How impossibly cute you look when you're sleepy, wrapped like a cozy blanket burrito with only your little nose peeking out."
  },
  {
    id: 3,
    tag: "Pure Joy",
    text: "Your unrestrained, wholehearted laugh—especially the moments where you laugh so hard no sound comes out and you start clapping like a baby seal."
  },
  {
    id: 4,
    tag: "Little Habits",
    text: "The way you unconsciously trace gentle circles on my hand or knuckles whenever we're sitting together or driving."
  },
  {
    id: 5,
    tag: "Your Spirit",
    text: "Your adorable stubbornness when you’re determined about something; you pout a little, cross your arms, and look dangerously irresistible."
  },
  {
    id: 6,
    tag: "Sweet Memories",
    text: "Our late-night conversations when the entire world is asleep, where we share secrets, silly hypotheticals, and whisper our biggest dreams."
  },
  {
    id: 7,
    tag: "Everyday Magic",
    text: "How even the most mundane chores—like picking groceries or folding laundry—turn into fun memories because I'm doing them with you."
  },
  {
    id: 8,
    tag: "Your Kindness",
    text: "Your gentle, empathetic heart that softens instantly whenever you see a kitten, a puppy, or anyone in need of kindness."
  },
  {
    id: 9,
    tag: "Silly Moments",
    text: "Your cute little happy-food wiggle dance when your favorite meal or sweet treat arrives at the table."
  },
  {
    id: 10,
    tag: "Safe Haven",
    text: "The way you wrap your arms around me and rest your head on my chest, letting out that soft exhale that tells me you feel completely safe."
  },
  {
    id: 11,
    tag: "Your Beauty",
    text: "The way your eyes sparkle when you get excited about something you love—it’s like seeing whole galaxies in your gaze."
  },
  {
    id: 12,
    tag: "Thoughtfulness",
    text: "How you remember the tiniest things I mentioned in passing weeks ago, proving how deeply you listen and care."
  },
  {
    id: 13,
    tag: "Sweet Quirks",
    text: "The adorable, dramatic sigh you make when you finally kick off your shoes and flop onto the bed after a long day."
  },
  {
    id: 14,
    tag: "Our Connection",
    text: "How we can communicate across a crowded room with just a single glance, an arched eyebrow, or a shared suppressed giggle."
  },
  {
    id: 15,
    tag: "Your Voice",
    text: "The soft melody of your voice when you call my name—it has an instinctive way of bringing instant calm to my soul."
  },
  {
    id: 16,
    tag: "Playfulness",
    text: "How you playfully steal my oversized hoodies and jackets, and somehow look a thousand times better in them than I ever could."
  },
  {
    id: 17,
    tag: "Your Cooking",
    text: "The way you hum little tunes to yourself when you're in the kitchen making snacks or making coffee just the way you like it."
  },
  {
    id: 18,
    tag: "Patience",
    text: "The boundless patience and gentle understanding you show me, even when I am overthinking or having an off day."
  },
  {
    id: 19,
    tag: "Inside Jokes",
    text: "All our private silly memes, made-up words, and inside jokes that would make zero sense to anyone else in the universe."
  },
  {
    id: 20,
    tag: "Forever Love",
    text: "That feeling of absolute certainty in my chest whenever I look at you and realize you are my person, my home, and my future."
  },
  {
    id: 21,
    tag: "Sweet Quirks",
    text: "How you pretend you’re not cold, but then immediately tuck your icy little hands or toes right under my shirt to warm up."
  },
  {
    id: 22,
    tag: "Your Style",
    text: "The effortless grace and elegance you carry yourself with, whether you're dressed up for a fancy evening or just chilling in sweatpants."
  },
  {
    id: 23,
    tag: "Your Support",
    text: "How you are always my number one cheerleader, believing in me with fierce conviction even when my own faith wavers."
  },
  {
    id: 24,
    tag: "Affection",
    text: "Those unexpected forehead kisses and tight spontaneous hugs you give me just because."
  },
  {
    id: 25,
    tag: "Sweet Habits",
    text: "The face you make when you take your first sip of hot coffee or tea—eyes closed in pure, contented bliss."
  },
  {
    id: 26,
    tag: "Playfulness",
    text: "How you tease me with that mischievous grin, knowing you have completely wrapped me around your little finger."
  },
  {
    id: 27,
    tag: "Deep Soul",
    text: "Your emotional depth; you feel things so richly and genuinely, and you are never afraid to love with your whole heart."
  },
  {
    id: 28,
    tag: "Adventures",
    text: "How much fun it is to travel with you—getting lost on purpose, discovering random cafes, and singing along horribly to the radio."
  },
  {
    id: 29,
    tag: "Sweet Moments",
    text: "When you fall asleep on my shoulder during a movie and your breathing slows down into the sweetest, most peaceful rhythm."
  },
  {
    id: 30,
    tag: "Your Humor",
    text: "Your sharp, witty sense of humor that catches me completely off guard and has me laughing until my stomach aches."
  },
  {
    id: 31,
    tag: "Generosity",
    text: "How you always offer me the last bite of the tastiest food, even when I know you secretly wanted it for yourself."
  },
  {
    id: 32,
    tag: "Morning Glow",
    text: "The effortless beauty of your bare face in the soft morning sunlight before the rest of the world wakes up."
  },
  {
    id: 33,
    tag: "Little Gestures",
    text: "The random sweet text messages you send during the day just to remind me you're thinking of me."
  },
  {
    id: 34,
    tag: "Your Passion",
    text: "How captivating you are when you talk about something you genuinely care about; you become totally animated and luminous."
  },
  {
    id: 35,
    tag: "Comfort",
    text: "How comfortable we are in silence together—no need to fill every second with words, just existing happily in each other's presence."
  },
  {
    id: 36,
    tag: "Sweet Habits",
    text: "The way you gently tuck a strand of hair behind your ear when you're concentrating on reading or looking at your phone."
  },
  {
    id: 37,
    tag: "Our Song",
    text: "How whenever our favorite song plays, you look over at me with that knowing, romantic glimmer in your eyes."
  },
  {
    id: 38,
    tag: "Caring Nature",
    text: "How you instinctively reach over to check if I'm okay if you hear me sigh or sense the slightest shift in my mood."
  },
  {
    id: 39,
    tag: "Playful Feuds",
    text: "Our playful debates over who loves whom more (even though I will forever insist that I love you most)."
  },
  {
    id: 40,
    tag: "Your Scent",
    text: "Your signature scent—a sweet, subtle fragrance that lingers on my shirts and pillows and instantly makes me miss you."
  },
  {
    id: 41,
    tag: "Strength",
    text: "Your quiet resilience and inner courage; you handle life's challenges with so much poise and dignity."
  },
  {
    id: 42,
    tag: "Spontaneity",
    text: "Those spontaneous midnight snack cravings that turn into kitchen party adventures at 1:00 AM."
  },
  {
    id: 43,
    tag: "Cute Habits",
    text: "The cute little scrunched-up face you make when something tastes sour or when you're trying to suppress a sneeze."
  },
  {
    id: 44,
    tag: "Acceptance",
    text: "The way you love me for exactly who I am, flaws and all, never trying to change me but inspiring me to be better."
  },
  {
    id: 45,
    tag: "Romance",
    text: "How you hold onto my arm when we're walking outside, leaning in close as if protecting our own little world from the crowd."
  },
  {
    id: 46,
    tag: "Silly Habits",
    text: "How you take 47 selfies just to find the one where you like the lighting, and honestly, you look stunning in every single one of them."
  },
  {
    id: 47,
    tag: "Warm Heart",
    text: "How genuinely happy you feel for other people when good things happen to them; your heart holds zero malice."
  },
  {
    id: 48,
    tag: "Sweet Gestures",
    text: "Fixing my collar or smoothing down my messy hair before we head out the door with that sweet maternal tenderness."
  },
  {
    id: 49,
    tag: "Our Chemistry",
    text: "The goosebumps that still ripple across my skin every single time our fingers interlace or your lips brush against mine."
  },
  {
    id: 50,
    tag: "Milestone",
    text: "Halfway through 100 reasons, and I realize a million reasons still wouldn’t be enough to capture how much you mean to me, Azra Baby."
  },
  {
    id: 51,
    tag: "Your Laughter",
    text: "How you laugh at your own jokes before you even manage to finish telling the punchline."
  },
  {
    id: 52,
    tag: "Little Quirks",
    text: "How you guard your french fries like a treasure chest, yet still let me steal a few because you love me."
  },
  {
    id: 53,
    tag: "Peaceful Moments",
    text: "Watching sunsets with you, sitting quietly side by side as the sky turns shades of peach, lilac, and gold."
  },
  {
    id: 54,
    tag: "Affection",
    text: "The cute way you lean in for a kiss when you're greeting me after we've been apart for even just a few hours."
  },
  {
    id: 55,
    tag: "Curiosity",
    text: "Your curiosity about the world—how you dive into rabbit holes of interesting facts and share them with wide-eyed excitement."
  },
  {
    id: 56,
    tag: "Loyalty",
    text: "Your fierce, unconditional loyalty to the people you love; having you in my corner makes me feel invincible."
  },
  {
    id: 57,
    tag: "Playful Banter",
    text: "The sassy one-liners you drop that leave me speechless and grinning like a fool."
  },
  {
    id: 58,
    tag: "Cozy Days",
    text: "Rainy days spent tucked under fuzzy blankets together, listening to the rain against the window with no rush to go anywhere."
  },
  {
    id: 59,
    tag: "Your Honesty",
    text: "Your refreshing authenticity; you are always real, sincere, and true to yourself, never putting on a false mask."
  },
  {
    id: 60,
    tag: "Sweet Habits",
    text: "How you bite your lip when you're concentrating intently on a game, a puzzle, or choosing what outfit to wear."
  },
  {
    id: 61,
    tag: "Dreams",
    text: "The spark in your voice whenever we talk about building our dream future, our future home, and all our upcoming adventures."
  },
  {
    id: 62,
    tag: "Emotional Anchor",
    text: "How you are my anchor in the storm; whenever chaos swirls around me, your presence brings me back to solid ground."
  },
  {
    id: 63,
    tag: "Your Hugs",
    text: "How you squeeze just a little bit tighter right before letting go of a hug."
  },
  {
    id: 64,
    tag: "Playful Moments",
    text: "How you randomly start dancing in the living room or hallway with no music playing, just bursting with cute energy."
  },
  {
    id: 65,
    tag: "Little Notes",
    text: "The adorable voice notes you send when you're excited to tell me something that just happened in your day."
  },
  {
    id: 66,
    tag: "Your Smile",
    text: "The secret, private smile you give me in public when something funny happens that only you and I understand."
  },
  {
    id: 67,
    tag: "Protection",
    text: "How you check in on me to make sure I ate properly, drank enough water, and am taking care of myself."
  },
  {
    id: 68,
    tag: "Cuddles",
    text: "How you naturally nestle into my arms while we sleep, as if we were designed specifically to fit together like puzzle pieces."
  },
  {
    id: 69,
    tag: "Cute Expressions",
    text: "The dramatic eye roll you give me when I tell a hopelessly cheesy dad joke, followed immediately by an involuntary smile."
  },
  {
    id: 70,
    tag: "Your Grace",
    text: "The graceful way you forgive misunderstandings and always choose love, communication, and closeness over pride."
  },
  {
    id: 71,
    tag: "Sweet Quirks",
    text: "How you have a specific way of arranging your pillows to create the ultimate fortress of maximum fluffiness."
  },
  {
    id: 72,
    tag: "Unconditional",
    text: "That you love me not just on my best days when I'm smiling, but also on my hardest days when I have nothing left to give."
  },
  {
    id: 73,
    tag: "Your Touch",
    text: "How your gentle touch can soothe away any headache, tension, or worry in a matter of seconds."
  },
  {
    id: 74,
    tag: "Confidence",
    text: "The gorgeous confidence in your step when you put on an outfit you feel amazing in—you radiate like pure sunshine."
  },
  {
    id: 75,
    tag: "Reassurance",
    text: "The way you hold my face between your hands, look right into my eyes, and remind me: 'Everything is going to be okay.'"
  },
  {
    id: 76,
    tag: "Sweet Voice",
    text: "Your sleepy morning voice that is still thick with dreams, murmuring sweet 'good morning' greetings."
  },
  {
    id: 77,
    tag: "Your Innocence",
    text: "The pure childlike wonder you still possess when you see fireworks, holiday lights, or a starry night sky."
  },
  {
    id: 78,
    tag: "Playfulness",
    text: "How you playfully tickle or poke my sides when you want my undivided attention."
  },
  {
    id: 79,
    tag: "Shared Meals",
    text: "Sharing dessert with you—ordering two spoons and fighting playfully over the chocolate fudge center."
  },
  {
    id: 80,
    tag: "Trust",
    text: "The profound vulnerability and sacred trust we share; knowing there is nothing I ever have to hide from you."
  },
  {
    id: 81,
    tag: "Inspiration",
    text: "How being loved by you inspires me every day to be a kinder, wiser, and more loving human being."
  },
  {
    id: 82,
    tag: "Cute Habits",
    text: "How you hold your mug with both hands, warming your palms like a sweet little winter fairy."
  },
  {
    id: 83,
    tag: "Heart of Gold",
    text: "Your habit of leaving people and places better, warmer, and happier than you found them."
  },
  {
    id: 84,
    tag: "Car Rides",
    text: "Our late-night drives with windows cracked open, cool breeze in your hair, singing our hearts out to our favorite playlist."
  },
  {
    id: 85,
    tag: "Romantic Sparks",
    text: "How after all this time, a simple wink or compliment from you still makes my heart skip a frantic beat."
  },
  {
    id: 86,
    tag: "Your Laugh",
    text: "That snort-laugh that slips out when you genuinely cannot contain your joy—it is the sweetest sound on planet Earth."
  },
  {
    id: 87,
    tag: "Thoughtful Gifts",
    text: "The heartfelt thought you put into every gift or surprise, always focused on sentimental meaning over material price."
  },
  {
    id: 88,
    tag: "Selflessness",
    text: "The genuine joy you feel when you see the people you love thriving and happy."
  },
  {
    id: 89,
    tag: "Sweet Memories",
    text: "Remembering our very first nervous glances, our first butterflies, and realizing that love has only grown deeper every single day."
  },
  {
    id: 90,
    tag: "Safety",
    text: "How your hand feels in mine—like it was custom-sculpted by the universe just to fit into that exact space."
  },
  {
    id: 91,
    tag: "Endearing Pouts",
    text: "The adorable little pout on your lips whenever you're pretending to be grumpy with me."
  },
  {
    id: 92,
    tag: "Partnership",
    text: "Knowing that whatever storms life throws our way, you and I are an unstoppable team."
  },
  {
    id: 93,
    tag: "Your Voice",
    text: "How hearing you say 'I love you' feels just as breathtaking and sacred today as the very first time I heard it."
  },
  {
    id: 94,
    tag: "Little Wonders",
    text: "How you pause on walks to look at cute flowers, pretty leaves, or colorful skies."
  },
  {
    id: 95,
    tag: "Belief in Us",
    text: "The fierce conviction with which we both protect and cherish what we have built together."
  },
  {
    id: 96,
    tag: "Home",
    text: "That 'home' stopped being a physical address the day I met you; home is wherever you are, Azra Baby."
  },
  {
    id: 97,
    tag: "Timeless",
    text: "How I can look at you today, tomorrow, or fifty years from now, and still fall hopelessly in love with you all over again."
  },
  {
    id: 98,
    tag: "My Best Friend",
    text: "That beyond being the love of my life, you are my absolute best friend, my confidante, and my favorite company in this entire world."
  },
  {
    id: 99,
    tag: "Your Whole Existence",
    text: "Just simply that you exist in this world—and that of all the people on this earth, I get to be the lucky one who loves you and is loved by you."
  },
  {
    id: 100,
    tag: "Eternal",
    text: "Because 100 reasons could never be enough; I love you with all my heart, today, tomorrow, and for all the lifetimes to come, my sweet Azra Baby."
  }
];

// Export for Node/testing if applicable
if (typeof module !== 'undefined' && module.exports) {
  module.exports = REASONS;
}

