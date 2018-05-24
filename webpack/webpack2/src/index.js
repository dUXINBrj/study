import _ from 'lodash';
import './style.css';
import print from './print'

function components() {
    var element =document.createElement('button');
    element.innerHTML='click me';
    element.classList.add('hello');
    element.onclick=print;
    return element;
}
document.body.appendChild(components());