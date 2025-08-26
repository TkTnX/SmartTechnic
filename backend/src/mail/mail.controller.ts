import {  Body, Controller, Post } from "@nestjs/common";
import { MailService } from "./mail.service";
import { CreateMailDto } from "./dto/mail.dto";

@Controller("mails")
export class MailController {
  constructor(private readonly mailService: MailService) {}

  @Post("/send")
  public async sendMail(@Body() dto: CreateMailDto) {
    return await this.mailService.send(dto);
  }
}
