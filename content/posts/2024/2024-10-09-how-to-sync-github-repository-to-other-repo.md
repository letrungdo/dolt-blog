---
template: "post"
title: How to sync Github repository to other repo
date: 2024-10-09T11:55:00+07:00
author: letrungdo
slug: "how-to-sync-github-repository-to-other-repo"
cover: "../../images/2024/10/sync-git-repo.jpg"
keywords: "sync git repo"
categories:
  - Github Action
---

To sync a GitHub repository from Account A to Account B, you can use a few different methods depending on your preferences and requirements. Here’s a common approach using SSH for Authentication.

### Step-by-Step Guide to Set Up SSH Authentication

### 1. Generate an SSH Key Pair

On your local machine, open a terminal and generate a new SSH key pair specifically for this task:

```bash
ssh-keygen -t rsa -b 4096 -C "your_email@example.com"
```

When prompted, save the keys in a new file (e.g., ~/.ssh/github_actions_key). Leave the passphrase empty.

This will create two files:

- github_actions_key (private key)
- github_actions_key.pub (public key)

### 2. Add the Public Key to Account B’s Repository

- Go to the repository in Account B that you want to sync with.
- Navigate to **Settings > Deploy keys**.
- Click **Add deploy key**, provide a title, and paste the contents of github_actions_key.pub.
- Enable **Allow write access** to ensure push capabilities and save the key.

### 3. Add the Private Key as a Secret in Account A’s Repository

- Go to Account A’s repository where you want to set up the GitHub Action.
- Navigate to **Settings > Secrets and variables > Actions** and click **New repository secret**.
- Name the secret something like SSH_PRIVATE_KEY.
- Open the private key file (github_actions_key) in a text editor, copy its contents, and paste it into the secret.

### 4. Configure the GitHub Action Workflow to Use the SSH Key

- In Account A’s repository, create or update your GitHub Action workflow file to use the SSH key for authentication. Here’s an example:

```yaml
name: Sync to Account B with SSH

on:
  push:
    branches:
      - main

jobs:
  sync:
    runs-on: ubuntu-latest

    steps:
      - name: Checkout repository
        uses: actions/checkout@v3

      - name: Set up SSH
        run: |
          mkdir -p ~/.ssh
          echo "${{ secrets.SSH_PRIVATE_KEY }}" > ~/.ssh/github_actions_key
          chmod 600 ~/.ssh/github_actions_key
          ssh-keyscan github.com >> ~/.ssh/known_hosts
          echo "IdentityFile ~/.ssh/github_actions_key" >> ~/.ssh/config

      - name: Push to Target Repo
        run: |
          git remote add newTarget git@github.com:username/repository-name.git
          git push newTarget --all
          git push newTarget --tags

      - name: Cleanup SSH Key
        run: |
          rm -f ~/.ssh/github_actions_key
```
