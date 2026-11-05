// Shekinah Nation London — member platform config
window.SNL = {
  SUPABASE_URL: "https://zrsuohmelsekrtbrggvn.supabase.co",
  SUPABASE_KEY: "sb_publishable_AbCB3T_84JFeKvQ6aG4XOg_MXRFnQQT",
  CHURCH: "Shekinah Nation London",
  // Base URL of this site (works on any host / subfolder)
  base() {
    const p = location.pathname;
    return location.origin + p.slice(0, p.lastIndexOf("/") + 1);
  },
};
