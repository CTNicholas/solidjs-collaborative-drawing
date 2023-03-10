import { createSignal, onCleanup, onMount, Show } from "solid-js";
import { enterRoom, leaveRoom, Room, Storage } from "~/liveblocks.config";
import { LiveMap } from "@liveblocks/client";
import Canvas from "~/components/Canvas";
import Template from "~/components/Template";

const roomId = "my-solid";

export default function Home() {
  const [room] = createSignal<Room>(
    enterRoom(roomId, {
      initialPresence: {},
      initialStorage: { strokes: new LiveMap() },
    })
  );

  const [strokes, setStrokes] = createSignal<Storage["strokes"] | null>(null);

  onMount(() => {
    async function run() {
      const storage = await room().getStorage();
      setStrokes(storage.root.get("strokes"));
    }

    run();
  });

  onCleanup(() => {
    leaveRoom(roomId);
  });

  return (
    <Template>
      <Show
        keyed={false}
        when={room() && strokes()}
        fallback={<div>loading...</div>}
      >
        <Canvas room={room()} strokes={strokes() as Storage["strokes"]} />
      </Show>
    </Template>
  );
}
