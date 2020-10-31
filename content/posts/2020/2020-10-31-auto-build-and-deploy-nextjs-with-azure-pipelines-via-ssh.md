---
template: "post"
title: Auto Build & Deploy Nextjs with Azure Pipelines via SSH
date: 2020-10-31T20:32:22+07:00
author: letrungdo
slug: "auto-build-and-deploy-nextjs-with-azure-pipelines-via-ssh"
cover: "../../images/2020/10/azure-pipelines-ssh.png"
keywords: "Deploy Nextjs with Azure Pipelines"
categories:
  - Nextjs
  - DevOps
---
In the [previous post](/how-to-deploy-nextjs-to-centos-apache), I guided how to deploy nextjs to centos.
In this article, I will guide you to automatically build and deploy nextjs to the server using azure pipelines.

In this article, we will not introduce what Azure Pipelines or how to create new pipeline.
If you are new, you can refer to <a href="https://docs.microsoft.com/en-us/azure/devops/pipelines/get-started/" target="_blank" rel="nofollow noopener">here</a>.

### Add task SSH
I love to use the classic editor to create a pipeline without YAML.

<img src="/media/2020/azure-pipelines-ssh.png" class="aligncenter size-full">

#### 1. Add Service connections
Click 1 "manage" to create ssh connection to the server.

#### 2, 3. Add script
Select 2 "Inline Script" and paste the code below:
```bash
cd /var/www/html/your-source-code
git checkout .
git pull
npm i
npm run build
pm2 restart yourapp
```
This means you point to the directory containing the source code, reset the changed files. Then pull back the latest source. Install npm and build source.

Then let pm2 update the build just created.

#### 4. Prevent Fail on STDERR
If this option is selected, the build will fail when the remote commands or script write to STDERR.

#### Complete yaml file
```yaml
- task: SSH@0
  displayName: 'Run shell inline on remote machine'
  inputs:
    sshEndpoint: 'your-ssh-endpoint'
    runOptions: inline
    inline: |
     cd /var/www/html/your-source-code
     git checkout .
     git pull
     npm i
     npm run build
     pm2 restart yourapp
    failOnStdErr: false
```
#### 5. Auto run pipelines when merge develop
Select Triggers tab.  
Check Enable continuous integration. Input Branch specification: develop
<img src="/media/2020/azure-pipelines-trigger.png" class="aligncenter size-full">

> Tips: You can add task "Post to Slack" to notify when the build is complete.



