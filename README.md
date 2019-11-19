# YblFullStack

node + vue 全栈开发个人博客

* 启动数据库 mongod --dbpath d:\data\db

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
@yarn
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
@nest
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
@add
    // 使用typescript开发vue
    // 在admin同级 
    vue create admin

    vue add typescript  // ts
    vue add element   // element-ui
    vue add router   // vue-router
    yarn serve   // 启动项目

    // 为方便开发 安装element的插件  element ui snippets
```

* ts组件写法
```html
    <script lang="ts">
        import { Component, Vue } from 'vue-property-decorator'
        @Component({

        })

        export default class App extends Vue {

        }
    </script>
```

* ts声明接口代码提示

```ts
    const routes: RouteConfig[] = [
        {
            path: '/',
            component: Main,
            children: [
                {name: 'home', path: '/', component: Home}
            ]
        }
    ]

```

## ts中使用axios

```ts
@yarn
    yarn add axios @types/axios
    
    // main.ts
    import axios from 'axios'

    Vue.prototype.$axios = axios.create({
    baseURL: 'http://localhost:3000'
    })

    // nest跨域 main.ts
    app.enableCors()


    // ts接口 消除错误提示 我们在vue的prototype上添加了$axios
    // src下新建文件 custom-vue.d.ts
    
    import { AxiosInstance } from "axios";

    declare module 'vue/types/vue' {
        interface Vue {
            $axios: AxiosInstance
        }
    }
    // f1 启动vscode命令窗口 reload重载
```

## 新建与编辑的路由路径

```ts
    const routes: RouteConfig[] = [
        {
            path: '/',
            component: Main,
            children: [
            { name: 'home', path: '/', component: () => import('../views/Home.vue') },
            { name: 'course-list', path: '/courses/list', component: () => import('../views/courses/CourseList.vue') },
            { name: 'course-edit', path: '/courses/edit/:id', component: () => import('../views/courses/CourseEdit.vue'), props: true },
            { name: 'course-create', path: '/courses/create', component: () => import('../views/courses/CourseEdit.vue') }
            ]
        }
    ]

    // 接受参数 @prop
    @Prop(String) id!:string
    // 计算属性
    get isCreate(){
        return !this.id
    }
```

## vue-ele-form 动态生成表单

```js
@yarn 
    yarn add vue-ele-form
    // main.ts全局注册
    import EleForm from 'vue-ele-form'
    Vue.use(EleForm)

    // 新建package.d.ts 声明引入的模块
    declare module 'vue-ele-form' {
        export const install: () => any
    }

    // eleform

    <ele-form
    :form-data="data"
    :form-desc="fields"
    >
    </ele-form>

    data = {};
    fields = {
        name: {label: '名称', type: 'input'},
        cover: {label: '课程封面图', type: 'input'}
    };
```

## 编辑和新建页面

```js
    // 根据是否是创建还是编辑页面执行请求
    !this.isCreate && this.fetch()

    // 动态添加post或put请求
    async submit(data:any){
        const url = this.isCreate ? `courses` : `courses/${this.id}`
        const method = this.isCreate ? 'post' : 'put'
        let res = await this.$axios[method](url, data)
        if(res){
        this.$message.success('保存成功')
        this.data = {}
        this.$router.go(-1)
        }
    }

    // 删除
    async remove(id: string){
        try {
        await this.$confirm('确认要删除吗？')
        } catch(e) {
        return
        }
        let res = await this.$axios.delete(`courses/${id}`)
        if(res){
        this.$message.success('删除成功')
        this.fetch()
        }
    }
```

## 使用AVUE快速开发crud接口

```js
@yarn 
    yarn add @smallwei/avue

    // 配置 plugins 下新建avue.ts
    import Vue from 'vue'
    import Avue from '@smallwei/avue'
    import '@smallwei/avue/lib/index.css'

    Vue.use(Avue)

```

```js
    // 前端配置数据分离到服务端
    @Get('option')
    @ApiOperation({title: '服务端返回前端crud配置'})
    option() {
        return {
            title: '课程管理',
            column: [
                {prop: 'name', label: '课程名称'},
                {prop: 'cover', label: '课程封面图'}
            ]
        }
    }
    // 通过服务端返回的配置动态地给前端提供接口
```

## 分页

```js

    
```