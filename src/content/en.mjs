export default {
  code: 'en', htmlLang: 'en', label: 'EN',
  ui: {
    vat: 'excl. VAT', vatLong: 'All prices exclude VAT', from: 'from', m2: 'm²', mb: 'm',
    perM2: 'kr / m²', perMb: 'kr / m', kr: 'kr',
    call: 'Call', menu: 'Menu', quote: 'Request a quote', calc: 'Calculate the price', more: 'View service',
    home: 'Home', related: 'See also', faq: 'Frequently asked questions',
    includes: 'What the job covers', process: 'How we work', pricing: 'Pricing',
    skip: 'Skip to content',
    langName: 'Language'
  },
  nav: { services: 'Services', prices: 'Pricing and calculator', faq: 'FAQ', contact: 'Contact' },
  seo: {
    home: ['Painting, tiling and bathrooms in Reykjavík | Prime Verk', 'Interior finishing in Reykjavík and surroundings: painting, plastering, tiling, bathrooms, flooring. Prices published excl. VAT, plus an online calculator.'],
    services: ['Interior finishing services in Reykjavík | Prime Verk', 'Painting, plastering, tiling, bathrooms and flooring in Reykjavík. See what each job covers and what it costs excl. VAT.'],
    prices: ['Finishing prices and calculator, Reykjavík | Prime Verk', 'Base prices for painting, plastering, tiling and flooring excl. VAT, and a calculator that estimates your cost in seconds.'],
    faq: ['FAQ on quotes, prices and VAT | Prime Verk Reykjavík', 'Answers on quotes, prices excl. VAT, scope of work and where we work in and around Reykjavík.'],
    contact: ['Contact and quote request | Prime Verk Reykjavík', 'Call, email or send the form to get a quote for interior finishing in Reykjavík, Keflavík, Selfoss and surroundings.']
  },
  home: {
    eyebrow: 'Interior finishing · Reykjavík and surroundings',
    title: 'Walls, tiles and floors <em>done properly.</em>',
    lead: 'Painting, plastering, bathrooms, tiling and flooring from one crew. Our prices are on the site, always excl. VAT, so you know where you stand before you call.',

    servicesTitle: 'Five trades. One contractor.',
    servicesLead: 'Book one job or the whole finish. Each service has its own page with what the work covers, the prices and answers to common questions.',
    whyTitle: 'Why Prime Verk',
    why: [
      ['Price up front', 'The price list is on the site and the calculator works out your cost instantly. Every price excl. VAT.', 'tag'],
      ['A quote for your project', 'Base prices are the starting point. We adjust every job to what you need.', 'ruler'],
      ['Preparation you can see', 'A flat wall, a straight grout line, a sealed wet area. A good result starts with the substrate.', 'level'],
      ['One point of contact', 'The same crew handles painting, tiling and flooring, from your first call to handover.', 'handshake']
    ],

    calcTitle: 'Work out the cost in a minute',
    calcLead: 'Pick the work, enter the area and see the price range. Excl. VAT.',
    processTitle: 'From the first call to handover',
    process: [
      ['Enquiry', 'You call, write or send the estimate from the calculator.'],
      ['Site visit and offer', 'We go through the scope with you and send a clear offer excl. VAT.'],
      ['The work', 'We do the job as agreed in the offer.'],
      ['Handover', 'We check the result together and hand over the finished work.']
    ],


    faqTitle: 'Before you call',
    ctaTitle: 'Walls, a bathroom or a floor that needs doing?',
    ctaLead: 'Tell us what needs doing and we will send you a quote excl. VAT.'
  },
  items: {
    paint: 'Painting, labour only (primed walls, refresh)',
    spackle: 'Plastering',
    joints: 'Skim coating plasterboard joints only (tape plus two coats of compound)',
    renovate: 'Renovating old walls (scraping, cracks, levelling)',
    floorTile: 'Floor tiles, standard size',
    wallTile: 'Wall tiles, standard size',
    largeTile: 'Large format (e.g. 60×120 cm) or mosaics',
    removeTile: 'Removing old tiles',
    waterproof: 'Liquid waterproofing membrane with sealing tapes in the wet area',
    panelClick: 'Click-system panel installation',
    panelGlue: 'Glue-down vinyl panel installation',
    leveling: 'Self-levelling compound (screed, material included)',
    removeFloor: 'Removing the old floor and preparing the substrate'
  },
  calcGroups: { paint: 'Painting', plaster: 'Plastering and repairs', tiles: 'Tiles and bathrooms', floor: 'Flooring' },
  svc: {
    index: { title: 'Services', lead: 'Five finishing trades. Choose one or combine several in a single job.' },
    painting: {
      name: 'Painting', short: 'Even coverage on walls and ceilings, clean edges.',
      seo: ['Interior painting Reykjavík | Prime Verk', 'Wall and ceiling painting in Reykjavík and surroundings. Labour from 3.000 kr/m² excl. VAT.'],
      lead: 'We paint walls and ceilings: even coverage, clean edges.',
      intro: ['We paint apartments, houses and commercial premises. The price of 3.000 kr/m² covers labour only, for walls that are already primed and need a refresh, with minor preparation.', 'If the walls need repair, we level them first. In that case the quote spells out the extra work.'],
      includes: ['Labour at the 3.000 kr/m² rate', 'Minor surface preparation', 'Painting walls and ceilings', 'Clean edges and colour transitions', 'Refreshing walls that are already primed'],
      steps: [['Site visit', 'We check the condition of the walls and measure the area.'], ['Preparation', 'We prepare the surfaces.'], ['Painting', 'We apply the coats.'], ['Handover', 'We check the edges and coverage with you.']],
      photos: ['A painted living room', 'Roller and paint on a wall', 'White wall, colour contrast'],
      faq: [
        ['Does the price include paint?', 'No. The rate covers labour only. We agree materials when quoting: you can buy the paint yourself or ask us to buy it.'],
        ['How many coats of paint do you apply?', 'Usually two. It depends on the colour, the condition of the walls and the paint. The offer states the exact scope.'],
        ['What if the walls are in poor condition?', 'If they need plastering or crack repair, we price that separately from the plastering price list.'],
        ['How long does it take to paint an apartment?', 'It depends on the area and how much preparation the walls need. After the site visit, the offer gives an approximate time.'],
        ['Do you paint ceilings?', 'Yes. Ceilings are part of the painting scope and we price them like walls.']
      ]
    },
    plastering: {
      name: 'Plastering and repairs', short: 'Smooth walls, plasterboard joints and renovation of old walls.',
      seo: ['Wall plastering Reykjavík | Prime Verk', 'Skim coating, plasterboard joints and renovation of old walls. Prices from 3.500 kr/m² excl. VAT.'],
      lead: 'Smooth surfaces ready for painting, from plasterboard joints to full renovation of old walls.',
      intro: ['A good paint job starts with a good wall. We skim coat whole surfaces or only the plasterboard joints, and we repair cracks and uneven areas.', 'Old walls get a full renovation. We scrape them, remove cracks and level the surface.'],
      includes: ['Skim coating whole walls and ceilings', 'Plasterboard joints: mesh tape and two coats of compound', 'Repairing cracks and damaged areas', 'Levelling uneven walls', 'Sanding ready for painting'],
      steps: [['Assessing the substrate', 'We check flatness and cracks.'], ['Repairs', 'We scrape, fill and reinforce.'], ['Plastering', 'We apply the coats of compound.'], ['Sanding', 'We sand it smooth, ready for painting.']],
      photos: ['A skim-coated wall', 'Plasterboard joint', 'Renovation of an old wall'],
      faq: [
        ['What is the difference between skim coating a whole wall and plasterboard joints?', 'For joints we work only on the seams between boards. We embed the mesh tape and apply two coats of compound (4.000 kr/m). Skim coating a whole surface is a separate item in the price list.'],
        ['What does the price of plastering depend on?', 'On the condition of the walls, the number of coats and how smooth the finish must be. That is why the price list gives a range of 3.500–5.000 kr/m².'],
        ['When do old walls need renovation?', 'When they have cracks, loose areas, uneven patches or many old layers of paint. Prices then start at 5.000 kr/m².'],
        ['Can I paint straight after plastering?', 'No. The compound has to dry and the surface has to be sanded first. We agree the timing as part of the job.'],
        ['Do you do plastering and painting together?', 'Yes, it is the most common combination. We can price both in a single offer.']
      ]
    },
    tiling: {
      name: 'Tiling', short: 'Floor and wall tiles, large formats, mosaics.',
      seo: ['Tiling Reykjavík | Prime Verk', 'Floor and wall tiles, large formats and mosaics in Reykjavík. From 7.500 kr/m² excl. VAT.'],
      lead: 'Floor tiles, wall tiles and large formats, laid level with straight grout lines.',
      intro: ['We lay tiles in kitchens, bathrooms, hallways and on terraces. Accurate levelling and cutting decide how the result looks.', 'Large formats and mosaics take longer to cut and align, so they have their own rate.'],
      includes: ['Laying floor and wall tiles', 'Large formats and mosaics', 'Accurate cutting and levelling', 'Grouting', 'Removing old tiles (optional)'],
      steps: [['Measuring and planning', 'We plan the layout and where the cuts fall.'], ['Substrate', 'We remove old tiles and level the surface.'], ['Laying', 'We set the tiles and level them.'], ['Grouting', 'We grout and clean.']],
      photos: ['Floor tiles in a hallway', 'Large format in a living room', 'Mosaic on a wall'],
      faq: [
        ['Why does large format cost more?', 'Tiles of 60×120 cm and mosaics take longer to cut and level accurately, so the rate is 14.000 kr/m².'],
        ['Are the tiles and adhesive included in the price?', 'No. The price list covers labour. We agree materials when quoting.'],
        ['Do you remove old tiles?', 'Yes. Removing old tiles is a separate item at 6.000 kr/m².'],
        ['Does an irregular room change the price?', 'Yes. Narrow hallways, columns and cutting around pipes add working time, so labour costs more.'],
        ['How soon can I start?', 'Write or call. After a site visit we agree the date and scope in the offer.']
      ]
    },
    bathrooms: {
      name: 'Bathrooms', short: 'Tile removal, waterproofing and new tiles. A bathroom from the ground up.',
      seo: ['Bathroom renovation Reykjavík | Prime Verk', 'Tile removal, wet-area waterproofing and new tiles in Reykjavík. Prices excl. VAT.'],
      lead: 'A bathroom from the ground up: tile removal, wet-area waterproofing and new tiles.',
      intro: ['A bathroom renovation has several stages that must fit together. We do the finishing: we remove the old tiles, seal the wet area and lay the new surfaces.', 'We waterproof with a liquid membrane and sealing tapes. This is what protects the structure from moisture.'],
      includes: ['Removing old tiles', 'Liquid waterproofing membrane with sealing tapes', 'Floor and wall tiles', 'Large formats and mosaics', 'Levelling the substrate'],
      steps: [['Site visit', 'We look at the bathroom and agree the scope of work.'], ['Strip-out', 'We remove the old tiles.'], ['Waterproofing', 'We seal the wet area.'], ['Tiles', 'We lay, grout and clean.']],
      photos: ['A modern tiled bathroom', 'Walk-in shower', 'Mosaic in a bathroom'],
      faq: [
        ['How much does wet-area waterproofing cost?', 'Applying the liquid membrane with sealing tapes costs 2.800–4.000 kr/m², depending on the scope.'],
        ['Can you do the whole bathroom finish?', 'Yes. We do the tile removal, waterproofing and tiling, and the price list shows the cost of each stage.'],
        ['Why do wall and floor tiles have different rates?', 'Wall tiles take more work to cut and level, so the rates are 9.500 and 7.500 kr/m².'],
        ['Do I need to remove the old tiles beforehand?', 'No, we remove them ourselves. It is a separate item at 6.000 kr/m².'],
        ['Can I get a quote based on photos?', 'Yes. Send photos and dimensions and we will prepare a preliminary quote. We confirm the final price after a site visit.']
      ]
    },
    flooring: {
      name: 'Flooring', short: 'Click and vinyl panels, screed, removal of old floors.',
      seo: ['Flooring and panels Reykjavík | Prime Verk', 'Click and glue-down vinyl panels, self-levelling screed and floor removal in Reykjavík. Prices excl. VAT.'],
      lead: 'Click and vinyl panels, self-levelling screed and removal of old floors.',
      intro: ['Panels need an even substrate. If your floor is uneven, we apply a self-levelling compound. We also take up the old floor and prepare the surface.', 'We install click-system panels and glue-down vinyl panels.'],
      includes: ['Click-system panels', 'Glue-down vinyl panels', 'Self-levelling compound', 'Removing old parquet, tiles or carpet', 'Grinding off old adhesive'],
      steps: [['Measuring', 'We check how level the substrate is.'], ['Removal', 'We take up the old floor.'], ['Levelling', 'We pour the self-levelling compound.'], ['Installation', 'We fit the panels.']],
      photos: ['Panels in a bright room', 'Vinyl floor in a kitchen', 'Substrate preparation'],
      faq: [
        ['Do I have to use self-levelling compound?', 'Only if the floor is uneven. Panels need an even substrate. The screed costs 4.000 kr/m², material included.'],
        ['What is the difference between click panels and glue-down panels?', 'Click panels lock together without adhesive (1.800–2.300 kr/m²). Vinyl panels are glued to the substrate (4.000 kr/m²).'],
        ['Will you remove the old floor?', 'Yes. We take up parquet, tiles or carpet and prepare the substrate for 2.000 kr/m².'],
        ['Does the shape of the room affect the price?', 'Yes. Narrow hallways, columns and cutting around radiator pipes mean more cutting time, so labour costs more.'],
        ['Does the price include the panels?', 'No. The price list covers labour, except for the self-levelling compound, which is priced with material. We agree the rest in the offer.']
      ]
    }
  },
  generalFaq: [
    ['Why are prices excl. VAT?', 'Net prices are clear and easy to compare. VAT is added on the invoice, and every price on the site is marked excl. VAT.'],
    ['Are the prices in the price list final?', 'They are base prices. We adjust every job to what the client needs, so the final price is in the offer, once we know the scope of work.'],
    ['Where do you work?', 'In Reykjavík and the surrounding area, including Keflavík and Selfoss. If you are outside this area, get in touch.'],
    ['How can I request a quote?', 'Call, email, fill in the form or send the estimate from the calculator.'],
    ['What languages can I contact you in?', 'The site is available in Icelandic, English and Polish. Write to us in whichever you prefer.']
  ],
  prices: {
    title: 'Pricing and calculator', lead: 'All prices exclude VAT. These are base prices, and we adjust every job to what the client needs.',
    note: 'Irregular rooms (narrow hallways, many columns, cutting around radiator pipes) raise the cost of labour, because precise cutting takes more time.',
    listTitle: 'Price list', calcTitle: 'Price calculator', calcLead: 'Enter the quantity for the work you need. You get an approximate range, excl. VAT.',
    qty: 'Quantity', total: 'Estimated cost', empty: 'Choose a service and enter a quantity to see the estimate.',
    disclaimer: 'This is an estimate. The final price depends on the condition of the surfaces, the scope and conditions on site.',
    send: 'Send an enquiry with the estimate', openFrom: 'from', reset: 'Clear'
  },
  faqPage: { title: 'Frequently asked questions', lead: 'Answers on quotes, scope of work and prices excl. VAT. Not finding yours? Call or write.', general: 'General' },
  contact: {
    hint: 'Add the floor area, type of work and your town so we can quote more accurately. You can send photos of the space in reply to our message.',
    privacy: 'We use the details from this form only to reply to your enquiry.',
    sending: 'Sending…',
    sent: 'Thank you, your message has arrived. We will be in touch.',
    error: 'The message could not be sent. Please try again or call us: ',
    title: 'Contact and quote', lead: 'Tell us what needs doing and we will send you a quote excl. VAT.',
    phone: 'Phone', email: 'Email', area: 'Area', areaV: 'Reykjavík, Keflavík, Selfoss and surroundings',
    name: 'Full name', fphone: 'Phone', femail: 'Email', msg: 'Job description',
    ph: 'E.g. painting a 60 m² apartment, new tiles in the bathroom…', send: 'Send enquiry',
    note: 'The form opens your email program with a ready-made message.', subject: 'Enquiry from the Prime Verk website',
    fromCalc: 'The estimate from the calculator has been added to the message.'
  },
  footer: { credit: 'Website by', tag: 'Interior finishing in Reykjavík and surroundings.', rights: 'All rights reserved.', pages: 'Pages', services: 'Services', contact: 'Contact' }
};
