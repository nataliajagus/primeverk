// Cennik (kr, bez VAT). max: null = "od" (cena otwarta). unit: m2 | mb
// calc = grupa w kalkulatorze; svc = na których podstronach usług pokazać pozycję
export const PRICES = [
  { id: 'paint',       calc: 'paint',    unit: 'm2', min: 3000,  max: 3000, svc: ['painting'] },
  { id: 'spackle',     calc: 'plaster',  unit: 'm2', min: 3500,  max: 5000, svc: ['plastering'] },
  { id: 'joints',      calc: 'plaster',  unit: 'mb', min: 4000,  max: 4000, svc: ['plastering'] },
  { id: 'renovate',    calc: 'plaster',  unit: 'm2', min: 5000,  max: null, svc: ['plastering'] },
  { id: 'floorTile',   calc: 'tiles',    unit: 'm2', min: 7500,  max: 7500, svc: ['tiling', 'bathrooms'] },
  { id: 'wallTile',    calc: 'tiles',    unit: 'm2', min: 9500,  max: 9500, svc: ['tiling', 'bathrooms'] },
  { id: 'largeTile',   calc: 'tiles',    unit: 'm2', min: 14000, max: 14000, svc: ['tiling', 'bathrooms'] },
  { id: 'removeTile',  calc: 'tiles',    unit: 'm2', min: 6000,  max: 6000, svc: ['tiling', 'bathrooms'] },
  { id: 'waterproof',  calc: 'tiles',    unit: 'm2', min: 2800,  max: 4000, svc: ['tiling', 'bathrooms'] },
  { id: 'panelClick',  calc: 'floor',    unit: 'm2', min: 1800,  max: 2300, svc: ['flooring'] },
  { id: 'panelGlue',   calc: 'floor',    unit: 'm2', min: 4000,  max: 4000, svc: ['flooring'] },
  { id: 'leveling',    calc: 'floor',    unit: 'm2', min: 4000,  max: 4000, svc: ['flooring'] },
  { id: 'removeFloor', calc: 'floor',    unit: 'm2', min: 2000,  max: 2000, svc: ['flooring'] }
];
export const CALC_GROUPS = ['paint', 'plaster', 'tiles', 'floor'];

export const SERVICES = ['painting', 'plastering', 'tiling', 'bathrooms', 'flooring'];
// najniższa cena "od" dla usługi (do kafelków)
// pozycja reprezentatywna dla usługi (nie "najtańsza", bo np. hydroizolacja nie jest ceną płytek)
const HEADLINE = { painting: 'paint', plastering: 'spackle', tiling: 'floorTile', bathrooms: 'waterproof', flooring: 'panelClick' };
export function fromPrice(svc) {
  return PRICES.find(p => p.id === HEADLINE[svc]);
}
export const fmtNum = n => String(n).replace(/\B(?=(\d{3})+(?!\d))/g, '.');
