export const API_KEY = "coWPLtsaQYAhRKBnWEEOKcnnNXgKwGHDBn7vLl1c"
export const NPS_API = "https://developer.nps.gov/api/v1"

// https://www.nps.gov/aboutus/national-park-system.htm
const NAT_BATTLEFIELD_CODES = ['anti', 'biho', 'cowp', 'fodo', 'fone', 'mono', 'mocr', 'pete', 'stri', 'tupe', 'wicr']

const NAT_BATTLEFIELD_PARK_CODES = ['kemo', 'mana', 'rich', 'rira']

const NAT_MILITARY_PARK_CODES = ['chch', 'frsp', 'gett', 'guco', 'hobe', 'kimo', 'peri', 'shil', 'vick']

const NAT_PARK_CODES = ['acad', 'arch', 'badl', 'bibe', 'bisc', 'blca', 'brca', 'cany', 'care', 'cave', 'chis', 'cong', 'crla', 'cuva', 'deva', 'dena', 'drto', 'ever', 'gaar', 'jeff', 'glba', 'glac', 'grca', 'grte', 'grba', 'grsa', 'grsm', 'gumo', 'hale', 'havo', 'hosp', 'indu', 'isro', 'jotr', 'katm', 'kefj', 'kova', 'lacl', 'lavo', 'maca', 'meve', 'mora', 'npsa', 'neri', 'noca', 'olym', 'pefo', 'pinn', 'redw', 'romo', 'sagu', 'seki', 'shen', 'thro', 'viis', 'voya', 'whsa', 'wica', 'wrst', 'yell', 'yose', 'zion']

const NAT_HISTORIC_CODES = ['abli', 'adam', 'apco', 'blrv', 'bost', 'cari', 'cebe', 'chcu', 'choh', 'colo', 'colt', 'cuga', 'daav', 'frst', 'fosu', 'gero', 'gosp', 'hafe', 'hart', 'hatu', 'home', 'hocu', 'inde', 'jica', 'kala', 'kaho', 'kewe', 'klse', 'klgo', 'lewi', 'lowe', 'lyjo', 'mapr', 'mabi', 'malu', 'mima', 'morr', 'natc', 'nebe', 'jazz', 'nepe', 'ocmu', 'paal', 'pagr', 'peco', 'puho', 'reer', 'rori', 'saga', 'saan', 'safr', 'sajh', 'sara', 'sitk', 'stge', 'edis', 'tuma', 'vafo', 'wapa', 'wefa', 'wori']

const NAT_HISTORIC_SITE_CODES = ['alpo', 'ande', 'anjo', 'beol', 'boaf', 'brvb', 'carl', 'cawo', 'chpi', 'chri', 'clba', 'edal', 'eise', 'elro', 'euon', 'fila', 'fobo', 'foda', 'fola', 'fols', 'foth', 'fopo', 'fora', 'fosc', 'fosm', 'fous', 'fova', 'frdo', 'frla', 'frhi', 'grko', 'hamp', 'hstr', 'heho', 'hofr', 'hono', 'hofu', 'hutr', 'jaga', 'jofi', 'jomu', 'knri', 'liho', 'chsc', 'long', 'mawa', 'manz', 'mava', 'mamc', 'miin', 'mimi', 'nico', 'nisi', 'wicl', 'paav', 'puhe', 'sahi', 'sapa', 'sama', 'saju', 'sand', 'sair', 'spar', 'stea', 'thrb', 'thri', 'thst', 'tuai', 'tuin', 'ulsg', 'vama', 'waba', 'whmi', 'wiho']

const NAT_MEMORIAL_CODES = ['arho','arpo', 'cham', 'coro', 'ddem', 'deso', 'feha', 'flni', 'frde', 'gegr', 'hagr', 'jofl', 'kowa', 'linc', 'libo', 'lyba', 'mlkm', 'moru', 'okci', 'pevi', 'poch', 'this', 'thje', 'rowi','valr', 'thko', 'vive', 'wrbr', 'wwii', 'wwim', 'wamo']

const NAT_MONUMENT_CODES = ['ania', 'crmo', 'gwca', 'orca', 'afbg', 'fomc', 'agfo', 'alfl', 'azru', 'band', 'bepa', 'bicr', 'bowa', 'buis', 'cabr', 'cane', 'cach', 'cakr', 'cavo', 'cagr', 'casa', 'cacl', 'camo', 'cebr', 'chyo', 'chir', 'colm', 'cech', 'depo', 'deto', 'dino', 'efmo', 'elma', 'elmo', 'flfo', 'fofr', 'foma', 'fomr', 'fopu', 'fost', 'foun', 'fobu', 'frri', 'gewa', 'gwca', 'gicl', 'gois', 'grpo', 'hafo', 'hove', 'jeca', 'joda', 'kaww', 'labe', 'libi', 'memy', 'misp', 'moca', 'muwo', 'nabr', 'nava', 'orpi', 'petr', 'pisp', 'pipe', 'popo', 'pull', 'rabr', 'ruca', 'sapu', 'scbl', 'stli', 'sucr', 'tica', 'tont', 'tule', 'tusk', 'tuzi', 'vicr', 'waco', 'waca', 'wupa', 'yuho']

const NAT_SEASHORE_CODES = ['asis', 'cana', 'caco', 'caha', 'calo', 'cuis', 'fiis', 'guis', 'pais', 'pore']

const NAT_SCENIC_TRAIL_CODES = ['appa', 'natt', 'pohe']

const NAT_RIVER_CODES = ['biso', 'buff', 'mnrr', 'ozar']

const NAT_LAKESHORE_CODES = ['apis', 'piro', 'slbe']

const NAT_REC_AREAS_CODES = ['amis', 'bica', 'boha', 'chat', 'chic', 'cure', 'dewa', 'gate', 'gari', 'glca', 'goga', 'lake', 'lamr', 'laro', 'samo', 'whis']

const NAT_RESERVES_CODES = ['ciro', 'ebla']

const NAT_PARKWAY_CODES = ['blri', 'gwmp', 'natr']

const NAT_PRESERVES_CODES = ['ania', 'bela', 'bicy', 'bith', 'crmo', 'katm', 'lacl', 'liri', 'moja', 'noat', 'tapr', 'timu', 'vall', 'wrst', 'yuch']

const NAT_WILD_SCENIC_RIVER_CODES = ['alag', 'blue', 'niob', 'lode', 'mnrr', 'obed', 'rigr', 'sacn', 'sacn', 'upde']

const OTHER_DESIGNATION_CODES = ['cato', 'coga', 'fowa', 'gree', 'nace', 'nama', 'pisc', 'prwi', 'rocr', 'whho', 'wotr']

export const PARK_DESIGNATION_KEY = {
  NAT_PARK: 'national-park',
  NAT_BATTLEFIELD: 'national-battlefield',
  NAT_BATTLEFIELD_PARK: 'national-battlefield-park',
  NAT_BATTLEFIELD_SITE: 'national-battlefield-site',
  NAT_MILITARY_PARK:'national-military-park',
  NAT_HISTORIC_PARK: 'national-historic-park',
  NAT_HISTORIC_SITE: 'national-historic-site',
  NAT_LAKESHORE: 'national-lakeshore',
  NAT_MEMORIAL: 'national-memorial',
  NAT_MONUMENT: 'national-monument',
  NAT_PARKWAY: 'national-parkway',
  NAT_PRESERVES: 'national-preserve',
  NAT_RESERVES: 'national-reserve',
  NAT_REC_AREA: 'national-recreation-area',
  NAT_RIVER: 'national-river',
  NAT_SCENIC_TRAIL: 'national-scenic-trail',
  NAT_SEASHORE: 'national-seashore',
  NAT_WILD_AND_SCENIC_RIVER: 'national-wild-and-scenic-river',
  INTERNATIONAL_HISTORIC_SITE: 'international-historic-site',
  OTHER_DESIGNATION: 'other-designation'
}

export const LIST_OPTIONS = [
  ...Object.values(PARK_DESIGNATION_KEY)
]

export const PARK_CODES = {
  [PARK_DESIGNATION_KEY.NAT_PARK]: NAT_PARK_CODES,
  [PARK_DESIGNATION_KEY.NAT_BATTLEFIELD]: NAT_BATTLEFIELD_CODES,
  [PARK_DESIGNATION_KEY.NAT_BATTLEFIELD_PARK]: NAT_BATTLEFIELD_PARK_CODES,
  [PARK_DESIGNATION_KEY.NAT_BATTLEFIELD_SITE]: ['brcr'],
  [PARK_DESIGNATION_KEY.NAT_MILITARY_PARK]: NAT_MILITARY_PARK_CODES,
  [PARK_DESIGNATION_KEY.NAT_HISTORIC_PARK]: NAT_HISTORIC_CODES,
  [PARK_DESIGNATION_KEY.NAT_HISTORIC_SITE]: NAT_HISTORIC_SITE_CODES,
  [PARK_DESIGNATION_KEY.NAT_MEMORIAL]: NAT_MEMORIAL_CODES,
  [PARK_DESIGNATION_KEY.NAT_MONUMENT]: NAT_MONUMENT_CODES,
  [PARK_DESIGNATION_KEY.NAT_SEASHORE]: NAT_SEASHORE_CODES,
  [PARK_DESIGNATION_KEY.NAT_SCENIC_TRAIL]: NAT_SCENIC_TRAIL_CODES,
  [PARK_DESIGNATION_KEY.NAT_REC_AREA]: NAT_REC_AREAS_CODES,
  [PARK_DESIGNATION_KEY.NAT_RIVER]: NAT_RIVER_CODES,
  [PARK_DESIGNATION_KEY.NAT_LAKESHORE]: NAT_LAKESHORE_CODES,
  [PARK_DESIGNATION_KEY.NAT_PARKWAY]: NAT_PARKWAY_CODES,
  [PARK_DESIGNATION_KEY.NAT_RESERVES]: NAT_RESERVES_CODES,
  [PARK_DESIGNATION_KEY.NAT_PRESERVES]: NAT_PRESERVES_CODES,
  [PARK_DESIGNATION_KEY.NAT_WILD_AND_SCENIC_RIVER]: NAT_WILD_SCENIC_RIVER_CODES,
  [PARK_DESIGNATION_KEY.OTHER_DESIGNATION]: OTHER_DESIGNATION_CODES,
  [PARK_DESIGNATION_KEY.INTERNATIONAL_HISTORIC_SITE]: ['sacr']
}