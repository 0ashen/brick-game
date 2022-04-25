export function depricateScrollOnPressArrow() {
  var keys = {};
  window.addEventListener(
    'keydown',
    function (e) {
      // @ts-ignore
      keys[e.code] = true;
      switch (e.code) {
        case 'ArrowUp':
        case 'ArrowDown':
        case 'ArrowLeft':
        case 'ArrowRight':
        case 'Space':
          e.preventDefault();
          break;
        default:
          break; // do not block other keys
      }
    },
    false
  );
  window.addEventListener(
    'keyup',
    function (e) {
      // @ts-ignore
      keys[e.code] = false;
    },
    false
  );
}
