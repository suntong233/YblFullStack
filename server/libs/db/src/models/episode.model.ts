import { prop, modelOptions } from '@typegoose/typegoose'
import { ApiModelProperty } from '@nestjs/swagger'

@modelOptions({
    schemaOptions: {
        timestamps: true
    }
})
export class Episode {
    @ApiModelProperty({description: '课时名'})
    @prop()
    name: string

    @ApiModelProperty({description: '文件'})
    @prop()
    file: string
}