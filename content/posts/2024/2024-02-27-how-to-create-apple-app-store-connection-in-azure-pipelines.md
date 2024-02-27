---
template: "post"
title: How to create apple app store connection in azure pipelines
date: 2024-02-27T16:52:00+07:00
author: letrungdo
slug: "how-to-create-apple-app-store-connection-in-azure-pipelines"
cover: "../../images/2024/02/app-store-connect.jpg"
keywords: "apple app store connection"
categories:
  - Flutter
---

### Trying to Deploy IOS App on Test-flight via Azure DevOps - I'm facing build error

The fix to is to the base64 encode of the .p8 file when you add it to the Service Connection. While the .p8 file downloaded from the Apple Developer portal looks like it's base64 encoded, it needs to be re-encoded, including the "-----BEGIN PRIVATE KEY-----" section.

The link shared above by @hlf0506 ( https://damienaicheh.github.io/azure/devops/2021/10/27/configure-azure-devops-app-store-en.html ) gives instructions on how to do this, (copied and pasted below)

Concerning the API_KEY_ENCODED to generate it, just encode the content of the .p8 file as is. Do not change the format of the file otherwise it will not work. To convert your key to base64, put it in a txt file and run one of this command below, depending on your OS. You will get a file containing the base64 string that represent your API key.

Windows

> certutil -encode data.txt tmp.b64 && findstr /v /c:- tmp.b64 > data.b64 && del tmp.b64

Mac

> base64 -i data.txt -o data.b64

Ubuntu

> base64 data.txt > data.b64
