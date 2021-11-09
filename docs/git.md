# GIT

## 撤销代码
### git reset 
撤销未push的代码，在提交层面将一个分支的末端指向另一个指向，用来移除当前分支的一些提交

  ```js
  // 让当前分支后退2个提交
  git reset HEAD~2
  ```

用来修改缓存区或工作目录的标记：
- `--soft` 缓存区和工作区目录不会被改变
- `--hard` 缓存区和工作区目录都会同步到指定的提交
- `--mixed` 默认，缓存区会同步到指定提交，但工作目录不受影响

  ```js
  // 将当前的改动从缓存区中移除，但工作目录中还暴露
  git reset --mixed HEAD

  // 完全舍弃未提交的改动
  git reset --hard HEAD

  // 回到某个commit，同时修改本地工作目录
  git reset [commit id] --hard
  ```

reset执行后，需要重新commit、push 才能覆盖远程，但是push时会提示当期版本低于远程（别git pull啊），可以加上--force强推。

### git revert 
撤销已经push的代码，撤销同时创建新的提交，会保留之前已经提交的代码记录

```js
// revert后跟的是具体那个已经合并的分支名，所以commit id号对应的是分支
git revert [commit id]
```

### git rebase 
合并多个commit

## push了但是