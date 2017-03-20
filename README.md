# V-book
## git 操作

### 新开分支
* git pull origin develop
* git checkout -b your_branch

### 合并新内容
* git stash
* git pull origin develop
* git stash apply 

### 提交内容
* git add xx
* git commit -m 'xxxx'
* git pull origin develop (有冲突解决冲突, 重复第一步)
* git push origin your_branch


## 安装说明

1.首次拉取项目时，请安装依赖，运行命令： `composer install`

2.运行数据库初始化命令： `php artisan p:u`

## 安装docker
1. 找到自己系统对应的版本[下载](https://get.daocloud.io/)，看清楚文档

2. 启动 docker (不是用 docker-toolbox 的跳过这部步):
    + 使用 docker-toolbox 的先执行: `docker-machine start default`
    + 如果提示不存在“default”，执行: `docker-machine create -d virtualbox default`

3. clone [laradoc](https://github.com/nickfan/laradock) 到本地，如果使用的是 docker-toolbox，clone [这个](https://github.com/LaraDock/laradock/tree/LaraDock-ToolBox)

4. 在shell里面切换到 laradoc 的目录，根据需要用到的服务，编辑 docker-compose.yml，常用的几个服务:
    + mysql: 账号和密码默认均为root，根据自己的需求改ports字段，比如"80:80"，前面的端口是指本机的端口，后面的端口是docker里面的虚拟机的端口
    + phpmyadmin: 同mysql，ports字段也可以改
    + nginx: ports字段有两个，上面的是http端口，下面的是https的端口；除了端口，还需要在laradock/nginx/sites里面，以sample.conf.example为模板，新建一份XX.conf，只需要把server_name字段改成你想要本地访问的url，把root字段改成/var/www/your-project-path/public，其实就是项目在虚拟机里面的映射路径
    + applications: 这个服务主要定义的时候代码目录的映射，在volumes字段下面，可以定义多个项目的映射规则，比如 ../:/var/www 就是把docker-compose.yml所在的目录的上层目录，映射到了虚拟机里面的/var/www目录下面，如此类推
    + workspace: 基本工作区配置，只需要关注你是否需要args字段下面的插件，把你需要的插件改成true就可以了
    + redis: 端口根据需要来改，一般默认

## 如何访问
1. 目录结构，项目目录和laradock目录在同一级目录，在applications里面的映射规则就是../project-name:/var/www/project-name, 在nginx的root字段就是/var/www/project-name/public

2. 在docker-compose.yml的目录下，执行docker-compose up -d XXX XXX XXX, XXX对应的是上面提到的服务，一般执行docker-compose up -d mysql phpmyadmin nginx redis 就足够了，applications和workspace会默认跟着启动

3. 通过docker ps命令来查看启动的虚拟机是否正在运行

4. 在hosts里面，把在nginx配置文件里面定义的server_name加入到hosts
