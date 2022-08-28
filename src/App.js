import './App.css';
import React from 'react';
import { marked } from 'marked';


//Allows for line breaks in markdown
marked.setOptions({
  breaks: true,
});

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      input: placeholder
    }
    //Needs to fall within constructor braces
    this.handleChange = this.handleChange.bind(this);
  }

    handleChange(e) {
      this.setState({
        input: e.target.value
      })
    }
  render() {
    return (
      <div className="App">
        {/*assign a prop to each child component with "this"*/}
        <Editor value={this.state.input} onChange={this.handleChange}/>
        <Preview value={this.state.input}/>
      </div>
    );
  }
}

const Editor = (props) => {
  return (
    <div className='box'>
      <div className='heading'>
        <h1>Editor</h1>
      </div>
      <hr></hr>
      <div className='mainTextLeft'>
        <textarea
          id="editor"
          onChange={props.onChange}
        >{/*reference the parent components properties, where prop name
          is whatever was assigned to it in the parent component JSX*/}
          {props.value}
        </textarea>
      </div>
    </div>  
  )
}

const Preview = (props) => {
  //this const makes the markdown conversion function more readable
  const toMarkDown = props.value;
  return (
    <div className='box'>
      <div className='heading'>
        <h1>Markdown Preview</h1>
      </div>
      <hr></hr>
      <div id='previewText' className='mainTextRight'>
        {/*converts your input constant markdown file into html,
          but apparently vulnerable to cross-site scripting*/}
        <div id='preview' dangerouslySetInnerHTML={{ __html: marked.parse(toMarkDown)}}></div>
      </div>
    </div>
  )
}

const placeholder = `# Welcome to my React Markdown Previewer!

## This is a sub-heading...
### And here's some other cool stuff:

Heres some code, \`<div></div>\`, between 2 backticks.

\`\`\`
// this is multi-line code:

function anotherExample(firstLine, lastLine) {
  if (firstLine == '\`\`\`' && lastLine == '\`\`\`') {
    return multiLineCode;
  }
}
\`\`\`

You can also make text **bold**... whoa!
Or _italic_.
Or... wait for it... **_both!_**
And feel free to go crazy ~~crossing stuff out~~.

There's also [links](https://www.freecodecamp.org), and
> Block Quotes!

And if you want to get really crazy, even tables:

Wild Header | Crazy Header | Another Header?
------------ | ------------- | -------------
Your content can | be here, and it | can be here....
And here. | Okay. | I think we get it.

- And of course there are lists.
  - Some are bulleted.
     - With different indentation levels.
        - That look like this.


1. And there are numbered lists too.
1. Use just 1s if you want!
1. And last but not least, let's not forget embedded images:

![freeCodeCamp Logo](https://cdn.freecodecamp.org/testable-projects-fcc/images/fcc_secondary.svg)
`;

export default App;
