## Create a tag (annotated)

`git tag -a v0.2 -m "Release v0.2"`

Note that simple `git push` does not push a tag to remote, must do something like:

`git push origin <tag>`

## List tags

`git tag -l`

## Show specific tag details

`git show v0.2`
