Latte
=====

Latte ready to go.

# ChangeLog
- Introduced LatteDocument, who renders the whole document without specifying tags
- Introduced "Main Module" concept, use LatteModule::loadMain
- Main module may declare a "ua-main" attribute in module.json, LatteDocument will automatically add JS initialization of main
- Renamed DataLatteModule to LatteModule
- No need to pre-load modules now. Modules will load automatically by its specification in module.json: module-include

- Removed make folder, instead use xlatte tool.
- Introduced xlatte.json
- Default paths changed, for backwards compatibility change paths in xlatte.json

-elo
