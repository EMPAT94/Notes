# PETAL Stack

> Phoenix Elixir Tailwind Alpine Liveview

## Setup

1. Install Elixir using package-manager `yay -S elixir`
   a. Check: `elixir -v`
2. Setup hex archive manager `mix local.hex && mix local.rebar`
   a. Check: `mix hex`
3. Install Phoenix `mix archive.install hex phx_new`
4. Create new project `mix phx.new <project_name>`
5. Setup tailwind
6. Setup alpine

## [Elixir](./elixir.md)

## [Tailwind](./tailwindcss.md)

## [Alpine](./alpine.md)

## Phoenix

> Phoenix is a web development framework written in Elixir which implements the server-side Model View Controller (MVC) pattern.

### Links

- [Official Site](https://hexdocs.pm/phoenix/overview.html)

## Notes

Base setup includes:

- Database Mapper (Ecto)
- Telemetry
- Mailer (Swoosh)
- Http/websocket connection server (Cowboy)
- Testing framework (Floki)
- Tasks to generate stuff (like auth, schemas etc) automatically `mix help --search "phx"`

Regarding Ecto:

1. Setup DB - config/config.exs (and other imports if auto-gen) and lib/<project>/repo.ex. An example for "test" sqlite3 setup:

```elixir
# config/config.exs
config :test,
  ecto_repos: [Test.Repo]

config :test, Test.Repo,
  database: Path.expand("../test_dev.db", Path.dirname(__ENV__.file)),
```

```elixir
# test/repo.ex
defmodule Test.Repo do
  use Ecto.Repo,
    otp_app: :test,
    adapter: Ecto.Adapters.SQLite3
end

```

2. Setup Schema and Migrations

Schema is what maps data from db to elixir format, and contain change(set).

Migrations are used to create/alter tables.

Schemas and Migrations are tightly coupled if generated using overarching cli commands, although can be created manually and loosely coupled. No approach better or worse.
