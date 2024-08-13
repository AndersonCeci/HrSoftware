import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import * as muv from 'mongoose-unique-validator';

@Schema({timestamps:true})
export class Asset extends Document {

  @Prop({required:true,unique:true})
  assetName:string
 }

const AssetSchema = SchemaFactory.createForClass(Asset).plugin(muv);
export {AssetSchema}

