'use strict'


// create class Point(x,y), Shape(color),
// Rectangle(width, height), Square(size), Circle(rayon)
// static method Shape création des shapes dans un tableau + pouvoir supprimer.

class Point {

    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

}

class Shape extends Point {

    constructor(x, y, color) {
        super(x, y);
        this.color = color;
        Shape.arrayList.push(this);
    }

    delete() {
        let myObj = this;

        Shape.arrayList.forEach(function (shape, index) {
            if (shape === myObj) {
                Shape.arrayList.splice(index, 1);
            }
        })

    }
}

Shape.arrayList = [];

class Rectangle extends Shape {

    constructor(width, height, x, y, color) {
        super(x, y, color);
        this.width = width;
        this.height = height;
    }

}


class Square extends Rectangle {

    constructor(size, x, y, color) {
        super(size, size, x, y, color);
    }

}


class Circle extends Shape {

    constructor(rayon, x, y, color) {
        super(x, y, color);
        this.rayon = rayon;
    }

}


let shape1 = new Shape(2, 6, 'red');

let rectangle = new Rectangle(250, 150, 5, 5, "#FF54F8")
let rectangle2 = new Rectangle(300, 250, 5, 240, '#98F3E0')
let rectangle3 = new Rectangle(27, 46, 4, 9, 'blue')

let square = new Square(50, 3, 7, 'blue')

let circle = new Circle(15, 8, 9, 'yellow')



function draw() {
    let canvas = document.getElementById('container');
    if (canvas.getContext) {
        let ctx = canvas.getContext('2d');

        Shape.arrayList.forEach()

        ctx.fillStyle = rectangle.color;
        ctx.fillRect(rectangle.x, rectangle.y, rectangle.width, rectangle.height);

        ctx.fillStyle = rectangle2.color;
        ctx.fillRect(rectangle2.x, rectangle2.y, rectangle2.width, rectangle2.height)
    }
}