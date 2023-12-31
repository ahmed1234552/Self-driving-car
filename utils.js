function lerp(start, end, t) {
  return start + (end - start) * t;
  //return start * (1 - t) + end * t;
}
//Left,right,0,1/3,2/3,1
//lerp(left,right,0/3)->left
//lerp(left,right,1/3)->left+1/3(right-left)
//lerp(left,right,2/3)->left+2/3(right-left)
//lerp(left,right,3/3)->right

function getIntersection(A, B, C, D) {
  const tTop = (D.x - C.x) * (A.y - C.y) - (D.y - C.y) * (A.x - C.x);
  const uTop = (C.y - A.y) * (A.x - B.x) - (C.x - A.x) * (A.x - B.x);
  const bottom = (D.y - C.y) * (B.x - A.x) - (D.x - C.x) * (B.y - A.y);
  if (bottom != 0) {
    const t = tTop / bottom;
    const u = uTop / bottom;
    if (t >= 0 && t <= 1 && u >= 0 && u <= 1) {
      return {
        x: lerp(A.x, B.x, t),
        y: lerp(A.y, B.y, t),
        offset: t
      };
    }
  }
  return null;
}

function polysIntersect(poly1,poly2){
  for(let i=0;i<poly1.length;i++){
    for(let j=0;j<poly2.length;j++){
      const touch = getIntersection(
        poly1[i],
        poly1[(i + 1) % poly1.length],
        poly2[j],
        poly2[(j + 1) % poly2.length]
      );
      if(touch){
        return true;
      }
    }
  }
  return false;
}