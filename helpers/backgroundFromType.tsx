export const getColorFromType = (type: string) => {
  switch (type) {
    case 'fire':
      return 'red';
    case 'grass':
      return 'green';
    case 'bug':
      return 'lime';
    case 'flying':
      return 'purple';
    case 'normal':
      return 'gray';
    case 'electric':
      return 'yellow';
    case 'ground':
      return 'brown';
    case 'poison':
      return 'black';
    case 'ice':
      return 'lightBlue';
    case 'water':
      return 'blue';
    default:
      return null;
  }
};

export const getBackgroundFromType = (type: string) => {
  const color = getColorFromType(type);

  switch (color) {
    case 'red':
      return 'bg-red-500';
    case 'green':
      return 'bg-green-500';
    case 'blue':
      return 'bg-blue-500';
    case 'purple':
      return 'bg-purple-500';
    case 'gray':
      return 'bg-slate-500';
    case 'lime':
      return 'bg-lime-500';
    case 'yellow':
      return 'bg-yellow-500';
    case 'brown':
      return 'bg-stone-500';
    case 'black':
      return 'bg-gray-400';
    case 'lightBlue':
      return 'bg-sky-500';
    default:
      return 'bg-gray-50';
  }
};
