
import { Performance } from '../types/schedule'

const setlistData = `Glastonbury 2025

Pyramid Stage - Friday 27 June
The 1975: 22:15 - 23:45
Biffy Clyro: 20:15 - 21:25
Alanis Morissette: 18:15 - 19:15
TBA: 16:55 - 17:30
Burning Spear - 15:00 - 16:00
CMAT - 13:30 - 14:30
Supergrass: 12:00 - 13:00
Pyramid Stage - Saturday 28 June
Neil Young And The Chrome Hearts: 22:00 - 23:45
Raye: 20:00 - 21:00
Patchwork: 18:00 - 19:00
John Fogerty: 16:30 - 17:30
The Script: 15:00 - 16:00
Brandi Carlile: 13:30 - 14:30
Kaiser Chiefs: 12:00 - 13:00
Pyramid Stage - Sunday 29 June
Olivia Rodrigo: 21:45 - 23:15
Noah Kahan: 19:45 - 20:45
Nile Rodgers & Chic: 18:00 - 19:00
Rod Stewart: 15:45 - 17:15
The Libertines: 14:00 - 15:00
Celeste: 12:30 - 13:30
The Selecter: 11:15 - 12:00
Other Stage - Friday 27 June
Loyle Carner: 22:30 - 23:45
Busta Rhymes: 20:30 - 21:30
Gracie Abrams: 18:45 - 19:45
Franz Ferdinand: 17:15 - 18:15
Wet Leg: 15:45 - 16:45
Inhaler: 14:15 - 15:15
Rizzle Kicks: 13:00 - 13:45
Fabio & Grooverider And The Outlook Orchestra: 11:30 - 12:30
Other Stage - Saturday 28 June
Charli XCX: 22:30 - 23:45 
Deftones: 20:30 - 21:30
Ezra Collective: 18:45 - 19:45
Amyl & The Sniffers: 17:00 - 18:00
Weezer: 15:30 - 16:30
Beabadoobee: 14:00 - 15:00
Good Neighbours: 12:45 - 13:30
Alessi Rose: 11:30 - 12:15
Other Stage - Sunday 29 June
The Prodigy: 21:45 - 23:15
Wolf Alice: 19:45 - 20:45
Snow Patrol: 18:00 - 19:00
Turnstile: 16:30 - 17:30
Joy Crookes: 15:00 - 15:45
Shaboozey: 13:45 - 14:30
Nadine Shah: 12:30 - 13:15
Louis Dunford: 11:15 - 12:00
West Holts Stage - Friday 27 June
Maribou State: 22:15 - 23:45
Badbadnotgood: 20:30 - 21:30
Denzel Curry: 19:00 - 20:00
En Vogue: 17:30 - 18:30
Vieux Farka Toure: 16:00 - 17:00
Glass Beams: 14:30 - 15:25
Ca7riel & Paco Amoroso: 13:00 - 14:00
Corto.Alto: 11:30 - 12:30
West Holts Stage - Saturday 28 June
Doechii: 22:15 - 23:45
Amaarae: 20:30 - 21:30
Greentea Peng: 19:00 - 20:00
Yussef Dayes: 17:30 - 18:30
Kneecap: 16:00 - 17:00
Bob Vylan: 14:30 - 15:30
Nilüfer Yanya: 13:00 - 14:00
Infinity Song: 11:30 - 12:30
West Holts Stage - Sunday 29 June
Overmono: 21:45 - 23:15
Parcels: 20:00 - 21:00
The Brian Jonestown Massacre: 18:30 - 19:30
Goat: 17:00 - 18:00
Black Uhuru: 15:30 - 16:30
Cymande: 14:00 - 15:00
Abel Selaocoe & The Bantu Ensemble: 12:30 - 13:30
Thandii: 11:00 - 12:00
Woodsies - Friday 27 June
Four Tet: 22:30 - 23:45
Floating Points: 21:00 - 22:00
Pinkpantheress: 19:30 - 20:30
Blossoms: 18:00 - 19:00
Lola Young: 16:30 - 17:30
Shed Seven: 15:15 - 16:00
Fat Dog: 14:00 - 14:45
Myles Smith: 12:45 - 13:30
TBA: 11:30 - 12:15
Woodsies - Saturday 28 June
Scissor Sisters: 22:30 - 23:45
Tom Odell: 21:00 - 22:00
Father John Misty: 19:30 - 20:30
TV On The Radio: 18:00 - 19:00
Nova Twins: 16:30 - 17:30
Jade: 15:15 - 16:00
Fcukers: 14:00 - 14:45
Sorry: 12:45 - 13:30
The Amazons: 11:30 - 12:15
Woodsies - Sunday 29 June
Jorja Smith: 21:30 - 22:45
AJ Tracey: 20:00 - 21:00
St. Vincent: 18:30 - 19:30
Black Country, New Road: 17:00 - 18:00
Djo: 15:30 - 16:30
Sprints: 14:00 - 15:00
Gurriers: 12:30 - 13:30
Westside Cowboy: 11:15 - 12:00
The Park Stage - Friday 27 June
Anohni And The Johnsons: 23:00 - 00:15
Self Esteem: 21:15 - 22:15
Wunderhorse: 19:30 - 20:30
Osees: 18:00 - 19:00
English Teacher: 16:30 - 17:30
Faye Webster: 15:15 - 16:00
Jalen Ngonda: 14:00 - 14:45
John Glacier: 12:45 - 13:30
Horsegirl: 10:30 - 12:10
The Park Stage - Saturday 28 June
Caribou: 23:00 - 00:15
Beth Gibbons: 21:15 - 22:15
TBA: 19:30 - 22:30
Gary Numan: 18:00 - 19:00
Pa Salieu: 16:45 - 17:30
Lucy Dacus: 15:30 - 16:15
Japanese Breakfast: 14:00 - 15:00
Ichiko Aoba: 12:45 - 13:30
Yann Tiersen: 11:10 - 12:10
The Park Stage - Sunday 29 June
The Maccabees: 21:15 - 22:30
Future Islands: 19:35 - 20:35
Kae Tempest: 18:00 - 19:00
Girl In Red: 16:30 - 17:30
Royel Otis: 15:15 - 16:00
Katy J Pearson: 14:00 - 14:45
Geordie Greep: 12:45 - 13:30
Melin Melyn: 11:30 - 12:15
Acoustic Stage - Friday 27 June
Ani Difranco: 21:30 - 22:45
The Searchers: 20:00 - 21:00
Dhani Harrison: 18:30 - 19:30
Billie Marten: 17:00 - 18:00
Skerryvore: 16:00 - 16:40
Hugh Cornwell: 15:00 - 15:40
Gabrielle Aplin: 14:00 - 14:40
Tift Merritt: 13:00 - 13:40
Nadia Reid: 12:10 - 12:40
Our Man In The Field: 11:30 - 12:00
Acoustic Stage - Saturday 28 June
Nick Lowe: 21:30 - 22:45
Hothouse Flowers: 20:00 - 21:00
Jeremy Loops: 18:30 - 19:30
The Coronas: 17:10 - 18:00
The Bluebells: 16:10 - 16:50
Not Completely Unknown: A Celebration Of The Songs Of Bob Dylan: 15:00 - 16:00
Sophie B. Hawkins: 14:00 - 14:40
Oisin Leech: 13:00 - 13:40
Lorraine Nash: 12:10 - 12:40
Henry Grace: 11:30 - 12:00
Acoustic Stage - Sunday 29 June
Roy Harper: 21:30 - 22:30
The Bootleg Beatles: 20:00 - 21:00
Rhiannon Giddens With Dirk Powell: 18:30 - 19:30
London Community Gospel Choir: 17:00 - 18:00
PP Arnold: 16:00 - 16:40
The Riptide Movement: 15:00 - 15:40
Michele Stodart: 14:00 - 14:40
The Henry Girls: 13:00 - 13:40
Toby Lee: 12:10 - 12:40
Dawn Landes & Friends Perform The Liberated Woman's Songbook: 11:30 - 12:00
Avalon Stage - Friday 27 June
The Fratellis: 23:05 - 00:20
Terrorvision: 21:35 - 22:35
The Magic Numbers: 20:05 - 21:05
Orla Gartland: 18:35 - 19:35
Ash: 17:05 - 18:05
Paris Paloma: 15:35 - 16:35
Rumba De Bodas: 14:10 - 15:05
Beans On Toast: 12:50 - 13:40
Avalon Stage - Saturday 28 June
Hard-Fi: 23:10 - 00:20
Tom Walker: 21:40 - 22:40
Rachel Chinouriri: 20:10 - 21:10
Jade Bird: 18:40 - 19:40
The Amy Winehouse Band: 17:10 - 18:10
Jamie Cullum: 15:40 - 16:40
Stephen Wilson Jr.: 14:15 - 15:10
Bess Atwell: 12:50 - 13:45
Fülü: 11:30 - 12:20
Avalon Stage - Saturday 28 June
Alabama 3: 22:50 - 23: 50
Bear's Den: 21:20 - 22:20
Sam Ryder: 19:50 - 20:50
The Big Moon: 18:20 - 19:20
My Baby: 16:50 - 17:50
The Horne Section: 15:20 - 16:20
Brooke Combe: 13:55 - 14:50
Talisk: 12:30 - 13:25
Dea Matrona: 11:25 - 12:05
Arcadia - Friday 27 June
Job Jobse B2B Palms Trax: 02:00 - 03:00
Romy: 01:00 - 02:00
Sonny Fodera: 00:00 - 01:00
Dragonfly Show: 23:50 - 00:00
Max Cooper: 22:50 - 23:50
Optimo (Espacio): 21:55 - 22:50
Logic 1000: 21:00 - 21:55
Arcadia - Saturday 28 June
Groove Armada B2N Jungle (DJ Set): 02:00 - 03:00
Annie Mac B2B Jamz Supernova: 01:00 - 02:00
Four Tet: 00:00 - 01:00
Dragonfly Show: 23:50 - 00:00
Michael Bibi B2B Solomun: 22:50 - 23:50
Hannah Wants: 21:55 - 22:50
Danny Howard: 21:00 - 21:55
Becky Hill: 20:00 - 21:00
Arcadia - Sunday 29 June
Basslayerz B2b Born On Road: 01:30 - 02:30
Shy Fx B2b Eats Everything: 00:10 - 01:30
Bru-C: 23:40 - 00:10
Dragonfly Show: 23:30 - 23:40
Girls Dont Sync: 22:30 - 23:30
Dr Banana B2B Gallegos: 21:30 - 22:30
Eva Lazarus: 21:00 - 21:30
Jeremiah Asiamah: 20:00 - 21:00
Levels - Thursday 26 June
Adiel: 01:00 - 03:00
Marie Davidson: 23:30 - 01:00
Pinkpantheress [Nocturnal Set]: 23:00 - 23:30
Confidence Man (DJ) B2B Job Jobse: 21:00 - 23:00
Palms Trax: 19:30 - 21:00
Peach B2B Club Fitness: 18:00 - 19:30
Levels - Friday 27 June
Calibre: 01:45 - 03:00
Goldie B2B Special Request: 00:15 - 01:45
LTJ Bukem: 23:00 - 00:15
Lens W/ Dread MC: 21:45 - 23:00
Notion: 20:30 - 21:45
Conducta: 19:15 - 20:30
Oppidan B2B Sicaria: 17:45 - 19:15
Arthi: 16:35 - 17:45
Katy B (Live): 16:15 - 16:35
DJ EZ: 15:00 - 16:15
G33: 13:30 - 15:00
Bad B!tch Dubz: 12:00 - 13:30
Levels - Saturday 28 June
Jyoty: 01:15 - 03:00
Skream & Benga W/ Sgt Pokes: 00:00 - 01:15
Modeselektor (DJ): 22:30 - 00:00
Erol Alkan B2B Ewan Mcvicar: 21:00 - 22:30
Haai B2B Romy: 19:30 - 21:00
Chaos In The CBD: 18:00 - 19:30
Berlioz: 16:30 - 18:00
Jungle (DJ): 15:00 - 16:30
DJ Paulette: 13:30 - 15:00
Ella Knight: 12:00 - 13:30
Levels - Sunday 29 June
Groove Armada: 01:00 - 02:30
Seth Troxler: 23:30 - 01:00
Josh Baker: 22:00 - 23:30
Pawsa: 20:30 - 22:00
Chloe Caillet: 19:00 - 20:30
Adriatique B2B Carlita: 17:30 - 19:00
Kilimanjaro B2B Tsha: 16:00 - 17:30
Jazzy: 14:45 - 16:00
Rio Tashan: 13:15 - 14:45
Dani Whylie: 12:00 - 13:15
Leftfield Stage - Friday 27 June
Billy Bragg: 21:00 - 22:00
Antony Szmierek: 19:50 - 20:30
Jasmine.4.T: 18:40 - 19:20
Gurriers: 17:35 - 18:10
The Meffs: 16:30 - 17:05
Radical Round Up: With Billy Bragg, Jasmine.4.T, Holly Carter: 15:00 – 16:00
Panel: Feminism In The Age Of The Manosphere: 13:30 – 14:30
Panel: What Next For The Left: Politics, Organising And Power: 12:00 – 13:00
Leftfield Stage - Saturday 28 June
Kate Nash: 21:00 – 22:00
Lambrini Girls: 19:50 – 20:30
The Guest List: 18:40 – 19:20
Chloe Slater: 17:35 – 18:10
Girlband!: 16:30 – 17:05
Radical Round Up: With Billy Bragg, Rianne Downey, Andy White: 15:00 – 16:00
Panel: Saving The Planet But Not Leaving The Workers Behind: 13:30 – 14:30
Panel: Confronting The Rise Of The Far Right: 12:00 – 13:00
Leftfield Stage - Sunday 29 June
Grandson: 21:00 – 22:00
Reverend And The Makers: 19:50 – 20:30
Red Rum Club: 18:40 – 19:20
Du Blonde: 17:35 – 18:10
The Halfway Kid: 16:30 – 17:05
Radical Round Up: With Billy Bragg, Grandson, Jamie Webster: 15:00 – 16:00
Panel: Disability Cuts: The Fight Back: 13:30 – 14:30
Panel: How To Fix The Crisis Care: 12:00 – 13:00`

export function parseSetlistData(): Performance[] {
  const performances: Performance[] = []
  const lines = setlistData.split('\n').filter(line => line.trim())
  
  let currentStage = ''
  let currentDay = ''
  
  // Regex to identify stage and day headers more reliably
  // It looks for a pattern like "Stage Name - Day Date Month"
  const headerRegex = /^(.*?)\s*-\s*(Thursday|Friday|Saturday|Sunday)\s+\d{1,2}\s+(June|July|August|September|October|November|December)$/i;

  for (const line of lines) {
    const trimmedLine = line.trim()
    
    if (trimmedLine === 'Glastonbury 2025') continue
    
    // Check for stage and day headers using the new regex
    const headerMatch = trimmedLine.match(headerRegex);
    if (headerMatch) {
      currentStage = headerMatch[1].trim(); // The part before " - Day Date Month"
      currentDay = headerMatch[0].substring(currentStage.length + 3).trim(); // The "Day Date Month" part
      continue
    }
    
    // Parse performance lines
    const performanceMatch = trimmedLine.match(/^(.+?):\s*(\d{2}:\d{2})\s*-\s*(\d{2}:\d{2})(.*)$/)
    if (performanceMatch && currentStage && currentDay) {
      const [, artist, startTime, endTime, extra] = performanceMatch
      const isPictured = extra.includes('(pictured)')
      
      const id = `${currentStage}-${currentDay}-${artist}-${startTime}`.replace(/\s+/g, '-').toLowerCase()
      
      performances.push({
        id,
        artist: artist.trim(),
        stage: currentStage,
        day: currentDay,
        startTime,
        endTime,
        isPictured
      })
    }
  }
  
  return performances.sort((a, b) => {
    // Sort by day, then by start time, then by stage
    const dayOrder = ['Thursday 26 June', 'Friday 27 June', 'Saturday 28 June', 'Sunday 29 June']
    const dayDiff = dayOrder.indexOf(a.day) - dayOrder.indexOf(b.day)
    if (dayDiff !== 0) return dayDiff
    
    const timeA = a.startTime.replace(':', '')
    const timeB = b.startTime.replace(':', '')
    const timeDiff = parseInt(timeA) - parseInt(timeB)
    if (timeDiff !== 0) return timeDiff
    
    return a.stage.localeCompare(b.stage)
  })
}
