import { CouponItem } from "./src/Coupons";

function applyCoupon(coupon: CouponItem) {
  console.log("Apply coupon", coupon);
  if (!coupon.selector) return;
  // This function is meant to be run in the context of the checkout page.
  const couponField = document.querySelector(
    coupon.selector
  ) as HTMLInputElement | null;
  if (couponField) {
    couponField.value = coupon.code;
    // Dispatch an input event if needed so that any listeners on the page notice the change.
    couponField.dispatchEvent(new Event("input", { bubbles: true }));
    console.log("Applied coupon:", coupon.code);
  } else {
    console.warn("Coupon field not found using selector:", coupon.selector);
    // In case of dynamically loaded content, consider using a MutationObserver
    // or a retry mechanism to wait for the element to appear.
  }
}

chrome.runtime.sendMessage(
  { action: "lookupCoupon", url: window.location.href },
  (response) => {
    if (response && response.coupon) {
      // Optionally, wait until the page has rendered the coupon field.
      applyCoupon(response.coupon);
    }
  }
);
