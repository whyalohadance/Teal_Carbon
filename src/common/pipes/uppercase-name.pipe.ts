import { PipeTransform, Injectable, ArgumentMetadata } from '@nestjs/common';

@Injectable()
export class UppercaseNamePipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    // Daca value este obiect (body)
    if (typeof value === 'object' && value !== null) {
      if (value.firstName && typeof value.firstName === 'string') {
        value.firstName = value.firstName.toUpperCase();
      }
      if (value.lastName && typeof value.lastName === 'string') {
        value.lastName = value.lastName.toUpperCase();
      }
      return value;
    }

    // Daca value e string (ex: query param)
    if (typeof value === 'string') {
      return value.toUpperCase();
    }

    return value;
  }
}
