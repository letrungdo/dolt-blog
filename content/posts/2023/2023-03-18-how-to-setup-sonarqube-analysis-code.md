---
template: "post"
title: How to setup sonarqube analysis code
date: 2023-03-18T10:12:00+07:00
author: letrungdo
slug: "how-to-setup-sonarqube-analysis-code"
cover: "../../images/2023/03/sonarqube.jpg"
keywords: "sonarqube, sonar-scanner"
categories:
  - DevOps
tags:
  - Sonarqube
---

## Setup Sonarqube for MacOS

#### Pre request:
- Install docker: https://docs.docker.com/desktop/install/mac-install

#### Docker pull sonarqube

```sh
docker run -d --name sonarqube -p 9000:9000 -p 9092:9092 sonarqube
```

or

```sh
docker run -d --name sonarqube -p 9000:9000 -p 9092:9092 -e SONARQUBE_JDBC_USERNAME=sonar -e SONARQUBE_JDBC_PASSWORD=sonar -e SONARQUBE_JDBC_URL=jdbc:postgresql://localhost/sonar sonarqube
```

#### Start Sonarqube

```sh
docker start sonarqube
```

#### How to use Sonarqube
Access to http://localhost:9000
Login with username & password = admin

##### 1. Create new project & Generate token

<img class="aligncenter size-full" src="/media/2023/03/sonar-scanner.jpg" alt="sonar-scanner" />

##### 2. Download sonar scanner: https://docs.sonarqube.org/9.9/analyzing-source-code/scanners/sonarscanner/

and then unzip the file & move to /Users/xxx

Open /Users/xxx/.zshrc and add the bin directory to the PATH environment variable

```sh
 export PATH="$PATH:$HOME/sonar-scanner/bin"
```

##### 3. Running a SonarQube analysis
cd to root project and run command:

```sh
sonar-scanner \
  -Dsonar.projectKey=test \
  -Dsonar.sources=. \
  -Dsonar.host.url=http://localhost:9000 \
  -Dsonar.login=sqp_79738bde96b1adb965512a861fbfbbb022f582af
```
