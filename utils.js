function lerp(start, end, t) {
  return start + (end - start) * t;
  //return start * (1 - t) + end * t;
}
//Left,right,0,1/3,2/3,1
//lerp(left,right,0/3)->left
//lerp(left,right,1/3)->left+1/3(right-left)
//lerp(left,right,2/3)->left+2/3(right-left)
//lerp(left,right,3/3)->right
