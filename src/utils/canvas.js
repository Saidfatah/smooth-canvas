import { v4 } from "uuid";
// line here
/**
 * draws a rectangle
 * @param {object} ctx the targeted canva's context.
 * @param {number} x the x position for the rect.
 * @param {number} y the y position for the rect.
 * @param {number} w the width of the rect.
 * @param {number} h the height of the rect.
 */
export const rect = (ctx, x, y, w, h) => {
  if (ctx.beginPath && ctx.rect && ctx.closePath && ctx.fill) {
    ctx.beginPath();
    ctx.rect(x, y, w, h);
    ctx.closePath();
    ctx.fill();
  }
};

/**
 * clears the canvas
 * @param {object} ctx the targeted canva's context.
 * @param {number} width the targeted canva's width.
 * @param {number} height the targeted canva's height.
 */
export const clear = (ctx, width, height) => {
  if (ctx.clearRect) ctx.clearRect(0, 0, width, height);
};

/**
 * just acts as a Schema for creating Shapes
 */
export const Shape = (props) => {
  const { x, y, height, width } = props || {};
  return {
    x: x || 0,
    y: y || 0,
    id: v4(),
    width: width || 250,
    height: height || 50,
    fill: "#fff",
    isDragging: false
  };
};
