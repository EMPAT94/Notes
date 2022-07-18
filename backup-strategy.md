# Backup Strategy

> Everything worth backing up follows 3-2-1 strategy : Atleast 3 copies, 2 local and 1 remote

I currently have following storage options:

- Laptop: 1 TB SSD (Local)
- Phone: 128 GB (Local)
- External: 1 TB HDD (Local)

- Mega.nz: 50 GB (Remote)
- Oracle VPS: 50 GB (Remote)
- Nextcloud: 100 GB (Remote)
- Storj: 150 GB (Remote)

- Github: ~ (Remote text-only versioned git backups)

## Strategies:

- Multi-Media (Photos, Videos, Music, Ebooks and other Documents)

  - Laptop <-> Phone (can generate in either) (every week)
  - Nextcloud (auto-sync)
  - External HDD (once a month)

- Notes, (Encrypted) Keys, Text data

  - Laptop (generated)
  - Github (immediate)
  - Phone (every week)
  - Nextcloud (auto-sync)
  - External HDD (once a month)

- Project Repositories

  - Laptop (generated)
  - Github (immediate)
  - External HDD (once a month)

- [Hobby] Deployed Apps (Config and DB)

  - VPS local backups (also generates)
  - Daily automatic encrypted push to Storj
  - Daily automatic pull to Laptop

## Notes:

- I started using Mega in days of yore when they still gave out 50 GB for new users. Most of my data currently lives there although I'm in the process of migrating to Nextcloud.

- I only _very_ recently discovered Storj as AWS alternative. It has a pleasant UI and easy config. I will be using it for all my automatic backups.

- For VPS (generated), I actually store backups elsewhere in a local dir (away from active app data). At any point in time, atleast 7 days' backup exists in any location.

- I use systemd timers (in lieu of cron jobs) for automatic backup scripts. And I have a slack channel that receives only failure notifications.

## Tools:

- [Syncthing]() Laptop <-> Phone
- [Rsync]() Laptop <- VPS
- [Rclone]() VPS -> Storj/Mega
- [Mega.nz App]() for Laptop -> Mega.nz
- [Webdav]() for Laptop -> Nextcloud
- [Git]() for Laptop -> Github
- USB 2.0 for Laptop -> External HDD (Yes, it is scavanged from an old system)
