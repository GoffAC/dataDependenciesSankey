const wanted = [
  { from: "A", to: "E", value: 1 },

  { from: "B", to: "E", value: 1 },

  { from: "C", to: "F", value: 1 },

  { from: "D", to: "E", value: 1 },

  { from: "E", to: "I", value: 3 },

  { from: "I", to: "P", value: 3 }
];

let input = [
  {
    from: "A",
    to: "E"
  },
  {
    from: "B",
    to: "E"
  },
  {
    from: "B",
    to: "F"
  },
  {
    from: "C",
    to: "F"
  },
  {
    from: "F",
    to: "P"
  },
  {
    from: "D",
    to: "E"
  },
  {
    from: "E",
    to: "I"
  },
  {
    from: "P",
    to: "J"
  },
  {
    from: "I",
    to: "J"
  },
  {
    from: "J",
    to: "Q"
  },
  { from: "F", to: "Q" }
];

function getDataStructure(input){
  //get the deduplicated list (ie. no double values in a list)
  const uniqueFrom = [...new Set(input.map(a => a.from))];
  const uniqueTo = [...new Set(input.map(a => a.to))];
  const unique = [...new Set([...uniqueFrom, ...uniqueTo])];

  // console.log(uniqueFrom)
  // console.log(uniqueTo)
  // console.log(unique)

  //Task one  - get the unique lists totals (ie. the number of times)
  //Stage one - look at all the froms and count the ones going
  let fromRegister = {};
  for (const key of unique) {
    fromRegister[key] = 0;
  }

  input.map(obj => {
    for (i = 0; i < unique.length; i++) {
      if (unique[i] === obj.to) {
        fromRegister[obj.to]++;
      }
    }
  });

  //Stage two - look at all the tos and count them
  let toRegister = {};
  for (const key of unique) {
    toRegister[key] = 0;
  }

  input.map(obj => {
    for (i = 0; i < unique.length; i++) {
      if (unique[i] === obj.from) {
        toRegister[obj.from]++;
      }
    }
  });

  //Task Two - the algo
  //Stage one - for each item that doesn't appear in the TO column gets the value of 1

  const groundMetrics = unique.filter(val => !uniqueTo.includes(val));

  input.map(row => {
    if (groundMetrics.includes(row.from)) {
      row.value = 1;
    }
  });

  //Stage two - for each non-ground metric, find the value going into it and store that

  input.map(row => {
      let valueIntoNode = row.value || 0;
      //get just the records that are not groundMetrics and hence appear in the TO column
      if (uniqueTo.includes(row.from)) {
        //filter the rows that are specific to the row we are looking at
        const incomingFilteredRows = input.filter(row2 => row2.to === row.from); // for a node X, [{from: A, to: X, value: 1}, {from: B, to: X, value: 1}]
        incomingFilteredRows.forEach(obj => {
          valueIntoNode += obj.value;
        });

        const outGoingFilteredRows = input.filter(row2 => row2.from === row.from);
        let valueOutOfNode = row.value || outGoingFilteredRows.length || 1;
        // console.log(valueIntoNode)
        // console.log(valueOutOfNode)
        // row.value = valueOutOfNode / valueIntoNode || Math.max(valueIntoNode, valueOutOfNode);
        row.value = valueIntoNode / valueOutOfNode;
      }
    }
  );


  //Stage three - add extra fields
  input.map(row => {
    row.linkColor = "#551a8b";
    row.nodeColor = "#06D6A0";
  });
return input
}

getDataStructure(input)