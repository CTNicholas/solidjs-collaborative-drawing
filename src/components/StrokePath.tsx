import { Point, Room, Stroke } from "~/liveblocks.config";
import { createSignal, onCleanup, onMount, Show } from "solid-js";
import styles from "~/components/Canvas.module.css";
import { getSvgPathFromStroke } from "~/components/utils/getSvgPathFromStroke";
import getStroke from "perfect-freehand";

export default function StrokePath(props: { stroke: Stroke; room: Room }) {
  const [pathData, setPathData] = createSignal<string>(
    createPathData([...props.stroke.get("points").toImmutable()])
  );

  onMount(() => {
    const unsubscribe = props.room.subscribe(
      props.stroke.get("points"),
      (newPoints) => {
        setPathData(createPathData([...newPoints.toImmutable()]));
      }
    );

    onCleanup(unsubscribe);
  });

  return (
    <Show keyed={false} when={pathData()}>
      <path class={styles.path} d={pathData()} fill="white" />
    </Show>
  );
}

function createPathData(points: Point[]) {
  const strokeFromPoints = getStroke(points, {
    size: 18,
    thinning: 0.5,
    smoothing: 0.5,
    streamline: 0.5,
  });
  return getSvgPathFromStroke(strokeFromPoints);
}
