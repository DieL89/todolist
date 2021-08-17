import { IPagedResult } from "../types/types";

const DataPropertyName: string = 'data';

export async function renderStreamedPagedResult(todoListGenerator: AsyncGenerator, todoPagination: IPagedResult, write: (content: string) => void): Promise<void> {
  write('{');
  write(getPaginationMarkup(todoPagination));
  write(`,"${DataPropertyName}":[`);

  let isNotFirstDoc = false;

  for await (let doc of todoListGenerator) {
    if (isNotFirstDoc) {
      write(',');
    } else {
      isNotFirstDoc = true;
    }

    write(JSON.stringify(doc));
  }

  write(']}');
}

function getPaginationMarkup(paginationModel: IPagedResult): string {
  let result = '';
  let counter = 0;
  const propertiesCount = Object.keys(paginationModel).length;

  for (let key in paginationModel) {
    if (key === DataPropertyName) {
      continue;
    }

    counter++;
    result += `"${key}"`;
    result += ':';
    result += paginationModel[key];

    if (counter !== propertiesCount) {
      result += ',';
    }
  }

  return result;
}
