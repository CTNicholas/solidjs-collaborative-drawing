import { Room, Storage } from "~/liveblocks.config";
import { createSignal, For, onCleanup, onMount } from "solid-js";
import styles from "./Canvas.module.css";
import { randomId } from "~/components/utils/randomId";
import { LiveList, LiveObject } from "@liveblocks/client";
import StrokePath from "~/components/StrokePath";
import DeleteButton from "~/components/DeleteButton";

type Props = {
  room: Room;
  strokes: Storage["strokes"];
};

export default function Canvas(props: Props) {
  const [currentStroke, setCurrentStroke] = createSignal("");
  const [strokeIds, setStrokeIds] = createSignal<string[]>([
    ...props.strokes.keys(),
  ]);

  function handlePointerDown(e: PointerEvent) {
    (e.target as SVGElement).setPointerCapture(e.pointerId);
    const id = randomId();
    props.strokes.set(
      id,
      new LiveObject({
        gradient: 3,
        points: new LiveList([[e.pageX, e.pageY, e.pressure]]),
      })
    );
    setCurrentStroke(id);
  }

  function handlePointerMove(e: PointerEvent) {
    if (e.buttons !== 1) {
      return;
    }

    (e.target as SVGElement).setPointerCapture(e.pointerId);
    props.strokes
      ?.get(currentStroke())
      ?.get("points")
      .push([e.pageX, e.pageY, e.pressure]);
  }

  onMount(() => {
    const unsubscribe = props.room.subscribe(
      props.strokes,
      (newStrokes: Storage["strokes"]) => {
        setStrokeIds([...newStrokes.keys()]);
      }
    );

    onCleanup(unsubscribe);
  });

  function handleReset() {
    props.room.batch(() => {
      const keys = props.strokes.keys();
      for (const key of keys) {
        props.strokes.delete(key);
      }
    });
  }

  return (
    <>
      <svg
        class={styles.svg}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
      >
        <defs>
          <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stop-color="#A774FF" />
            <stop offset="100%" stop-color="#E28295" />
          </linearGradient>
        </defs>
        <For each={[...strokeIds()]}>
          {(id) => {
            const stroke = props.strokes.get(id);
            return stroke ? (
              <StrokePath room={props.room} stroke={stroke} />
            ) : null;
          }}
        </For>
      </svg>
      <DeleteButton onClick={handleReset} />
    </>
  );
}
