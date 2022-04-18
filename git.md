# Git

## Tags

- Tags: Mark a point in commit history (useful for releases and such)

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

- Submodules: Make a repository a subdirectory of another repository

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

- [Docs](https://git-scm.com/docs/git-worktree)

- Worktrees: Make a directory for each working branch

- Useful when working on multiple branches, to avoid stash/pop unmerged paths confusion and work without disturbing other branches. Parallel branches ftw!

- Having multiple folders for each branch makes things easy for IDEs, compared to restructuring same folder multiple times

- <span style="color:orange">IMPORTANT!</span> Do not use with submodules

- Not essential but a better workflow is to start off with a bare repository and have one folder each for each branch:

  - Clone bare repo

  ```sh
  git clone --bare <remote> .bare
  ```

  - git command needs a .git to work with

  ```sh
  echo "gitdir: ./.bare > .git"
  ```

  - Set remote brances up so git fetch and etc start working

  ```sh
  git config remote.origin.fetch "+refs/heads/*:refs/remotes/origin/*"
  ```

  - Fetch remote branches

  ```sh
  git fetch origin
  ```

- It is possible to set this up in a single shell command and bind an alias in .gitconfig

- Worktree commands help: `git worktree help`
