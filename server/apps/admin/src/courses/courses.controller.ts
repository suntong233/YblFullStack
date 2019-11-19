import { Controller, Get } from '@nestjs/common';
import { Crud } from 'nestjs-mongoose-crud';
import { Course } from '@libs/db/models/course.model';
import { InjectModel } from 'nestjs-typegoose';
import { ReturnModelType } from '@typegoose/typegoose';
import { ApiUseTags, ApiModelProperty, ApiOperation } from '@nestjs/swagger';

@Crud({
    model: Course
})
@Controller('courses')
@ApiUseTags('课程')
export class CoursesController {
    constructor(
        @InjectModel(Course) private readonly model: ReturnModelType<typeof Course>
    ){}

    @Get('option')
    @ApiOperation({title: '服务端返回前端crud配置'})
    option() {
        return {
            title: '课程管理',
            column: [
                {prop: 'name', label: '课程名称', sortable: true},
                {prop: 'cover', label: '课程封面图'}
            ]
        }
    }
}
