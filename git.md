---
modified: "Fri Apr 17 14:48:08 EDT 2026"
---

# Git

## Stash

> Stash the changes in a dirty working directory away

- Show all saved points: `git stash list`

- Quickly stash current changes: `git stash [push]`

- Quickly unstash latest save: `git stash pop`

- Clear all saved stashes: `git stash clear`

- Save with a specific name: `git stash save <name>`

- Apply a specific stash: `git stash apply <n>`
  - where "n" is the stash@{n} you see after listing all stashes

## Rebase

> Make it look like your commit(s) were made on top of the latest head

- In the branch to be rebased: `git rebase <rebase-on>`

- Example, to rebase a featurex branch on main: `git checkout featurex; git rebase main; git push -f origin featurex`

- <span style="color: red">IMPORTANT!</span> Do not rebase on shared public branches!

### Manual Rebase

- If changed committed in latest commit: `git reset --soft HEAD~1`

- Stash working state: `git stash`

- Pull latest from upstream: `git pull origin ...`

- Pop working state: `git stash pop`

- Create a commit: `git commit`

- Force push: `git push -f origin ...`

## Tags

> Mark a point in commit history (useful for releases and such)

- [Docs](https://git-scm.com/book/en/v2/Git-Basics-Tagging)

- Create a tag (annotated)

  `git tag -a v0.2 -m "Release v0.2"`

  Note that simple `git push` does not push a tag to remote, must do something like:

  `git push origin <tag>`

- List tags

  `git tag -l`

- Show specific tag details

  `git show v0.2`

- Delete all branches except main and featurex

  ```sh
  git branch | awk '!/main|featurex/ { print $1 }' | xargs git branch -D
  ```

## Submodules

> Make a repository a subdirectory of another repository

- [Docs](https://git-scm.com/book/en/v2/Git-Tools-Submodules)

- Add a submodule

  ```sh
  git submodule add <sub-repo-link>
  ```

  Creates a .gitmodules file with path and url of submodules and adds a submodule in detached HEAD state

- Clone with submodules

  ```sh
  git clone --recurse-submodules <main-repo-link>
  ```

- If already clone but no submodules, do

  ```sh
  git submodule update --init --recursive
  ```

- Update submodules from remote

  ```sh
  git submodule update --remote [name]
  ```

- The 'foreach' command

  ```sh
  git submodule foreach 'git pull'
  ```

## Worktrees

> Make a directory for each working branch

- Useful when working on multiple branches, to avoid stash/pop unmerged paths confusion and work without disturbing other branches. Parallel branches ftw!

- Having multiple folders for each branch makes things easy for IDEs, compared to restructuring same folder multiple times

- <span style="color:orange">IMPORTANT!</span> Do not use with submodules

- Not essential but a better workflow is to start off with a bare repository and have one folder each for each branch:

  ```sh
  mkdir <repo>; cd <repo>
  git clone --bare <remote>
  mv <repo>.git .git
  git config remote.origin.fetch "+refs/heads/*:refs/remotes/origin/*"
  git fetch origin
  git worktree add <branch>
  ```

- Worktree commands help: `git worktree help`

## Log

Git log can be used in conjunction with `touch` command to reset file timestamps to match their last motified times:

```bash
touch -d $(git log -1 --pretty="format:%ad" --date=format:'%Y-%m-%d%H:%M:%S' $file) $file
```

## Maintenance

> Run tasks to optimize Git repository data, speeding up other Git commands and reducing storage requirements for the repository.
>
> ~ [git-scm.com/docs/git-maintenance](https://git-scm.com/docs/git-maintenance)

```bash
cd my-repository
git maintenance run
```

## Multi-account setup

> [docs.github.com](https://docs.github.com/en/account-and-profile/how-tos/account-management/managing-multiple-accounts)

```bash
# Generate ssh key for <other> account
ssh-keygen -t ed25519  -f ~/.ssh/other-account -C "Key for other-account"

# Copy the publick key
cat ~/.ssh/other-account.pub

# Add it to your Github <other> account as Authentication Key on
# https://github.com/settings/ssh/new

# Update your ssh_config as follows:
cat <<EOF >> ~/.ssh/config

Host github-other.com
  IdentityFile ~/.ssh/other-account
  Hostname github.com
  User git
  IdentitiesOnly yes
EOF

# Test if it works
ssh -T git@github-other.com

# Ensure your other-account repos are configured by the other-account email
git config user.email "other@account.com"
```

## How to reduce large .git folders?

If `git maintenance run` and `git repack -a -d -f --depth=250 --window=250` [source](https://gcc.gnu.org/legacy-ml/gcc/2007-12/msg00165.html) don't already do it, manually prune it.

> This could happen if large binaries were commit at some point

To see the biggest files:

```bash
#!/usr/bin/env bash

# Source: http://stevelorek.com/how-to-shrink-a-git-repository.html

# To pull in all branchs
# for branch in `git branch -a | grep remotes | grep -v HEAD | grep -v master`; do
#     git branch --track ${branch##*/} $branch
# done

# Shows you the largest objects in your repo's pack file.
# Written for osx.
#
# @see http://stubbisms.wordpress.com/2009/07/10/git-script-to-show-largest-pack-objects-and-trim-your-waist-line/
# @author Antony Stubbs

# set the internal field spereator to line break, so that we can iterate easily over the verify-pack output
IFS=$'\n';

# list all objects including their size, sort by size, take top 10
objects=`git verify-pack -v .git/objects/pack/pack-*.idx | grep -v chain | sort -k3nr | head`

echo "All sizes are in kB. The pack column is the size of the object, compressed, inside the pack file."

output="size,pack,SHA,location"
for y in $objects
do
	# extract the size in bytes
	size=$((`echo $y | cut -f 5 -d ' '`/1024))
	# extract the compressed size in bytes
	compressedSize=$((`echo $y | cut -f 6 -d ' '`/1024))
	# extract the SHA
	sha=`echo $y | cut -f 1 -d ' '`
	# find the objects location in the repository tree
	other=`git rev-list --all --objects | grep $sha`
	output="${output}\n${size},${compressedSize},${other}"
done

echo -e $output | column -t -s ', '
```

THen use [git-filter-repo](https://github.com/newren/git-filter-repo/) to [purge a large list of files](https://github.com/newren/git-filter-repo/blob/main/Documentation/examples-from-user-filed-issues.md#purge-a-large-list-of-files) or [remove the whole directory](https://github.com/newren/git-filter-repo/blob/main/Documentation/examples-from-user-filed-issues.md#removing-a-directory) or any other way that suits your needs.

> This may remove your oirgin, just re-add your repo url and force push
