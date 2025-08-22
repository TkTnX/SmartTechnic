import { IsNotEmpty, IsNumber, Max, Min } from "class-validator";

export class ReviewDto {
  @IsNotEmpty({ message: "Заголовок не может быть пустым" })
  title: string;

  @IsNotEmpty({ message: "Текст не может быть пустым" })
  comment: string;

  @IsNumber({}, { message: "Рейтинг должен быть числом" })
  @Min(1, { message: "Минимальный рейтинг - 1!" })
  @Max(5, { message: "Максимальный рейтинг - 5!" })
  rating: number;
}
