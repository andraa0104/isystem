import { useSyncExternalStore } from 'react';
const MOBILE_BREAKPOINT = 768;
const mql = typeof window === 'undefined'
    ? undefined
    : window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`);
function mediaQueryListener(callback) {
    if (!mql) {
        return () => { };
    }
    mql.addEventListener('change', callback);
    return () => {
        mql.removeEventListener('change', callback);
    };
}
function isSmallerThanBreakpoint() {
    var _a;
    return (_a = mql === null || mql === void 0 ? void 0 : mql.matches) !== null && _a !== void 0 ? _a : false;
}
function getServerSnapshot() {
    return false;
}
export function useIsMobile() {
    return useSyncExternalStore(mediaQueryListener, isSmallerThanBreakpoint, getServerSnapshot);
}
