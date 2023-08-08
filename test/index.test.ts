/** @jest-environment jsdom */

import { renderHook, act } from "@testing-library/react";
import { useBroadcastChannel, useBroadcastState } from "../src/index";

const CHANNEL_NAME = "test";

test("should useBroadcastChannel return a Post function", () => {
  const { result } = renderHook(() => useBroadcastChannel(CHANNEL_NAME));
  expect(typeof result.current).toBe("function");
});

test("should useBroadcastState", () => {
  const INIT_STATE = 0;
  const { result } = renderHook(() =>
    useBroadcastState(CHANNEL_NAME, INIT_STATE)
  );

  expect(result.current[0]).toBe(INIT_STATE);

  act(() => result.current[1](1));

  expect(result.current[0]).toBe(1);
});
