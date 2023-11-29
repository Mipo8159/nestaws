import { Type } from 'class-transformer';
import {
  ArrayMinSize,
  IsArray,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsString,
  Min,
  MinLength,
  ValidateNested,
} from 'class-validator';

export enum Unit {
  MILILITERS = 'mililiters',
  LITER = 'liters',
  GRAMS = 'grams',
  KILOGRAMS = 'kilograms',
  SPOONS = 'spoons',
  CUPS = 'cups',
  PIECES = 'pieces',
}

export class RecipeDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(10) // minLength is used with strings
  description: string;

  @IsArray()
  @ArrayMinSize(1)
  @ValidateNested({ each: true }) // validating every inner element
  @Type(() => IngrediendDto) // type is needed when validating nested objects
  ingredients: IngrediendDto[];
}

export class IngrediendDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  @IsEnum(Unit) // validates enums
  unit: Unit;

  @IsNotEmpty()
  @IsNumber()
  @Min(1) // min is used with numbers
  quantity: number;
}
