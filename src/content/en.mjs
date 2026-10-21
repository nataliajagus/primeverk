export default {
  code: 'en', htmlLang: 'en', label: 'EN',
  ui: {
    step: 'Step',
    vat: 'excl. VAT', vatLong: 'All prices exclude VAT', from: 'from', m2: 'm²', mb: 'm',
    perEl: 'ISK / item', el: 'pcs', perM2: 'kr / m²', perMb: 'kr / m', kr: 'kr', price: 'Price', byScope: 'Priced to the job',
    call: 'Call', menu: 'Menu', quote: 'Get a quote', calc: 'Estimate the cost', more: 'See the service',
    home: 'Home', related: 'See also', faq: 'Common questions',
    includes: 'What we do', process: 'How we work', pricing: 'Pricing',
    skip: 'Skip to content',
    langName: 'Language'
  },
  nav: { services: 'Services', prices: 'Pricing and calculator', faq: 'FAQ', contact: 'Contact' },
  seo: {
    home: ['Prime Verk: painting, tiling and flooring, Reykjavík', 'Painting, plastering, tiling, bathrooms and flooring in Reykjavík, Keflavík and Selfoss. See the rates and work out a cost with the online calculator.'],
    services: ['Interior finishing services in Reykjavík | Prime Verk', 'Painting, plastering, tiling, bathrooms and flooring in Reykjavík. See what each job involves and what it roughly costs.'],
    prices: ['Price list and cost calculator | Prime Verk', 'Rates for painting, plastering, tiling, waterproofing and flooring (excl. VAT), plus a calculator for a rough cost of your finishing work.'],
    faq: ['Questions about quotes and prices | Prime Verk', 'Straight answers on quotes, prices and what each job includes, for finishing work in Reykjavík, Keflavík and Selfoss.'],
    contact: ['Contact and quote request | Prime Verk', 'Call, email or describe your job in the form. We work in Reykjavík, Keflavík and Selfoss.']
  },
  home: {
    eyebrow: 'Done properly',
    title: 'Painting, tiling and flooring.<br><em>Reykjavík and nearby.</em>',
    lead: 'From freshening up walls to finishing a bathroom. We prepare the surface, do the agreed work and go through the result with you at handover.',
    areaLabel: 'Based in',
    area: 'Reykjavík, Keflavík, Selfoss and nearby',
    servicesTitle: 'Seven kinds of finishing work',
    servicesLead: 'Pick a service to see what the job involves and what it roughly costs.',
    whyTitle: 'Why Prime Verk',
    why: [
      ['Know the cost before you call', 'The price list and calculator are right here. You can see our rates and a rough figure before you pick up the phone.', 'tag'],
      ['Priced to the job', 'We price from the area, the state of the surface and what needs doing.', 'ruler'],
      ['Surfaces prepared first', 'Plastering, levelling for tiles and panels, and waterproofing are all part of what we do.', 'level'],
      ['One contractor, several trades', 'Painting, plastering, tiling, bathroom finishing and flooring can all go into a single job.', 'handshake']
    ],
    calcTitle: 'Get a rough cost',
    calcLead: 'Choose the type of work and enter the area. The calculator adds up the rates from the price list, which has every rate in full.',
    calcBtn: 'Open the calculator',
    miniLabel: 'Painting walls and ceilings',
    miniNote: 'Labour only. Enter the area of walls and ceilings to be painted.',
    processTitle: 'How it works',
    process: [
      ['Enquiry', 'You call, write or send the estimate from the calculator.'],
      ['Visit and offer', 'We agree what needs doing and send you an offer.'],
      ['The work', 'We do the work as set out in the offer.'],
      ['Handover', 'We go over the result together and hand the finished job to you.']
    ],
    faqTitle: 'Questions we hear before a quote',
    faqAll: 'All questions',
    ctaTitle: 'Tell us about your job',
    ctaLead: 'Give us the type of work, the town, the rough area and when you would like to start.'
  },
  items: {
    paint: { n: 'Painting walls and ceilings', s: 'primed walls, a refresh, light preparation' },
    spackle: { n: 'Plastering' },
    joints: { n: 'Plasterboard joints', s: 'mesh tape and two coats of compound' },
    renovate: { n: 'Renovating old walls', s: 'scraping, filling cracks, levelling and other work' },
    floorTile: { n: 'Floor tiles', s: 'standard size' },
    wallTile: { n: 'Wall tiles', s: 'standard size' },
    largeTile: { n: 'Large-format tiles and mosaics', s: 'e.g. 60×120 cm' },
    removeTile: { n: 'Removing old tiles' },
    waterproof: { n: 'Wet-area waterproofing', s: 'liquid membrane with sealing tapes' },
    panelClick: { n: 'Click panels', s: 'click-lock system' },
    panelGlue: { n: 'Vinyl panels', s: 'glued down' },
    leveling: { n: 'Self-levelling compound', s: 'screed' },
    removeFloor: { n: 'Removing old panels', s: 'with surface preparation' },
    skirting: { n: 'Skirting board fitting', s: 'the price depends on the type: PVC (cheaper), MDF or wood (more, because of 45° mitre cuts and gluing)' },
    sanitary: { n: 'Fitting sanitaryware', s: 'toilet, washbasin, tap, shower cabin; price per item, on average' },
    drywallWall: { n: 'Plasterboard walls and ceilings', s: 'simple partition walls and lining walls' },
    drywallFrame: { n: 'Ceiling frame installation', s: 'exact price after a site visit and agreeing the details' },
    drywallComplex: { n: 'Full build (frame and plasterboard)', s: 'framework, board fitting, basic taping' }
  },
  itemHints: {
    paint: 'the area of walls and ceilings to be painted',
    spackle: 'the area of walls and ceilings to be plastered',
    joints: 'the total length of plasterboard joints',
    renovate: 'the area of walls to be renovated',
    floorTile: 'the floor area',
    wallTile: 'the wall area',
    largeTile: 'the area to be tiled',
    removeTile: 'the area of tiles to be removed',
    waterproof: 'the area to be waterproofed',
    panelClick: 'the floor area',
    panelGlue: 'the floor area',
    leveling: 'the floor area',
    removeFloor: 'the floor area',
    skirting: 'the total length of skirting',
    sanitary: 'the number of items to be fitted',
    drywallWall: 'the area of plasterboard walls or ceilings',
    drywallFrame: 'the ceiling area with a frame',
    drywallComplex: 'the area of the build'
  },
  calcGroups: { paint: 'Painting', plaster: 'Plastering and repairs', tiles: 'Tiles, removal and waterproofing', floor: 'Flooring', sanitary: 'Sanitaryware installation', drywall: 'Plasterboard construction' },
  svc: {
    index: { title: 'Services', lead: 'Seven kinds of finishing work. Pick one to see what the job involves and what it roughly costs.' },
    painting: {
      name: 'Painting', short: 'Painting and freshening up walls and ceilings.',
      stepsTitle: 'How a painting job goes', faqTitle: 'Painting questions',
      priceTitle: 'Painting rate', priceLead: 'Enter the area for each job you need. The cost of every line and the total appear straight away.',
      seo: ['Interior painting Reykjavík from 3.000 kr/m² | Prime Verk', 'Painting walls and ceilings in Reykjavík and nearby. Labour from 3.000 kr/m² (excl. VAT).'],
      lead: 'We paint walls and ceilings. Our base rate is for freshening up walls that are already primed.',
      intro: ['The 3.000 kr/m² rate is for labour only. It applies to walls that are already primed and need a refresh, with light preparation.', 'If the walls need repair, we level them first. The quote spells out that work.'],
      includes: ['Painting walls', 'Painting ceilings', 'Refreshing walls that are already primed', 'Light surface preparation', 'Crisp edges and colour changes'],
      steps: [['Site visit', 'We look at the walls and measure the area.'], ['Preparation', 'We get the surfaces ready.'], ['Painting', 'We apply the coats.'], ['Handover', 'We check edges and coverage with you.']],
      photos: ['A freshly painted living room', 'Roller and paint on a wall', 'White wall, colour contrast'],
      faq: [
        ['Is paint included in the price?', 'No, the rate is for labour only. We settle materials when we quote. You can buy the paint yourself or ask us to.'],
        ['How many coats do you apply?', 'That depends on the colour, the walls and the paint. We write it into the offer.'],
        ['What if the walls are in poor condition?', 'Plastering and crack repair are priced separately, from the plastering rates.'],
        ['How long does it take to paint an apartment?', 'It depends on the area and the state of the walls. After the site visit, the offer gives an approximate time.'],
        ['Do you paint ceilings?', 'Yes, ceilings are part of the job. When you ask for a quote, give the total area of walls and ceilings.']
      ]
    },
    plastering: {
      name: 'Plastering and repairs', short: 'Smooth walls, plasterboard joints and old walls brought back.',
      stepsTitle: 'How plastering goes', faqTitle: 'Plastering and repair questions',
      priceTitle: 'Plastering and repair rates', priceLead: 'Enter the area for each job you need. The cost of every line and the total appear straight away.',
      seo: ['Wall plastering Reykjavík from 3.500 kr/m² | Prime Verk', 'Wall plastering, plasterboard joints and old wall renovation in Reykjavík. From 3.500 kr/m² (excl. VAT).'],
      lead: 'We get walls ready for paint, from plasterboard joints to renovating old walls.',
      intro: ['Good paintwork starts with a good wall. We plaster whole surfaces or just the plasterboard joints, and we repair cracks and uneven patches.', 'Old walls get scraped, filled and levelled.'],
      includes: ['Plastering walls and ceilings', 'Plasterboard joints: mesh tape and two coats of compound', 'Repairing cracks', 'Levelling uneven walls', 'Renovating old walls'],
      steps: [['Assessing the wall', 'We check how flat it is and where it cracks.'], ['Repairs', 'We scrape off old layers and fill cracks.'], ['Plastering', 'We apply the compound and level the surface.'], ['Handover', 'We check the finish with you.']],
      photos: ['A plastered wall', 'Plasterboard joint', 'An old wall renovated'],
      faq: [
        ['How is plastering a whole wall different from plasterboard joints?', 'For joints we work only on the seams between boards. We embed mesh tape and apply two coats of compound (4.000 kr/m). Plastering a whole surface is a separate line in the price list.'],
        ['What decides the price of plastering?', 'The state of the walls and how much needs doing. That is why the price list gives a range of 3.500–5.000 kr/m².'],
        ['When do old walls need renovating?', 'When they are cracked, uneven or need scraping. Prices then start at 5.000 kr/m².'],
        ['Can I paint straight after plastering?', 'Not quite. The compound has to dry first. We agree when painting can begin as the work goes on.'],
        ['Can you plaster and paint in one job?', 'Yes. We can put both in a single offer.']
      ]
    },
    drywall: {
      name: 'Plasterboard construction', short: 'Partition walls, lining walls, ceilings and full builds with a frame.',
      stepsTitle: 'How we build with plasterboard', faqTitle: 'Questions about plasterboard construction',
      priceTitle: 'Plasterboard rates', priceLead: 'Enter the area for the work you need. You see the cost of each line and the total straight away.',
      seo: ['Plasterboard walls and ceilings Reykjavík | Prime Verk', 'Partition walls, lining walls, ceilings and framed plasterboard builds in Reykjavík and nearby. From 3.800 kr/m² (excl. VAT).'],
      lead: 'We build partition walls, lining walls, ceilings and full builds with a frame and plasterboard.',
      intro: ['Simple partition walls and lining walls in plasterboard are priced from 3.800 to 4.300 kr/m². Ceiling frame installation and a full build (framework, board fitting and basic taping) are priced separately.', 'Every project in Iceland is different. The final rate depends on how complex the job is: recesses, electrical installations and ceiling height.'],
      includes: ['Partition and lining walls in plasterboard', 'Plasterboard ceilings', 'Ceiling frame installation', 'Framework and board fitting', 'Basic taping'],
      steps: [['Site visit', 'We assess the room, recesses, installations and height.'], ['Framework', 'We fit the frame.'], ['Boards', 'We fit the plasterboard.'], ['Taping', 'We do basic taping and check the result.']],
      photos: ['A plasterboard partition wall', 'A ceiling frame', 'A plasterboard build'],
      faq: [
        ['What does plasterboard construction cover?', 'Simple partition and lining walls, plasterboard ceilings, ceiling frame installation and full builds: framework, board fitting and basic taping.'],
        ['How much do plasterboard walls and ceilings cost?', 'Simple partition and lining walls cost 3.800–4.300 kr/m², and a full build with frame and plasterboard 7.200–9.500 kr/m² (excl. VAT).'],
        ['What does the price depend on?', 'On how complex the job is: recesses, electrical installations and ceiling height. That is why we give ranges and settle the final rate once we know the project.'],
        ['Why is ceiling frame installation priced “from”?', 'Because we give the exact price only after a site visit and agreeing the details. The rate starts at 4.300 kr/m².'],
        ['Does the price include materials?', 'No. The prices are for labour only, without materials. Materials are settled in the quote.']
      ]
    },
    tiling: {
      name: 'Tiling', short: 'Floor and wall tiles, large formats and mosaics.',
      stepsTitle: 'How tiling goes', faqTitle: 'Tiling questions',
      priceTitle: 'Tiling rates', priceLead: 'Enter the area for each job you need. The cost of every line and the total appear straight away.',
      seo: ['Tiling Reykjavík from 7.500 kr/m² | Prime Verk', 'Floor and wall tiles, large formats and mosaics in Reykjavík. From 7.500 kr/m² (excl. VAT).'],
      lead: 'We lay floor and wall tiles, including large formats and mosaics.',
      intro: ['Tiles look right when they are set level and cut accurately.', 'Large formats and mosaics take longer to cut and level, so they have a rate of their own.'],
      includes: ['Laying floor and wall tiles', 'Large-format tiles and mosaics', 'Cutting and levelling', 'Grouting', 'Removing old tiles where needed'],
      steps: [['Measuring and layout', 'We plan the layout and the cuts.'], ['Surface', 'We remove old tiles and level the surface.'], ['Laying', 'We lay the tiles and set them level.'], ['Grouting', 'We grout and check the result.']],
      photos: ['Floor tiles in a hallway', 'Large format in a living room', 'Mosaic on a wall'],
      faq: [
        ['Why does large format cost more?', 'Tiles of 60×120 cm and mosaics take longer to cut and level precisely. The rate is 14.000 kr/m².'],
        ['Are tiles and adhesive included?', 'No. The rates cover labour only. Tiles, adhesive and grout are settled in the quote.'],
        ['Do you remove old tiles?', 'Yes. Removal is a separate line at 6.000 kr/m².'],
        ['Does an awkward room change the price?', 'Yes. Narrow hallways, columns and cutting around pipes add time, so labour costs more.'],
        ['How soon can I start?', 'Write or call. We agree the date and the work after a site visit, then put both in the offer.']
      ]
    },
    bathrooms: {
      name: 'Bathroom finishing', short: 'Tile removal, surface preparation, waterproofing and new finishes.',
      stepsTitle: 'How a bathroom job goes', faqTitle: 'Bathroom questions',
      priceTitle: 'Bathroom work rates', priceLead: 'Enter the area for each job you need. The cost of every line and the total appear straight away.',
      seo: ['Bathroom finishing Reykjavík | Prime Verk', 'Tile removal, wet-area waterproofing and new tiling for bathrooms in Reykjavík and nearby.'],
      lead: 'We finish bathrooms. Out come the old tiles, then we prepare the surface, waterproof the wet area and lay the new finish.',
      intro: ['The price depends on the work involved and the area. Rates for each type of work are in the price list below.', 'We waterproof the wet area with a liquid membrane and sealing tapes. The 2.800–4.000 kr/m² rate covers waterproofing only, not the whole bathroom.'],
      includes: ['Removing old tiles', 'Preparing the surface', 'Waterproofing: liquid membrane with sealing tapes', 'Laying floor and wall tiles', 'Large-format tiles and mosaics'],
      steps: [['Site visit', 'We agree what needs doing and look at the bathroom.'], ['Removal and preparation', 'We take out the old tiles and prepare the surface.'], ['Waterproofing', 'We seal the wet area.'], ['Tiling', 'We lay the new finish and grout.']],
      photos: ['A modern tiled bathroom', 'Walk-in shower', 'Mosaic in a bathroom'],
      faq: [
        ['How much does wet-area waterproofing cost?', 'The liquid membrane with sealing tapes costs 2.800–4.000 kr/m² (excl. VAT), depending on the job. That is the rate for waterproofing only, not for the whole bathroom.'],
        ['What does bathroom finishing cover?', 'Removing old tiles, preparing the surface, waterproofing the wet area and laying new tiles. Each type of work has its rate in the price list.'],
        ['How much do wall and floor tiles cost?', 'Floor tiles cost 7.500 kr/m², wall tiles 9.500 kr/m², and large formats or mosaics 14.000 kr/m².'],
        ['Do you remove old tiles?', 'Yes. Removal is a separate line at 6.000 kr/m².'],
        ['Can I get a quote from photos?', 'Send photos and measurements and we will prepare a first quote. We confirm the final one after a site visit.']
      ]
    },
    sanitary: {
      name: 'Sanitaryware installation', short: 'Fitting the toilet, washbasin, tap and shower cabin.',
      stepsTitle: 'How sanitaryware installation works', faqTitle: 'Questions about sanitaryware installation',
      priceTitle: 'Installation rate', priceLead: 'Enter the number of items to fit. You see the cost of each line and the total straight away.',
      seo: ['Sanitaryware installation Reykjavík | Prime Verk', 'Fitting ready-made toilets, washbasins, taps and shower cabins in Reykjavík and nearby. On average 15.000–30.000 kr per item (excl. VAT).'],
      lead: 'We fit the ready-made toilet, washbasin, tap and shower cabin.',
      intro: ['Sanitaryware installation means fitting ready-made fixtures in a bathroom. The rate is on average 15.000–30.000 kr per item.', 'We give the exact amount in the quote, because it depends on the type of item and the conditions on site.'],
      includes: ['Fitting the toilet', 'Fitting the washbasin', 'Fitting the tap', 'Fitting the shower cabin'],
      steps: [['Site visit', 'We agree which items need to be fitted.'], ['Preparation', 'We check the place of installation and the ready-made items.'], ['Installation', 'We fit the agreed items.'], ['Handover', 'We check the installed items together.']],
      photos: ['Washbasin and tap in a bathroom', 'Shower cabin', 'A fitted toilet'],
      faq: [
        ['What does sanitaryware installation cover?', 'Fitting ready-made fixtures: the toilet, washbasin, tap and shower cabin.'],
        ['How much does it cost?', 'On average 15.000–30.000 kr per item (excl. VAT). That is the price for labour only, and we give the exact amount in the quote.'],
        ['What does the price depend on?', 'On the type of item and the conditions on site. That is why the price list shows a range and the final price is set once we know the scope.'],
        ['Does the price include the fixtures themselves?', 'No. The price is for labour only, without materials. We fit ready-made items, and we settle how they are supplied in the quote.'],
        ['Can I combine it with a bathroom finish?', 'Yes. The installation can be quoted together with removing old tiles, waterproofing and laying new tiles in one offer.']
      ]
    },
    flooring: {
      name: 'Flooring', short: 'Click and vinyl panels, self-levelling compound, removing old floors.',
      stepsTitle: 'How a flooring job goes', faqTitle: 'Flooring questions',
      priceTitle: 'Flooring rates', priceLead: 'Enter the area for each job you need. The cost of every line and the total appear straight away.',
      seo: ['Laying panels and floors Reykjavík | Prime Verk', 'Click panels, glued vinyl, self-levelling compound and floor removal in Reykjavík. From 1.800 kr/m² (excl. VAT).'],
      lead: 'We lay click panels and glued vinyl panels, and prepare the floor beneath: self-levelling compound and removing the old surface.',
      intro: ['Panels need an even base. If your floor is uneven, we apply self-levelling compound. Where there is an old floor, we take it up and prepare the surface.', 'We lay click-lock panels and glued vinyl panels.'],
      includes: ['Laying click-lock panels', 'Laying glued vinyl panels', 'Self-levelling compound', 'Removing old panels', 'Grinding off old adhesive', 'Fitting skirting boards'],
      steps: [['Measuring', 'We check how level the floor is.'], ['Removal', 'We take up the old floor.'], ['Levelling', 'We apply the self-levelling compound.'], ['Laying', 'We lay the panels.']],
      photos: ['Panels in a bright room', 'Vinyl floor in a kitchen', 'Preparing the surface'],
      faq: [
        ['Do I need self-levelling compound?', 'Only if the floor is uneven, because panels need an even base. It costs 3.000 kr/m², labour only.'],
        ['What is the difference between click and glued panels?', 'Click panels go down without adhesive (1.800–2.300 kr/m²). Vinyl panels are glued to the floor beneath (4.000 kr/m²).'],
        ['Will you take up the old panels?', 'Yes. We remove the old panels and prepare the surface. It costs 2.000 kr/m².'],
        ['Does the shape of the room affect the price?', 'Yes. Narrow hallways, columns and cutting around radiator pipes take more time, so labour costs more.'],
        ['How should the floor be prepared for panels?', 'The floor must be level and clean. If it is uneven we apply self-levelling compound, and we take up the old floor.']
      ]
    }
  },
  generalFaq: [
    ['Why are prices excl. VAT?', 'We quote net prices so they are easy to compare. VAT is added on the invoice.'],
    ['Are the listed prices final?', 'No. They are base rates, and the calculator gives an estimate. The final quote depends on the area, the state of the surface and what needs doing.'],
    ['Where do you work?', 'In Reykjavík and nearby, including Keflavík and Selfoss. Live further out? Get in touch.'],
    ['How do I ask for a quote?', 'Call, email, describe your job in the form, or attach the estimate from the calculator.'],
    ['Which languages can I use?', 'The site is in Icelandic, English and Polish. Write in whichever suits you.']
  ],
  prices: {
    title: 'Pricing and calculator', lead: 'All prices exclude VAT. The final quote depends on the area, the state of the surface and what needs doing.',
    note: 'Awkward rooms (narrow hallways, many columns, cutting around radiator pipes) cost more in labour, because precise cutting takes longer.',
    materials: 'All prices are for labour only, without materials.',
    listTitle: 'Price list', calcTitle: 'Cost calculator', calcLead: 'Choose the work and enter the area. Where a rate is a range, the result is a range too.',
    colWork: 'Work', colRate: 'Rate', colQty: 'Area', colCost: 'Cost',
    shortNote: 'Prices are for labour only, without materials. The result is an estimate, and the final quote depends on the area, the condition of the surface and the scope of work.',
    qty: 'Area', enter: 'Enter', total: 'Estimated cost', empty: 'Choose the work and enter the area to see an estimate.',
    disclaimer: 'An estimate based on the rates in the price list. We set the final quote from the area, the state of the surface and what needs doing.',
    send: 'Add the estimate to your enquiry', openFrom: 'from', reset: 'Clear'
  },
  faqPage: { title: 'Common questions', lead: 'Answers on quotes, what each job includes and prices. Can\'t see your question? Call or write.', general: 'General' },
  contact: {
    title: 'Contact and quote request', lead: 'Call, write, or describe your job in the form.',
    phone: 'Phone', email: 'Email', area: 'Area', areaV: 'Reykjavík, Keflavík, Selfoss and nearby',
    formIntro: 'Give us the type of work, the town, the rough area and when you would like to start.',
    name: 'Full name', fphone: 'Phone', femail: 'Email', msg: 'Your job',
    ph: 'E.g. painting walls and ceilings, Reykjavík, about 60 m², starting in early November', send: 'Prepare an email',
    note: 'Clicking opens your email app with the message ready. You send it from there.',
    alt: 'Or call or write directly:',
    subject: 'Enquiry from the Prime Verk website',
    fromCalc: 'The estimate from the calculator has been added to your message.'
  },
  footer: { company: ['Company details', 'Company name', 'Company ID (kennitala)', 'VAT number', 'to be added'], credit: 'Website by', tag: 'Painting, tiling, bathroom finishing and flooring in Reykjavík and nearby.', rights: 'All rights reserved.', pages: 'Pages', services: 'Services', contact: 'Contact' }
};
