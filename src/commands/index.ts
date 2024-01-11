import * as ping from "./ping";

import * as addbannedword from "./moderation/addbannedword";
import * as removebannedword from "./moderation/removebannedword";
import * as bannedwords from "./moderation/bannedwords";

import * as color from "./fun/color";
import * as flip from "./fun/flip";
import * as urban from "./fun/urban";

import * as afkset from "./afk/afkset";

export const commands = {
  ping,
  color,
  flip,
  urban,

  afkset,

  bannedwords,
  addbannedword,
  removebannedword
}
