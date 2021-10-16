import { useEffect, useCallback, useRef, useState } from "react";
import type { Dispatch, SetStateAction, MutableRefObject } from "react";

/**
 * React hook to create and manage a Broadcast Channel across multiple browser windows.
 *
 * @param channelName Static name of channel used across the browser windows.
 * @param handleMessage Callback to handle the event generated when `message` is received.
 * @param handleMessageError [optional] Callback to handle the event generated when `error` is received.
 * @returns A function to send/post message on the channel.
 * @example
 * ```tsx
 * import {useBroadcastChannel} from 'react-broadcast-channel';
 *
 * function App () {
 *   const postUserIdMessage = useBroadcastChannel('userId', (e) => alert(e.data));
 *   return (<button onClick={() => postUserIdMessage('ABC123')}>Send UserId</button>);
 * }
 * ```
 * ---
 * Works in browser that support Broadcast Channel API natively. See [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Broadcast_Channel_API#browser_compatibility).
 * To support other browsers, install and use [broadcastchannel-polyfill](https://www.npmjs.com/package/broadcastchannel-polyfill).
 */
export function useBroadcastChannel<T = string>(
  channelName: string,
  handleMessage?: (event: MessageEvent) => void,
  handleMessageError?: (event: MessageEvent) => void
): (data: T) => void {
  const channelRef = useRef(
    typeof window !== "undefined" && "BroadcastChannel" in window
      ? new BroadcastChannel(channelName + "-channel")
      : null
  );

  useChannelEventListener(channelRef, "message", handleMessage);
  useChannelEventListener(channelRef, "messageerror", handleMessageError);

  return useCallback(
    (data: T) => {
      channelRef?.current?.postMessage(data);
    },
    [channelRef]
  );
}

/**
 * React hook to manage state across browser windows. Has the similar signature as `React.useState`.
 *
 * @param channelName Static name of channel used across the browser windows.
 * @param initialState Initial state.
 * @returns Tuple of state and setter for the state.
 * @example
 * ```tsx
 * import {useBroadcastState} from 'react-broadcast-channel';
 *
 * function App () {
 *   const [count, setCount] = useBroadcastState('count', 0);
 *   return (
 *     <div>
 *       <button onClick={() => setCount(prev => prev - 1)}>Decrement</button>
 *       <span>{count}</span>
 *       <button onClick={() => setCount(prev => prev + 1)}>Increment</button>
 *     </div>
 *   );
 * }
 * ```
 * ---
 * Works in browser that support Broadcast Channel API natively. See [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Broadcast_Channel_API#browser_compatibility).
 * To support other browsers, install and use [broadcastchannel-polyfill](https://www.npmjs.com/package/broadcastchannel-polyfill).
 */
export function useBroadcastState<T = string>(
  channelName: string,
  initialState: T
): [T, Dispatch<SetStateAction<T>>] {
  const [state, setState] = useState<T>(initialState);
  const setter = useBroadcastChannel<T>(channelName, (ev) => setState(ev.data));
  useEffect(() => setter(state), [setter, state]);
  return [state, setState];
}

// Helpers

/** Hook to subscribe/unsubscribe from channel events. */
function useChannelEventListener<K extends keyof BroadcastChannelEventMap>(
  channelRef: MutableRefObject<BroadcastChannel | null>,
  event: K,
  handler: (e: BroadcastChannelEventMap[K]) => void = () => {}
) {
  useEffect(() => {
    const channel = channelRef.current;
    if (channel) {
      channel.addEventListener(event, handler);
      return () => channel.removeEventListener(event, handler);
    }
  }, [channelRef, event, handler]);
}
