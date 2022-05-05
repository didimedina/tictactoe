import { query } from "convex-dev/server";

export default query(async ({ db }): Promise<boolean> => {
  const themeDoc = await db.table("theme_table").first();
  console.log(themeDoc);
  if (themeDoc === null) {
    return false;
  }

  return themeDoc.darkMode;
});