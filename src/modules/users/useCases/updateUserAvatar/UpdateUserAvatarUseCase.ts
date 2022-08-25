import { prisma } from "../../../../database/prismaClient";
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc';
dayjs.extend(utc);
import { S3 } from 'aws-sdk';
import fs from 'fs';
import mime from 'mime';
import { resolve } from 'path';
import upload from "../../../../config/upload";


interface IUpdateUserAvatar {
  id: string;
  avatar_file: string | undefined;
}

export class UpdateUserAvatarUseCase {
  private client: S3;

  constructor() {
    this.client = new S3({
        region: process.env.AWS_BUCKET_REGION,
    });
  }

  async saveImage(file: string, folder: string): Promise<string> {
    if (process.env.DISK === 'local') {
      await fs.promises.rename(
        resolve(upload.tmpFolder, file),
        resolve(`${upload.tmpFolder}/${folder}`, file)
      );
      return file;
    } else {
      const originalName = resolve(upload.tmpFolder, file);
      const fileContent = await fs.promises.readFile(originalName);
      const ContentType = mime.getType(originalName);

      await this.client
        .putObject({
            Bucket: `${process.env.AWS_BUCKET}/${folder}`,
            Key: file,
            ACL: 'public-read',
            Body: fileContent,
            ContentType,
        })
        .promise();

      await fs.promises.unlink(originalName);
      return file;
    }
  }

  async deleteImage(file: string, folder: string): Promise<void> {
    const filename = resolve(`${upload.tmpFolder}/${folder}`, file);

    try {
        await fs.promises.stat(filename);
    } catch {
        return;
    }
    await fs.promises.unlink(filename);
  }
  
  async execute({ id, avatar_file }: IUpdateUserAvatar) {
    const user = await prisma.users.findUnique({
      where: {
        id
      },
    });
    
    if (!user) {
      throw new Error("User is not exists");
    }

    if (user?.avatar) {
      this.deleteImage(user.avatar, 'avatar');
    }
    
    if (avatar_file) {
      await this.saveImage(avatar_file, 'avatar');
    }
    
    const result = await prisma.users.update({
      where: {
        id,
      },
      data: {
        avatar: avatar_file
      },
    });
  }
}
