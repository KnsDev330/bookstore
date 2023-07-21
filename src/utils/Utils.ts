export const sleep = (ms: number) => new Promise(r => setTimeout(() => r(''), ms));

export const TextEllipse = (text: string, maxLength: number): string => text.length < maxLength ? text : text.substring(0, maxLength) + '...';