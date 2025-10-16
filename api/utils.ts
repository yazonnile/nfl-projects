import type { ID } from '../src/lib/typing-utils/id';

export type Ref = {
  $ref: string;
};

export const getIdFromRef = ({ $ref }: Ref, type: string): ID => {
  const [_, parts] = $ref.split(`/${type}/`);
  const [id] = parts!.match(/\d+/)!;

  return id!;
};

export const getResponseTime = () => {
  const startTime = Date.now();

  return (): string => {
    const responseTime = Date.now() - startTime;
    return humanizeResponseTime(responseTime);
  };
};

export const humanizeResponseTime = (ms: number): string => {
  if (ms < 1000) {
    return `${ms}ms`;
  } else if (ms < 60000) {
    return `${(ms / 1000).toFixed(1)}s`;
  } else {
    const minutes = Math.floor(ms / 60000);
    const seconds = ((ms % 60000) / 1000).toFixed(1);
    return `${minutes}m ${seconds}s`;
  }
};

export const getResponseSizeKB = (response: Response): number => {
  const contentLength = response.headers.get('content-length');
  if (contentLength) {
    return Math.round((parseInt(contentLength) / 1024) * 100) / 100;
  }
  return 0;
};

export const request = async (url: string, type: string) => {
  console.log(`\x1b[32m>>> SEND REQUEST: ${type}\x1b[0m`);

  const finish = getResponseTime();
  const response = await fetch(url);
  const humanizedTime = finish();
  const responseSizeKB = getResponseSizeKB(response);

  if (!response.ok) {
    const errorMessage = `<<< FAILED: ${type} ${response.status}`;
    console.log(`\x1b[31m${errorMessage}\x1b[0m`);
    throw new Error(errorMessage);
  }

  const data = await response.json();

  console.log(
    `\x1b[32m<<< REQUEST DATA: ${type} (${responseSizeKB}KB for ${humanizedTime} to complete)\x1b[0m`
  );

  return data;
};
