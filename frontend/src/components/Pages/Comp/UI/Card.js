import './Card.css';

function Card(props) {
    var cls = 'card ' + props.className;

    return <div className={cls}>{props.children}</div>;

}
export default Card;