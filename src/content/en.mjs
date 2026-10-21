export default {
  code: 'en', htmlLang: 'en', label: 'EN',
  ui: {
    vat: 'excl. VAT', vatLong: 'All prices exclude VAT', from: 'from', m2: 'm²', mb: 'm',
    perM2: 'kr / m²', perMb: 'kr / m', kr: 'kr', price: 'Price', byScope: 'Quote based on the scope of work',
    call: 'Call', menu: 'Menu', quote: 'Request a quote', calc: 'Estimate the cost', more: 'View service',
    home: 'Home', related: 'See also', faq: 'Frequently asked questions',
    includes: 'What work we do', process: 'How we work', pricing: 'Pricing',
    skip: 'Skip to content',
    langName: 'Language'
  },
  nav: { services: 'Services', prices: 'Pricing and calculator', faq: 'FAQ', contact: 'Contact' },
  seo: {
    home: ['Prime Verk: painting, tiling and flooring, Reykjavík', 'Painting, plastering, tiling, bathroom finishing and flooring in Reykjavík, Keflavík and Selfoss. Price list and online cost calculator.'],
    services: ['Interior finishing services in Reykjavík | Prime Verk', 'Painting, plastering, tiling, bathroom finishing and flooring in Reykjavík. See the scope of work and indicative prices.'],
    prices: ['Price list and cost calculator | Prime Verk', 'Rates for painting, plastering, tiling, waterproofing and flooring (excl. VAT) and a calculator for the estimated cost of finishing work.'],
    faq: ['Frequently asked questions about quotes | Prime Verk', 'Answers on quotes, prices and scope of finishing work in Reykjavík, Keflavík and Selfoss.'],
    contact: ['Contact and quote request | Prime Verk', 'Call, email or describe your job in the form. We work in Reykjavík, Keflavík and Selfoss.']
  },
  home: {
    eyebrow: 'Done properly',
    title: 'Painting, tiling and flooring in Reykjavík and surroundings',
    lead: 'From refreshing walls to finishing a bathroom. We prepare the substrate, do the agreed work and check the result with you at handover.',
    help: 'Check the estimated cost in the calculator, or describe your job to get an individual quote.',
    areaLabel: 'Where we work:',
    area: 'Reykjavík, Keflavík, Selfoss and surroundings',
    servicesTitle: 'Five kinds of finishing work',
    servicesLead: 'Choose a service to see the scope of work and indicative prices.',
    whyTitle: 'Why Prime Verk',
    why: [
      ['Check the cost before you call', 'The price list and calculator are on the site. You see the rates and an estimate before you pick up the phone.', 'tag'],
      ['A quote based on the scope of work', 'We set the price from the area, the condition of the substrate and the scope of work.', 'ruler'],
      ['Substrate preparation', 'Plastering, levelling the substrate for tiles and panels, and waterproofing are all part of what we do.', 'level'],
      ['Several jobs from one contractor', 'Painting, plastering, tiling, bathroom finishing and flooring can all go in one job.', 'handshake']
    ],
    calcTitle: 'Check the estimated cost',
    calcLead: 'Choose the type of work and enter the area. The calculator adds up the rates from the price list. You can see all the rates in the price list.',
    calcBtn: 'Open the calculator',
    miniLabel: 'Painting walls and ceilings',
    miniNote: 'Price for labour only. Enter the area of the walls and ceilings to be painted.',
    processTitle: 'How we work together',
    process: [
      ['Enquiry', 'You call, write or send the estimate from the calculator.'],
      ['Site visit and offer', 'We agree the scope of work and prepare an offer.'],
      ['The work', 'We do the work as agreed in the offer.'],
      ['Handover', 'We check the result together and hand over the finished work.']
    ],
    faqTitle: 'Common questions about quotes and scope of work',
    faqAll: 'See all questions',
    ctaTitle: 'Describe your job and we will prepare a quote',
    ctaLead: 'Tell us the type of work, the town, the approximate area and when you want to start.'
  },
  items: {
    paint: { n: 'Painting walls and ceilings', s: 'primed walls, refresh, minor preparation', m: 'Labour only' },
    spackle: { n: 'Plastering' },
    joints: { n: 'Plastering plasterboard joints', s: 'mesh tape and two coats of compound' },
    renovate: { n: 'Renovating old walls', s: 'scraping, removing cracks, levelling walls and other work' },
    floorTile: { n: 'Floor tiles', s: 'standard size' },
    wallTile: { n: 'Wall tiles', s: 'standard size' },
    largeTile: { n: 'Large-format tiles and mosaics', s: 'e.g. 60×120 cm' },
    removeTile: { n: 'Removing old tiles' },
    waterproof: { n: 'Wet-area waterproofing', s: 'liquid membrane with sealing tapes' },
    panelClick: { n: 'Laying panels', s: 'click system' },
    panelGlue: { n: 'Laying vinyl panels', s: 'glued down' },
    leveling: { n: 'Self-levelling compound', s: 'screed', m: 'Price includes material' },
    removeFloor: { n: 'Removing the old floor', s: 'parquet, tiles or carpet, substrate preparation' }
  },
  itemHints: {
    paint: 'the area of the walls and ceilings to be painted',
    spackle: 'the area of the walls and ceilings to be plastered',
    joints: 'the total length of the plasterboard joints',
    renovate: 'the area of the walls to be renovated',
    floorTile: 'the floor area',
    wallTile: 'the wall area',
    largeTile: 'the area to be tiled',
    removeTile: 'the area of tiles to be removed',
    waterproof: 'the area to be waterproofed',
    panelClick: 'the floor area',
    panelGlue: 'the floor area',
    leveling: 'the floor area',
    removeFloor: 'the floor area'
  },
  calcGroups: { paint: 'Painting', plaster: 'Plastering and repairs', tiles: 'Tiles, tile removal and waterproofing', floor: 'Flooring' },
  svc: {
    index: { title: 'Services', lead: 'Five kinds of finishing work. Choose a service to see the scope of work and indicative prices.' },
    painting: {
      name: 'Painting', short: 'Painting and refreshing walls and ceilings.',
      stepsTitle: 'How painting works', faqTitle: 'Questions about painting',
      seo: ['Interior painting Reykjavík from 3.000 kr/m² | Prime Verk', 'Painting walls and ceilings in Reykjavík and surroundings. Labour from 3.000 kr/m² (excl. VAT).'],
      lead: 'We paint walls and ceilings. The base rate covers refreshing walls that are already primed.',
      intro: ['The rate of 3.000 kr/m² covers labour only. It applies to walls that are already primed and need a refresh, with minor preparation.', 'If the walls need repair, we level them first. The quote describes the scope of that work.'],
      includes: ['Painting walls', 'Painting ceilings', 'Refreshing walls that are already primed', 'Minor surface preparation', 'Clean edges and colour transitions'],
      steps: [['Site visit', 'We check the condition of the walls and the area.'], ['Preparation', 'We prepare the surfaces.'], ['Painting', 'We apply the coats.'], ['Handover', 'We check the edges and coverage together.']],
      photos: ['A painted living room', 'Roller and paint on a wall', 'White wall, colour contrast'],
      faq: [
        ['Does the price include paint?', 'No, the rate is for labour only. We agree materials when quoting: you can buy the paint yourself or agree with us that we buy it.'],
        ['How many coats of paint do you apply?', 'It depends on the colour, the condition of the walls and the paint. We put the scope in the offer.'],
        ['What if the walls are in poor condition?', 'We price plastering and crack repair separately, from the plastering price list.'],
        ['How long does it take to paint an apartment?', 'It depends on the area and the condition of the walls. We give an approximate time in the offer, after the site visit.'],
        ['Do you paint ceilings?', 'Yes. Ceilings are part of the painting scope. When you ask for a quote, give the total area of walls and ceilings.']
      ]
    },
    plastering: {
      name: 'Plastering and repairs', short: 'Smooth walls, plasterboard joints and renovation of old walls.',
      stepsTitle: 'How plastering works', faqTitle: 'Questions about plastering and repairs',
      seo: ['Wall plastering Reykjavík from 3.500 kr/m² | Prime Verk', 'Wall plastering, plasterboard joints and renovation of old walls in Reykjavík. From 3.500 kr/m² (excl. VAT).'],
      lead: 'We prepare walls for painting, from plastering plasterboard joints to renovating old walls.',
      intro: ['A good paint job starts with a good wall. We plaster whole surfaces or only the plasterboard joints. We also repair cracks and uneven areas.', 'On old walls we scrape, remove cracks and level the surface.'],
      includes: ['Plastering walls and ceilings', 'Plasterboard joints: mesh tape and two coats of compound', 'Repairing cracks', 'Levelling uneven walls', 'Renovating old walls'],
      steps: [['Assessing the substrate', 'We check flatness and cracks.'], ['Repairs', 'We scrape off old layers and remove cracks.'], ['Plastering', 'We apply the compound and level the surface.'], ['Handover', 'We check the surface together.']],
      photos: ['A plastered wall', 'Plasterboard joint', 'Renovation of an old wall'],
      faq: [
        ['What is the difference between plastering a whole wall and plasterboard joints?', 'For joints we work only on the seams between boards. We embed the mesh tape and apply two coats of compound (4.000 kr/m). Plastering a whole surface is a separate item in the price list.'],
        ['What does the price of plastering depend on?', 'On the condition of the walls and the scope of work. That is why the price list gives a range of 3.500–5.000 kr/m².'],
        ['When do old walls need renovation?', 'When they have cracks, uneven areas or need scraping. Prices then start at 5.000 kr/m².'],
        ['Can I paint straight after plastering?', 'The compound has to dry first. We agree when painting can start while we do the work.'],
        ['Do you do plastering and painting together?', 'Yes. We can price both in a single offer.']
      ]
    },
    tiling: {
      name: 'Tiling', short: 'Floor and wall tiles, large formats and mosaics.',
      stepsTitle: 'How tiling works', faqTitle: 'Questions about tiling',
      seo: ['Tiling Reykjavík from 7.500 kr/m² | Prime Verk', 'Floor and wall tiles, large formats and mosaics in Reykjavík. From 7.500 kr/m² (excl. VAT).'],
      lead: 'We lay floor and wall tiles, including large formats and mosaics.',
      intro: ['Accurate levelling and cutting decide how the result looks.', 'Large formats and mosaics take longer to cut and level precisely, so they have their own rate.'],
      includes: ['Laying floor and wall tiles', 'Large-format tiles and mosaics', 'Cutting and levelling', 'Grouting', 'Removing old tiles, where needed'],
      steps: [['Measuring and planning', 'We plan the layout and the cuts.'], ['Substrate', 'We remove old tiles and level the substrate.'], ['Laying', 'We lay the tiles and level them.'], ['Grouting', 'We grout and check the result.']],
      photos: ['Floor tiles in a hallway', 'Large format in a living room', 'Mosaic on a wall'],
      faq: [
        ['Why does large format cost more?', 'Tiles of 60×120 cm and mosaics take longer to cut and level precisely. The rate is 14.000 kr/m².'],
        ['Are the tiles and adhesive included in the price?', 'The price list gives rates for the work. We confirm which materials are covered (tiles, adhesive and grout) in the quote.'],
        ['Do you remove old tiles?', 'Yes. Removing tiles is a separate item at 6.000 kr/m².'],
        ['Does an irregular room change the price?', 'Yes. Narrow hallways, columns and cutting around pipes add working time, so labour costs more.'],
        ['How soon can I start?', 'Write or call. We agree the date and scope after a site visit and put them in the offer.']
      ]
    },
    bathrooms: {
      name: 'Bathroom finishing', short: 'Removing tiles, preparing the substrate, waterproofing and new surfaces.',
      stepsTitle: 'How bathroom finishing works', faqTitle: 'Questions about bathroom finishing',
      seo: ['Bathroom finishing Reykjavík | Prime Verk', 'Removing tiles, wet-area waterproofing and laying new tiles in a bathroom. Reykjavík and surroundings.'],
      lead: 'We finish bathrooms: we remove the old tiles, prepare the substrate, waterproof the wet area and lay new surfaces.',
      intro: ['The price depends on the scope of work and the area. You can find the rates for each type of work in the price list below.', 'We waterproof the wet area with a liquid membrane and sealing tapes. The rate of 2.800–4.000 kr/m² applies to waterproofing only, not to the whole bathroom.'],
      includes: ['Removing old tiles', 'Preparing the substrate', 'Waterproofing: liquid membrane with sealing tapes', 'Laying floor and wall tiles', 'Large-format tiles and mosaics'],
      steps: [['Site visit', 'We agree the scope of work and look at the condition of the bathroom.'], ['Tile removal and substrate', 'We remove the old tiles and prepare the substrate.'], ['Waterproofing', 'We seal the wet area.'], ['Tiles', 'We lay the new surfaces and grout.']],
      photos: ['A modern tiled bathroom', 'Walk-in shower', 'Mosaic in a bathroom'],
      faq: [
        ['How much does wet-area waterproofing cost?', 'The liquid membrane with sealing tapes costs 2.800–4.000 kr/m² (excl. VAT), depending on the scope. This is the rate for waterproofing only, not for the whole bathroom.'],
        ['What does bathroom finishing include?', 'Removing old tiles, preparing the substrate, waterproofing the wet area and laying new tiles. The rates for each type of work are in the price list.'],
        ['How much do wall and floor tiles cost?', 'Floor tiles cost 7.500 kr/m², wall tiles 9.500 kr/m², and large formats or mosaics 14.000 kr/m².'],
        ['Do you remove old tiles?', 'Yes. Removing tiles is a separate item at 6.000 kr/m².'],
        ['Can I get a quote based on photos?', 'Send photos and dimensions and we will prepare a preliminary quote. We confirm the final one after a site visit.']
      ]
    },
    flooring: {
      name: 'Flooring', short: 'Click and vinyl panels, self-levelling compound, removing old floors.',
      stepsTitle: 'How we lay floors', faqTitle: 'Questions about flooring',
      seo: ['Laying panels and floors Reykjavík | Prime Verk', 'Click panels, glued vinyl panels, self-levelling compound and floor removal in Reykjavík. From 1.800 kr/m² (excl. VAT).'],
      lead: 'We lay click panels and glued vinyl panels. We also prepare the substrate: self-levelling compound and removing old floors.',
      intro: ['Panels need an even substrate. If your floor is uneven, we apply self-levelling compound. We take up the old floor and prepare the surface.', 'We lay click-system panels and glued vinyl panels.'],
      includes: ['Laying click-system panels', 'Laying glued vinyl panels', 'Self-levelling compound', 'Removing old parquet, tiles or carpet', 'Grinding off old adhesive'],
      steps: [['Measuring', 'We check how level the substrate is.'], ['Removal', 'We take up the old floor.'], ['Levelling', 'We apply the self-levelling compound.'], ['Laying', 'We lay the panels.']],
      photos: ['Panels in a bright room', 'Vinyl floor in a kitchen', 'Substrate preparation'],
      faq: [
        ['Do I have to use self-levelling compound?', 'Only if the floor is uneven. Panels need an even substrate. Self-levelling compound costs 4.000 kr/m², material included.'],
        ['What is the difference between click panels and glued panels?', 'Click panels are laid without adhesive (1.800–2.300 kr/m²). Vinyl panels are glued to the substrate (4.000 kr/m²).'],
        ['Will you remove the old floor?', 'Yes. We take up parquet, tiles or carpet and prepare the substrate. It costs 2.000 kr/m².'],
        ['Does the shape of the room affect the price?', 'Yes. Narrow hallways, columns and cutting around radiator pipes mean more cutting time, so labour costs more.'],
        ['Does the price include the panels?', 'The price list covers the laying work. Material is included only in the self-levelling compound. We confirm the other materials in the quote.']
      ]
    }
  },
  generalFaq: [
    ['Why are prices excl. VAT?', 'We give net prices so they are easy to compare. VAT is added on the invoice.'],
    ['Are the prices in the price list final?', 'No. They are base rates and the calculator result is an estimate. We set the final quote from the area, the condition of the substrate and the scope of work.'],
    ['Where do you work?', 'In Reykjavík and surroundings, including Keflavík and Selfoss. If you are further away, get in touch.'],
    ['How can I request a quote?', 'Call, email, describe your job in the form, or attach the estimate from the calculator.'],
    ['What languages can I contact you in?', 'The site is available in Icelandic, English and Polish. Write in whichever suits you.']
  ],
  prices: {
    title: 'Pricing and calculator', lead: 'Prices are excl. VAT. The final quote depends on the area, the condition of the substrate and the scope of work.',
    note: 'Irregular rooms (narrow hallways, many columns, cutting around radiator pipes) raise the cost of labour, because precise cutting takes more time.',
    materials: 'Painting: the price covers labour only. Self-levelling compound: the price includes material. For other items, we confirm which materials are covered in the quote.',
    listTitle: 'Price list', calcTitle: 'Cost calculator', calcLead: 'Choose the work and enter the area. For items with a range of rates, the result is also a range.',
    qty: 'Area', enter: 'Enter', total: 'Estimated cost', empty: 'Choose the work and enter the area to see the estimated cost.',
    disclaimer: 'This is an estimate based on the rates in the price list. We set the final quote from the area, the condition of the substrate and the scope of work.',
    send: 'Attach the estimate to your enquiry', openFrom: 'from', reset: 'Clear'
  },
  faqPage: { title: 'Frequently asked questions', lead: 'Answers on quotes, scope of work and prices. Not finding your question? Call or write.', general: 'General' },
  contact: {
    title: 'Contact and quote request', lead: 'Call, write, or describe your job in the form.',
    phone: 'Phone', email: 'Email', area: 'Area', areaV: 'Reykjavík, Keflavík, Selfoss and surroundings',
    formIntro: 'Tell us the type of work, the town, the approximate area and when you want to start.',
    name: 'Full name', fphone: 'Phone', femail: 'Email', msg: 'Job description',
    ph: 'E.g. painting walls and ceilings, Reykjavík, about 60 m², starting in early November', send: 'Prepare an email',
    note: 'When you click, your email app opens with the message ready. You send the message from there.',
    alt: 'You can also call or write directly:',
    subject: 'Enquiry from the Prime Verk website',
    fromCalc: 'The estimate from the calculator has been added to the message.'
  },
  footer: { credit: 'Website by', tag: 'Painting, tiling, bathroom finishing and flooring in Reykjavík and surroundings.', rights: 'All rights reserved.', pages: 'Pages', services: 'Services', contact: 'Contact' }
};
