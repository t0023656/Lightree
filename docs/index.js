// description: This example demonstrates how to use a Container to group and manipulate multiple sprites
import {Application, Assets, Container, Graphics, Sprite} from 'pixi.js';

(async () => {
    const app = new Application();
    await app.init({background: '#714560', resizeTo: window});
    document.body.appendChild(app.canvas);
    app.canvas.classList.add('fixed', 'top-0', 'left-0', '-z-10', 'w-full', 'h-full');

    //TODO: 需要重構
    const circleMain = createCircle(100, 0, 50, 0xaaaaaa);
    const circle1 = createCircle(40, 80, 10, 0xaa5050);
    const circle2 = createCircle(200, 0, 10, 0x70aa70);
    const circle3 = createCircle(40, -80, 10, 0x5050aa);
    const circle4 = createCircle(0, 0, 3, 0x333333);

    app.stage.on('resize', () => {
        circleMain.x = app.screen.width / 2;
        circleMain.y = app.screen.height / 2;
        circle1.x = app.screen.width / 2;
        circle1.y = app.screen.height / 2;
        circle2.x = app.screen.width / 2;
        circle2.y = app.screen.height / 2;
        circle3.x = app.screen.width / 2;
        circle3.y = app.screen.height / 2;
        circle4.x = app.screen.width / 2;
        circle4.y = app.screen.height / 2;
    });

    let elapsed = 0;
    app.ticker.add((time) => {
        elapsed += 0.01 * time.deltaTime;
        circleMain.rotation += 0.01 * time.deltaTime; // 每幀旋轉一點點
        circleMain.alpha = 0.6 + Math.sin(elapsed) * 0.4;
        circle1.rotation += 0.01 * time.deltaTime; // 每幀旋轉一點點
        circle2.rotation += 0.01 * time.deltaTime; // 每幀旋轉一點點
        circle3.rotation += 0.01 * time.deltaTime; // 每幀旋轉一點點
        circle4.rotation += 0.02 * time.deltaTime; // 每幀旋轉一點點

        const preCircle4X = circle4.x
        circle4.x = circleMain.x + Math.cos(circleMain.rotation) * 100 + Math.sin(elapsed * 5) * 50;
        if (circle4.x - preCircle4X <= 0) {
            circle4.alpha = 0.5;
        }else{
            circle4.alpha = 1;
        }

        circle4.y = circleMain.y + Math.sin(circleMain.rotation) * 100 + Math.sin(elapsed * 5) * 50;
    });

    function createCircle(x, y, radius, color) {
        const g = new Graphics();
        g.circle(x, y, radius).fill(color);
        app.stage.addChild(g);
        g.x = app.screen.width / 2;
        g.y = app.screen.height / 2;
        return g;
    }
})();

