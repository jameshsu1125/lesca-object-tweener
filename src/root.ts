import Tweener from '.';

const createApp = () => {
  return new Promise<HTMLElement>((resolve) => {
    const app = document.createElement('div');
    app.classList.add('w-10', 'h-10', 'bg-blue-500');
    console.log(Tweener);
    const a = new Tweener({
      from: { x: 0, y: 0 },
      to: { x: 300, y: 300, t: 10 },
      duration: 2000,
      onUpdate: (data: any) => {
        app.style.transform = `translate(${data.x}px, ${data.y}px)`;
      },
    });
    a.play();
    resolve(app);
  });
};

export default createApp;

const appElement = document.getElementById('app');
if (appElement && appElement.children.length === 0) {
  createApp().then((app) => {
    appElement.appendChild(app);
  });
}
