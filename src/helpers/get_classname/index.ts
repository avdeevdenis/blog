export type IClassnameArrayItem = String | Boolean | undefined | null;

export const getClassName = (array: IClassnameArrayItem[]) => {
  const prepared = array.filter(Boolean) as string[];

  if (prepared.length === 1) return prepared[0];

  return prepared.join(' ');
};
