import { plainToClass } from 'class-transformer';
import { validateSync, ValidationError } from 'class-validator';
import { configDto } from './dto/config.dto';


export default function validateConfig(configuration: Record<string, unknown>) {
  const finalConfig = plainToClass(configDto, configuration, {
    enableImplicitConversion: true,
  });

  const errors: ValidationError[] = validateSync(finalConfig, { skipMissingProperties: false });

  let index = 0;
  for (const err of errors) {
    if (!err.constraints) continue
    Object.values(err.constraints).map((str) => {
      ++index;
      console.log(index, str);
    });
    console.log('\n ***** \n');
  }
  if (errors.length)
    throw new Error('Please provide the valid ENVs mentioned above');

  return finalConfig;
}