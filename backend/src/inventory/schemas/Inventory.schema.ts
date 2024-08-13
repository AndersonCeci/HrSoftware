import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import * as muv from 'mongoose-unique-validator';
import { Asset } from 'src/assets/schemas/Asset.schema';

export enum InventoryStatus {
  Available = 'Available',
  Assigned = 'Assigned',
  Broken = 'Broken',
  OnRepair = 'OnRepair',
}

@Schema({ timestamps: true })
export class Inventory extends Document {
  @Prop({ type: Types.ObjectId, ref: 'Asset' })
  assetID: Types.ObjectId;

  @Prop({ unique: true })
  assetCodes: string;

  @Prop({
    type: String,
    enum: InventoryStatus,
    required: true,
  })
  status: InventoryStatus;

  @Prop({ type: Types.ObjectId, ref: 'Employee' })
  employeeID: Types.ObjectId;

  @Prop()
  assignedDate: Date;

  @Prop()
  assetName: string;

  @Prop({ default: false })
  isDeleted: boolean;

  @Prop()
  deleteDate: Date;
}

const InventorySchema = SchemaFactory.createForClass(Inventory);
export { InventorySchema };
