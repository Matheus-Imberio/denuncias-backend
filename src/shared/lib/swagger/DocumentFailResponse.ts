import { applyDecorators } from '@nestjs/common';
import { ErrorSchema } from 'src/@core/error.core';
import { DocumentResponse, WithMultipleExample } from './DocumentResponse';


export type WithErrorSchema = {
  status: number;
  description: string;
  examples: {
    [key: string]: ErrorSchema;
  };
};

export function DocumentFailResponse(schemas: WithErrorSchema[]) {
  const decorators: ReturnType<typeof DocumentResponse>[] = [];

  for (const schema of schemas) {
    const examples = Object.entries(schema.examples).reduce(
      (acc, [key, value]) => {
        return {
          ...acc,
          [key]: {
            statusCode: value.statusCode,
            message: value.message,
            data: null,
          },
        };
      },
      {},
    );

    const documentation: WithMultipleExample = {
      status: schema.status,
      description: schema.description,
      examples,
    };

    const decorator = DocumentResponse([documentation]);
    decorators.push(decorator);
  }

  return applyDecorators(...decorators);
}
