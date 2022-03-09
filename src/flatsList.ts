type TFlat = {
  cost: number;
  city: string;
  description: string;
  id: number;
};

function createRandomFlat(index: number): TFlat {
  const cost = Math.floor(Math.random() * 100);
  const cities = [
    'Almaty',
    'Berlin',
    'Kiev',
    'London',
    'Tomsk',
    'New York',
    'Dallas',
    'Oslo',
    'Stockholm',
    'Copenhagen',
  ];
  const loremLine =
    'Esse dolore exercitation reprehenderit excepteur cupidatat dolor officia aliquip do dolore elit minim consequat dolor.';
  const description = loremLine.repeat(Math.round(Math.random() * 3));
  const id = Date.now() + index;

  return {
    cost,
    city: cities[Math.round(Math.random() * cities.length)],
    description,
    id,
  };
}
const flatsList: TFlat[] = new Array(40)
  .fill('')
  .map((el, index) => createRandomFlat(index));

export default flatsList;
