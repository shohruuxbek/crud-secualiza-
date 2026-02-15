import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Auth } from './entities/auth.entity';
import * as bcrypt from 'bcrypt'
import * as nodemailer from "nodemailer"

@Injectable()
export class AuthService {
  constructor(@InjectModel(Auth) private authModel: typeof Auth) { }

  private transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "qadamboyevshohrux6@gmail.com",
      pass: process.env.APP_KEY
    }
  })



  async create(createAuthDto: CreateAuthDto): Promise<Auth> {
    const { username, email, password } = createAuthDto
    const foundedUser = await this.authModel.findOne({ where: { email } })


    if (foundedUser) throw new BadRequestException("Email aalready exists")

    const hashPasseord = await bcrypt.hash(createAuthDto.password, 10)

    const code = Array.from({ length: 6 }, () => Math.floor(Math.random() * 10)).join("")

    await this.transporter.sendMail({
       from: "",
      to: "Simple",
      subject: "Otp",
      text: "Simple",
      html: `<b>${code}</b>`
    })

    return await this.authModel.create({ username, email, password: hashPasseord })

  }

async register(createAuthDto: CreateAuthDto): Promise<Auth> {
    const { username, email, password } = createAuthDto
    const foundedUser = await this.authModel.findOne({ where: { email } })


    if (foundedUser) throw new BadRequestException("Email aalready exists")

    const hashPasseord = await bcrypt.hash(createAuthDto.password, 10)

    const code = Array.from({ length: 6 }, () => Math.floor(Math.random() * 10)).join("")

    await this.transporter.sendMail({
       from: "",
      to: "Simple",
      subject: "Otp",
      text: "Simple",
      html: `<b>${code}</b>`
    })

    return await this.authModel.create({ username, email, password: hashPasseord })

  }

  async findAll(): Promise<Auth[]> {
    return await this.authModel.findAll()
  }

  findOne(id: number) {
    return `This action returns a #${id} auth`;
  }

  update(id: number, updateAuthDto: UpdateAuthDto) {
    return `This action updates a #${id} auth`;
  }

  async remove(id: number): Promise<boolean> {
    await this.authModel.destroy({where: {id: +id}})
    return true
  }
}
