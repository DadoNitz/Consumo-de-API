const numericStringComparator = (valueA, valueB, nodeA, nodeB, isInverted) => {
    const numA = parseInt(valueA.match(/\d+/)[0]);
    const numB = parseInt(valueB.match(/\d+/)[0]);
  
    if (numA === numB) {
      return 0;
    } else if (numA < numB) {
      return -1;
    } else {
      return 1;
    }
  }
  
  export default numericStringComparator;