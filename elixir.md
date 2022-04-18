# elixir

- [Official Site](https://elixir-lang.org/)

- [Official Learning Resource](https://github.com/dwyl/learn-elixir)

- [Standard Modules](https://hexdocs.pm/elixir/Kernel.html)

- [Elixir School: Online guide/tutorial](https://elixirschool.com/en/why)

- [Blog Series](https://inquisitivedeveloper.com/tag/lwm-elixir/)

- [Exercism Track](https://exercism.org/tracks/elixir)

- [Koans](https://github.com/elixirkoans/elixir-koans)

- [Programming Elixir - Dave Thomas: Book](https://doc.lagout.org/programmation/Functional%20Programming/Programming%20Elixir_%20Functional%2C%20Concurrent%2C%20Pragmatic%2C%20Fun%20%5BThomas%202014-10-19%5D.pdf)

- [Learn you an erlang for greater good: Some concepts apply to elixir](https://learnyousomeerlang.com/content)

- [Reddit Link](https://www.reddit.com/r/elixir/)

## TDD

Using ExUnit: `mix test --stale --max-failures 1 --listen-on-stdin --trace --seed 0`

- --stale executes only tests for source and test files which are changed.
- --max-failures 1 stops execution after first failing test.
- --listen-on-stdin allows you press Enter and have tests re-run.
- --trace prints names of tests instead of dots, so you can see which tests are executed in more descriptive way.
- --seed 0 forces tests to execute in same order they are mentioned in source file, so that you will have predictable consecutive runs of the tests.

### Recommended deps

- :mix_test_watch, Re-run test on file change, use options from above
- :ex_unit_notifier, Send test result notification, Combine with above
