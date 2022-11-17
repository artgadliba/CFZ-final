import useEventListener from 'hooks/useEventListener';

function useOnClickOutside(
  ref,
  handler,
  mouseEvent,
) {
  useEventListener(mouseEvent, event => {
    const el = ref?.current
    if (!el || el.contains(event.target)) {
      return;
    }
    handler(event)
  })
}

export default useOnClickOutside
