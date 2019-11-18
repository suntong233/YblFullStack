import { prop } from '@typegoose/typegoose'
import { ApiModelProperty } from '@nestjs/swagger'

export class Post {
    @ApiModelProperty({ description: '帖子标题', example: '默认标题' })
    @prop()
    title: string
    
    @ApiModelProperty({ description: '帖子内容', example: '默认内容' })
    @prop()
    content: string
}
