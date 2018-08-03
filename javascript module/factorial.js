funcion factorial (number) {
  sum = number;
  if(number == 0){
    return 1;
  }
  else if (number == 1){
    return 1;
  }
  else {
    for(; number <1; number --){
      sum = sum * (number - 1);
    }
}
