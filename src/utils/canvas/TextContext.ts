export const TextContext = (context: CanvasRenderingContext2D) => ({
  measureText(text: string, fontSize: number) {
    context.font = fontSize + "px sans-serif";
    return context.measureText(text);
  },
});
