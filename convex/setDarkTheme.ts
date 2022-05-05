import { mutation } from "convex-dev/server";

export default mutation(async ({ db }, toggle: boolean) => {
    
    let themeDoc = await db.table("theme_table").first();    
    if (themeDoc === null) {
        themeDoc = {
            darkMode: toggle,
        };
        db.insert("theme_table", themeDoc);
    } else {
        themeDoc.darkMode = toggle;
        db.update(themeDoc._id, themeDoc);
    }
  // Like console.log but relays log messages from the server to client.
  console.log(`Dark Mode is now ${themeDoc.darkMode}`);
});