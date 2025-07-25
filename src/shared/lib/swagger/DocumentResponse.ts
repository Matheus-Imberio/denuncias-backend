import { applyDecorators } from '@nestjs/common';
import { ApiResponse, ApiResponseOptions } from '@nestjs/swagger';

export type WithMultipleExample = {
  status: number;
  description: string;
  examples: {
    [key: string]: {
      data: any;
      statusCode: number;
      message: string;
    };
  };
};

export type WithSingleExample = {
  status: number;
  description: string;
  example: {
    data: any;
    statusCode: number;
    message: string;
  };
};

export function hasMultipleExample(
  responses: WithMultipleExample | WithSingleExample,
): responses is WithMultipleExample {
  return (responses as WithMultipleExample).examples !== undefined;
}

export function DocumentResponse(
  responses: (WithMultipleExample | WithSingleExample)[],
) {
  const decorators: ReturnType<typeof ApiResponse>[] = [];

  for (const response of responses) {
    const documentation: ApiResponseOptions = {
      status: response.status,
      description: response.description,
    };

    if (hasMultipleExample(response)) {
      const examples = Object.entries(response.examples).reduce(
        (acc, [key, value]) => {
          return {
            ...acc,
            [key]: {
              value: value,
            },
          };
        },
        {},
      );

      documentation.content = {
        'application/json': {
          examples,
        },
      };
    } else {
      documentation.content = {
        'application/json': {
          example: response.example,
        },
      };
    }

    const decorator = ApiResponse(documentation);
    decorators.push(decorator);
  }

  return applyDecorators(...decorators);
}
