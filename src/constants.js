export const API_KEY = "coWPLtsaQYAhRKBnWEEOKcnnNXgKwGHDBn7vLl1c"
export const NPS_API = "https://developer.nps.gov/api/v1"

const NAT_BATTLEFIELD_CODES = ['anti', 'biho', 'cowp', 'fodo', 'fone', 'mono', 'mocr', 'pete', 'stri', 'tupe', 'wicr']

const NAT_BATTLEFIELD_PARK_CODES = ['kemo', 'mana', 'rich', 'rira']

const NAT_MILITARY_PARK_CODES = ['chch', 'frsp', 'gett', 'guco', 'hobe', 'kimo', 'peri', 'shil', 'vick']

const NAT_MILITARY_MILITARY_PARK_CODES = ['chch', 'frsp', 'gett', 'guco', 'hobe', 'kimo', 'peri', 'shil', 'vick']

const NAT_PARK_CODES = ['acad', 'arch', 'badl', 'bibe', 'bisc', 'blca', 'brca', 'cany', 'care', 'cave', 'chis', 'cong', 'crla', 'cuva', 'deva', 'dena', 'drto', 'ever', 'gaar', 'jeff', 'glba', 'glac', 'grca', 'grte', 'grba', 'grsa', 'grsm', 'gumo', 'hale', 'havo', 'hosp', 'indu', 'isro', 'jotr', 'katm', 'kefj', 'kova', 'lacl', 'lavo', 'maca', 'meve', 'mora', 'npsa', 'neri', 'noca', 'olym', 'pefo', 'pinn', 'redw', 'romo', 'sagu', 'seki', 'shen', 'thro', 'viis', 'voya', 'whsa', 'wica', 'wrst', 'yell', 'yose', 'zion']

const NAT_HISTORIC_CODES = ['abli', 'adam', 'apco', 'blrv', 'bost', 'cari', 'cebe', 'chcu', 'choh', 'colo', 'colt', 'cuga', 'daav', 'frst', 'fosu', 'gero', 'gosp', 'hafe', 'hart', 'hatu', 'home', 'hocu', 'inde', 'jica', 'kala', 'kaho', 'kewe', 'klse', 'klgo', 'lewi', 'lowe', 'lyjo', 'mapr', 'mabi', 'malu', 'mima', 'morr', 'natc', 'nebe', 'jazz', 'nepe', 'ocmu', 'paal', 'pagr', 'peco', 'puho', 'reer', 'rori', 'saga', 'saan', 'safr', 'sajh', 'sara', 'sitk', 'stge', 'edis', 'tuma', 'vafo', 'wapa', 'wefa', 'wori']

const NAT_HISTORIC_SITE_CODES = ['alpo', 'amch', 'ande', 'anjo', 'beol', 'boaf', 'brvb', 'carl', 'cawo', 'chpi', 'chri', 'clba', 'edal', 'eise', 'elro', 'euon', 'fila', 'fobo', 'foda', 'fola', 'fols', 'fopo', 'fora', 'fosc', 'fosm', 'fous', 'fova', 'frdo', 'frla', 'frhi', 'glde', 'grko', 'hamp', 'hstr', 'heho', 'hofr', 'hono', 'hofu', 'hutr', 'jaga', 'jofi', 'jomu', 'knri', 'liho', 'chsc', 'long', 'loea', 'mawa', 'manz', 'mava', 'mamc', 'miin', 'mimi', 'nico', 'nisi', 'wicl', 'puhe', 'sahi', 'sapa', 'sama', 'saju', 'sand', 'sair', 'spar', 'stea', 'thrb', 'thri', 'thco', 'thst', 'tosy', 'tuai', 'tuin', 'ulsg', 'vama', 'waba', 'whmi', 'wiho']

const NAT_MONUMENT_CODES = ['ania', 'crmo', 'orca', 'afbg', 'fomc', 'agfo', 'alfl', 'azru', 'band', 'bepa', 'bicr', 'bowa', 'buis', 'cabr', 'cane', 'cach', 'cakr', 'cavo', 'cagr', 'casa', 'cacl', 'camo', 'cebr', 'chyo', 'chir', 'colm', 'cech', 'depo', 'deto', 'dino', 'efmo', 'elma', 'elmo', 'flfo', 'fofr', 'foma', 'fomr', 'fopu', 'fost', 'foun', 'fobu', 'frri', 'gewa', 'gwca', 'gicl', 'gois', 'para', 'grpo', 'hafo', 'hove', 'jeca', 'joda', 'kaww', 'labe', 'libi', 'memy', 'misp', 'moca', 'muwo', 'nabr', 'nava', 'orpi', 'petr', 'pisp', 'pipe', 'popo', 'pull', 'rabr', 'ruca', 'sapu', 'scbl', 'stli', 'sucr', 'tica', 'tont', 'tule', 'tusk', 'tuzi', 'vicr', 'waco', 'waca', 'wupa', 'yuho']

export const NAT_PARK = 'national-park'
const NAT_BATTLEFIELD = 'national-battlefield'
const NAT_BATTLEFIELD_PARK = 'national-battlefield-park'
const NAT_BATTLEFIELD_SITE = 'national-battlefield-site'
const NAT_MILITARY_PARK = 'national-military-park'
const NAT_HISTORIC_PARK = 'national-historic-park'
const NAT_HISTORIC_SITE = 'national-historic-site'
const NAT_MONUMENT = 'national-monument'

export const LIST_OPTIONS = [
  NAT_PARK,
  NAT_BATTLEFIELD,
  NAT_BATTLEFIELD_PARK,
  NAT_BATTLEFIELD_SITE,
  NAT_MILITARY_PARK,
  NAT_HISTORIC_PARK,
  NAT_HISTORIC_SITE,
  NAT_MONUMENT
]

export const PARK_CODES = {
  [NAT_PARK]: NAT_PARK_CODES,
  [NAT_BATTLEFIELD]: NAT_BATTLEFIELD_CODES,
  [NAT_BATTLEFIELD_PARK]: NAT_BATTLEFIELD_PARK_CODES,
  [NAT_BATTLEFIELD_SITE]: ['brcr'],
  [NAT_MILITARY_PARK]: NAT_MILITARY_MILITARY_PARK_CODES,
  [NAT_HISTORIC_PARK]: NAT_HISTORIC_CODES,
  [NAT_HISTORIC_SITE]: NAT_HISTORIC_SITE_CODES,
  [NAT_MONUMENT]: NAT_MONUMENT_CODES,
}
