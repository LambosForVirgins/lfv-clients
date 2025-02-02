import { CouponItem, coupons } from "./src/Coupons";

async function lookupCouponForUrl(url: string): Promise<CouponItem | null> {
  const coupon = coupons.filter((coupon) =>
    new RegExp(coupon.provider.url).test(url)
  )[0];

  return coupon || null;
}

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "lookupCoupon" && request.url) {
    lookupCouponForUrl(request.url).then((coupon) => {
      sendResponse({ coupon });
    });
    // Return true to indicate you’ll send a response asynchronously.
    return true;
  }
});
