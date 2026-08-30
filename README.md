## companion-module-h2r-layouts

See HELP.md and LICENSE

# Module Development

## Pushing changes for inclusion in the beta

1. Push all changes to the repo
2. Use `npm version major|minor|patch` to bump the version number
3. Use `git push --follow-tags` to push the new version number.
4. Reach out on the `#module-development` channel in Slack to get the new changes included in the next beta.

## Changelog

**v1.2.0**

- New: `vMix connection: Send layouts to input` action — sets which vMix input (MultiView / VirtualSet) layouts are recalled to.
- New: `vMix connection: Block changes while on air` action — enable/disable the guard that refuses to change a vMix input while it is on program output.
- New: `vmix_input` and `vmix_protect_on_air` variables.
- Fix: A malformed `connections_updated` broadcast no longer throws when the ATEM connection is missing.

Requires H2R Layouts 1.7.0 or newer for the vMix actions.

**v1.1.0**

- New: Add `last_recalled` and `last_recalled_by_name` variables keeping track of the most recent layout recalled.
- New: Feedback added to update the button backgrounds based on the latest recalled layout.

**v1.0.0**

Initial release 🙌
