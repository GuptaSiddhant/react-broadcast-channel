# use-broadcast-channel (React-hooks)

> The **Broadcast Channel API** allows basic communication between browsing contexts (that is, windows, tabs, frames, or iframes) and workers on the same origin. _-[MDN](https://developer.mozilla.org/en-US/docs/Web/API/Broadcast_Channel_API)_

This package provides a thin wrapper around the browser's native Broadcast Channel API in the form of a React hook function. The hook(s) can be used in any React component or custom hook to harness the functionality of Broadcast Channel API.

_To use the hooks in browsers that do not support Broadcast Channel API, install and import [broadcastchannel-polyfill](https://www.npmjs.com/package/broadcastchannel-polyfill)._

> For typescript users: The default data-type for all messages are set to `string` but can be easily overridden by explicitly passing type parameter to the hook(s). Example for numeric data: `useBroadcastChannel<number>("count", (e) => console.log(e.data));`

## Setup

Package available at [NPM](https://www.npmjs.com/package/use-broadcast-channel).

- NPM

  ```shell
  npm install use-broadcast-channel
  ```

- Yarn

  ```shell
  yarn add use-broadcast-channel
  ```

## API

The package exports multiple hooks for different use-cases.

### `useBroadcastChannel` hook

React hook to create and manage a Broadcast Channel across multiple browser windows/tabs/frames.
This is base hook exported by the package as all other exported hooks depends on it.

#### - Read-only

Only subscribe for events broadcasted on a particular channel.

```tsx
import { useBroadcastChannel } from "use-broadcast-channel";

function App() {
  useBroadcastChannel("userId", (e) => alert(e.data));
  return null;
}
```

#### - Write-only

Only broadcast (post) event on a particular channel.

```tsx
import { useBroadcastChannel } from "use-broadcast-channel";

function App() {
  const postUserId = useBroadcastChannel("userId");
  return <button onClick={() => postUserId("ABC123")}>Post UserId</button>;
}
```

#### - Read and Write

Both broadcast (post) event and subscribe for events broadcasted on a particular channel.

```tsx
import { useBroadcastChannel } from "use-broadcast-channel";

function App() {
  const postUserId = useBroadcastChannel("userId", (e) => alert(e.data));
  return <button onClick={() => postUserId("ABC123")}>Send UserId</button>;
}
```

### `useBroadcastState` hook

React hook to manage state across browser windows/tabs/frames. It has a similar signature as `React.useState`. It used `useBroadcastChannel` under the hood.

```tsx
import { useBroadcastState } from "use-broadcast-channel";

function App() {
  const [count, setCount] = useBroadcastState("count", 0);
  return (
    <div>
      <button onClick={() => setCount((prev) => prev - 1)}>Decrement</button>
      <span>{count}</span>
      <button onClick={() => setCount((prev) => prev + 1)}>Increment</button>
    </div>
  );
}
```
