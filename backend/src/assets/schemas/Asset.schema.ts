import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Asset extends Document {
  @Prop({ required: true })
  assetType: string;

  @Prop({ required: true, unique: true })
  assetCode: number;

  @Prop({ required: true })
  dateGiven: Date;

  @Prop()
  userName: string;

  @Prop({ default: false })
  isDeleted: boolean;

  @Prop()
  deleteDate: Date;
}

export const AssetSchema = SchemaFactory.createForClass(Asset);
