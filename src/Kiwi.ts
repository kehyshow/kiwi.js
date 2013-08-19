///<reference path="renderers/WebGL.d.ts"/>

/// <reference path="core/Cache.ts" />
/// <reference path="core/Camera.ts" />
/// <reference path="core/CameraManager.ts" />
/// <reference path="core/Component.ts" />
/// <reference path="core/ComponentManager.ts" />
/// <reference path="core/Device.ts" />
/// <reference path="core/Entity.ts" />
/// <reference path="core/File.ts" />
/// <reference path="core/FileCache.ts" />
/// <reference path="core/Game.ts" />
/// <reference path="core/State.ts" /> //must be initialised before group - typescript issue #599
/// <reference path="core/Group.ts" />
/// <reference path="core/IChild.ts" />
/// <reference path="core/Layer.ts" />
/// <reference path="core/LayerManager.ts" />
/// <reference path="core/Loader.ts" />
/// <reference path="core/Signal.ts" />
/// <reference path="core/SignalBinding.ts" />
/// <reference path="core/Stage.ts" />

/// <reference path="components/Bounds.ts" />
/// <reference path="components/Input.ts" />
/// <reference path="components/Sound.ts" />
/// <reference path="components/ArcadePhysics.ts" />

/// <reference path="animation/Animation.ts" />
/// <reference path="animation/Sequence.ts" />

/// <reference path="core/StateConfig.ts" />
/// <reference path="core/StateManager.ts" />

/// <reference path="dom/Bootstrap.ts" />
/// <reference path="dom/Browser.ts" />
/// <reference path="dom/Cache.ts" />
/// <reference path="dom/Element.ts" />

/// <reference path="gameobjects/Sprite.ts" />
/// <reference path="gameobjects/StaticImage.ts" />

/// <reference path="gameobjects/Textfield.ts" />
/// <reference path="gameobjects/tilemap/Tile.ts" />
/// <reference path="gameobjects/tilemap/TileType.ts" />
/// <reference path="gameobjects/tilemap/TileMap.ts" />
/// <reference path="gameobjects/tilemap/TileMapLayer.ts" />

/// <reference path="geom/AABB.ts" />
/// <reference path="geom/Circle.ts" />
/// <reference path="geom/Ray.ts" />
/// <reference path="geom/Intersect.ts" />
/// <reference path="geom/IntersectResult.ts" />
/// <reference path="geom/Line.ts" />
/// <reference path="geom/Matrix.ts" />
/// <reference path="geom/Point.ts" />
/// <reference path="geom/Rectangle.ts" />
/// <reference path="geom/Transform.ts" />
/// <reference path="geom/Vector2.ts" />

/// <reference path="hud/HUDDisplay.ts" />
/// <reference path="hud/HUDManager.ts" />
/// <reference path="hud/HUDWidget.ts" />
/// <reference path="hud/widgets/TextField.ts" />
/// <reference path="hud/widgets/Bar.ts" />
/// <reference path="hud/widgets/Icon.ts" />
/// <reference path="hud/widgets/IconCounter.ts" />
/// <reference path="hud/widgets/BasicScore.ts" />
/// <reference path="hud/widgets/Button.ts" />
/// <reference path="hud/widgets/Time.ts" />
/// <reference path="hud/widgets/Menu.ts" />
/// <reference path="hud/widgets/MenuItem.ts" />
/// <reference path="hud/components/Counter.ts" />
/// <reference path="hud/components/WidgetInput.ts" />
/// <reference path="hud/components/Range.ts" />
/// <reference path="hud/components/Time.ts" />

/// <reference path="sound/AudioManager.ts" />
/// <reference path="sound/Audio.ts" />

/// <reference path="input/Finger.ts" />
/// <reference path="input/Key.ts" />
/// <reference path="input/Keyboard.ts" />
/// <reference path="input/Keycodes.ts" />
/// <reference path="input/Manager.ts" />
/// <reference path="input/Mouse.ts" />
/// <reference path="input/Touch.ts" />



/// <reference path="plugins/gamefroot/TileMapConverter.ts" />

/// <reference path="renderers/CanvasRenderer.ts" />
/// <reference path="renderers/GLRenderer.ts" />
/// <reference path="renderers/GLShaders.ts" />
/// <reference path="renderers/GLTexture.ts" />
/// <reference path="renderers/GLArrayBuffer.ts" />
/// <reference path="renderers/GLElementArrayBuffer.ts" />

/// <reference path="structs/Dictionary.ts" />
/// <reference path="structs/LinkedList.ts" />

/// <reference path="textures/TextureAtlas.ts" />
/// <reference path="textures/TextureCache.ts" />
/// <reference path="textures/SpriteSheet.ts" />
/// <reference path="textures/SingleImage.ts" />


/// <reference path="time/Clock.ts" />
/// <reference path="time/Manager.ts" />
/// <reference path="time/MasterClock.ts" />
/// <reference path="time/Timer.ts" />
/// <reference path="time/TimerEvent.ts" />

/// <reference path="tweens/easing/Back.ts" />
/// <reference path="tweens/easing/Bounce.ts" />
/// <reference path="tweens/easing/Circular.ts" />
/// <reference path="tweens/easing/Cubic.ts" />
/// <reference path="tweens/easing/Elastic.ts" />
/// <reference path="tweens/easing/Exponential.ts" />
/// <reference path="tweens/easing/Linear.ts" />
/// <reference path="tweens/easing/Quadratic.ts" />
/// <reference path="tweens/easing/Quartic.ts" />
/// <reference path="tweens/easing/Quintic.ts" />
/// <reference path="tweens/easing/Sinusoidal.ts" />
/// <reference path="tweens/Manager.ts" />
/// <reference path="tweens/Tween.ts" />

/// <reference path="utils/Canvas.ts" />
/// <reference path="utils/Common.ts" />
/// <reference path="utils/GameMath.ts" />
/// <reference path="utils/RandomDataGenerator.ts" />
/// <reference path="utils/RequestAnimationFrame.ts" />

module Kiwi {

    export var VERSION: string = "1.0";
    
    export var RENDERER_CANVAS: number = 0;
    export var RENDERER_WEBGL: number = 1;
    

    export var TARGET_BROWSER: number = 0;
    export var TARGET_COCOON: number = 1;
    export var TARGET: number = 0;

    export var DEVICE: Kiwi.Device = null;

    export var ADDED_TO_STATE:number = 0;
    export var ADDED_TO_LAYER:number = 1;
    export var ADDED_TO_GROUP:number = 2;
    export var ADDED_TO_ENTITY:number = 3;
    export var REMOVED_FROM_STATE:number = 4;
    export var REMOVED_FROM_LAYER:number = 5;
    export var REMOVED_FROM_GROUP:number = 6;
    export var REMOVED_FROM_ENTITY:number = 7;

    export var STATE:number = 0;
    export var LAYER:number = 1;
    export var GROUP:number = 2;
    export var ENTITY: number = 3;
    export var CAMERA: number = 4;
    export var HUD_WIDGET: number = 5;
    export var TILE_LAYER: number = 6;

    
    export class GameManager {

        public objType() {
            return "GameManager";
        }

        private static _games: Kiwi.Game[] = [];

        public static register(game: Kiwi.Game): number {

            klog.info('Registering game with Kiwi.GameManager v' + Kiwi.VERSION);

            return Kiwi.GameManager._games.push(game);

        }

        public static total(): number {
            return Kiwi.GameManager._games.length;
        }

    }
    
}

var klog;
