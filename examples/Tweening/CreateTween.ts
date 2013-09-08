/// <reference path="../../src/Kiwi.ts" />

/**
* This script is a demonstration of creating a tween.  
*
* Note: A tween is the transition of values between A - B, and thus in Kiwi the tweem manager handles the transition of those values.
* As such you a tween can be added to property/method as long as the value can be changed constantly.
* So think big with tweening as lots of stuff can be tweened.
*
**/

class CreateTween extends Kiwi.State {

    constructor() {
        super('CreatingATween');
    }

    preload() {
        this.addImage('bullet', 'assets/static/bullet-normal.png');
    }

    bullet: Kiwi.GameObjects.Sprite;
    tween: Kiwi.Animation.Tween; 

    create() {

        //create our cat
        this.bullet = new Kiwi.GameObjects.Sprite(this, this.textures.bullet, 100, 200);
        this.addChild(this.bullet); 
        
        /**
        * To create a tween you need to create the tween via the manager.
        * When you create the tween you pass in the object that the tween is taking affect on.
        **/
        this.tween = this.game.tweens.create(this.bullet);

        /**
        * Using the method 'to' you tell the tween where you want the object to go 'to'
        * Parameter One - Object with the finished values. Can contain more than one value
        * Parameter Two - Duration in milliseconds.
        * Parameter Three - OPTIONAL - Easing method to use. - Default is linear none 
        **/
        this.tween.to({ x: 800 }, 1000, Kiwi.Animation.Tweens.Easing.Linear.None); 
        this.tween.delay(2000); //delays the tween after starting. In milliseconds.
        this.tween.start();     //start the tween
    }
      


}