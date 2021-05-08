export type IClassnameArrayItem = String | Boolean | undefined | null;

export const getClassName = (array: IClassnameArrayItem[]) => {
  return array.filter(Boolean).join(' ');
};
