import React, { useEffect, useRef } from 'react';
const canvasSketch = require('canvas-sketch');
const random = require('canvas-sketch-util/random');

// Vector class to store x and y. These variables are used to store the position of the agent.
class Vector {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
}

// Agent class to store the position, velocity and radius of the agent.
// Agent is the object that will be drawn on the canvas.
class Agent {
    constructor(x, y) {
        this.pos = new Vector(x, y);
        this.vel = new Vector(random.range(-1, 1), random.range(-1, 1));
        this.radius = random.range(4, 12);
    }

// bounce function is used to reverse the direction of the object when it hits the edge of the 2D space.
    bounce(width, height) {
        if (this.pos.x <= 0 || this.pos.x >= width)  this.vel.x *= -1;
        if (this.pos.y <= 0 || this.pos.y >= height) this.vel.y *= -1;
    } 

// This update function is updating the position of an object in a 2D space. The object has a position represented by this.pos, which is an object with x and y properties. It also has a velocity represented by this.vel, which is also an object with x and y properties. The update function is adding the velocity to the position, which is moving the object in the direction of the velocity.
// The velocity is a vector, which means it has a direction and a magnitude. The magnitude is the speed of the object. The direction is the angle of the velocity. The angle is calculated using the Math.atan2 function, which takes the y and x properties of the velocity as arguments. The angle is then multiplied by the speed to get the x and y components of the velocity. 
// The x component is then added to the x position and the y component is added to the y position. 
// In other words, the update function is adding the velocity to the position, which is moving the object in the direction of the velocity.

  
    update() {
        this.pos.x += this.vel.x;
        this.pos.y += this.vel.y;
    }

    // This draw function is used to draw a circle on a canvas. The context parameter is a 2D rendering context obtained from a canvas element.
    // context.save function is used to save the current state of the canvas. 
    // The context.translate function is used to move the origin of the canvas to the position of the agent.
    // begin.path function is used to start a new path.
    // context.restore is used to restore the canvas state to what it was when context.save() was called.

    draw(context) {
        context.save();
        context.translate(this.pos.x, this.pos.y);

        context.lineWidth = 4;

        context.beginPath();
        context.arc(0, 0, this.radius, 0, Math.PI * 2);
        context.fillStyle = "#F17909";
        context.fill();
        context.stroke();

        context.restore();
    }
}

const CanvasSketchComponent = () => {
  const canvasRef = useRef(null);

  
  useEffect(() => {

    const settings = {
      dimensions: [ 1080, 1080 ],
	    animate: true
    };
  
    const sketch = ({ context, width, height }) => {
      const agents = [];
  
      for (let i = 0; i < 40; i++) {
        const x = random.range(0, width);
        const y = random.range(0, height);
  
        agents.push(new Agent(x, y));
      }
  
      return ({ context, width, height }) => {
        context.fillStyle = "#2D647B";
        context.fillRect(0, 0, width, height);
  
        agents.forEach(agent => {
          agent.update();
          agent.draw(context);
          agent.bounce(width, height);
        });
      };
    };
  
    //setTimeout is used to make sure that the canvas is loaded before the sketch is created.
    setTimeout(() => {
      if (canvasRef.current) {
        settings.canvas = canvasRef.current;
        canvasSketch(sketch, settings);
      }
    }, 0);
    
  
  }, []);

  return <canvas className='canvas' ref={canvasRef} />; 

}

export default CanvasSketchComponent;
