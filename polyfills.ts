// polyfills.ts
import 'fastestsmallesttextencoderdecoder';
import { BackHandler } from 'react-native';

// Fix BackHandler compatibility issue for WalletConnect
// @ts-ignore - We're adding a missing method to BackHandler
if (BackHandler && typeof BackHandler.removeEventListener === 'undefined') {
    // @ts-ignore - We're polyfilling missing methods
    BackHandler.removeEventListener = (eventType: string, handler: () => void) => {
        // @ts-ignore - removeListener might exist in some RN versions
        if (BackHandler.removeListener) {
            // @ts-ignore
            return BackHandler.removeListener(eventType, handler);
        }
        // Fallback - return empty subscription object
        return { remove: () => { } };
    };
}