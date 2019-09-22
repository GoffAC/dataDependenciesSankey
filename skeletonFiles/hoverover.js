// this (x) is an array of values which we want to use to find all the children of a certain target object (p)
// we loop through all the data (input)
// if an object under scrutiny (q) has a value 'to' that is in the array (x), it's a child of the target (p)
// so then all of that object's (q's) children are also related
// so we add them to the matcher's array (x)


getMatchers = matchers => {
    const originalMatchers = [...matchers];

    // filter input to get all the children of the targets
    const children = input.filter(connection => matchers.includes(connection.to));
    children.forEach(child => {
        if (!matchers.includes(child.from)) {
            matchers.push(child.from);
        }
    });
    
    if (originalMatchers.length === matchers.length) {
        return children;
    } else {
        return getMatchers(matchers);
    }

};



//expected output = [{from:A, to:C}, {from:B,to:C}, {from:Q, to:A}]

stripAndHighlight = (input, target) => {
  input.map(row => {
    delete row.id;
    target.map(t => {
      if (t.from === row.from && t.to === row.to) {
        row.id = "highlight";
      }
    });
  });
  return input;
};

const input = [
  { from: "A", to: "C", id: "something" },
  { from: "B", to: "C" },
  { from: "C", to: "D" },
  { from: "D", to: "E" },
  { from: "E", to: "I" },
  { from: "I", to: "P", id: "something" },
  { from: "P", to: "Q", id: "something" },
  { from: "Q", to: "R", id: "something" }
];

function dataReload(target, input) {
  const x = [target.from];
  const dataToHightlight = getMatchers(x);
  const output = stripAndHighlight(input, dataToHightlight);
  return output;
}

console.log(dataReload({ from: "Q", to: "R" }, input));
