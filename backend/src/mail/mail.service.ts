import { BadGatewayException, Injectable } from "@nestjs/common";
import { CreateMailDto } from "./dto/mail.dto";
import { Resend } from "resend";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class MailService {
  constructor(private readonly configService: ConfigService) {}
  public async send(dto: CreateMailDto) {
    const resend = new Resend(this.configService.getOrThrow("RESEND_API_KEY"));
    const { data, error } = await resend.emails.send({
      from: "Acme <onboarding@resend.dev>",
      to: dto.to,
      subject: dto.subject,
      html: dto.html,
    });

    if (error) throw new BadGatewayException(error.message);

    return data;
  }
}
