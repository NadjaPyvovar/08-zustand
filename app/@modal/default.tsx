export default function Default() {
  return null;
}

// note: since @modal is a parallel route, Next.js needs smth to render in that slot when there is not active interception (i,.e. on every page that is not showing a note preview); returning null leads to rendering nothing by default
