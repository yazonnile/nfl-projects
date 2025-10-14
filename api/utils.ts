import type { ID } from '../src/lib/typing-utils/id';

export type Ref = {
  $ref: string;
};

export const getIdFromRef = ({ $ref }: Ref, type: string): ID => {
  const [_, parts] = $ref.split(`/${type}/`);
  const [id] = parts!.match(/\d+/)!;

  return id!;
};
