import { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import { Mountain, Compass, MapPin, Eye, RotateCcw, Layers, Navigation } from 'lucide-react';
import { Language } from '../types';

interface InteractiveRouteMapProps {
  currentLang: Language;
  onOpenBooking?: () => void;
}

interface MountainPassData {
  id: string;
  name: Record<Language, string>;
  altitude: number;
  coordinates: [number, number];
  difficulty: Record<Language, string>;
  description: Record<Language, string>;
  features: Record<Language, string>;
}

const MOUNTAIN_PASSES: MountainPassData[] = [
  {
    id: 'tuz-ashuu',
    name: {
      ru: 'Перевал Туз-Ашуу',
      en: 'Tuz-Ashuu Pass',
      fr: 'Col de Touz-Achou',
      de: 'Tuz-Aschuu-Pass',
      pl: 'Przełęcz Tuz-Aszuu',
    },
    altitude: 3229,
    coordinates: [41.9280, 75.0920],
    difficulty: {
      ru: 'Средняя (конная тропа, серпантин)',
      en: 'Moderate (equestrian trail, switchbacks)',
      fr: 'Modéré (sentier équestre, lacets)',
      de: 'Mittel (Reitpfad, Serpentinen)',
      pl: 'Średnia (szlak konny, serpentyny)',
    },
    description: {
      ru: 'Классический северный перевал. Подъем из ущелья Килемче. С вершины перевала внезапно открывается захватывающая лазурная панорама озера Сон-Куль.',
      en: 'Classic northern gateway pass ascending from Kilemche gorge. The crest reveals a breathtaking instant panorama of the turquoise lake.',
      fr: 'Passage classique du nord montant de Kilemché. Le sommet dévoile subitement une vue grandiose sur l’immensité turquoise du lac.',
      de: 'Klassischer Nordpass aus der Kilemtsche-Schlucht. Am Passkamm öffnet sich schlagartig das atemberaubende Panorama des Sees.',
      pl: 'Klasyczna północna przełęcz od doliny Kilemche. Ze szczytu nagle ukazuje się zapierający dech widok na turkusową taflę jeziora.',
    },
    features: {
      ru: 'Вид на всё озеро · Цветущие эдельвейсы · Панорама 360°',
      en: 'Full lake view · Wild edelweiss · 360° panoramic view',
      fr: 'Vue intégrale sur le lac · Edelweiss sauvages · Panorama 360°',
      de: 'Blick auf den ganzen See · Edelweiß · 360°-Rundumblick',
      pl: 'Widok na całe jezioro · Dzikie szarotki · Panorama 360°',
    },
  },
  {
    id: 'kalmak-ashuu',
    name: {
      ru: 'Перевал Калмак-Ашуу',
      en: 'Kalmak-Ashuu Pass',
      fr: 'Col de Kalmak-Achou',
      de: 'Kalmak-Aschuu-Pass',
      pl: 'Przełęcz Kałmak-Aszuu',
    },
    altitude: 3446,
    coordinates: [41.9150, 75.4100],
    difficulty: {
      ru: 'Высокая (самый высокий перевал маршрута)',
      en: 'Challenging (highest pass on the trail)',
      fr: 'Exigeant (le col le plus haut du circuit)',
      de: 'Anspruchsvoll (höchster Pass der Route)',
      pl: 'Wymagająca (najwyższa przełęcz na trasie)',
    },
    description: {
      ru: 'Самый высокий перевал на восточном выходе из озерной котловины. Захватывающий спуск через хвойный каньон к реке Сары-Булак.',
      en: 'The highest mountain pass exiting the eastern basin. Majestic descent through fragrant pine canyons toward Sary-Bulak.',
      fr: 'Le col le plus élevé quittant la cuvette orientale. Descente pittoresque à travers les canyons de conifères vers Sary-Boulak.',
      de: 'Der höchste Pass am östlichen Seeausgang. Spektakulärer Abstieg durch duftende Kiefernschluchten nach Sary-Bulak.',
      pl: 'Najwyższa przełęcz na wschodnim wyjściu z kotliny. Malownicze zejście przez pachnący sosnowy kanion ku dolinie Sary-Bułak.',
    },
    features: {
      ru: 'Высочайшая точка 3446 м · Хвойные ущелья · Панорама хребтов',
      en: 'Highest peak 3,446 m · Pine canyon · Tian Shan peaks vista',
      fr: 'Point culminant à 3 446 m · Canyons sauvages · Panorama alpin',
      de: 'Höchster Punkt 3.446 m · Kiefernschlucht · Gipfelpanoramen',
      pl: 'Najwyższy punkt 3446 m · Sosnowy kanion · Panorama szczytów',
    },
  },
  {
    id: 'kara-keche',
    name: {
      ru: 'Перевал Кара-Кече',
      en: 'Kara-Keche Pass',
      fr: 'Col de Kara-Ketche',
      de: 'Kara-Ketsche-Pass',
      pl: 'Przełęcz Kara-Kecze',
    },
    altitude: 3384,
    coordinates: [41.7680, 74.7850],
    difficulty: {
      ru: 'Выше средней (дикое плато, сильный ветер)',
      en: 'Advanced (wild plateau, mountain winds)',
      fr: 'Soutenue (haut plateau sauvage, vents d’altitude)',
      de: 'Fortgeschritten (wildes Hochplateau, Gebirgswinde)',
      pl: 'Zaawansowana (dziki płaskowyż, wiatry)',
    },
    description: {
      ru: 'Западный перевал Большой экспедиции. Красные глиняные каньоны, табуны яков и суровые пастбища без единого туриста.',
      en: 'Western traverse pass used in the 7-day Grand Expedition. Dramatic red canyons, grazing yak herds, total seclusion.',
      fr: 'Col occidental de la Grande Expédition. Canyons d’argile rouge, hardes de yaks et solitude grandiose sans touristes.',
      de: 'Westlicher Pass der 7-tägigen Expedition. Rote Canyons, weidende Yak-Herden und absolute unberührte Einsamkeit.',
      pl: 'Zachodnia przełęcz Wielkiej Ekspedycji. Czerwone kaniony, stada jaków i całkowity brak innych turystów.',
    },
    features: {
      ru: 'Красные каньоны · Стада яков · Удаленные лагеря',
      en: 'Red canyons · Free-roaming yaks · Remote shepherd camps',
      fr: 'Canyons rouges · Troupeaux de yaks · Campements isolés',
      de: 'Rote Schluchten · Wilde Yaks · Abgeschiedene Lager',
      pl: 'Czerwone kaniony · Dzikie jaki · Odosobnione obozy',
    },
  },
  {
    id: 'teskey-torpok',
    name: {
      ru: 'Перевал Тескей-Торпок (33 Попугая)',
      en: 'Teskey-Torpok Pass (33 Parrots)',
      fr: 'Col Teskey-Torpok (33 Perroquets)',
      de: 'Teskey-Torpok-Pass (33 Papageien)',
      pl: 'Przełęcz Teskej-Torpok (33 Papugi)',
    },
    altitude: 3133,
    coordinates: [41.7330, 75.1480],
    difficulty: {
      ru: 'Средняя (33 крутых серпантина, водопад)',
      en: 'Moderate (33 tight switchbacks, waterfall)',
      fr: 'Modéré (33 lacets serrés, cascade)',
      de: 'Mittel (33 steile Serpentinen, Wasserfall)',
      pl: 'Średnia (33 ostre serpentyny, wodospad)',
    },
    description: {
      ru: 'Знаменитый перевал с 33 головокружительными петлями серпантина и водопадом Сон-Куль. Спуск ведет в живописную Нарынскую долину.',
      en: 'Legendary mountain pass famous for 33 dizzying hairpin serpentines and the Song-Kul waterfall plunging into Naryn valley.',
      fr: 'Célèbre col comptant 33 virages en lacets vertigineux et la spectaculaire cascade de Son-Koul.',
      de: 'Berühmter Pass mit 33 atemberaubenden Serpentinen und dem Son-Kul-Wasserfall hinab ins Naryn-Tal.',
      pl: 'Słynna przełęcz z 33 ostrymi serpentynami i wodospadem Song-köl spływającym ku dolinie Narynu.',
    },
    features: {
      ru: '33 серпантина · Горный водопад · Панорама каньона',
      en: '33 hairpins · Alpine waterfall · Canyon panorama',
      fr: '33 lacets spectaculaires · Cascade alpine · Vue sur le canyon',
      de: '33 Serpentinen · Gebirgswasserfall · Canyonaussicht',
      pl: '33 serpentyny · Wodospad górski · Panorama kanionu',
    },
  },
];

interface MapTexts {
  badge: string;
  title: string;
  subtitle: string;
  routeLegendCar: string;
  routeLegendHorse: string;
  routeLegendLoop: string;
  elevationBishkek: string;
  elevationPasses: string;
  elevationLake: string;
  resetView: string;
  topoLayer: string;
  osmLayer: string;
  selectedPassTitle: string;
  altitudeLabel: string;
  difficultyLabel: string;
  viewPassBtn: string;
  bookPassTourBtn: string;
  profileTitle: string;
}

const MAP_TEXTS: Record<Language, MapTexts> = {
  ru: {
    badge: 'Интерактивная карта экспедиции',
    title: 'Маршрут от Бишкека до озера Сон-Куль',
    subtitle: 'Исследуйте ключевые перевалы Тянь-Шаня, нитку автомобильного трансфера и конные тропы кочевников на высоте более 3000 метров.',
    routeLegendCar: 'Автотрансфер из Бишкека (220 км, ~3.5 ч)',
    routeLegendHorse: 'Конная тропа через перевал (2 дня в седле)',
    routeLegendLoop: 'Круговой траверс вокруг Сон-Куля (7 дней)',
    elevationBishkek: 'Бишкек: 800 м',
    elevationPasses: 'Перевалы: 3133 – 3446 м',
    elevationLake: 'Озеро Сон-Куль: 3016 м',
    resetView: 'Общий вид маршрута',
    topoLayer: 'Рельеф',
    osmLayer: 'Спутник / Карта',
    selectedPassTitle: 'Горные перевалы маршрута',
    altitudeLabel: 'Высота перевала',
    difficultyLabel: 'Сложность перехода',
    viewPassBtn: 'Показать на карте',
    bookPassTourBtn: 'Забронировать этот маршрут',
    profileTitle: 'Высотный профиль маршрута',
  },
  en: {
    badge: 'Interactive Expedition Map',
    title: 'Route from Bishkek to Lake Song-Kul',
    subtitle: 'Explore the high mountain passes of Tian Shan, scenic highway transfer, and ancient nomad horseback trails over 3,000 meters.',
    routeLegendCar: 'Vehicle transfer from Bishkek (220 km, ~3.5 hrs)',
    routeLegendHorse: 'Horse riding trail over mountain pass (2 days in saddle)',
    routeLegendLoop: 'Full Lake Song-Kul circular traverse (7 days)',
    elevationBishkek: 'Bishkek: 800 m',
    elevationPasses: 'Passes: 3,133 – 3,446 m',
    elevationLake: 'Lake Song-Kul: 3,016 m',
    resetView: 'Reset Full Route View',
    topoLayer: 'Topography',
    osmLayer: 'Standard Map',
    selectedPassTitle: 'Key Mountain Passes',
    altitudeLabel: 'Pass Altitude',
    difficultyLabel: 'Trail Difficulty',
    viewPassBtn: 'Zoom to Pass',
    bookPassTourBtn: 'Book This Route',
    profileTitle: 'Route Elevation Profile',
  },
  fr: {
    badge: 'Carte Interactive de l’Expédition',
    title: 'Itinéraire de Bichkek au Lac Son-Koul',
    subtitle: 'Découvrez les hauts cols des Tian Shan, le trajet routier pittoresque et les sentiers équestres nomades à plus de 3 000 mètres.',
    routeLegendCar: 'Transfert routier depuis Bichkek (220 km, ~3h30)',
    routeLegendHorse: 'Sentier équestre des cols (2 jours en selle)',
    routeLegendLoop: 'Grande boucle intégrale du Son-Koul (7 jours)',
    elevationBishkek: 'Bichkek : 800 m',
    elevationPasses: 'Cols : 3 133 – 3 446 m',
    elevationLake: 'Lac Son-Koul : 3 016 m',
    resetView: 'Vue d’ensemble',
    topoLayer: 'Relief',
    osmLayer: 'Carte standard',
    selectedPassTitle: 'Cols de montagne majeurs',
    altitudeLabel: 'Altitude du col',
    difficultyLabel: 'Difficulté du passage',
    viewPassBtn: 'Centrer sur le col',
    bookPassTourBtn: 'Réserver cet itinéraire',
    profileTitle: 'Profil altimétrique de l’itinéraire',
  },
  de: {
    badge: 'Interaktive Expeditionskarte',
    title: 'Route von Bischkek zum Son-Kul-See',
    subtitle: 'Erkunden Sie die spektakulären Tian-Shan-Gebirgspässe, den Autotransfer und historische Reitpfade über 3.000 Meter Höhe.',
    routeLegendCar: 'Fahrzeugtransfer ab Bischkek (220 km, ~3,5 Std.)',
    routeLegendHorse: 'Reitpfad über den Hochgebirgspass (2 Tage im Sattel)',
    routeLegendLoop: 'Große Seeumrundung (7 Tage)',
    elevationBishkek: 'Bischkek: 800 m',
    elevationPasses: 'Gebirgspässe: 3.133 – 3.446 m',
    elevationLake: 'Son-Kul-See: 3.016 m',
    resetView: 'Gesamtansicht',
    topoLayer: 'Topographie',
    osmLayer: 'Standardkarte',
    selectedPassTitle: 'Wichtigste Gebirgspässe',
    altitudeLabel: 'Passhöhe',
    difficultyLabel: 'Schwierigkeit',
    viewPassBtn: 'Pass auf Karte zeigen',
    bookPassTourBtn: 'Diesen Weg buchen',
    profileTitle: 'Höhenprofil der Expedition',
  },
  pl: {
    badge: 'Interaktywna Mapa Wyprawy',
    title: 'Trasa z Biszkeku nad Jezioro Song-köl',
    subtitle: 'Odkryj spektakularne przełęcze górskie Tienszanu, trasę dojazdu i szlaki konne nomadów na wysokości ponad 3000 metrów.',
    routeLegendCar: 'Dojazd busem z Biszkeku (220 km, ~3.5 h)',
    routeLegendHorse: 'Szlak konny przez przełęcz (2 dni w siodle)',
    routeLegendLoop: 'Pętla wokół całego jeziora (7 dni)',
    elevationBishkek: 'Biszkek: 800 m',
    elevationPasses: 'Przełęcze: 3133 – 3446 m',
    elevationLake: 'Jezioro Song-köl: 3016 m',
    resetView: 'Pełny widok trasy',
    topoLayer: 'Rzeźba terenu',
    osmLayer: 'Standardowa mapa',
    selectedPassTitle: 'Kluczowe przełęcze górskie',
    altitudeLabel: 'Wysokość przełęczy',
    difficultyLabel: 'Stopień trudności',
    viewPassBtn: 'Pokaż na mapie',
    bookPassTourBtn: 'Zarezerwuj tę trasę',
    profileTitle: 'Profil wysokościowy trasy',
  },
};

export function InteractiveRouteMap({ currentLang, onOpenBooking }: InteractiveRouteMapProps) {
  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const activeLayerGroupRef = useRef<L.LayerGroup | null>(null);
  const [selectedPassId, setSelectedPassId] = useState<string>('tuz-ashuu');
  const [mapType, setMapType] = useState<'osm' | 'topo'>('osm');

  const t = MAP_TEXTS[currentLang];
  const selectedPass = MOUNTAIN_PASSES.find((p) => p.id === selectedPassId) || MOUNTAIN_PASSES[0];

  useEffect(() => {
    if (!mapContainerRef.current) return;

    // Center coordinates between Bishkek and Song-Kul Lake
    const defaultCenter: [number, number] = [42.36, 75.05];
    const defaultZoom = 8;

    // Initialize Map instance
    const map = L.map(mapContainerRef.current, {
      center: defaultCenter,
      zoom: defaultZoom,
      minZoom: 7,
      maxZoom: 14,
      scrollWheelZoom: false, // Prevent page scroll interception
    });
    mapInstanceRef.current = map;

    // Tile layers
    const osmLayer = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 18,
      attribution: '&copy; OpenStreetMap contributors',
    });

    const topoLayer = L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
      maxZoom: 17,
      attribution: '&copy; OpenTopoMap contributors',
    });

    // Add chosen layer
    if (mapType === 'topo') {
      topoLayer.addTo(map);
    } else {
      osmLayer.addTo(map);
    }

    const layerGroup = L.layerGroup().addTo(map);
    activeLayerGroupRef.current = layerGroup;

    // 1. CAR TRANSFER ROUTE POLYLINE (Bishkek -> Boom -> Balykchy -> Kochkor -> Kyzart)
    const carRouteCoords: [number, number][] = [
      [42.8746, 74.5698], // Bishkek (800m)
      [42.8800, 75.0000], // Kant
      [42.8300, 75.3000], // Tokmok
      [42.6600, 75.7200], // Boom gorge entrance
      [42.5400, 75.9200], // Boom gorge scenic canyon
      [42.4500, 76.1800], // Balykchy / Issyk-Kul junction
      [42.2150, 75.7580], // Kochkor village (1800m)
      [42.1500, 75.3500], // Kochkor-Kyzart valley road
      [42.0620, 74.9820], // Kyzart village trailhead (2100m)
    ];

    const carPolyline = L.polyline(carRouteCoords, {
      color: '#0D9488', // Teal
      weight: 4,
      opacity: 0.85,
    }).addTo(layerGroup);
    carPolyline.bindTooltip(t.routeLegendCar, { sticky: true });

    // 2. HORSE RIDING TREK POLYLINE (Kyzart -> Kilemche -> Tuz-Ashuu Pass -> Song-Kul Lake Shore)
    const horseRouteCoords: [number, number][] = [
      [42.0620, 74.9820], // Kyzart (2100m)
      [42.0150, 75.0150], // Chaar-Archa pass
      [41.9750, 75.0500], // Kilemche valley yurt camp (2600m)
      [41.9450, 75.0750], // Steep Tuz-Ashuu ascent switchbacks
      [41.9280, 75.0920], // TUZ-ASHUU PASS (3229m)
      [41.9050, 75.1100], // Descent to lake basin
      [41.8750, 75.1350], // Northern Yurt Camp at Song-Kul (3016m)
      [41.8450, 75.1600], // Central lakeshore trail
    ];

    const horsePolyline = L.polyline(horseRouteCoords, {
      color: '#E11D48', // Vibrant Rose / Red equestrian trail
      weight: 4,
      dashArray: '6, 8',
      opacity: 0.95,
    }).addTo(layerGroup);
    horsePolyline.bindTooltip(t.routeLegendHorse, { sticky: true });

    // 3. RETURN / CIRCULAR TRAVERSE POLYLINE (Song-Kul -> Kalmak-Ashuu Pass -> Sary-Bulak -> Kyzart)
    const returnRouteCoords: [number, number][] = [
      [41.8750, 75.1350], // Song-Kul north camp
      [41.8900, 75.2500], // Batai-Aral pastures
      [41.9150, 75.4100], // KALMAK-ASHUU PASS (3446m)
      [41.9800, 75.6000], // Sary-Bulak gorge descent
      [42.0620, 74.9820], // Return to Kyzart
    ];

    const returnPolyline = L.polyline(returnRouteCoords, {
      color: '#2563EB', // Blue
      weight: 3.5,
      dashArray: '5, 6',
      opacity: 0.8,
    }).addTo(layerGroup);
    returnPolyline.bindTooltip('Перевал Калмак-Ашуу (3446 м) — возвращение в село Кызарт', { sticky: true });

    // 4. SOUTH-WEST GRAND TRAVERSE TRAIL (Song-Kul -> Kara-Keche 3384m & Teskey-Torpok 3133m)
    const traverseCoords: [number, number][] = [
      [41.8450, 75.1600], // Song-Kul south shore
      [41.7680, 74.7850], // Kara-Keche Pass (3384m)
      [41.8000, 75.0500], // South-east lake shore
      [41.7330, 75.1480], // Teskey-Torpok (33 Parrots Pass, 3133m)
    ];

    const traversePolyline = L.polyline(traverseCoords, {
      color: '#9333EA', // Purple
      weight: 3,
      dashArray: '4, 6',
      opacity: 0.75,
    }).addTo(layerGroup);
    traversePolyline.bindTooltip('Южные перевалы: Кара-Кече (3384 м) и Тескей-Торпок (3133 м)', { sticky: true });

    // Custom Marker Creator helper
    const createCustomIcon = (label: string, altitude: string, colorClass: string, isPass = false) => {
      return L.divIcon({
        className: 'custom-map-marker',
        html: `
          <div style="transform: translate(-50%, -100%);">
            <div style="background: ${colorClass}; color: white; padding: 3px 8px; border-radius: 6px; font-size: 11px; font-weight: bold; white-space: nowrap; box-shadow: 0 4px 10px rgba(0,0,0,0.3); border: 1.5px solid white; display: flex; align-items: center; gap: 4px;">
              <span>${isPass ? '🏔️' : '📍'}</span>
              <span>${label}</span>
              <span style="opacity: 0.85; font-size: 10px; font-weight: normal; margin-left: 2px;">(${altitude})</span>
            </div>
            <div style="width: 0; height: 0; border-left: 6px solid transparent; border-right: 6px solid transparent; border-top: 6px solid ${colorClass}; margin: 0 auto;"></div>
          </div>
        `,
        iconSize: [0, 0],
      });
    };

    // ADD KEY PASS MARKERS WITH INTERACTIVE POPUPS
    MOUNTAIN_PASSES.forEach((pass) => {
      const passName = pass.name[currentLang];
      const icon = createCustomIcon(passName, `${pass.altitude}m`, '#DC2626', true);
      const marker = L.marker(pass.coordinates, { icon }).addTo(layerGroup);

      marker.bindPopup(`
        <div style="font-family: inherit; padding: 2px; min-width: 200px;">
          <div style="font-size: 10px; text-transform: uppercase; font-weight: bold; color: #DC2626; margin-bottom: 2px;">🏔️ Горный перевал Тянь-Шаня</div>
          <div style="font-size: 14px; font-weight: bold; color: #0F2922; margin-bottom: 4px;">${passName}</div>
          <div style="font-size: 12px; font-weight: 600; color: #0F4C3A; margin-bottom: 6px;">Высота: ${pass.altitude} м над уровнем моря</div>
          <div style="font-size: 11px; color: #475569; line-height: 1.4; margin-bottom: 8px;">${pass.description[currentLang]}</div>
          <div style="font-size: 10px; background: #FEF2F2; color: #991B1B; padding: 4px 6px; border-radius: 4px; border: 1px solid #FEE2E2;">
            ${pass.difficulty[currentLang]}
          </div>
        </div>
      `);

      marker.on('click', () => {
        setSelectedPassId(pass.id);
      });
    });

    // ADD KEY WAYPOINT MARKERS
    // 1. Bishkek (Start)
    const bishkekIcon = createCustomIcon('Бишкек', '800м', '#0F4C3A');
    const bishkekMarker = L.marker([42.8746, 74.5698], { icon: bishkekIcon }).addTo(layerGroup);
    bishkekMarker.bindPopup(`
      <div style="font-size: 12px; font-weight: bold; color: #0F2922;">г. Бишкек (800 м)</div>
      <div style="font-size: 11px; color: #64748B;">Старт тура: трансфер из отеля или аэропорта Манас</div>
    `);

    // 2. Kyzart (Base & Trailhead)
    const kyzartIcon = createCustomIcon('с. Кызарт', '2100м', '#0F4C3A');
    const kyzartMarker = L.marker([42.0620, 74.9820], { icon: kyzartIcon }).addTo(layerGroup);
    kyzartMarker.bindPopup(`
      <div style="font-size: 12px; font-weight: bold; color: #0F2922;">село Кызарт (2100 м)</div>
      <div style="font-size: 11px; color: #64748B;">Конная база, примерка амуниции, знакомство с лошадьми и старт в седле!</div>
    `);

    // 4. Kilemche (Yurt Camp)
    const kilemcheIcon = createCustomIcon('джайлоо Килемче', '2600м', '#D97706');
    const kilemcheMarker = L.marker([41.9750, 75.0500], { icon: kilemcheIcon }).addTo(layerGroup);
    kilemcheMarker.bindPopup(`
      <div style="font-size: 12px; font-weight: bold; color: #0F2922;">Джайлоо Килемче (2600 м)</div>
      <div style="font-size: 11px; color: #64748B;">Первая ночевка в войлочных юртах перед штурмом перевала</div>
    `);

    // 5. Lake Song-Kul (Destination)
    const songkulIcon = L.divIcon({
      className: 'custom-lake-marker',
      html: `
        <div style="transform: translate(-50%, -50%);">
          <div style="background: #0284C7; color: white; padding: 5px 12px; border-radius: 20px; font-size: 12px; font-weight: 800; white-space: nowrap; box-shadow: 0 4px 14px rgba(2,132,199,0.5); border: 2px solid white; display: flex; align-items: center; gap: 6px;">
            <span>🌊</span>
            <span>Озеро Сон-Куль (3016 м)</span>
          </div>
        </div>
      `,
      iconSize: [0, 0],
    });
    const songkulMarker = L.marker([41.8350, 75.1500], { icon: songkulIcon }).addTo(layerGroup);
    songkulMarker.bindPopup(`
      <div style="padding: 4px; min-width: 210px;">
        <div style="font-size: 11px; color: #0284C7; font-weight: bold; text-transform: uppercase;">Цель экспедиции</div>
        <div style="font-size: 15px; font-weight: bold; color: #0F2922; margin-bottom: 4px;">Высокогорное озеро Сон-Куль</div>
        <div style="font-size: 12px; color: #0F4C3A; font-weight: 600; margin-bottom: 6px;">Высота: 3 016 метров</div>
        <div style="font-size: 11px; color: #475569; line-height: 1.4;">
          Юрточные лагеря, чистейшая вода, табуны свободных лошадей, ночевки с печками-буржуйками.
        </div>
      </div>
    `);

    // Fit bounds to entire route
    map.fitBounds([
      [42.8746, 74.5698], // Bishkek
      [41.7330, 75.4100], // Song-Kul & southern passes
    ], { padding: [50, 50] });

    return () => {
      map.remove();
      mapInstanceRef.current = null;
    };
  }, [currentLang, mapType]);

  // Zoom to a specific pass
  const handleSelectPass = (pass: MountainPassData) => {
    setSelectedPassId(pass.id);
    if (mapInstanceRef.current) {
      mapInstanceRef.current.flyTo(pass.coordinates, 11, {
        duration: 1.2,
      });
    }
  };

  // Reset to full view
  const handleResetView = () => {
    if (mapInstanceRef.current) {
      mapInstanceRef.current.fitBounds([
        [42.8746, 74.5698],
        [41.7330, 75.4100],
      ], { padding: [40, 40] });
    }
  };

  return (
    <section id="map" className="py-20 sm:py-28 bg-[#FBF9F5] border-b border-[#E2DDD5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <div className="text-xs font-semibold uppercase tracking-wider text-[#0F4C3A] mb-3 flex items-center gap-2">
            <Compass className="w-4 h-4 text-[#0F4C3A]" />
            <span>{t.badge}</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-[#0F2922] tracking-tight leading-tight mb-4 text-balance font-['Plus_Jakarta_Sans']">
            {t.title}
          </h2>
          <p className="text-base sm:text-lg text-[#475569] leading-relaxed">
            {t.subtitle}
          </p>
        </div>

        {/* Mountain Pass Spotlight Selector Tabs */}
        <div className="mb-6">
          <div className="text-xs font-bold uppercase tracking-wider text-[#64748B] mb-3 flex items-center justify-between">
            <span>{t.selectedPassTitle}:</span>
            <span className="text-xs text-[#0F4C3A] font-semibold">Нажмите на перевал для фокусировки</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {MOUNTAIN_PASSES.map((pass) => {
              const isSelected = pass.id === selectedPassId;
              const passName = pass.name[currentLang];
              return (
                <button
                  key={pass.id}
                  type="button"
                  onClick={() => handleSelectPass(pass)}
                  className={`p-4 rounded-xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                    isSelected
                      ? 'bg-[#0F2922] text-white border-[#34D399] shadow-md ring-2 ring-[#34D399]/30'
                      : 'bg-white text-[#1E293B] border-[#E2DDD5] hover:border-[#0F4C3A] shadow-xs'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-1.5">
                      <span className="text-base">🏔️</span>
                      <span
                        className={`text-xs font-extrabold tabular-nums px-2 py-0.5 rounded ${
                          isSelected ? 'bg-[#34D399] text-[#0F2922]' : 'bg-[#EBF7F2] text-[#0F4C3A]'
                        }`}
                      >
                        {pass.altitude} м
                      </span>
                    </div>
                    <div className="font-bold text-sm leading-tight mb-1">
                      {passName}
                    </div>
                  </div>
                  <div
                    className={`text-[11px] truncate mt-2 ${
                      isSelected ? 'text-[#A7F3D0]' : 'text-[#64748B]'
                    }`}
                  >
                    {pass.features[currentLang]}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Map Container & Control Bar */}
        <div className="bg-white rounded-3xl border border-[#E2DDD5] shadow-sm overflow-hidden mb-8">
          {/* Top Control Strip */}
          <div className="p-4 bg-[#F8F6F0] border-b border-[#E2DDD5] flex flex-wrap items-center justify-between gap-3 text-xs">
            <div className="flex flex-wrap items-center gap-4 text-[#334155] font-medium">
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-1 bg-[#0D9488] rounded-full inline-block" />
                <span>{t.routeLegendCar}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-1 bg-[#E11D48] rounded-full inline-block" />
                <span>{t.routeLegendHorse}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-1 bg-[#2563EB] rounded-full inline-block" />
                <span>Возвращение (Калмак-Ашуу)</span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setMapType(mapType === 'osm' ? 'topo' : 'osm')}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[#D5CEC2] bg-white hover:border-[#0F4C3A] text-xs font-semibold text-[#1E293B] shadow-xs transition-colors cursor-pointer"
                title="Переключить слой рельефа"
              >
                <Layers className="w-3.5 h-3.5 text-[#0F4C3A]" />
                <span>{mapType === 'osm' ? t.topoLayer : t.osmLayer}</span>
              </button>

              <button
                type="button"
                onClick={handleResetView}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[#D5CEC2] bg-white hover:border-[#0F4C3A] text-xs font-semibold text-[#1E293B] shadow-xs transition-colors cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5 text-[#0F4C3A]" />
                <span className="hidden sm:inline">{t.resetView}</span>
              </button>
            </div>
          </div>

          {/* Leaflet Map DOM Element */}
          <div
            ref={mapContainerRef}
            className="w-full h-[450px] sm:h-[540px] z-10"
            style={{ background: '#E2E8F0' }}
          />

          {/* Active Pass Detailed Insight Footer */}
          <div className="p-6 bg-[#0F2922] text-white flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-1.5">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#34D399]">
                <Mountain className="w-4 h-4 text-[#34D399]" />
                <span>Фокус: {selectedPass.name[currentLang]}</span>
                <span className="bg-white/10 px-2 py-0.5 rounded text-white tabular-nums">
                  {selectedPass.altitude} метров
                </span>
              </div>
              <p className="text-xs sm:text-sm text-[#E2EBE6] max-w-2xl leading-relaxed">
                {selectedPass.description[currentLang]}
              </p>
              <div className="text-xs text-[#A7F3D0] pt-1">
                <strong>{t.difficultyLabel}:</strong> {selectedPass.difficulty[currentLang]}
              </div>
            </div>

            <div className="flex items-center gap-3 shrink-0">
              <button
                type="button"
                onClick={() => handleSelectPass(selectedPass)}
                className="px-4 py-2.5 rounded-xl border border-white/20 hover:border-white text-xs font-semibold text-white transition-colors cursor-pointer flex items-center gap-1.5"
              >
                <Eye className="w-4 h-4" />
                <span>{t.viewPassBtn}</span>
              </button>

              {onOpenBooking && (
                <button
                  type="button"
                  onClick={onOpenBooking}
                  className="px-5 py-2.5 rounded-xl bg-[#34D399] hover:bg-[#2BB683] text-[#0F2922] font-bold text-xs shadow-md transition-all cursor-pointer whitespace-nowrap"
                >
                  {t.bookPassTourBtn}
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Elevation Profile Graphic / Waypoint Progression */}
        <div className="bg-white rounded-3xl border border-[#E2DDD5] p-6 sm:p-8 shadow-xs">
          <div className="flex items-center justify-between gap-4 mb-6">
            <div className="text-sm font-bold text-[#0F2922] flex items-center gap-2">
              <Navigation className="w-4 h-4 text-[#0F4C3A]" />
              <span>{t.profileTitle} (от Бишкека 800 м до перевалов 3446 м)</span>
            </div>
            <div className="text-xs text-[#64748B] hidden sm:block">
              Общий набор высоты: +2646 м
            </div>
          </div>

          {/* Visual Elevation Steps */}
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3">
            <div className="p-3.5 rounded-xl bg-[#FBF9F5] border border-[#E2DDD5]">
              <div className="text-xs text-[#64748B] mb-1">г. Бишкек</div>
              <div className="text-lg font-bold text-[#0F2922] tabular-nums">800 м</div>
              <div className="text-[10px] text-[#0F4C3A] font-semibold mt-1">Старт экспедиции</div>
            </div>

            <div className="p-3.5 rounded-xl bg-[#FBF9F5] border border-[#E2DDD5]">
              <div className="text-xs text-[#64748B] mb-1">Боомское ущелье</div>
              <div className="text-lg font-bold text-[#0F2922] tabular-nums">1 500 м</div>
              <div className="text-[10px] text-[#64748B] mt-1">Каньон реки Чу</div>
            </div>

            <div className="p-3.5 rounded-xl bg-[#FBF9F5] border border-[#E2DDD5]">
              <div className="text-xs text-[#64748B] mb-1">село Кызарт</div>
              <div className="text-lg font-bold text-[#0F2922] tabular-nums">2 100 м</div>
              <div className="text-[10px] text-[#0F4C3A] font-semibold mt-1">Конная база и старт</div>
            </div>

            <div className="p-3.5 rounded-xl bg-[#FBF9F5] border border-[#E2DDD5]">
              <div className="text-xs text-[#64748B] mb-1">джайлоо Килемче</div>
              <div className="text-lg font-bold text-[#0F2922] tabular-nums">2 600 м</div>
              <div className="text-[10px] text-[#D97706] font-semibold mt-1">1-й юрточный лагерь</div>
            </div>

            <div className="p-3.5 rounded-xl bg-[#FFF8F8] border border-[#FECDD3]">
              <div className="text-xs text-[#991B1B] font-semibold mb-1">пер. Туз-Ашуу 🏔️</div>
              <div className="text-lg font-bold text-[#DC2626] tabular-nums">3 229 м</div>
              <div className="text-[10px] text-[#DC2626] font-semibold mt-1">Выход к озеру</div>
            </div>

            <div className="p-3.5 rounded-xl bg-[#F0F9FF] border border-[#BAE6FD]">
              <div className="text-xs text-[#0369A1] font-semibold mb-1">Озеро Сон-Куль 🌊</div>
              <div className="text-lg font-bold text-[#0284C7] tabular-nums">3 016 м</div>
              <div className="text-[10px] text-[#0284C7] font-semibold mt-1">Альпийское плато</div>
            </div>

            <div className="p-3.5 rounded-xl bg-[#FFF8F8] border border-[#FECDD3]">
              <div className="text-xs text-[#991B1B] font-semibold mb-1">пер. Калмак-Ашуу 🏔️</div>
              <div className="text-lg font-bold text-[#DC2626] tabular-nums">3 446 м</div>
              <div className="text-[10px] text-[#DC2626] font-semibold mt-1">Высшая точка</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
