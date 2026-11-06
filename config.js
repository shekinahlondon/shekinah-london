// Shekinah Nation London — member platform config
window.SNL = {
  SUPABASE_URL: "https://zrsuohmelsekrtbrggvn.supabase.co",
  SUPABASE_KEY: "sb_publishable_AbCB3T_84JFeKvQ6aG4XOg_MXRFnQQT",
  CHURCH: "Shekinah Nation London",
  // Public addresses (members site and admin dashboard live on separate subdomains)
  PUBLIC_URL: "https://members.shekinahnationlondon.com/",
  ADMIN_URL: "https://admin.shekinahnationlondon.com/",
  // Birthdays: day + month (year optional). With no year we store 1904 (a leap year, so 29 Feb works).
  NO_YEAR: 1904,
  MONTHS: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
  dobFields(box, value, yearOptional = true) {
    const [y, m, d] = (value || "").split("-");
    const yr = +y && +y !== this.NO_YEAR ? +y : "";
    const now = new Date().getFullYear();
    box.classList.add("dob");
    box.innerHTML =
      `<select class="dob-d" aria-label="Day"><option value="">Day</option>${Array.from({ length: 31 }, (_, i) => `<option ${+d === i + 1 ? "selected" : ""}>${i + 1}</option>`).join("")}</select>` +
      `<select class="dob-m" aria-label="Month"><option value="">Month</option>${this.MONTHS.map((n, i) => `<option value="${i + 1}" ${+m === i + 1 ? "selected" : ""}>${n}</option>`).join("")}</select>` +
      (yearOptional ? `<select class="dob-y" aria-label="Year (optional)"><option value="">Year</option>${Array.from({ length: 100 }, (_, i) => now - i).map((v) => `<option ${v === yr ? "selected" : ""}>${v}</option>`).join("")}</select>` : "");
  },
  // Returns "YYYY-MM-DD", "" if blank, or null if incomplete/invalid
  dobValue(box) {
    const d = box.querySelector(".dob-d").value, m = box.querySelector(".dob-m").value;
    const yEl = box.querySelector(".dob-y"), y = yEl && yEl.value ? +yEl.value : this.NO_YEAR;
    if (!d && !m && !(yEl && yEl.value)) return "";
    if (!d || !m) return null;
    const dt = new Date(Date.UTC(y, +m - 1, +d));
    if (dt.getUTCMonth() !== +m - 1) return null;
    return `${y}-${String(m).padStart(2, "0")}-${String(d).padStart(2, "0")}`;
  },
  dobText(iso) {
    if (!iso) return "";
    const [y, m, d] = iso.split("-");
    return `${+d} ${this.MONTHS[+m - 1]}${+y !== this.NO_YEAR ? " " + y : ""}`;
  },
  // Base URL of this site (works on any host / subfolder)
  base() {
    const p = location.pathname;
    return location.origin + p.slice(0, p.lastIndexOf("/") + 1);
  },
};
