const fullHex = (hex: string) => {
  let r: any = hex.slice(1,2);
  let g: any = hex.slice(2,3);
  let b: any = hex.slice(3,4);

  r = parseInt(r+r, 16);
  g = parseInt(g+g, 16);
  b = parseInt(b+b, 16);

  return { r, g, b };
}

export function hex2rgb(hex: string) {
  if(hex.length === 4){
    return fullHex(hex);
  }

  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);

  return { r, g, b };
}

export function hexToDecimal(hex: string): number {
  hex = hex.substring(1);
  return Number(`0x${hex}`);
}
