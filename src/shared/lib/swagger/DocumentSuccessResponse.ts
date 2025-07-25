import { applyDecorators } from '@nestjs/common';
import { DocumentResponse, WithMultipleExample } from './DocumentResponse';

type SuccessSchema = {
  statusCode: number;
  data: unknown;
};

export type WithSuccessSchema = {
  status: number;
  description: string;
  examples: {
    [key: string]: SuccessSchema;
  };
};

export function DocumentSuccessResponse(schemas: WithSuccessSchema[]) {
  const decorators: ReturnType<typeof DocumentResponse>[] = [];

  for (const schema of schemas) {
    const examples = Object.entries(schema.examples).reduce(
      (acc, [key, value]) => {
        return {
          ...acc,
          [key]: {
            statusCode: value.statusCode,
            message: '',
            data: value.data,
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
