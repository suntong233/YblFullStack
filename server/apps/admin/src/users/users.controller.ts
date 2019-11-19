import { Controller, Get } from '@nestjs/common';
import { InjectModel } from 'nestjs-typegoose';
import { User } from '@libs/db/models/user.model';
import { Crud } from 'nestjs-mongoose-crud'
import { ApiUseTags, ApiOperation } from '@nestjs/swagger';

@Crud({
    model: User
})
@Controller('users')
@ApiUseTags('用户crud')
export class UsersController {
    constructor(@InjectModel(User) private readonly model){}
    
    @Get('option')
    @ApiOperation({title: '服务端返回前端crud配置'})
    option() {
        return {
            title: '用户管理',
            column: [
                {prop: 'username', label: '用户名'},
                {prop: 'password', label: '密码'}
            ]
        }
    }
}
