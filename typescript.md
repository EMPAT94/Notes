# Typescript

> JavaScript with types

## 2023-01-27

- [Official Site](https://www.typescriptlang.org/)

- [Handbook](https://www.typescriptlang.org/docs/handbook/intro.html)

## Notes

- Default target is ES3, pretty old. Use `--target es2015` for browsers, and `--target esnext` for servers.

- Good to have `noImplicitAny` and `strictNullChecks` on.

- Always prefer using `interface` over `type` unless explicitly needed.
  - The former is extendable and mergable
  - It shows up by name in error messages.
  - `type` can alias existing types (or interfaces): `type Username = string | IUsername`.
  - `type ColorAndCircle = Color & Circle` is an intersection of two interfaces.
