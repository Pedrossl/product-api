import { registerEnumType } from '@nestjs/graphql';

export enum CategoryEnum {
  FOOD = 'FOOD',
  CARE_AND_BEAUTY = 'CARE_AND_BEAUTY',
  MISCELLANEOUS = 'MISCELLANEOUS',
  ELECTRONICS = 'ELECTRONICS',
}

registerEnumType(CategoryEnum, {
  name: 'CategoryEnum',
});
