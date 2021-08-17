export const BaseUrl: string = 'http://localhost:4000/todos/';
export const JsonContentType: string = 'application/json';

export function getItemUrl(baseUrl: string, id: string): string {
  return baseUrl + id;
}
