import { Controller, Get, Post, Body, Query, Param, Put, Delete } from '@nestjs/common';
import { ApiUseTags, ApiOperation, ApiModelProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { InjectModel } from 'nestjs-typegoose';
import { Post as PostSchema } from './post.model'
import { ModelType } from '@typegoose/typegoose/lib/types';
import { Crud } from 'nestjs-mongoose-crud'

class CreatePostDto {
    @IsNotEmpty({ message: '请填写标题' })
    title: string
    
    content: string
}

@Crud({
    model: PostSchema,
    routes: {
        find: {
            decorators: [
                ApiOperation({ title: '帖子列表' })
            ]
        }
    }
})
@Controller('posts')
@ApiUseTags('文章crud')
export class PostsController {
    constructor(
        @InjectModel(PostSchema) private readonly model: ModelType<PostSchema>
    ){ }

    // @Get('/')
    // @ApiOperation({ title: '显示博客列表' })
    // async index() {
    //     return this.postModel.find()
    // }

    // @Post()
    // @ApiOperation({ title: '创建帖子' })
    // async create(@Body() createPostDto: CreatePostDto) {
    //     await this.postModel.create(createPostDto)
    //     return {
    //         success: true
    //     }
    // }

    // @Get(':id')
    // @ApiOperation({ title: '根据id获取详情' })
    // async detail(@Param('id') id: string) {
    //     return await this.postModel.findById(id)
    // }

    // @Put(':id')
    // @ApiOperation({ title: '编辑帖子' })
    // async updated(@Param('id') id: string, @Body() createPostDto: CreatePostDto) {
    //     await this.postModel.findByIdAndUpdate(id, createPostDto)
    //     return {
    //         success: true
    //     }
    // }

    // @Delete(':id')
    // @ApiOperation({ title: '删除帖子' })
    // async remove(@Param('id') id: string) {
    //     await this.postModel.findByIdAndDelete(id)
    //     return {
    //         success: true
    //     }
    // }
}
