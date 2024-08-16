import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Inventory extends Document {
  @Prop({ required: true })
  assetType: string;

  @Prop({ required: true, unique: true })
  assetCode: number ;

  @Prop({ default: 'Not Reserved' })  
  status: string;

  @Prop({ default: false })
  isDeleted: boolean;

  @Prop()
  deleteDate: Date;
}

export const InventorySchema = SchemaFactory.createForClass(Inventory);
