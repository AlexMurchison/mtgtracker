let foo = [1, 2, 3, 4, 5, 10, 11, 12, 13, 14, 15];

let bar = document.getElementById('test');

foo.forEach(num => {
    let button = document.createElement('button');
    button.innerText = `${num}`
    bar.appendChild(button);
});