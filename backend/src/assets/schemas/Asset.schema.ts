import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema()
export class Asset extends Document {
  @Prop({ required: true })
  assetType: string;

  @Prop({ required: true, unique:true })
  assetCode: string;

  @Prop({ required: true })
  dateGiven: string;

  @Prop()
  userName: string;
}

export const AssetSchema = SchemaFactory.createForClass(Asset);
