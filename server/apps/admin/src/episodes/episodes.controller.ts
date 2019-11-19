import { Controller, Get } from '@nestjs/common';
import { ApiUseTags, ApiOperation } from '@nestjs/swagger';
import { Crud } from 'nestjs-mongoose-crud';
import { Episode } from '@libs/db/models/episode.model';
import { InjectModel } from 'nestjs-typegoose';
import { ReturnModelType } from '@typegoose/typegoose';

@Crud({
    model: Episode
})
@ApiUseTags('课时')
@Controller('episodes')
export class EpisodesController {
    constructor(
        @InjectModel(Episode) private readonly model: ReturnModelType<typeof Episode>
    ){}

    @Get('option')
    @ApiOperation({title: '服务端返回前端crud配置'})
    option() {
        return {
            title: '课时管理',
            column: [
                {prop: 'name', label: '课时名称'},
                {prop: 'file', label: '课时文件'}
            ]
        }
    }
}
