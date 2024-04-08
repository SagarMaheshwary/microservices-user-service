import { Inject, Injectable, Logger } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import * as bcrypt from "bcrypt";

@Injectable()
export class Hash {
  constructor(
    @Inject(ConfigService) private readonly configService: ConfigService,
  ) {}

  async make(text: string): Promise<string> {
    return await bcrypt.hash(text, this.configService.get("hash.rounds"));
  }

  async compare(text: string, hash: string): Promise<boolean> {
    return await bcrypt.compare(text, hash);
  }
}
