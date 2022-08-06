import { getRandomRange } from './getRandomRange';
import { pluckRandom } from './pluckRandom';

export const DICTIONARY = [
  'accelerant',
  'accidentally',
  'acquaint',
  'adore',
  'aggradation',
  'airmail',
  'alien',
  'alight',
  'allay',
  'alligator',
  'amble',
  'amble',
  'appetizer',
  'armour',
  'avenge',
  'avoid',
  'azimuth',
  'back',
  'bagpipe',
  'basement',
  'battle',
  'beard',
  'beckon',
  'beep',
  'beginning',
  'bend',
  'beset',
  'blindly',
  'blush',
  'body',
  'born',
  'breakthrough',
  'bubble',
  'building',
  'cap',
  'capitalize',
  'carol',
  'cartload',
  'casket',
  'catalog',
  'caucus',
  'cheek',
  'chief',
  'chip',
  'cleverly',
  'cloak',
  'cluck',
  'clump',
  'clump',
  'colonial',
  'congeal',
  'contort',
  'contract',
  'course',
  'crap',
  'cribbage',
  'crow',
  'crumble',
  'cupcake',
  'curse',
  'cymbal',
  'debase',
  'define',
  'defuse',
  'denote',
  'descale',
  'deter',
  'diplomacy',
  'dirt',
  'disaffiliate',
  'disembodiment',
  'disengage',
  'disentangle',
  'displease',
  'disposer',
  'disseminate',
  'dock',
  'dramaturge',
  'drawer',
  'drink',
  'duel',
  'embarrass',
  'embellish',
  'employ',
  'evocation',
  'exit',
  'expropriate',
  'extremely',
  'fatally',
  'fawn',
  'fender',
  'fight',
  'folk',
  'fountain',
  'generalise',
  'goodbye',
  'gore',
  'grace',
  'grandpa',
  'gravy',
  'helium',
  'hole',
  'icecream',
  'ideology',
  'ignite',
  'immortalize',
  'incarcerate',
  'indent',
  'infantilise',
  'infiltrate',
  'inglenook',
  'inhabit',
  'inn',
  'institutionalize',
  'internalize',
  'invite',
  'invoice',
  'jerk',
  'jodhpurs',
  'jodhpurs',
  'join',
  'jolly',
  'jut',
  'kick',
  'landform',
  'lather',
  'laud',
  'liberalize',
  'loads',
  'loom',
  'lynch',
  'lysine',
  'maggot',
  'magic',
  'mambo',
  'matriculate',
  'melon',
  'memorise',
  'miskey',
  'mud',
  'oil',
  'outgun',
  'outline',
  'ox',
  'pair',
  'pantyhose',
  'papaya',
  'passbook',
  'pay',
  'peep',
  'piece',
  'place',
  'plug',
  'poster',
  'prance',
  'prayer',
  'preface',
  'prescind',
  'presuppose',
  'programme',
  'pronunciation',
  'proximal',
  'ptarmigan',
  'punish',
  'pursue',
  'rabbit',
  'racist',
  'rain',
  'ram',
  'ravish',
  'refinance',
  'relax',
  'religion',
  'resound',
  'revival',
  'revolutionize',
  'rework',
  'rifle',
  'roof',
  'rotation',
  'round',
  'safeguard',
  'sandbag',
  'savage',
  'schnitzel',
  'scrip',
  'shepherd',
  'shipper',
  'shoat',
  'shroom',
  'sigh',
  'skid',
  'skywalk',
  'skywalk',
  'slice',
  'snoop',
  'somersault',
  'spaghetti',
  'specialty',
  'split',
  'sprinter',
  'squish',
  'statin',
  'stay',
  'stockpile',
  'stone',
  'strap',
  'stroll',
  'suddenly',
  'tape',
  'thesis',
  'thoroughly',
  'tinkling',
  'toddle',
  'toggle',
  'totter',
  'toy',
  'trait',
  'transfix',
  'transgress',
  'trust',
  'tug',
  'tweet',
  'twitch',
  'tyrannize',
  'uncoil',
  'uniform',
  'utilisation',
  'varnish',
  'ventilate',
  'veterinarian',
  'vibe',
  'visit',
  'vogue',
  'void',
  'volatility',
  'wall',
  'wall',
  'wallow',
  'warlord',
  'wash',
  'wastebasket',
  'well',
  'wheedle',
  'whole',
  'winch',
  'world',
  'wrapping',
  'yawningly',
  'zombie',
];

export const getRandomId = (): string => {
  return [
    pluckRandom(DICTIONARY),
    pluckRandom(DICTIONARY),
    pluckRandom(DICTIONARY),
    getRandomRange(1000, 100_000),
  ].join('-');
};