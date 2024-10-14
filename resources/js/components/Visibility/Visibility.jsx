import './style.css';

function Visibility(props) {
    const { children, hidden, value } = props;

    return hidden ? null : (children || value);
}

export default Visibility;
