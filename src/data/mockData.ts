import { PricingPlan, OrderBump, DemoTrack, Testimonial, GenreCategory } from '../types';

export const PRICING_PLANS: PricingPlan[] = [
  {
    id: 'basic',
    name: 'Pacote Básico',
    originalPrice: 39.90,
    currentPrice: 7.99,
    installmentText: 'pagamento único',
    description: 'Acesso imediato ao acervo essencial de faixas em MP3.',
    features: [
      { text: '+150 Mil Músicas MP3' },
      { text: 'Acesso Vitalício' },
    ],
    isFeatured: false,
  },
  {
    id: 'vip',
    name: 'Pacote VIP',
    badge: 'MAIS VENDIDO',
    originalPrice: 89.90,
    currentPrice: 19.90,
    installmentText: 'pagamento único',
    description: 'O mais completo da internet com todos os bônus e atualizações.',
    features: [
      { text: '+150 Mil Músicas MP3', highlight: true },
      { text: 'Acesso Vitalício', highlight: true },
      { text: 'Suporte VIP', highlight: true },
      { text: '+3.000 Clipes Musicais', highlight: true },
      { text: 'Atualização Mensal', highlight: true },
      { text: '[Extra] Flashback + Sertanejo Universitário', highlight: true },
      { text: 'Pack de Desenhos Na Multimídia (Para as Crianças)', highlight: true },
    ],
    isFeatured: true,
  },
];

export const ORDER_BUMPS: OrderBump[] = [
  {
    id: 'dj_effects',
    title: 'Adicionar Pack Pro DJ & Efeitos Sonoros 2026',
    tag: 'OFERTA ÚNICA',
    description: 'Mais de 1.200 vinhetas neutras, sub-graves de impacto, risers, buzinas automotivas e transições para mixar em tempo real.',
    price: 6.90,
    originalPrice: 47.00,
  },
  {
    id: 'priority_drive',
    title: 'Acesso Espelho VIP no Google Drive + Telegram VIP',
    tag: 'RECOMENDADO',
    description: 'Servidor espelho dedicado sem limite de cota diária de download + Canal secreto no Telegram com lançamentos toda semana.',
    price: 7.90,
    originalPrice: 39.00,
  }
];

export const DEMO_TRACKS: DemoTrack[] = [
  {
    id: 'piseiro',
    title: 'Piseiro 2026 Especial',
    genre: 'Piseiro / Paredão',
    tag: 'Grave Tremendo o Chão',
    bpm: 142,
    duration: '0:45',
    description: 'Batida pesada, bumbo seco e sanfona estalada, mixado especificamente para cornetas e woofers.',
  },
  {
    id: 'megafunk',
    title: 'Mega Funk Baile de Rua',
    genre: 'Mega Funk / Mandela',
    tag: 'Sub-Grave 808 Explosivo',
    bpm: 130,
    duration: '0:48',
    description: 'Frequências baixas a 42Hz para disparar alarmes, sem cortes de dinâmicas e sem compressão de rádio.',
  },
  {
    id: 'pagode',
    title: 'Pagode & Samba Sunset',
    genre: 'Pagode Universitário',
    tag: 'Harmonia & Batucada Cristalina',
    bpm: 110,
    duration: '0:50',
    description: 'Cavaco de alta definição, surdo aveludado e percussão balanceada para caixas JBL e som ambiente.',
  },
];

export const GENRES_LIST: GenreCategory[] = [
  {
    id: 'sertanejo',
    name: 'Sertanejo Universitário & Sofrência',
    count: '+32.000 faixas',
    description: 'Gusttavo Lima, Jorge & Mateus, Henrique & Juliano, Ana Castela, Luan Santana, Simone Mendes.',
    color: 'from-amber-500/20 to-orange-600/10',
    popularArtists: ['Ana Castela', 'Henrique & Juliano', 'Zé Neto & Cristiano'],
  },
  {
    id: 'funk',
    name: 'Funk & Mega Funk 2026',
    count: '+28.000 faixas',
    description: 'Funk BH, Mandelão de SP, Mega Funk de Curitiba, Funk 150BPM e montagens automotivas.',
    color: 'from-fuchsia-500/20 to-pink-600/10',
    popularArtists: ['MC Ryan SP', 'MC Cabelinho', 'DJ Arana', 'MC Hariel'],
  },
  {
    id: 'piseiro',
    name: 'Piseiro & Forró de Paredão',
    count: '+22.000 faixas',
    description: 'João Gomes, Iguinho & Lulinha, Tarcísio do Acordeon, Nattanzinho, Marcynho Sensação.',
    color: 'from-emerald-500/20 to-teal-600/10',
    popularArtists: ['João Gomes', 'Nattanzinho', 'Tarcísio do Acordeon'],
  },
  {
    id: 'eletronica',
    name: 'Eletrônica, Vintage & Tech House',
    count: '+18.000 faixas',
    description: 'Alok, Vintage Culture, Mochakk, Cat Dealers, Dubdogz, Bhaskar e sets extendidos.',
    color: 'from-cyan-500/20 to-blue-600/10',
    popularArtists: ['Vintage Culture', 'Alok', 'Mochakk', 'Illusionize'],
  },
  {
    id: 'pagode',
    name: 'Pagode, Samba & Pagode Baiano',
    count: '+16.000 faixas',
    description: 'Menos é Mais, Dilsinho, Ferrugem, Sorriso Maroto, Thiaguinho, Revelação, Psirico.',
    color: 'from-yellow-500/20 to-amber-600/10',
    popularArtists: ['Menos é Mais', 'Sorriso Maroto', 'Thiaguinho'],
  },
  {
    id: 'flashback',
    name: 'Flashback Anos 70, 80, 90 & 2000',
    count: '+20.000 faixas',
    description: 'Eurodance, Pop Clássico, Disco, Flash House, Rock Nacional e sucessos memoráveis.',
    color: 'from-violet-500/20 to-purple-600/10',
    popularArtists: ['Michael Jackson', 'ABBA', 'Legião Urbana', 'Queen'],
  },
  {
    id: 'trap_rap',
    name: 'Trap Nacional & Hip-Hop',
    count: '+12.000 faixas',
    description: 'Matuê, WIU, Teto, KayBlack, Veigh, Orochi, Filipe Ret, Djonga, MC Poze.',
    color: 'from-red-500/20 to-rose-600/10',
    popularArtists: ['Matuê', 'Veigh', 'KayBlack', 'Filipe Ret'],
  },
  {
    id: 'tiktok',
    name: 'TikTok Hits & Trends 2026',
    count: '+10.000 faixas',
    description: 'Músicas virais dos Reels, Shorts e TikTok, versões aceleradas (Speed Up) e remixes exclusivos.',
    color: 'from-sky-500/20 to-indigo-600/10',
    popularArtists: ['Trends Virais', 'Remixes 2026', 'Speed Up'],
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: '1',
    name: 'Ricardo Mendes',
    location: 'Ribeirão Preto - SP',
    verified: true,
    carSetup: 'Saveiro Cross c/ Paredão 4 Woofers',
    quote: 'Valeu cada centavo! Eu costumava baixar música do YouTube e o áudio vinha todo achatado, além daquelas vinhetas chatas de DJ gritando no meio da música. Esse pack é 100% limpo, grave bate firme sem distorcer.',
    rating: 5,
    timeAgo: 'há 2 dias',
  },
  {
    id: '2',
    name: 'José Carlos Silva',
    location: 'Goiânia - GO',
    verified: true,
    carSetup: 'Hilux c/ Caixa Trio Selada',
    quote: 'Coloquei no meu pendrive de 64GB em 15 minutos pelo link do Google Drive. Fui para a fazenda no fim de semana e tocou mais de 48 horas seguidas sem repetir nenhuma música. Qualidade impecável!',
    rating: 5,
    timeAgo: 'ontem',
  },
  {
    id: '3',
    name: 'Amanda Silveira',
    location: 'Curitiba - PR',
    verified: true,
    carSetup: 'Caixa JBL Boombox 3',
    quote: 'A organização em pastas salvou a minha vida. Tem tudo separado por artista e estilo. No meu churrasco de aniversário foi só dar play e deixar rolando. O suporte no WhatsApp ainda me ensinou a formatar o pendrive.',
    rating: 5,
    timeAgo: 'há 3 dias',
  },
  {
    id: '4',
    name: 'Carlos Eduardo Santos',
    location: 'Feira de Santana - BA',
    verified: true,
    carSetup: 'Paredão Som Automotivo',
    quote: 'Sou DJ de eventos aqui na região e posso afirmar: a equalização das músicas tá no ponto certo. Não precisa ficar ajustando ganho no crossover a toda faixa. O Pacote VIP com os clipes foi o melhor investimento.',
    rating: 5,
    timeAgo: 'há 5 dias',
  },
];

export const HARDWARE_BRANDS = [
  { name: 'Pioneer', category: 'Som Automotivo' },
  { name: 'JBL Harman', category: 'Caixas Bluetooth' },
  { name: 'Sony', category: 'Aparelhos & Soundbars' },
  { name: 'Taramps', category: 'Módulos Amplificadores' },
  { name: 'Stetsom', category: 'Processadores de Áudio' },
  { name: 'Soundigital', category: 'Potência Alta Fidelidade' },
  { name: 'Alpine', category: 'Multimídias Hi-Res' },
  { name: 'JVC Kenwood', category: 'Receivers' },
  { name: 'Amvox', category: 'Caixas Amplificadas' },
  { name: 'Edifier', category: 'Monitores de Áudio' },
  { name: 'Mondial', category: 'Caixas de Som' },
  { name: 'Pulse', category: 'Speakers Portáteis' },
  { name: 'Philips', category: 'Som Automotivo' },
  { name: 'Bravox', category: 'Subwoofers & Kits' },
];

export const FAQ_ITEMS = [
  {
    question: 'Como funciona o acesso? Recebo na mesma hora?',
    answer: 'Sim! Imediatamente após a confirmação do pagamento (PIX é instantâneo em 5 segundos, Cartão em até 1 minuto), você recebe em seu e-mail e no WhatsApp o link exclusivo e vitalício no Google Drive de alta velocidade. Basta clicar e baixar.'
  },
  {
    question: 'Preciso de internet para ouvir as músicas depois?',
    answer: 'Não! Você faz o download para o seu computador, celular, tablet ou passa diretamente para um Pen Drive / Cartão SD. Depois disso, tudo roda 100% offline em qualquer lugar: na praia, estrada, fazenda ou churrasco.'
  },
  {
    question: 'As músicas realmente NÃO têm vinhetas ou propagandas?',
    answer: 'Garantia total de 100% sem vinhetas! Todas as músicas do nosso acervo são extraídas em estúdio de masters originais ou remasterizadas em 320kbps estéreo limpo, sem nomes de outros DJs gravados por cima, sem cortes e sem propaganda.'
  },
  {
    question: 'Funciona no meu carro / multimídia / pendrive antigo?',
    answer: 'Sim! Os arquivos são no formato MP3 Universal (áudio padrão mundial) e compatíveis com 100% dos aparelhos de som automotivo (Pioneer, Positron, Multilaser), multimídias Android/Carplay, caixas JBL, Amvox, aparelhos de DVD e celulares.'
  },
  {
    question: 'O que vem no bônus de 3.000 clipes musicais?',
    answer: 'São vídeos de música em resolução Full HD (1080p) e formato MP4 leve, perfeitos para rodar na tela da central multimídia do carro, telão de festa ou Smart TV via pendrive, criando um ambiente de balada ao vivo.'
  },
  {
    question: 'E se eu não gostar ou tiver dificuldade para baixar?',
    answer: 'Você conta com a nossa Garantia Incondicional de 7 Dias. Se por qualquer motivo você não gostar ou se arrepender, basta enviar uma mensagem no WhatsApp do nosso suporte que devolvemos 100% do seu dinheiro na hora, sem perguntas.'
  },
  {
    question: 'Como funciona a atualização mensal de 2026?',
    answer: 'Quem adquire o Pacote VIP tem acesso a uma pasta exclusiva no Google Drive chamada "Lançamentos 2026". Todo mês nossa equipe adiciona de 500 a 1.000 novas faixas que estão estouradas nas paradas, sem você precisar pagar nada a mais.'
  }
];

export const SALES_TOAST_POOL = [
  { name: 'Marcos R.', city: 'Goiânia', state: 'GO', plan: 'Pacote VIP Completo' },
  { name: 'Lucas S.', city: 'Campinas', state: 'SP', plan: 'Pacote VIP Completo' },
  { name: 'Rodrigo M.', city: 'Fortaleza', state: 'CE', plan: 'Pacote VIP Completo' },
  { name: 'Matheus F.', city: 'Belo Horizonte', state: 'MG', plan: 'Pacote Básico' },
  { name: 'Gabriel P.', city: 'Curitiba', state: 'PR', plan: 'Pacote VIP Completo' },
  { name: 'Thiago A.', city: 'Salvador', state: 'BA', plan: 'Pacote VIP Completo' },
  { name: 'Diego N.', city: 'Ribeirão Preto', state: 'SP', plan: 'Pacote VIP Completo' },
  { name: 'Felipe C.', city: 'Joinville', state: 'SC', plan: 'Pacote VIP Completo' },
  { name: 'Wellington B.', city: 'Brasília', state: 'DF', plan: 'Pacote VIP Completo' },
];
