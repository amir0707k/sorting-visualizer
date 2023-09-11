// const array = [5,4,3,8,1];
// const n = array.length;

// /*///////// Bubble Sort /////////////*/
// for(let i = 0; i<array.length;i++){
//     for(let j = 0;j<array.length - i -1 ;j++){
//         if(array[j] > array[j+1]){
//             const temp = array[j];
//             array[j] = array[j+1];
//             array[j+1] = temp;
//         }
//     }
// }
// console.log(array);


/*///////// Selection Sort /////////////*/
// for(let i = 0; i<n-1; i++){
//     for(let j = i+1 ; j<n ; j++){
//         if(array[i] > array[j]){
//             let temp = array[i];
//             array[i] = array[j];
//             array[j] = temp;
//         }
//     }
// }
// console.log(array);


/*///////// Insertion Sort /////////////*/
// for(let i = 1; i<n;i++){
//     const curr = array[i];
//     let j = i-1;
//     while(j >= 0 && array[j] > curr){
//         array[j+1] = array[j];
//         j--;
//     }
//     array[j+1] = curr;
    
// }

// console.log(array);