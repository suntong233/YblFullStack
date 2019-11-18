# YblFullStack

node + vue 全栈开发个人博客

# Journal

## 服务端

```js
@nest
    nest new server
    // 选择yarn安装

    // 服务端分为两部分 一部分开放管理端的接口（增删改查）  另一部分开放客户端接口（查询）
    cd server
    nest g app admin // 创建子应用 admin

    // 运行
    nest start -w admin

    // 再新建一个作为公共的库
    nest g lib db
    // 前缀：@libs

    // app.module.ts 引入db
    import { DbModule } from '@libs/db';

    @Module({
        imports: [
            DbModule
        ],
        controllers: [AppController],
        providers: [AppService],
    })

    // 安装数据库
    yarn add nestjs-typegoose @typegoose/typegoose
    yarn add mongoose @types/mongoose
    // libs/db/src里 module.ts

    import { TypegooseModule } from 'nestjs-typegoose'
    imports: [
        TypegooseModule.forRoot('mongodb://localhost/yblfullstack',{
            useCreateIndex: true,
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false
        })
    ],
```

## 创建模型文件

```js
    // db/src下创建models
    // 新建 user.model.ts

    import { prop } from '@typegoose/typegoose'


    export class User {
        @prop()
        username: string

        @prop()
        password: string
    }

    // db
+   const models = TypegooseModule.forFeature([User])
+   @Global()  // 全局导出
    @Module({
    imports: [
        TypegooseModule.forRoot('mongodb://localhost/yblfullstack',{
        useCreateIndex: true,
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false
        }),
+       models
    ],
    providers: [DbService],
+   exports: [DbService, models],
    })
```

* 在admin子项目里添加模块users

```js
    nest g mo -p admin users

    // 创建控制器
    nest g co -p admin users
```

## 使用crud模块

```js
    yarn add nestjs-mongoose-crud

    import { Controller } from '@nestjs/common';
    import { InjectModel } from 'nestjs-typegoose';
    import { User } from '@libs/db/models/user.model';
    import { Crud } from 'nestjs-mongoose-crud'

    @Crud({
        model: User
    })
    @Controller('users')
    export class UsersController {
        constructor(@InjectModel(User) private readonly model){}
    }

``` 

## 安装接口文档

```js
    yarn add @nestjs/swagger swagger-ui-express 

    // 添加配置
    const options = new DocumentBuilder()
        .setTitle('YBLfullstack博客后台管理api')
        .setDescription('admin接口文档')
        .setVersion('1.0')
        .build();
    const document = SwaggerModule.createDocument(app, options);
    SwaggerModule.setup('api-docs', app, document);

    // 添加标签 controller
    @ApiUseTags('name')
    // db 下
    @ApiModelProperty({description: '用户名', example: '默认用户名'})
    // db下添加注册时间
    @modelOptions({
        schemaOptions: {
            timestamps: true
        }
    })
```
* 新建课程模型
```js
    // db/models 新建course.model.ts

    // 数组里不用@Prop 用以下
    @arrayProp({itemsRef: 'Episode'})
    episodes: Ref<Episode>[]

    // Course课程模块示例

    import { prop, modelOptions, arrayProp, Ref } from '@typegoose/typegoose'
    import { ApiModelProperty } from '@nestjs/swagger'
    import { Episode } from './episode.model'

    @modelOptions({
        schemaOptions: {
            timestamps: true
        }
    })
    export class Course {
        @ApiModelProperty({description: '课程名称'})
        @prop()
        name: string

        @ApiModelProperty({description: '封面图'})
        @prop()
        cover: string

        @arrayProp({itemsRef: 'Episode'})
        episodes: Ref<Episode>[]
    }

    // 创建完别忘记在db下引用
    const models = TypegooseModule.forFeature([
        User,
        Course,
        Episode
    ])
```

* 模型建完建模块

```js
    nest g mo -p admin courses
    nest g co -p admin courses

    import { Controller } from '@nestjs/common';
    import { Crud } from 'nestjs-mongoose-crud';
    import { Course } from '@libs/db/models/course.model';
    import { InjectModel } from 'nestjs-typegoose';
    import { ReturnModelType } from '@typegoose/typegoose';

    @Crud({
        model: Course
    })
    @Controller('courses')
    @ApiUseTags('课程')
    export class CoursesController {
        constructor(
            @InjectModel(Course) private readonly model: ReturnModelType<typeof Course>
        ){}
    }

    // 课时
    nest g mo -p admin episodes
    nest g co -p admin episodes
```

## 接口创建完成 接下来写后台ui

```js
    // 使用typescript开发vue
    // 在admin同级 
    vue create admin

    vue add typescript
```