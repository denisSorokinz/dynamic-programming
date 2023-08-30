const allConstruct = (str, substrings) => {
  if (str === "") return [""];

  const paths = [];
  for (let substr of substrings) {
    if (str.startsWith(substr)) {
      const newStr = str.replace(substr, "");
      const newStrPaths = allConstruct(newStr, substrings);

      if (newStrPaths.length > 0) {
        newStrPaths.forEach((path) => paths.push([substr, ...path]));
      }
    }
  }

  return paths;
};

console.log(allConstruct("qwe", ["q", "we", "w", "e"]));
