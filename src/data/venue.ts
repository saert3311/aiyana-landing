import heroBarra from '../assets/images/hero-barra.png';
import eventCumpleanos from '../assets/images/event-cumpleanos.png';
import eventFamilia from '../assets/images/event-familia.jpg';
import eventCafeTaller from '../assets/images/event-cafe-taller.jpg';
import eventCatas from '../assets/images/event-catas.png';
import spaceCocina from '../assets/images/space-cocina.png';
import spaceRincon from '../assets/images/space-rincon.jpg';
import isabelBuffet from '../assets/images/isabel-buffet.jpg';
import type { ImageMetadata } from 'astro';

export const VENUE_IMAGES = {
  hero: heroBarra,
  spaceCocina,
  spaceRincon,
  isabelBuffet,
} as const;

export const VENUE = {
  name: 'Espai Aiyana',
  fullName: 'Espai Aiyana Eventos Alfafar',
  owner: 'Isabel',
  address: 'Carrer Julio Colomer, 18, bajo izquierda, 46910 Alfafar, Valencia',
  shortAddress: 'Carrer Julio Colomer, 18, bajo izq. · 46910 Alfafar, Valencia',
  phoneDisplay: '667 43 96 23',
  phoneE164: '+34667439623',
  telHref: 'tel:+34667439623',
  whatsappUrl: 'https://wa.me/34667439623',
  instagramHandle: '@espai.aiyana_eventos',
  instagramUrl: 'https://www.instagram.com/espai.aiyana_eventos/',
  mapsUrl:
    'https://www.google.com/maps/place/Espai+Aiyana/@39.422097,-0.3907454,17z/data=!3m1!4b1!4m6!3m5!1s0xd604fef2010c8ef:0xe230104f597e7ab5!8m2!3d39.4220929!4d-0.3881758!16s%2Fg%2F11x_pgqgsj',
  mapsEmbedUrl:
    'https://maps.google.com/maps?q=Espai+Aiyana,+Carrer+Julio+Colomer,+18,+46910+Alfafar,+Valencia&t=&z=16&ie=UTF8&iwloc=&output=embed',
  coordinates: {
    lat: 39.4220929,
    lng: -0.3881758,
  },
  rating: '5,0',
  reviewCount: 17,
  accessibility: 'Entrada a pie de calle y dos baños accesibles para personas en silla de ruedas.',
} as const;

export interface EventTab {
  id: string;
  label: string;
  selectValue: string;
  title: string;
  description: string;
  highlights: string[];
  image: ImageMetadata;
  alt: string;
  objectPosition: string;
}

export const EVENT_TABS: EventTab[] = [
  {
    id: 'cumpleanos',
    label: 'Cumpleaños y sorpresas',
    selectValue: 'Cumpleaños o fiesta',
    title: 'Cumpleaños de adultos, infantiles y fiestas sorpresa',
    description:
      'Una sala privada en exclusiva para celebrar a tu aire con familia y amigos, con espacio para mesas largas, música y juegos infantiles.',
    highlights: [
      'Mesas y sillas versátiles para comidas, meriendas o picoteo',
      'Juegos para niños y espacio despejado para disfrutar sin prisas',
      'Proyector en pared y equipo de música con altavoz para vídeos o listas',
      'Posibilidad de arco de globos, mesa dulce y tarta artesanal',
    ],
    image: eventCumpleanos,
    alt: 'Salón de Espai Aiyana preparado con mesas vestidas en crema y azul y arco de globos de cumpleaños',
    objectPosition: 'object-center',
  },
  {
    id: 'familia',
    label: 'Baby showers y familia',
    selectValue: 'Baby shower o comunión',
    title: 'Baby showers, bautizos, comuniones y reuniones',
    description:
      'Un entorno luminoso, limpio y acogedor donde cuidar cada detalle decorativo, proyectar recuerdos y estar cómodos desde la primera llegada.',
    highlights: [
      'Estética neutra en blanco, madera clara y verde salvia que combina con todo',
      'Aro de luz para sesiones de fotos y rincón de palillería iluminada',
      'Dos equipos de aire acondicionado y dos baños completos accesibles',
      'Trato directo con Isabel para coordinar decoración y catering si lo deseas',
    ],
    image: eventFamilia,
    alt: 'Mesa larga de celebración en Espai Aiyana con proyección en pared, zona de sofá y aro de luz',
    objectPosition: 'object-[center_45%]',
  },
  {
    id: 'talleres',
    label: 'Talleres y pop-ups',
    selectValue: 'Talleres y reuniones',
    title: 'Talleres creativos, cursos, reuniones y exposiciones',
    description:
      'Un espacio polivalente pensado también para creadores, empresas y exposiciones especiales como muestras de trajes de Fallera Mayor o comunión.',
    highlights: [
      'Iluminación clara y distribución adaptable para formaciones o pop-ups',
      'Zona office con cafetera de cápsulas, nevera y barra para pausas de café',
      'Proyector en techo listo para presentaciones y proyecciones de marca',
      'Ambiente cuidado a pie de calle en el centro de Alfafar',
    ],
    image: eventCafeTaller,
    alt: 'Rincón de café en Espai Aiyana con azulejo verde esmeralda brillante, cafetera de cápsulas y eucalipto',
    objectPosition: 'object-[center_55%]',
  },
  {
    id: 'catas',
    label: 'Catas y veladas',
    selectValue: 'Catas y veladas',
    title: 'Catas gastronómicas, tardeos y veladas temáticas',
    description:
      'Además de tus celebraciones privadas, la sala acoge experiencias en pequeño comité como las noches Cheese Lover o maridajes con música.',
    highlights: [
      'Barra península iluminada para servir vinos, cervezas artesanas o cócteles',
      'Montaje de mesas buffet de quesos y charcutería con colaboradores locales',
      'Iluminación cálida indirecta en barra, lámparas de ratán y palillería',
      'Acústica cuidada y altavoz propio para música ambiental o directo',
    ],
    image: eventCatas,
    alt: 'Tabla artesanal de quesos, uvas, higos y copas de vino en la experiencia Cheese Lover de Espai Aiyana',
    objectPosition: 'object-[center_58%]',
  },
];

export interface EquipmentGroup {
  title: string;
  items: string[];
}

export const EQUIPMENT_GROUPS: EquipmentGroup[] = [
  {
    title: 'Cocina office y barra',
    items: [
      'Barra península de madera y azulejo esmeralda con taburetes',
      'Nevera, botellero, microondas y fregadero independiente',
      'Cafetera de cápsulas, menaje básico y utensilios de cocina',
    ],
  },
  {
    title: 'Proyector y sonido',
    items: [
      'Proyector instalado en techo orientado a pared blanca',
      'Equipo de música con altavoz para listas o presentaciones',
      'Aro de luz para fotos, reels y recuerdos del evento',
    ],
  },
  {
    title: 'Confort y accesibilidad',
    items: [
      'Entrada a pie de calle accesible en silla de ruedas',
      'Dos baños amplios y adaptados para mayor comodidad',
      'Dos equipos de aire acondicionado para cualquier época del año',
    ],
  },
  {
    title: 'Mobiliario y detalles',
    items: [
      'Mesas largas polivalentes y sillas apilables',
      'Juegos para niños y zona de descanso con sofá',
      'Rincón de palillería iluminada, perchero y detalles boho',
    ],
  },
];

export const ISABEL_OPTIONS = [
  {
    title: 'Catering y buffets de quesos',
    description:
      'Opciones variadas para picoteo, mesas saladas o tablas de quesos artesanales listas cuando llegan tus invitados.',
  },
  {
    title: 'Tartas artesanales y mesa dulce',
    description:
      'Contacto directo con obradores y pastelerías de confianza para personalizar la tarta y los dulces de tu celebración.',
  },
  {
    title: 'Decoración con globos y ambientación',
    description:
      'Arcos de globos, mantelería y detalles temáticos coordinados con tiempo para que tú solo llegues a disfrutar.',
  },
];

export interface ReviewItem {
  author: string;
  occasion: string;
  quote: string;
}

export const FEATURED_REVIEW: ReviewItem = {
  author: 'David',
  occasion: 'Reseña en Google Maps',
  quote:
    'El local está muy cuidado y cuenta con todo lo necesario: dos lavabos, mobiliario, equipo de música, proyector, nevera, botellero y utensilios de cocina. Si además de alquilar el local quieres organizar un evento, Isabel te lo facilita todo muchísimo con opciones de catering, decoración, comidas y tartas.',
};

export const SECONDARY_REVIEWS: ReviewItem[] = [
  {
    author: 'Belén',
    occasion: 'Reseña en Google Maps',
    quote:
      'Un espacio al que no le falta de nada: mesas, sillas, altavoz, proyector, cocina y lavabos. Ideal para cualquier tipo de evento y celebración. Además, el trato con los dueños es excepcional, se preocupan por que todo esté perfecto.',
  },
  {
    author: 'Johanna',
    occasion: 'Baby shower en Espai Aiyana',
    quote:
      'Celebramos aquí el baby shower de nuestro bebé y fue una experiencia maravillosa. El lugar es precioso, acogedor y perfecto para este tipo de eventos. Tiene dos baños, altavoz, dos aires acondicionados y hasta juegos para niños.',
  },
  {
    author: 'Ana',
    occasion: 'Cumpleaños en Espai Aiyana',
    quote:
      'He celebrado mi cumpleaños en este local y he quedado encantada por la atención de la dueña. Es un espacio bonito, limpio y agradable para festejar. Lo recomiendo al 100%.',
  },
];

export const FAQ_ITEMS = [
  {
    question: '¿Puedo alquilar solo la sala y traer mi comida y decoración?',
    answer:
      'Sí. Puedes reservar el espacio en exclusiva para organizar el evento a tu manera, utilizando nuestras mesas, sillas, barra, nevera, botellero, microondas, cafetera y utensilios de cocina.',
  },
  {
    question: '¿También ayudáis a contratar catering, tarta o globos?',
    answer:
      'Sí. Si prefieres no preocuparte por los preparativos, Isabel te orienta y coordina opciones de catering, buffets de quesos, comidas, tartas artesanales y decoración con colaboradores habituales.',
  },
  {
    question: '¿Qué equipamiento audiovisual y de climatización incluye el local?',
    answer:
      'La sala dispone de proyector instalado en el techo sobre pared blanca, equipo de música con altavoz, aro de luz para fotografías, dos aires acondicionados y juegos para niños.',
  },
  {
    question: '¿El local está adaptado para personas con movilidad reducida y carritos?',
    answer:
      'Sí. Espai Aiyana está situado en un bajo a pie de calle con entrada accesible para personas en silla de ruedas y cuenta con dos baños, también adaptados.',
  },
  {
    question: '¿Cómo consulto disponibilidad, horarios y presupuesto para mi fecha?',
    answer:
      'Como cada evento se adapta a tu horario y necesidades, puedes enviarnos tu fecha aproximada desde el formulario de esta página o escribir directamente por WhatsApp y teléfono al 667 43 96 23.',
  },
];

export const EVENT_SELECT_OPTIONS = [
  'Cumpleaños o fiesta',
  'Baby shower o comunión',
  'Talleres y reuniones',
  'Catas y veladas',
  'Otro evento privado',
];
