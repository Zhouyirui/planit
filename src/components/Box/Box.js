import "./Box.css";

function Box(props) {
  const { children } = props;
  return <div className="Box">{children}</div>;
}

export default Box;
