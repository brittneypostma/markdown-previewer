import React, { Component } from "react";
import "./App.css";
import hljs from 'highlight.js';

const marked = require("marked");

const initialMarkdown = `
### Headers <hr/>

# Header 1
## Header 2
### Header 3
#### Header 4
##### Header 5
###### Header 6

### List <hr/>

- list item one
- list item two
- list item three

### Links <hr/>

[FreeCodeCamp](https://freecodecamp.org)

[Google](https://google.com "World's Best Search Engine.")

### Text Decorations <hr/>

*italic*

**bold**
=*=bold and italic=*=

*** Images <hr/>

![alt text](https://images.pexels.com/photos/248797/pexels-photo-248797.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500 'Beach Image')

### Blockquote <hr/>

> This is a blockquote.
> This is the second line of blockquote.
> And the third.

### Code <hr/>

\`let code = "This is some code in markdown"\`

\`\`\`
const addNumbers = (a, b) => a + b 
const name = 'Brittney'
const age = 37
let number = Math.random()*10
\`\`\`
`;

var renderer = new marked.Renderer()

renderer.link = function(href, title, text) {
  return `<a href=${href} target="_blank">${text}</a>`
}

marked.setOptions({
  renderer,
  highlight: function(code) {
    return hljs.highlightAuto(code).value
  },
  breaks: true
})

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      markdown: initialMarkdown
    };
  }
    handleChange = e => this.setState({ markdown: e.target.value })
    render() {
    return (
      <div>
        <h1 className="title">Markdown Previewer</h1>
        <div className="container">
        <div className="left">
            <textarea id="editor" value={this.state.markdown}onChange={this.handleChange}/>
          </div>
          <div className="right">
            <div
              id="preview"
              dangerouslySetInnerHTML={{ __html: marked(this.state.markdown) }}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
