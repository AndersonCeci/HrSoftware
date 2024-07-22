import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

@Schema()
export class Bonus {
    @Prop({ required: true })
    desc: string;
  
    @Prop({ required: true })
    amount: number;
  }
 export const BonusSchema = SchemaFactory.createForClass(Bonus);

