import { Injectable } from '@nestjs/common';
import * as crypto from 'crypto';
@Injectable()

export class CommonService {
    generateId(length?) {
        if (typeof length === 'undefined') {
            length = 8;
        }
        return crypto.randomBytes(length).toString('hex');
    }
    handleError(
        action: string,
        error,
        body = null,
        query = null,
      ){
        return {
          statusCode: 400,
          errorDetails: {
            code: 'INVALID_REQUEST',
            message: `Invalid request: something went wrong, ${error}`,
            details: {
              action: action,
              query: JSON.stringify(query),
              body: JSON.stringify(body),
            },
          },
        };
      }
}

