import { KeyType } from "@reapit/foundations-ts-definitions"
import { IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator'

export class ApiKeyDto {
  @IsEnum(KeyType)
  keyType: KeyType

  @IsString()
  @IsNotEmpty()
	keyExpiresAt: string

  @IsString()
  @IsNotEmpty()
	clientCode: string

  @IsString()
  @IsOptional()
  paymentId?: string
}