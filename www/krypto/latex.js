MathJax = {
    tex: {
      inlineMath: [['$', '$'], ['\\(', '\\)']]
    }
  };

function renderPseudocodes(){
  var codes = document.getElementsByClassName("pseudocode");
  var parents = document.getElementsByClassName("pseudocode-parent");
  var options = {
      lineNumber: true
  };
  for (let i=0; i<codes.length; i++) {
    pseudocode.render(codes[i].textContent, parents[i], options);
  }
}