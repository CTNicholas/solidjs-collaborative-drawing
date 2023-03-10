import {
  createClient,
  type LiveList,
  LiveMap,
  LiveObject,
} from "@liveblocks/client";

const client = createClient({
  publicApiKey: import.meta.env.VITE_LIVEBLOCKS_PUBLIC_KEY,
  throttle: 16,
});

export type Point =
  | [x: number, y: number, pressure: number]
  | [x: number, y: number];

export type Stroke = LiveObject<{
  gradient: number;
  points: LiveList<Point>;
}>;

export type Storage = {
  strokes: LiveMap<string, Stroke>;
};

type Presence = {};
type UserMeta = {};
type RoomEvent = {};

const enterRoomWithContext = client.enter<
  Presence,
  Storage,
  UserMeta,
  RoomEvent
>;

export const enterRoom = (...args: Parameters<typeof enterRoomWithContext>) => {
  return enterRoomWithContext(...args);
};

export const leaveRoom = (...args: Parameters<typeof client.leave>) =>
  client.leave(...args);

export type Room = ReturnType<typeof enterRoom>;
