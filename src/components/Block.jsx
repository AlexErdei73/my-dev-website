const Block = (props) => {
  const block = props.block;
  const { type, language, text } = block;
  switch (type) {
    case "paragraph":
      return <p>{text}</p>;
      break;
    case "subtitle":
      return <h2>{text}</h2>;
      break;
    case "code":
      return (
        <pre>
          <code>{text}</code>
        </pre>
      );
  }
};

export default Block;
