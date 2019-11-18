
## 安装
!!!!!
```
@npm
    npm i -g @nestjs/cli
    nest new project-name
    npm run start:dev
```

## 模块安装
!!!!!
```
@npm
    g 表示generate mo表示module  创建一个子模块
    nest g mo posts // 创建一个子模块posts
    nest g co posts // 在posts模块创建控制器constroller

    一个posts接口
    export class PostsController {
        @Get('/')
        index(){
            return []
        }
    }
```

## swagger
!!!!!!
```js
@npm
    npm i --save @nestjs/swagger swagger-ui-express

    main.ts

    import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';


    const options = new DocumentBuilder()
        .setTitle('YBL博客api')
        .setDescription('这是一段描述')
        .setVersion('1.0')
        .build();
    const document = SwaggerModule.createDocument(app, options);
    SwaggerModule.setup('api-docs', app, document);


    @ApiUseTags('默认')  // 给模块 增加标签
    @ApiOperation({title: '显示博客列表'})  // 给接口增加描述
```

```js
    // 参数装饰器
    class CreatePostDto {
        @ApiModelProperty({description: '帖子标题'})
        title: string
        @ApiModelProperty({description: '帖子内容'})
        content: string
    }
    
    @Body() body:CreatePostDto
    @Param('id') id: string
```

## 数据库相关

```js
@npm
    npm i -d @types/mongoose mongoose
    yarn add @hasezoey/typegoose@next @types/mongoose mongoose

    // 安装yarn
    npm install -g yarn 
    yarn --version

    // 连接数据库 main.ts
    import * as mongoose from 'mongoose'
    mongoose.connect('mongodb://localhost/nest-blog-api', {
        useCreateIndex: true,
        useNewUrlParser: true,
        useFindAndModify: true
    })

    // Post模块下新建文件存模型 post.model.ts

    import { getModelForClass, prop } from '@hasezoey/typegoose'

    export class Post {
        @prop()
        title: string
    }

    export const PostModel = getModelForClass(Post)
```

* 接口限制添加example示例
```js
    @ApiModelProperty({ description: '帖子标题', example: '默认标题' })
```

## 验证

```js
@yarn
    yarn add class-validator class-transformer
    // main.ts 开启全局验证管道
    app.useGlobalPipes(new ValidationPipe())


    // 回到控制层的接口限制
    import { IsNotEmpty } from 'class-validator';

    class CreatePostDto {
        @ApiModelProperty({ description: '帖子标题', example: '默认标题' })
        @IsNotEmpty({ message: '请填写标题' })
        title: string
        @ApiModelProperty({ description: '帖子内容', example: '默认内容'  })
        content: string
    }
```

## 模块化的思想引入数据模型

```js
@npm  
    npm i --save nestjs-typegoose
    yarn add nestjs-typegoose --save
    yarn add @typegoose/typegoose --save
```

```js
    constructor(
        @InjectModel(PostSchema) private readonly postModel: ModelType<PostSchema>
    ){ }
```

## 全站之巅的crud包

```js
    yarn add nestjs-mongoose-crud
```



## 包总结

```
    npm i -g @nestjs/cli   // 安装nestjs
    nest new project-name   // 创建一个项目
    npm run start:dev  // 启动

    nest g mo posts // 创建一个子模块posts
    nest g co posts // 在posts模块创建控制器constroller

    npm i --save @nestjs/swagger swagger-ui-express // 安装swagger

    // 安装yarn
    npm install -g yarn 
    yarn --version
    
    // 数据库 
    yarn add nestjs-typegoose @typegoose/typegoose --save

    yarn add class-validator class-transformer   // 管道验证
```