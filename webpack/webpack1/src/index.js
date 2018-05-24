import _ from 'lodash';
import './style.css'

function components() {
    var element =document.createElement('div');
    element.innerHTML=_.join(['Hello', 'webpack'], ' ');
    element.classList.add('hello');
    return element;
}
document.body.appendChild(components());