import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Asset extends Document {
  @Prop({ required: true })
  assetType: string;

  @Prop()
  dateGiven: Date;

  @Prop()
  userName: string;

  @Prop()
  assetCode:number

  @Prop({ default: false })
  isDeleted: boolean;

  @Prop()
  deleteDate: Date;
}

export const AssetSchema = SchemaFactory.createForClass(Asset);
