---
template: "post"
title: How to Edit Commits and Squash Multiple Commits into One in Git
description: Guide on how to push edited changes merged with the previous commit without creating a new commit. How to squash old commits into a single commit to clean up git history.
date: 2021-11-08T15:20:22+02:00
author: letrungdo
slug: "cach-chinh-sua-commit-gop-nhieu-commit-thanh-mot-trong-git"
lang: "en"
cover: "../../images/2021/11/git-rebase.jpg"
keywords: "git rebase, git merge history"
categories:
  - Git
tags:
  - Rebase
---

This article will guide you on how to push edited changes combined with the previous commit without creating a new commit.
And how to squash old commits into a single commit to keep your git history clean.

## How to Push Edits Combined with the Previous Commit

Open terminal and enter the following commands:

```bash
git add .
git commit --amend --no-edit
git push --force
```

## How to Squash Old Commits into a Single Commit

Example: Your Git repo has 10 commits starting from commitID commitID1 -> commitID2 -> ... -> commitID10.
If you want to squash commitID4 through commitID8 into 1 commit, follow these steps below:

```bash
git rebase -i commitID10
```

Then a prompt similar to this will appear:

```bash
pick a00a16b add page download-osmosis-notes # add mterial-ui
pick 6379f63 update ui
pick 181fbf3 update ui
pick b3ab886 fix flicker css
pick 509b655 no need AppBar
pick 0b852b9 update readme
```

Use your keyboard to change the word pick to s for the commits you want to combine. The result will look like this:

```bash
pick a00a16b add page download-osmosis-notes # add mterial-ui
s 6379f63 update ui
s 181fbf3 update ui
s b3ab886 fix flicker css
pick 509b655 no need AppBar
pick 0b852b9 update readme
```

After editing, press ESC and type:

```bash
:x
```

press enter.

Finally, enter the last command and you are good:

```bash
git push --force
```
