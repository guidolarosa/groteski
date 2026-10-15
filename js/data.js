// Catalog data: moods -> visual theme + items.
const MOODS = [
  { id:"sleeping", name:"Sleeping", scene:"sleeping", grad:["#1b1f4b","#4b2c6e"], emojis:["😴","🐈","🌙","💤"],
    titles:["Midnight Purr Loop","Sunbeam Snooze","The Long Nap","Blanket Fort Dreams","Whisker Lullaby","Cozy Box Chronicles","Nine Lives of Sleep","Moonlit Loaf"] },
  { id:"playtime", name:"Playtime", scene:"playtime", grad:["#ff5f6d","#ffc371"], emojis:["🧶","🔴","🐾","😼"],
    titles:["Laser Dot Frenzy","Yarn Wars","Zoomies at 3AM","The Red Dot Strikes Back","Feather Wand Fury","Pounce Party","Box Ambush","Catnip Rave"] },
  { id:"relax", name:"Relax", scene:"relax", grad:["#134e5e","#71b280"], emojis:["🍃","🐈","🪴","☕"],
    titles:["Garden Breeze","Slow Blink Sessions","Aquarium Hours","Fireplace Purrs","Zen Window","Lo-Fi Kneading","Leaf Drift"] },
  { id:"rainy", name:"Rainy Day", scene:"rainy", grad:["#2c3e50","#4ca1af"], emojis:["🌧️","☔","🐱","💧"],
    titles:["Window Rain Watch","Thunder Cuddles","Puddle Patrol","Drizzle & Dream","Storm Over Catville","Raindrop Races","Grey Afternoon"] },
  { id:"birds", name:"Bird Watching", scene:"birds", grad:["#56ccf2","#2f80ed"], emojis:["🐦","🪶","👀","🌳"],
    titles:["Feeder Cam Live","Sparrow Soap Opera","Chirp Chirp Chatter","Pigeon Parade","The Finch Files","Robin Hood","Wing Watch"] },
  { id:"night", name:"Night Hunt", scene:"night", grad:["#0f2027","#2c5364"], emojis:["🦉","🐭","🌌","✨"],
    titles:["Fireflies After Dark","Mouse Hunt Mysteries","Shadow Stalker","Glow Bug Ballet","The Midnight Prowl","Stealth Mode"] },
];

const DESCS = {
  sleeping:"A slow, breathing twilight sky with twinkling stars. Scientifically engineered to trigger maximum loaf mode.",
  playtime:"A hyperactive red dot and a rolling ball of yarn zip across the screen. Warning: may cause zoomies.",
  relax:"Gentle leaves drift through a soft green breeze. Perfect for slow blinks and gentle kneading.",
  rainy:"Raindrops streak down a cozy window while distant lightning flickers. Best enjoyed curled up.",
  birds:"Birds flutter across a bright sky, just out of paw's reach. Chattering is encouraged.",
  night:"Fireflies blink in a deep blue forest night. Unleash your inner apex predator.",
};

function buildCatalog(){
  return MOODS.map(m => ({
    ...m,
    items: m.titles.map((t,i) => {
      const mins = 8 + ((t.length*7 + i*13) % 52);
      return { id:`${m.id}-${i}`, title:t, mood:m, emoji:m.emojis[i % m.emojis.length],
        duration: mins*60 + (t.length*11)%60, desc: DESCS[m.scene],
        hue: (i*23) % 60 - 30, match: 88 + (t.length*3)%12 };
    })
  }));
}
